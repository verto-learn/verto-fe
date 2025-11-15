export const initialState = {
  status: 'idle',
  totalCycles: 0,
  risc: {
    pc: 0,
    registers: { R1: 0, R2: 0, R3: 0 },
    memory: { A: 10, B: 20, C: 0 },
  },
  cisc: {
    microOpCounter: 0,
    memory: { A: 10, B: 20, C: 0 },
    internalStatus: 'Idle',
  },
};

// --- Daftar Instruksi (Konstanta) ---
export const riscInstructions = [
  '1. LOAD R1, [A]',
  '2. LOAD R2, [B]',
  '3. ADD R3, R1, R2',
  '4. STORE [C], R3',
  '(Done)',
];
export const ciscInstruction = 'ADD [C], [A], [B]';


// --- Logika Reducer (Jantung Simulasi) ---
export function simulatorReducer(state, action) {
  if (action === 'RESET') {
    return initialState;
  }

  if (action === 'NEXT_CYCLE') {
    if (state.status === 'finished') return state;

    let nextState = JSON.parse(JSON.stringify(state)); // Deep copy state
    nextState.totalCycles += 1;
    nextState.status = 'running';

    let isRiscDone = false;
    let isCiscDone = false;

    // --- LOGIKA CISC ---
    if (state.cisc.microOpCounter <= 6) {
        switch (state.cisc.microOpCounter) {
            case 0: nextState.cisc.internalStatus = '1. Fetch Instruction'; break;
            case 1: nextState.cisc.internalStatus = '2. Decode Instruction'; break;
            case 2: nextState.cisc.internalStatus = '3. Fetch Operand A'; break;
            case 3: nextState.cisc.internalStatus = '4. Fetch Operand B'; break;
            case 4: nextState.cisc.internalStatus = '5. Execute Add'; break;
            case 5:
                nextState.cisc.internalStatus = '6. Write Result C';
                nextState.cisc.memory.C = state.cisc.memory.A + state.cisc.memory.B;
                break;
            case 6:
                nextState.cisc.internalStatus = 'Done';
                isCiscDone = true;
                break;
        }
        if (!isCiscDone) nextState.cisc.microOpCounter += 1;
    } else {
        isCiscDone = true;
    }


    // --- LOGIKA RISC ---
    if (state.risc.pc <= 4) {
        switch (state.risc.pc) {
            case 0: nextState.risc.registers.R1 = state.risc.memory.A; break;
            case 1: nextState.risc.registers.R2 = state.risc.memory.B; break;
            case 2: nextState.risc.registers.R3 = state.risc.registers.R1 + state.risc.registers.R2; break;
            case 3: nextState.risc.memory.C = state.risc.registers.R3; break;
            case 4: isRiscDone = true; break;
        }
        if (!isRiscDone) nextState.risc.pc += 1;
    } else {
        isRiscDone = true;
    }

    
    if (isRiscDone && isCiscDone) {
      nextState.status = 'finished';
    }

    return nextState;
  }

  return state;
}