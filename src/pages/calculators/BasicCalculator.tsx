import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const BasicCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  return (
    <CalculatorLayout
      title="Basic Calculator"
      description="Simple calculator for basic arithmetic operations"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 max-w-sm mx-auto">
        <div className="space-y-4">
          <div className="bg-background/80 p-4 rounded-lg text-right text-3xl font-mono min-h-[60px] flex items-center justify-end">
            {display}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={clear} variant="destructive" className="col-span-2">C</Button>
            <Button onClick={() => setDisplay(display.slice(0, -1))} variant="outline">⌫</Button>
            <Button onClick={() => handleOperation("÷")} variant="outline">÷</Button>

            <Button onClick={() => handleNumber("7")}>7</Button>
            <Button onClick={() => handleNumber("8")}>8</Button>
            <Button onClick={() => handleNumber("9")}>9</Button>
            <Button onClick={() => handleOperation("×")} variant="outline">×</Button>

            <Button onClick={() => handleNumber("4")}>4</Button>
            <Button onClick={() => handleNumber("5")}>5</Button>
            <Button onClick={() => handleNumber("6")}>6</Button>
            <Button onClick={() => handleOperation("-")} variant="outline">-</Button>

            <Button onClick={() => handleNumber("1")}>1</Button>
            <Button onClick={() => handleNumber("2")}>2</Button>
            <Button onClick={() => handleNumber("3")}>3</Button>
            <Button onClick={() => handleOperation("+")} variant="outline">+</Button>

            <Button onClick={() => handleNumber("0")} className="col-span-2">0</Button>
            <Button onClick={() => handleNumber(".")}>.</Button>
            <Button onClick={handleEquals} className="bg-primary">=</Button>
          </div>
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default BasicCalculator;
