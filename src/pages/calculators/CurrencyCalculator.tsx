import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<string | null>(null);

  // Static exchange rates (in production, fetch from API)
  const rates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    JPY: 149.50,
    AUD: 1.52,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.24,
  };

  const calculate = () => {
    const amt = parseFloat(amount);
    if (amt > 0) {
      const usdAmount = amt / rates[fromCurrency];
      const converted = usdAmount * rates[toCurrency];
      setResult(converted.toFixed(2));
    }
  };

  const currencies = Object.keys(rates);

  return (
    <CalculatorLayout
      title="Currency Converter"
      description="Convert between major world currencies"
      formula="Converted Amount = Amount × (To Rate / From Rate)"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Convert Currency</h2>
          <div className="space-y-6">
            <div>
              <Label>Amount</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(curr => <SelectItem key={curr} value={curr}>{curr}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(curr => <SelectItem key={curr} value={curr}>{curr}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-primary">Convert</Button>
          </div>
        </Card>

        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6">Result</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">{amount} {fromCurrency} =</div>
                <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">{result}</div>
                <div className="text-2xl text-muted-foreground mt-2">{toCurrency}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground mb-2">Exchange Rate</div>
                <div className="text-xl font-bold">1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💱</div><p>Enter amount to convert</p></div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default CurrencyCalculator;
