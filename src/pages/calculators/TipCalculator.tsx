import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [people, setPeople] = useState("1");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent);
    const numPeople = parseInt(people);
    
    if (!isNaN(billAmount) && !isNaN(tip) && numPeople > 0) {
      const tipAmount = (billAmount * tip) / 100;
      const total = billAmount + tipAmount;
      const perPerson = total / numPeople;
      const tipPerPerson = tipAmount / numPeople;
      
      setResult({ tipAmount, total, perPerson, tipPerPerson });
    }
  };

  return (
    <CalculatorLayout
      title="Tip Calculator"
      description="Calculate tip amount and split bill among multiple people"
      formula="Tip Amount = Bill × (Tip% ÷ 100)"
      explanation="This calculator helps you determine how much to tip and how to split the total bill including tip among multiple people."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Bill Amount ($)</Label>
            <Input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="Enter bill amount"
            />
          </div>
          <div>
            <Label>Tip Percentage (%)</Label>
            <Input
              type="number"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              placeholder="Enter tip percentage"
            />
          </div>
          <div>
            <Label>Number of People</Label>
            <Input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="Number of people"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Tip
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-xl font-bold text-primary">Tip Amount: ${result.tipAmount.toFixed(2)}</p>
                <p className="text-2xl font-bold text-primary mt-2">Total: ${result.total.toFixed(2)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Per Person</p>
                  <p className="text-xl font-bold">${result.perPerson.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Tip Per Person</p>
                  <p className="text-xl font-bold">${result.tipPerPerson.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default TipCalculator;
