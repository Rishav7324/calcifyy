import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [years, setYears] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const initial = parseFloat(initialDeposit);
    const monthly = parseFloat(monthlyDeposit);
    const y = parseInt(years);
    const rate = parseFloat(interestRate) / 100 / 12;
    const n = y * 12;
    
    const initialFV = initial * Math.pow(1 + rate, n);
    const depositsFV = monthly * ((Math.pow(1 + rate, n) - 1) / rate);
    const totalValue = initialFV + depositsFV;
    const totalDeposits = initial + monthly * n;
    const interestEarned = totalValue - totalDeposits;
    
    setResult({ totalValue, totalDeposits, interestEarned });
  };

  return (
    <CalculatorLayout
      title="Savings Calculator"
      description="Calculate how your savings will grow over time with interest"
      formula="FV = PV(1+r)ⁿ + PMT × [((1+r)ⁿ - 1) / r]"
      explanation="This calculator shows how your savings grow through regular deposits and compound interest over time."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Initial Deposit ($)</Label>
            <Input
              type="number"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              placeholder="Starting amount"
            />
          </div>
          <div>
            <Label>Monthly Deposit ($)</Label>
            <Input
              type="number"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(e.target.value)}
              placeholder="Regular monthly deposit"
            />
          </div>
          <div>
            <Label>Time Period (Years)</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Number of years"
            />
          </div>
          <div>
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Interest rate"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Savings</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Savings</p>
                <p className="text-3xl font-bold text-primary">
                  ${result.totalValue.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Total Deposits</p>
                  <p className="text-lg font-bold">${result.totalDeposits.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Interest Earned</p>
                  <p className="text-lg font-bold text-green-500">${result.interestEarned.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default SavingsCalculator;
