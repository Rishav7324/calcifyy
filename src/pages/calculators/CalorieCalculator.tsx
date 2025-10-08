import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CalorieCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const activityMultiplier = parseFloat(activity);

    if (w > 0 && h > 0 && a > 0) {
      let bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
      const tdee = bmr * activityMultiplier;
      
      let targetCalories = tdee;
      if (goal === "lose") targetCalories = tdee - 500;
      else if (goal === "gain") targetCalories = tdee + 500;
      
      setResult({ maintain: tdee.toFixed(0), target: targetCalories.toFixed(0), goal });
    }
  };

  return (
    <CalculatorLayout
      title="Calorie Calculator"
      description="Calculate daily calorie needs for your goals"
      formula="Calories = TDEE adjusted for goal"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Your Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Age (years)</Label>
              <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary</SelectItem>
                  <SelectItem value="1.375">Light</SelectItem>
                  <SelectItem value="1.55">Moderate</SelectItem>
                  <SelectItem value="1.725">Heavy</SelectItem>
                  <SelectItem value="1.9">Athlete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Target Calories</div>
                <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent">{result.target}</div>
                <div className="text-lg text-muted-foreground mt-2">cal/day</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Maintenance</div>
                <div className="text-2xl font-bold">{result.maintain} cal/day</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">🍎</div><p>Enter details</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default CalorieCalculator;
