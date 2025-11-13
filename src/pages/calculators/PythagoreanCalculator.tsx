import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const PythagoreanCalculator = () => {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [hypotenuse, setHypotenuse] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    
    if (a > 0 && b > 0) {
      const c = Math.sqrt(a * a + b * b);
      setHypotenuse(c);
    }
  };

  return (
    <CalculatorLayout
      title="Pythagorean Theorem Calculator"
      description="Calculate the hypotenuse of a right triangle"
      formula="c² = a² + b²"
      explanation="The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Side a</Label>
              <Input
                type="number"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                placeholder="Enter side a"
              />
            </div>
            <div>
              <Label>Side b</Label>
              <Input
                type="number"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                placeholder="Enter side b"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Hypotenuse
          </Button>
          {hypotenuse !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Hypotenuse (c)</p>
              <p className="text-4xl font-bold text-primary">{hypotenuse.toFixed(2)}</p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Pythagorean Theorem Calculator solves for the hypotenuse of a right triangle using the famous theorem: a² + b² = c². Discovered by the ancient Greek mathematician Pythagoras, this fundamental geometric principle relates the lengths of the sides in any right triangle. It's one of the most important formulas in mathematics, with applications ranging from construction to navigation."
        useCases={[
          { title: "Construction & Carpentry", description: "Ensure corners are perfectly square (90°) by checking if measurements follow the 3-4-5 rule or other Pythagorean triples. Essential for framing and foundation work." },
          { title: "Distance Calculation", description: "Calculate straight-line distances on maps or coordinate systems. Find the shortest path between two points when you know horizontal and vertical distances." },
          { title: "Navigation & Surveying", description: "Determine diagonal distances in land surveying, calculate travel distances accounting for elevation changes, or plot navigation courses." },
          { title: "Engineering & Design", description: "Calculate diagonal bracing lengths, determine cable or support beam lengths, and solve structural engineering problems involving right triangles." }
        ]}
        tips={[
          { title: "Pythagorean Triples", description: "Common integer solutions: 3-4-5, 5-12-13, 8-15-17, 7-24-25. Multiples also work (6-8-10, 9-12-15). Memorize these for quick mental calculations." },
          { title: "Unit Consistency", description: "All sides must use the same units. Convert everything to the same unit (meters, feet, inches) before calculating to avoid errors." },
          { title: "Right Angle Verification", description: "The theorem only works for right triangles (one 90° angle). Verify your triangle has a right angle before applying this formula." },
          { title: "Decimal Precision", description: "Results display to 2 decimal places. For construction, round to practical measurements. For technical work, use more decimal places if needed." }
        ]}
        faqs={[
          { question: "Does this work for all triangles?", answer: "No, only right triangles (triangles with one 90° angle). For other triangles, use the Law of Cosines or other trigonometric formulas." },
          { question: "Can I find a leg instead of the hypotenuse?", answer: "Yes! Rearrange the formula: a = √(c² - b²). If you know the hypotenuse and one leg, you can find the other leg using this variation." },
          { question: "What's the 3-4-5 rule in construction?", answer: "A practical application: measure 3 feet one way, 4 feet perpendicular, and if the diagonal is exactly 5 feet, your corner is square (90°). Scales to any multiple (6-8-10, etc.)." },
          { question: "Why is the hypotenuse always the longest side?", answer: "In a right triangle, the hypotenuse (opposite the right angle) is always the longest side. This is proven by the Pythagorean theorem: c² = a² + b², so c must be larger than either a or b." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default PythagoreanCalculator;
