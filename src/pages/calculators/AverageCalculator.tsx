import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const numArray = numbers.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numArray.length === 0) return;

    const sum = numArray.reduce((a, b) => a + b, 0);
    const mean = sum / numArray.length;
    
    const sorted = [...numArray].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    const frequency: { [key: number]: number } = {};
    numArray.forEach(n => frequency[n] = (frequency[n] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency).filter(k => frequency[Number(k)] === maxFreq).map(Number);

    const range = Math.max(...numArray) - Math.min(...numArray);

    setResult({ mean, median, mode, range, count: numArray.length, sum });
  };

  return (
    <CalculatorLayout
      title="Average Calculator"
      description="Calculate mean, median, mode, and range of numbers"
      formula="Mean = Sum of all numbers ÷ Count of numbers"
      explanation="This calculator computes various statistical measures including mean (average), median (middle value), mode (most frequent), and range (difference between max and min)."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Enter Numbers (comma-separated)</Label>
            <Input
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              placeholder="e.g., 1, 2, 3, 4, 5"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Statistics
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">Mean: {result.mean.toFixed(2)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Median</p>
                  <p className="text-xl font-bold">{result.median.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Mode</p>
                  <p className="text-xl font-bold">{result.mode.join(", ")}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Range</p>
                  <p className="text-xl font-bold">{result.range.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Count</p>
                  <p className="text-xl font-bold">{result.count}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded col-span-2">
                  <p className="text-sm text-muted-foreground">Sum</p>
                  <p className="text-xl font-bold">{result.sum.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default AverageCalculator;
