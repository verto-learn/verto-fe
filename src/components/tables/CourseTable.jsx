import React from 'react';
import { BookOpen, Layers, BarChart, FileText, Eye, EyeOff, Loader2 } from 'lucide-react';
import { usePublishCourse } from '../../hooks/course/usePublishCourse';

const CourseTable = ({ courses }) => {
    const { mutate, isPending } = usePublishCourse();
    
    // State lokal untuk melacak ID course yang sedang loading spesifik
    const [loadingId, setLoadingId] = React.useState(null);

    const handleTogglePublish = (courseId, currentStatus) => {
        setLoadingId(courseId);
        mutate(
            { courseId, isPublished: !currentStatus }, // Toggle status (true -> false, false -> true)
            {
                onSettled: () => setLoadingId(null) // Reset loading state selesai request
            }
        );
    };

    const truncateText = (text, maxLength = 60) => {
        if (!text) return <span className="text-gray-500 italic">- No description -</span>;
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    if (!courses || courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-800/50 rounded-xl border border-gray-700 text-gray-400">
                <BookOpen className="w-12 h-12 mb-3 opacity-50" />
                <p>No courses found.</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-700 shadow-xl bg-gray-900/50 backdrop-blur-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-gray-800 text-gray-300 border-b border-gray-700">
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Title</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Topic</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Level</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {courses.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-800/50 transition-colors duration-200">
                                <td className="px-6 py-4 font-medium text-white">
                                    {course.title}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        {course.topic?.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getDifficultyColor(course.difficulty)}`}>
                                        {course.difficulty}
                                    </span>
                                </td>
                                
                                {/* KOLOM STATUS */}
                                <td className="px-6 py-4">
                                    {course.is_published ? (
                                        <span className="inline-flex items-center gap-1 text-green-400 text-xs font-bold bg-green-900/20 px-2 py-1 rounded border border-green-500/20">
                                            <Eye size={12} /> Published
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-gray-400 text-xs font-bold bg-gray-800 px-2 py-1 rounded border border-gray-600">
                                            <EyeOff size={12} /> Draft
                                        </span>
                                    )}
                                </td>

                                {/* KOLOM ACTION (BUTTON) */}
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleTogglePublish(course.id, course.is_published)}
                                        disabled={loadingId === course.id}
                                        className={`
                                            inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                            ${course.is_published 
                                                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20" 
                                                : "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20"
                                            }
                                            ${loadingId === course.id ? "opacity-50 cursor-not-allowed" : ""}
                                        `}
                                    >
                                        {loadingId === course.id ? (
                                            <Loader2 size={14} className="animate-spin" />
                                        ) : (
                                            course.is_published ? "Unpublish" : "Publish Now"
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseTable;