import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const VolumeCalculator = () => {
  const [shape, setShape] = useState("cube");
  const [dim1, setDim1] = useState("");
  const [dim2, setDim2] = useState("");
  const [dim3, setDim3] = useState("");
  const [volume, setVolume] = useState<number | null>(null);

  const calculate = () => {
    const d1 = parseFloat(dim1);
    const d2 = parseFloat(dim2);
    const d3 = parseFloat(dim3);
    
    let result = 0;
    switch (shape) {
      case "cube":
        result = d1 * d1 * d1;
        break;
      case "cuboid":
        result = d1 * d2 * d3;
        break;
      case "sphere":
        result = (4/3) * Math.PI * d1 * d1 * d1;
        break;
      case "cylinder":
        result = Math.PI * d1 * d1 * d2;
        break;
      case "cone":
        result = (1/3) * Math.PI * d1 * d1 * d2;
        break;
    }
    setVolume(result);
  };

  const getLabels = () => {
    switch (shape) {
      case "cube":
        return { label1: "Side", label2: null, label3: null };
      case "cuboid":
        return { label1: "Length", label2: "Width", label3: "Height" };
      case "sphere":
        return { label1: "Radius", label2: null, label3: null };
      case "cylinder":
        return { label1: "Radius", label2: "Height", label3: null };
      case "cone":
        return { label1: "Radius", label2: "Height", label3: null };
      default:
        return { label1: "Dimension 1", label2: "Dimension 2", label3: "Dimension 3" };
    }
  };

  const labels = getLabels();

  return (
    <CalculatorLayout
      title="Volume Calculator"
      description="Calculate volume of 3D geometric shapes"
      explanation="Volume measures the amount of three-dimensional space occupied by an object. Each 3D shape has a specific formula for volume calculation."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Shape</Label>
            <Select value={shape} onValueChange={setShape}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cube">Cube</SelectItem>
                <SelectItem value="cuboid">Cuboid</SelectItem>
                <SelectItem value="sphere">Sphere</SelectItem>
                <SelectItem value="cylinder">Cylinder</SelectItem>
                <SelectItem value="cone">Cone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{labels.label1}</Label>
            <Input
              type="number"
              value={dim1}
              onChange={(e) => setDim1(e.target.value)}
              placeholder={`Enter ${labels.label1?.toLowerCase()}`}
            />
          </div>
          {labels.label2 && (
            <div>
              <Label>{labels.label2}</Label>
              <Input
                type="number"
                value={dim2}
                onChange={(e) => setDim2(e.target.value)}
                placeholder={`Enter ${labels.label2.toLowerCase()}`}
              />
            </div>
          )}
          {labels.label3 && (
            <div>
              <Label>{labels.label3}</Label>
              <Input
                type="number"
                value={dim3}
                onChange={(e) => setDim3(e.target.value)}
                placeholder={`Enter ${labels.label3.toLowerCase()}`}
              />
            </div>
          )}
          <Button onClick={calculate} className="w-full">
            Calculate Volume
          </Button>
          {volume !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-3xl font-bold text-primary">
                Volume: {volume.toFixed(2)} cubic units
              </p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default VolumeCalculator;
