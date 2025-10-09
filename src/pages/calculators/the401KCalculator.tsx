import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const The401KCalculator = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [annualContribution, setAnnualContribution] = useState("");
  const [employerMatch, setEmployerMatch] = useState("");
  const [returnRate, setReturnRate] = useState("7");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const balance = parseFloat(currentBalance);
    const annual = parseFloat(annualContribution);
    const match = parseFloat(employerMatch);
    const rate = parseFloat(returnRate) / 100;
    
    const years = retAge - age;
    const totalAnnualContribution = annual + match;
    
    let futureValue = balance;
    for (let i = 0; i < years; i++) {
      futureValue = futureValue * (1 + rate) + totalAnnualContribution;
    }
    
    const totalContributions = balance + (annual + match) * years;
    const earnings = futureValue - totalContributions;
    
    setResult({ futureValue, totalContributions, earnings, employerMatchTotal: match * years });
  };

  return (
    <CalculatorLayout
      title="401(k) Calculator"
      description="Calculate your 401(k) retirement savings with employer matching"
      formula="FV = PV(1+r)ⁿ + (Annual Contribution + Match) × compound growth"
      explanation="This calculator estimates your 401(k) balance at retirement considering your contributions, employer match, and investment returns."
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
                placeholder="Target age"
              />
            </div>
          </div>
          <div>
            <Label>Current 401(k) Balance ($)</Label>
            <Input
              type="number"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(e.target.value)}
              placeholder="Current balance"
            />
          </div>
          <div>
            <Label>Annual Contribution ($)</Label>
            <Input
              type="number"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(e.target.value)}
              placeholder="Your yearly contribution"
            />
          </div>
          <div>
            <Label>Annual Employer Match ($)</Label>
            <Input
              type="number"
              value={employerMatch}
              onChange={(e) => setEmployerMatch(e.target.value)}
              placeholder="Employer contribution"
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
          <Button onClick={calculate} className="w-full">Calculate 401(k)</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">401(k) Balance at Retirement</p>
                <p className="text-3xl font-bold text-primary">
                  ${result.futureValue.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Total Contributions</p>
                  <p className="text-lg font-bold">${result.totalContributions.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Investment Earnings</p>
                  <p className="text-lg font-bold text-green-500">${result.earnings.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded col-span-2">
                  <p className="text-sm text-muted-foreground">Employer Match Total</p>
                  <p className="text-lg font-bold text-blue-500">${result.employerMatchTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default The401KCalculator;
