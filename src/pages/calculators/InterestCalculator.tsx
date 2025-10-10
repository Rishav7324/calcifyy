import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("simple");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    
    if (p > 0 && r > 0 && t > 0) {
      let interest, total;
      
      if (type === "simple") {
        interest = p * r * t;
        total = p + interest;
      } else {
        total = p * Math.pow(1 + r, t);
        interest = total - p;
      }
      
      setResult({
        interest: interest.toFixed(2),
        total: total.toFixed(2)
      });
    }
  };

  return (
    <CalculatorLayout
      title="Interest Calculator"
      description="Calculate simple or compound interest"
      formula="Simple: I = P×r×t | Compound: A = P(1+r)^t"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Investment Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Interest Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple Interest</SelectItem>
                  <SelectItem value="compound">Compound Interest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Principal Amount ($)</Label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Annual Interest Rate (%)</Label>
              <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Time Period (years)</Label>
              <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="10" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate Interest</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Total Amount</div>
                <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent">${result.total}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Interest Earned</div>
                <div className="text-2xl font-bold text-green-400">${result.interest}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💵</div><p>Enter details</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default InterestCalculator;
