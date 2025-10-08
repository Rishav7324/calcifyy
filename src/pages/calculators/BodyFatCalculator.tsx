import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BodyFatCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);

    if (gender === "male" && h > 0 && wa > 0 && n > 0) {
      const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
      setResult({ bodyFat: bodyFat.toFixed(1), category: getCategory(bodyFat, gender) });
    } else if (gender === "female" && h > 0 && wa > 0 && n > 0 && hi > 0) {
      const bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.22100 * Math.log10(h)) - 450;
      setResult({ bodyFat: bodyFat.toFixed(1), category: getCategory(bodyFat, gender) });
    }
  };

  const getCategory = (bf: number, g: string) => {
    if (g === "male") {
      if (bf < 6) return { name: "Essential Fat", color: "text-blue-400" };
      if (bf < 14) return { name: "Athletes", color: "text-green-400" };
      if (bf < 18) return { name: "Fitness", color: "text-emerald-400" };
      if (bf < 25) return { name: "Average", color: "text-yellow-400" };
      return { name: "Obese", color: "text-red-400" };
    } else {
      if (bf < 14) return { name: "Essential Fat", color: "text-blue-400" };
      if (bf < 21) return { name: "Athletes", color: "text-green-400" };
      if (bf < 25) return { name: "Fitness", color: "text-emerald-400" };
      if (bf < 32) return { name: "Average", color: "text-yellow-400" };
      return { name: "Obese", color: "text-red-400" };
    }
  };

  return (
    <CalculatorLayout
      title="Body Fat Calculator"
      description="Calculate body fat percentage using US Navy method"
      formula="Uses logarithmic formulas based on body measurements"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Your Measurements</h2>
          <div className="space-y-6">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Neck (cm)</Label>
              <Input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Waist (cm)</Label>
              <Input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            {gender === "female" && (
              <div>
                <Label>Hip (cm)</Label>
                <Input type="number" value={hip} onChange={(e) => setHip(e.target.value)} className="mt-2 h-12 glass-card border-primary/30" />
              </div>
            )}
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-6xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">{result.bodyFat}%</div>
                <div className={`text-2xl font-semibold ${result.category.color}`}>{result.category.name}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💪</div><p>Enter measurements</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default BodyFatCalculator;
