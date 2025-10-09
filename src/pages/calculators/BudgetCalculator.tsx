import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const BudgetCalculator = () => {
  const [income, setIncome] = useState("");
  const [housing, setHousing] = useState("");
  const [transportation, setTransportation] = useState("");
  const [food, setFood] = useState("");
  const [utilities, setUtilities] = useState("");
  const [entertainment, setEntertainment] = useState("");
  const [other, setOther] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const monthlyIncome = parseFloat(income);
    const expenses = [housing, transportation, food, utilities, entertainment, other]
      .map(e => parseFloat(e) || 0);
    const totalExpenses = expenses.reduce((a, b) => a + b, 0);
    const remaining = monthlyIncome - totalExpenses;
    const savingsRate = (remaining / monthlyIncome) * 100;
    
    setResult({ totalExpenses, remaining, savingsRate });
  };

  return (
    <CalculatorLayout
      title="Budget Calculator"
      description="Plan and track your monthly income and expenses"
      explanation="This calculator helps you manage your finances by tracking income vs expenses and showing how much you can save each month."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Monthly Income ($)</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Total monthly income"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Housing ($)</Label>
              <Input
                type="number"
                value={housing}
                onChange={(e) => setHousing(e.target.value)}
                placeholder="Rent/mortgage"
              />
            </div>
            <div>
              <Label>Transportation ($)</Label>
              <Input
                type="number"
                value={transportation}
                onChange={(e) => setTransportation(e.target.value)}
                placeholder="Car, gas, transit"
              />
            </div>
            <div>
              <Label>Food ($)</Label>
              <Input
                type="number"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="Groceries, dining"
              />
            </div>
            <div>
              <Label>Utilities ($)</Label>
              <Input
                type="number"
                value={utilities}
                onChange={(e) => setUtilities(e.target.value)}
                placeholder="Electric, water, etc."
              />
            </div>
            <div>
              <Label>Entertainment ($)</Label>
              <Input
                type="number"
                value={entertainment}
                onChange={(e) => setEntertainment(e.target.value)}
                placeholder="Fun activities"
              />
            </div>
            <div>
              <Label>Other ($)</Label>
              <Input
                type="number"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                placeholder="Misc expenses"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calculate Budget</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Money Remaining</p>
                <p className={`text-3xl font-bold ${result.remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${result.remaining.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-lg font-bold">${result.totalExpenses.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Savings Rate</p>
                  <p className="text-lg font-bold">{result.savingsRate.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default BudgetCalculator;
