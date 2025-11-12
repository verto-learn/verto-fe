import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';

export const QuizSummary = ({ score, total, difficulty, onNext }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-card text-light p-8 rounded-2xl shadow-xl text-center max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Hasil Quiz</h2>
      <table>
        <tbody>
          <tr>
            <td className="text-left px-4 py-2">Skor Anda:</td>
            <td className="text-right px-4 py-2 font-semibold">{score} / {total}</td>
          </tr>
          <tr>
            <td className="text-left px-4 py-2">Tingkat Kesulitan:</td>
            <td className="text-right px-4 py-2 font-semibold">{difficulty}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={onNext}
        className="flex items-center gap-x-4 mt-4 px-6 py-3 bg-accent rounded-xl hover:bg-secondary transition"
      >
        <Sparkles />
        Generate Your Course
      </button>
    </motion.div>
  );
};
