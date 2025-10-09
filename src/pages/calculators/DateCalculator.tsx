import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";

const DateCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);
    
    setResult({ days: diffDays, weeks: diffWeeks, months: diffMonths, years: diffYears });
  };

  return (
    <CalculatorLayout
      title="Date Calculator"
      description="Calculate the difference between two dates in various units"
      explanation="This calculator finds the time difference between two dates and displays the result in days, weeks, months, and years."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Difference
          </Button>
          {result && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-4 bg-primary/10 rounded-lg col-span-2">
                <p className="text-3xl font-bold text-primary">{result.days} Days</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded">
                <p className="text-sm text-muted-foreground">Weeks</p>
                <p className="text-xl font-bold">{result.weeks}</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded">
                <p className="text-sm text-muted-foreground">Months</p>
                <p className="text-xl font-bold">{result.months}</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded col-span-2">
                <p className="text-sm text-muted-foreground">Years</p>
                <p className="text-xl font-bold">{result.years}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default DateCalculator;
