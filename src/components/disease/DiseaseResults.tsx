
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Info } from "lucide-react";

interface Disease {
  name: string;
  confidence: number;
  description: string;
  treatment: string[];
  severity: "Low" | "Moderate" | "High";
}

interface DiseaseResultsProps {
  image: string;
  diseases: Disease[];
}

// Helper function to get color based on confidence
const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return "bg-green-100 text-green-800";
  if (confidence >= 50) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
};

// Helper function to get severity badge color
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Low":
      return "bg-green-100 text-green-800";
    case "Moderate":
      return "bg-amber-100 text-amber-800";
    case "High":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const DiseaseResults = ({ image, diseases }: DiseaseResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Analyzed Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md">
              <img
                src={image}
                alt="Analyzed plant"
                className="w-full h-auto max-h-64 object-contain"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Detection Results</CardTitle>
          </CardHeader>
          <CardContent>
            {diseases.length > 0 ? (
              <div className="space-y-4">
                {diseases.map((disease, i) => (
                  <div key={i} className="space-y-2 pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{disease.name}</h3>
                      <Badge className={getConfidenceColor(disease.confidence)}>
                        {disease.confidence}% confident
                      </Badge>
                    </div>
                    <Progress value={disease.confidence} className="h-1.5" />
                    <div className="flex justify-between items-center text-sm">
                      <Badge 
                        variant="outline" 
                        className={getSeverityColor(disease.severity)}
                      >
                        {disease.severity} Severity
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <Info className="h-8 w-8 mx-auto mb-2" />
                  <p>No diseases detected</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {diseases.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Disease Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {diseases.map((disease, i) => (
                <div key={i} className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0">
                  <h3 className="font-medium text-lg">{disease.name}</h3>
                  <p className="text-sm text-muted-foreground">{disease.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                      Treatment Recommendations
                    </h4>
                    <ul className="text-sm space-y-1 pl-6 list-disc">
                      {disease.treatment.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiseaseResults;
