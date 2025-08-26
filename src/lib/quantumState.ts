// Quantum state management and operations
export interface QuantumState {
  alpha: { real: number; imaginary: number };
  beta: { real: number; imaginary: number };
}

export interface BlochCoordinates {
  x: number;
  y: number;
  z: number;
}

// Initialize quantum state |+⟩ = (|0⟩ + |1⟩)/√2
export const initialQuantumState: QuantumState = {
  alpha: { real: 1 / Math.sqrt(2), imaginary: 0 },
  beta: { real: 1 / Math.sqrt(2), imaginary: 0 }
};

// Quantum gate operations
export const quantumGates = {
  // Pauli-X gate (NOT gate)
  pauliX: (state: QuantumState): QuantumState => ({
    alpha: state.beta,
    beta: state.alpha
  }),

  // Pauli-Y gate
  pauliY: (state: QuantumState): QuantumState => ({
    alpha: { real: -state.beta.imaginary, imaginary: state.beta.real },
    beta: { real: state.alpha.imaginary, imaginary: -state.alpha.real }
  }),

  // Pauli-Z gate
  pauliZ: (state: QuantumState): QuantumState => ({
    alpha: state.alpha,
    beta: { real: -state.beta.real, imaginary: -state.beta.imaginary }
  }),

  // Hadamard gate
  hadamard: (state: QuantumState): QuantumState => {
    const sqrt2 = Math.sqrt(2);
    return {
      alpha: {
        real: (state.alpha.real + state.beta.real) / sqrt2,
        imaginary: (state.alpha.imaginary + state.beta.imaginary) / sqrt2
      },
      beta: {
        real: (state.alpha.real - state.beta.real) / sqrt2,
        imaginary: (state.alpha.imaginary - state.beta.imaginary) / sqrt2
      }
    };
  },

  // Phase gate (S gate)
  phase: (state: QuantumState): QuantumState => ({
    alpha: state.alpha,
    beta: { real: -state.beta.imaginary, imaginary: state.beta.real }
  })
};

// Convert quantum state to Bloch sphere coordinates
export const stateToBloch = (state: QuantumState): BlochCoordinates => {
  const { alpha, beta } = state;
  
  // Calculate Bloch vector components
  const x = 2 * (alpha.real * beta.real + alpha.imaginary * beta.imaginary);
  const y = 2 * (alpha.imaginary * beta.real - alpha.real * beta.imaginary);
  const z = alpha.real * alpha.real + alpha.imaginary * alpha.imaginary - 
           beta.real * beta.real - beta.imaginary * beta.imaginary;
  
  return { x, y, z };
};

// Calculate probabilities
export const calculateProbabilities = (state: QuantumState) => {
  const prob0 = state.alpha.real * state.alpha.real + state.alpha.imaginary * state.alpha.imaginary;
  const prob1 = state.beta.real * state.beta.real + state.beta.imaginary * state.beta.imaginary;
  
  return { prob0, prob1 };
};

// Perform measurement
export const measureQubit = (state: QuantumState): { result: '0' | '1'; newState: QuantumState } => {
  const { prob0 } = calculateProbabilities(state);
  const measurement = Math.random();
  
  if (measurement < prob0) {
    return {
      result: '0',
      newState: { alpha: { real: 1, imaginary: 0 }, beta: { real: 0, imaginary: 0 } }
    };
  } else {
    return {
      result: '1',
      newState: { alpha: { real: 0, imaginary: 0 }, beta: { real: 1, imaginary: 0 } }
    };
  }
};

// Format complex number for display
export const formatComplex = (complex: { real: number; imaginary: number }): string => {
  const real = Math.round(complex.real * 1000) / 1000;
  const imag = Math.round(complex.imaginary * 1000) / 1000;
  
  if (imag === 0) return real.toString();
  if (real === 0) return `${imag}i`;
  if (imag > 0) return `${real} + ${imag}i`;
  return `${real} - ${Math.abs(imag)}i`;
};

// Generate export data
export const generateQuantumReport = (state: QuantumState, measurements: string[]) => {
  const { prob0, prob1 } = calculateProbabilities(state);
  const bloch = stateToBloch(state);
  
  const report = {
    timestamp: new Date().toISOString(),
    quantumState: {
      amplitude0: formatComplex(state.alpha),
      amplitude1: formatComplex(state.beta),
      probabilities: {
        state0: `${(prob0 * 100).toFixed(1)}%`,
        state1: `${(prob1 * 100).toFixed(1)}%`
      }
    },
    blochSphere: {
      x: bloch.x.toFixed(3),
      y: bloch.y.toFixed(3),
      z: bloch.z.toFixed(3)
    },
    measurements: measurements,
    operations: 'User applied quantum gates and measurements'
  };
  
  return report;
};

export const downloadReport = (data: any, filename: string) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};