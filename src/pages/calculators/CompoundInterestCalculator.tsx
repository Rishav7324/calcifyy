import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (p > 0 && r > 0 && t > 0) {
      const amount = p * Math.pow(1 + r / n, n * t);
      const interest = amount - p;

      setResult({
        finalAmount: amount.toFixed(2),
        interest: interest.toFixed(2),
      });
    }
  };

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate compound interest growth over time"
      formula="A = P(1 + r/n)^(nt)"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Investment Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Principal Amount ($)</Label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Annual Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Time Period (Years)</Label>
              <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="10" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Compound Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-Annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Final Amount</div>
                <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">${result.finalAmount}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground">Total Interest Earned</div>
                  <div className="text-2xl font-bold text-green-400">${result.interest}</div>
                </div>
                <div className="p-4 rounded-lg glass-card border border-secondary/20">
                  <div className="text-sm text-muted-foreground">Principal Amount</div>
                  <div className="text-2xl font-bold text-secondary">${principal}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💰</div><p>Enter details to calculate</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculator;
