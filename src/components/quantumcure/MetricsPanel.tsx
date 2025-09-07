import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Zap, Activity, Shield, Clock } from "lucide-react";

const MetricsPanel = () => {
  const metrics = [
    {
      category: "Quantum Simulation",
      icon: <Zap className="w-5 h-5" />,
      data: [
        { label: "Ground State Energy", value: "-1.137 Ha", progress: 98, description: "H₂ VQE simulation precision" },
        { label: "Accuracy vs FCI", value: "98%", progress: 98, description: "Quantum fidelity benchmark" },
        { label: "Qubits Used", value: "2", progress: 40, description: "Minimal quantum resources" },
        { label: "Simulation Time", value: "1.5 sec", progress: 85, description: "Per iteration speed" }
      ]
    },
    {
      category: "Clinical Outcomes",
      icon: <Activity className="w-5 h-5" />,
      data: [
        { label: "Tumor Marker Reduction", value: "~50%", progress: 50, description: "NSCLC Japanese trial results" },
        { label: "Immune Cell Recovery", value: "Normalized", progress: 70, description: "T-cells, NK/NKT restoration" },
        { label: "Asthma Improvement", value: "~60%", progress: 60, description: "Breathing & inflammation reduction" },
        { label: "Oxidative Stress Reduction", value: "~75%", progress: 75, description: "ROS scavenging efficacy" }
      ]
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Simulation & Clinical Metrics
        </h2>
        <p className="text-xl text-muted-foreground">
          From quantum calculations to real-world healing outcomes
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {metrics.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="quantum-glow border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {category.icon}
                </div>
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.data.map((metric, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-2 cursor-pointer group">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {metric.label}
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            {metric.value}
                          </span>
                        </div>
                        <Progress 
                          value={metric.progress} 
                          className="h-2 group-hover:h-3 transition-all duration-300"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>{metric.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MetricsPanel;