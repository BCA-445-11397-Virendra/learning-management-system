import LectureTab from "@/components/courses/LectureTab";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLectureMutation } from "@/features/api/courseApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const CreateLecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [createLecture, { data, isSuccess, isLoading, error}] =
    useCreateLectureMutation();
  const [lectureTitle, setLectureTitle] = useState("");

  const handleSubmitLecture = async (e) => {
    e.preventDefault();
    await createLecture({ lectureTitle, courseId });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [data, error, isSuccess]);

  if (isLoading) {
    <>
      <Loader />
    </>;
  }

  return (
    <section className="min-h-screen bg-gray-50 flex  px-3 sm:px-6">
      <div className="w-full max-w-full">
        <div className="bg-white border rounded-lg shadow-sm p-4 sm:p-6 md:p-8 space-y-4">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              Create New Lecture
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Add a new lecture to your course. Make sure the title is clear and
              meaningful.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Lecture Title<span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                name="lectureTitle"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                placeholder="Ex: Introduction to React"
                className="w-full"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 pt-2">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate(`/admin/course/${courseId}`)}
              >
                Back to Course
              </Button>

              <Button
                className="w-full sm:w-auto"
                onClick={handleSubmitLecture}
              >
                Create Lecture
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-lg shadow-sm p-4 sm:p-6 md:p-8 space-y-4">
          <LectureTab/>
        </div>
      </div>
    </section>
  );
};

export default CreateLecture;
