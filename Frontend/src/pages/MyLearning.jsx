import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CourseCard from "@/components/courses/CourseCard";
import { useGetUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const {data,isLoading} = useGetUserQuery();
  const myLearning = data?.user?.enrolledCourses;
  if(isLoading){
    return <h1>Loading...</h1>
  }
  console.log(myLearning)
  return (
    <section className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Center Header */}
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Learning
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Track and continue your enrolled courses
          </p>
        </div>

        {/* Centered Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 justify-center">
          {myLearning?.length === 0 ? (
            <> 
             <h1 className="text-2xl font-bold">No Courses Fount</h1>
            </>
          ):
            myLearning?.map((course,index) => (
            <CourseCard id={course.id} course={course} key={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default MyLearning;
