import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [result, setResult] = useState<{
    finalPrice: number;
    savings: number;
  } | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (price > 0 && discount >= 0 && discount <= 100) {
      const savings = (price * discount) / 100;
      const finalPrice = price - savings;

      setResult({
        finalPrice: parseFloat(finalPrice.toFixed(2)),
        savings: parseFloat(savings.toFixed(2)),
      });
    }
  };

  const explanation = (
    <div className="space-y-4">
      <p>
        <strong>Discount Calculator</strong> helps you quickly find out how much you'll save 
        and what you'll pay after applying a percentage discount.
      </p>
      <div className="space-y-2">
        <p className="font-semibold">How it works:</p>
        <ul className="space-y-1 ml-4">
          <li>• <strong>Original Price:</strong> The price before discount</li>
          <li>• <strong>Discount %:</strong> Percentage off the original price</li>
          <li>• <strong>Savings:</strong> Amount you save with the discount</li>
          <li>• <strong>Final Price:</strong> What you actually pay</li>
        </ul>
      </div>
      <p className="text-sm">
        Perfect for shopping, sales events, and comparing deals across stores. 
        Always verify the final price at checkout as additional taxes or fees may apply.
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      title="Discount Calculator"
      description="Calculate your savings and final price after discount"
      formula="Final Price = Original Price - (Original Price × Discount % / 100)"
      explanation={explanation}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="glass-card p-8 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6">Enter Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="originalPrice" className="text-lg">Original Price ($)</Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="e.g., 99.99"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <div>
              <Label htmlFor="discount" className="text-lg">Discount Percentage (%)</Label>
              <Input
                id="discount"
                type="number"
                placeholder="e.g., 25"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <Button 
              onClick={calculateDiscount}
              className="w-full h-12 text-lg gradient-primary"
              disabled={!originalPrice || !discountPercent}
            >
              Calculate Discount
            </Button>

            {/* Quick Discount Buttons */}
            <div className="pt-4 border-t border-primary/20">
              <p className="text-sm text-muted-foreground mb-3">Quick discounts:</p>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 25, 30, 40, 50, 60, 75].map((percent) => (
                  <Button
                    key={percent}
                    variant="outline"
                    size="sm"
                    onClick={() => setDiscountPercent(percent.toString())}
                    className="glass-card border-primary/20 hover:border-primary"
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Result Section */}
        <Card className="glass-card p-8 animate-scale-in" style={{ animationDelay: "100ms" }}>
          <h2 className="text-2xl font-bold mb-6">Your Savings</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">You Pay</div>
                <div className="text-6xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                  ${result.finalPrice}
                </div>
                <div className="text-lg text-green-400 font-semibold">
                  Save ${result.savings}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-1">Original Price</div>
                  <div className="text-2xl font-bold">
                    ${parseFloat(originalPrice).toFixed(2)}
                  </div>
                </div>

                <div className="p-4 rounded-lg glass-card border border-accent/20">
                  <div className="text-sm text-muted-foreground mb-1">Your Savings</div>
                  <div className="text-2xl font-bold text-accent">
                    ${result.savings}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    ({discountPercent}% off)
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
                  <div className="text-sm text-muted-foreground mb-1">Final Price</div>
                  <div className="text-3xl font-bold text-primary">
                    ${result.finalPrice}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-primary/20">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Savings Percentage</span>
                  <span className="text-accent font-semibold">
                    {((result.savings / parseFloat(originalPrice)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">🏷️</div>
                <p>Enter details to calculate discount</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default DiscountCalculator;
