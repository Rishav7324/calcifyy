import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const MileageCalculator = () => {
  const [distance, setDistance] = useState("");
  const [fuel, setFuel] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const dist = parseFloat(distance);
    const fuelUsed = parseFloat(fuel);
    
    const mpg = dist / fuelUsed;
    const kml = mpg * 0.425144;
    const lp100km = 235.215 / mpg;

    setResult({
      mpg: mpg.toFixed(2),
      kml: kml.toFixed(2),
      lp100km: lp100km.toFixed(2)
    });
  };

  return (
    <CalculatorLayout
      title="Mileage Calculator"
      description="Calculate fuel efficiency (MPG)"
      formula="MPG = Distance / Fuel Used"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Distance Traveled (miles)</Label>
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="300"
            />
          </div>
          <div>
            <Label>Fuel Used (gallons)</Label>
            <Input
              type="number"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              placeholder="10"
              step="0.1"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Mileage
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Miles Per Gallon</p>
                <p className="text-4xl font-bold text-primary">{result.mpg} MPG</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Kilometers/Liter</p>
                  <p className="text-xl font-bold">{result.kml} km/L</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Liters/100km</p>
                  <p className="text-xl font-bold">{result.lp100km} L/100km</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The mileage calculator, also known as a fuel efficiency calculator, helps you determine how efficiently your vehicle uses fuel. By measuring miles per gallon (MPG), kilometers per liter (km/L), or liters per 100 kilometers (L/100km), you can track your vehicle's performance, budget for fuel costs, and identify potential maintenance issues. Higher MPG means better fuel efficiency and lower running costs. This calculator is essential for vehicle comparison, trip planning, and monitoring your carbon footprint."
        useCases={[
          { title: "Fuel Cost Budgeting", description: "Calculate your vehicle's fuel efficiency to accurately estimate fuel costs for daily commutes, road trips, or monthly budgets." },
          { title: "Vehicle Comparison", description: "Compare fuel efficiency between different vehicles before purchasing to understand long-term operating costs and environmental impact." },
          { title: "Maintenance Monitoring", description: "Track MPG over time to detect decreases in efficiency that might indicate maintenance needs like tire pressure, air filter replacement, or engine issues." },
          { title: "Eco-Friendly Driving", description: "Monitor your fuel efficiency to encourage more economical driving habits, reduce emissions, and minimize environmental impact." }
        ]}
        tips={[
          { title: "Accurate Measurement", description: "For best accuracy, fill your tank completely, record the mileage, then fill up again after driving and record the new mileage and gallons added." },
          { title: "Driving Habits Matter", description: "Aggressive acceleration, high speeds, and frequent braking significantly reduce fuel efficiency. Smooth, consistent driving improves MPG." },
          { title: "Understanding the Units", description: "MPG (miles per gallon) is common in the US. Higher is better. L/100km (liters per 100 kilometers) is used in many countries where lower is better." },
          { title: "Factors Affecting MPG", description: "Weather, terrain, cargo weight, tire pressure, vehicle condition, and driving style all affect fuel efficiency. Track MPG to identify patterns." }
        ]}
        faqs={[
          { question: "What is considered good gas mileage?", answer: "For modern cars, 30-40 MPG is considered good for combined city/highway driving. Hybrids often achieve 50+ MPG, while trucks and SUVs typically get 15-25 MPG. Your vehicle's EPA rating provides a baseline for comparison." },
          { question: "Why is my actual MPG lower than the EPA rating?", answer: "EPA ratings are measured under controlled laboratory conditions. Real-world MPG is typically 10-20% lower due to traffic, weather, terrain, driving habits, and vehicle load. City driving significantly reduces fuel efficiency compared to highway driving." },
          { question: "How can I improve my vehicle's fuel efficiency?", answer: "Maintain proper tire pressure, reduce excess weight, use cruise control on highways, avoid aggressive acceleration, keep up with maintenance (oil changes, air filters), and combine errands to reduce cold starts." },
          { question: "What's the difference between city and highway MPG?", answer: "City MPG is lower because stop-and-go traffic requires frequent acceleration and braking, which wastes fuel. Highway MPG is higher because of consistent speeds with minimal braking. Combined MPG is a weighted average of both." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default MileageCalculator;