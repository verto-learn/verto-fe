import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, ArrowRight, Home } from "lucide-react";

export const QuizSummary = ({ result }) => {
  const navigate = useNavigate();
  
  // Ambil data dari response backend
  const { score, total, calculated_difficulty, assigned_course, message } = result || {};
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  const handleStartCourse = () => {
    if (assigned_course?.id) {
      navigate(`/course/${assigned_course.id}`);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-lg w-full border border-gray-700">
      <div className="mb-6 flex justify-center">
        {assigned_course ? (
          <div className="bg-green-500/20 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
        ) : (
          <div className="bg-yellow-500/20 p-4 rounded-full">
            <AlertCircle className="w-16 h-16 text-yellow-400" />
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">Quiz Selesai!</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-700/50 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Score</p>
          <p className="text-2xl font-bold text-white">{score}/{total}</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Level</p>
          <p className="text-xl font-bold text-pink-400 capitalize">{calculated_difficulty}</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Akurasi</p>
          <p className="text-2xl font-bold text-indigo-400">{percentage}%</p>
        </div>
      </div>

      {/* Button Action */}
      {assigned_course ? (
        <div className="bg-indigo-900/30 border border-indigo-500/30 p-5 rounded-xl mb-6">
          <p className="text-indigo-200 text-sm mb-1">Course Anda:</p>
          <h3 className="text-xl font-bold text-white mb-4">{assigned_course.title}</h3>
          <button
            onClick={handleStartCourse}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
          >
            Mulai Belajar <ArrowRight size={20} />
          </button>
        </div>
      ) : (
        <div className="bg-yellow-900/20 border border-yellow-500/30 p-5 rounded-xl mb-6">
          <p className="text-yellow-200 text-sm">{message || "Course belum tersedia."}</p>
        </div>
      )}

      {!assigned_course && (
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg"
        >
          <Home size={20} className="inline mr-2" /> Kembali ke Beranda
        </button>
      )}
    </div>
  );
};