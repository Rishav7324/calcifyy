import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const FuelCostCalculator = () => {
  const [distance, setDistance] = useState("");
  const [mpg, setMpg] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const dist = parseFloat(distance);
    const milesPerGallon = parseFloat(mpg);
    const price = parseFloat(fuelPrice);
    
    const fuelNeeded = dist / milesPerGallon;
    const totalCost = fuelNeeded * price;
    const costPerMile = totalCost / dist;

    setResult({
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerMile: costPerMile.toFixed(3)
    });
  };

  return (
    <CalculatorLayout
      title="Fuel Cost Calculator"
      description="Calculate trip fuel costs"
      formula="Cost = (Distance / MPG) × Fuel Price"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Trip Distance (miles)</Label>
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="300"
            />
          </div>
          <div>
            <Label>Vehicle MPG</Label>
            <Input
              type="number"
              value={mpg}
              onChange={(e) => setMpg(e.target.value)}
              placeholder="30"
              step="0.1"
            />
          </div>
          <div>
            <Label>Fuel Price ($/gallon)</Label>
            <Input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder="3.50"
              step="0.01"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Cost
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Fuel Cost</p>
                <p className="text-4xl font-bold text-primary">${result.totalCost}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Fuel Needed</p>
                  <p className="text-xl font-bold">{result.fuelNeeded} gal</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Cost Per Mile</p>
                  <p className="text-xl font-bold">${result.costPerMile}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default FuelCostCalculator;