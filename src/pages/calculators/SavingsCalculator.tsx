import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The Savings Calculator projects how your money grows over time through regular deposits and compound interest. By entering your starting balance, monthly contributions, time horizon, and expected interest rate, you can visualize your wealth accumulation journey. This tool demonstrates the power of consistent saving combined with compound interest - where you earn interest on your interest. Whether you're saving for an emergency fund, vacation, down payment, or any financial goal, this calculator helps you set realistic targets and track your progress toward financial security."
        useCases={[
          { title: "Emergency Fund Building", description: "Calculate how long it takes to build a 3-6 month emergency fund by making regular monthly deposits to a high-yield savings account." },
          { title: "Short-Term Goal Saving", description: "Plan savings for vacations, weddings, new appliances, or other purchases within 1-5 years by determining required monthly contributions." },
          { title: "Down Payment Planning", description: "Determine monthly savings needed to accumulate a house or car down payment within your target timeframe." },
          { title: "Education Savings", description: "Project college savings growth in 529 plans or education savings accounts to meet future tuition costs." },
          { title: "Sinking Fund Strategy", description: "Plan for predictable future expenses like property taxes, insurance premiums, or annual subscriptions by building dedicated savings funds." }
        ]}
        tips={[
          { title: "Start with What You Can", description: "Even small amounts compound significantly over time. Starting with $50/month is better than waiting until you can save $500/month - time in the market matters most." },
          { title: "Automate Your Savings", description: "Set up automatic transfers to savings on payday. Treating savings as a non-negotiable 'bill' ensures consistency and removes temptation to skip months." },
          { title: "High-Yield Savings Accounts", description: "Shop for savings accounts offering competitive interest rates. Online banks often provide 4-5% APY compared to 0.01% at traditional banks, significantly boosting growth." },
          { title: "Emergency Fund Priority", description: "Before aggressive investing, build a 3-6 month emergency fund in accessible savings. This safety net prevents going into debt during unexpected expenses or job loss." },
          { title: "Increase Contributions Gradually", description: "Commit to increasing monthly savings by a small amount each year or whenever you get a raise. These incremental increases accelerate goal achievement without lifestyle impact." }
        ]}
        faqs={[
          { question: "What's a good interest rate for a savings account?", answer: "As of 2024, competitive high-yield savings accounts offer 4-5% APY. Traditional bank savings accounts often pay only 0.01-0.10%. Shop around online banks and credit unions for the best rates, which significantly impact long-term growth." },
          { question: "Should I save or invest my money?", answer: "For short-term goals (under 3-5 years) or emergency funds, use savings accounts for safety and accessibility. For long-term goals (5+ years), investing typically offers better growth despite volatility. Many people do both - emergency fund in savings, retirement in investments." },
          { question: "How much should I save each month?", answer: "The 50/30/20 budget rule suggests 20% of income toward savings and debt repayment. At minimum, aim to save $1,000 for a starter emergency fund, then build to 3-6 months of expenses. After that, save 15%+ of income for long-term goals." },
          { question: "Is compound interest really that powerful?", answer: "Yes! Thanks to compounding, saving $300/month at 5% interest for 20 years results in $123,000 - but you only deposited $72,000. The remaining $51,000 is interest earned on your interest. Starting early maximizes this effect." },
          { question: "What if I can't save consistently every month?", answer: "Life happens. If you miss months, don't give up. Save what you can, when you can. Even irregular contributions grow over time. The key is not perfection but persistence. Some months might be $10, others $100 - every bit counts." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default SavingsCalculator;
