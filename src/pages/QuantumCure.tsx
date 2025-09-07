import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/quantumcure/HeroSection";
import MetricsPanel from "@/components/quantumcure/MetricsPanel";
import MultiDiseaseDashboard from "@/components/quantumcure/MultiDiseaseDashboard";
import ClinicalCarousel from "@/components/quantumcure/ClinicalCarousel";
import QuantumSimulationDashboard from "@/components/quantumcure/QuantumSimulationDashboard";

const QuantumCure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-card/30">
      {/* Navigation */}
      <nav className="border-b border-border/40 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/")}>
            ← Back to Simulation
          </Button>
          <h1 className="text-lg font-semibold text-foreground">QuantumCure Enhanced</h1>
        </div>
      </nav>

      <div className="space-y-0">
        {/* Hero Section */}
        <HeroSection />

        {/* Simulation & Metrics Panel */}
        <MetricsPanel />

        {/* Multi-Disease Dashboard */}
        <MultiDiseaseDashboard />

        {/* Clinical Evidence Carousel */}
        <ClinicalCarousel />

        {/* Quantum Simulation Dashboard */}
        <QuantumSimulationDashboard />

        {/* Enhanced Footer */}
        <footer className="relative py-20 bg-gradient-to-t from-primary/5 to-transparent overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            {/* Animated H₂ Molecule */}
            <div className="flex justify-center mb-8">
              <div className="quantum-float">
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/30 rounded-full quantum-pulse flex items-center justify-center text-primary-foreground font-bold text-sm">
                      H
                    </div>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary/20 rounded-full"></div>
                    <div className="w-8 h-8 bg-primary/30 rounded-full quantum-pulse flex items-center justify-center text-primary-foreground font-bold text-sm">
                      H
                    </div>
                  </div>
                  <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl quantum-glow"></div>
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-foreground mb-4">
              One molecule, many miracles
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Predicted by quantum circuits. Trusted by healing cells.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => navigate("/simulation")} size="lg" className="quantum-glow">
                Explore Simulations
              </Button>
              <Button variant="outline" onClick={() => navigate("/how-it-works")} size="lg">
                Learn the Science
              </Button>
              <Button variant="outline" onClick={() => navigate("/visualization")} size="lg">
                View Circuits
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border/20">
              <p className="text-sm text-muted-foreground">
                © 2025 QuantumCure - Advancing quantum chemistry for medical breakthroughs
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default QuantumCure;