import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const RatioCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<any>(null);

  const gcd = (x: number, y: number): number => {
    return y === 0 ? x : gcd(y, x % y);
  };

  const calculate = () => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    
    if (num1 > 0 && num2 > 0) {
      const divisor = gcd(num1, num2);
      const simplified1 = num1 / divisor;
      const simplified2 = num2 / divisor;
      const percentage = ((num1 / num2) * 100).toFixed(2);
      
      setResult({
        simplified: `${simplified1}:${simplified2}`,
        percentage,
        decimal: (num1 / num2).toFixed(4)
      });
    }
  };

  return (
    <CalculatorLayout
      title="Ratio Calculator"
      description="Simplify ratios and calculate proportions"
      formula="Ratio = a:b (simplified by GCD)"
      explanation="This calculator simplifies ratios to their lowest terms and converts them to percentages and decimals."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Number (a)</Label>
              <Input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="Enter first number"
              />
            </div>
            <div>
              <Label>Second Number (b)</Label>
              <Input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="Enter second number"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Ratio
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Simplified Ratio</p>
                <p className="text-4xl font-bold text-primary">{result.simplified}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">As Percentage</p>
                  <p className="text-xl font-bold">{result.percentage}%</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">As Decimal</p>
                  <p className="text-xl font-bold">{result.decimal}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The ratio calculator simplifies ratios to their lowest terms using the Greatest Common Divisor (GCD) method and converts them into percentages and decimals. Ratios express the relationship between two or more quantities, showing how many times one value contains another. This calculator is essential in mathematics, cooking, business, finance, and any field requiring proportional relationships. By simplifying ratios, you can easily compare quantities, scale recipes, understand financial data, or solve proportion problems."
        useCases={[
          { title: "Cooking & Recipes", description: "Scale recipes up or down by maintaining ingredient ratios. Convert recipe proportions for different serving sizes while preserving taste and texture." },
          { title: "Finance & Investment", description: "Analyze financial ratios like debt-to-equity, price-to-earnings, or expense ratios to assess business performance and investment opportunities." },
          { title: "Academic & Mathematics", description: "Solve ratio and proportion problems, simplify mathematical expressions, or understand relationships between variables in algebra and geometry." },
          { title: "Construction & Design", description: "Maintain proper mixing ratios for concrete, paint, or other materials. Scale architectural plans while preserving proportions and dimensions." }
        ]}
        tips={[
          { title: "Understanding Simplification", description: "Simplifying means reducing both numbers by their GCD. For example, 8:12 simplifies to 2:3 (dividing both by 4). This makes ratios easier to understand and compare." },
          { title: "Percentage Interpretation", description: "The percentage shows the first number as a portion of the second. A ratio of 1:4 means 25%, indicating the first value is one-quarter of the second." },
          { title: "Scaling Applications", description: "To scale quantities while maintaining ratios, multiply both parts by the same factor. If 2:3 requires scaling to 8, multiply both by 4 to get 8:12." },
          { title: "Comparing Ratios", description: "Convert ratios to decimals or percentages to easily compare different proportions. This helps identify which ratio represents a larger or smaller proportion." }
        ]}
        faqs={[
          { question: "What does a ratio of 1:1 mean?", answer: "A 1:1 ratio means both quantities are equal - there's the same amount of each. In percentage terms, this is 100%, meaning the first quantity equals the second quantity entirely." },
          { question: "How do I use ratios for scaling recipes?", answer: "If your recipe ratio is 2:3 (flour to sugar) and you need 6 cups of flour, divide 6 by 2 to get 3, then multiply 3 by 3 to get 9 cups of sugar. This maintains the 2:3 ratio at a larger scale." },
          { question: "What's the difference between a ratio and a fraction?", answer: "A ratio (a:b) compares two quantities, while a fraction (a/b) represents a division. However, they're related: the ratio 3:4 can be expressed as the fraction 3/4 or 0.75 as a decimal." },
          { question: "Can ratios have more than two numbers?", answer: "Yes, ratios can compare three or more quantities (like 2:3:5). This calculator handles two-number ratios, but the concept extends to multiple values by maintaining proportional relationships." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default RatioCalculator;
