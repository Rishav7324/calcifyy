import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const TimeZoneCalculator = () => {
  const [time, setTime] = useState("");
  const [fromZone, setFromZone] = useState("0");
  const [toZone, setToZone] = useState("0");
  const [result, setResult] = useState("");

  const zones = [
    { value: "-12", label: "UTC-12:00" },
    { value: "-11", label: "UTC-11:00" },
    { value: "-10", label: "UTC-10:00" },
    { value: "-9", label: "UTC-09:00" },
    { value: "-8", label: "UTC-08:00 (PST)" },
    { value: "-7", label: "UTC-07:00 (MST)" },
    { value: "-6", label: "UTC-06:00 (CST)" },
    { value: "-5", label: "UTC-05:00 (EST)" },
    { value: "-4", label: "UTC-04:00" },
    { value: "0", label: "UTC+00:00 (GMT)" },
    { value: "1", label: "UTC+01:00" },
    { value: "2", label: "UTC+02:00" },
    { value: "5.5", label: "UTC+05:30 (IST)" },
    { value: "8", label: "UTC+08:00" },
    { value: "9", label: "UTC+09:00" },
    { value: "12", label: "UTC+12:00" },
  ];

  const convert = () => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const offset = (parseFloat(toZone) - parseFloat(fromZone)) * 60;
    const newTotalMinutes = (totalMinutes + offset + 1440) % 1440;
    const newHours = Math.floor(newTotalMinutes / 60);
    const newMinutes = newTotalMinutes % 60;
    setResult(`${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`);
  };

  return (
    <CalculatorLayout
      title="Time Zone Calculator"
      description="Convert time between different time zones worldwide"
      explanation="This calculator helps you convert time from one time zone to another, accounting for the time difference in hours."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Time (24-hour format)</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <Label>From Time Zone</Label>
            <Select value={fromZone} onValueChange={setFromZone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {zones.map(zone => (
                  <SelectItem key={zone.value} value={zone.value}>{zone.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>To Time Zone</Label>
            <Select value={toZone} onValueChange={setToZone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {zones.map(zone => (
                  <SelectItem key={zone.value} value={zone.value}>{zone.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={convert} className="w-full">
            Convert Time
          </Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-3xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default TimeZoneCalculator;
