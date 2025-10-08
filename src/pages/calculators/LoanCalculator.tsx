import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // Monthly interest rate
    const n = parseFloat(tenure) * 12; // Total months

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;

      setResult({
        emi: parseFloat(emi.toFixed(2)),
        totalPayment: parseFloat(totalPayment.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2)),
      });
    }
  };

  const explanation = (
    <div className="space-y-4">
      <p>
        <strong>EMI (Equated Monthly Installment)</strong> is the fixed amount you pay every month 
        to repay your loan. It includes both principal and interest components.
      </p>
      <div className="space-y-2">
        <p className="font-semibold">Components:</p>
        <ul className="space-y-1 ml-4">
          <li>• <strong>Principal:</strong> The original loan amount borrowed</li>
          <li>• <strong>Interest Rate:</strong> Annual percentage rate charged by the lender</li>
          <li>• <strong>Tenure:</strong> Loan repayment period in years</li>
        </ul>
      </div>
      <p className="text-sm">
        The EMI remains constant throughout the loan tenure, but the ratio of principal to interest changes. 
        Initially, a larger portion goes toward interest, gradually shifting toward principal repayment.
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      title="Loan EMI Calculator"
      description="Calculate your monthly EMI, total payment, and interest for any loan"
      formula="EMI = [P × R × (1+R)^N] / [(1+R)^N-1]"
      explanation={explanation}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Loan Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="principal" className="text-lg">Loan Amount ($)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="e.g., 100000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <div>
              <Label htmlFor="rate" className="text-lg">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                placeholder="e.g., 8.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <div>
              <Label htmlFor="tenure" className="text-lg">Loan Tenure (Years)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="e.g., 15"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <Button 
              onClick={calculateEMI}
              className="w-full h-12 text-lg gradient-primary"
              disabled={!principal || !rate || !tenure}
            >
              Calculate EMI
            </Button>
          </div>
        </Card>

        {/* Result Section */}
        <Card className="glass-card p-8 animate-scale-in" style={{ animationDelay: "100ms" }}>
          <h2 className="text-2xl font-bold mb-6">Your Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Monthly EMI</div>
                <div className="text-5xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
                  ${result.emi.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-1">Total Payment</div>
                  <div className="text-2xl font-bold text-primary">
                    ${result.totalPayment.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-lg glass-card border border-secondary/20">
                  <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-secondary">
                    ${result.totalInterest.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-lg glass-card border border-accent/20">
                  <div className="text-sm text-muted-foreground mb-1">Principal Amount</div>
                  <div className="text-2xl font-bold text-accent">
                    ${parseFloat(principal).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-primary/20">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interest vs Principal</span>
                  <span className="text-primary font-semibold">
                    {((result.totalInterest / parseFloat(principal)) * 100).toFixed(1)}% more
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">💰</div>
                <p>Enter loan details to calculate EMI</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default LoanCalculator;
