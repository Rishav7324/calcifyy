import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const HealthyWeightCalculator = () => {
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("cm");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let heightInCm = parseFloat(height);
    if (unit === "inches") {
      heightInCm = heightInCm * 2.54;
    }
    
    const heightInM = heightInCm / 100;
    const minHealthyWeight = 18.5 * heightInM * heightInM;
    const maxHealthyWeight = 24.9 * heightInM * heightInM;
    const idealWeight = 22 * heightInM * heightInM;

    setResult({
      min: minHealthyWeight.toFixed(1),
      max: maxHealthyWeight.toFixed(1),
      ideal: idealWeight.toFixed(1)
    });
  };

  return (
    <CalculatorLayout
      title="Healthy Weight Calculator"
      description="Find your healthy weight range"
      formula="Based on BMI 18.5 - 24.9"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Height</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="170"
                className="flex-1"
              />
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="inches">inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Range
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Ideal Weight</p>
                <p className="text-4xl font-bold text-primary">{result.ideal} kg</p>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Healthy Weight Range</p>
                <p className="text-2xl font-bold">{result.min} - {result.max} kg</p>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                Based on healthy BMI range (18.5 - 24.9)
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default HealthyWeightCalculator;