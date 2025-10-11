import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const HouseAffordabilityCalculator = () => {
  const [income, setIncome] = useState("");
  const [debt, setDebt] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const monthlyIncome = parseFloat(income);
    const monthlyDebt = parseFloat(debt);
    const down = parseFloat(downPayment);
    const interestRate = parseFloat(rate) / 100 / 12;
    
    const maxPayment = monthlyIncome * 0.28 - monthlyDebt;
    const loanTerm = 30 * 12;
    
    const maxLoan = maxPayment * ((Math.pow(1 + interestRate, loanTerm) - 1) / (interestRate * Math.pow(1 + interestRate, loanTerm)));
    const maxPrice = maxLoan + down;

    setResult({
      maxPrice: maxPrice.toFixed(2),
      maxLoan: maxLoan.toFixed(2),
      monthlyPayment: maxPayment.toFixed(2),
      downPayment: down.toFixed(2)
    });
  };

  return (
    <CalculatorLayout
      title="House Affordability Calculator"
      description="Calculate affordable house price"
      formula="Based on 28% rule"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Monthly Income ($)</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="5000"
            />
          </div>
          <div>
            <Label>Monthly Debt Payments ($)</Label>
            <Input
              type="number"
              value={debt}
              onChange={(e) => setDebt(e.target.value)}
              placeholder="500"
            />
          </div>
          <div>
            <Label>Down Payment ($)</Label>
            <Input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="50000"
            />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="4.5"
              step="0.1"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Affordability
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Maximum House Price</p>
                <p className="text-4xl font-bold text-primary">${result.maxPrice}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Maximum Loan</p>
                  <p className="text-xl font-bold">${result.maxLoan}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-xl font-bold">${result.monthlyPayment}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default HouseAffordabilityCalculator;