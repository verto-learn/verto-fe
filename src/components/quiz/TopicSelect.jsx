import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Check, Hash } from "lucide-react";

export const TopicSelect = ({ topics, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Cari nama topik yang sedang dipilih untuk ditampilkan di trigger button
  const selectedTopicName = topics.find((t) => t.id === selected)?.name;

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
  };

  // Variabel animasi dropdown
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scaleY: 0.8, 
      transition: { duration: 0.2 } 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scaleY: 1, 
      transition: { type: "spring", stiffness: 300, damping: 25 } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scaleY: 0.8, 
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3"
      >
        {/* Label Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 bg-indigo-600/20 rounded-lg text-indigo-400">
            <Sparkles size={18} />
          </div>
          <h2 className="text-lg font-bold text-white tracking-wide">
            Pilih Topik Quiz
          </h2>
        </div>

        {/* Dropdown Trigger Button */}
        <button
          onClick={toggleOpen}
          className={`
            relative w-full flex items-center justify-between p-4 rounded-xl 
            bg-gray-800/50 backdrop-blur-md border 
            transition-all duration-300 group
            ${isOpen 
              ? "border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]" 
              : "border-gray-700 hover:border-gray-500"
            }
          `}
        >
          <span className={`text-base font-medium ${selected ? "text-white" : "text-gray-400"}`}>
            {selectedTopicName || "Silakan pilih topik..."}
          </span>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className={`text-gray-400 group-hover:text-white transition-colors`} />
          </motion.div>
        </button>

        {/* Dropdown List */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ originY: 0 }} // Animasi mulai dari atas
              className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto custom-scrollbar"
            >
              {topics.length === 0 ? (
                <li className="p-4 text-center text-gray-500 text-sm italic">
                  Tidak ada topik tersedia
                </li>
              ) : (
                topics.map((t) => {
                  const isSelected = selected === t.id;
                  return (
                    <motion.li
                      key={t.id}
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                      onClick={() => handleSelect(t.id)}
                      className={`
                        cursor-pointer p-4 flex items-center justify-between border-b border-gray-800 last:border-0 transition-colors
                        ${isSelected ? "bg-indigo-600/10" : ""}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          p-2 rounded-lg 
                          ${isSelected ? "bg-indigo-500 text-white" : "bg-gray-800 text-gray-400"}
                        `}>
                          <Hash size={16} />
                        </div>
                        <span className={`font-medium ${isSelected ? "text-indigo-400" : "text-gray-300"}`}>
                          {t.name}
                        </span>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check size={18} className="text-indigo-400" />
                        </motion.div>
                      )}
                    </motion.li>
                  );
                })
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Backdrop Invisible untuk menutup dropdown saat klik luar */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
};