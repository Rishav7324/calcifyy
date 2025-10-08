import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProteinCalculator = () => {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.6");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    let multiplier = parseFloat(activity);
    
    if (goal === "muscle") multiplier += 0.4;
    else if (goal === "lose") multiplier += 0.2;
    
    if (w > 0) {
      const protein = w * multiplier;
      setResult(protein.toFixed(0));
    }
  };

  return (
    <CalculatorLayout
      title="Protein Calculator"
      description="Calculate your daily protein requirements"
      formula="Protein (g) = Body Weight (kg) × Activity Multiplier"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Your Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Body Weight (kg)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary</SelectItem>
                  <SelectItem value="1.6">Moderate</SelectItem>
                  <SelectItem value="2.0">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintain">Maintain</SelectItem>
                  <SelectItem value="lose">Lose Fat</SelectItem>
                  <SelectItem value="muscle">Build Muscle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Daily Protein Target</h2>
          {result ? (
            <div className="text-center py-8">
              <div className="text-7xl font-bold gradient-primary bg-clip-text text-transparent">{result}g</div>
              <div className="text-lg text-muted-foreground mt-4">per day</div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">🥩</div><p>Enter details</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default ProteinCalculator;
