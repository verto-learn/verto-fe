import React from 'react';
import { BookOpen, Briefcase, FileText, Hash, Mail, Tally4, User } from 'lucide-react';
import { truncateText } from '../../helper/truncateText';

const UsersTable = ({ users }) => {

    if (!users || users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-gray-800/50 rounded-xl border border-gray-700 text-gray-400">
                <FileText className="w-12 h-12 mb-3 opacity-50" />
                <p>No users found.</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-700 shadow-xl bg-gray-900/50 backdrop-blur-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-gray-800 text-gray-300 border-b border-gray-700">
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs w-[30%]">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-orange-500" />
                                    Email
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs w-[30%]">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-blue-500" />
                                    Full Name
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs ">
                                <div className="flex items-center gap-2">
                                    <Briefcase  className="w-4 h-4 text-green-600" />
                                    Role
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">
                                <div className="flex items-center gap-2">
                                    <Tally4 className="w-4 h-4 text-red-500" />
                                    Score
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">
                                <div className="flex items-center gap-2">
                                    <BookOpen  className="w-4 h-4 text-yellow-500" />
                                     Course
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {users.map((item, index) => (
                            <tr
                                key={item.id || index}
                                className="hover:bg-gray-800/50 transition-colors duration-200 group"
                            >
                                <td className="px-6 py-4 font-medium text-white group-hover:text-blue-400 transition-colors">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4 font-medium text-white group-hover:text-blue-400 transition-colors">
                                    {item.full_name}
                                </td>
                                <td className="px-6 py-4 font-medium text-white group-hover:text-blue-400 transition-colors">
                                    {item.role}
                                </td>
                                <td className="px-6 py-4 text-gray-400 leading-relaxed">
                                    {item.total_score}
                                </td>
                                <td className="px-6 py-4 text-gray-400 leading-relaxed">
                                    {item._count?.selected_courses || 0}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;