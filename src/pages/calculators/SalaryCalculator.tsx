import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";

const SalaryCalculator = () => {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("annual");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const salary = parseFloat(amount);
    
    if (salary > 0) {
      let annual = salary;
      if (period === "monthly") annual = salary * 12;
      else if (period === "biweekly") annual = salary * 26;
      else if (period === "weekly") annual = salary * 52;
      else if (period === "hourly") annual = salary * 2080;
      
      setResult({
        annual: annual.toFixed(2),
        monthly: (annual / 12).toFixed(2),
        biweekly: (annual / 26).toFixed(2),
        weekly: (annual / 52).toFixed(2),
        daily: (annual / 260).toFixed(2),
        hourly: (annual / 2080).toFixed(2)
      });
    }
  };

  return (
    <CalculatorLayout
      title="Salary Calculator"
      description="Convert salary between different time periods"
      explanation="This calculator converts your salary between annual, monthly, weekly, and hourly rates."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Salary Input</h2>
          <div className="space-y-6">
            <CurrencySelector value={currency} onChange={setCurrency} />
            
            <div>
              <Label>Salary Amount ({getCurrencySymbol(currency)})</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="60000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Time Period</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Breakdown</h2>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Annual</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.annual}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Monthly</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.monthly}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Bi-weekly</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.biweekly}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Weekly</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.weekly}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Daily</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.daily}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Hourly</div>
                <div className="text-2xl font-bold">{getCurrencySymbol(currency)}{result.hourly}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💵</div><p>Enter salary</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default SalaryCalculator;
