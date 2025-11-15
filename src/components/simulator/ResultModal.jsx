import { motion } from 'framer-motion';
import { ResultReport } from './ResultReport';


const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};


const modal = {
    hidden: { 
        y: "-100vh", 
        opacity: 0 
    },
    visible: {
        y: "0", 
        opacity: 1,
        transition: { delay: 0.1, type: "spring", stiffness: 120 }
    },
    exit: { 
        y: "100vh", 
        opacity: 0
    }
};

export function ResultModal({ onClose, ciscCycles, riscCycles }) {
    return (
        
        <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            onClick={onClose}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden" 
        >
            <motion.div 
                className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl mx-4"
                onClick={e => e.stopPropagation()} 
                variants={modal}
            >
                <div className="flex justify-end mb-2">
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-2xl"
                    >
                        &times;
                    </button>
                </div>

                <ResultReport 
                    ciscCycles={ciscCycles} 
                    riscCycles={riscCycles} 
                />
            </motion.div>
        </motion.div>
    );
}