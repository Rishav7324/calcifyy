import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const InflationCalculator = () => {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [inflationRate, setInflationRate] = useState("3");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const y = parseInt(years);
    const rate = parseFloat(inflationRate) / 100;
    
    const futureValue = principal * Math.pow(1 + rate, y);
    const purchasingPower = principal / Math.pow(1 + rate, y);
    const totalInflation = futureValue - principal;
    
    setResult({ futureValue, purchasingPower, totalInflation });
  };

  return (
    <CalculatorLayout
      title="Inflation Calculator"
      description="Calculate the impact of inflation on purchasing power"
      formula="Future Value = Present Value × (1 + inflation rate)ⁿ"
      explanation="This calculator shows how inflation affects the value of money over time and what today's money will be worth in the future."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Current Amount ($)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div>
            <Label>Number of Years</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Time period"
            />
          </div>
          <div>
            <Label>Annual Inflation Rate (%)</Label>
            <Input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              placeholder="3"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Inflation Impact</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Future Value Needed</p>
                <p className="text-3xl font-bold text-primary">
                  ${result.futureValue.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Purchasing Power</p>
                  <p className="text-lg font-bold">${result.purchasingPower.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Value Loss</p>
                  <p className="text-lg font-bold text-red-500">${result.totalInflation.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The inflation calculator demonstrates how inflation erodes purchasing power over time by showing what today's money will be worth in the future. Inflation is the rate at which the general level of prices for goods and services rises, decreasing the purchasing power of currency. Understanding inflation's impact is crucial for long-term financial planning, retirement savings, salary negotiations, and investment decisions. This calculator helps you quantify the real value of money across time periods and plan accordingly to maintain your standard of living."
        useCases={[
          { title: "Retirement Planning", description: "Calculate how much money you'll need in retirement to maintain current purchasing power. Account for decades of inflation when setting savings goals." },
          { title: "Salary Negotiations", description: "Determine real salary increases adjusted for inflation. A 3% raise during 3% inflation means no real income growth in purchasing power terms." },
          { title: "Investment Goals", description: "Set realistic investment return targets that beat inflation. Returns must exceed inflation to grow real wealth, not just nominal dollars." },
          { title: "Long-Term Budgeting", description: "Project future costs for education, healthcare, or major purchases accounting for price increases over time to budget accurately." }
        ]}
        tips={[
          { title: "Historical Inflation Rates", description: "U.S. inflation has averaged about 3% annually over the past century, but varies significantly by period. Recent decades saw 2-3%, while the 1970s experienced double-digit inflation." },
          { title: "Real vs Nominal Returns", description: "Investment returns should be viewed after inflation. If investments return 7% but inflation is 3%, your real return is approximately 4%. Focus on beating inflation." },
          { title: "Different Inflation Rates", description: "Healthcare and education often inflate faster than general inflation (5-7% annually), while technology prices may decrease. Consider specific category inflation for planning." },
          { title: "Compounding Effect", description: "Even modest inflation compounds significantly over time. 3% annual inflation halves purchasing power roughly every 24 years, making early planning essential." }
        ]}
        faqs={[
          { question: "What is a normal inflation rate?", answer: "Central banks typically target 2-3% annual inflation as healthy for economic growth. Rates above 5% are concerning, while sustained deflation (negative inflation) can harm economic activity. Historical U.S. average is about 3%." },
          { question: "How does inflation affect my savings?", answer: "Money in low-interest savings accounts loses purchasing power if the interest rate doesn't exceed inflation. With 3% inflation and 0.5% savings interest, you effectively lose 2.5% annually in real value." },
          { question: "Should I adjust my investments for inflation?", answer: "Yes. Your investment strategy should aim to beat inflation by several percentage points to grow real wealth. Stocks historically return 7-10% annually, comfortably beating inflation over long periods." },
          { question: "Why do prices sometimes go down?", answer: "Technology and efficiency improvements can decrease specific product prices even during overall inflation. Electronics, clothing, and some goods deflate while services like healthcare, education, and housing typically inflate faster than average." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default InflationCalculator;
