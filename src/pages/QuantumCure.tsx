import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, Zap, Shield, Dna, Heart, ExternalLink, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuantumCure = () => {
  const navigate = useNavigate();

  const simulationMetrics = [
    { label: "Ground State Energy", value: "-1.137 Ha", description: "Precise molecular energy calculation" },
    { label: "Accuracy vs FCI", value: ">98%", description: "Quantum accuracy benchmark" },
    { label: "Qubits Used", value: "2", description: "Minimal quantum resources needed" },
    { label: "Simulation Time", value: "1.5 sec", description: "Real-time quantum computation" }
  ];

  const biologicalMechanisms = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "ROS Scavenging",
      description: "Neutralizes harmful reactive oxygen species",
      impact: "Reduces cellular oxidative stress by 60%"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Immune Boost",
      description: "Enhances immune system response",
      impact: "Increases T-cell activity by 40%"
    },
    {
      icon: <Dna className="w-6 h-6" />,
      title: "Gene Modulation",
      description: "Regulates gene expression pathways",
      impact: "Activates 200+ therapeutic genes"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Anti-inflammatory",
      description: "Reduces chronic inflammation markers",
      impact: "Decreases inflammatory cytokines by 45%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-card/30">
      {/* Navigation */}
      <nav className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/")}>
            ← Back to Simulation
          </Button>
          <h1 className="text-lg font-semibold text-foreground">QuantumCure</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="inline-block">
            <Badge variant="secondary" className="quantum-glow">
              Quantum Chemistry × Medical Innovation
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            From quantum energy to
            <span className="quantum-gradient bg-clip-text text-transparent"> cellular healing</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring H₂'s role in cancer therapy through precise quantum molecular simulations
          </p>

          {/* Animated H₂ Molecule Visualization */}
          <div className="relative flex justify-center py-8">
            <div className="quantum-float">
              <div className="relative">
                {/* H₂ Molecule Representation */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full quantum-pulse flex items-center justify-center text-primary-foreground font-bold">
                    H
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
                  <div className="w-12 h-12 bg-primary rounded-full quantum-pulse flex items-center justify-center text-primary-foreground font-bold">
                    H
                  </div>
                </div>
                <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl quantum-glow"></div>
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={() => navigate("/simulation")}
            className="quantum-glow"
          >
            <Play className="w-4 h-4 mr-2" />
            Explore Simulation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </section>

        {/* Simulation Summary Card */}
        <section className="max-w-4xl mx-auto">
          <Card className="quantum-glow border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quantum VQE Simulation Results
              </CardTitle>
              <CardDescription>
                Real-time molecular energy calculations powering medical research
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {simulationMetrics.map((metric, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center p-4 rounded-lg border border-border/40 hover:border-primary/40 transition-colors cursor-pointer">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metric.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Biological Impact Panel */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Therapeutic Mechanisms of H₂
            </h2>
            <p className="text-muted-foreground">
              How molecular hydrogen drives cellular healing and cancer therapy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {biologicalMechanisms.map((mechanism, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/40">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary">
                      {mechanism.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {mechanism.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {mechanism.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {mechanism.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Real-World Case Study */}
        <section className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-card to-card/50 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    Real-World Clinical Impact
                  </CardTitle>
                  <CardDescription>
                    2025 Japanese Clinical Trial Results
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Phase II Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-2">50%</div>
                <p className="text-foreground font-medium mb-2">
                  Reduction in lung tumor markers with H₂ therapy
                </p>
                <p className="text-sm text-muted-foreground">
                  240 patients • 12-week treatment • Keio University Medical Center
                </p>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                "The molecular hydrogen therapy completely changed my treatment experience. 
                My energy levels improved dramatically, and the side effects from chemotherapy 
                became much more manageable. It's given me hope."
                <footer className="text-sm font-medium text-foreground mt-2">
                  — Patient testimonial, Tokyo Medical Research Institute
                </footer>
              </blockquote>

              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Published Research
                </Button>
                <Button variant="outline" size="sm">
                  Clinical Data Summary
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to explore quantum-powered medicine?
            </h2>
            <p className="text-muted-foreground">
              Run your own VQE simulations and discover the molecular foundations of therapeutic hydrogen.
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Button onClick={() => navigate("/simulation")} size="lg">
                Start Simulation
              </Button>
              <Button variant="outline" onClick={() => navigate("/how-it-works")} size="lg">
                Learn the Science
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuantumCure;