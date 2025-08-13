import React from "react";

const Fallback = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-white-500/30 to-green-500/30 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
        {/* Spinner */}
        <svg
          className="animate-spin h-12 w-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>

        {/* Loading text */}
        <span className="text-white font-semibold text-lg tracking-wide">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Fallback;
