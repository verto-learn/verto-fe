import { Link, useParams } from "react-router-dom";
import { CheckCircle, Circle, Lock, PlayCircle } from "lucide-react"; 

export const ChapterList = ({ chapters, courseId }) => { 
  const { id: currentChapterId } = useParams();

  return (
    <div className="space-y-3">
      {chapters.map((chapter, index) => {
        const isDone = chapter.progress?.[0]?.is_done;
        const isActive = chapter.id === currentChapterId;
        const previousChapter = chapters[index - 1];
        const isLocked = index > 0 && !previousChapter?.progress?.[0]?.is_done;

        return (
          <div key={chapter.id} className="relative">
            {isLocked ? (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 opacity-60 cursor-not-allowed">
                <div className="text-gray-500">
                  <Lock size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-400 truncate">
                    {chapter.order_index}. {chapter.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Selesaikan bab sebelumnya</p>
                </div>
              </div>
            ) : (
              <Link
                to={`/chapter/${chapter.id}`} 
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-900/20"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600"
                }`}
              >
                <div className={`${
                  isActive ? "text-indigo-400" : isDone ? "text-green-400" : "text-gray-500 group-hover:text-gray-300"
                }`}>
                  {isDone ? (
                    <CheckCircle size={20} className="text-accent" />
                  ) : isActive ? (
                    <PlayCircle size={20} className="fill-indigo-500/20" />
                  ) : (
                    <Circle size={20} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium truncate ${
                    isActive ? "text-indigo-300" : "text-gray-200"
                  }`}>
                    {chapter.order_index}. {chapter.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{chapter.score} Poin</span>
                  </div>
                </div>
              </Link>
            )}
            
            {index !== chapters.length - 1 && (
               <div className="absolute left-[29px] bottom-[-14px] w-[2px] h-3 bg-gray-800 -z-10"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};