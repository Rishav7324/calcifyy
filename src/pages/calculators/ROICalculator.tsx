import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The ROI (Return on Investment) Calculator measures the efficiency and profitability of an investment by comparing the gain or loss relative to the initial cost. ROI is expressed as a percentage, making it easy to compare different investments regardless of their size. A positive ROI indicates profit, while negative ROI shows a loss. It's one of the most important metrics in business and investment decision-making."
        useCases={[
          { title: "Investment Comparison", description: "Compare returns across different investments (stocks, bonds, real estate) to identify which opportunities offer the best value for your money." },
          { title: "Business Projects", description: "Evaluate whether projects, marketing campaigns, or business initiatives are worth the investment by calculating expected or actual ROI." },
          { title: "Real Estate Analysis", description: "Calculate returns on rental properties, house flips, or commercial real estate by comparing property value changes and rental income to initial costs." },
          { title: "Marketing ROI", description: "Measure effectiveness of advertising campaigns, social media spending, or marketing initiatives by comparing revenue generated to marketing costs." }
        ]}
        tips={[
          { title: "Include All Costs", description: "For accurate ROI, include all costs: purchase price, fees, taxes, maintenance, and operating expenses. Missing costs inflates your ROI calculation." },
          { title: "Time Consideration", description: "ROI doesn't account for time. A 20% return in 1 year is better than 20% over 5 years. Consider annualized ROI for time-based comparisons." },
          { title: "Positive vs Negative", description: "Positive ROI (gain > cost) shows profit. Negative ROI (loss) appears in red. Zero ROI means you broke even—no gain, no loss." },
          { title: "Multiple Returns", description: "For investments with ongoing returns (dividends, rent), calculate ROI at different points or use total accumulated returns for final value." }
        ]}
        faqs={[
          { question: "What's a good ROI percentage?", answer: "It varies by investment type. Stock market averages ~10% annually. Real estate ~8-12%. Marketing ROI should be positive, ideally 5:1 (500%) or better. Compare to similar investments in your industry." },
          { question: "How is ROI different from profit?", answer: "Profit is absolute dollar amount (gain - cost). ROI is relative percentage (gain/cost × 100%). ROI lets you compare investments of different sizes fairly." },
          { question: "Should I use ROI or annualized ROI?", answer: "Use simple ROI for short-term or single-period returns. Use annualized ROI to compare investments held for different time periods, as it accounts for the time value of money." },
          { question: "Does ROI account for risk?", answer: "No. ROI only measures return, not risk. A high-ROI investment might be very risky. Consider risk-adjusted metrics (Sharpe Ratio) or diversification for complete analysis." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default ROICalculator;
