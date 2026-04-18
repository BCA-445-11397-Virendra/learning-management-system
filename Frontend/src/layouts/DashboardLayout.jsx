import Navbar from "@/components/custom/Navbar";
import Footer from "@/pages/Footer";
import { BookMinus, BookOpen, FolderUp, Home } from "lucide-react";

import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <aside className="hidden md:block fixed bg-gray-100 shadow-lg top-0 left-0 z-40 w-64 h-screen border-r transition-transform  translate-x-0  sm:translate-x-0">
        <div className="h-full px-1 py-6 overflow-y-auto">
          <div className="mt-18 space-y-3">
            <Link
              to="/dashboard"
              className="flex gap-2  border px-4 py-3 rounded bg-white hover:bg-gray-100 hover:border-amber-400"
            >
              <Home size={20} className="text-[#1C2536]" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              to="/admin/course"
              className="flex gap-2 border px-4 py-3 rounded bg-white hover:bg-gray-100 hover:border-amber-400"
            >
              <BookOpen size={20} className="text-gray-600" />
              <span className="font-medium">Course Management</span>
            </Link>
            <Link
              to="/admin/console"
              className="flex gap-2 border px-4 py-3 rounded bg-white hover:bg-gray-100 hover:border-amber-400"
            >
              <BookMinus size={20} className="text-gray-600" />
              <span className="font-medium">Course Console</span>
            </Link>
            <Link
              to="/admin/liberary"
              className="flex gap-2 border px-4 py-3 rounded bg-white hover:bg-gray-100 hover:border-amber-400"
            >
              <FolderUp size={20} className="text-[#5f0]" />
              <span className="font-medium">Course Liberary</span>
            </Link>
          </div>
        </div>
      </aside>
      <div className="sm:ml-64">
        <Outlet />
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
