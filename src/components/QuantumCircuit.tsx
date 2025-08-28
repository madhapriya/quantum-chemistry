import { useState, useEffect } from "react";

interface QuantumCircuitProps {
  theta0?: number;
  theta1?: number;
  theta2?: number;
  theta3?: number;
  animate?: boolean;
}

const QuantumCircuit = ({ 
  theta0 = 0.5, 
  theta1 = 0.3, 
  theta2 = 0.7, 
  theta3 = 0.2, 
  animate = true 
}: QuantumCircuitProps) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (animate) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 4);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [animate]);

  const getGateOpacity = (gateIndex: number) => {
    if (!animate) return 1;
    return animationPhase === gateIndex ? 0.7 : 1;
  };

  const getGateStroke = (gateIndex: number) => {
    if (!animate) return "hsl(217, 91%, 60%)";
    return animationPhase === gateIndex ? "hsl(263, 85%, 58%)" : "hsl(217, 91%, 60%)";
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg 
        width="800" 
        height="200" 
        viewBox="0 0 800 200" 
        className="w-full h-auto max-w-4xl mx-auto"
        style={{ background: "hsl(var(--card))" }}
      >
        {/* Circuit lines */}
        <line x1="50" y1="60" x2="750" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="50" y1="140" x2="750" y2="140" stroke="hsl(var(--foreground))" strokeWidth="2" />
        
        {/* Qubit labels */}
        <text x="20" y="65" fill="hsl(var(--foreground))" fontSize="14" fontFamily="monospace">q0</text>
        <text x="20" y="145" fill="hsl(var(--foreground))" fontSize="14" fontFamily="monospace">q1</text>
        
        {/* Initial state labels */}
        <text x="60" y="45" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace">|0⟩</text>
        <text x="60" y="130" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace">|0⟩</text>
        
        {/* X Gate on q0 (Hartree-Fock initialization) */}
        <g opacity={getGateOpacity(0)}>
          <rect x="100" y="40" width="40" height="40" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(0)} 
                strokeWidth="2" 
                rx="5" />
          <text x="120" y="65" fill="hsl(var(--foreground))" fontSize="16" fontFamily="monospace" textAnchor="middle">X</text>
          <text x="120" y="25" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">HF Init</text>
        </g>
        
        {/* Ry Gates */}
        <g opacity={getGateOpacity(1)}>
          {/* Ry(θ0) on q0 */}
          <rect x="200" y="40" width="60" height="40" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(1)} 
                strokeWidth="2" 
                rx="5" />
          <text x="230" y="58" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace" textAnchor="middle">Ry</text>
          <text x="230" y="72" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">(θ₀={theta0.toFixed(2)})</text>
          
          {/* Ry(θ1) on q1 */}
          <rect x="200" y="120" width="60" height="40" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(1)} 
                strokeWidth="2" 
                rx="5" />
          <text x="230" y="138" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace" textAnchor="middle">Ry</text>
          <text x="230" y="152" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">(θ₁={theta1.toFixed(2)})</text>
        </g>
        
        {/* CNOT Gate */}
        <g opacity={getGateOpacity(2)}>
          {/* Control dot on q0 */}
          <circle cx="350" cy="60" r="8" fill={getGateStroke(2)} />
          {/* Target on q1 */}
          <circle cx="350" cy="140" r="20" fill="hsl(var(--card))" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="340" y1="140" x2="360" y2="140" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="350" y1="130" x2="350" y2="150" stroke={getGateStroke(2)} strokeWidth="2" />
          {/* Connection line */}
          <line x1="350" y1="60" x2="350" y2="140" stroke={getGateStroke(2)} strokeWidth="2" />
          <text x="350" y="100" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">CNOT</text>
        </g>
        
        {/* Rz Gates */}
        <g opacity={getGateOpacity(3)}>
          {/* Rz(θ2) on q0 */}
          <rect x="450" y="40" width="60" height="40" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(3)} 
                strokeWidth="2" 
                rx="5" />
          <text x="480" y="58" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace" textAnchor="middle">Rz</text>
          <text x="480" y="72" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">(θ₂={theta2.toFixed(2)})</text>
          
          {/* Rz(θ3) on q1 */}
          <rect x="450" y="120" width="60" height="40" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(3)} 
                strokeWidth="2" 
                rx="5" />
          <text x="480" y="138" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace" textAnchor="middle">Rz</text>
          <text x="480" y="152" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">(θ₃={theta3.toFixed(2)})</text>
        </g>
        
        {/* Measurement symbols at the end */}
        <g>
          <rect x="600" y="40" width="40" height="40" 
                fill="hsl(var(--card))" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
                rx="5" />
          <path d="M610,70 Q620,50 630,70" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" />
          <line x1="625" y1="50" x2="635" y2="40" stroke="hsl(var(--foreground))" strokeWidth="2" />
          
          <rect x="600" y="120" width="40" height="40" 
                fill="hsl(var(--card))" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
                rx="5" />
          <path d="M610,150 Q620,130 630,150" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" />
          <line x1="625" y1="130" x2="635" y2="120" stroke="hsl(var(--foreground))" strokeWidth="2" />
        </g>
        
        {/* Title */}
        <text x="400" y="20" fill="hsl(var(--foreground))" fontSize="16" fontWeight="bold" textAnchor="middle">
          H₂ Molecule VQE Ansatz Circuit
        </text>
        
        {/* Gate sequence labels */}
        <text x="120" y="190" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">1. HF Init</text>
        <text x="230" y="190" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">2. Ry Gates</text>
        <text x="350" y="190" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">3. Entanglement</text>
        <text x="480" y="190" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">4. Rz Gates</text>
        <text x="620" y="190" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">5. Measure</text>
        
        {/* Animation indicator */}
        {animate && (
          <circle 
            cx={[120, 230, 350, 480][animationPhase]} 
            cy="185" 
            r="3" 
            fill="hsl(263, 85%, 58%)"
          >
            <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
    </div>
  );
};

export default QuantumCircuit;