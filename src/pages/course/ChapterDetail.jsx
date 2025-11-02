import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "../../components/course/MarkdownContent";
import { ChapterList } from "../../components/course/ChapterList";
import { ProgressBar } from "../../components/course/ProgressBar";
import { useGetUserCourse } from "../../hooks/course/useGetUserCourse";

export const ChapterDetail = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetUserCourse();

    if (isLoading) {
        return <p className="text-center text-gray-400 mt-10">Memuat data course...</p>;
    }

    if (isError) {
        console.error(error);
        return <p className="text-center text-red-400 mt-10">Gagal memuat data course.</p>;
    }

    const chapters = data?.data?.course?.chapters || [];
    const chapter = chapters.find((c) => c.id === id);
    const completedCount = chapters.filter((c) => c.progress?.[0]?.is_done).length;

    if (!chapter)
        return (
            <div className="text-center text-red-400 mt-10">
                Chapter tidak ditemukan.
            </div>
        );

    return (
        <div className="min-h-screen px-6 py-10 text-white bg-primary">
            <div className=" mx-auto space-y-8  md:grid grid-cols-3">
                <div className="col-span-2 p-4">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="text-gray-400 hover:text-white">
                            <ArrowLeft size={22} />
                        </Link>
                        <h1 className="text-2xl font-bold">{chapter.title}</h1>
                    </div>

                    {chapter.video_url_embed && (
                        <iframe
                            src={chapter.video_url_embed}
                            className="w-full aspect-video rounded-xl shadow-lg"
                            allowFullScreen
                        ></iframe>
                    )}

                    <MarkdownContent content={chapter.content} />
                </div>

                <div>
                    <ProgressBar completed={completedCount} total={chapters.length} />
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold mb-4">Daftar Chapter</h2>
                        <ChapterList chapters={chapters} />
                    </div>
                </div>
            </div>
        </div>
    );
};
