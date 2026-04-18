import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={80} className="text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your course has been successfully
          unlocked and added to your dashboard.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/my-courses")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Go to My Courses
          </button>

          <Link
            to="/"
            className="border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
