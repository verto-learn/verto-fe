import { motion } from "framer-motion";

export const QuizSummary = ({ score, total, difficulty, onNext }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-primary text-light p-8 rounded-2xl shadow-xl text-center max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Hasil Quiz</h2>
      <p className="text-lg mb-2">
        Skor: <span className="text-accent font-semibold">{score}</span> dari{" "}
        {total}
      </p>
      <p className="text-lg mb-4">
        Tingkat Kesulitan:{" "}
        <span className="text-accent font-semibold capitalize">
          {difficulty}
        </span>
      </p>
      <button
        onClick={onNext}
        className="mt-4 px-6 py-3 bg-accent rounded-xl hover:bg-secondary transition"
      >
        Next
      </button>
    </motion.div>
  );
};
