import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const CarbohydrateCalculator = () => {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    let carbsPerKg = 5;

    if (activityLevel === "sedentary") carbsPerKg = 3;
    else if (activityLevel === "light") carbsPerKg = 4;
    else if (activityLevel === "moderate") carbsPerKg = 5;
    else if (activityLevel === "active") carbsPerKg = 6;
    else if (activityLevel === "very-active") carbsPerKg = 7;

    if (goal === "lose") carbsPerKg *= 0.7;
    else if (goal === "gain") carbsPerKg *= 1.2;

    const dailyCarbs = w * carbsPerKg;
    const calories = dailyCarbs * 4;

    setResult({
      dailyCarbs: dailyCarbs.toFixed(1),
      calories: calories.toFixed(0),
      perMeal: (dailyCarbs / 3).toFixed(1)
    });
  };

  return (
    <CalculatorLayout
      title="Carbohydrate Calculator"
      description="Calculate daily carb intake needs"
      formula="Based on weight and activity level"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
            />
          </div>
          <div>
            <Label>Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Lightly Active</SelectItem>
                <SelectItem value="moderate">Moderately Active</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="very-active">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Carbs
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Daily Carbohydrates</p>
                <p className="text-4xl font-bold text-primary">{result.dailyCarbs}g</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Calories from Carbs</p>
                  <p className="text-xl font-bold">{result.calories} cal</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Per Meal (3 meals)</p>
                  <p className="text-xl font-bold">{result.perMeal}g</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default CarbohydrateCalculator;