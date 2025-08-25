import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, RefreshCw, CheckCircle, Clock, Zap, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

const Results = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock simulation data
  const energyComparison = [
    { molecule: 'H₂', classical: -0.500, quantum: -0.743, improvement: 48.6 },
    { molecule: 'LiH', classical: -1.200, quantum: -1.456, improvement: 21.3 },
    { molecule: 'H₂O', classical: -2.100, quantum: -2.387, improvement: 13.7 },
  ];

  const convergenceData = Array.from({ length: 20 }, (_, i) => ({
    iteration: i + 1,
    energy: -0.743 + Math.exp(-i * 0.3) * 0.2 + (Math.random() - 0.5) * 0.01,
    error: Math.exp(-i * 0.2) * 0.1,
  }));

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/visualization">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Visualization
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Results Dashboard</h1>
                <p className="text-sm text-muted-foreground">Quantum chemistry simulation results</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button size="sm" className="quantum-glow">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Completed Jobs</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-muted-foreground">Running Jobs</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-secondary" />
                <div>
                  <div className="text-2xl font-bold">-0.743</div>
                  <div className="text-sm text-muted-foreground">Best Energy (eV)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold">48.6%</div>
                  <div className="text-sm text-muted-foreground">Improvement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="results">Ground State Results</TabsTrigger>
            <TabsTrigger value="convergence">Convergence</TabsTrigger>
            <TabsTrigger value="comparison">Method Comparison</TabsTrigger>
            <TabsTrigger value="quantum-jobs">Quantum Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="quantum-glow">
                <CardHeader>
                  <CardTitle>Energy Comparison</CardTitle>
                  <CardDescription>
                    Classical vs Quantum ground state energies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={energyComparison}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="molecule" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Bar dataKey="classical" fill="hsl(var(--primary))" name="Classical" />
                        <Bar dataKey="quantum" fill="hsl(var(--secondary))" name="Quantum" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Molecule Results</CardTitle>
                  <CardDescription>
                    Detailed energy calculations for each molecule
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {energyComparison.map((result) => (
                    <div key={result.molecule} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{result.molecule}</h3>
                        <Badge variant="outline" className="quantum-pulse">
                          {result.improvement.toFixed(1)}% better
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Classical Energy</div>
                          <div className="font-mono font-bold text-primary">
                            {result.classical.toFixed(3)} eV
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Quantum Energy</div>
                          <div className="font-mono font-bold text-secondary">
                            {result.quantum.toFixed(3)} eV
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="convergence" className="space-y-6">
            <Card className="quantum-glow">
              <CardHeader>
                <CardTitle>Algorithm Convergence</CardTitle>
                <CardDescription>
                  Energy convergence during VQE optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={convergenceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="iteration" 
                        stroke="hsl(var(--muted-foreground))"
                        label={{ value: 'VQE Iterations', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        label={{ value: 'Energy (eV)', angle: -90, position: 'insideLeft' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="energy"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Method Performance</CardTitle>
                  <CardDescription>Comparison of different approaches</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border border-border rounded">
                      <div>
                        <div className="font-semibold">Variational Quantum Eigensolver</div>
                        <div className="text-sm text-muted-foreground">Quantum Algorithm</div>
                      </div>
                      <Badge className="bg-secondary">Best</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-border rounded">
                      <div>
                        <div className="font-semibold">Hartree-Fock Method</div>
                        <div className="text-sm text-muted-foreground">Classical Approach</div>
                      </div>
                      <Badge variant="outline">Baseline</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-border rounded">
                      <div>
                        <div className="font-semibold">ML-Enhanced VQE</div>
                        <div className="text-sm text-muted-foreground">Hybrid Method</div>
                      </div>
                      <Badge className="bg-accent">Fastest</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Computation Metrics</CardTitle>
                  <CardDescription>Performance and resource usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border border-border rounded">
                      <div className="text-2xl font-bold text-primary">12.3s</div>
                      <div className="text-sm text-muted-foreground">Execution Time</div>
                    </div>
                    <div className="text-center p-3 border border-border rounded">
                      <div className="text-2xl font-bold text-secondary">4</div>
                      <div className="text-sm text-muted-foreground">Qubits Used</div>
                    </div>
                    <div className="text-center p-3 border border-border rounded">
                      <div className="text-2xl font-bold text-accent">128</div>
                      <div className="text-sm text-muted-foreground">Circuit Depth</div>
                    </div>
                    <div className="text-center p-3 border border-border rounded">
                      <div className="text-2xl font-bold">98.2%</div>
                      <div className="text-sm text-muted-foreground">Fidelity</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quantum-jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>IBM Quantum Jobs</CardTitle>
                <CardDescription>
                  Real-time quantum computation status on IBM Quantum cloud
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'job-001', molecule: 'H₂', status: 'completed', time: '2 min ago', backend: 'ibm_brisbane' },
                    { id: 'job-002', molecule: 'LiH', status: 'running', time: '5 min ago', backend: 'ibm_kyoto' },
                    { id: 'job-003', molecule: 'H₂O', status: 'queued', time: '8 min ago', backend: 'ibm_osaka' },
                  ].map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          job.status === 'completed' ? 'bg-green-500' :
                          job.status === 'running' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                        <div>
                          <div className="font-semibold">{job.molecule} Molecule</div>
                          <div className="text-sm text-muted-foreground">
                            Job ID: {job.id} • Backend: {job.backend}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          job.status === 'completed' ? 'default' :
                          job.status === 'running' ? 'secondary' : 'outline'
                        }>
                          {job.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">{job.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Results;