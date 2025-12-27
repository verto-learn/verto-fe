import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ChapterList } from "../../components/course/ChapterList";
import { ProgressBar } from "../../components/course/ProgressBar";
import { useGetUserCourse } from "../../hooks/course/useGetUserCourse";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import MarkdownContent from "../../components/course/MarkdownContent";
import { ChatModal } from "../../components/course/ChatModal";
import { CompleteChapterButton } from "../../components/course/CompleteChapterButton";
import { StudyCaseSubmission } from "../../components/course/StudyCaseSubmission";

export const ChapterDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetUserCourse();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (isLoading)
    return <LoadingSpinner size="lg" color="text-indigo-600" />;

  if (isError) {
    console.error(error);
    return <p className="text-center text-red-400 mt-10">Gagal memuat data course.</p>;
  }

  const course = data?.data?.[0]?.course;
  const chapters = course?.chapters || [];

  const currentChapterIndex = chapters.findIndex((c) => c.id === id);
  const chapter = chapters[currentChapterIndex];
  const nextChapter = chapters[currentChapterIndex + 1];

  const completedCount = chapters.filter((c) => c.progress?.[0]?.is_done).length;
  const isCurrentChapterDone = chapter?.progress?.[0]?.is_done || false;
 const studyCaseProof = chapter.study_case_proofs?.[0] || null;

  if (!chapter)
    return <div className="text-center text-red-400 mt-10">Chapter tidak ditemukan.</div>;

  return (
    <>
      <div className="relative min-h-screen flex bg-primary/50 text-white">
        <div
          className={`flex-1 transition-all duration-500 ${isSidebarOpen ? "md:mr-96" : "md:mr-20"
            }`}
        >
          <div className="px-6 py-10 max-w-4xl mx-auto pb-32">
            <div className="flex items-center gap-3 mb-5">
              <Link to="/" className="text-gray-400 hover:text-white">
                <ArrowLeft size={22} />
              </Link>
              <h1 className="text-2xl font-bold">{chapter.title}</h1>
            </div>
            {chapter.video_url_embed && (
              <iframe
                src={chapter.video_url_embed}
                className="w-full aspect-video rounded-xl shadow-lg mb-6"
                allowFullScreen
                title="Video Materi"
              ></iframe>
            )}
            <MarkdownContent content={chapter.content} />
          </div>
            {chapter.is_study_case && (
              <StudyCaseSubmission 
                chapterId={chapter.id} 
                existingProof={studyCaseProof} 
              />
            )}
        </div>

        <aside
          className={`fixed right-0 top-0 h-full bg-primary/70 backdrop-blur-lg border-l border-gray-700 shadow-xl transition-all duration-500 ease-in-out z-20 ${isSidebarOpen ? "w-96" : "w-20"
            }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                {isSidebarOpen && <h2 className="font-semibold">Course Progress</h2>}
              </div>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
              >
                {isSidebarOpen ? <ChevronRight /> : <ChevronLeft />}
              </button>
            </div>

            <div
              className={`flex-1 overflow-y-auto px-4 py-6 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
              <ProgressBar completed={completedCount} total={chapters.length} />
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Daftar Chapter</h2>
                <ChapterList chapters={chapters} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 left-8 z-40 flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-4 rounded-full shadow-2xl shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 group"
        aria-label="Tanya AI"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
      </button>
      <div className="mt-10 flex items-center gap-4 justify-center">
        {!chapter.is_study_case && (
           <CompleteChapterButton isDone={isCurrentChapterDone} />
        )}

        {chapter.is_study_case && !isCurrentChapterDone && (
           <div className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-gray-400 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
              Selesaikan Tugas untuk Lanjut
           </div>
        )}

        {chapter.is_study_case && isCurrentChapterDone && (
           <div className="px-4 py-2 bg-green-900/30 border border-green-500/50 rounded-xl text-green-400 text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Tugas Selesai
           </div>
        )}
        
        {nextChapter && (
          <button
            onClick={() => navigate(`/chapter/${nextChapter.id}`)}
            disabled={!isCurrentChapterDone}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all  justify-center ${isCurrentChapterDone
                ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
              }`}
          >
            <span className="hidden md:flex">{nextChapter.title}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
      <ChatModal
        key={chapter.id}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        chapterId={chapter.id}
        chapterTitle={chapter.title}
      />
    </>
  );
};