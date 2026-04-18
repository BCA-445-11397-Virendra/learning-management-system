import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";

import { PlayCircle, CheckCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const sampleVideo = "https://www.youtube.com/embed/cH4WRzUs4iU";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(
    courseId,
    {
      skip: !courseId,
    },
  );
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();
  const [currentLecture, setCorrentLecture] = useState(null);

  const { courseDetails, progress, completed } = data?.data || {};

  const initialLecture =
    currentLecture || (courseDetails?.lectures && courseDetails?.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  // updata lectures

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };
  const handleSelectLecture = (lecture) => {
    setCorrentLecture(lecture);
    handleLectureProgress(lecture?._id);
  };

  const handleCompltedCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompltedCourse = async () => {
    await inCompleteCourse(courseId);
  };
  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData?.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData?.message);
    }
  }, [
    completedSuccess,
    inCompletedSuccess,
    markCompleteData?.message,
    markInCompleteData?.message,
    refetch,
  ]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;
  return (
    <section className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          {courseDetails.title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[70%] space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden shadow bg-black">
              {courseDetails?.lecture?._id === currentLecture?._id ? (
                <video
                  src={
                    currentLecture?.videoUrl ||
                    initialLecture?.videoUrl ||
                    sampleVideo
                  }
                  controls
                  className="w-full h-full"
                  onPlay={() =>
                    handleLectureProgress(
                      currentLecture?._id || initialLecture?._id,
                    )
                  }
                />
              ) : (
                <iframe
                  src={initialLecture?.videoUrl || sampleVideo}
                  title="Course Video"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
            <div className="bg-white px-4 py-3 rounded">
              <h1>
                {`Lecture ${courseDetails?.lectures.findIndex((lec) => lec?._id === (currentLecture?._id || initialLecture?._id)) + 1} : ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`}
              </h1>
            </div>
            <Button
              onClick={
                completed ? handleInCompltedCourse : handleCompltedCourse
              }
              variant={completed ? "default" : "outline"}
              className="w-full md:w-auto"
            >
              {completed ? (
                <div className="flex items-center">
                  <CheckCircle size={16} className="mr-2" />
                  Mark as Completed
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCircle size={16} className="mr-2" />
                  Mark as In-Completed
                </div>
              )}
            </Button>
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="w-full lg:w-[30%] bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">Course Lectures</h2>

            <div className="space-y-2 max-h-100 overflow-y-auto">
              {courseDetails?.lectures?.map((lecture) => (
                <div
                  onClick={() => handleSelectLecture(lecture)}
                  key={lecture?._id}
                  className={`flex  justify-between gap-3 p-3 rounded hover:bg-gray-50 hover:cursor-pointer cursor-pointer transition transform border ${lecture?._id === currentLecture?._id ? "bg-gray-200" : "bg-green-white"}`}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      {isLectureCompleted(lecture?._id) ? (
                        <CheckCircle2 size={18} className="text-green-800" />
                      ) : (
                        <PlayCircle size={18} className="text-gray-600" />
                      )}
                    </div>
                    <span className="text-sm">{lecture?.lectureTitle}</span>
                  </div>
                  <div>
                    {isLectureCompleted(lecture?._id) && (
                      <Badge
                        variant="outline"
                        className="bg-green-200 text-green-600"
                      >
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseProgress;
