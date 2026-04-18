import CourseUpdateTab from "@/components/courses/CourseUpdateTab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router";
const UpdateCourse = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-2 py-3 md:px-10 mt-6 max-h-[calc(100vh-180px)] ">
      <div className="border max-h-screen rounded-2xl px-2 md:px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#11045d]">
              Welocome to Course Update Page?
            </h1>
            <p className="font-medium text-[18px] w-full">
              Customizing Courses on Your CodeNonstop Dashboard
            </p>
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => navigate("lecture")}
              className="hover:cursor-pointer hover:text-amber-950"
            >
              Go To Lecture Page
            </Button>
          </div>
        </div>
        <div className="mt-6 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
          <CourseUpdateTab />
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
