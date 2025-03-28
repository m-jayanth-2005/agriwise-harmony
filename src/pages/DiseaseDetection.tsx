
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageUploader from "@/components/disease/ImageUploader";
import DiseaseResults from "@/components/disease/DiseaseResults";
import { useToast } from "@/components/ui/use-toast";

interface Disease {
  name: string;
  confidence: number;
  description: string;
  treatment: string[];
  severity: "Low" | "Moderate" | "High";
}

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const { toast } = useToast();

  const handleImageSelected = (imageDataUrl: string) => {
    setSelectedImage(imageDataUrl);
    analyzeImage(imageDataUrl);
  };

  const analyzeImage = (imageDataUrl: string) => {
    setAnalyzing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock disease detection results
      const mockDiseases: Disease[] = [
        {
          name: "Early Blight",
          confidence: 89,
          description: "Early blight is a fungal disease caused by Alternaria solani. It affects tomatoes, potatoes, and other members of the Solanaceae family. The disease causes dark spots with concentric rings on lower leaves first, then progresses upward.",
          treatment: [
            "Remove and destroy infected leaves and plants",
            "Apply copper-based fungicide every 7-10 days",
            "Ensure proper plant spacing for air circulation",
            "Water at the base of plants to keep foliage dry",
          ],
          severity: "Moderate",
        },
        {
          name: "Powdery Mildew",
          confidence: 45,
          description: "Powdery mildew is a fungal disease that appears as white powdery spots on leaves, stems, and sometimes fruit. It thrives in high humidity and moderate temperatures.",
          treatment: [
            "Apply neem oil or potassium bicarbonate spray",
            "Prune plants to improve air circulation",
            "Water early in the day so plants can dry before evening",
            "Remove severely infected plants to prevent spread",
          ],
          severity: "Low",
        },
      ];
      
      setDiseases(mockDiseases);
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Plant disease detection has been completed.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="ag-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Plant Disease Detection</h1>
            <p className="text-muted-foreground max-w-2xl">
              Upload or take photos of your plants to identify diseases and get treatment recommendations using our AI image recognition technology.
            </p>
          </div>

          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="history">Detection History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Plant Image</CardTitle>
                      <CardDescription>
                        Upload or capture a photo of your plant to detect diseases
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ImageUploader onImageSelected={handleImageSelected} />
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  {analyzing ? (
                    <Card className="h-full flex items-center justify-center">
                      <CardContent className="py-10 text-center">
                        <div className="mb-4 mx-auto">
                          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                        </div>
                        <h3 className="text-xl font-medium mb-2">Analyzing Image</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Our AI is analyzing your plant image. This may take a few moments...
                        </p>
                      </CardContent>
                    </Card>
                  ) : selectedImage ? (
                    <DiseaseResults
                      image={selectedImage}
                      diseases={diseases}
                    />
                  ) : (
                    <Card className="h-full flex items-center justify-center bg-muted/30">
                      <CardContent className="py-10 text-center">
                        <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-plant-light flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-plant-darker">
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-medium mb-2">No Image Uploaded</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Upload or take a photo of your plant to get started with disease detection.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Detection History</CardTitle>
                  <CardDescription>
                    Your previous plant disease detection scans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                        <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={`https://source.unsplash.com/random/100x100?plants&sig=${i}`}
                            alt="Plant"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-medium">Tomato Plant Scan #{i}</h3>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Detected: Early Blight (76% confidence)
                          </p>
                          <div className="flex gap-2">
                            <button className="text-xs text-primary hover:underline">View Details</button>
                            <span className="text-xs text-muted-foreground">•</span>
                            <button className="text-xs text-primary hover:underline">Rescan</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-10 bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Common Plant Diseases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-2">Powdery Mildew</h3>
                <p className="text-sm text-muted-foreground">
                  Appears as white powdery spots on leaves and stems. Common in humid conditions with poor air circulation. Affects a wide range of plants including cucurbits, roses, and apples.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Early Blight</h3>
                <p className="text-sm text-muted-foreground">
                  Causes dark spots with concentric rings on leaves, starting from lower leaves. Common in tomatoes and potatoes. Thrives in warm, humid conditions and spreads quickly.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Bacterial Leaf Spot</h3>
                <p className="text-sm text-muted-foreground">
                  Appears as dark, water-soaked spots on leaves that may have yellow halos. Affects peppers, tomatoes, and leafy greens. Spreads through water splashing and contaminated tools.
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

export default DiseaseDetection;
