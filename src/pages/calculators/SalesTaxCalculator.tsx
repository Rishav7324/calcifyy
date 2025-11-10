import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The sales tax calculator helps you quickly determine the amount of sales tax owed and the total price including tax. Sales tax is a consumption tax imposed by governments on the sale of goods and services. Tax rates vary significantly by location, ranging from 0% in some states to over 10% in others when combining state, county, and city taxes. This calculator is essential for businesses setting prices, consumers budgeting purchases, and anyone needing to understand the true cost of taxable items."
        useCases={[
          { title: "Shopping & Budgeting", description: "Calculate the true cost of purchases before checkout, budget accurately for large purchases, and compare prices across different tax jurisdictions." },
          { title: "Business & Retail", description: "Set retail prices that include tax, calculate tax liability for sales reporting, and ensure proper tax collection for compliance." },
          { title: "Online Shopping", description: "Estimate total costs including sales tax for out-of-state purchases, especially important since many online retailers now collect sales tax." },
          { title: "Major Purchases", description: "Calculate sales tax on vehicles, appliances, furniture, or other expensive items to understand the full financial commitment." }
        ]}
        tips={[
          { title: "Know Your Local Rate", description: "Sales tax rates vary by state, county, and city. Always verify your local combined rate. Some areas have rates as low as 0%, while others exceed 10%." },
          { title: "Tax-Free Items", description: "Many states exempt certain items from sales tax, including groceries, prescription medications, and clothing. Check your local regulations for exemptions." },
          { title: "Use Tax", description: "If you purchase items from out-of-state retailers who don't collect sales tax, you may owe 'use tax' when filing state tax returns." },
          { title: "Business Exemptions", description: "Businesses making purchases for resale or manufacturing often qualify for sales tax exemptions with proper documentation like a resale certificate." }
        ]}
        faqs={[
          { question: "Why do sales tax rates differ by location?", answer: "Sales tax is imposed at multiple levels: state, county, and city. Each jurisdiction sets its own rate, which combines to create the total sales tax rate. This is why rates vary significantly even within the same state." },
          { question: "Are services subject to sales tax?", answer: "It depends on the state and type of service. Some states tax most services, while others only tax goods. Professional services (legal, medical) are typically exempt, while services like car repairs or salon services may be taxed." },
          { question: "Can I claim sales tax as a tax deduction?", answer: "When filing federal income taxes, you can choose to deduct either state income tax or state sales tax (but not both). The sales tax deduction is beneficial for residents of states without income tax." },
          { question: "Do I pay sales tax on online purchases?", answer: "Yes, most online retailers now collect sales tax for states where they have a physical presence or meet sales thresholds. If tax isn't collected, you may owe use tax when filing state returns." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default SalesTaxCalculator;
