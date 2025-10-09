import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const GradeCalculator = () => {
  const [scored, setScored] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const score = parseFloat(scored);
    const max = parseFloat(total);
    if (!isNaN(score) && !isNaN(max) && max > 0) {
      const percentage = (score / max) * 100;
      let grade = "F";
      if (percentage >= 90) grade = "A";
      else if (percentage >= 80) grade = "B";
      else if (percentage >= 70) grade = "C";
      else if (percentage >= 60) grade = "D";
      setResult({ percentage: percentage.toFixed(2), grade });
    }
  };

  return (
    <CalculatorLayout
      title="Grade Calculator"
      description="Calculate grade percentage and letter grade from scored marks"
      formula="Percentage = (Scored Marks ÷ Total Marks) × 100"
      explanation="This calculator converts your scored marks into a percentage and assigns a letter grade based on standard grading scales."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Marks Scored</Label>
            <Input
              type="number"
              value={scored}
              onChange={(e) => setScored(e.target.value)}
              placeholder="Enter marks scored"
            />
          </div>
          <div>
            <Label>Total Marks</Label>
            <Input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="Enter total marks"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Grade
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-3xl font-bold text-primary">Grade: {result.grade}</p>
                <p className="text-xl text-muted-foreground mt-2">{result.percentage}%</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default GradeCalculator;
