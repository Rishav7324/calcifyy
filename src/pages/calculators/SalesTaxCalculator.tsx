import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const SalesTaxCalculator = () => {
  const [price, setPrice] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const rate = parseFloat(taxRate);
    
    if (!isNaN(p) && !isNaN(rate)) {
      const taxAmount = (p * rate) / 100;
      const total = p + taxAmount;
      setResult({ taxAmount, total, beforeTax: p });
    }
  };

  return (
    <CalculatorLayout
      title="Sales Tax Calculator"
      description="Calculate sales tax and total price including tax"
      formula="Sales Tax = Price × (Tax Rate ÷ 100)"
      explanation="This calculator helps you determine the sales tax amount and the total price including tax based on the original price and tax rate."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Price Before Tax ($)</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>
          <div>
            <Label>Sales Tax Rate (%)</Label>
            <Input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              placeholder="Enter tax rate"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Tax</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-3xl font-bold text-primary">
                  ${result.total.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Before Tax</p>
                  <p className="text-lg font-bold">${result.beforeTax.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Tax Amount</p>
                  <p className="text-lg font-bold">${result.taxAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default SalesTaxCalculator;
