import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [returnRate, setReturnRate] = useState("7");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(returnRate) / 100 / 12;
    
    const yearsToRetirement = retAge - age;
    const months = yearsToRetirement * 12;
    
    const futureValue = savings * Math.pow(1 + rate, months) +
      monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    
    setResult({
      totalSavings: futureValue,
      totalContributions: savings + monthly * months,
      earnings: futureValue - savings - monthly * months,
      yearsToRetirement
    });
  };

  return (
    <CalculatorLayout
      title="Retirement Calculator"
      description="Plan your retirement savings and estimate future value"
      formula="FV = PV(1+r)ⁿ + PMT[((1+r)ⁿ-1)/r]"
      explanation="This calculator helps you estimate how much you'll have saved for retirement based on your current savings, monthly contributions, and expected rate of return."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Age</Label>
              <Input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                placeholder="Your age"
              />
            </div>
            <div>
              <Label>Retirement Age</Label>
              <Input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                placeholder="Retirement age"
              />
            </div>
          </div>
          <div>
            <Label>Current Savings ($)</Label>
            <Input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="Current retirement savings"
            />
          </div>
          <div>
            <Label>Monthly Contribution ($)</Label>
            <Input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="Monthly savings"
            />
          </div>
          <div>
            <Label>Expected Annual Return (%)</Label>
            <Input
              type="number"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              placeholder="7"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Retirement</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Retirement Savings</p>
                <p className="text-3xl font-bold text-primary">
                  ${result.totalSavings.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Total Contributions</p>
                  <p className="text-lg font-bold">${result.totalContributions.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Earnings</p>
                  <p className="text-lg font-bold">${result.earnings.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default RetirementCalculator;
