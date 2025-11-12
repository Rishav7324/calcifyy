import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const SalaryCalculator = () => {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("annual");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const salary = parseFloat(amount);
    
    if (salary > 0) {
      let annual = salary;
      if (period === "monthly") annual = salary * 12;
      else if (period === "biweekly") annual = salary * 26;
      else if (period === "weekly") annual = salary * 52;
      else if (period === "hourly") annual = salary * 2080;
      
      setResult({
        annual: annual.toFixed(2),
        monthly: (annual / 12).toFixed(2),
        biweekly: (annual / 26).toFixed(2),
        weekly: (annual / 52).toFixed(2),
        daily: (annual / 260).toFixed(2),
        hourly: (annual / 2080).toFixed(2)
      });
    }
  };

  return (
    <CalculatorLayout
      title="Salary Calculator"
      description="Convert salary between different time periods"
      explanation="This calculator converts your salary between annual, monthly, weekly, and hourly rates."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Salary Input</h2>
          <div className="space-y-6">
            <CurrencySelector value={currency} onChange={setCurrency} />
            
            <div>
              <Label>Salary Amount ({getCurrencySymbol(currency)})</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="60000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Time Period</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Breakdown</h2>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Annual</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.annual}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Monthly</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.monthly}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Bi-weekly</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.biweekly}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Weekly</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.weekly}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Daily</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.daily}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Hourly</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.hourly}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💵</div><p>Enter salary</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Salary Calculator is an essential tool for anyone evaluating job offers, negotiating pay, budgeting, or comparing compensation packages. It instantly converts your salary between different time periods - annual, monthly, biweekly, weekly, daily, and hourly rates. This helps you understand the true value of a job offer, compare positions with different pay structures, and budget more effectively by seeing your income broken down into various timeframes. Whether you're paid hourly and want to know your annual earnings, or you're salaried and curious about your hourly rate, this calculator provides instant clarity on your compensation."
        useCases={[
          { title: "Job Offer Comparison", description: "Compare multiple job offers with different pay structures - one offering hourly pay, another offering annual salary - by converting everything to the same time period for accurate comparison." },
          { title: "Salary Negotiation", description: "Prepare for salary negotiations by understanding exactly what an hourly rate translates to annually, or vice versa, ensuring you negotiate for appropriate compensation." },
          { title: "Budgeting & Planning", description: "Create accurate monthly budgets by knowing your exact monthly income, or plan daily expenses by understanding your daily earnings rate." },
          { title: "Freelance Rate Setting", description: "If transitioning from salaried employment to freelance work, calculate what hourly rate you need to charge to match or exceed your current salary, accounting for benefits and taxes." },
          { title: "Part-Time Job Evaluation", description: "Calculate how much a part-time job would pay annually to determine if it's worth pursuing, or how many hours you'd need to work to reach your income goals." },
          { title: "Career Path Planning", description: "Understand the financial implications of career changes by converting different compensation structures to comparable figures for informed decision-making." }
        ]}
        tips={[
          { title: "Standard Work Year Assumptions", description: "This calculator assumes a standard work year of 2,080 hours (40 hours/week × 52 weeks), 52 weeks, 260 work days (5 days/week), and 12 months. Adjust mentally if your situation differs (e.g., 37.5 hour work weeks)." },
          { title: "Account for Benefits", description: "When comparing jobs, remember that salary is just part of compensation. Factor in health insurance, retirement contributions, paid time off, bonuses, and other benefits which can add 20-30% to total compensation value." },
          { title: "Consider After-Tax Income", description: "The calculated amounts are gross (before taxes). Your take-home pay will be lower after federal, state, and local taxes, plus Social Security and Medicare. Typically expect 25-30% reduction for middle-income earners." },
          { title: "Freelance Rate Premium", description: "If setting freelance rates, charge 50-100% more than your employed hourly rate to cover benefits, taxes, unpaid time off, and business expenses that employers normally cover." },
          { title: "Geographic Cost of Living", description: "A $60,000 salary in one city may provide vastly different purchasing power than the same salary elsewhere. Use cost-of-living calculators alongside salary comparisons for realistic comparisons." }
        ]}
        faqs={[
          { question: "How do I convert annual salary to hourly rate?", answer: "Divide your annual salary by 2,080 (the number of working hours in a year based on 40 hours/week). For example, $52,000 annual salary ÷ 2,080 hours = $25/hour. This calculator does this automatically for you." },
          { question: "Why does my actual paycheck differ from calculated amounts?", answer: "The calculator shows gross income before deductions. Your paycheck is reduced by federal and state income taxes, Social Security, Medicare, health insurance premiums, retirement contributions, and other withholdings. Typically, take-home pay is 70-75% of gross income." },
          { question: "How accurate is the hourly calculation for salaried employees?", answer: "The calculation is based on standard 2,080 work hours annually (40 hours/week × 52 weeks). If you regularly work more or fewer hours, your true hourly rate differs. Many salaried employees work more than 40 hours weekly without overtime, lowering their effective hourly rate." },
          { question: "What about overtime pay - is that included?", answer: "No, these calculations assume standard pay rates without overtime. Overtime (typically 1.5× or 2× your hourly rate) is additional. If you regularly work overtime, your actual annual income will be higher than the calculated standard amount." },
          { question: "How do bonuses and commissions factor in?", answer: "This calculator doesn't include variable compensation like bonuses, commissions, tips, or profit-sharing. To get your true total compensation, calculate your base salary here, then add your average annual bonus/commission amounts separately." },
          { question: "Should I use gross or net salary for budgeting?", answer: "Always budget based on net (take-home) pay, not gross salary. A good rule of thumb: expect take-home pay to be about 70-75% of gross salary after all taxes and deductions. Calculate gross here, then multiply by 0.70-0.75 for realistic budget planning." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default SalaryCalculator;
