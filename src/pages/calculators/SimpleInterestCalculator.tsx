import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    
    if (p > 0 && r > 0 && t > 0) {
      const interest = p * r * t;
      const total = p + interest;
      
      setResult({ interest: interest.toFixed(2), total: total.toFixed(2) });
    }
  };

  return (
    <CalculatorLayout
      title="Simple Interest Calculator"
      description="Calculate simple interest on principal amount"
      formula="I = P × r × t"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Investment Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Principal ($)</Label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Time (years)</Label>
              <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="5" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Total Amount</div>
                <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent">${result.total}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Interest Earned</div>
                <div className="text-2xl font-bold text-green-400">${result.interest}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💰</div><p>Enter details</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The simple interest calculator helps you determine the interest earned or paid on a principal amount over time using a fixed interest rate. Unlike compound interest, simple interest is calculated only on the original principal, making it straightforward and easy to understand. This calculator is essential for loans, investments, bonds, and financial planning where simple interest applies. By entering the principal amount, interest rate, and time period, you can instantly see how much interest will accrue and what the total amount will be."
        useCases={[
          { title: "Personal Loans & Borrowing", description: "Calculate total interest owed on simple interest loans, understand borrowing costs, or compare loan offers to find the most affordable option." },
          { title: "Savings & Investments", description: "Estimate returns on savings accounts, certificates of deposit (CDs), or treasury bonds that use simple interest calculations." },
          { title: "Financial Planning", description: "Project future value of investments, plan for financial goals, or understand how different rates and time periods affect returns." },
          { title: "Education & Learning", description: "Learn fundamental finance concepts, practice interest calculations, or understand the difference between simple and compound interest." }
        ]}
        tips={[
          { title: "Simple vs Compound Interest", description: "Simple interest is calculated only on the principal amount, while compound interest includes interest on previously earned interest. Simple interest results in lower returns/costs over time." },
          { title: "Annual Percentage Rate", description: "Interest rates are typically quoted as annual rates. If you're calculating for months, convert the time to years (months ÷ 12) for accurate results." },
          { title: "When Simple Interest Applies", description: "Simple interest is common in short-term loans, some personal loans, car loans, and certain bonds. Most savings accounts use compound interest instead." },
          { title: "Break-Even Analysis", description: "Use this calculator to determine how long it takes to earn a specific amount of interest, helping with investment timing decisions." }
        ]}
        faqs={[
          { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the original principal amount throughout the entire investment or loan period. Compound interest is calculated on both the principal and accumulated interest, resulting in interest earning interest. Compound interest grows faster over time." },
          { question: "How do I convert monthly interest rate to annual?", answer: "Multiply the monthly rate by 12 to get the annual rate. Conversely, divide an annual rate by 12 to get the monthly rate. Make sure the rate and time period match in your calculations." },
          { question: "Can I use this calculator for monthly or daily interest?", answer: "Yes, but adjust your time period accordingly. If using a monthly rate, enter time in months. If using a daily rate, enter time in days. Most commonly, annual rates and years are used." },
          { question: "Is simple interest better than compound interest?", answer: "It depends on your perspective. For borrowers, simple interest results in lower total interest paid. For investors, compound interest generates higher returns. Simple interest is simpler to calculate but less common in modern finance." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default SimpleInterestCalculator;
