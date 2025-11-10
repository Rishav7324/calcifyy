import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const StandardDeviationCalculator = () => {
  const [values, setValues] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const nums = values.split(",").map(v => parseFloat(v.trim())).filter(n => !isNaN(n));
    
    if (nums.length > 0) {
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const variance = nums.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / nums.length;
      const stdDev = Math.sqrt(variance);
      
      setResult({
        mean: mean.toFixed(4),
        variance: variance.toFixed(4),
        stdDev: stdDev.toFixed(4),
        count: nums.length
      });
    }
  };

  return (
    <CalculatorLayout
      title="Standard Deviation Calculator"
      description="Calculate mean, variance, and standard deviation"
      formula="σ = √[Σ(x - μ)² / N]"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Data Values (comma-separated)</Label>
            <Input
              value={values}
              onChange={(e) => setValues(e.target.value)}
              placeholder="1, 2, 3, 4, 5"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Standard Deviation</p>
                <p className="text-4xl font-bold text-primary">{result.stdDev}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Mean</p>
                  <p className="text-xl font-bold">{result.mean}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Variance</p>
                  <p className="text-xl font-bold">{result.variance}</p>
                </div>
              </div>
              <div className="p-3 bg-secondary/10 rounded text-center">
                <p className="text-sm text-muted-foreground">Sample Size</p>
                <p className="text-xl font-bold">{result.count}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The standard deviation calculator is a powerful statistical tool that measures the amount of variation or dispersion in a dataset. It tells you how spread out the values are from the mean (average). A low standard deviation means data points are clustered close to the mean, while a high standard deviation indicates wide variance. This calculator also provides the mean and variance, giving you a complete statistical picture. Standard deviation is fundamental in data analysis, quality control, finance, research, and any field dealing with variability."
        useCases={[
          { title: "Data Analysis & Research", description: "Analyze survey results, experimental data, or research findings to understand data spread and variability in scientific studies." },
          { title: "Quality Control", description: "Monitor manufacturing processes, product consistency, and quality metrics to ensure products meet specifications and identify defects." },
          { title: "Financial Analysis", description: "Assess investment risk, portfolio volatility, and market fluctuations. Higher standard deviation indicates higher risk and volatility." },
          { title: "Education & Grading", description: "Evaluate test score distributions, understand class performance variation, and identify outliers in student achievement data." }
        ]}
        tips={[
          { title: "Understanding Standard Deviation", description: "In a normal distribution, approximately 68% of data falls within 1 standard deviation of the mean, 95% within 2 standard deviations, and 99.7% within 3 standard deviations." },
          { title: "Population vs Sample", description: "This calculator uses population standard deviation (dividing by N). For sample data, divide by N-1 instead. Use sample standard deviation when analyzing a subset of a larger population." },
          { title: "Interpreting Results", description: "Compare the standard deviation to the mean. If SD is large relative to the mean, data is highly variable. If SD is small, data is consistent and predictable." },
          { title: "Data Entry", description: "Enter numbers separated by commas. The calculator automatically filters out invalid entries and handles decimal numbers correctly." }
        ]}
        faqs={[
          { question: "What is the difference between variance and standard deviation?", answer: "Variance is the average of squared differences from the mean, measured in squared units. Standard deviation is the square root of variance, returned to the original units. Standard deviation is more interpretable because it's in the same units as your data." },
          { question: "When should I use standard deviation instead of range?", answer: "Range (max - min) only considers extreme values and ignores data distribution. Standard deviation considers all data points and gives a more complete picture of variability. Use standard deviation for thorough statistical analysis." },
          { question: "What does a standard deviation of zero mean?", answer: "A standard deviation of zero means all values in your dataset are identical - there's no variation at all. All data points equal the mean. This is rare in real-world data." },
          { question: "How do I use standard deviation to identify outliers?", answer: "Data points more than 2-3 standard deviations away from the mean are typically considered outliers. In a normal distribution, only about 5% of data falls beyond 2 standard deviations, and less than 1% beyond 3 standard deviations." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default StandardDeviationCalculator;
