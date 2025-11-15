import { FileCheck, Play, RefreshCcw } from 'lucide-react';

export function SimulatorControls({ onNextCycle, onReset, onShowResult, isFinished, showChart }) {
    return (
        <div className="flex justify-center gap-4">
            <button
                onClick={onNextCycle}
                disabled={isFinished}
                className="bg-transparent  border border-accent flex items-center gap-2 hover:bg-accent text-accent hover:text-primary transition-all duration-500 font-bold py-2 px-6 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Play />
                Next Cycle
            </button>
            <button
                onClick={onReset}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
            >
                <RefreshCcw />
            </button>
            <button
                onClick={onShowResult}
                disabled={isFinished || showChart}
                className="bg-secondary flex items-center gap-2 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
            >
                 <FileCheck />
                 Result
            </button>
        </div>
    );
}