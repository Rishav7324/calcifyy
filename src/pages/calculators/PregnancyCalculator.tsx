import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const PregnancyCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const lmp = new Date(lastPeriod);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280);
    
    const today = new Date();
    const weeksPregnant = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24 * 7));
    const daysPregnant = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    setResult({
      dueDate: dueDate.toLocaleDateString(),
      weeksPregnant,
      daysPregnant,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0
    });
  };

  return (
    <CalculatorLayout
      title="Pregnancy Calculator"
      description="Calculate due date and track pregnancy progress"
      explanation="This calculator estimates your due date based on the first day of your last menstrual period (LMP). The average pregnancy lasts 280 days (40 weeks)."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>First Day of Last Period</Label>
            <Input
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Due Date
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Estimated Due Date</p>
                <p className="text-3xl font-bold text-primary">{result.dueDate}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Weeks Pregnant</p>
                  <p className="text-xl font-bold">{result.weeksPregnant}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Days Pregnant</p>
                  <p className="text-xl font-bold">{result.daysPregnant}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded col-span-2">
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                  <p className="text-xl font-bold">{result.daysRemaining}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default PregnancyCalculator;
