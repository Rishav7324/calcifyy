import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The grade calculator is an essential educational tool that converts numerical scores into letter grades and percentages. It helps students, teachers, and parents quickly understand academic performance relative to total possible points. Grade calculators use standardized grading scales to provide consistent evaluation across different assignments, tests, and courses. This tool is particularly useful for tracking progress throughout a semester, calculating what scores are needed on future assignments to achieve desired final grades, and understanding how individual assignments impact overall course performance."
        useCases={[
          {
            title: "Student Performance Tracking",
            description: "Monitor your academic progress by calculating grades for individual assignments, tests, and projects to understand how they contribute to your overall course grade."
          },
          {
            title: "Required Score Planning",
            description: "Calculate what score you need on your final exam to achieve a desired course grade, helping you prioritize study efforts and set realistic goals."
          },
          {
            title: "Teacher Grading Assistance",
            description: "Quickly convert raw scores to letter grades when grading multiple assignments or tests, ensuring consistent and fair evaluation across all students."
          },
          {
            title: "Parent-Student Communication",
            description: "Help parents understand their children's academic performance by translating numerical scores into easily interpretable letter grades and percentages."
          }
        ]}
        tips={[
          {
            title: "Understand Grading Scales",
            description: "Different institutions use different grading scales. Some use a 10-point scale (90-100 = A), while others use a 7-point scale (93-100 = A). Always confirm which scale your school uses."
          },
          {
            title: "Track Cumulative Performance",
            description: "Don't focus solely on individual assignment grades. Calculate your cumulative grade regularly to understand your overall standing and identify areas needing improvement."
          },
          {
            title: "Consider Weighted Grades",
            description: "Remember that many courses weight different assignment types differently. A test might be worth more than homework. Check your syllabus for weight distributions."
          },
          {
            title: "Set Realistic Goals",
            description: "Use the calculator to set achievable grade goals based on remaining assignments. If you need a 98% on the final to get an A, you might want to reassess your target."
          }
        ]}
        faqs={[
          {
            question: "What do different letter grades mean?",
            answer: "In the standard U.S. grading system: A (90-100%) represents excellent performance, B (80-89%) is above average, C (70-79%) is average, D (60-69%) is below average but passing, and F (below 60%) is failing. Some schools use plus/minus variations for more granular assessment."
          },
          {
            question: "How do I calculate my overall course grade?",
            answer: "To calculate overall course grade, multiply each assignment grade by its weight (percentage of total grade), sum all weighted scores, and divide by the total weight. For example, if tests are 50% and homework is 50%, and you scored 85% on tests and 95% on homework: (85×0.5 + 95×0.5) = 90%."
          },
          {
            question: "Can I bring up a failing grade?",
            answer: "It depends on how much of the course remains and the weight of remaining assignments. Use the calculator to determine what scores you need on remaining work. The earlier in the term, the more opportunity you have to improve your grade through strong performance on future assignments."
          },
          {
            question: "What is grade point average (GPA)?",
            answer: "GPA converts letter grades to a numerical scale (typically 4.0 for A, 3.0 for B, 2.0 for C, 1.0 for D, 0.0 for F) and averages them across all courses, sometimes weighted by credit hours. It provides a standardized measure of overall academic performance."
          },
          {
            question: "Do colleges care more about grades or GPA?",
            answer: "Colleges consider both individual course grades and cumulative GPA. They look at grade trends (improving vs. declining), difficulty of courses taken (honors, AP, etc.), and performance in courses related to your intended major. Consistent high performance is generally more impressive than sporadic excellence."
          }
        ]}
      />
    </CalculatorLayout>
  );
};

export default GradeCalculator;
