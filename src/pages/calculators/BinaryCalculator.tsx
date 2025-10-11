import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const BinaryCalculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const binary1 = parseInt(num1, 2);
    const binary2 = parseInt(num2, 2);
    let calcResult = 0;

    switch (operation) {
      case "add":
        calcResult = binary1 + binary2;
        break;
      case "subtract":
        calcResult = binary1 - binary2;
        break;
      case "multiply":
        calcResult = binary1 * binary2;
        break;
      case "divide":
        calcResult = Math.floor(binary1 / binary2);
        break;
    }

    setResult({
      binary: calcResult.toString(2),
      decimal: calcResult,
      hex: calcResult.toString(16).toUpperCase()
    });
  };

  return (
    <CalculatorLayout
      title="Binary Calculator"
      description="Perform binary arithmetic operations"
      formula="Binary to Decimal conversion"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>First Binary Number</Label>
            <Input
              value={num1}
              onChange={(e) => setNum1(e.target.value.replace(/[^01]/g, ""))}
              placeholder="1010"
            />
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
          <div>
            <Label>Second Binary Number</Label>
            <Input
              value={num2}
              onChange={(e) => setNum2(e.target.value.replace(/[^01]/g, ""))}
              placeholder="0101"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Binary Result</p>
                <p className="text-3xl font-bold text-primary break-all">{result.binary}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Decimal</p>
                  <p className="text-xl font-bold">{result.decimal}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Hexadecimal</p>
                  <p className="text-xl font-bold">{result.hex}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default BinaryCalculator;