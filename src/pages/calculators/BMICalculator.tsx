import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to m

    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let category = "";
      let color = "";

      if (bmi < 18.5) {
        category = "Underweight";
        color = "text-blue-400";
      } else if (bmi >= 18.5 && bmi < 25) {
        category = "Normal Weight";
        color = "text-green-400";
      } else if (bmi >= 25 && bmi < 30) {
        category = "Overweight";
        color = "text-yellow-400";
      } else {
        category = "Obese";
        color = "text-red-400";
      }

      setResult({ bmi: parseFloat(bmi.toFixed(1)), category, color });
    }
  };

  const explanation = (
    <div className="space-y-4">
      <p>
        <strong>Body Mass Index (BMI)</strong> is a measure of body fat based on height and weight 
        that applies to adult men and women.
      </p>
      <div className="space-y-2">
        <p className="font-semibold">BMI Categories:</p>
        <ul className="space-y-1 ml-4">
          <li>• <span className="text-blue-400">Underweight:</span> BMI less than 18.5</li>
          <li>• <span className="text-green-400">Normal weight:</span> BMI 18.5 to 24.9</li>
          <li>• <span className="text-yellow-400">Overweight:</span> BMI 25 to 29.9</li>
          <li>• <span className="text-red-400">Obese:</span> BMI 30 or greater</li>
        </ul>
      </div>
      <p className="text-sm">
        <strong>Note:</strong> BMI is a screening tool and does not diagnose body fatness or health. 
        Consult with a healthcare provider for health assessments.
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and understand your health category"
      formula="BMI = weight (kg) / [height (m)]²"
      explanation={explanation}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="weight" className="text-lg">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <div>
              <Label htmlFor="height" className="text-lg">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <Button 
              onClick={calculateBMI}
              className="w-full h-12 text-lg gradient-primary"
              disabled={!weight || !height}
            >
              Calculate BMI
            </Button>
          </div>
        </Card>

        {/* Result Section */}
        <Card className="glass-card p-8 animate-scale-in" style={{ animationDelay: "100ms" }}>
          <h2 className="text-2xl font-bold mb-6">Your Result</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-6xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                  {result.bmi}
                </div>
                <div className={`text-2xl font-semibold ${result.color}`}>
                  {result.category}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <span>Underweight</span>
                  <span className="text-blue-400">&lt; 18.5</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <span>Normal</span>
                  <span className="text-green-400">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <span>Overweight</span>
                  <span className="text-yellow-400">25 - 29.9</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <span>Obese</span>
                  <span className="text-red-400">≥ 30</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">🏃</div>
                <p>Enter your details to calculate BMI</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default BMICalculator;
