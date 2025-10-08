import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const SWPCalculator = () => {
  const [investment, setInvestment] = useState("");
  const [withdrawal, setWithdrawal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(investment);
    const w = parseFloat(withdrawal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (p > 0 && w > 0 && n > 0) {
      let balance = p;
      let totalWithdrawn = 0;

      for (let i = 0; i < n; i++) {
        balance = balance * (1 + r) - w;
        totalWithdrawn += w;
        if (balance < 0) break;
      }

      setResult({
        finalBalance: Math.max(0, balance).toFixed(2),
        totalWithdrawn: totalWithdrawn.toFixed(2),
        monthsLasted: balance >= 0 ? n : Math.floor(totalWithdrawn / w),
      });
    }
  };

  return (
    <CalculatorLayout
      title="SWP Calculator"
      description="Calculate Systematic Withdrawal Plan sustainability"
      formula="Balance(n) = Balance(n-1) × (1 + r) - W"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">SWP Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Initial Investment ($)</Label>
              <Input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} placeholder="100000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Monthly Withdrawal ($)</Label>
              <Input type="number" value={withdrawal} onChange={(e) => setWithdrawal(e.target.value)} placeholder="2000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Expected Return (% p.a.)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Time Period (Years)</Label>
              <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="15" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate SWP</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Final Balance</div>
                <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">${result.finalBalance}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground">Total Withdrawn</div>
                  <div className="text-2xl font-bold text-primary">${result.totalWithdrawn}</div>
                </div>
                <div className="p-4 rounded-lg glass-card border border-secondary/20">
                  <div className="text-sm text-muted-foreground">Months Lasted</div>
                  <div className="text-2xl font-bold text-secondary">{result.monthsLasted} months</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💸</div><p>Enter details to calculate SWP</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default SWPCalculator;
