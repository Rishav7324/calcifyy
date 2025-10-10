import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const StandardDeviationCalculator = () => {
  const [values, setValues] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const nums = values.split(",").map(v => parseFloat(v.trim())).filter(n => !isNaN(n));
    
    if (nums.length > 0) {
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const variance = nums.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / nums.length;
      const stdDev = Math.sqrt(variance);
      
      setResult({
        mean: mean.toFixed(4),
        variance: variance.toFixed(4),
        stdDev: stdDev.toFixed(4),
        count: nums.length
      });
    }
  };

  return (
    <CalculatorLayout
      title="Standard Deviation Calculator"
      description="Calculate mean, variance, and standard deviation"
      formula="σ = √[Σ(x - μ)² / N]"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Data Values (comma-separated)</Label>
            <Input
              value={values}
              onChange={(e) => setValues(e.target.value)}
              placeholder="1, 2, 3, 4, 5"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Standard Deviation</p>
                <p className="text-4xl font-bold text-primary">{result.stdDev}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Mean</p>
                  <p className="text-xl font-bold">{result.mean}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Variance</p>
                  <p className="text-xl font-bold">{result.variance}</p>
                </div>
              </div>
              <div className="p-3 bg-secondary/10 rounded text-center">
                <p className="text-sm text-muted-foreground">Sample Size</p>
                <p className="text-xl font-bold">{result.count}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default StandardDeviationCalculator;
