import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const FinanceCalculator = () => {
  const [calcType, setCalcType] = useState("future-value");
  const [presentValue, setPresentValue] = useState("");
  const [rate, setRate] = useState("");
  const [periods, setPeriods] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const pv = parseFloat(presentValue);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(periods);

    let calculatedResult = 0;
    
    if (calcType === "future-value") {
      calculatedResult = pv * Math.pow(1 + r, n);
    } else if (calcType === "present-value") {
      calculatedResult = pv / Math.pow(1 + r, n);
    }

    setResult(calculatedResult);
  };

  return (
    <CalculatorLayout
      title="Finance Calculator"
      description="General finance calculations"
      formula="FV = PV × (1 + r)^n"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Calculation Type</Label>
            <Select value={calcType} onValueChange={setCalcType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="future-value">Future Value</SelectItem>
                <SelectItem value="present-value">Present Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{calcType === "future-value" ? "Present Value ($)" : "Future Value ($)"}</Label>
            <Input
              type="number"
              value={presentValue}
              onChange={(e) => setPresentValue(e.target.value)}
              placeholder="10000"
            />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="5"
              step="0.1"
            />
          </div>
          <div>
            <Label>Number of Periods</Label>
            <Input
              type="number"
              value={periods}
              onChange={(e) => setPeriods(e.target.value)}
              placeholder="10"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
          {result !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {calcType === "future-value" ? "Future Value" : "Present Value"}
              </p>
              <p className="text-4xl font-bold text-primary">${result.toFixed(2)}</p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default FinanceCalculator;