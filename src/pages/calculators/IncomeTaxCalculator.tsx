import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState("single");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const grossIncome = parseFloat(income);
    let taxRate = 0;
    
    // Simplified tax brackets
    if (filingStatus === "single") {
      if (grossIncome <= 10000) taxRate = 0.10;
      else if (grossIncome <= 40000) taxRate = 0.12;
      else if (grossIncome <= 85000) taxRate = 0.22;
      else taxRate = 0.24;
    } else {
      if (grossIncome <= 20000) taxRate = 0.10;
      else if (grossIncome <= 80000) taxRate = 0.12;
      else if (grossIncome <= 170000) taxRate = 0.22;
      else taxRate = 0.24;
    }

    const taxAmount = grossIncome * taxRate;
    const netIncome = grossIncome - taxAmount;

    setResult({
      taxRate: (taxRate * 100).toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      netIncome: netIncome.toFixed(2)
    });
  };

  return (
    <CalculatorLayout
      title="Income Tax Calculator"
      description="Calculate income tax based on brackets"
      formula="Tax = Income × Tax Rate"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Annual Income ($)</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="50000"
            />
          </div>
          <div>
            <Label>Filing Status</Label>
            <Select value={filingStatus} onValueChange={setFilingStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married Filing Jointly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Tax
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Net Income (After Tax)</p>
                <p className="text-4xl font-bold text-primary">${result.netIncome}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Tax Rate</p>
                  <p className="text-xl font-bold">{result.taxRate}%</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Tax Amount</p>
                  <p className="text-xl font-bold">${result.taxAmount}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default IncomeTaxCalculator;