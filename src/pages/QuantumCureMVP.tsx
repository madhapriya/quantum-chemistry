import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ReferenceLine } from "recharts";
import { Atom, Brain, Database, Zap, Target, TrendingUp, Users, FlaskConical } from "lucide-react";
import h2EnergyImage from "@/assets/h2-energy-curve.png";
import qsvmClassificationImage from "@/assets/qsvm-classification.png";
import futureVisionImage from "@/assets/future-vision-infographic.png";

const QuantumCureMVP = () => {
  const navigate = useNavigate();

  // Mock data for H₂ simulation
  const h2Data = [
    { bondLength: 0.5, energy: -0.8 },
    { bondLength: 0.7, energy: -1.1 },
    { bondLength: 0.74, energy: -1.137 },
    { bondLength: 0.8, energy: -1.12 },
    { bondLength: 1.0, energy: -1.05 },
    { bondLength: 1.2, energy: -0.95 },
    { bondLength: 1.5, energy: -0.75 }
  ];

  // Mock data for QSVM classification
  const classicalData = [
    { x: 2.5, y: 3.2, type: "cancer" },
    { x: 3.1, y: 2.8, type: "cancer" },
    { x: 1.8, y: 4.1, type: "healthy" },
    { x: 2.2, y: 3.9, type: "healthy" },
    { x: 3.5, y: 2.1, type: "cancer" },
    { x: 1.5, y: 4.5, type: "healthy" }
  ];

  const quantumData = [
    { x: 2.5, y: 3.2, type: "cancer" },
    { x: 3.1, y: 2.8, type: "cancer" },
    { x: 1.8, y: 4.1, type: "healthy" },
    { x: 2.2, y: 3.9, type: "healthy" },
    { x: 3.5, y: 2.1, type: "cancer" },
    { x: 1.5, y: 4.5, type: "healthy" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-card/30">
      {/* Navigation */}
      <nav className="border-b border-border/40 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/")}>
            ← Back to Home
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Quantum-Cure MVP</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
            <Atom className="w-4 h-4 mr-2" />
            Quantum Computing × Cancer Research
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Quantum-Cure
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Harnessing Quantum Mechanics & AI to Transform Cancer Therapy
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="px-8 py-3">
              <Target className="w-5 h-5 mr-2" />
              About Our Mission
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              <FlaskConical className="w-5 h-5 mr-2" />
              Our Work
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              <Brain className="w-5 h-5 mr-2" />
              Use Case Demo
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              <Zap className="w-5 h-5 mr-2" />
              Future Vision
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">About Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bridging quantum computing and oncology to unlock new therapeutic possibilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-destructive">
                  <Target className="w-6 h-6 mr-3" />
                  The Problem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  • Cancer is incredibly complex, requiring precise, personalized treatment approaches
                </p>
                <p className="text-muted-foreground">
                  • Molecular hydrogen (H₂) has proven therapeutic potential but needs deeper understanding
                </p>
                <p className="text-muted-foreground">
                  • Traditional computing struggles with molecular complexity and cancer data analysis
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-primary">
                  <Zap className="w-6 h-6 mr-3" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  • Leverage quantum simulations to understand molecular interactions at unprecedented depth
                </p>
                <p className="text-muted-foreground">
                  • Combine ML/QML techniques to support cancer therapy discovery and optimization
                </p>
                <p className="text-muted-foreground">
                  • Create decision-support systems that empower oncologists with quantum-enhanced insights
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Work So Far</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pioneering quantum molecular simulations with real therapeutic applications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Atom className="w-5 h-5 mr-2 text-primary" />
                    H₂ & LiH Quantum Simulations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm font-medium">VQE Algorithm</span>
                    <Badge variant="secondary">Qiskit</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
                    <span className="text-sm font-medium">Ground State Energy</span>
                    <Badge>-1.137 Ha</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm font-medium">Accuracy vs Classical</span>
                    <Badge variant="outline">98.2%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-secondary" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    ✓ Quantum algorithms can accurately approximate molecular energies
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ✓ Built foundation for biomedical molecule simulation
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ✓ Demonstrated quantum advantage in molecular optimization
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="p-6">
              <CardHeader>
                <CardTitle>H₂ Molecule Energy Curve</CardTitle>
                <CardDescription>Ground state energy vs bond length (Å)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/20 p-4 rounded-lg">
                  <img 
                    src={h2EnergyImage} 
                    alt="H₂ Molecule Energy Curve showing bond length vs energy relationship"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-primary/5 rounded-lg text-center">
                    <div className="font-semibold text-primary">Optimal Bond Length</div>
                    <div className="text-muted-foreground">0.74 Å</div>
                  </div>
                  <div className="p-3 bg-secondary/5 rounded-lg text-center">
                    <div className="font-semibold text-secondary">Ground State Energy</div>
                    <div className="text-muted-foreground">-1.137 Ha</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real-Time Use Case Demo */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Real-Time Use Case Demo</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              QSVM Classification: Gene Expression Data → Cancer vs Healthy
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="comparison" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="comparison">Performance Comparison</TabsTrigger>
                <TabsTrigger value="classical">Classical ML View</TabsTrigger>
                <TabsTrigger value="quantum">Quantum Kernel View</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="space-y-6">
                <Card className="p-6 mb-8">
                  <CardHeader>
                    <CardTitle className="text-center">QSVM Cancer Classification Demo</CardTitle>
                    <CardDescription className="text-center">Gene Expression Data Classification Results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img 
                      src={qsvmClassificationImage} 
                      alt="QSVM Classification showing cancer vs healthy gene expression data"
                      className="w-full h-auto rounded-lg shadow-sm mb-4"
                    />
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle className="text-center">Classical ML</CardTitle>
                      <CardDescription className="text-center">Traditional Support Vector Machine</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="text-4xl font-bold text-muted-foreground">85%</div>
                      <p className="text-sm text-muted-foreground">Classification Accuracy</p>
                      <Badge variant="secondary">Standard Kernel</Badge>
                    </CardContent>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-center text-primary">Quantum Kernel (QSVM)</CardTitle>
                      <CardDescription className="text-center">Quantum-Enhanced Classification</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="text-4xl font-bold text-primary">90%</div>
                      <p className="text-sm text-muted-foreground">Classification Accuracy</p>
                      <Badge className="bg-primary">Quantum Advantage</Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="classical">
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle>Classical ML Decision Boundary</CardTitle>
                    <CardDescription>Gene Expression Feature Space</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <ScatterChart data={classicalData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="x" />
                        <YAxis dataKey="y" />
                        <Tooltip 
                          formatter={(value, name) => [value, name]}
                          labelFormatter={() => ""}
                        />
                        <ReferenceLine x={2.8} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                        <Scatter 
                          dataKey="y" 
                          fill="hsl(var(--primary))"
                        />
                        <Scatter 
                          data={classicalData.filter(d => d.type === 'cancer')}
                          dataKey="y" 
                          fill="hsl(var(--destructive))"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quantum">
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader>
                    <CardTitle className="text-primary">Quantum Kernel Decision Boundary</CardTitle>
                    <CardDescription>Enhanced Feature Space Mapping</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <ScatterChart data={quantumData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="x" />
                        <YAxis dataKey="y" />
                        <Tooltip 
                          formatter={(value, name) => [value, name]}
                          labelFormatter={() => ""}
                        />
                        <ReferenceLine x={2.65} stroke="hsl(var(--primary))" strokeDasharray="3 3" strokeWidth={2} />
                        <Scatter 
                          data={quantumData.filter(d => d.type === 'healthy')}
                          dataKey="y" 
                          fill="hsl(var(--primary))"
                        />
                        <Scatter 
                          data={quantumData.filter(d => d.type === 'cancer')}
                          dataKey="y" 
                          fill="hsl(var(--destructive))"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Future Vision</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The next frontier of quantum-enhanced cancer therapy
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="p-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-4">Quantum-Enhanced Cancer Therapy Roadmap</CardTitle>
                <CardDescription>Our vision for the future of precision oncology</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src={futureVisionImage} 
                  alt="Future vision infographic showing quantum cancer therapy roadmap"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Database className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-lg mb-2">Real Datasets</CardTitle>
              <CardDescription>
                Integrate TCGA, GEO, and clinical cancer databases for comprehensive analysis
              </CardDescription>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Brain className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <CardTitle className="text-lg mb-2">Hybrid ML + QML</CardTitle>
              <CardDescription>
                Advanced diagnosis & drug response prediction using quantum-classical algorithms
              </CardDescription>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Atom className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-lg mb-2">H₂ Therapy Integration</CardTitle>
              <CardDescription>
                Connect molecular hydrogen research with quantum insights for personalized treatment
              </CardDescription>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <CardTitle className="text-lg mb-2">Clinical Support Systems</CardTitle>
              <CardDescription>
                AI-powered decision-support systems empowering oncologists with quantum insights
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/40">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center">
                <Atom className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">Quantum-Cure</span>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            Transforming cancer therapy through quantum computing and AI
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate("/quantum-cure")}>
              View Enhanced Demo
            </Button>
            <Button variant="outline" onClick={() => navigate("/simulation")}>
              Try Simulations
            </Button>
          </div>
          <div className="mt-8 pt-6 border-t border-border/20">
            <p className="text-sm text-muted-foreground">
              © 2025 Quantum-Cure - Pioneering quantum solutions for cancer therapy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuantumCureMVP;