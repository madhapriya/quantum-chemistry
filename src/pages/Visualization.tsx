import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, Line } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as THREE from "three";
import { 
  QuantumState, 
  BlochCoordinates, 
  initialQuantumState, 
  quantumGates, 
  stateToBloch, 
  calculateProbabilities, 
  measureQubit, 
  formatComplex,
  generateQuantumReport,
  downloadReport
} from "@/lib/quantumState";

// Bloch Sphere Component
const BlochSphere = ({ 
  isAnimating, 
  blochCoords 
}: { 
  isAnimating: boolean; 
  blochCoords: BlochCoordinates; 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const vectorRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (isAnimating && vectorRef.current) {
      const time = state.clock.getElapsedTime();
      // Gentle rotation animation when enabled
      vectorRef.current.rotation.y += 0.01;
    }
  });

  // Sphere points for wireframe
  const spherePoints = [];
  for (let i = 0; i <= 32; i++) {
    for (let j = 0; j <= 16; j++) {
      const phi = (i / 32) * Math.PI * 2;
      const theta = (j / 16) * Math.PI;
      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.cos(theta);
      const z = Math.sin(theta) * Math.sin(phi);
      spherePoints.push(new THREE.Vector3(x, y, z));
    }
  }

  return (
    <group>
      {/* Bloch Sphere */}
      <Sphere ref={meshRef} args={[1, 32, 16]}>
        <meshBasicMaterial color="hsl(217, 91%, 60%)" transparent opacity={0.1} wireframe />
      </Sphere>
      
      {/* Coordinate axes */}
      <Line
        points={[[-1.2, 0, 0], [1.2, 0, 0]]}
        color="hsl(189, 85%, 63%)"
        lineWidth={2}
      />
      <Line
        points={[[0, -1.2, 0], [0, 1.2, 0]]}
        color="hsl(189, 85%, 63%)"
        lineWidth={2}
      />
      <Line
        points={[[0, 0, -1.2], [0, 0, 1.2]]}
        color="hsl(189, 85%, 63%)"
        lineWidth={2}
      />

      {/* Quantum state vector */}
      <group ref={vectorRef}>
        <Line
          points={[[0, 0, 0], [blochCoords.x, blochCoords.z, blochCoords.y]]}
          color="hsl(263, 85%, 58%)"
          lineWidth={4}
        />
        <Sphere args={[0.05]} position={[blochCoords.x, blochCoords.z, blochCoords.y]}>
          <meshBasicMaterial color="hsl(263, 85%, 58%)" />
        </Sphere>
      </group>

      {/* Labels */}
      <Text position={[1.4, 0, 0]} fontSize={0.2} color="white">
        |+X⟩
      </Text>
      <Text position={[0, 1.4, 0]} fontSize={0.2} color="white">
        |0⟩
      </Text>
      <Text position={[0, -1.4, 0]} fontSize={0.2} color="white">
        |1⟩
      </Text>
    </group>
  );
};

// Quantum State Animation Component
const QuantumStateVisualizer = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, index) => {
        const sphere = child as THREE.Mesh;
        sphere.position.y = Math.sin(time * 2 + index) * 0.5;
        sphere.scale.setScalar(0.8 + Math.sin(time * 3 + index) * 0.2);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }, (_, i) => (
        <Sphere key={i} args={[0.1]} position={[i * 0.3 - 1.2, 0, 0]}>
          <meshBasicMaterial 
            color={`hsl(${200 + i * 20}, 85%, 60%)`} 
            transparent 
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Visualization = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentView, setCurrentView] = useState<'bloch' | 'states'>('bloch');
  const [quantumState, setQuantumState] = useState<QuantumState>(initialQuantumState);
  const [lastMeasurement, setLastMeasurement] = useState<'0' | '1'>('0');
  const [measurements, setMeasurements] = useState<string[]>([]);
  const { toast } = useToast();

  const blochCoords = stateToBloch(quantumState);
  const probabilities = calculateProbabilities(quantumState);

  const applyGate = (gateName: string, gateFunction: (state: QuantumState) => QuantumState) => {
    setQuantumState(gateFunction(quantumState));
    toast({
      title: "Quantum Gate Applied",
      description: `${gateName} gate applied to qubit`,
    });
  };

  const performMeasurement = () => {
    const { result, newState } = measureQubit(quantumState);
    setQuantumState(newState);
    setLastMeasurement(result);
    setMeasurements(prev => [...prev, `|${result}⟩ at ${new Date().toLocaleTimeString()}`]);
    toast({
      title: "Measurement Performed",
      description: `Qubit collapsed to |${result}⟩ state`,
    });
  };

  const resetState = () => {
    setQuantumState(initialQuantumState);
    setMeasurements([]);
    toast({
      title: "State Reset",
      description: "Quantum state reset to |+⟩",
    });
  };

  const exportData = () => {
    const report = generateQuantumReport(quantumState, measurements);
    downloadReport(report, `quantum-visualization-${Date.now()}.json`);
    toast({
      title: "Report Exported",
      description: "Quantum state report downloaded successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/simulation">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Simulation
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Quantum Visualization</h1>
                <p className="text-sm text-muted-foreground">Interactive quantum state explorer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView(currentView === 'bloch' ? 'states' : 'bloch')}
              >
                {currentView === 'bloch' ? 'View States' : 'View Bloch Sphere'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnimating(!isAnimating)}
              >
                {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={resetState}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visualization Panel */}
          <div className="lg:col-span-2">
            <Card className="quantum-glow">
              <CardHeader>
                <CardTitle>
                  {currentView === 'bloch' ? 'Bloch Sphere' : 'Quantum State Evolution'}
                </CardTitle>
                <CardDescription>
                  {currentView === 'bloch' 
                    ? 'Interactive representation of qubit states on the Bloch sphere'
                    : 'Visualization of quantum state superposition and evolution'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-card/50 rounded-lg">
                  <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                    
                    {currentView === 'bloch' ? (
                      <BlochSphere isAnimating={isAnimating} blochCoords={blochCoords} />
                    ) : (
                      <QuantumStateVisualizer />
                    )}
                  </Canvas>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls and Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quantum State</CardTitle>
                <CardDescription>Current qubit configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">|0⟩ amplitude</span>
                    <span className="font-mono text-sm">{formatComplex(quantumState.alpha)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${probabilities.prob0 * 100}%` }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">|1⟩ amplitude</span>
                    <span className="font-mono text-sm">{formatComplex(quantumState.beta)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: `${probabilities.prob1 * 100}%` }}></div>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    State: |ψ⟩ = α|0⟩ + β|1⟩
                  </div>
                  <div className="font-mono text-xs mt-1">
                    Probability |0⟩: {(probabilities.prob0 * 100).toFixed(1)}%<br />
                    Probability |1⟩: {(probabilities.prob1 * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Bloch: ({blochCoords.x.toFixed(2)}, {blochCoords.y.toFixed(2)}, {blochCoords.z.toFixed(2)})
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quantum Operations</CardTitle>
                <CardDescription>Apply quantum gates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => applyGate("Pauli-X", quantumGates.pauliX)}
                >
                  Pauli-X (NOT)
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => applyGate("Pauli-Y", quantumGates.pauliY)}
                >
                  Pauli-Y
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => applyGate("Pauli-Z", quantumGates.pauliZ)}
                >
                  Pauli-Z
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => applyGate("Hadamard", quantumGates.hadamard)}
                >
                  Hadamard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => applyGate("Phase", quantumGates.phase)}
                >
                  Phase (S)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Measurements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full quantum-pulse" onClick={performMeasurement}>
                  Measure Qubit
                </Button>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">|{lastMeasurement}⟩</div>
                  <div className="text-sm text-muted-foreground">Last measurement</div>
                </div>
                {measurements.length > 0 && (
                  <div className="max-h-32 overflow-y-auto">
                    <div className="text-xs text-muted-foreground mb-1">Measurement History:</div>
                    {measurements.slice(-3).map((measurement, i) => (
                      <div key={i} className="text-xs font-mono">{measurement}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Button className="w-full" asChild>
              <Link to="/results">View Full Results</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Visualization;