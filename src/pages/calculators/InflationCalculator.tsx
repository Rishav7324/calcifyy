import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const InflationCalculator = () => {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [inflationRate, setInflationRate] = useState("3");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const y = parseInt(years);
    const rate = parseFloat(inflationRate) / 100;
    
    const futureValue = principal * Math.pow(1 + rate, y);
    const purchasingPower = principal / Math.pow(1 + rate, y);
    const totalInflation = futureValue - principal;
    
    setResult({ futureValue, purchasingPower, totalInflation });
  };

  return (
    <CalculatorLayout
      title="Inflation Calculator"
      description="Calculate the impact of inflation on purchasing power"
      formula="Future Value = Present Value × (1 + inflation rate)ⁿ"
      explanation="This calculator shows how inflation affects the value of money over time and what today's money will be worth in the future."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Current Amount ($)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div>
            <Label>Number of Years</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Time period"
            />
          </div>
          <div>
            <Label>Annual Inflation Rate (%)</Label>
            <Input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              placeholder="3"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Inflation Impact</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Future Value Needed</p>
                <p className="text-3xl font-bold text-primary">
                  ${result.futureValue.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Purchasing Power</p>
                  <p className="text-lg font-bold">${result.purchasingPower.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Value Loss</p>
                  <p className="text-lg font-bold text-red-500">${result.totalInflation.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default InflationCalculator;
