import { riscInstructions } from "../../features/simulatoreReducer";


export function RiscPanel({ state }) {
    return (
        <div className="glass-card p-6 rounded-lg border">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">RISC (Reduced)</h2>
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Instruksi (Program Counter: {state.pc}):</h3>
                <div className="bg-gray-700 p-3 rounded font-mono text-lg">
                    {riscInstructions.map((inst, index) => (
                        <div key={index} className={index === state.pc ? 'text-yellow-300' : 'text-gray-500'}>
                            {inst}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Registers:</h3>
                <div className="bg-gray-700 p-3 rounded font-mono text-lg space-y-1">
                    <div>R1: {state.registers.R1}</div>
                    <div>R2: {state.registers.R2}</div>
                    <div className="text-yellow-300">R3 (Hasil Add): {state.registers.R3}</div>
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