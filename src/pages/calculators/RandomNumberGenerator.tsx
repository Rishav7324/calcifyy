import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The Random Number Generator creates random numbers within a specified range using JavaScript's Math.random() function. You can generate single or multiple random numbers, making it useful for games, simulations, sampling, and decision-making. The generator ensures fair distribution across your defined minimum and maximum values."
        useCases={[
          { title: "Gaming & Entertainment", description: "Roll virtual dice, generate random loot, create random events, or simulate card draws for games and gambling simulations." },
          { title: "Statistical Sampling", description: "Select random samples from populations, generate random data for testing, or create random assignments for experiments and studies." },
          { title: "Decision Making", description: "Make random selections from options, choose lottery numbers, randomly order lists, or fairly assign tasks among team members." },
          { title: "Security & Testing", description: "Generate random test data, create random IDs or codes (not for cryptographic purposes), or simulate user behavior with random inputs." }
        ]}
        tips={[
          { title: "Not Cryptographically Secure", description: "This uses Math.random(), which is not cryptographically secure. Don't use for passwords, security tokens, or cryptographic keys. Use crypto.getRandomValues() for security purposes." },
          { title: "Range Inclusivity", description: "Both minimum and maximum values are inclusive. Generating between 1-10 can produce 1, 10, or any integer in between." },
          { title: "Multiple Numbers", description: "Generate up to 100 numbers at once. Perfect for batch sampling, creating test data sets, or running simulations with multiple random values." },
          { title: "Integer Only", description: "This generator produces whole numbers only. If you need decimals, use the minimum and maximum to scale a 0-1 random number: min + random() * (max - min)." }
        ]}
        faqs={[
          { question: "How random is this generator?", answer: "It uses Math.random(), which is a pseudo-random number generator (PRNG). It's suitable for games and simulations but not cryptographic applications. The sequence is deterministic but appears random." },
          { question: "Can numbers repeat?", answer: "Yes! Each generation is independent. When generating multiple numbers, you can get duplicates, just like rolling dice multiple times can produce the same number." },
          { question: "How do I generate decimals?", answer: "This tool generates integers. For decimals, multiply your range by 10, 100, etc., then divide results. Or use Math.random() * (max - min) + min in your own code." },
          { question: "Is this suitable for password generation?", answer: "No. For passwords or security tokens, use window.crypto.getRandomValues() which provides cryptographically secure random numbers. Math.random() is predictable given enough samples." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default RandomNumberGenerator;
