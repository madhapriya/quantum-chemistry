import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import mechanismsImage from "@/assets/h2-mechanisms-infographic.jpg";

const MultiDiseaseDashboard = () => {
  const diseaseData = {
    "lung-cancer": {
      name: "Lung Cancer",
      icon: "🫁",
      color: "#3b82f6",
      metrics: {
        symptomImprovement: 50,
        immuneRecovery: 70,
        rosReduction: 65
      },
      timeline: [
        { week: 0, symptoms: 100, immune: 30, ros: 100 },
        { week: 1, symptoms: 80, immune: 45, ros: 70 },
        { week: 2, symptoms: 50, immune: 70, ros: 35 },
        { week: 4, symptoms: 30, immune: 85, ros: 25 }
      ],
      description: "H₂ therapy reduces tumor markers and restores immune function in NSCLC patients"
    },
    "asthma": {
      name: "Asthma",
      icon: "💨",
      color: "#10b981",
      metrics: {
        symptomImprovement: 60,
        immuneRecovery: 50,
        rosReduction: 55
      },
      timeline: [
        { week: 0, symptoms: 100, immune: 40, ros: 100 },
        { week: 1, symptoms: 75, immune: 50, ros: 80 },
        { week: 2, symptoms: 40, immune: 65, ros: 45 },
        { week: 4, symptoms: 25, immune: 75, ros: 30 }
      ],
      description: "Reduces inflammation and improves breathing capacity"
    },
    "oxidative-stress": {
      name: "Oxidative Stress",
      icon: "⚡",
      color: "#f59e0b",
      metrics: {
        symptomImprovement: 75,
        immuneRecovery: 60,
        rosReduction: 80
      },
      timeline: [
        { week: 0, symptoms: 100, immune: 35, ros: 100 },
        { week: 1, symptoms: 60, immune: 50, ros: 60 },
        { week: 2, symptoms: 25, immune: 70, ros: 20 },
        { week: 4, symptoms: 15, immune: 80, ros: 10 }
      ],
      description: "Powerful ROS scavenging across cellular domains"
    },
    "neurodegeneration": {
      name: "Neurodegeneration",
      icon: "🧠",
      color: "#8b5cf6",
      metrics: {
        symptomImprovement: 40,
        immuneRecovery: 45,
        rosReduction: 50
      },
      timeline: [
        { week: 0, symptoms: 100, immune: 30, ros: 100 },
        { week: 1, symptoms: 90, immune: 35, ros: 85 },
        { week: 2, symptoms: 60, immune: 50, ros: 50 },
        { week: 4, symptoms: 45, immune: 60, ros: 35 }
      ],
      description: "Neuroprotective effects through oxidative stress reduction"
    }
  };

  const [selectedDisease, setSelectedDisease] = useState("lung-cancer");
  const currentData = diseaseData[selectedDisease as keyof typeof diseaseData];

  const pieData = [
    { name: 'Symptom Relief', value: currentData.metrics.symptomImprovement, color: currentData.color },
    { name: 'Immune Recovery', value: currentData.metrics.immuneRecovery, color: '#10b981' },
    { name: 'ROS Reduction', value: currentData.metrics.rosReduction, color: '#f59e0b' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-foreground mb-6">
          H₂ Healing Mechanisms
        </h2>
        <p className="text-2xl text-muted-foreground mb-8">
          How molecular hydrogen transforms disease into recovery
        </p>
        
        {/* Mechanisms Infographic */}
        <div className="mb-12">
          <img 
            src={mechanismsImage} 
            alt="H2 therapy mechanisms infographic"
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl quantum-glow"
          />
        </div>
      </div>

      <Tabs value={selectedDisease} onValueChange={setSelectedDisease} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 h-auto p-2">
          {Object.entries(diseaseData).map(([key, disease]) => (
            <TabsTrigger 
              key={key} 
              value={key}
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary/10"
            >
              <span className="text-2xl">{disease.icon}</span>
              <span className="text-sm font-medium">{disease.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(diseaseData).map(([key, disease]) => (
          <TabsContent key={key} value={key} className="space-y-8">
            <div className="text-center">
              <Badge variant="outline" className="text-lg px-4 py-2 mb-4">
                {disease.description}
              </Badge>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Enhanced Metrics with Visual Cards */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-center text-foreground mb-8">Treatment Impact</h3>
                {[
                  { 
                    label: 'Symptom Relief', 
                    value: disease.metrics.symptomImprovement, 
                    icon: '📈',
                    color: disease.color,
                    description: 'Patient-reported improvement'
                  },
                  { 
                    label: 'Immune Restoration', 
                    value: disease.metrics.immuneRecovery, 
                    icon: '🛡️',
                    color: '#10b981',
                    description: 'T-cell and NK cell recovery'
                  },
                  { 
                    label: 'Oxidative Balance', 
                    value: disease.metrics.rosReduction, 
                    icon: '⚡',
                    color: '#f59e0b',
                    description: 'ROS neutralization efficacy'
                  }
                ].map((metric, index) => (
                  <Card key={index} className="p-6 quantum-glow hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl p-3 bg-primary/10 rounded-full">
                          {metric.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-foreground">{metric.label}</h4>
                          <p className="text-sm text-muted-foreground">{metric.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold" style={{ color: metric.color }}>
                          {metric.value}%
                        </div>
                        <div className="text-sm text-muted-foreground">improvement</div>
                      </div>
                    </div>
                    <Progress value={metric.value} className="h-3" />
                  </Card>
                ))}
              </div>

              {/* Enhanced Recovery Visualization */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-center text-foreground mb-8">Recovery Journey</h3>
                
                {/* Recovery Timeline Chart */}
                <Card className="quantum-glow">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">4-Week Healing Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={disease.timeline}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis 
                          dataKey="week" 
                          label={{ value: 'Treatment Weeks', position: 'insideBottom', offset: -5 }}
                          className="text-sm"
                        />
                        <YAxis 
                          label={{ value: 'Recovery Progress (%)', angle: -90, position: 'insideLeft' }}
                          className="text-sm"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="symptoms" 
                          stroke={disease.color} 
                          strokeWidth={4}
                          name="Symptom Relief"
                          dot={{ fill: disease.color, strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: disease.color, strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="immune" 
                          stroke="#10b981" 
                          strokeWidth={4}
                          name="Immune Recovery"
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="ros" 
                          stroke="#f59e0b" 
                          strokeWidth={4}
                          name="Oxidative Balance"
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: "#f59e0b", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Recovery Milestones */}
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <h4 className="text-xl font-bold mb-4">Key Recovery Milestones</h4>
                  <div className="space-y-3">
                    {[
                      { week: "Week 1", milestone: "Initial symptom relief begins", percentage: "25%" },
                      { week: "Week 2", milestone: "Significant immune cell recovery", percentage: "50%" },
                      { week: "Week 3", milestone: "Major oxidative stress reduction", percentage: "75%" },
                      { week: "Week 4", milestone: "Near-complete functional restoration", percentage: "90%" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                        <div>
                          <span className="font-semibold text-primary">{item.week}:</span>
                          <span className="ml-2 text-muted-foreground">{item.milestone}</span>
                        </div>
                        <Badge variant="secondary" className="text-lg font-bold">{item.percentage}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Pie Chart */}
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Mechanism Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default MultiDiseaseDashboard;