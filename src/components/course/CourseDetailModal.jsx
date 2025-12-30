import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, Trophy, Layers, Award, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseDetailModal = ({ isOpen, onClose, selectedData }) => {
  const navigate = useNavigate();

  if (!isOpen || !selectedData) return null;

  const { course, user_score, is_completed } = selectedData;
  const firstChapterId = course.chapters?.[0]?.id;

  const handleContinue = () => {
    if (firstChapterId) {
      navigate(`/chapter/${firstChapterId}`);
    } else {
      alert("Belum ada chapter di course ini");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Image / Gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-900 to-indigo-900 relative">
             <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
             >
                <X size={20} />
             </button>
             <div className="absolute bottom-0 left-0 p-6">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                    {course.topic?.name || 'General'}
                </span>
             </div>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {course.title}
            </h2>
            
            <p className="text-gray-300 leading-relaxed mb-8">
                {course.description}
            </p>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <Layers className="text-purple-400 mb-2" size={20} />
                    <p className="text-xs text-gray-500">Total Bab</p>
                    <p className="text-lg font-bold text-white">{course.chapters?.length || 0}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <Trophy className="text-yellow-400 mb-2" size={20} />
                    <p className="text-xs text-gray-500">Skor Anda</p>
                    <p className="text-lg font-bold text-white">{user_score}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <Award className="text-green-400 mb-2" size={20} />
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-lg font-bold text-white">
                        {is_completed ? "Selesai" : "Berjalan"}
                    </p>
                </div>
                 <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <Calendar className="text-blue-400 mb-2" size={20} />
                    <p className="text-xs text-gray-500">Bergabung</p>
                    <p className="text-sm font-bold text-white mt-1">
                        {new Date(selectedData.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button 
                    onClick={handleContinue}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
                >
                    <PlayCircle size={20} />
                    {is_completed ? "Ulangi Materi" : "Lanjut Belajar"}
                </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CourseDetailModal;