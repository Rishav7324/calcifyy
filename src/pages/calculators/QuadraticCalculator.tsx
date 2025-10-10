import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const QuadraticCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);
    
    if (aVal !== 0) {
      const discriminant = bVal * bVal - 4 * aVal * cVal;
      
      if (discriminant > 0) {
        const x1 = (-bVal + Math.sqrt(discriminant)) / (2 * aVal);
        const x2 = (-bVal - Math.sqrt(discriminant)) / (2 * aVal);
        setResult({ type: "two", x1: x1.toFixed(4), x2: x2.toFixed(4) });
      } else if (discriminant === 0) {
        const x = -bVal / (2 * aVal);
        setResult({ type: "one", x: x.toFixed(4) });
      } else {
        const realPart = (-bVal / (2 * aVal)).toFixed(4);
        const imagPart = (Math.sqrt(-discriminant) / (2 * aVal)).toFixed(4);
        setResult({ type: "complex", real: realPart, imag: imagPart });
      }
    }
  };

  return (
    <CalculatorLayout
      title="Quadratic Formula Calculator"
      description="Solve quadratic equations ax² + bx + c = 0"
      formula="x = [-b ± √(b² - 4ac)] / 2a"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>a</Label>
              <Input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="a"
              />
            </div>
            <div>
              <Label>b</Label>
              <Input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="b"
              />
            </div>
            <div>
              <Label>c</Label>
              <Input
                type="number"
                value={c}
                onChange={(e) => setC(e.target.value)}
                placeholder="c"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {a || "a"}x² + {b || "b"}x + {c || "c"} = 0
          </p>
          <Button onClick={calculate} className="w-full">
            Solve
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              {result.type === "two" && (
                <>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Solution 1</p>
                    <p className="text-3xl font-bold text-primary">x = {result.x1}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Solution 2</p>
                    <p className="text-3xl font-bold text-primary">x = {result.x2}</p>
                  </div>
                </>
              )}
              {result.type === "one" && (
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">One Solution</p>
                  <p className="text-3xl font-bold text-primary">x = {result.x}</p>
                </div>
              )}
              {result.type === "complex" && (
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Complex Solutions</p>
                  <p className="text-2xl font-bold text-primary">
                    x = {result.real} ± {result.imag}i
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default QuadraticCalculator;
