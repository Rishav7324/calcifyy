import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const ROICalculator = () => {
  const [investment, setInvestment] = useState("");
  const [returns, setReturns] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const inv = parseFloat(investment);
    const ret = parseFloat(returns);
    
    if (inv > 0) {
      const gain = ret - inv;
      const roi = (gain / inv) * 100;
      setResult({ roi: roi.toFixed(2), gain: gain.toFixed(2) });
    }
  };

  return (
    <CalculatorLayout
      title="ROI Calculator"
      description="Calculate your return on investment percentage"
      formula="ROI = (Gain - Cost) / Cost × 100%"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Investment Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Initial Investment ($)</Label>
              <Input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} placeholder="10000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Final Value ($)</Label>
              <Input type="number" value={returns} onChange={(e) => setReturns(e.target.value)} placeholder="15000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate ROI</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Return on Investment</div>
                <div className={`text-6xl font-bold ${parseFloat(result.roi) >= 0 ? 'text-green-400' : 'text-red-400'}`}>{result.roi}%</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground">Net Gain/Loss</div>
                  <div className={`text-2xl font-bold ${parseFloat(result.gain) >= 0 ? 'text-green-400' : 'text-red-400'}`}>${result.gain}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">📈</div><p>Enter details to calculate ROI</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default ROICalculator;
