import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The Quadratic Formula Calculator solves quadratic equations of the form ax² + bx + c = 0 using the quadratic formula: x = [-b ± √(b² - 4ac)] / 2a. It handles all cases: two distinct real solutions, one repeated solution, and complex (imaginary) solutions. The discriminant (b² - 4ac) determines the nature and number of solutions."
        useCases={[
          { title: "Algebra & Mathematics", description: "Solve quadratic equations in homework, verify algebraic solutions, and understand the relationship between coefficients and solution types." },
          { title: "Physics Problems", description: "Calculate projectile motion paths, determine time to reach maximum height or ground impact, and solve acceleration/velocity problems involving squared terms." },
          { title: "Engineering Applications", description: "Analyze parabolic structures, optimize designs with quadratic constraints, and solve electrical circuit problems involving resonance." },
          { title: "Business & Economics", description: "Find break-even points, maximize profit functions, determine optimal pricing strategies when relationships are quadratic." }
        ]}
        tips={[
          { title: "Discriminant Interpretation", description: "If b² - 4ac > 0: two real solutions. If = 0: one solution (repeated root). If < 0: two complex conjugate solutions. Check discriminant before solving." },
          { title: "Sign Attention", description: "Pay careful attention to negative signs. The 'b' term in the formula is negative: -b. Don't lose track of signs when substituting values." },
          { title: "Coefficient 'a' Cannot Be Zero", description: "If a = 0, the equation becomes linear (bx + c = 0), not quadratic. The calculator requires a ≠ 0 for valid quadratic equations." },
          { title: "Complex Solutions", description: "Complex solutions (with 'i') appear when the parabola doesn't cross the x-axis. These are still valid mathematical solutions, commonly used in engineering." }
        ]}
        faqs={[
          { question: "What do complex solutions mean?", answer: "Complex solutions contain 'i' (√-1). They appear when the discriminant is negative, meaning the parabola doesn't intersect the x-axis. They're essential in engineering and advanced mathematics." },
          { question: "When do I get only one solution?", answer: "One solution occurs when the discriminant equals zero (b² - 4ac = 0). This means the parabola touches the x-axis at exactly one point (the vertex)." },
          { question: "Can quadratics have more than 2 solutions?", answer: "No. The fundamental theorem of algebra guarantees a quadratic equation (degree 2) has exactly 2 solutions (counting multiplicity). They may be real, repeated, or complex." },
          { question: "How do I check my answer?", answer: "Substitute solutions back into the original equation. If ax² + bx + c = 0 (or very close to 0 allowing for rounding), your solution is correct." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default QuadraticCalculator;
