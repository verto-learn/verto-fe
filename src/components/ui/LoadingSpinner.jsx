import React from "react";

export const LoadingSpinner = ({ size = "md", color = "text-blue-500" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${sizes[size]}`}
        role="status"
      />
    </div>
  );
};
