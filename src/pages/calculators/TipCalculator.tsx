import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [people, setPeople] = useState("1");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent);
    const numPeople = parseInt(people);
    
    if (!isNaN(billAmount) && !isNaN(tip) && numPeople > 0) {
      const tipAmount = (billAmount * tip) / 100;
      const total = billAmount + tipAmount;
      const perPerson = total / numPeople;
      const tipPerPerson = tipAmount / numPeople;
      
      setResult({ tipAmount, total, perPerson, tipPerPerson });
    }
  };

  return (
    <CalculatorLayout
      title="Tip Calculator"
      description="Calculate tip amount and split bill among multiple people"
      formula="Tip Amount = Bill × (Tip% ÷ 100)"
      explanation="This calculator helps you determine how much to tip and how to split the total bill including tip among multiple people."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Bill Amount ($)</Label>
            <Input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="Enter bill amount"
            />
          </div>
          <div>
            <Label>Tip Percentage (%)</Label>
            <Input
              type="number"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              placeholder="Enter tip percentage"
            />
          </div>
          <div>
            <Label>Number of People</Label>
            <Input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="Number of people"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Tip
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-xl font-bold text-primary">Tip Amount: ${result.tipAmount.toFixed(2)}</p>
                <p className="text-2xl font-bold text-primary mt-2">Total: ${result.total.toFixed(2)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Per Person</p>
                  <p className="text-xl font-bold">${result.perPerson.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Tip Per Person</p>
                  <p className="text-xl font-bold">${result.tipPerPerson.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Tip Calculator takes the guesswork out of calculating gratuity and splitting bills among friends or colleagues. Whether you're dining at a restaurant, taking a taxi, or receiving any service that typically involves tipping, this tool ensures you tip appropriately while splitting costs fairly. It calculates the tip amount based on your chosen percentage, adds it to the bill, and divides everything evenly among the number of people. This eliminates awkward moments of mental math at the end of a meal and ensures everyone pays their fair share, including their portion of the tip."
        useCases={[
          { title: "Restaurant Dining", description: "Calculate appropriate tips for waiters and waitresses at sit-down restaurants, considering standard tipping percentages of 15-20% based on service quality." },
          { title: "Group Meals", description: "Split bills evenly among friends or colleagues when dining out together, ensuring everyone pays their fair share including their portion of the tip." },
          { title: "Food Delivery", description: "Determine fair tips for food delivery drivers, typically ranging from 10-20% depending on distance, weather conditions, and service quality." },
          { title: "Bar Service", description: "Calculate tips for bartenders, whether tipping per drink ($1-2 per drink) or as a percentage of the total bar tab (15-20%)." },
          { title: "Taxi & Ride-shares", description: "Compute appropriate tips for taxi drivers and ride-share services, usually 15-20% of the fare, with considerations for luggage handling and route efficiency." },
          { title: "Hotel Services", description: "Determine gratuity for hotel staff including bellhops ($1-2 per bag), housekeeping ($2-5 per day), and room service (15-20% if not already included)." }
        ]}
        tips={[
          { title: "Standard Tipping Rates", description: "For good service, 15-18% is standard; for excellent service, 18-20% or more. Poor service may warrant 10-15%, but consider speaking to management about serious issues instead of just leaving a small tip." },
          { title: "Pre-Tax vs Post-Tax Tipping", description: "Calculate your tip based on the pre-tax amount of the bill rather than the total with tax included. This is the traditional standard and can save a few dollars on larger bills." },
          { title: "Round Up for Simplicity", description: "Round your tip amount up to the nearest dollar for simpler math and easier bill splitting. An extra 50 cents won't break the bank but makes payment much cleaner." },
          { title: "Consider Service Circumstances", description: "Adjust tip percentages based on circumstances: tip more for exceptional service, difficult circumstances (like bad weather for delivery), or when receiving extra attention. Tip less only when service is truly poor." },
          { title: "Account for Auto-Gratuity", description: "Check your bill carefully for automatically added gratuity (common for large parties or tourist areas). Don't double-tip by accident, but feel free to add extra for exceptional service." }
        ]}
        faqs={[
          { question: "What is the standard tip percentage at restaurants?", answer: "In the United States, 15-20% is standard for sit-down restaurant service. 15% is appropriate for adequate service, 18-20% for good service, and 20%+ for excellent service. Many people default to 18-20% as the standard these days, especially in urban areas." },
          { question: "Should I tip on the pre-tax or post-tax amount?", answer: "Traditionally, tips are calculated on the pre-tax amount of the bill. However, many people tip on the post-tax total for simplicity. The difference is usually minimal, and either method is acceptable. What matters most is tipping an appropriate percentage." },
          { question: "Do I need to tip on takeout orders?", answer: "Tipping on takeout is optional but appreciated, typically 10% for full-service restaurants or $1-2 for counter service. The staff still spent time packaging and preparing your order. For delivery, always tip 15-20% as drivers depend on tips for their income." },
          { question: "How do I split a bill and tip among a group?", answer: "Calculate the total tip first, add it to the bill to get the grand total, then divide by the number of people. Alternatively, calculate each person's share of the bill and have them individually add their portion of the tip. This calculator handles this automatically for you." },
          { question: "What if service was poor - do I still need to tip?", answer: "While poor service may warrant a reduced tip (10-15%), completely stiffing a server should be rare and reserved for truly terrible service. Consider that issues might not be the server's fault (kitchen delays, understaffing). If service was unacceptable, speak to a manager instead of just leaving no tip." },
          { question: "Should I tip differently for different types of service?", answer: "Yes, tipping customs vary: restaurants (15-20%), bartenders ($1-2 per drink or 15-20% of tab), food delivery (15-20%), hairstylists (15-20%), taxi drivers (15-20%), hotel housekeeping ($2-5 per night), and valet parking ($2-5). Adjust based on service quality and local customs." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default TipCalculator;
