
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SoilHealthResultsProps {
  results: {
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
  };
}

const getNutrientStatus = (value: number) => {
  if (value < 30) return { status: "Low", color: "bg-red-200 text-red-800", icon: <X className="h-4 w-4" /> };
  if (value > 70) return { status: "High", color: "bg-green-200 text-green-800", icon: <Check className="h-4 w-4" /> };
  return { status: "Optimal", color: "bg-blue-200 text-blue-800", icon: <Check className="h-4 w-4" /> };
};

const getPhStatus = (value: number) => {
  if (value < 6.0) return { status: "Acidic", color: "bg-amber-200 text-amber-800", icon: <AlertTriangle className="h-4 w-4" /> };
  if (value > 7.5) return { status: "Alkaline", color: "bg-amber-200 text-amber-800", icon: <AlertTriangle className="h-4 w-4" /> };
  return { status: "Neutral", color: "bg-green-200 text-green-800", icon: <Check className="h-4 w-4" /> };
};

const getMoistureStatus = (value: number) => {
  if (value < 30) return { status: "Dry", color: "bg-amber-200 text-amber-800", icon: <AlertTriangle className="h-4 w-4" /> };
  if (value > 70) return { status: "Wet", color: "bg-amber-200 text-amber-800", icon: <AlertTriangle className="h-4 w-4" /> };
  return { status: "Optimal", color: "bg-green-200 text-green-800", icon: <Check className="h-4 w-4" /> };
};

const SoilHealthResults = ({ results }: SoilHealthResultsProps) => {
  const { soilParams } = results;
  const phStatus = getPhStatus(soilParams.ph);
  const nStatus = getNutrientStatus(soilParams.nitrogen);
  const pStatus = getNutrientStatus(soilParams.phosphorus);
  const kStatus = getNutrientStatus(soilParams.potassium);
  const moistureStatus = getMoistureStatus(soilParams.moisture);

  return (
    <div className="space-y-8">
      <Card className="bg-card">
        <CardHeader className="pb-2">
          <CardTitle>Soil Health Summary</CardTitle>
          <CardDescription>
            Overall soil quality: <Badge className="ml-2 bg-soil-dark">{results.soilQuality}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">pH Level ({soilParams.ph.toFixed(1)})</span>
                <Badge variant="outline" className={phStatus.color}>
                  <span className="flex items-center gap-1">
                    {phStatus.icon} {phStatus.status}
                  </span>
                </Badge>
              </div>
              <Progress value={((soilParams.ph - 3.5) / 7) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Acidic (3.5)</span>
                <span>Neutral (7.0)</span>
                <span>Alkaline (10.5)</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Moisture ({soilParams.moisture}%)</span>
                <Badge variant="outline" className={moistureStatus.color}>
                  <span className="flex items-center gap-1">
                    {moistureStatus.icon} {moistureStatus.status}
                  </span>
                </Badge>
              </div>
              <Progress value={soilParams.moisture} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Dry (0%)</span>
                <span>Optimal (50%)</span>
                <span>Wet (100%)</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Nutrient Levels</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="border rounded-md p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Nitrogen (N)</span>
                  <Badge variant="outline" className={nStatus.color}>
                    <span className="flex items-center gap-1">
                      {nStatus.icon} {nStatus.status}
                    </span>
                  </Badge>
                </div>
                <Progress value={soilParams.nitrogen / 2} className="h-1.5 mb-1" />
                <span className="text-xs text-muted-foreground">{soilParams.nitrogen} mg/kg</span>
              </div>

              <div className="border rounded-md p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Phosphorus (P)</span>
                  <Badge variant="outline" className={pStatus.color}>
                    <span className="flex items-center gap-1">
                      {pStatus.icon} {pStatus.status}
                    </span>
                  </Badge>
                </div>
                <Progress value={soilParams.phosphorus / 2} className="h-1.5 mb-1" />
                <span className="text-xs text-muted-foreground">{soilParams.phosphorus} mg/kg</span>
              </div>

              <div className="border rounded-md p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Potassium (K)</span>
                  <Badge variant="outline" className={kStatus.color}>
                    <span className="flex items-center gap-1">
                      {kStatus.icon} {kStatus.status}
                    </span>
                  </Badge>
                </div>
                <Progress value={soilParams.potassium / 2} className="h-1.5 mb-1" />
                <span className="text-xs text-muted-foreground">{soilParams.potassium} mg/kg</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <Check className="h-4 w-4 text-soil-dark" />
                  </div>
                  <p className="text-sm">{rec}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Suitable Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results.suitableCrops.map((crop, i) => (
                <Badge key={i} variant="secondary" className="text-sm py-1 px-2">
                  {crop}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SoilHealthResults;
