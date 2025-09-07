import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 text-center space-y-8 relative z-10">
        <Badge variant="secondary" className="quantum-glow text-lg px-6 py-2">
          Quantum Chemistry × Multi-Disease Therapy
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
          From Quantum Energy to
          <span className="quantum-gradient bg-clip-text text-transparent block">
            Healing Cells
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          H₂ Therapy Across Diseases—Cancer, Asthma, Oxidative Stress & Beyond
        </p>

        {/* Animated H₂ Molecule with Target Organs */}
        <div className="relative py-16">
          <div className="flex justify-center items-center gap-12">
            {/* H₂ Molecule */}
            <div className="quantum-float">
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full quantum-pulse flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                    H
                  </div>
                  <div className="w-20 h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full shadow-md"></div>
                  <div className="w-16 h-16 bg-primary rounded-full quantum-pulse flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                    H
                  </div>
                </div>
                <div className="absolute -inset-6 bg-primary/10 rounded-full blur-2xl quantum-glow"></div>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-8 h-8 text-primary animate-pulse" />

            {/* Target Organs */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { organ: "Lungs", icon: "🫁", color: "bg-blue-500" },
                { organ: "Immune", icon: "🛡️", color: "bg-green-500" },
                { organ: "Brain", icon: "🧠", color: "bg-purple-500" },
                { organ: "Heart", icon: "❤️", color: "bg-red-500" }
              ].map((target, i) => (
                <div key={i} className="text-center">
                  <div className={`w-12 h-12 ${target.color}/20 rounded-full flex items-center justify-center mx-auto mb-2 hover:scale-110 transition-transform cursor-pointer`}>
                    <span className="text-2xl">{target.icon}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{target.organ}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/simulation")}
            className="quantum-glow text-lg px-8 py-4"
          >
            <Play className="w-5 h-5 mr-2" />
            Explore Healing Effects
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;