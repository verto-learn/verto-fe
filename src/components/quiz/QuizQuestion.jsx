import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle, Circle, Layers, Sparkles, AlertCircle, HelpCircle } from "lucide-react";

// Helper untuk menentukan warna dan ikon berdasarkan level kesulitan
const getDifficultyInfo = (level) => {
  const lvl = level ? level.toLowerCase() : 'intermediate';
  switch (lvl) {
    case 'beginner':
      return { color: 'text-green-400', bgColor: 'bg-green-400/10', borderColor: 'border-green-400/20', icon: Sparkles, label: 'Beginner' };
    case 'advanced':
      return { color: 'text-red-400', bgColor: 'bg-red-400/10', borderColor: 'border-red-400/20', icon: AlertCircle, label: 'Advanced' };
    default:
      return { color: 'text-yellow-400', bgColor: 'bg-yellow-400/10', borderColor: 'border-yellow-400/20', icon: Layers, label: 'Intermediate' };
  }
};

// Variabel animasi untuk container dan item agar muncul berurutan (staggered)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay antar munculnya opsi jawaban
      delayChildren: 0.3,
    }
  }
};

const optionVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

export const QuizQuestion = ({ question, index, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  
  // Ambil info style berdasarkan level kesulitan soal
  const difficulty = getDifficultyInfo(question.level);
  const DifficultyIcon = difficulty.icon;

  // Label untuk opsi (A, B, C, D)
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleSelect = (optionText, optionIndex) => {
    // Tambahkan sedikit efek getar/pulse saat memilih
    setSelected(optionText);
    // Beri sedikit delay sebelum mengirim jawaban ke parent agar animasi terlihat
    setTimeout(() => {
      onAnswer(question.id, optionIndex);
    }, 300);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-3xl mx-auto"
    >
      {/* Efek Glow di belakang kartu */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-[2rem] blur-xl opacity-50 -z-10"></div>

      {/* Kartu Soal Utama (Glassmorphism style) */}
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
        
        {/* Dekorasi sudut */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header: Nomor Soal & Level Kesulitan */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Badge Nomor Soal */}
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20">
              <span className="text-xl font-bold text-white">{index + 1}</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">
              Pertanyaan
            </h3>
          </div>

          {/* Badge Level Kesulitan */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${difficulty.bgColor} ${difficulty.borderColor}`}>
            <DifficultyIcon size={18} className={difficulty.color} />
            <span className={`text-sm font-bold uppercase tracking-wider ${difficulty.color}`}>
              {difficulty.label}
            </span>
          </div>
        </div>

        {/* Teks Soal */}
        <div className="mb-8 pl-2 border-l-4 border-indigo-500/50">
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
            {question.question_text}
          </p>
        </div>

        {/* Container Opsi Jawaban dengan Staggered Animation */}
        <motion.div 
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {question.options.map((opt, i) => {
            const isSelected = selected === opt;
            return (
              <motion.button
                key={i}
                variants={optionVariants}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(opt, i)}
                className={`
                  group relative w-full p-4 flex items-center gap-4 rounded-xl text-left transition-all duration-300 border
                  ${isSelected 
                    ? "bg-indigo-600/90 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]" // Style saat dipilih
                    : "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800 hover:border-indigo-500/50" // Style default/hover
                  }
                `}
              >
                {/* Label A/B/C/D */}
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-lg text-lg font-bold transition-colors
                  ${isSelected 
                    ? "bg-white text-indigo-700" 
                    : "bg-gray-700 text-gray-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300"
                  }
                `}>
                  {optionLabels[i]}
                </div>

                {/* Teks Opsi */}
                <span className={`flex-1 text-base md:text-lg font-medium transition-colors ${isSelected ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                  {opt}
                </span>

                {/* Ikon Checkmark saat dipilih */}
                <div className="text-white">
                  <AnimatePresence mode="wait">
                    {isSelected ? (
                      <motion.div
                        key="checked"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: [0, 20, 0] }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle size={28} className="text-white fill-indigo-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unchecked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-600 group-hover:text-indigo-400/50"
                      >
                        <Circle size={28} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Efek Border Cahaya Berjalan saat hover (opsional, menambah kesan premium) */}
                {!isSelected && (
                   <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100 -z-10" style={{ backgroundSize: '200% 100%' }}></div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

      </div>
    </motion.div>
  );
};