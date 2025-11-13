import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The Protein Calculator determines your optimal daily protein intake based on your body weight, activity level, and fitness goals. Protein is essential for building and repairing tissues, maintaining muscle mass, supporting immune function, and producing enzymes and hormones. Getting the right amount of protein helps optimize body composition, athletic performance, and overall health."
        useCases={[
          { title: "Muscle Building", description: "Calculate higher protein needs when building muscle mass. Strength athletes and bodybuilders require 1.6-2.2g per kg of body weight to support muscle protein synthesis." },
          { title: "Weight Loss", description: "Maintain muscle mass while losing fat by consuming adequate protein. Higher protein intake (1.8-2.0g/kg) helps preserve lean mass during calorie restriction." },
          { title: "Athletic Performance", description: "Support training recovery and adaptation with appropriate protein intake. Endurance and power athletes need more protein than sedentary individuals." },
          { title: "General Health", description: "Meet baseline protein requirements for tissue maintenance, immune function, and metabolic health at sedentary to moderate activity levels." }
        ]}
        tips={[
          { title: "Distribution Throughout Day", description: "Spread protein across meals (20-40g per meal) rather than consuming it all at once for better muscle protein synthesis and satiety." },
          { title: "Quality Matters", description: "Choose complete proteins (meat, fish, eggs, dairy) or combine plant proteins (rice + beans) to get all essential amino acids your body needs." },
          { title: "Timing for Athletes", description: "Consume protein within 2 hours post-workout for optimal recovery. A protein-rich breakfast also helps preserve muscle mass." },
          { title: "Adjust for Goals", description: "Increase protein when cutting calories, building muscle, or aging (older adults need more). Decrease if kidney issues are present (consult doctor)." }
        ]}
        faqs={[
          { question: "How much protein do I really need?", answer: "Sedentary adults: 1.2g/kg. Active individuals: 1.4-1.8g/kg. Strength athletes: 1.6-2.2g/kg. Endurance athletes: 1.2-1.6g/kg. Higher amounts for muscle gain or fat loss." },
          { question: "Can I eat too much protein?", answer: "Very high intakes (>2.5g/kg) offer no additional benefit and may displace other nutrients. Healthy kidneys can handle high protein, but those with kidney disease should limit intake." },
          { question: "Is plant protein as good as animal protein?", answer: "Animal proteins are complete (all essential amino acids) and more digestible. Plant proteins work well when combined (legumes + grains) or supplemented with variety throughout the day." },
          { question: "Do I need protein supplements?", answer: "Not necessarily. Whole foods provide protein plus other nutrients. Supplements (whey, casein, plant-based powders) are convenient for athletes, busy schedules, or high protein needs." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default ProteinCalculator;
