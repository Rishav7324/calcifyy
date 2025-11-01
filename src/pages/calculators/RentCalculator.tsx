import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const RentCalculator = () => {
  const [income, setIncome] = useState("");
  const [utilities, setUtilities] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const monthlyIncome = parseFloat(income);
    const monthlyUtilities = parseFloat(utilities) || 0;
    
    const maxRent = monthlyIncome * 0.30;
    const rentWithUtilities = maxRent - monthlyUtilities;
    const annualRent = rentWithUtilities * 12;

    setResult({
      maxRent: maxRent.toFixed(2),
      afterUtilities: rentWithUtilities.toFixed(2),
      annualCost: annualRent.toFixed(2)
    });
  };

  return (
    <CalculatorLayout
      title="Rent Calculator"
      description="Calculate affordable monthly rent"
      formula="30% of monthly income rule"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Monthly Income ($)</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="4000"
            />
          </div>
          <div>
            <Label>Monthly Utilities ($)</Label>
            <Input
              type="number"
              value={utilities}
              onChange={(e) => setUtilities(e.target.value)}
              placeholder="150"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Rent
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Affordable Rent (Before Utilities)</p>
                <p className="text-4xl font-bold text-primary">${result.maxRent}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">After Utilities</p>
                  <p className="text-xl font-bold">${result.afterUtilities}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Annual Cost</p>
                  <p className="text-xl font-bold">${result.annualCost}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The rent affordability calculator helps you determine how much rent you can comfortably afford based on your monthly income. Following the widely-accepted 30% rule, this calculator ensures you don't overextend financially on housing costs. Financial experts recommend that housing expenses should not exceed 30% of your gross monthly income to maintain financial stability and leave room for other essential expenses, savings, and emergencies. This tool accounts for utilities and other housing-related costs, providing a realistic picture of your affordable rent range. Use it before apartment hunting to set realistic expectations and avoid financial stress."
        useCases={[
          {
            title: "Apartment Search Budget",
            description: "Establish a realistic rent budget before searching for apartments to filter listings that match your financial capacity and avoid wasting time on unaffordable options."
          },
          {
            title: "Moving to New City",
            description: "Calculate affordable rent when relocating to a new city with different cost of living to ensure you can maintain financial stability in your new location."
          },
          {
            title: "Income Change Assessment",
            description: "Reevaluate your housing budget after a job change, promotion, or salary adjustment to determine if you can afford a better place or need to downsize."
          },
          {
            title: "Roommate Cost Splitting",
            description: "Determine how much each roommate should contribute based on their individual incomes to ensure fair and affordable rent distribution."
          },
          {
            title: "Financial Planning",
            description: "Integrate rent calculations into broader financial planning to ensure housing costs don't compromise your ability to save, invest, or pay off debt."
          }
        ]}
        tips={[
          {
            title: "Follow the 30% Rule",
            description: "The 30% rule is a guideline, not a hard rule. If you live in a high-cost area or have significant debt, consider staying below 30% to maintain financial flexibility and emergency savings."
          },
          {
            title: "Include All Housing Costs",
            description: "Beyond rent, budget for utilities (electricity, water, internet), renter's insurance, parking fees, and potential pet deposits or fees to get the true cost of renting."
          },
          {
            title: "Build an Emergency Fund First",
            description: "Before committing to your maximum affordable rent, ensure you have 3-6 months of expenses saved as an emergency fund to protect against unexpected job loss or expenses."
          },
          {
            title: "Consider Future Income",
            description: "If you're early in your career with expected income growth, don't stretch to your absolute maximum now. Leave room for lifestyle inflation as your earnings increase."
          },
          {
            title: "Negotiate Rent Terms",
            description: "Don't be afraid to negotiate rent, especially in competitive markets or when signing longer leases. Even a 5% reduction can save thousands annually."
          }
        ]}
        faqs={[
          {
            question: "What is the 30% rent rule?",
            answer: "The 30% rule states that your monthly housing costs (rent plus utilities) should not exceed 30% of your gross monthly income. This guideline helps ensure you have enough income left for other essentials like food, transportation, healthcare, debt payments, and savings while avoiding housing cost burden."
          },
          {
            question: "Should I use gross or net income for rent calculation?",
            answer: "The 30% rule traditionally uses gross income (before taxes), but using net income (after taxes) provides a more conservative and realistic assessment of affordability. If you use net income, you might want to adjust to 40% since taxes are already accounted for."
          },
          {
            question: "What if I can't find affordable rent in my area?",
            answer: "If rent in your area consistently exceeds 30% of your income, consider options like: finding roommates to split costs, looking in neighboring areas with lower rents, negotiating salary increases, finding additional income sources, or temporarily accepting higher rent while planning to increase income."
          },
          {
            question: "How do utilities affect affordable rent?",
            answer: "Utilities can add 10-20% to your base rent cost depending on location, season, and apartment efficiency. Always ask landlords about average utility costs before signing. Factor these into your budget - if utilities are $150/month, reduce your max rent accordingly to stay within budget."
          },
          {
            question: "Is it better to rent or buy?",
            answer: "The rent vs. buy decision depends on many factors: your financial situation, how long you'll stay in the area, local real estate market, mortgage rates, and personal preferences. Renting offers flexibility and no maintenance responsibilities, while buying builds equity but requires significant upfront costs and long-term commitment."
          },
          {
            question: "Can I afford a more expensive place with a roommate?",
            answer: "Sharing rent with roommates can definitely allow you to afford a nicer place or better location while keeping costs within budget. However, ensure you have compatible living styles and a clear written agreement about rent, utilities, and responsibilities to avoid conflicts."
          }
        ]}
      />
    </CalculatorLayout>
  );
};

export default RentCalculator;