import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The SIP (Systematic Investment Plan) Calculator helps you project returns from regular, fixed investments in mutual funds or other market-linked instruments. SIP is a disciplined investment approach where you invest a fixed amount at regular intervals (typically monthly), regardless of market conditions. This strategy leverages rupee-cost averaging and the power of compounding to build wealth over time. By investing consistently through market ups and downs, you buy more units when prices are low and fewer when high, potentially reducing average cost per unit and maximizing long-term returns."
        useCases={[
          { title: "Mutual Fund Planning", description: "Calculate potential returns from monthly mutual fund SIP investments to plan for long-term wealth creation and retirement." },
          { title: "Goal-Based Investing", description: "Determine the SIP amount needed to reach specific financial goals like buying a house, funding education, or building retirement corpus." },
          { title: "Investment Comparison", description: "Compare SIP returns with lump sum investments or other investment vehicles to make informed allocation decisions." },
          { title: "Market Entry Strategy", description: "Plan systematic market entry with SIPs to average out market volatility and reduce timing risk compared to lump sum investments." }
        ]}
        tips={[
          { title: "Power of Consistency", description: "SIP's biggest advantage is discipline. Investing monthly regardless of market conditions removes emotional decision-making and ensures you participate in market growth over time." },
          { title: "Start Early, Stay Long", description: "SIP benefits compound exponentially over time. A 20-year SIP significantly outperforms a 10-year SIP due to compounding. Start as early as possible, even with small amounts." },
          { title: "Rupee Cost Averaging", description: "SIP automatically implements rupee-cost averaging - buying more units when markets are down and fewer when up. This can lower your average purchase cost over time." },
          { title: "Step-Up Your SIP", description: "Increase SIP amounts annually by 5-10% to keep pace with salary increases and inflation. Small annual increases dramatically boost final corpus without lifestyle impact." },
          { title: "Stay Invested Through Volatility", description: "Don't stop SIP during market downturns. These periods offer the best buying opportunities. Stopping SIP during corrections defeats the purpose of rupee-cost averaging." }
        ]}
        faqs={[
          { question: "What return rate should I expect from SIP?", answer: "Equity mutual funds have historically returned 12-15% annually over 10+ year periods in India, though past performance doesn't guarantee future results. Debt funds typically return 7-9%. Use conservative estimates (10-12% for equity) for planning. Actual returns vary based on market conditions and fund selection." },
          { question: "Is SIP better than lump sum investment?", answer: "SIP is generally better for regular income earners as it enables disciplined investing without timing the market. Lump sum can outperform if invested at market lows, but timing the market consistently is difficult. SIP reduces timing risk through averaging, making it ideal for most investors." },
          { question: "Can I skip SIP installments?", answer: "While you can technically skip, doing so defeats SIP's purpose. Consistent investing is key to rupee-cost averaging and compounding benefits. If cash flow is tight, reduce SIP amount rather than skipping entirely. Missing installations during market dips costs you valuable low-priced units." },
          { question: "When should I stop or withdraw my SIP?", answer: "Continue SIP until you reach your goal or need the money. For long-term goals like retirement, consider Systematic Withdrawal Plans (SWP) upon retirement. Avoid stopping during market downturns. If goals change, redirect to different funds rather than stopping altogether." },
          { question: "How do I choose SIP amount?", answer: "Start with what you can comfortably afford - even ₹500-1,000 monthly makes a difference. A common approach is 15-20% of monthly income for long-term goals. Use the calculator to determine SIP amount needed for specific goals, then adjust to fit your budget. Commit to annual increases." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default SIPCalculator;
