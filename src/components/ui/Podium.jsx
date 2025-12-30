import React from "react";
import { motion } from "framer-motion";
import { Crown, Medal } from "lucide-react";

const Podium = ({ winners }) => {
  const first = winners[0];
  const second = winners[1];
  const third = winners[2];

  const getInitials = (name) => name?.substring(0, 2).toUpperCase() || "UN";

  return (
    <div className="flex justify-center items-end gap-4 md:gap-8 mb-12 min-h-[300px]">
      {second && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-700 border-4 border-gray-400 flex items-center justify-center text-xl font-bold text-gray-300 shadow-xl overflow-hidden">
                {getInitials(second.full_name)}
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Medal size={12} /> 2nd
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-bold text-gray-300 text-sm md:text-base">{second.full_name}</h3>
            <p className="text-gray-500 font-mono text-sm">{second.total_score} pts</p>
          </div>
          {/* Podium Block */}
          <div className="w-20 md:w-24 h-24 bg-gradient-to-t from-gray-800 to-gray-700 rounded-t-lg mt-2 opacity-80" />
        </motion.div>
      )}

      {first && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center z-10"
        >
          <div className="relative mb-2">
            <Crown className="w-8 h-8 text-yellow-400 absolute -top-10 left-10 -translate-x-1/2 animate-bounce" />
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-yellow-600 border-4 border-yellow-400 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_30px_rgba(250,204,21,0.4)] overflow-hidden">
                {getInitials(first.full_name)}
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full border border-yellow-200 shadow-lg">
                1st 
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-bold text-yellow-400 text-base md:text-xl">{first.full_name}</h3>
            <p className="text-yellow-200/70 font-mono font-bold text-lg">{first.total_score} pts</p>
          </div>
          <div className="w-24 md:w-32 h-36 bg-gradient-to-t from-yellow-900/50 to-yellow-600/20 rounded-t-xl mt-2 border-t border-yellow-500/30 backdrop-blur-sm" />
        </motion.div>
      )}
      {third && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-800 border-4 border-orange-600 flex items-center justify-center text-xl font-bold text-orange-200 shadow-xl overflow-hidden">
                {getInitials(third.full_name)}
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Medal size={12} /> 3rd
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-bold text-orange-400 text-sm md:text-base">{third.full_name}</h3>
            <p className="text-orange-500/70 font-mono text-sm">{third.total_score} pts</p>
          </div>
          <div className="w-20 md:w-24 h-16 bg-gradient-to-t from-orange-900/30 to-orange-800/30 rounded-t-lg mt-2 opacity-80" />
        </motion.div>
      )}

    </div>
  );
};

export default Podium;