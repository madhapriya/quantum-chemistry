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
      visualComponent: (
        <div className="h-40 flex items-center justify-center">
          <svg viewBox="0 0 300 150" className="w-full h-full">
            <defs>
              <linearGradient id="valley" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
            <path d="M 20 130 Q 150 50 280 130" stroke="hsl(var(--primary))" strokeWidth="3" fill="none"/>
            <path d="M 20 130 Q 150 50 280 130 L 280 150 L 20 150 Z" fill="url(#valley)"/>
            <circle cx="150" cy="50" r="6" fill="hsl(var(--primary))" className="animate-pulse"/>
            <text x="150" y="40" textAnchor="middle" className="text-xs fill-primary font-medium">Ground State</text>
            <text x="150" y="25" textAnchor="middle" className="text-xs fill-muted-foreground">Minimum Energy</text>
          </svg>
        </div>
      ),
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 2,
      title: "Hamiltonian of a Molecule", 
      icon: <Atom className="w-8 h-8" />,
      description: "The Hamiltonian (H) is the mathematical recipe for the molecule's energy. It combines electron kinetic energy + electron-electron interactions + nuclear attractions.",
      formula: "H = Tₑ + VₑN + Vₑₑ + VNN",
      subformula: "(electron kinetic + electron-nucleus + electron-electron + nucleus-nucleus)",
      visualComponent: (
        <div className="h-40 flex items-center justify-center">
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <g className="animate-pulse">
              <circle cx="60" cy="60" r="12" fill="hsl(var(--primary))" opacity="0.8"/>
              <circle cx="140" cy="60" r="12" fill="hsl(var(--primary))" opacity="0.8"/>
              <text x="60" y="65" textAnchor="middle" className="text-xs fill-background font-bold">H</text>
              <text x="140" y="65" textAnchor="middle" className="text-xs fill-background font-bold">H</text>
            </g>
            <circle cx="45" cy="45" r="4" fill="hsl(var(--accent))" className="animate-bounce"/>
            <circle cx="75" cy="75" r="4" fill="hsl(var(--accent))" className="animate-bounce" style={{animationDelay: '0.2s'}}/>
            <circle cx="125" cy="45" r="4" fill="hsl(var(--accent))" className="animate-bounce" style={{animationDelay: '0.4s'}}/>
            <circle cx="155" cy="75" r="4" fill="hsl(var(--accent))" className="animate-bounce" style={{animationDelay: '0.6s'}}/>
            <line x1="60" y1="60" x2="140" y2="60" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4,2"/>
            <text x="100" y="95" textAnchor="middle" className="text-xs fill-muted-foreground">H₂ Molecule</text>
          </svg>
        </div>
      ),
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: 3,
      title: "Mapping to Qubits",
      icon: <Binary className="w-8 h-8" />,
      description: "We can't directly use H on a quantum computer. We map it into Pauli matrices using Jordan–Wigner or Parity mapping.",
      formula: "H = -0.810 Z₀ - 0.225 Z₁ + 0.172 Z₀Z₁ + ...",
      visualComponent: (
        <div className="h-40 flex items-center justify-center">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-primary">ψ</span>
              </div>
              <span className="text-xs text-muted-foreground">Orbital</span>
            </div>
            <div className="text-2xl text-muted-foreground animate-pulse">→</div>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-primary/20 rounded border-2 border-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">Z</span>
                </div>
                <div className="w-8 h-8 bg-accent/20 rounded border-2 border-accent flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">X</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-secondary/20 rounded border-2 border-secondary flex items-center justify-center">
                  <span className="text-xs font-bold text-secondary">Y</span>
                </div>
                <div className="w-8 h-8 bg-primary/20 rounded border-2 border-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">I</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground text-center">Qubits</span>
            </div>
          </div>
        </div>
      ),
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: 4,
      title: "VQE – Hybrid Quantum-Classical Loop",
      icon: <RefreshCw className="w-8 h-8" />,
      description: "We guess a quantum state with a parameterized circuit (ansatz), measure its energy, and let a classical optimizer adjust parameters until the minimum energy is found.",
      formula: "E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩",
      visualComponent: (
        <div className="h-40 flex items-center justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin" style={{animationDuration: '3s'}}></div>
            <div className="absolute inset-2 rounded-full border-2 border-accent/50 animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs text-primary font-medium mb-1">VQE</div>
                <div className="text-xs text-muted-foreground">Loop</div>
              </div>
            </div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      ),
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      id: 5,
      title: "Classical Optimizer (ML-style algorithm)",
      icon: <BarChart3 className="w-8 h-8" />,
      description: "Now comes the ML part — a classical optimization algorithm (like SLSQP, COBYLA, or Gradient Descent) adjusts the parameters θ to make the energy smaller. It's just like training a neural network with Loss function = Energy E(θ), Parameters = Gate angles θ, and Optimizer = Gradient-based or gradient-free algorithm.",
      formula: "θₜ₊₁ = θₜ - η∇θE(θₜ)",
      subformula: "In practice, COBYLA doesn't need gradients—it tries new parameter values and moves towards lower energy.",
      visualComponent: (
        <div className="h-40 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-lg flex items-center justify-center mb-2">
                <span className="text-sm font-bold">θ</span>
              </div>
              <span className="text-xs text-muted-foreground">Parameters</span>
            </div>
            <div className="text-lg animate-pulse">→</div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg flex items-center justify-center mb-2">
                <span className="text-sm font-bold">ML</span>
              </div>
              <span className="text-xs text-muted-foreground">Optimizer</span>
            </div>
            <div className="text-lg animate-pulse">→</div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg flex items-center justify-center mb-2">
                <span className="text-sm font-bold">E↓</span>
              </div>
              <span className="text-xs text-muted-foreground">Lower Energy</span>
            </div>
          </div>
        </div>
      ),
      color: "from-amber-500/20 to-yellow-500/20"
    },
    {
      id: 6,
      title: "Repeat Until Converged",
      icon: <RefreshCw className="w-8 h-8" />,
      description: "The loop continues: Quantum computer evaluates energy → Optimizer updates parameters → Repeat until the minimum (ground-state energy) is found. We plot convergence graphs, bond-length sweeps, and Bloch visualizations to make it intuitive.",
      formula: "E₀ ≈ -1.13 Hartree",
      subformula: "For H₂ at bond length 0.74 Å",
      visualComponent: (
        <div className="h-40 flex items-center justify-center">
          <svg viewBox="0 0 250 120" className="w-full h-full">
            <defs>
              <linearGradient id="convergence" x1="0%" y1="100%" x2="100%" y2="20%">
                <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            <path d="M 20 100 Q 60 80 80 70 Q 120 60 140 58 Q 180 56 200 55 Q 220 54.5 230 54" 
                  stroke="url(#convergence)" strokeWidth="3" fill="none"/>
            <circle cx="230" cy="54" r="4" fill="hsl(var(--primary))" className="animate-pulse"/>
            <text x="125" y="20" textAnchor="middle" className="text-xs fill-primary font-medium">Energy Convergence</text>
            <text x="20" y="115" className="text-xs fill-muted-foreground">High E</text>
            <text x="200" y="115" className="text-xs fill-muted-foreground">Ground State</text>
          </svg>
        </div>
      ),
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
                          <div className="bg-muted/30 rounded-lg p-4">
                            {step.visualComponent}
                          </div>
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