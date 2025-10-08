import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const SIPCalculator = () => {
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (p > 0 && r > 0 && n > 0) {
      const futureValue = p * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const invested = p * n;
      const returns = futureValue - invested;

      setResult({
        futureValue: futureValue.toFixed(2),
        invested: invested.toFixed(2),
        returns: returns.toFixed(2),
      });
    }
  };

  return (
    <CalculatorLayout
      title="SIP Calculator"
      description="Calculate Systematic Investment Plan returns"
      formula="FV = P × {[(1 + r)^n - 1] / r} × (1 + r)"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">SIP Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Monthly Investment ($)</Label>
              <Input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="5000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Expected Return Rate (% p.a.)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="12" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Time Period (Years)</Label>
              <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="10" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate SIP</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Future Value</div>
                <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">${result.futureValue}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground">Total Invested</div>
                  <div className="text-2xl font-bold text-primary">${result.invested}</div>
                </div>
                <div className="p-4 rounded-lg glass-card border border-green-500/20">
                  <div className="text-sm text-muted-foreground">Estimated Returns</div>
                  <div className="text-2xl font-bold text-green-400">${result.returns}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">📊</div><p>Enter details to calculate SIP</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default SIPCalculator;
