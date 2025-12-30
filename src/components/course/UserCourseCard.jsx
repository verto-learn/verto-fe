import React from 'react';
import { BookOpen, Trophy, BarChart, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const UserCourseCard = ({ data, onClick }) => {
  const { course, user_score, is_completed } = data;
  
  // Tentukan warna badge berdasarkan difficulty
  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 cursor-pointer hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
    >
      {/* Background Gradient Effect */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors"></div>

      {/* Header Card */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getLevelColor(course.difficulty)}`}>
          {course.difficulty}
        </div>
        {is_completed && (
          <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-900/30 px-2 py-1 rounded-lg border border-green-500/30">
            <CheckCircle size={12} />
            <span>Selesai</span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
        {course.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-6 line-clamp-2">
        {course.description}
      </p>

      {/* Footer Stats */}
      <div className="flex items-center justify-between border-t border-gray-700 pt-4 mt-auto">
        <div className="flex items-center gap-2 text-gray-300">
           <BookOpen size={16} className="text-blue-500" />
           <span className="text-sm">{course.chapters?.length || 0} Bab</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
           <Trophy size={16} className="text-yellow-500" />
           <span className="text-sm font-bold">{user_score} Pts</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCourseCard;