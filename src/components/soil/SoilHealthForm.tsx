
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

interface SoilParams {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
}

const initialSoilParams: SoilParams = {
  ph: 7.0,
  nitrogen: 50,
  phosphorus: 50,
  potassium: 50,
  moisture: 50,
};

const SoilHealthForm = ({ onAnalysis }: { onAnalysis?: (result: any) => void }) => {
  const [soilParams, setSoilParams] = useState<SoilParams>(initialSoilParams);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSliderChange = (name: keyof SoilParams, value: number[]) => {
    setSoilParams((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };

  const handleInputChange = (name: keyof SoilParams, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setSoilParams((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    
    // Mock API call - in a real app this would be a backend call
    setTimeout(() => {
      // Mock soil health analysis results
      const analysisResult = {
        soilQuality: "Good",
        nutrientBalance: "Moderate",
        recommendations: [
          "Consider adding organic compost to improve soil structure.",
          "Nitrogen levels are adequate for most crops.",
          "Increase phosphorus for better flowering and fruiting.",
          "Maintain current moisture levels for optimal growth."
        ],
        suitableCrops: ["Tomatoes", "Corn", "Lettuce", "Beans"],
        soilParams: { ...soilParams }
      };
      
      setLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Soil health analysis completed successfully.",
      });
      
      if (onAnalysis) {
        onAnalysis(analysisResult);
      }
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <Label htmlFor="ph">Soil pH ({soilParams.ph.toFixed(1)})</Label>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-muted-foreground">Acidic</span>
          <Slider
            id="ph"
            min={3.5}
            max={10.5}
            step={0.1}
            value={[soilParams.ph]}
            onValueChange={(value) => handleSliderChange("ph", value)}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">Alkaline</span>
        </div>
        <Input
          type="number"
          value={soilParams.ph}
          onChange={(e) => handleInputChange("ph", e.target.value)}
          min={3.5}
          max={10.5}
          step={0.1}
          className="mt-2 w-28"
        />
      </div>

      <div>
        <Label htmlFor="nitrogen">Nitrogen (N) - {soilParams.nitrogen} mg/kg</Label>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-muted-foreground">Low</span>
          <Slider
            id="nitrogen"
            min={0}
            max={200}
            step={1}
            value={[soilParams.nitrogen]}
            onValueChange={(value) => handleSliderChange("nitrogen", value)}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">High</span>
        </div>
        <Input
          type="number"
          value={soilParams.nitrogen}
          onChange={(e) => handleInputChange("nitrogen", e.target.value)}
          min={0}
          max={200}
          className="mt-2 w-28"
        />
      </div>

      <div>
        <Label htmlFor="phosphorus">Phosphorus (P) - {soilParams.phosphorus} mg/kg</Label>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-muted-foreground">Low</span>
          <Slider
            id="phosphorus"
            min={0}
            max={200}
            step={1}
            value={[soilParams.phosphorus]}
            onValueChange={(value) => handleSliderChange("phosphorus", value)}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">High</span>
        </div>
        <Input
          type="number"
          value={soilParams.phosphorus}
          onChange={(e) => handleInputChange("phosphorus", e.target.value)}
          min={0}
          max={200}
          className="mt-2 w-28"
        />
      </div>

      <div>
        <Label htmlFor="potassium">Potassium (K) - {soilParams.potassium} mg/kg</Label>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-muted-foreground">Low</span>
          <Slider
            id="potassium"
            min={0}
            max={200}
            step={1}
            value={[soilParams.potassium]}
            onValueChange={(value) => handleSliderChange("potassium", value)}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">High</span>
        </div>
        <Input
          type="number"
          value={soilParams.potassium}
          onChange={(e) => handleInputChange("potassium", e.target.value)}
          min={0}
          max={200}
          className="mt-2 w-28"
        />
      </div>

      <div>
        <Label htmlFor="moisture">Soil Moisture - {soilParams.moisture}%</Label>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-muted-foreground">Dry</span>
          <Slider
            id="moisture"
            min={0}
            max={100}
            step={1}
            value={[soilParams.moisture]}
            onValueChange={(value) => handleSliderChange("moisture", value)}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">Wet</span>
        </div>
        <Input
          type="number"
          value={soilParams.moisture}
          onChange={(e) => handleInputChange("moisture", e.target.value)}
          min={0}
          max={100}
          className="mt-2 w-28"
        />
      </div>

      <Button 
        onClick={handleAnalyze} 
        className="w-full bg-soil-dark hover:bg-soil-darker text-white"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Soil Health"}
      </Button>
    </div>
  );
};

export default SoilHealthForm;
