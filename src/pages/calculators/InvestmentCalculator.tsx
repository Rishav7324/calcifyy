import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const InvestmentCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [years, setYears] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const monthly = parseFloat(monthlyInvestment);
    const y = parseInt(years);
    const rate = parseFloat(returnRate) / 100 / 12;
    const n = y * 12;
    
    const principalFV = p * Math.pow(1 + rate, n);
    const investmentFV = monthly * ((Math.pow(1 + rate, n) - 1) / rate);
    const totalValue = principalFV + investmentFV;
    const totalInvested = p + monthly * n;
    const totalReturns = totalValue - totalInvested;
    
    setResult({ totalValue, totalInvested, totalReturns });
  };

  return (
    <CalculatorLayout
      title="Investment Calculator"
      description="Calculate returns on your investment with regular contributions"
      formula="FV = PV(1+r)ⁿ + PMT × [((1+r)ⁿ - 1) / r]"
      explanation="This calculator estimates the future value of your investment based on initial amount, regular contributions, time period, and expected rate of return."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Initial Investment ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Starting amount"
            />
          </div>
          <div>
            <Label>Monthly Investment ($)</Label>
            <Input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="Regular monthly contribution"
            />
          </div>
          <div>
            <Label>Investment Period (Years)</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Number of years"
            />
          </div>
          <div>
            <Label>Expected Annual Return (%)</Label>
            <Input
              type="number"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              placeholder="Expected return rate"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Investment</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Future Value</p>
                <p className="text-3xl font-bold text-primary">
                  ${result.totalValue.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-lg font-bold">${result.totalInvested.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Total Returns</p>
                  <p className="text-lg font-bold text-green-500">${result.totalReturns.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default InvestmentCalculator;
