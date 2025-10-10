import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const CircleCalculator = () => {
  const [radius, setRadius] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    
    if (r > 0) {
      const area = Math.PI * r * r;
      const circumference = 2 * Math.PI * r;
      const diameter = 2 * r;
      
      setResult({
        area: area.toFixed(2),
        circumference: circumference.toFixed(2),
        diameter: diameter.toFixed(2)
      });
    }
  };

  return (
    <CalculatorLayout
      title="Circle Calculator"
      description="Calculate area, circumference, and diameter"
      formula="Area = πr² | Circumference = 2πr"
      explanation="This calculator computes all circle measurements from its radius."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Radius</Label>
            <Input
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              placeholder="Enter radius"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="text-3xl font-bold text-primary">{result.area} sq units</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Circumference</p>
                  <p className="text-xl font-bold">{result.circumference}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Diameter</p>
                  <p className="text-xl font-bold">{result.diameter}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default CircleCalculator;
