import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="my-3">
      <Link
        to={`/course-details/${course?._id}`}
        className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="w-full md:w-56 h-40 md:h-32 shrink-0">
            <img
              src={course?.thumbnail}
              alt="course-thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h1 className="font-semibold text-base md:text-lg line-clamp-2">
                {course?.title}
              </h1>

              <p className="text-sm text-gray-500 line-clamp-2">
                {course?.subTitle}
              </p>

              <p className="text-sm text-gray-600">
                Instructor:{" "}
                <span className="font-medium text-gray-800">
                  {course?.creator?.name}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <Badge className="text-xs px-2 py-1 bg-blue-100 text-blue-700">
                {course?.level}
              </Badge>

              <h1 className="font-bold text-lg md:text-xl text-green-600">
                ₹{course?.price}
              </h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
