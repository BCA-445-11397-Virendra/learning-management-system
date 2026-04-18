import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
  useUpdateLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8000/api/v1/media";

const UpdateLecture = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const [updateLecture, { data, isLoading, isSuccess, error }] =
    useUpdateLectureMutation();

  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const { data: getLectureByIdData, isLoading: lectureLoading } =
    useGetLectureByIdQuery(lectureId);

  // ================= Upload Video =================
  const fileChangeHandle = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setMediaProgress(true);
    setUploadProgress(0);

    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        onUploadProgress: ({ loaded, total }) => {
          if (total) {
            setUploadProgress(Math.round((loaded * 100) / total));
          }
        },
      });

      if (res.data.success) {
        setUploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });

        setBtnDisable(false);
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Video Upload Failed");
    } finally {
      setMediaProgress(false);
    }
  };

  // ================= Update Lecture =================
  const updateLectureHandel = async (e) => {
    e.preventDefault();

    if (!uploadVideoInfo?.videoUrl) {
      return toast.error("Please upload video first");
    }

    await updateLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  // ================= Remove Lecture =================
  const removeLectureHandle = async () => {
    await removeLecture(lectureId);
  };

  // ================= Effects =================
  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message);
      navigate(`/admin/course/${courseId}/lecture`);
    }

    if (isSuccess) {
      toast.success(data?.message);
      navigate(`/admin/course/${courseId}/lecture`);
    }

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [removeSuccess, isSuccess, error]);

  useEffect(() => {
    if (getLectureByIdData) {
      const { lecture } = getLectureByIdData;

      setLectureTitle(lecture?.lectureTitle || "");
      setIsFree(lecture?.isPreviewFree || false);

      setUploadVideoInfo({
        videoUrl: lecture?.videoUrl,
        publicId: lecture?.publicId,
      });

      setBtnDisable(false); // allow update without re-upload
    }
  }, [getLectureByIdData]);

  // ================= Loader =================
  if (isLoading || lectureLoading) {
    return <Loader />;
  }

  // ================= UI =================
  return (
    <section className="min-h-screen">
      <div className="px-2 md:px-5 py-5">
        
        {/* Header */}
        <div className="border px-3 py-3 rounded mb-4">
          <Link
            to={`/admin/course/${courseId}/lecture`}
            className="flex items-center gap-4"
          >
            <Button variant="outline">
              <ArrowLeft />
            </Button>
            <h1 className="font-semibold text-lg">
              Update Lecture Section
            </h1>
          </Link>
        </div>

        {/* Content */}
        <div className="border px-4 py-4 rounded">
          
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#030953]">
                Edit Lecture
              </h2>
              <p className="text-sm">
                Update your lecture details and video.
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={removeLectureHandle}
            >
              {removeLoading ? "Please Wait..." : "Remove"}
            </Button>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4">

            {/* Title */}
            <div>
              <Label>Lecture Title</Label>
              <Input
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                placeholder="Enter lecture title"
              />
            </div>

            {/* Progress */}
            {mediaProgress && (
              <div>
                <Progress value={uploadProgress} />
                <p className="text-sm mt-1">
                  {uploadProgress}% Uploaded
                </p>
              </div>
            )}

            {/* Video Upload */}
            <div>
              <Label>Lecture Video</Label>
              <Input
                type="file"
                accept="video/*"
                onChange={fileChangeHandle}
              />
            </div>

            {/* Preview */}
            {uploadVideoInfo?.videoUrl && (
              <video controls className="w-full max-w-md mt-3">
                <source src={uploadVideoInfo.videoUrl} />
              </video>
            )}

            {/* Free Toggle */}
            <div className="flex items-center gap-2 border p-3 rounded">
              <Switch
                checked={isFree}
                onCheckedChange={setIsFree}
              />
              <Label>Free Preview Mode</Label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  navigate(`/admin/course/${courseId}/lecture`)
                }
              >
                Back
              </Button>

              <Button
                onClick={updateLectureHandel}
                disabled={btnDisable || mediaProgress}
              >
                {mediaProgress ? "Uploading..." : "Update Lecture"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateLecture;