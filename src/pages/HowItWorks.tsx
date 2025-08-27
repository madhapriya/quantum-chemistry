import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Atom, Binary, RefreshCw, BarChart3, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "The Problem – Ground State Energy",
      icon: <Zap className="w-8 h-8" />,
      description: "Every molecule has a lowest possible energy, called the ground state energy. Finding this is key to understanding bond lengths, stability, and chemical properties.",
      formula: "E₀ = min⟨ψ|H|ψ⟩",
      visual: "A valley diagram → ground state = lowest point",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 2,
      title: "Hamiltonian of a Molecule", 
      icon: <Atom className="w-8 h-8" />,
      description: "The Hamiltonian (H) is the mathematical recipe for the molecule's energy. It combines electron kinetic energy + electron-electron interactions + nuclear attractions.",
      formula: "H = Tₑ + VₑN + Vₑₑ + VNN",
      subformula: "(electron kinetic + electron-nucleus + electron-electron + nucleus-nucleus)",
      visual: "Molecule (H₂) with arrows showing electron & nucleus interactions",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: 3,
      title: "Mapping to Qubits",
      icon: <Binary className="w-8 h-8" />,
      description: "We can't directly use H on a quantum computer. We map it into Pauli matrices using Jordan–Wigner or Parity mapping.",
      formula: "H = -0.810 Z₀ - 0.225 Z₁ + 0.172 Z₀Z₁ + ...",
      visual: "Orbitals → qubits with Z, X, Y labels",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: 4,
      title: "VQE – Hybrid Quantum-Classical Loop",
      icon: <RefreshCw className="w-8 h-8" />,
      description: "We guess a quantum state with a parameterized circuit (ansatz), measure its energy, and let a classical optimizer adjust parameters until the minimum energy is found.",
      formula: "E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩",
      visual: "Circular loop → (Quantum Circuit → Measure Energy → Optimizer → Update Parameters → repeat)",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      id: 5,
      title: "Results on Dashboard",
      icon: <BarChart3 className="w-8 h-8" />,
      description: "Once converged, the minimum energy is reported as the ground state energy. We plot convergence graphs, bond-length sweeps, and Bloch visualizations to make it intuitive.",
      formula: "E₀ ≈ -1.13 Hartree",
      subformula: "For H₂ at bond length 0.74 Å",
      visual: "Convergence curve + potential energy curve with minimum marked",
      color: "from-indigo-500/20 to-blue-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 quantum-gradient opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6">
              How It Works
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the quantum chemistry pipeline from molecular problems to quantum solutions
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-12 w-px bg-gradient-to-b from-primary/50 to-transparent z-10 hidden md:block"></div>
                )}
                
                <Card className={`relative overflow-hidden border-0 bg-gradient-to-br ${step.color} backdrop-blur-sm`}>
                  <div className="absolute inset-0 bg-card/80 backdrop-blur-sm"></div>
                  <CardContent className="relative z-10 p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Content Side */}
                      <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
                            {step.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-primary">Step {step.id}</div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{step.title}</h2>
                          </div>
                        </div>
                        
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {step.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="text-sm font-medium text-primary">Visual:</div>
                          <p className="text-muted-foreground italic">{step.visual}</p>
                        </div>
                      </div>

                      {/* Formula Side */}
                      <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                        <Card className="bg-card/50 border-primary/20">
                          <CardHeader>
                            <CardTitle className="text-lg text-primary">Mathematical Formula</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="font-mono text-2xl md:text-3xl text-foreground bg-muted/50 p-6 rounded-lg border text-center break-all">
                              {step.formula}
                            </div>
                            {step.subformula && (
                              <p className="text-sm text-muted-foreground mt-4 text-center italic">
                                {step.subformula}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore Quantum Chemistry?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Now that you understand the process, start your quantum chemistry journey with our interactive simulations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/simulation")} className="quantum-glow">
              Start Simulation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/visualization")}>
              Explore Visualization
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;