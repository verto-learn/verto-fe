import { useReducer, useState } from "react";
import { SimulatorControls } from "../components/simulator/SimulatorControls";
import { CiscPanel } from "../components/simulator/CiscPanel";
import { RiscPanel } from "../components/simulator/RiscPanel";
import { AnimatePresence } from 'framer-motion';
import { initialState, simulatorReducer } from "../features/simulatoreReducer";
import { ResultModal } from "../components/simulator/ResultModal";

export function Simulator() {
  // Tidak ada lagi <SimState> dll.
  const [state, dispatch] = useReducer(simulatorReducer, initialState);
  const [isManualOpen, setIsManualOpen] = useState(false);

  const handleNextCycle = () => {
    dispatch('NEXT_CYCLE');
  };

  const handleReset = () => {
    dispatch('RESET');
    setIsManualOpen(false);
  };

  const handleShowResult = () => {
    setIsManualOpen(true);
  }

  const isFinished = state.status === 'finished';


  const showModal = isFinished || isManualOpen;



  let finalState = state;
  if (showModal && !isFinished) {
    let tempState = JSON.parse(JSON.stringify(state));
    while (tempState.status !== 'finished') {
      tempState = simulatorReducer(tempState, 'NEXT_CYCLE');
    }
    finalState = tempState;
  }

  return (
    <section className="min-h-screen mt-28 text-white p-8">
      <div className="glass-card py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-accent">Simulator RISC vs CISC</h1>
          <p className="text-lg text-gray-400">Tugas: Menjumlahkan 2 Angka dari Memori (C = A + B)</p>
        </header>


        <SimulatorControls
          onNextCycle={handleNextCycle}
          onReset={handleReset}
          onShowResult={handleShowResult}
          isFinished={isFinished}
          showModal={showModal}
        />
      </div>

      <div className="bg-primary p-4 my-4 rounded-xl flex justify-center text-2xl">
        Total Siklus: <span className="text-accent ml-4">{state.totalCycles}</span>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CiscPanel state={state.cisc} />
        <RiscPanel state={state.risc} />
      </div>

      <AnimatePresence>
        {showModal && (
          <ResultModal
            key="result-modal"
            onClose={() => setIsManualOpen(false)}
            ciscCycles={finalState.cisc.microOpCounter}
            riscCycles={finalState.risc.pc}
          />
        )}
      </AnimatePresence>
    </section>
  );
}