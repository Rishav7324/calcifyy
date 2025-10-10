import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const PythagoreanCalculator = () => {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [hypotenuse, setHypotenuse] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    
    if (a > 0 && b > 0) {
      const c = Math.sqrt(a * a + b * b);
      setHypotenuse(c);
    }
  };

  return (
    <CalculatorLayout
      title="Pythagorean Theorem Calculator"
      description="Calculate the hypotenuse of a right triangle"
      formula="c² = a² + b²"
      explanation="The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Side a</Label>
              <Input
                type="number"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                placeholder="Enter side a"
              />
            </div>
            <div>
              <Label>Side b</Label>
              <Input
                type="number"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                placeholder="Enter side b"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Hypotenuse
          </Button>
          {hypotenuse !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Hypotenuse (c)</p>
              <p className="text-4xl font-bold text-primary">{hypotenuse.toFixed(2)}</p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default PythagoreanCalculator;
