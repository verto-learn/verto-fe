import React from 'react';
import { BookOpen, Layers, BarChart, FileText, AlertCircle } from 'lucide-react';

const CourseTable = ({ courses }) => {

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
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-blue-500" />
                                    Title
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">
                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-purple-500" />
                                    Topic
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">
                                <div className="flex items-center gap-2">
                                    <BarChart className="w-4 h-4 text-orange-500" />
                                    Level
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {courses.map((course, index) => (
                            <tr 
                                key={course.id || index} 
                                className="hover:bg-gray-800/50 transition-colors duration-200 group"
                            >
                                <td className="px-6 py-4 font-medium text-white group-hover:text-blue-400 transition-colors">
                                    {course.title || '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        {course.topic?.name || 'Unknown Topic'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getDifficultyColor(course.difficulty)}`}>
                                        {course.difficulty || 'N/A'}
                                    </span>
                                </td>
                                {/* <td className="px-6 py-4 text-gray-400 leading-relaxed">
                                    {truncateText(course.description, 80)}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseTable;