import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const SlopeCalculator = () => {
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);
    
    if (!isNaN(x1Val) && !isNaN(y1Val) && !isNaN(x2Val) && !isNaN(y2Val)) {
      const deltaX = x2Val - x1Val;
      const deltaY = y2Val - y1Val;
      
      if (deltaX === 0) {
        setResult({ slope: "undefined", angle: 90, distance: Math.abs(deltaY) });
      } else {
        const slope = deltaY / deltaX;
        const angle = Math.atan(slope) * (180 / Math.PI);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        setResult({ slope: slope.toFixed(4), angle: angle.toFixed(2), distance: distance.toFixed(2) });
      }
    }
  };

  return (
    <CalculatorLayout
      title="Slope Calculator"
      description="Calculate the slope, angle, and distance between two points"
      formula="Slope = (y₂ - y₁) / (x₂ - x₁)"
      explanation="The slope of a line represents its steepness and direction. This calculator also finds the angle of inclination and distance between two points."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Point 1 - X₁</Label>
              <Input
                type="number"
                value={x1}
                onChange={(e) => setX1(e.target.value)}
                placeholder="Enter x₁"
              />
            </div>
            <div>
              <Label>Point 1 - Y₁</Label>
              <Input
                type="number"
                value={y1}
                onChange={(e) => setY1(e.target.value)}
                placeholder="Enter y₁"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Point 2 - X₂</Label>
              <Input
                type="number"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                placeholder="Enter x₂"
              />
            </div>
            <div>
              <Label>Point 2 - Y₂</Label>
              <Input
                type="number"
                value={y2}
                onChange={(e) => setY2(e.target.value)}
                placeholder="Enter y₂"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Slope
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-3xl font-bold text-primary">Slope: {result.slope}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Angle</p>
                  <p className="text-xl font-bold">{result.angle}°</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-xl font-bold">{result.distance}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default SlopeCalculator;
