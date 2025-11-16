import React from "react";
import { Circle, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ChapterList = ({ chapters }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {chapters.map((chapter, index) => {
        const done = chapter.progress?.[0]?.is_done;
        const isActive = chapter.is_active;
        console.log("Rendering chapter:", chapter.title, "isActive:", isActive, "done:", done);

        
        if (!isActive) {
          return (
            <div
              key={chapter.id}
              className="glass-card rounded-xl p-4 animate-pulse flex items-center gap-4"
            >
              <div className="h-5 w-5 bg-gray-500/30 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-48 bg-gray-500/30 rounded"></div>
                <div className="h-3 w-24 bg-gray-500/20 rounded"></div>
              </div>
            </div>
          );
        }


        return (
          <div
            key={chapter.id}
            onClick={() => navigate(`/chapter/${chapter.id}`)}
            className="flex items-center justify-between glass-card hover:bg-gray-700 transition rounded-xl p-4 cursor-pointer"
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
