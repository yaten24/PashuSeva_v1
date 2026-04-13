import React from "react";
import { FaTools, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ComingSoon = ({
  title = "Page Under Development",
  subtitle = "We're working hard to bring this feature soon 🚀",
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 text-center">

      {/* ICON */}
      <div className="text-5xl md:text-6xl text-yellow-400 mb-4 animate-pulse">
        <FaTools />
      </div>

      {/* TITLE */}
      <h1 className="text-xl md:text-3xl font-bold mb-2">
        {title}
      </h1>

      {/* SUBTITLE */}
      <p className="text-gray-400 text-sm md:text-base mb-6 max-w-md">
        {subtitle}
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 text-sm md:text-base"
      >
        <FaArrowLeft />
        Go Back
      </button>

    </div>
  );
};

export default ComingSoon;