import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const RentCalculator = () => {
  const [income, setIncome] = useState("");
  const [utilities, setUtilities] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const monthlyIncome = parseFloat(income);
    const monthlyUtilities = parseFloat(utilities) || 0;
    
    const maxRent = monthlyIncome * 0.30;
    const rentWithUtilities = maxRent - monthlyUtilities;
    const annualRent = rentWithUtilities * 12;

    setResult({
      maxRent: maxRent.toFixed(2),
      afterUtilities: rentWithUtilities.toFixed(2),
      annualCost: annualRent.toFixed(2)
    });
  };

  return (
    <CalculatorLayout
      title="Rent Calculator"
      description="Calculate affordable monthly rent"
      formula="30% of monthly income rule"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Monthly Income ($)</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="4000"
            />
          </div>
          <div>
            <Label>Monthly Utilities ($)</Label>
            <Input
              type="number"
              value={utilities}
              onChange={(e) => setUtilities(e.target.value)}
              placeholder="150"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Rent
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Affordable Rent (Before Utilities)</p>
                <p className="text-4xl font-bold text-primary">${result.maxRent}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">After Utilities</p>
                  <p className="text-xl font-bold">${result.afterUtilities}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Annual Cost</p>
                  <p className="text-xl font-bold">${result.annualCost}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default RentCalculator;