import React from "react";
import { useNavigate } from "react-router-dom";

export const CourseCard = ({ item }) => {
  const navigate = useNavigate();
  const course = item?.course ?? {};
  const chapters = course?.chapters ?? [];
  const completed = chapters.filter((c) => c.progress?.[0]?.is_done).length;
  const total = chapters.length || 0;

  return (
    <div className="glass-card p-4 rounded-lg shadow-md">
      <h3 className="text-white text-lg font-semibold truncate">{course.title}</h3>
      <p className="text-sm text-gray-300 mt-1">Topic: {course.topic ?? "-"}</p>
      <p className="text-sm text-gray-300">Difficulty: {course.difficulty ?? "-"}</p>

      <div className="mt-3">
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-500 h-2"
            style={{ width: total ? `${Math.round((completed / total) * 100)}%` : "0%" }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{completed} / {total} chapters completed</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-300">Score: {item?.user_score ?? 0}</p>
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="bg-secondary text-white text-sm px-3 py-1 rounded-md hover:bg-indigo-500"
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
