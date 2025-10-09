import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const FractionCalculator = () => {
  const [num1, setNum1] = useState("");
  const [den1, setDen1] = useState("");
  const [num2, setNum2] = useState("");
  const [den2, setDen2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<string>("");

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplify = (numerator: number, denominator: number) => {
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return { num: numerator / divisor, den: denominator / divisor };
  };

  const calculate = () => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);
    
    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setResult("Invalid input");
      return;
    }

    let numerator = 0;
    let denominator = 0;

    switch (operation) {
      case "add":
        numerator = n1 * d2 + n2 * d1;
        denominator = d1 * d2;
        break;
      case "subtract":
        numerator = n1 * d2 - n2 * d1;
        denominator = d1 * d2;
        break;
      case "multiply":
        numerator = n1 * n2;
        denominator = d1 * d2;
        break;
      case "divide":
        numerator = n1 * d2;
        denominator = d1 * n2;
        break;
    }

    const simplified = simplify(numerator, denominator);
    setResult(`${simplified.num}/${simplified.den}`);
  };

  return (
    <CalculatorLayout
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions"
      explanation="This calculator performs arithmetic operations on fractions and automatically simplifies the results."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fraction 1 - Numerator</Label>
              <Input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="Numerator"
              />
            </div>
            <div>
              <Label>Fraction 1 - Denominator</Label>
              <Input
                type="number"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                placeholder="Denominator"
              />
            </div>
          </div>
          <div>
            <Label>Operation</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
                <SelectItem value="multiply">Multiply (×)</SelectItem>
                <SelectItem value="divide">Divide (÷)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fraction 2 - Numerator</Label>
              <Input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="Numerator"
              />
            </div>
            <div>
              <Label>Fraction 2 - Denominator</Label>
              <Input
                type="number"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                placeholder="Denominator"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-3xl font-bold text-primary">Result: {result}</p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default FractionCalculator;
