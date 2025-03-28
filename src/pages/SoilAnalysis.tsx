
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SoilHealthForm from "@/components/soil/SoilHealthForm";
import SoilHealthResults from "@/components/soil/SoilHealthResults";

interface SoilAnalysisResult {
  soilQuality: string;
  nutrientBalance: string;
  recommendations: string[];
  suitableCrops: string[];
  soilParams: {
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    moisture: number;
  };
}

const SoilAnalysis = () => {
  const [analysisResult, setAnalysisResult] = useState<SoilAnalysisResult | null>(null);

  const handleAnalysisComplete = (result: SoilAnalysisResult) => {
    setAnalysisResult(result);
    
    // Scroll to results after a short delay
    setTimeout(() => {
      const resultsElement = document.getElementById("analysis-results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="ag-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Soil Health Analysis</h1>
            <p className="text-muted-foreground max-w-2xl">
              Input your soil parameters to receive detailed insights about your soil's health and get AI-powered recommendations for improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Soil Parameters</CardTitle>
                  <CardDescription>
                    Enter your soil test values or use the sliders to adjust
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SoilHealthForm onAnalysis={handleAnalysisComplete} />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2" id="analysis-results">
              {analysisResult ? (
                <SoilHealthResults results={analysisResult} />
              ) : (
                <Card className="h-full flex items-center justify-center bg-muted/30">
                  <CardContent className="py-10 text-center">
                    <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-soil-light flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-soil-darker">
                        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                        <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                        <path d="M5 14h14" />
                        <path d="M9 18v3" />
                        <path d="M15 18v3" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Analysis Results Yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Enter your soil parameters and click "Analyze Soil Health" to see detailed results and recommendations.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="mt-10 bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Understanding Your Soil</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-2">Soil pH</h3>
                <p className="text-sm text-muted-foreground">
                  pH measures the acidity or alkalinity of your soil on a scale from 0 to 14. Most plants thrive in slightly acidic to neutral soil (pH 6.0-7.0). pH affects nutrient availability to plants.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">NPK Values</h3>
                <p className="text-sm text-muted-foreground">
                  Nitrogen (N), Phosphorus (P), and Potassium (K) are the three primary nutrients for plant growth. Proper balance is essential for healthy plant development.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Soil Moisture</h3>
                <p className="text-sm text-muted-foreground">
                  Soil moisture affects nutrient availability, microbial activity, and plant water uptake. Optimal moisture levels vary by soil type and crop requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SoilAnalysis;
