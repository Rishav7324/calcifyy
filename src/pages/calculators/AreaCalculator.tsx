import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const AreaCalculator = () => {
  const [shape, setShape] = useState("rectangle");
  const [dim1, setDim1] = useState("");
  const [dim2, setDim2] = useState("");
  const [area, setArea] = useState<number | null>(null);

  const calculate = () => {
    const d1 = parseFloat(dim1);
    const d2 = parseFloat(dim2);
    
    let result = 0;
    switch (shape) {
      case "rectangle":
        result = d1 * d2;
        break;
      case "circle":
        result = Math.PI * d1 * d1;
        break;
      case "triangle":
        result = (d1 * d2) / 2;
        break;
      case "square":
        result = d1 * d1;
        break;
    }
    setArea(result);
  };

  const getLabels = () => {
    switch (shape) {
      case "rectangle":
        return { label1: "Length", label2: "Width" };
      case "circle":
        return { label1: "Radius", label2: null };
      case "triangle":
        return { label1: "Base", label2: "Height" };
      case "square":
        return { label1: "Side", label2: null };
      default:
        return { label1: "Dimension 1", label2: "Dimension 2" };
    }
  };

  const labels = getLabels();

  return (
    <CalculatorLayout
      title="Area Calculator"
      description="Calculate area of different geometric shapes"
      explanation="Area is the measure of the two-dimensional space enclosed by a shape. Different shapes have different formulas for calculating area."
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
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="triangle">Triangle</SelectItem>
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
          <Button onClick={calculate} className="w-full">
            Calculate Area
          </Button>
          {area !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-3xl font-bold text-primary">
                Area: {area.toFixed(2)} sq units
              </p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default AreaCalculator;
