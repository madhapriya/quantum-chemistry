import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Zap, Target, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts";
import { 
  MOLECULE_DATA, 
  generateEnergyCurve, 
  getCurrentEnergyValues, 
  findOptimalBondLength,
  type EnergyPoint 
} from "@/lib/molecularEnergy";

const Simulation = () => {
  const { moleculeId } = useParams<{ moleculeId?: string }>();
  const [isRunning, setIsRunning] = useState(false);
  
  // Get molecule data or default to H2
  const currentMolecule = useMemo(() => {
    const id = moleculeId || 'h2';
    return MOLECULE_DATA[id] || MOLECULE_DATA.h2;
  }, [moleculeId]);

  // Initialize bond length to equilibrium value
  const [bondLength, setBondLength] = useState([currentMolecule.equilibriumBondLength]);

  // Update bond length when molecule changes
  useEffect(() => {
    setBondLength([currentMolecule.equilibriumBondLength]);
  }, [currentMolecule]);

  // Generate real-time energy curve data
  const energyCurveData = useMemo(() => {
    return generateEnergyCurve(
      currentMolecule.id,
      currentMolecule.minBondLength,
      currentMolecule.maxBondLength,
      100
    );
  }, [currentMolecule]);

  // Get current energy values for the selected bond length
  const currentEnergyValues = useMemo(() => {
    return getCurrentEnergyValues(currentMolecule.id, bondLength[0]);
  }, [currentMolecule.id, bondLength]);

  // Find optimal bond length for the molecule
  const optimalPoint = useMemo(() => {
    return findOptimalBondLength(currentMolecule.id);
  }, [currentMolecule.id]);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{`Bond Length: ${Number(label).toFixed(2)} Å`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(4)} eV`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Molecule Simulation</h1>
                <p className="text-sm text-muted-foreground">
                  {currentMolecule.name} - {currentMolecule.fullName}
                </p>
              </div>
              <Badge variant={
                currentMolecule.difficulty === 'Beginner' ? 'default' :
                currentMolecule.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
              }>
                {currentMolecule.difficulty}
              </Badge>
            </div>
            <Button onClick={handleRunSimulation} disabled={isRunning} className="quantum-glow">
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running VQE...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Run Quantum Simulation
                </div>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            <Card className="quantum-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Simulation Parameters
                </CardTitle>
                <CardDescription>
                  Adjust the bond length to explore the {currentMolecule.name} energy landscape in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Bond Length (Å)</label>
                    <span className="text-sm font-mono text-primary font-bold">
                      {bondLength[0].toFixed(3)}
                    </span>
                  </div>
                  <Slider
                    value={bondLength}
                    onValueChange={setBondLength}
                    min={currentMolecule.minBondLength}
                    max={currentMolecule.maxBondLength}
                    step={currentMolecule.optimalStep}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{currentMolecule.minBondLength} Å</span>
                    <span>Optimal: {optimalPoint.bondLength} Å</span>
                    <span>{currentMolecule.maxBondLength} Å</span>
                  </div>
                </div>

                {/* Real-time Energy Display */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {currentEnergyValues.classical.toFixed(4)}
                      </div>
                      <div className="text-xs text-muted-foreground">Classical Energy (eV)</div>
                      <div className="text-xs text-primary mt-1">
                        Morse Potential
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/5 border-secondary/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-secondary">
                        {currentEnergyValues.quantum.toFixed(4)}
                      </div>
                      <div className="text-xs text-muted-foreground">Quantum Energy (eV)</div>
                      <div className="text-xs text-secondary mt-1">
                        VQE Result
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Energy Difference Display */}
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Quantum Advantage</div>
                        <div className="text-xs text-muted-foreground">Zero-point + Corrections</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-accent">
                          {currentEnergyValues.difference.toFixed(4)} eV
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {currentEnergyValues.difference > 0 ? 'Higher' : 'Lower'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Molecular Information */}
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Atoms:</span>
                        <span className="text-sm font-medium">{currentMolecule.atoms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Equilibrium Length:</span>
                        <span className="text-sm font-medium">{currentMolecule.equilibriumBondLength} Å</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ground State Energy:</span>
                        <span className="text-sm font-medium">{currentMolecule.equilibriumEnergy} eV</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Dissociation Energy:</span>
                        <span className="text-sm font-medium">{currentMolecule.dissociationEnergy} eV</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Button 
                    className="w-full quantum-pulse" 
                    variant="outline"
                    asChild
                  >
                    <Link to="/visualization">
                      <Target className="h-4 w-4 mr-2" />
                      View Quantum States
                    </Link>
                  </Button>
                  <Button 
                    className="w-full"
                    asChild
                  >
                    <Link to="/results">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Results Dashboard
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Energy Curve Visualization */}
          <div className="space-y-6">
            <Card className="quantum-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Energy vs Bond Length - Real-time
                </CardTitle>
                <CardDescription>
                  Potential energy surface for {currentMolecule.name} showing classical vs quantum behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={energyCurveData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="bondLength"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        label={{ value: 'Bond Length (Å)', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        label={{ value: 'Energy (eV)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      
                      {/* Reference line for current bond length */}
                      <ReferenceLine 
                        x={bondLength[0]} 
                        stroke="hsl(var(--accent))" 
                        strokeDasharray="2 2"
                        strokeWidth={2}
                      />
                      
                      {/* Reference line for optimal bond length */}
                      <ReferenceLine 
                        x={optimalPoint.bondLength} 
                        stroke="hsl(var(--secondary))" 
                        strokeDasharray="4 4"
                        strokeWidth={1}
                      />
                      
                      <Line
                        type="monotone"
                        dataKey="classicalEnergy"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={false}
                        name="Classical (Morse)"
                      />
                      <Line
                        type="monotone"
                        dataKey="quantumEnergy"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={3}
                        dot={false}
                        name="Quantum (VQE)"
                        strokeDasharray="8 4"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-3">
                  {/* Legend */}
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-primary"></div>
                      <span>Classical (Morse Potential)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-secondary border-dashed border-t-2 border-secondary"></div>
                      <span>Quantum (VQE + Corrections)</span>
                    </div>
                  </div>
                  
                  {/* Current position indicators */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-accent"></div>
                      <span>Current Position: {bondLength[0].toFixed(3)} Å</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-secondary border-dashed border-t border-secondary"></div>
                      <span>Optimal: {optimalPoint.bondLength} Å</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Simulation;