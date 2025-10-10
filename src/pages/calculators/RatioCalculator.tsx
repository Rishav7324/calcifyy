import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const RatioCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<any>(null);

  const gcd = (x: number, y: number): number => {
    return y === 0 ? x : gcd(y, x % y);
  };

  const calculate = () => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    
    if (num1 > 0 && num2 > 0) {
      const divisor = gcd(num1, num2);
      const simplified1 = num1 / divisor;
      const simplified2 = num2 / divisor;
      const percentage = ((num1 / num2) * 100).toFixed(2);
      
      setResult({
        simplified: `${simplified1}:${simplified2}`,
        percentage,
        decimal: (num1 / num2).toFixed(4)
      });
    }
  };

  return (
    <CalculatorLayout
      title="Ratio Calculator"
      description="Simplify ratios and calculate proportions"
      formula="Ratio = a:b (simplified by GCD)"
      explanation="This calculator simplifies ratios to their lowest terms and converts them to percentages and decimals."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Number (a)</Label>
              <Input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="Enter first number"
              />
            </div>
            <div>
              <Label>Second Number (b)</Label>
              <Input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="Enter second number"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Ratio
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Simplified Ratio</p>
                <p className="text-4xl font-bold text-primary">{result.simplified}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">As Percentage</p>
                  <p className="text-xl font-bold">{result.percentage}%</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">As Decimal</p>
                  <p className="text-xl font-bold">{result.decimal}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default RatioCalculator;
