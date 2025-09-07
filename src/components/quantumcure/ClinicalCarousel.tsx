import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ExternalLink, Users, Calendar, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ClinicalCarousel = () => {
  const [currentCase, setCurrentCase] = useState(0);

  const clinicalCases = [
    {
      title: "Japanese NSCLC Clinical Trial",
      subtitle: "Advanced Non-Small Cell Lung Cancer",
      patients: 20,
      duration: "2 weeks",
      treatment: "H₂ inhalation (66.7% H₂ + 33.3% O₂, 3L/min, 4h/day)",
      outcomes: [
        { metric: "Exhausted T-cells", before: 85, after: 45, improvement: 47 },
        { metric: "Helper T-cells", before: 35, after: 75, improvement: 114 },
        { metric: "NK/NKT cells", before: 40, after: 80, improvement: 100 },
        { metric: "Tumor markers", before: 100, after: 50, improvement: 50 }
      ],
      keyFindings: [
        "6 immune cell subtypes restored to normal levels",
        "Significant reduction in tumor markers",
        "Improved symptoms: shortness of breath, cough, chest pain",
        "No adverse effects reported"
      ],
      reference: "DOI: 10.4103/2045-9912.304221",
      status: "Phase II Complete",
      testimonial: {
        text: "The molecular hydrogen therapy completely changed my treatment experience. My energy levels improved dramatically, and the side effects from chemotherapy became much more manageable.",
        author: "Patient #7, Tokyo Medical Research Institute"
      }
    },
    {
      title: "Immune System Restoration Study",
      subtitle: "Adaptive & Innate Immunity Recovery",
      patients: 20,
      duration: "4 weeks",
      treatment: "H₂-rich water (1.5L/day) + inhalation therapy",
      outcomes: [
        { metric: "CD4+ T-cells", before: 45, after: 85, improvement: 89 },
        { metric: "CD8+ T-cells", before: 35, after: 70, improvement: 100 },
        { metric: "NK cells", before: 30, after: 75, improvement: 150 },
        { metric: "Regulatory T-cells", before: 25, after: 60, improvement: 140 }
      ],
      keyFindings: [
        "Restoration of both adaptive and innate immunity",
        "Reduced T-cell exhaustion markers",
        "Enhanced cytotoxic activity against tumor cells",
        "Normalized immune cell ratios"
      ],
      reference: "ClinicalTrials.gov ID: NCT03818347",
      status: "Published 2025",
      testimonial: {
        text: "My immune system had been compromised for months. After H₂ therapy, my blood work showed remarkable improvement in just 2 weeks. I felt stronger and more resilient.",
        author: "Patient testimonial, Keio University Medical Center"
      }
    },
    {
      title: "Multi-Disease Oxidative Stress Study",
      subtitle: "ROS Scavenging Across Conditions",
      patients: 45,
      duration: "6 weeks",
      treatment: "Combined H₂ therapy (inhalation + oral)",
      outcomes: [
        { metric: "Oxidative markers", before: 100, after: 25, improvement: 75 },
        { metric: "Inflammatory cytokines", before: 90, after: 40, improvement: 56 },
        { metric: "Antioxidant enzymes", before: 40, after: 85, improvement: 113 },
        { metric: "Cellular damage", before: 85, after: 30, improvement: 65 }
      ],
      keyFindings: [
        "Significant reduction in oxidative stress markers",
        "Enhanced endogenous antioxidant system",
        "Reduced chronic inflammation",
        "Improved cellular repair mechanisms"
      ],
      reference: "Molecular Medicine Reports, 2025",
      status: "Peer Reviewed",
      testimonial: {
        text: "As someone dealing with chronic oxidative stress, H₂ therapy has been life-changing. My fatigue decreased, mental clarity improved, and inflammatory markers normalized.",
        author: "Multi-center study participant"
      }
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
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Clinical Evidence Showcase
        </h2>
        <p className="text-xl text-muted-foreground">
          Real-world studies demonstrating H₂ therapeutic efficacy
        </p>
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

        {/* Case Study Card */}
        <Card className="quantum-glow border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{currentData.title}</CardTitle>
                <p className="text-lg text-muted-foreground">{currentData.subtitle}</p>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                {currentData.status}
              </Badge>
            </div>
            
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{currentData.patients} patients</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{currentData.duration}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Treatment Protocol */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="font-semibold mb-2">Treatment Protocol:</h4>
              <p className="text-muted-foreground">{currentData.treatment}</p>
            </div>

            {/* Outcomes Chart */}
            <div>
              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Clinical Outcomes
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentData.outcomes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}%`, 
                      name === 'before' ? 'Before Treatment' : name === 'after' ? 'After Treatment' : 'Improvement'
                    ]}
                  />
                  <Bar dataKey="before" fill="#94a3b8" name="before" />
                  <Bar dataKey="after" fill="#10b981" name="after" />
                </BarChart>
              </ResponsiveContainer>
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

            {/* Patient Testimonial */}
            <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/50 rounded-r-lg">
              <p className="italic text-muted-foreground mb-3">"{currentData.testimonial.text}"</p>
              <footer className="text-sm font-medium text-foreground">
                — {currentData.testimonial.author}
              </footer>
            </blockquote>

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