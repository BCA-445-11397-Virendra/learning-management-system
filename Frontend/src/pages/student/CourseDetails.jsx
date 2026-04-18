import BuyCourse from "@/components/courses/BuyCourse";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading)
    return <p className="text-center py-20">Loading...</p>;

  if (isError)
    return <p className="text-center py-20">Failed to load</p>;

  const { course, purchased } = data || {};

  return (
    <div className="bg-gray-50 min-h-screen">
    
      <section className="bg-[#1c1d1f] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 space-y-4">
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            {course?.title}
          </h1>

          <p className="text-gray-300 text-sm md:text-lg max-w-3xl">
            {course?.subTitle}
          </p>

          <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-300">
            <span>
              Created by{" "}
              <span className="text-indigo-400 underline">
                {course?.creator?.name}
              </span>
            </span>

            <span className="flex items-center gap-1">
              <BadgeInfo size={14} />
              {course?.createdAt?.split("T")[0]}
            </span>

            <span>
              👨‍🎓 {course?.enrolledStudents?.length} students
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      
        <div className="flex-1 space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-3">
              What you’ll learn
            </h2>

            {course?.description && (
              <div
                className="prose max-w-none text-gray-700 text-sm md:text-base"
                dangerouslySetInnerHTML={{
                  __html: course?.description,
                }}
              />
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              Course content
            </h2>

            <p className="text-sm text-green-600 mb-3">
              {course?.lectures?.length} lectures
            </p>

            <div className="border rounded-md divide-y max-h-100 overflow-y-auto">
              {course?.lectures?.map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 md:px-4 py-3 text-sm hover:bg-gray-50 transition"
                >
                  {lecture?.isPreviewFree ? (
                    <PlayCircle
                      size={16}
                      className="text-green-600"
                    />
                  ) : (
                    <Lock
                      size={16}
                      className="text-gray-400"
                    />
                  )}

                  <span className="line-clamp-1">
                    {lecture?.lectureTitle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-87.5">
          <div className="lg:sticky lg:top-20">
            
            <Card className="shadow-lg rounded-xl overflow-hidden">
              
              <CardContent className="p-4 space-y-4">
                
                <div className="aspect-video rounded-md overflow-hidden border">
                  <video
                    className="w-full h-full object-cover"
                    src={course?.lectures?.[0]?.videoUrl}
                    poster={course?.thumbnail}
                    controls
                  />
                </div>

                <p className="text-xs md:text-sm text-gray-500">
                  Preview: {course?.lectures?.[0]?.lectureTitle}
                </p>

                <Separator />
                <h2 className="text-2xl md:text-3xl font-bold">
                  ₹{course?.price}
                </h2>
              </CardContent>

              <CardFooter>
                {purchased ? (
                  <Button
                    onClick={() =>
                      navigate(`/course-progress/${courseId}`)
                    }
                    className="w-full"
                  >
                    Continue Learning
                  </Button>
                ) : (
                  <BuyCourse courseId={courseId} />
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;