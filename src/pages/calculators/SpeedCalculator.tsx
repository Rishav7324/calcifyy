import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const SpeedCalculator = () => {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [timeUnit, setTimeUnit] = useState("hours");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let d = parseFloat(distance);
    let t = parseFloat(time);
    
    // Convert to km and hours
    if (distanceUnit === "miles") d = d * 1.60934;
    else if (distanceUnit === "meters") d = d / 1000;
    
    if (timeUnit === "minutes") t = t / 60;
    else if (timeUnit === "seconds") t = t / 3600;
    
    if (d > 0 && t > 0) {
      const speed = d / t;
      setResult({
        kmh: speed.toFixed(2),
        mph: (speed / 1.60934).toFixed(2),
        ms: (speed / 3.6).toFixed(2)
      });
    }
  };

  return (
    <CalculatorLayout
      title="Speed Calculator"
      description="Calculate speed from distance and time"
      formula="Speed = Distance ÷ Time"
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
                placeholder="Enter distance"
                className="flex-1"
              />
              <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">km</SelectItem>
                  <SelectItem value="miles">miles</SelectItem>
                  <SelectItem value="meters">meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Time</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter time"
                className="flex-1"
              />
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">hours</SelectItem>
                  <SelectItem value="minutes">minutes</SelectItem>
                  <SelectItem value="seconds">seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calculate Speed</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Speed (km/h)</p>
                <p className="text-4xl font-bold text-primary">{result.kmh}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">mph</p>
                  <p className="text-xl font-bold">{result.mph}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">m/s</p>
                  <p className="text-xl font-bold">{result.ms}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default SpeedCalculator;
