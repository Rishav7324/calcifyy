import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const PaceCalculator = () => {
  const [distance, setDistance] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [unit, setUnit] = useState("km");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const d = parseFloat(distance);
    const totalSeconds = parseInt(hours || "0") * 3600 + parseInt(minutes || "0") * 60 + parseInt(seconds || "0");
    
    if (d > 0 && totalSeconds > 0) {
      const paceSeconds = totalSeconds / d;
      const paceMinutes = Math.floor(paceSeconds / 60);
      const paceSecs = Math.floor(paceSeconds % 60);
      const speed = (d / totalSeconds) * 3600;
      
      setResult({
        pace: `${paceMinutes}:${paceSecs.toString().padStart(2, '0')}`,
        speed: speed.toFixed(2)
      });
    }
  };

  return (
    <CalculatorLayout
      title="Pace Calculator"
      description="Calculate running/walking pace and speed"
      formula="Pace = Time ÷ Distance"
      explanation="This calculator helps runners and walkers determine their pace per mile or kilometer based on total time and distance."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Distance</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="10"
                className="flex-1"
              />
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">km</SelectItem>
                  <SelectItem value="miles">miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Time</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Hours"
              />
              <Input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Minutes"
              />
              <Input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="Seconds"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calculate Pace</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Pace per {unit}</p>
                <p className="text-4xl font-bold text-primary">{result.pace}</p>
                <p className="text-sm text-muted-foreground mt-1">min/{unit}</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded">
                <p className="text-sm text-muted-foreground">Average Speed</p>
                <p className="text-2xl font-bold">{result.speed} {unit}/h</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default PaceCalculator;
