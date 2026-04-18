import { useState } from "react";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
        navigate(`course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Crack your goals with <br />
              <span className="text-green-500">India’s best educators</span>
            </h1>
            <p className="mt-1 text-gray-600 text-lg ">
              Learn from top teachers, live & recorded courses, structured
              batches,
            </p>
            <p className=" text-gray-600 text-lg">
              <span className="text-[#04ff00]">Over 10</span> crore learners
              trust us for their preparation
            </p>
            <div className="mt-4">
              <form onSubmit={searchHandler}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses, exams, batches"
                  className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3C4852] min-w-full"
                />

                <div className="mt-2 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 font-medium rounded hover:bg-green-600"
                  >
                    Find Courses
                  </button>
                  <button onClick={()=>navigate("/course/search?query")} className="border border-gray-300 px-6 py-2 font-medium  rounded  hover:border-green-500">
                    Explore Courses
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="https://static.uacdn.net/production/_next/static/images/home-illustration.svg?q=75&auto=format%2Ccompress&w=1200"
              alt="learning"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
