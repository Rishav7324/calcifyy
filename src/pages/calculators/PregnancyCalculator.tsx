import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The Pregnancy Calculator estimates your due date and tracks pregnancy progress based on the first day of your last menstrual period (LMP). Using the standard 280-day (40-week) gestation period, it calculates when your baby is likely to arrive and how far along you currently are. This tool helps expectant parents plan for prenatal care, prepare for delivery, and understand pregnancy milestones."
        useCases={[
          { title: "Due Date Estimation", description: "Calculate your expected delivery date to plan maternity leave, prepare the nursery, and schedule important prenatal appointments." },
          { title: "Prenatal Appointment Planning", description: "Track pregnancy weeks to know when to schedule ultrasounds, glucose tests, and other trimester-specific prenatal screenings." },
          { title: "Milestone Tracking", description: "Monitor pregnancy progress week by week, understand developmental stages, and know what to expect at each phase of pregnancy." },
          { title: "Family Planning", description: "Help partners, family members, and friends understand the pregnancy timeline and prepare for the baby's arrival." }
        ]}
        tips={[
          { title: "LMP Date Accuracy", description: "Enter the first day of your last period for most accurate results. If you don't remember the exact date, your healthcare provider can estimate using ultrasound measurements." },
          { title: "Full Term Variations", description: "Full term is 39-40 weeks, but normal delivery can happen anywhere from 37-42 weeks. Only 5% of babies arrive exactly on their due date." },
          { title: "Irregular Cycles", description: "If your cycles are irregular or longer than 28 days, your due date may differ. Discuss with your healthcare provider for personalized dating." },
          { title: "Medical Confirmation", description: "Always confirm your due date with healthcare providers. Early ultrasounds (before 13 weeks) provide the most accurate gestational age assessment." }
        ]}
        faqs={[
          { question: "How accurate are pregnancy due dates?", answer: "Due date calculations are estimates. Only about 5% of babies arrive on their exact due date. Most (80%) arrive within 2 weeks of the predicted date (38-42 weeks)." },
          { question: "Why is pregnancy 40 weeks, not 9 months?", answer: "Pregnancy is 280 days from LMP (40 weeks or about 9 months and 1 week). Medical professionals use weeks for precision, as months vary in length." },
          { question: "What if I don't know my LMP date?", answer: "Your doctor can estimate gestational age through early ultrasound measurements (crown-rump length) or date of conception if known. Early ultrasounds are accurate within 5-7 days." },
          { question: "Can my due date change?", answer: "Yes. Healthcare providers may adjust your due date based on early ultrasound measurements, which are more accurate than LMP-based calculations, especially if you have irregular cycles." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default PregnancyCalculator;
