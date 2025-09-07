import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Multi-Disease Impact Dashboard
        </h2>
        <p className="text-xl text-muted-foreground">
          H₂ therapeutic effects across different conditions
        </p>
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

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Metrics Cards */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Treatment Outcomes</h3>
                {[
                  { label: 'Symptom Improvement', value: disease.metrics.symptomImprovement, icon: '📈' },
                  { label: 'Immune Recovery', value: disease.metrics.immuneRecovery, icon: '🛡️' },
                  { label: 'ROS Reduction', value: disease.metrics.rosReduction, icon: '⚡' }
                ].map((metric, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <span>{metric.icon}</span>
                        <span className="font-medium">{metric.label}</span>
                      </span>
                      <span className="text-xl font-bold text-primary">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </Card>
                ))}
              </div>

              {/* Timeline Chart */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="text-center">Recovery Timeline (4 Weeks)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={disease.timeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" label={{ value: 'Weeks', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Improvement %', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="symptoms" 
                        stroke={disease.color} 
                        strokeWidth={3}
                        name="Symptoms"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="immune" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        name="Immune Function"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ros" 
                        stroke="#f59e0b" 
                        strokeWidth={3}
                        name="ROS Levels"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
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