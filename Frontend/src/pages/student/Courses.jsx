import CourseCard from "@/components/courses/CourseCard";
import Loader from "@/components/custom/Loader";
import { useGetPublishCoursesQuery } from "@/features/api/courseApi";
import React from "react";

const Courses = () => {
  const {data:courseData,isLoading} = useGetPublishCoursesQuery();
  if(isLoading){
     <>
       <Loader/>
     </>
  }
  return (
    <section className="border">
      <div className="px-4 md:px-14 pt-15">
        <h1 className="text-xl sm:text-2xl md:text-sm lg:text-4xl font-bold">
          Courses Created by <span className="font-bold">Industry Experts</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))
            : courseData?.courses && courseData.courses.map((courses, index) => (
              <CourseCard id={courses?._id} key={index} course={courses} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

const CourseCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 shadow-sm ">
      <div className="h-40 w-full rounded-xl bg-gray-200" />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="flex items-center gap-3 pt-2">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <div className="h-3 w-1/3 rounded bg-gray-200" />
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="h-4 w-1/4 rounded bg-gray-200" />
          <div className="h-8 w-20 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};
