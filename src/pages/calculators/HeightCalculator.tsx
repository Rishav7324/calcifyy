import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const HeightCalculator = () => {
  const [fromUnit, setFromUnit] = useState("cm");
  const [toUnit, setToUnit] = useState("feet");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    const val = parseFloat(value);
    let cm = val;
    
    if (fromUnit === "feet") cm = val * 30.48;
    else if (fromUnit === "inches") cm = val * 2.54;
    else if (fromUnit === "meters") cm = val * 100;
    
    let output = "";
    if (toUnit === "cm") output = `${cm.toFixed(2)} cm`;
    else if (toUnit === "feet") {
      const feet = Math.floor(cm / 30.48);
      const inches = ((cm / 30.48) - feet) * 12;
      output = `${feet}' ${inches.toFixed(1)}"`;
    }
    else if (toUnit === "inches") output = `${(cm / 2.54).toFixed(2)} inches`;
    else if (toUnit === "meters") output = `${(cm / 100).toFixed(2)} m`;
    
    setResult(output);
  };

  return (
    <CalculatorLayout
      title="Height Calculator"
      description="Convert height between different units"
      explanation="This calculator converts height measurements between centimeters, meters, feet, and inches."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>From</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter height"
                className="flex-1"
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="meters">meters</SelectItem>
                  <SelectItem value="feet">feet</SelectItem>
                  <SelectItem value="inches">inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cm">Centimeters</SelectItem>
                <SelectItem value="meters">Meters</SelectItem>
                <SelectItem value="feet">Feet & Inches</SelectItem>
                <SelectItem value="inches">Inches</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={convert} className="w-full">Convert</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-3xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default HeightCalculator;
