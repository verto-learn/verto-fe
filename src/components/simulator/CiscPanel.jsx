import { ciscInstruction } from "../../features/simulatoreReducer";


export function CiscPanel({ state }) {
    return (
        <div className="glass-card p-6 rounded-lg border border-red-500">
            <h2 className="text-3xl font-bold text-center mb-6 text-red-400">CISC (Complex)</h2>
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Instruksi:</h3>
                <div className="bg-gray-700 p-3 rounded font-mono text-lg">{ciscInstruction}</div>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Status Internal CPU (Microcode):</h3>
                <div className="bg-gray-700 p-3 rounded font-mono text-lg text-yellow-300 h-12">
                    {state.internalStatus}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2">Memori:</h3>
                <div className="bg-gray-700 p-3 rounded font-mono text-lg space-y-1">
                    <div>A: {state.memory.A}</div>
                    <div>B: {state.memory.B}</div>
                    <div className="text-green-400">C: {state.memory.C}</div>
                </div>
            </div>
        </div>
    );
}