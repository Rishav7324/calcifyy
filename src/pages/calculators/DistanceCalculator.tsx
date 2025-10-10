import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const DistanceCalculator = () => {
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [distance, setDistance] = useState<number | null>(null);

  const calculate = () => {
    const px1 = parseFloat(x1);
    const py1 = parseFloat(y1);
    const px2 = parseFloat(x2);
    const py2 = parseFloat(y2);
    
    if (!isNaN(px1) && !isNaN(py1) && !isNaN(px2) && !isNaN(py2)) {
      const d = Math.sqrt(Math.pow(px2 - px1, 2) + Math.pow(py2 - py1, 2));
      setDistance(d);
    }
  };

  return (
    <CalculatorLayout
      title="Distance Calculator"
      description="Calculate distance between two points"
      formula="d = √[(x₂-x₁)² + (y₂-y₁)²]"
      explanation="This calculator finds the distance between two points in a 2D coordinate system using the distance formula."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Point 1 (x₁, y₁)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                value={x1}
                onChange={(e) => setX1(e.target.value)}
                placeholder="x₁"
              />
              <Input
                type="number"
                value={y1}
                onChange={(e) => setY1(e.target.value)}
                placeholder="y₁"
              />
            </div>
          </div>
          <div>
            <Label>Point 2 (x₂, y₂)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                placeholder="x₂"
              />
              <Input
                type="number"
                value={y2}
                onChange={(e) => setY2(e.target.value)}
                placeholder="y₂"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Distance
          </Button>
          {distance !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="text-4xl font-bold text-primary">{distance.toFixed(4)}</p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default DistanceCalculator;
