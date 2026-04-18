import { Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/course-details/${course?._id}`}
      className="group block rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={course?.thumbnail}
          alt={course?.image}
          className="h-44 sm:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {course?.price === 0 && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
            FREE
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-1">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-medium line-clamp-2">
          {course?.title}
        </h3>
         <span className="text-base">
          {course?.subTitle}
        </span>

        {/* Instructor */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            By <span className="font-medium">{course?.creator?.name}</span>
          </p>
          <Badge>{course?.level}</Badge>
        </div>


        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course?.lectures?.length + "h"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{course?.enrolledStudents?.length || 0}</span>
          </div>
        </div>

        {/* Rating + Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-sm">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span>{course?.rating || 4}</span>
            <span className="text-gray-400">
              ({course?.totalReviews || 4})
            </span>
          </div>

          <div className="text-base font-semibold text-green-600">
            {course?.price === 0 ? "Free" : `₹${course?.price}`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
