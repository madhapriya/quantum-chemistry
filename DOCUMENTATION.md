# Quantum Chemistry VQE Simulation Platform

## Project Overview

This is a comprehensive web-based quantum chemistry simulation platform that demonstrates the power of **Variational Quantum Eigensolver (VQE)** algorithms for molecular ground state energy calculations. The platform provides an interactive environment for exploring quantum chemistry concepts, comparing classical vs quantum approaches, and visualizing quantum states.

### 🎯 Purpose
- **Educational**: Teach quantum chemistry and quantum computing concepts
- **Research**: Provide tools for quantum algorithm development and testing
- **Visualization**: Interactive 3D quantum state representations and energy surfaces
- **Comparison**: Side-by-side classical vs quantum molecular calculations

### 🔬 Supported Molecules
- **H₂ (Hydrogen)**: Simplest molecular system, perfect for learning
- **LiH (Lithium Hydride)**: Ionic-covalent bonding demonstration
- **H₂O (Water)**: Complex multi-electron system with bent geometry

## 🚀 Key Features

### Quantum Simulations
- **Real-time VQE calculations** with parametric quantum circuits
- **Interactive bond length optimization** with live energy tracking
- **Quantum state preparation** and evolution visualization
- **Classical optimizer integration** (SLSQP, COBYLA, Gradient Descent)

### Visualizations
- **3D Bloch sphere** quantum state representation
- **Animated quantum circuits** for H₂ and H₄ molecules
- **Energy landscape plotting** with real-time updates
- **Quantum gate operations** with parameter controls

### Educational Content
- **Step-by-step VQE workflow** with animated explanations
- **Interactive "How It Works"** guide with quantum concepts
- **Comparative analysis** of classical vs quantum approaches
- **Downloadable simulation reports** in JSON format

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds  
- **Tailwind CSS** with custom quantum-themed design system
- **Recharts** for energy curve visualizations
- **React Router** for client-side navigation
- **React Three Fiber + Drei** for 3D Bloch sphere rendering

### Design System
- **Quantum-themed color palette**: Deep space blues, electric purples, quantum energy states
- **Custom animations**: Quantum pulse, glow effects, floating elements
- **Responsive layout**: Mobile-first design with fluid grids
- **Semantic tokens**: HSL-based color system for consistency

### State Management
- **React Hooks** for local component state
- **Context API** for global quantum state
- **TanStack Query** for data fetching and caching
- **URL parameters** for shareable simulation states

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                          # Reusable UI components (shadcn/ui)
│   ├── EfficientQuantumCircuit.tsx  # 4-qubit VQE circuit visualization
│   └── QuantumCircuit.tsx           # H₂ molecule VQE circuit diagram
├── pages/
│   ├── Index.tsx                    # Landing page with molecule selector
│   ├── Simulation.tsx               # Interactive molecular simulation
│   ├── Visualization.tsx            # Quantum state visualization
│   ├── Results.tsx                  # Simulation results dashboard
│   ├── HowItWorks.tsx              # Educational VQE workflow guide
│   └── NotFound.tsx                # 404 error page
├── lib/
│   ├── quantumState.ts              # Quantum state operations and gates
│   ├── molecularEnergy.ts           # Energy calculations and Morse potential
│   └── utils.ts                     # Utility functions
├── hooks/
│   ├── use-mobile.tsx               # Mobile device detection
│   └── use-toast.ts                 # Toast notification system
├── App.tsx                          # Main application component
├── main.tsx                         # Application entry point
└── index.css                        # Global styles and design tokens
```

## 🧮 Core Libraries and APIs

### Quantum State Management (`src/lib/quantumState.ts`)

#### Types
```typescript
interface QuantumState {
  alpha: { real: number; imaginary: number };  // Amplitude for |0⟩ state
  beta: { real: number; imaginary: number };   // Amplitude for |1⟩ state
}

interface BlochCoordinates {
  x: number;  // X coordinate on Bloch sphere
  y: number;  // Y coordinate on Bloch sphere  
  z: number;  // Z coordinate on Bloch sphere
}
```

#### Key Functions

**Quantum Gates**
```typescript
// Apply Pauli-X (bit flip) gate
quantumGates.pauliX(state: QuantumState): QuantumState

// Apply Pauli-Y gate
quantumGates.pauliY(state: QuantumState): QuantumState

// Apply Pauli-Z (phase flip) gate
quantumGates.pauliZ(state: QuantumState): QuantumState

// Apply Hadamard (superposition) gate
quantumGates.hadamard(state: QuantumState): QuantumState

// Apply phase rotation gate
quantumGates.phase(state: QuantumState, angle: number): QuantumState
```

**State Analysis**
```typescript
// Convert quantum state to Bloch sphere coordinates
stateToBloch(state: QuantumState): BlochCoordinates

// Calculate measurement probabilities
calculateProbabilities(state: QuantumState): { prob0: number; prob1: number }

// Simulate quantum measurement
measureQubit(state: QuantumState): { result: '0' | '1'; newState: QuantumState }
```

**Utilities**
```typescript
// Format complex numbers for display
formatComplex(complex: { real: number; imaginary: number }): string

// Generate comprehensive quantum report
generateQuantumReport(state: QuantumState, measurements: string[]): any

// Download simulation data as JSON
downloadReport(data: any, filename: string): void
```

### Molecular Energy Calculations (`src/lib/molecularEnergy.ts`)

#### Molecular Data Structure
```typescript
interface MoleculeData {
  id: string;                    // Unique identifier (h2, lih, h2o)
  name: string;                  // Display name (H₂, LiH, H₂O)
  fullName: string;              // Full chemical name
  atoms: number;                 // Number of atoms
  difficulty: string;            // Simulation complexity
  equilibriumBondLength: number; // Optimal bond length (Å)
  equilibriumEnergy: number;     // Ground state energy (eV)
  dissociationEnergy: number;    // Bond dissociation energy (eV)
  minBondLength: number;         // Minimum bond length for simulation
  maxBondLength: number;         // Maximum bond length for simulation
  optimalStep: number;           // Step size for bond length slider
}
```

#### Energy Calculation Functions
```typescript
// Calculate classical energy using Morse potential
calculateClassicalEnergy(moleculeId: string, bondLength: number): number

// Calculate quantum mechanical energy with corrections
calculateQuantumEnergy(moleculeId: string, bondLength: number): number

// Generate complete energy curve data
generateEnergyCurve(
  moleculeId: string, 
  minLength: number, 
  maxLength: number, 
  points: number
): EnergyPoint[]

// Get energy values at specific bond length
getCurrentEnergyValues(moleculeId: string, bondLength: number): {
  classical: number;
  quantum: number;
  difference: number;
}

// Find optimal bond length with minimum energy
findOptimalBondLength(moleculeId: string): {
  bondLength: number;
  energy: number;
}
```

#### Morse Potential Parameters
```typescript
const MORSE_PARAMETERS = {
  h2: { De: 4.7446, a: 1.9426, re: 0.7414 },
  lih: { De: 2.5152, a: 1.1280, re: 1.5949 },
  h2o: { De: 5.2040, a: 2.2940, re: 0.9572 }
};
```

## 🎨 Design System

### Color Palette (HSL Values)
```css
/* Quantum Primary - Electric Blue */
--primary: 217 91% 60%;

/* Quantum Secondary - Deep Purple */  
--secondary: 263 85% 58%;

/* Quantum Accent - Cyan Energy */
--accent: 189 85% 63%;

/* Quantum Background - Deep Space */
--background: 222 84% 4.9%;

/* Quantum Surface */
--card: 223 71% 8%;
```

### Custom Animations
```css
/* Quantum pulse effect */
.quantum-pulse {
  animation: quantum-pulse 2s ease-in-out infinite;
}

/* Quantum glow effect */
.quantum-glow {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.4);
}

/* Floating animation */
.quantum-float {
  animation: quantum-float 3s ease-in-out infinite;
}
```

### Gradients
```css
/* Main quantum gradient */
--gradient-quantum: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));

/* Energy visualization gradient */
--gradient-energy: linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)));
```

## 🎮 Usage Guide

### Getting Started
1. **Select a molecule** from the homepage (H₂, LiH, or H₂O)
2. **Adjust parameters** using the interactive controls
3. **Run simulations** to see real-time energy calculations
4. **Explore visualizations** of quantum states and circuits
5. **Download reports** for further analysis

### Simulation Workflow
1. **Molecule Selection**: Choose from available molecular systems
2. **Parameter Adjustment**: Modify bond lengths with real-time feedback
3. **VQE Execution**: Run quantum variational algorithms
4. **Energy Optimization**: Watch classical optimizers find ground states
5. **Results Analysis**: Compare classical vs quantum approaches
6. **State Visualization**: Explore 3D Bloch sphere representations

### Navigation
- **Home (/)**: Molecule selection and platform overview
- **Simulation (/simulation/:moleculeId)**: Interactive molecular calculations
- **Visualization (/visualization)**: Quantum state and circuit diagrams
- **Results (/results)**: Comprehensive analysis dashboard
- **How It Works (/how-it-works)**: Educational VQE workflow guide

## 🛠️ Installation & Development

### Prerequisites
- **Node.js**: Version 18+ with npm
- **Modern browser**: Chrome, Firefox, Safari, or Edge

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd quantum-chemistry-vqe

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:8080
```

### Build for Production
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Environment Configuration
No environment variables required - the application runs entirely client-side with simulated quantum calculations.

## 🚀 Deployment

### Lovable Platform
The application is designed for deployment on the Lovable platform:
1. Click **"Publish"** button in the Lovable editor
2. Your app will be available at `yourproject.lovable.app`
3. Custom domains can be configured in project settings

### Alternative Deployment
The built application can be deployed to any static hosting service:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Push `dist/` to `gh-pages` branch

## 🔬 Scientific Accuracy

### Quantum Algorithms
- **VQE Implementation**: Based on established quantum chemistry literature
- **Gate Operations**: Accurate quantum gate matrix representations
- **State Evolution**: Proper quantum state vector calculations
- **Measurement**: Realistic quantum measurement simulation

### Molecular Data
- **Bond Lengths**: Experimental equilibrium values from literature
- **Energies**: Ground state energies from quantum chemistry databases
- **Morse Parameters**: Fitted to spectroscopic data
- **Geometry**: Accurate molecular geometries

### Limitations
- **Simplified Models**: Uses educational approximations for clarity
- **Classical Simulation**: Simulates quantum behavior on classical hardware
- **Limited Basis Sets**: Uses minimal basis sets for performance
- **Noise-Free**: Does not include quantum hardware noise models

## 🤝 Contributing

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Enforced code quality rules
- **Prettier**: Consistent code formatting
- **Component Structure**: Functional components with hooks

### Adding New Molecules
1. Add molecular data to `MOLECULE_DATA` in `molecularEnergy.ts`
2. Include Morse potential parameters in `MORSE_PARAMETERS`
3. Add molecule option to homepage selector
4. Test energy calculations across bond length range

### Adding New Visualizations
1. Create new component in `src/components/`
2. Use React Three Fiber for 3D graphics
3. Follow quantum-themed design system
4. Include educational descriptions

## 📝 License

This project is created for educational purposes and research. Please cite appropriately if used in academic work.

## 🔗 References

### Quantum Chemistry
- Szabo, A. & Ostlund, N. S. "Modern Quantum Chemistry" (1996)
- McQuarrie, D. A. "Quantum Chemistry" (2007)
- Helgaker, T. et al. "Molecular Electronic-Structure Theory" (2000)

### Quantum Computing
- Nielsen, M. A. & Chuang, I. L. "Quantum Computation and Quantum Information" (2010)
- Peruzzo, A. et al. "A variational eigenvalue solver on a photonic quantum processor" Nature 2014
- Kandala, A. et al. "Hardware-efficient variational quantum eigensolver for small molecules" Nature 2017

### Web Technologies
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Recharts](https://recharts.org/)

---

*This documentation is maintained alongside the codebase. For questions or contributions, please refer to the project repository.*