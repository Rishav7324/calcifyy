import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const MileageCalculator = () => {
  const [distance, setDistance] = useState("");
  const [fuel, setFuel] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const dist = parseFloat(distance);
    const fuelUsed = parseFloat(fuel);
    
    const mpg = dist / fuelUsed;
    const kml = mpg * 0.425144;
    const lp100km = 235.215 / mpg;

    setResult({
      mpg: mpg.toFixed(2),
      kml: kml.toFixed(2),
      lp100km: lp100km.toFixed(2)
    });
  };

  return (
    <CalculatorLayout
      title="Mileage Calculator"
      description="Calculate fuel efficiency (MPG)"
      formula="MPG = Distance / Fuel Used"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Distance Traveled (miles)</Label>
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="300"
            />
          </div>
          <div>
            <Label>Fuel Used (gallons)</Label>
            <Input
              type="number"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              placeholder="10"
              step="0.1"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Mileage
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Miles Per Gallon</p>
                <p className="text-4xl font-bold text-primary">{result.mpg} MPG</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Kilometers/Liter</p>
                  <p className="text-xl font-bold">{result.kml} km/L</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Liters/100km</p>
                  <p className="text-xl font-bold">{result.lp100km} L/100km</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default MileageCalculator;