import { useState } from "react";
import { Menu, X } from "lucide-react";

const StudentNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
                <span className="text-red-800">Code</span>Nonstop
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-700 hover:text-green-600">
              Courses
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Exams
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Batch
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block w-80">
            <input
              type="text"
              placeholder="Search courses"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-700 hover:text-green-600">
              Login
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
              Join for Free
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col gap-4 p-4">
            <input
              type="text"
              placeholder="Search courses"
              className="px-4 py-2 border rounded-full"
            />
            <a href="#" className="text-gray-700">
              Courses
            </a>
            <a href="#" className="text-gray-700">
              Exams
            </a>
            <a href="#" className="text-gray-700">
              Batch
            </a>
            <button className="border py-2 rounded-full">
              Login
            </button>
            <button className="bg-green-500 text-white py-2 rounded-full">
              Join for Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
