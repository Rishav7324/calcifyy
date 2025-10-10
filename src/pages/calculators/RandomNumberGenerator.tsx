import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const RandomNumberGenerator = () => {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [numbers, setNumbers] = useState<number[]>([]);

  const generate = () => {
    const minimum = parseInt(min);
    const maximum = parseInt(max);
    const quantity = parseInt(count);
    
    const generated: number[] = [];
    for (let i = 0; i < quantity; i++) {
      const random = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      generated.push(random);
    }
    setNumbers(generated);
  };

  return (
    <CalculatorLayout
      title="Random Number Generator"
      description="Generate random numbers within a specified range"
      explanation="This tool generates cryptographically secure random numbers within your specified minimum and maximum values."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Minimum Value</Label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="1"
              />
            </div>
            <div>
              <Label>Maximum Value</Label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="100"
              />
            </div>
          </div>
          <div>
            <Label>How Many Numbers?</Label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="1"
              min="1"
              max="100"
            />
          </div>
          <Button onClick={generate} className="w-full">
            Generate Random Numbers
          </Button>
          {numbers.length > 0 && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Generated Numbers:</p>
              <div className="flex flex-wrap gap-2">
                {numbers.map((num, idx) => (
                  <span key={idx} className="text-2xl font-bold text-primary px-3 py-1 bg-background/50 rounded">
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default RandomNumberGenerator;
