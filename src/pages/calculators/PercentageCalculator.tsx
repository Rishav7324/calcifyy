import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const val = parseFloat(value);
    const pct = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(pct)) {
      setResult((val * pct) / 100);
    }
  };

  return (
      <CalculatorLayout
        title="Percentage Calculator"
        description="Calculate percentages, percentage increase/decrease, and find what percentage one number is of another"
        formula="Result = (Value × Percentage) ÷ 100"
        explanation="This calculator helps you find a percentage of a number. For example, to find 20% of 100, multiply 100 by 20 and divide by 100, which equals 20."
        keywords="percentage calculator, calculate percentage, percentage increase, percentage decrease, percent calculator"
        canonicalUrl="https://primemetric.online/calculator/percentage"
      >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div>
            <Label>Percentage (%)</Label>
            <Input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter percentage"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
          {result !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {percentage}% of {value} = {result.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Percentage Calculator is a versatile mathematical tool that helps you perform various percentage-related calculations quickly and accurately. Whether you're calculating discounts while shopping, determining tax amounts, analyzing financial data, or working on academic assignments, this calculator simplifies the process. Understanding percentages is essential in everyday life, from calculating tips at restaurants to understanding interest rates on loans and investments. This tool eliminates manual calculation errors and provides instant, precise results for all your percentage needs."
        useCases={[
          { title: "Shopping Discounts", description: "Calculate sale prices and savings when stores offer percentage discounts. Quickly determine how much you'll save on items marked down by 20%, 30%, or any other percentage." },
          { title: "Tax Calculations", description: "Compute sales tax, VAT, or other tax amounts by applying the appropriate percentage to purchase amounts for accurate budgeting and expense tracking." },
          { title: "Financial Analysis", description: "Analyze investment returns, loan interest, profit margins, and other financial metrics expressed as percentages to make informed business decisions." },
          { title: "Academic & Testing", description: "Calculate test scores, grade percentages, and statistical data for academic work, helping students and educators understand performance metrics." },
          { title: "Tip Calculation", description: "Determine appropriate tip amounts at restaurants by calculating 15%, 18%, 20%, or any custom percentage of your bill total." },
          { title: "Data Comparison", description: "Express one number as a percentage of another to compare data sets, market shares, demographic distributions, and statistical information." }
        ]}
        tips={[
          { title: "Understand the Formula", description: "The basic formula is: (Percentage × Value) ÷ 100 = Result. Remember that 'of' means multiply when working with percentages." },
          { title: "Percentage Increase vs Decrease", description: "For increases, add the result to the original value. For decreases, subtract it. A 20% increase means multiply by 1.20, while a 20% decrease means multiply by 0.80." },
          { title: "Reverse Calculations", description: "To find what percentage one number is of another, divide the part by the whole and multiply by 100. For example: 25 is what % of 200? → (25÷200)×100 = 12.5%." },
          { title: "Double-Check Your Work", description: "When calculating discounts, verify that the final price makes sense. A 30% discount on $100 should give you $70, not $30." },
          { title: "Common Percentage Shortcuts", description: "10% = divide by 10, 50% = divide by 2, 25% = divide by 4, 1% = divide by 100. Use these shortcuts for quick mental calculations." }
        ]}
        faqs={[
          { question: "How do I calculate what percentage one number is of another?", answer: "Divide the first number by the second number, then multiply by 100. Formula: (Part ÷ Whole) × 100 = Percentage. For example, to find what percentage 30 is of 150: (30 ÷ 150) × 100 = 20%." },
          { question: "What's the difference between percentage increase and percentage points?", answer: "Percentage increase is relative to the original value, while percentage points refer to absolute difference. If something goes from 20% to 30%, that's a 10 percentage point increase or a 50% relative increase (because 10 is 50% of 20)." },
          { question: "How do I calculate percentage change between two numbers?", answer: "Use the formula: ((New Value - Old Value) ÷ Old Value) × 100. The result is positive for increases and negative for decreases. For example, going from 50 to 75 is: ((75-50)÷50)×100 = 50% increase." },
          { question: "Can a percentage be greater than 100%?", answer: "Yes! Percentages greater than 100% indicate that something is more than the whole. For example, if sales doubled, that's a 100% increase. If they tripled, that's a 200% increase. Values greater than 100% are common when measuring growth and returns." },
          { question: "Why do successive percentage changes multiply instead of add?", answer: "Percentages compound because each change is applied to the current value, not the original. A 10% increase followed by a 10% decrease doesn't return to the original value - you end up with 99% of the original. This is why (1.10 × 0.90 = 0.99) instead of equaling 1.00." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default PercentageCalculator;
