import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { ChapterList } from "../../components/course/ChapterList";
import { ProgressBar } from "../../components/course/ProgressBar";
import { useGetUserCourse } from "../../hooks/course/useGetUserCourse";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { section } from "framer-motion/client";
import MarkdownContent from "../../components/course/MarkdownContent";

export const ChapterDetail = () => {
const { id } = useParams();
const { data, isLoading, isError, error } = useGetUserCourse();
const [isSidebarOpen, setIsSidebarOpen] = useState(true);

if (isLoading)
  return <LoadingSpinner size="lg" color="text-indigo-600" />;

if (isError) {
  console.error(error);
  return <p className="text-center text-red-400 mt-10">Gagal memuat data course.</p>;
}

const course = data?.data?.[0]?.course;
const chapters = course?.chapters || [];

const chapter = chapters.find((c) => c.id === id);
const completedCount = chapters.filter((c) => c.progress?.[0]?.is_done).length;

if (!chapter)
  return <div className="text-center text-red-400 mt-10">Chapter tidak ditemukan.</div>;


  if (!chapter)
    return <div className="text-center text-red-400 mt-10">Chapter tidak ditemukan.</div>;

  return (
    <div className="relative min-h-screen flex bg-primary/50 text-white">
      <div
        className={`flex-1 transition-all duration-500 ${
          isSidebarOpen ? "md:mr-96" : "md:mr-20"
        }`}
      >
        <div className="px-6 py-10">
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
            ></iframe>
          )}

          <MarkdownContent content={chapter.content} />
        </div>
      </div>

      <aside
        className={`fixed right-0 top-0 h-full bg-primary/70 backdrop-blur-lg border-l border-gray-700 shadow-xl transition-all duration-500 ease-in-out z-20 ${
          isSidebarOpen ? "w-96" : "w-20"
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

          {/* Sidebar Content */}
          <div
            className={`flex-1 overflow-y-auto px-4 py-6 transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
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
  );
};
