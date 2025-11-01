import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment || "0");
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    if (principal > 0 && monthlyRate > 0 && months > 0) {
      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;

      setResult({
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        principal: principal.toFixed(2)
      });
    }
  };

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payments and total cost"
      formula="M = P[r(1+r)^n]/[(1+r)^n-1]"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Loan Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Home Price ($)</Label>
              <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Down Payment ($)</Label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Loan Term (Years)</Label>
              <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary" disabled={!loanAmount || !interestRate || !loanTerm}>
              Calculate
            </Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Monthly Payment</div>
                <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">${result.monthlyPayment}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground">Total Payment</div>
                  <div className="text-2xl font-bold text-primary">${result.totalPayment}</div>
                </div>
                <div className="p-4 rounded-lg glass-card border border-secondary/20">
                  <div className="text-sm text-muted-foreground">Total Interest</div>
                  <div className="text-2xl font-bold text-secondary">${result.totalInterest}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">🏠</div><p>Enter details to calculate</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="A mortgage calculator is an indispensable tool for anyone planning to buy a home. It helps you estimate monthly mortgage payments based on the home price, down payment, interest rate, and loan term. Understanding your potential mortgage payment is crucial for determining how much house you can afford and planning your long-term financial commitments. This calculator takes into account the principal and interest portions of your payment, allowing you to see the true cost of homeownership over time. Use it to compare different scenarios, plan for various down payment amounts, and understand how interest rates impact your monthly budget."
        useCases={[
          {
            title: "First-Time Homebuyers",
            description: "Determine how much house you can afford by calculating monthly payments for different home prices and down payment scenarios before starting your home search."
          },
          {
            title: "Refinancing Analysis",
            description: "Compare your current mortgage payment with potential refinanced rates to determine if refinancing could save you money over the remaining loan term."
          },
          {
            title: "Investment Property Planning",
            description: "Calculate mortgage payments for rental properties to ensure rental income will cover the mortgage and generate positive cash flow."
          },
          {
            title: "Down Payment Strategy",
            description: "Experiment with different down payment amounts to see how they affect monthly payments and help decide whether to make a larger down payment or invest funds elsewhere."
          }
        ]}
        tips={[
          {
            title: "Aim for 20% Down Payment",
            description: "Putting down 20% or more typically eliminates the need for private mortgage insurance (PMI), saving you money each month and reducing overall loan costs."
          },
          {
            title: "Consider the 28/36 Rule",
            description: "Lenders generally prefer that your mortgage payment doesn't exceed 28% of your gross monthly income, and total debt payments stay below 36%. Use these guidelines for financial stability."
          },
          {
            title: "Factor in All Housing Costs",
            description: "Remember that homeownership costs extend beyond the mortgage payment. Budget for property taxes, homeowners insurance, HOA fees, maintenance, and utilities."
          },
          {
            title: "Lock in Rate When Favorable",
            description: "If you find a competitive interest rate, consider locking it in with your lender to protect against rate increases while your loan is being processed."
          },
          {
            title: "Review Amortization Schedule",
            description: "Understanding how your payments are split between principal and interest over time can help you make informed decisions about prepayments and refinancing."
          }
        ]}
        faqs={[
          {
            question: "What is included in a monthly mortgage payment?",
            answer: "A typical mortgage payment includes four components, often called PITI: Principal (the loan amount being repaid), Interest (cost of borrowing), Taxes (property taxes), and Insurance (homeowners insurance and possibly PMI). This calculator focuses on principal and interest, but remember to budget for taxes and insurance as well."
          },
          {
            question: "How does my credit score affect my mortgage rate?",
            answer: "Your credit score significantly impacts your mortgage interest rate. Borrowers with higher credit scores (typically 740+) qualify for the best rates, potentially saving tens of thousands of dollars over the life of the loan. Even a small rate difference of 0.5% can result in substantial savings."
          },
          {
            question: "Should I choose a 15-year or 30-year mortgage?",
            answer: "A 15-year mortgage has higher monthly payments but significantly lower total interest paid and faster equity building. A 30-year mortgage offers lower monthly payments and more flexibility in your budget but costs more in interest over time. Choose based on your financial situation and long-term goals."
          },
          {
            question: "What is PMI and how can I avoid it?",
            answer: "Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home's value. It protects the lender if you default on the loan. You can avoid PMI by making a 20% down payment, or it can be removed once you've built 20% equity through payments and home appreciation."
          },
          {
            question: "Can I pay off my mortgage early?",
            answer: "Most mortgages allow early payoff without penalties, though some have prepayment penalty clauses. Making extra principal payments can significantly reduce your total interest and shorten your loan term. Even small additional payments each month can save thousands in interest."
          }
        ]}
      />
    </CalculatorLayout>
  );
};

export default MortgageCalculator;
