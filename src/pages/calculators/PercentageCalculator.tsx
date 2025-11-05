import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import { SEO } from "@/components/SEO";

const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const val = parseFloat(value);
    const pct = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(pct)) {
      setResult((val * pct) / 100);
    }
  };

  return (
    <>
      <SEO
        title="Percentage Calculator - Calculate Percentages Online Free"
        description="Free online percentage calculator. Calculate percentages, percentage increase/decrease, and find what percentage one number is of another instantly."
        keywords="percentage calculator, calculate percentage, percentage increase, percentage decrease, percent calculator"
      />
      <CalculatorLayout
        title="Percentage Calculator"
        description="Calculate percentages, percentage increase/decrease, and find what percentage one number is of another"
        formula="Result = (Value × Percentage) ÷ 100"
        explanation="This calculator helps you find a percentage of a number. For example, to find 20% of 100, multiply 100 by 20 and divide by 100, which equals 20."
      >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div>
            <Label>Percentage (%)</Label>
            <Input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter percentage"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
          {result !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {percentage}% of {value} = {result.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
    </>
  );
};

export default PercentageCalculator;
