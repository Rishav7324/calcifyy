import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const APRCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [fees, setFees] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(loanAmount);
    const totalFees = parseFloat(fees);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(term);
    
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalCost = totalPayment + totalFees;
    const totalInterest = totalPayment - principal;
    const apr = ((totalCost - principal) / principal / (months / 12)) * 100;
    
    setResult({ apr, monthlyPayment, totalInterest, totalCost });
  };

  return (
    <CalculatorLayout
      title="APR Calculator"
      description="Calculate Annual Percentage Rate including fees and interest"
      formula="APR = ((Total Cost - Principal) / Principal / Years) × 100"
      explanation="APR (Annual Percentage Rate) represents the true cost of borrowing, including interest and fees, expressed as a yearly rate."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Loan Amount ($)</Label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Principal amount"
            />
          </div>
          <div>
            <Label>Total Fees ($)</Label>
            <Input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              placeholder="Processing fees, closing costs, etc."
            />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Annual interest rate"
            />
          </div>
          <div>
            <Label>Loan Term (Months)</Label>
            <Input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Loan duration in months"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate APR</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Annual Percentage Rate</p>
                <p className="text-3xl font-bold text-primary">
                  {result.apr.toFixed(2)}%
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-lg font-bold">${result.monthlyPayment.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-lg font-bold">${result.totalInterest.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded col-span-2">
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-lg font-bold">${result.totalCost.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default APRCalculator;
