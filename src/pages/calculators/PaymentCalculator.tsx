import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const PaymentCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    
    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: p.toFixed(2)
    });
  };

  return (
    <CalculatorLayout
      title="Payment Calculator"
      description="Calculate monthly payment schedules"
      formula="M = P × [r(1+r)^n] / [(1+r)^n-1]"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Principal Amount ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="10000"
            />
          </div>
          <div>
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="5"
              step="0.1"
            />
          </div>
          <div>
            <Label>Loan Term (years)</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="5"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Payment
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="text-4xl font-bold text-primary">${result.monthlyPayment}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Total Payment</p>
                  <p className="text-xl font-bold">${result.totalPayment}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-xl font-bold">${result.totalInterest}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The payment calculator determines your monthly payment amount for loans using the standard amortization formula. Whether you're considering a personal loan, auto loan, or any installment loan, this calculator helps you understand your monthly financial commitment before borrowing. It calculates not just your monthly payment, but also total interest paid over the loan's lifetime, helping you make informed borrowing decisions. Understanding these numbers is crucial for budgeting, comparing loan offers, and avoiding over-extension of your finances."
        useCases={[
          { title: "Loan Comparison", description: "Compare different loan offers by seeing how interest rates and terms affect monthly payments. Find the most affordable option for your budget." },
          { title: "Budget Planning", description: "Determine if a loan payment fits your monthly budget before applying. Ensure you can comfortably afford payments along with other expenses." },
          { title: "Auto Financing", description: "Calculate car loan payments for different loan amounts, down payments, and financing terms to find affordable vehicle options." },
          { title: "Personal Loan Planning", description: "Estimate payments for debt consolidation, home improvements, or other personal loans to plan your finances effectively." }
        ]}
        tips={[
          { title: "Lower Rate vs Shorter Term", description: "A lower interest rate reduces total interest paid. A shorter loan term also saves on interest but increases monthly payments. Balance these factors based on your budget." },
          { title: "Total Interest Awareness", description: "Look beyond monthly payments to see total interest over the loan's life. A small rate difference can mean thousands in savings on longer-term loans." },
          { title: "The 28/36 Rule", description: "Financial advisors recommend that loan payments shouldn't exceed 28% of gross monthly income for housing, or 36% for all debt combined. Use this as a guideline." },
          { title: "Extra Payments Impact", description: "Making additional payments toward principal significantly reduces total interest paid and shortens the loan term. Even small extra payments make a difference." }
        ]}
        faqs={[
          { question: "What's the difference between fixed and variable rate payments?", answer: "This calculator assumes a fixed rate, meaning your payment stays the same throughout the loan. Variable rates fluctuate with market conditions, causing payments to change over time. Fixed rates provide payment predictability." },
          { question: "Why does my actual loan payment differ from the calculator?", answer: "The calculator shows principal and interest only. Actual payments may include property taxes, insurance, PMI (mortgages), or fees. Lenders provide full payment breakdowns including these additional costs." },
          { question: "How does loan term length affect my payment?", answer: "Longer terms mean lower monthly payments but more total interest paid. Shorter terms have higher monthly payments but save significantly on interest. Choose based on your budget and long-term financial goals." },
          { question: "Can I pay off my loan early?", answer: "Most loans allow early payoff, but some have prepayment penalties. Check your loan agreement. Paying extra toward principal or paying off early saves interest, especially on longer-term loans." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default PaymentCalculator;