import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MacroCalculator = () => {
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState("balanced");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const cals = parseFloat(calories);
    if (cals > 0) {
      let protein, carbs, fat;
      
      if (goal === "balanced") {
        protein = cals * 0.30 / 4;
        carbs = cals * 0.40 / 4;
        fat = cals * 0.30 / 9;
      } else if (goal === "high-protein") {
        protein = cals * 0.40 / 4;
        carbs = cals * 0.30 / 4;
        fat = cals * 0.30 / 9;
      } else {
        protein = cals * 0.20 / 4;
        carbs = cals * 0.50 / 4;
        fat = cals * 0.30 / 9;
      }
      
      setResult({
        protein: protein.toFixed(0),
        carbs: carbs.toFixed(0),
        fat: fat.toFixed(0),
      });
    }
  };

  return (
    <CalculatorLayout
      title="Macro Calculator"
      description="Calculate your daily macronutrient targets"
      formula="Protein: 4 cal/g | Carbs: 4 cal/g | Fat: 9 cal/g"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Calculate Macros</h2>
          <div className="space-y-6">
            <div>
              <Label>Daily Calories</Label>
              <Input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="2000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced (30/40/30)</SelectItem>
                  <SelectItem value="high-protein">High Protein (40/30/30)</SelectItem>
                  <SelectItem value="high-carb">High Carb (20/50/30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate Macros</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Your Macros</h2>
          {result ? (
            <div className="space-y-4">
              <div className="p-6 rounded-lg glass-card border border-blue-500/20">
                <div className="text-sm text-muted-foreground mb-1">Protein</div>
                <div className="text-4xl font-bold text-blue-400">{result.protein}g</div>
              </div>
              <div className="p-6 rounded-lg glass-card border border-green-500/20">
                <div className="text-sm text-muted-foreground mb-1">Carbohydrates</div>
                <div className="text-4xl font-bold text-green-400">{result.carbs}g</div>
              </div>
              <div className="p-6 rounded-lg glass-card border border-yellow-500/20">
                <div className="text-sm text-muted-foreground mb-1">Fat</div>
                <div className="text-4xl font-bold text-yellow-400">{result.fat}g</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">🥗</div><p>Enter calories</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default MacroCalculator;
