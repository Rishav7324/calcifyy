import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The Basic Calculator provides simple arithmetic operations including addition, subtraction, multiplication, and division. It features a familiar interface with number pad and operation buttons, making it easy to perform quick calculations without complex functions."
        useCases={[
          { title: "Quick Math", description: "Perform everyday calculations like splitting bills, adding up grocery totals, or calculating tips without pulling out your phone's calculator app." },
          { title: "Shopping Budget", description: "Add up prices while shopping to stay within budget, calculate discounts, or compare product values per unit." },
          { title: "Home Projects", description: "Calculate measurements for DIY projects, determine material quantities, or split costs among project participants." },
          { title: "Student Homework", description: "Verify basic math homework answers, practice arithmetic operations, or double-check test calculations." }
        ]}
        tips={[
          { title: "Chain Calculations", description: "You can perform multiple operations in sequence. The calculator remembers previous results, letting you build complex calculations step by step." },
          { title: "Clear Function", description: "Press 'C' to clear all values and start fresh. The backspace button (⌫) removes the last digit for minor corrections." },
          { title: "Decimal Precision", description: "Use the decimal point (.) button for precise calculations. The calculator handles decimal operations accurately." },
          { title: "Order of Operations", description: "Operations are performed as you enter them, left to right. For complex calculations with precedence, consider breaking them into steps." }
        ]}
        faqs={[
          { question: "How do I correct a mistake?", answer: "Use the backspace button (⌫) to delete the last digit, or press 'C' to clear everything and start over." },
          { question: "Can I do multiple operations?", answer: "Yes! After entering an operation, the calculator continues with your result. For example: 5 + 3 = 8, then × 2 = 16." },
          { question: "What happens if I divide by zero?", answer: "Division by zero will result in 'Infinity' or 'NaN' (Not a Number) depending on the calculation. The calculator follows JavaScript math rules." },
          { question: "Does it remember previous calculations?", answer: "The calculator keeps the current result for chaining operations, but doesn't store a history. Write down important results before clearing." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default BasicCalculator;
