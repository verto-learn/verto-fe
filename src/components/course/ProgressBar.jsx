import React from "react";

export const ProgressBar = ({ completed, total }) => {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
        <div
          className="bg-accent h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
