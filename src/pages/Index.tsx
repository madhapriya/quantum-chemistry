import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Atom, FlaskConical, Zap, BarChart3, Eye, ArrowRight, Sparkles } from "lucide-react";

const molecules = [
  {
    id: 'h2',
    name: 'H₂',
    fullName: 'Hydrogen Molecule',
    description: 'Simplest molecular system - perfect for quantum algorithm testing',
    atoms: 2,
    difficulty: 'Beginner',
    bondLength: '0.74 Å',
    energy: '-0.743 eV'
  },
  {
    id: 'lih',
    name: 'LiH',
    fullName: 'Lithium Hydride',
    description: 'Ionic-covalent bonding showcase with interesting electronic structure',
    atoms: 2,
    difficulty: 'Intermediate',
    bondLength: '1.59 Å',
    energy: '-1.456 eV'
  },
  {
    id: 'h2o',
    name: 'H₂O',
    fullName: 'Water Molecule',
    description: 'Complex multi-electron system with bent geometry',
    atoms: 3,
    difficulty: 'Advanced',
    bondLength: '0.96 Å',
    energy: '-2.387 eV'
  }
];

const Index = () => {
  const [selectedMolecule, setSelectedMolecule] = useState<string>('');

  const handleStartSimulation = () => {
    if (selectedMolecule) {
      // Navigate to simulation with selected molecule
      window.location.href = '/simulation';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-6 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Quantum Chemistry Playground</span>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 quantum-gradient bg-clip-text text-transparent">
              Explore Quantum
              <br />
              Molecular Systems
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the power of quantum computing for chemistry. Compare classical and quantum 
              algorithms, visualize molecular orbitals, and explore ground state energies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="quantum-glow quantum-pulse" onClick={() => {
                document.getElementById('molecule-selector')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <FlaskConical className="h-5 w-5 mr-2" />
                Start Exploring
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/visualization">
                  <Eye className="h-5 w-5 mr-2" />
                  View Quantum States
                </Link>
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Atom className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Quantum Algorithms</h3>
                <p className="text-sm text-muted-foreground">
                  Variational Quantum Eigensolver (VQE) and quantum state preparation
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Energy Calculations</h3>
                <p className="text-sm text-muted-foreground">
                  Ground state energy optimization with real-time convergence tracking
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Interactive Visualization</h3>
                <p className="text-sm text-muted-foreground">
                  3D Bloch spheres, quantum state evolution, and energy landscapes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Molecule Selector Section */}
      <section id="molecule-selector" className="py-16 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Select a Molecule to Begin</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our curated collection of molecules, each demonstrating different 
              aspects of quantum chemistry and computational complexity.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {molecules.map((molecule) => (
                <Card 
                  key={molecule.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedMolecule === molecule.id ? 'ring-2 ring-primary quantum-glow' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedMolecule(molecule.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{molecule.name}</CardTitle>
                      <Badge variant={
                        molecule.difficulty === 'Beginner' ? 'default' :
                        molecule.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                      }>
                        {molecule.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {molecule.fullName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {molecule.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Atoms</div>
                        <div className="font-semibold">{molecule.atoms}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Bond Length</div>
                        <div className="font-semibold">{molecule.bondLength}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-muted-foreground">Ground State Energy</div>
                        <div className="font-semibold text-primary">{molecule.energy}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Alternative dropdown selector */}
            <div className="text-center space-y-6">
              <div className="max-w-md mx-auto">
                <Select value={selectedMolecule} onValueChange={setSelectedMolecule}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Or select from dropdown..." />
                  </SelectTrigger>
                  <SelectContent>
                    {molecules.map((molecule) => (
                      <SelectItem key={molecule.id} value={molecule.id}>
                        {molecule.name} - {molecule.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                size="lg" 
                onClick={handleStartSimulation}
                disabled={!selectedMolecule}
                className="quantum-glow px-8"
              >
                Begin Quantum Simulation
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Explore the Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <FlaskConical className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Molecular Simulation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interactive bond length optimization and energy surface exploration
                </p>
                <Button variant="outline" asChild>
                  <Link to="/simulation">Try Simulation</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Eye className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Quantum Visualization</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interactive Bloch spheres and quantum state animations
                </p>
                <Button variant="outline" asChild>
                  <Link to="/visualization">View States</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <BarChart3 className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Results Dashboard</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive analysis and downloadable reports
                </p>
                <Button variant="outline" asChild>
                  <Link to="/results">View Results</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
