import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperation = (op: string) => {
    setDisplay(display + " " + op + " ");
  };

  const calculate = () => {
    try {
      const result = eval(display.replace("×", "*").replace("÷", "/"));
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  const clear = () => setDisplay("0");

  const scientific = (func: string) => {
    const val = parseFloat(display);
    let result = 0;
    switch (func) {
      case "sin":
        result = Math.sin(val * (Math.PI / 180));
        break;
      case "cos":
        result = Math.cos(val * (Math.PI / 180));
        break;
      case "tan":
        result = Math.tan(val * (Math.PI / 180));
        break;
      case "sqrt":
        result = Math.sqrt(val);
        break;
      case "log":
        result = Math.log10(val);
        break;
      case "ln":
        result = Math.log(val);
        break;
      case "x²":
        result = val * val;
        break;
    }
    setDisplay(result.toString());
  };

  return (
    <CalculatorLayout
      title="Scientific Calculator"
      description="Advanced calculator with trigonometric, logarithmic, and exponential functions"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="bg-background/80 p-4 rounded-lg text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
            {display}
          </div>
          <div className="grid grid-cols-5 gap-2">
            <Button onClick={() => scientific("sin")} variant="secondary">sin</Button>
            <Button onClick={() => scientific("cos")} variant="secondary">cos</Button>
            <Button onClick={() => scientific("tan")} variant="secondary">tan</Button>
            <Button onClick={() => scientific("sqrt")} variant="secondary">√</Button>
            <Button onClick={() => scientific("x²")} variant="secondary">x²</Button>
            
            <Button onClick={() => scientific("log")} variant="secondary">log</Button>
            <Button onClick={() => scientific("ln")} variant="secondary">ln</Button>
            <Button onClick={() => handleNumber("(")} variant="outline">(</Button>
            <Button onClick={() => handleNumber(")")} variant="outline">)</Button>
            <Button onClick={clear} variant="destructive">C</Button>

            <Button onClick={() => handleNumber("7")}>7</Button>
            <Button onClick={() => handleNumber("8")}>8</Button>
            <Button onClick={() => handleNumber("9")}>9</Button>
            <Button onClick={() => handleOperation("÷")} variant="outline">÷</Button>
            <Button onClick={() => handleOperation("×")} variant="outline">×</Button>

            <Button onClick={() => handleNumber("4")}>4</Button>
            <Button onClick={() => handleNumber("5")}>5</Button>
            <Button onClick={() => handleNumber("6")}>6</Button>
            <Button onClick={() => handleOperation("-")} variant="outline">-</Button>
            <Button onClick={() => handleOperation("+")} variant="outline">+</Button>

            <Button onClick={() => handleNumber("1")}>1</Button>
            <Button onClick={() => handleNumber("2")}>2</Button>
            <Button onClick={() => handleNumber("3")}>3</Button>
            <Button onClick={() => handleNumber(".")}>.</Button>
            <Button onClick={calculate} className="row-span-2 bg-primary">=</Button>

            <Button onClick={() => handleNumber("0")} className="col-span-2">0</Button>
            <Button onClick={() => setDisplay(display.slice(0, -1))} variant="outline">⌫</Button>
          </div>
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default ScientificCalculator;
