import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const DiceRoller = () => {
  const [numDice, setNumDice] = useState("1");
  const [sides, setSides] = useState("6");
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const roll = () => {
    const dice = parseInt(numDice);
    const numSides = parseInt(sides);
    const rolls: number[] = [];
    
    for (let i = 0; i < dice; i++) {
      rolls.push(Math.floor(Math.random() * numSides) + 1);
    }
    
    setResults(rolls);
    setTotal(rolls.reduce((a, b) => a + b, 0));
  };

  return (
    <CalculatorLayout
      title="Dice Roller"
      description="Roll virtual dice with customizable sides"
      explanation="This tool simulates rolling dice with any number of sides. Perfect for games, decision making, or random number generation."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Number of Dice</Label>
            <Input
              type="number"
              value={numDice}
              onChange={(e) => setNumDice(e.target.value)}
              placeholder="1"
              min="1"
              max="20"
            />
          </div>
          <div>
            <Label>Sides per Die</Label>
            <Select value={sides} onValueChange={setSides}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">D4 (4 sides)</SelectItem>
                <SelectItem value="6">D6 (6 sides)</SelectItem>
                <SelectItem value="8">D8 (8 sides)</SelectItem>
                <SelectItem value="10">D10 (10 sides)</SelectItem>
                <SelectItem value="12">D12 (12 sides)</SelectItem>
                <SelectItem value="20">D20 (20 sides)</SelectItem>
                <SelectItem value="100">D100 (100 sides)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={roll} className="w-full">
            🎲 Roll Dice
          </Button>
          {results.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Results:</p>
                <div className="flex flex-wrap gap-2">
                  {results.map((result, idx) => (
                    <span key={idx} className="text-3xl font-bold text-primary px-4 py-2 bg-background/50 rounded-lg">
                      {result}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-secondary/10 rounded">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-4xl font-bold">{total}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default DiceRoller;
