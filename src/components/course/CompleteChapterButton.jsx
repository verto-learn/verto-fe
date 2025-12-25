import { useParams } from "react-router-dom";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { useCompleteChapter } from "../../hooks/course/useSetCompleteChapter";


export const CompleteChapterButton = ({ isDone = false }) => {
  const { id } = useParams(); 
  const { mutate, isPending } = useCompleteChapter();

  const handleComplete = () => {
    if (!id) return;
    mutate(id);
  };

  if (isDone) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-600/20 text-green-400 border border-green-600/50 cursor-default font-medium transition-all"
      >
        <CheckCircle size={20} />
        <span>Selesai</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleComplete}
      disabled={isPending}
      className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-green-600 text-gray-300 hover:text-white border border-gray-600 hover:border-green-500 transition-all duration-300 shadow-lg"
    >
      {isPending ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <Circle size={20} className="group-hover:hidden" />
      )}
      
      {!isPending && <CheckCircle size={20} className="hidden group-hover:block" />}
      
      <span className="font-medium">
        {isPending ? "Memproses..." : "Tandai Selesai"}
      </span>
    </button>
  );
};