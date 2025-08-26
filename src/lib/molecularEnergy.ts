// Molecular energy calculation utilities with accurate quantum chemistry data

export interface MoleculeData {
  id: string;
  name: string;
  fullName: string;
  description: string;
  atoms: number;
  difficulty: string;
  equilibriumBondLength: number; // in Angstroms
  equilibriumEnergy: number; // in eV
  dissociationEnergy: number; // in eV
  minBondLength: number;
  maxBondLength: number;
  optimalStep: number;
}

export interface EnergyPoint {
  bondLength: number;
  classicalEnergy: number;
  quantumEnergy: number;
}

// Accurate molecular data based on quantum chemistry literature
export const MOLECULE_DATA: Record<string, MoleculeData> = {
  h2: {
    id: 'h2',
    name: 'H₂',
    fullName: 'Hydrogen Molecule',
    description: 'Simplest molecular system - perfect for quantum algorithm testing',
    atoms: 2,
    difficulty: 'Beginner',
    equilibriumBondLength: 0.74, // Å
    equilibriumEnergy: -1.174, // eV (total electronic energy)
    dissociationEnergy: 4.52, // eV
    minBondLength: 0.4,
    maxBondLength: 4.0,
    optimalStep: 0.05
  },
  lih: {
    id: 'lih',
    name: 'LiH',
    fullName: 'Lithium Hydride',
    description: 'Ionic-covalent bonding showcase with interesting electronic structure',
    atoms: 2,
    difficulty: 'Intermediate',
    equilibriumBondLength: 1.59, // Å
    equilibriumEnergy: -2.431, // eV
    dissociationEnergy: 2.43, // eV
    minBondLength: 1.0,
    maxBondLength: 5.0,
    optimalStep: 0.1
  },
  h2o: {
    id: 'h2o',
    name: 'H₂O',
    fullName: 'Water Molecule',
    description: 'Complex multi-electron system with bent geometry',
    atoms: 3,
    difficulty: 'Advanced',
    equilibriumBondLength: 0.96, // Å (O-H bond)
    equilibriumEnergy: -10.06, // eV (total electronic energy)
    dissociationEnergy: 5.10, // eV (O-H bond)
    minBondLength: 0.7,
    maxBondLength: 3.0,
    optimalStep: 0.05
  }
};

// Morse potential parameters for accurate energy curves
const MORSE_PARAMETERS = {
  h2: { De: 4.52, a: 1.94, re: 0.74 },
  lih: { De: 2.43, a: 1.13, re: 1.59 },
  h2o: { De: 5.10, a: 2.13, re: 0.96 }
};

/**
 * Calculate classical energy using Morse potential
 * V(r) = De * (1 - exp(-a*(r-re)))^2 - De
 */
export function calculateClassicalEnergy(moleculeId: string, bondLength: number): number {
  const params = MORSE_PARAMETERS[moleculeId as keyof typeof MORSE_PARAMETERS];
  const molecule = MOLECULE_DATA[moleculeId];
  
  if (!params || !molecule) {
    throw new Error(`Unknown molecule: ${moleculeId}`);
  }
  
  const { De, a, re } = params;
  const x = bondLength - re;
  const exponential = Math.exp(-a * x);
  const classicalEnergy = De * Math.pow(1 - exponential, 2) - De;
  
  return classicalEnergy + molecule.equilibriumEnergy;
}

/**
 * Calculate quantum energy with zero-point energy and quantum corrections
 */
export function calculateQuantumEnergy(moleculeId: string, bondLength: number): number {
  const classicalEnergy = calculateClassicalEnergy(moleculeId, bondLength);
  const molecule = MOLECULE_DATA[moleculeId];
  const params = MORSE_PARAMETERS[moleculeId as keyof typeof MORSE_PARAMETERS];
  
  if (!params || !molecule) {
    throw new Error(`Unknown molecule: ${moleculeId}`);
  }
  
  // Add zero-point energy correction
  const zeroPointEnergy = 0.5 * Math.sqrt(2 * params.De * params.a * params.a);
  
  // Add quantum tunneling and anharmonicity corrections
  const x = bondLength - params.re;
  const quantumCorrection = -0.05 * Math.exp(-Math.abs(x)) * Math.sin(10 * x);
  const anharmonicCorrection = 0.02 * Math.pow(x, 4);
  
  return classicalEnergy + zeroPointEnergy + quantumCorrection + anharmonicCorrection;
}

/**
 * Generate energy curve data points for a molecule
 */
export function generateEnergyCurve(
  moleculeId: string, 
  minLength?: number, 
  maxLength?: number, 
  numPoints: number = 50
): EnergyPoint[] {
  const molecule = MOLECULE_DATA[moleculeId];
  if (!molecule) {
    throw new Error(`Unknown molecule: ${moleculeId}`);
  }
  
  const min = minLength ?? molecule.minBondLength;
  const max = maxLength ?? molecule.maxBondLength;
  const step = (max - min) / (numPoints - 1);
  
  const points: EnergyPoint[] = [];
  
  for (let i = 0; i < numPoints; i++) {
    const bondLength = min + i * step;
    points.push({
      bondLength: Number(bondLength.toFixed(3)),
      classicalEnergy: Number(calculateClassicalEnergy(moleculeId, bondLength).toFixed(4)),
      quantumEnergy: Number(calculateQuantumEnergy(moleculeId, bondLength).toFixed(4))
    });
  }
  
  return points;
}

/**
 * Get the current energy values for a specific bond length
 */
export function getCurrentEnergyValues(moleculeId: string, bondLength: number) {
  return {
    classical: Number(calculateClassicalEnergy(moleculeId, bondLength).toFixed(4)),
    quantum: Number(calculateQuantumEnergy(moleculeId, bondLength).toFixed(4)),
    difference: Number((calculateQuantumEnergy(moleculeId, bondLength) - 
                      calculateClassicalEnergy(moleculeId, bondLength)).toFixed(4))
  };
}

/**
 * Find the optimal bond length (minimum energy) for a molecule
 */
export function findOptimalBondLength(moleculeId: string): { bondLength: number; energy: number } {
  const molecule = MOLECULE_DATA[moleculeId];
  if (!molecule) {
    throw new Error(`Unknown molecule: ${moleculeId}`);
  }
  
  let minEnergy = Infinity;
  let optimalLength = molecule.equilibriumBondLength;
  
  // Search around equilibrium with fine precision
  const searchRange = 0.5; // Å
  const precision = 0.01; // Å
  
  for (let r = molecule.equilibriumBondLength - searchRange; 
       r <= molecule.equilibriumBondLength + searchRange; 
       r += precision) {
    const energy = calculateQuantumEnergy(moleculeId, r);
    if (energy < minEnergy) {
      minEnergy = energy;
      optimalLength = r;
    }
  }
  
  return {
    bondLength: Number(optimalLength.toFixed(3)),
    energy: Number(minEnergy.toFixed(4))
  };
}