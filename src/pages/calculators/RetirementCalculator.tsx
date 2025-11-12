import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The Retirement Calculator is a powerful financial planning tool that helps you estimate how much money you'll have saved by the time you retire. By considering your current age, retirement age, existing savings, monthly contributions, and expected rate of return, it projects your retirement nest egg using compound interest calculations. This tool empowers you to make informed decisions about your retirement savings strategy, determine if you're on track to meet your retirement goals, and understand how changes to your savings rate or timeline impact your future financial security. Early and consistent retirement planning is crucial for financial independence in your golden years."
        useCases={[
          { title: "Retirement Readiness Assessment", description: "Evaluate whether your current savings rate and strategy will provide sufficient funds for your desired retirement lifestyle and identify any savings gaps that need to be addressed." },
          { title: "Contribution Optimization", description: "Experiment with different monthly contribution amounts to see how increasing your savings by even small amounts can significantly impact your retirement fund due to compound growth." },
          { title: "Early Retirement Planning", description: "Calculate how much you need to save monthly to retire earlier than traditional retirement age, helping you understand the feasibility of early retirement goals." },
          { title: "Career Change Impact", description: "Assess how taking a career break, pay cut, or job change that affects your retirement contributions might impact your long-term retirement savings." },
          { title: "Catch-Up Strategy", description: "If you started saving late, determine how much you need to contribute monthly to catch up and build adequate retirement savings in your remaining working years." },
          { title: "Investment Strategy Comparison", description: "Compare different investment strategies by varying the expected return rate to see how conservative versus aggressive investment approaches affect your retirement outcomes." }
        ]}
        tips={[
          { title: "Start Early for Maximum Benefit", description: "Due to compound interest, starting to save in your 20s rather than your 30s can result in hundreds of thousands more dollars at retirement, even with smaller monthly contributions. Time is your greatest asset in retirement savings." },
          { title: "Follow the 15% Rule", description: "Financial advisors recommend saving 15% of your gross income for retirement. If you start late, you may need to save 20-25% or more to catch up. Include employer matching contributions in this percentage." },
          { title: "Use Conservative Return Estimates", description: "While stocks have historically returned 10% annually, use 6-7% for conservative planning to account for inflation, taxes, fees, and market volatility. It's better to exceed expectations than fall short." },
          { title: "Maximize Employer Match", description: "Always contribute enough to get your full employer 401(k) match - it's free money and provides an immediate 50-100% return on your investment. This should be your first retirement savings priority." },
          { title: "Adjust Plan Regularly", description: "Review and update your retirement plan annually or after major life changes (marriage, children, job changes). Increase contributions when you get raises to accelerate savings without impacting lifestyle." },
          { title: "Consider Healthcare Costs", description: "The average retired couple spends over $300,000 on healthcare in retirement. Your retirement savings goal should account for medical expenses, which increase significantly with age." }
        ]}
        faqs={[
          { question: "How much money do I need to retire comfortably?", answer: "Financial advisors often recommend having 10-12 times your final annual salary saved, or enough to replace 70-80% of your pre-retirement income annually. For example, if you earn $60,000/year, aim for $600,000-$720,000 in retirement savings. However, needs vary based on lifestyle, location, and planned retirement age." },
          { question: "What is a realistic rate of return to use?", answer: "For conservative planning, use 6-7% annual return. This accounts for a diversified portfolio of stocks and bonds, inflation (typically 3%), investment fees, and market volatility. While stocks have historically returned 10% annually, it's safer to underestimate returns than overestimate." },
          { question: "What if I started saving late?", answer: "It's never too late to start. If you're behind, increase contributions aggressively (20-25% of income), maximize catch-up contributions after age 50 ($7,500 extra in 401(k) plans), consider working a few years longer, and potentially take on a side job to accelerate savings. Even starting at 50, you can build significant savings by 67." },
          { question: "Should I pay off debt or save for retirement?", answer: "Do both if possible. At minimum, contribute enough to get your full employer match (free money), then aggressively pay off high-interest debt (credit cards, personal loans). Once high-interest debt is cleared, maximize retirement contributions while maintaining minimum payments on low-interest debt like mortgages." },
          { question: "What's the difference between 401(k), IRA, and Roth accounts?", answer: "401(k) and Traditional IRA contributions are pre-tax (reducing current taxes) but taxed in retirement. Roth IRA/401(k) contributions are after-tax but withdrawals are tax-free. Generally, choose traditional accounts if you expect lower tax rates in retirement, Roth if you expect higher rates. Many people use both for tax diversification." },
          { question: "How do I know if I'm on track for retirement?", answer: "A rough guideline: by age 30, have 1× your salary saved; by 40, have 3×; by 50, have 6×; by 60, have 8×; by 67, have 10×. If you're behind these benchmarks, increase contributions. Use this calculator to see if your current trajectory meets your goals and adjust accordingly." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default RetirementCalculator;
