import { motion } from "framer-motion";
import { useState } from "react";

export const QuizQuestion = ({ question, index, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const handleSelect = (optionText, optionIndex) => {
    setSelected(optionText);
    onAnswer(question.id, optionIndex); 
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary text-light p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
    >
      <h3 className="text-lg font-semibold mb-4">
        {index + 1}. {question.question_text}
      </h3>
      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt, i)}
            className={`p-3 rounded-xl text-left border transition-all ${selected === opt
                ? "bg-accent text-white"
                : "bg-third hover:bg-accent/40"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </motion.div>
  );
};