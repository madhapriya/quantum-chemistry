import { useState, useEffect } from "react";

interface EfficientQuantumCircuitProps {
  animate?: boolean;
}

const EfficientQuantumCircuit = ({ animate = true }: EfficientQuantumCircuitProps) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (animate) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 5);
      }, 1200);
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
        width="1000" 
        height="300" 
        viewBox="0 0 1000 300" 
        className="w-full h-auto max-w-5xl mx-auto"
        style={{ background: "hsl(var(--card))" }}
      >
        {/* Circuit lines for 4 qubits */}
        <line x1="50" y1="60" x2="950" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="50" y1="100" x2="950" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="50" y1="140" x2="950" y2="140" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="50" y1="180" x2="950" y2="180" stroke="hsl(var(--foreground))" strokeWidth="2" />
        
        {/* Qubit labels */}
        <text x="20" y="65" fill="hsl(var(--foreground))" fontSize="14" fontFamily="monospace">q0</text>
        <text x="20" y="105" fill="hsl(var(--foreground))" fontSize="14" fontFamily="monospace">q1</text>
        <text x="20" y="145" fill="hsl(var(--foreground))" fontSize="14" fontFamily="monospace">q2</text>
        <text x="20" y="185" fill="hsl(var(--foreground))" fontSize="14" fontFamily="monospace">q3</text>
        
        {/* Initial state labels */}
        <text x="60" y="45" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace">|0⟩</text>
        <text x="60" y="85" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace">|0⟩</text>
        <text x="60" y="125" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace">|0⟩</text>
        <text x="60" y="165" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace">|0⟩</text>

        {/* Step 1: Hartree-Fock Initialization */}
        <g opacity={getGateOpacity(0)}>
          <rect x="100" y="40" width="40" height="40" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(0)} 
                strokeWidth="2" 
                rx="5" />
          <text x="120" y="65" fill="hsl(var(--foreground))" fontSize="16" fontFamily="monospace" textAnchor="middle">X</text>
          
          <rect x="100" y="80" width="40" height="40" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(0)} 
                strokeWidth="2" 
                rx="5" />
          <text x="120" y="105" fill="hsl(var(--foreground))" fontSize="16" fontFamily="monospace" textAnchor="middle">X</text>
          
          <text x="120" y="25" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">HF Init</text>
        </g>

        {/* Step 2: Efficient Single Qubit Rotations */}
        <g opacity={getGateOpacity(1)}>
          <rect x="200" y="40" width="50" height="30" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(1)} 
                strokeWidth="2" 
                rx="5" />
          <text x="225" y="60" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">Ry(θ₀)</text>
          
          <rect x="200" y="80" width="50" height="30" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(1)} 
                strokeWidth="2" 
                rx="5" />
          <text x="225" y="100" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">Ry(θ₁)</text>
          
          <rect x="200" y="120" width="50" height="30" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(1)} 
                strokeWidth="2" 
                rx="5" />
          <text x="225" y="140" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">Ry(θ₂)</text>
          
          <rect x="200" y="160" width="50" height="30" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(1)} 
                strokeWidth="2" 
                rx="5" />
          <text x="225" y="180" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">Ry(θ₃)</text>
        </g>

        {/* Step 3: Linear Entanglement Pattern (Efficient) */}
        <g opacity={getGateOpacity(2)}>
          {/* CNOT q0 -> q1 */}
          <circle cx="350" cy="60" r="6" fill={getGateStroke(2)} />
          <circle cx="350" cy="100" r="15" fill="hsl(var(--card))" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="345" y1="100" x2="355" y2="100" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="350" y1="95" x2="350" y2="105" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="350" y1="60" x2="350" y2="100" stroke={getGateStroke(2)} strokeWidth="2" />
          
          {/* CNOT q1 -> q2 */}
          <circle cx="400" cy="100" r="6" fill={getGateStroke(2)} />
          <circle cx="400" cy="140" r="15" fill="hsl(var(--card))" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="395" y1="140" x2="405" y2="140" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="400" y1="135" x2="400" y2="145" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="400" y1="100" x2="400" y2="140" stroke={getGateStroke(2)} strokeWidth="2" />
          
          {/* CNOT q2 -> q3 */}
          <circle cx="450" cy="140" r="6" fill={getGateStroke(2)} />
          <circle cx="450" cy="180" r="15" fill="hsl(var(--card))" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="445" y1="180" x2="455" y2="180" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="450" y1="175" x2="450" y2="185" stroke={getGateStroke(2)} strokeWidth="2" />
          <line x1="450" y1="140" x2="450" y2="180" stroke={getGateStroke(2)} strokeWidth="2" />
          
          <text x="400" y="220" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">Linear Entanglement</text>
        </g>

        {/* Step 4: Additional Entanglement Layer */}
        <g opacity={getGateOpacity(3)}>
          {/* CNOT q0 -> q2 (skip connection) */}
          <circle cx="550" cy="60" r="6" fill={getGateStroke(3)} />
          <circle cx="550" cy="140" r="15" fill="hsl(var(--card))" stroke={getGateStroke(3)} strokeWidth="2" />
          <line x1="545" y1="140" x2="555" y2="140" stroke={getGateStroke(3)} strokeWidth="2" />
          <line x1="550" y1="135" x2="550" y2="145" stroke={getGateStroke(3)} strokeWidth="2" />
          <line x1="550" y1="60" x2="550" y2="140" stroke={getGateStroke(3)} strokeWidth="2" />
          
          {/* CNOT q1 -> q3 (skip connection) */}
          <circle cx="600" cy="100" r="6" fill={getGateStroke(3)} />
          <circle cx="600" cy="180" r="15" fill="hsl(var(--card))" stroke={getGateStroke(3)} strokeWidth="2" />
          <line x1="595" y1="180" x2="605" y2="180" stroke={getGateStroke(3)} strokeWidth="2" />
          <line x1="600" y1="175" x2="600" y2="185" stroke={getGateStroke(3)} strokeWidth="2" />
          <line x1="600" y1="100" x2="600" y2="180" stroke={getGateStroke(3)} strokeWidth="2" />
          
          <text x="575" y="220" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">Skip Connections</text>
        </g>

        {/* Step 5: Final Rotation Layer */}
        <g opacity={getGateOpacity(4)}>
          <rect x="700" y="40" width="50" height="30" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(4)} 
                strokeWidth="2" 
                rx="5" />
          <text x="725" y="60" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">Rz(θ₄)</text>
          
          <rect x="700" y="80" width="50" height="30" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(4)} 
                strokeWidth="2" 
                rx="5" />
          <text x="725" y="100" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">Rz(θ₅)</text>
          
          <rect x="700" y="120" width="50" height="30" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(4)} 
                strokeWidth="2" 
                rx="5" />
          <text x="725" y="140" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">Rz(θ₆)</text>
          
          <rect x="700" y="160" width="50" height="30" 
                fill="hsl(var(--card))" 
                stroke={getGateStroke(4)} 
                strokeWidth="2" 
                rx="5" />
          <text x="725" y="180" fill="hsl(var(--foreground))" fontSize="10" fontFamily="monospace" textAnchor="middle">Rz(θ₇)</text>
        </g>

        {/* Measurement symbols */}
        <g>
          <rect x="850" y="40" width="30" height="30" 
                fill="hsl(var(--card))" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
                rx="3" />
          <path d="M860,65 Q865,50 870,65" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" />
          
          <rect x="850" y="80" width="30" height="30" 
                fill="hsl(var(--card))" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
                rx="3" />
          <path d="M860,105 Q865,90 870,105" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" />
          
          <rect x="850" y="120" width="30" height="30" 
                fill="hsl(var(--card))" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
                rx="3" />
          <path d="M860,145 Q865,130 870,145" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" />
          
          <rect x="850" y="160" width="30" height="30" 
                fill="hsl(var(--card))" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
                rx="3" />
          <path d="M860,185 Q865,170 870,185" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" />
        </g>
        
        {/* Title */}
        <text x="500" y="20" fill="hsl(var(--foreground))" fontSize="16" fontWeight="bold" textAnchor="middle">
          Efficient 4-Qubit VQE Ansatz (H₄ / BeH₂)
        </text>
        
        {/* Efficiency indicators */}
        <g>
          <text x="500" y="260" fill="hsl(var(--primary))" fontSize="12" fontWeight="bold" textAnchor="middle">
            Efficiency Features:
          </text>
          <text x="500" y="275" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">
            Linear Entanglement • Skip Connections • Minimal Gate Count • O(n) CNOT Gates
          </text>
        </g>

        {/* Gate count comparison */}
        <g>
          <rect x="20" y="240" width="150" height="40" fill="hsl(var(--muted)/20)" stroke="hsl(var(--border))" strokeWidth="1" rx="5" />
          <text x="95" y="255" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold" textAnchor="middle">Gate Count</text>
          <text x="95" y="270" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">Single-qubit: 8 | CNOT: 5</text>
        </g>
        
        {/* Step labels */}
        <text x="120" y="250" fill="hsl(var(--muted-foreground))" fontSize="8" textAnchor="middle">1. Init</text>
        <text x="225" y="250" fill="hsl(var(--muted-foreground))" fontSize="8" textAnchor="middle">2. Ry Layer</text>
        <text x="400" y="250" fill="hsl(var(--muted-foreground))" fontSize="8" textAnchor="middle">3. Linear Ent.</text>
        <text x="575" y="250" fill="hsl(var(--muted-foreground))" fontSize="8" textAnchor="middle">4. Skip Conn.</text>
        <text x="725" y="250" fill="hsl(var(--muted-foreground))" fontSize="8" textAnchor="middle">5. Rz Layer</text>
        
        {/* Animation indicator */}
        {animate && (
          <circle 
            cx={[120, 225, 400, 575, 725][animationPhase]} 
            cy="245" 
            r="4" 
            fill="hsl(263, 85%, 58%)"
          >
            <animate attributeName="opacity" values="1;0;1" dur="0.6s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
    </div>
  );
};

export default EfficientQuantumCircuit;