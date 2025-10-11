import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const PercentErrorCalculator = () => {
  const [actual, setActual] = useState("");
  const [measured, setMeasured] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const actualValue = parseFloat(actual);
    const measuredValue = parseFloat(measured);
    
    const error = Math.abs((measuredValue - actualValue) / actualValue) * 100;
    const difference = measuredValue - actualValue;
    const relativeDiff = (difference / actualValue) * 100;

    setResult({
      percentError: error.toFixed(2),
      absoluteError: Math.abs(difference).toFixed(4),
      relativeDiff: relativeDiff.toFixed(2)
    });
  };

  return (
    <CalculatorLayout
      title="Percent Error Calculator"
      description="Calculate experimental error percentage"
      formula="% Error = |Measured - Actual| / Actual × 100"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Actual Value</Label>
            <Input
              type="number"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              placeholder="10"
              step="any"
            />
          </div>
          <div>
            <Label>Measured Value</Label>
            <Input
              type="number"
              value={measured}
              onChange={(e) => setMeasured(e.target.value)}
              placeholder="9.5"
              step="any"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Error
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Percent Error</p>
                <p className="text-4xl font-bold text-primary">{result.percentError}%</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Absolute Error</p>
                  <p className="text-xl font-bold">{result.absoluteError}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Relative Diff</p>
                  <p className="text-xl font-bold">{result.relativeDiff}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default PercentErrorCalculator;