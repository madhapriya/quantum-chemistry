import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Play, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const Simulation = () => {
  const [bondLength, setBondLength] = useState([1.0]);
  const [isRunning, setIsRunning] = useState(false);

  // Mock energy data for visualization
  const mockEnergyData = Array.from({ length: 20 }, (_, i) => ({
    bondLength: 0.5 + (i * 0.1),
    classicalEnergy: Math.pow(0.5 + (i * 0.1) - 1.0, 2) - 0.5,
    quantumEnergy: Math.pow(0.5 + (i * 0.1) - 1.0, 2) - 0.7 + Math.sin((0.5 + (i * 0.1)) * 5) * 0.05,
  }));

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
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
                <p className="text-sm text-muted-foreground">H₂ - Hydrogen Molecule</p>
              </div>
            </div>
            <Button onClick={handleRunSimulation} disabled={isRunning} className="quantum-glow">
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Run Simulation
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
                  Adjust the bond length to explore energy landscapes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Bond Length (Å)</label>
                    <span className="text-sm font-mono text-primary">
                      {bondLength[0].toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={bondLength}
                    onValueChange={setBondLength}
                    min={0.5}
                    max={3.0}
                    step={0.05}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.5 Å</span>
                    <span>Equilibrium: ~0.74 Å</span>
                    <span>3.0 Å</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {(-0.5).toFixed(3)}
                      </div>
                      <div className="text-xs text-muted-foreground">Classical Energy (eV)</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-secondary">
                        {(-0.743).toFixed(3)}
                      </div>
                      <div className="text-xs text-muted-foreground">Quantum Energy (eV)</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full quantum-pulse" 
                    variant="outline"
                    asChild
                  >
                    <Link to="/visualization">View Quantum States</Link>
                  </Button>
                  <Button 
                    className="w-full"
                    asChild
                  >
                    <Link to="/results">View Results Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Energy Curve Visualization */}
          <div className="space-y-6">
            <Card className="quantum-glow">
              <CardHeader>
                <CardTitle>Energy vs Bond Length</CardTitle>
                <CardDescription>
                  Potential energy surface showing classical vs quantum behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockEnergyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="bondLength"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Line
                        type="monotone"
                        dataKey="classicalEnergy"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                        name="Classical"
                      />
                      <Line
                        type="monotone"
                        dataKey="quantumEnergy"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={2}
                        dot={false}
                        name="Quantum"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-primary"></div>
                    <span>Classical Energy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-secondary border-dashed border border-secondary"></div>
                    <span>Quantum Energy</span>
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