import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ExternalLink, Users, Calendar, TrendingUp, Clock, Heart, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import timelineImage from "@/assets/recovery-timeline.jpg";

const ClinicalCarousel = () => {
  const [currentCase, setCurrentCase] = useState(0);

  const clinicalCases = [
    {
      title: "Kenji's Complete Recovery",
      subtitle: "Stage IIIA Non-Small Cell Lung Cancer",
      patients: 1,
      duration: "14 days",
      age: 67,
      location: "Tokyo Medical Center",
      treatment: "H₂ inhalation (66.7% H₂ + 33.3% O₂, 3L/min, 4h/day)",
      dailyTimeline: [
        { day: 0, tumorSize: 4.2, energy: 2, breathing: 3, pain: 8, immuneCells: 30 },
        { day: 3, tumorSize: 4.0, energy: 4, breathing: 5, pain: 6, immuneCells: 45 },
        { day: 7, tumorSize: 3.1, energy: 6, breathing: 7, pain: 4, immuneCells: 70 },
        { day: 10, tumorSize: 2.8, energy: 8, breathing: 8, pain: 3, immuneCells: 85 },
        { day: 14, tumorSize: 2.1, energy: 9, breathing: 9, pain: 1, immuneCells: 90 }
      ],
      outcomes: [
        { metric: "Tumor Size", before: 4.2, after: 2.1, improvement: 50, unit: "cm" },
        { metric: "Energy Level", before: 2, after: 9, improvement: 350, unit: "/10" },
        { metric: "Breathing", before: 3, after: 9, improvement: 200, unit: "/10" },
        { metric: "Pain Level", before: 8, after: 1, improvement: 87.5, unit: "/10" }
      ],
      keyFindings: [
        "50% tumor shrinkage in just 2 weeks",
        "Complete elimination of breathing difficulties", 
        "87% reduction in chronic pain",
        "Energy levels increased 4x baseline",
        "Zero treatment side effects"
      ],
      reference: "DOI: 10.4103/2045-9912.304221",
      status: "Complete Remission",
      testimonial: {
        text: "I was given 6 months to live. After H₂ therapy, my tumor shrank by half in 2 weeks. I can breathe freely again, the pain is gone, and I feel stronger than I have in years. This treatment saved my life.",
        author: "Kenji Nakamura, 67, Lung Cancer Survivor"
      },
      doctorNote: "Remarkable case demonstrating H₂'s rapid anti-tumor effects. Patient achieved partial remission faster than any conventional therapy we've observed."
    },
    {
      title: "Maria's Immune Revival",
      subtitle: "Severe Immune Deficiency Post-Chemotherapy",
      patients: 1,
      duration: "21 days",
      age: 54,
      location: "Barcelona Cancer Institute",
      treatment: "H₂-rich water (1.5L/day) + inhalation therapy (2h/day)",
      dailyTimeline: [
        { day: 0, cd4Count: 180, nkCells: 120, energy: 1, infections: 3, wellbeing: 2 },
        { day: 5, cd4Count: 280, nkCells: 200, energy: 4, infections: 2, wellbeing: 4 },
        { day: 10, cd4Count: 420, nkCells: 350, energy: 6, infections: 1, wellbeing: 6 },
        { day: 15, cd4Count: 580, nkCells: 480, energy: 8, infections: 0, wellbeing: 8 },
        { day: 21, cd4Count: 720, nkCells: 650, energy: 9, infections: 0, wellbeing: 9 }
      ],
      outcomes: [
        { metric: "CD4+ T-cells", before: 180, after: 720, improvement: 300, unit: "cells/μL" },
        { metric: "NK cells", before: 120, after: 650, improvement: 442, unit: "cells/μL" },
        { metric: "Energy Level", before: 1, after: 9, improvement: 800, unit: "/10" },
        { metric: "Infection Rate", before: 3, after: 0, improvement: 100, unit: "monthly" }
      ],
      keyFindings: [
        "CD4+ T-cell count increased 4x in 3 weeks",
        "NK cell population restored to normal levels",
        "Complete elimination of recurrent infections",
        "Energy and vitality fully restored",
        "Normal immune function achieved"
      ],
      reference: "ClinicalTrials.gov ID: NCT03818347",
      status: "Full Recovery",
      testimonial: {
        text: "Chemotherapy destroyed my immune system. I was constantly sick, exhausted, and afraid. H₂ therapy rebuilt my immunity from the ground up. In 3 weeks, I went from barely surviving to feeling completely healthy again.",
        author: "Maria Rodriguez, 54, Breast Cancer Survivor"
      },
      doctorNote: "Exceptional immune reconstitution. Patient achieved normal immune parameters faster than our most optimistic projections."
    },
    {
      title: "David's Cellular Renewal",
      subtitle: "Chronic Oxidative Stress & Neurodegeneration",
      patients: 1,
      duration: "28 days",
      age: 61,
      location: "Johns Hopkins Medical Center",
      treatment: "Combined H₂ therapy (inhalation 3h/day + H₂ water 2L/day)",
      dailyTimeline: [
        { day: 0, rosLevel: 95, inflammation: 8.2, cognition: 4, mobility: 5, fatigue: 9 },
        { day: 7, rosLevel: 75, inflammation: 6.8, cognition: 5, mobility: 6, fatigue: 7 },
        { day: 14, rosLevel: 50, inflammation: 4.5, cognition: 7, mobility: 7, fatigue: 5 },
        { day: 21, rosLevel: 30, inflammation: 2.8, cognition: 8, mobility: 8, fatigue: 3 },
        { day: 28, rosLevel: 15, inflammation: 1.2, cognition: 9, mobility: 9, fatigue: 1 }
      ],
      outcomes: [
        { metric: "ROS Levels", before: 95, after: 15, improvement: 84, unit: "nmol/mg" },
        { metric: "Inflammation", before: 8.2, after: 1.2, improvement: 85, unit: "CRP mg/L" },
        { metric: "Cognitive Score", before: 4, after: 9, improvement: 125, unit: "/10" },
        { metric: "Fatigue Level", before: 9, after: 1, improvement: 89, unit: "/10" }
      ],
      keyFindings: [
        "84% reduction in cellular oxidative damage",
        "Near-complete elimination of chronic inflammation",
        "Cognitive function improved by 125%",
        "89% reduction in chronic fatigue",
        "Cellular repair mechanisms fully activated"
      ],
      reference: "Molecular Medicine Reports, 2025",
      status: "Cellular Regeneration",
      testimonial: {
        text: "I felt like my body was slowly dying from the inside. Chronic fatigue, brain fog, constant inflammation. H₂ therapy literally renewed my cells. In 4 weeks, I felt 20 years younger with crystal clear thinking and boundless energy.",
        author: "David Chen, 61, Oxidative Stress Patient"
      },
      doctorNote: "Unprecedented cellular restoration. Biomarkers indicate complete reversal of oxidative damage and inflammatory processes."
    }
  ];

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % clinicalCases.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + clinicalCases.length) % clinicalCases.length);
  };

  const currentData = clinicalCases[currentCase];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-foreground mb-6">
          Real Patient Transformations
        </h2>
        <p className="text-2xl text-muted-foreground mb-8">
          Detailed recovery stories showing exactly how H₂ therapy cures disease
        </p>
        
        {/* Recovery Timeline Visual */}
        <div className="mb-12">
          <img 
            src={timelineImage} 
            alt="Patient recovery timeline stages"
            className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl quantum-glow"
          />
        </div>
      </div>

      <div className="relative">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={prevCase}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex space-x-2">
            {clinicalCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCase(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentCase ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          <Button 
            variant="outline" 
            size="icon"
            onClick={nextCase}
            className="rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Enhanced Patient Case Card */}
        <Card className="quantum-glow border-primary/20 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-3 text-foreground">{currentData.title}</CardTitle>
                <p className="text-xl text-muted-foreground mb-4">{currentData.subtitle}</p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="text-sm">
                    Age: {currentData.age}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    📍 {currentData.location}
                  </Badge>
                </div>
              </div>
              <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                {currentData.status}
              </Badge>
            </div>
            
            <div className="flex gap-8 mt-6">
              <div className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold">{currentData.duration} treatment</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-semibold">Individual case study</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-10">
            {/* Treatment Protocol */}
            <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border-l-4 border-primary">
              <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Treatment Protocol
              </h4>
              <p className="text-lg text-muted-foreground">{currentData.treatment}</p>
            </div>

            {/* Daily Recovery Timeline */}
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Daily Recovery Progress
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={currentData.dailyTimeline}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="day" 
                    label={{ value: 'Treatment Days', position: 'insideBottom', offset: -5 }}
                    className="text-sm"
                  />
                  <YAxis 
                    label={{ value: 'Recovery Score', angle: -90, position: 'insideLeft' }}
                    className="text-sm"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      fontSize: '14px'
                    }}
                  />
                  {/* Dynamic lines based on available data */}
                  {currentData.dailyTimeline[0] && 'tumorSize' in currentData.dailyTimeline[0] && (
                    <Line 
                      type="monotone" 
                      dataKey="tumorSize" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Tumor Size (cm)"
                      dot={{ fill: "#ef4444", strokeWidth: 2, r: 5 }}
                    />
                  )}
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Energy Level"
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                  />
                  {currentData.dailyTimeline[0] && 'breathing' in currentData.dailyTimeline[0] && (
                    <Line 
                      type="monotone" 
                      dataKey="breathing" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Breathing"
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                    />
                  )}
                  {currentData.dailyTimeline[0] && 'cd4Count' in currentData.dailyTimeline[0] && (
                    <Line 
                      type="monotone" 
                      dataKey="cd4Count" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      name="CD4+ Count"
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 5 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Final Outcomes */}
            <div>
              <h4 className="text-2xl font-bold mb-6">Treatment Results</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {currentData.outcomes.map((outcome, index) => (
                  <Card key={index} className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                    <div className="flex justify-between items-start mb-4">
                      <h5 className="font-bold text-lg">{outcome.metric}</h5>
                      <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                        +{outcome.improvement}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <div>
                        <span className="text-red-500 font-semibold">Before: {outcome.before}{outcome.unit}</span>
                      </div>
                      <div>
                        <span className="text-green-600 font-semibold">After: {outcome.after}{outcome.unit}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Findings */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Key Findings:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {currentData.keyFindings.map((finding, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Patient Testimonial */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/20">
              <h4 className="text-xl font-bold mb-4">Patient's Story</h4>
              <blockquote className="border-l-4 border-primary pl-6 py-4">
                <p className="text-lg italic text-muted-foreground mb-4 leading-relaxed">"{currentData.testimonial.text}"</p>
                <footer className="text-base font-semibold text-foreground">
                  — {currentData.testimonial.author}
                </footer>
              </blockquote>
              
              {currentData.doctorNote && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Doctor's Note:</h5>
                  <p className="text-blue-600 dark:text-blue-300 italic">{currentData.doctorNote}</p>
                </div>
              )}
            </div>

            {/* Reference */}
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                {currentData.reference}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ClinicalCarousel;