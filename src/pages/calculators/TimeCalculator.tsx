import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const TimeCalculator = () => {
  const [hours1, setHours1] = useState("");
  const [minutes1, setMinutes1] = useState("");
  const [hours2, setHours2] = useState("");
  const [minutes2, setMinutes2] = useState("");
  const [result, setResult] = useState<string>("");

  const addTime = () => {
    const h = parseInt(hours1 || "0") + parseInt(hours2 || "0");
    const m = parseInt(minutes1 || "0") + parseInt(minutes2 || "0");
    const totalHours = h + Math.floor(m / 60);
    const totalMinutes = m % 60;
    setResult(`${totalHours} hours ${totalMinutes} minutes`);
  };

  const subtractTime = () => {
    const totalMin1 = parseInt(hours1 || "0") * 60 + parseInt(minutes1 || "0");
    const totalMin2 = parseInt(hours2 || "0") * 60 + parseInt(minutes2 || "0");
    const diff = Math.abs(totalMin1 - totalMin2);
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    setResult(`${h} hours ${m} minutes`);
  };

  return (
    <CalculatorLayout
      title="Time Calculator"
      description="Add or subtract time durations in hours and minutes"
      explanation="This calculator helps you perform addition and subtraction operations with time values."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Time 1 - Hours</Label>
              <Input
                type="number"
                value={hours1}
                onChange={(e) => setHours1(e.target.value)}
                placeholder="Hours"
              />
            </div>
            <div>
              <Label>Time 1 - Minutes</Label>
              <Input
                type="number"
                value={minutes1}
                onChange={(e) => setMinutes1(e.target.value)}
                placeholder="Minutes"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Time 2 - Hours</Label>
              <Input
                type="number"
                value={hours2}
                onChange={(e) => setHours2(e.target.value)}
                placeholder="Hours"
              />
            </div>
            <div>
              <Label>Time 2 - Minutes</Label>
              <Input
                type="number"
                value={minutes2}
                onChange={(e) => setMinutes2(e.target.value)}
                placeholder="Minutes"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={addTime}>Add Time</Button>
            <Button onClick={subtractTime} variant="secondary">Subtract Time</Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default TimeCalculator;
