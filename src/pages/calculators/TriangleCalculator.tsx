import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const TriangleCalculator = () => {
  const [base, setBase] = useState("");
  const [height, setHeight] = useState("");
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);
    const a = parseFloat(sideA);
    const b2 = parseFloat(sideB);
    const c = parseFloat(sideC);
    
    const area = b > 0 && h > 0 ? (b * h) / 2 : 0;
    const perimeter = a > 0 && b2 > 0 && c > 0 ? a + b2 + c : 0;
    
    setResult({
      area: area > 0 ? area.toFixed(2) : "N/A",
      perimeter: perimeter > 0 ? perimeter.toFixed(2) : "N/A"
    });
  };

  return (
    <CalculatorLayout
      title="Triangle Calculator"
      description="Calculate area and perimeter of triangles"
      formula="Area = ½bh | Perimeter = a + b + c"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Base</Label>
              <Input
                type="number"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                placeholder="Base length"
              />
            </div>
            <div>
              <Label>Height</Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Side A</Label>
              <Input
                type="number"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                placeholder="Side A"
              />
            </div>
            <div>
              <Label>Side B</Label>
              <Input
                type="number"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                placeholder="Side B"
              />
            </div>
            <div>
              <Label>Side C</Label>
              <Input
                type="number"
                value={sideC}
                onChange={(e) => setSideC(e.target.value)}
                placeholder="Side C"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
          {result && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="text-2xl font-bold text-primary">{result.area}</p>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Perimeter</p>
                <p className="text-2xl font-bold">{result.perimeter}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default TriangleCalculator;
