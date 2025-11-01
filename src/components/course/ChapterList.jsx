import React from "react";
import { Circle, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ChapterList = ({ chapters }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {chapters.map((chapter, index) => {
        const done = chapter.progress?.[0]?.is_done;
        return (
          <div
            key={chapter.id}
            onClick={() => navigate(`/chapter/${chapter.id}`)}
            className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition rounded-xl p-4 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {done ? (
                <CircleCheck className="text-accent" size={20} />
              ) : (
                <Circle className="text-gray-500" size={20} />
              )}
              <div>
                <p className="font-medium">{`${index + 1}. ${chapter.title}`}</p>
                {chapter.is_study_case && (
                  <p className="text-xs text-indigo-400">Study Case</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
