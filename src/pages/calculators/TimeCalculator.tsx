import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const TimeCalculator = () => {
  const [hours1, setHours1] = useState("");
  const [minutes1, setMinutes1] = useState("");
  const [hours2, setHours2] = useState("");
  const [minutes2, setMinutes2] = useState("");
  const [result, setResult] = useState<string>("");

  const addTime = () => {
    const h = parseInt(hours1 || "0") + parseInt(hours2 || "0");
    const m = parseInt(minutes1 || "0") + parseInt(minutes2 || "0");
    const totalHours = h + Math.floor(m / 60);
    const totalMinutes = m % 60;
    setResult(`${totalHours} hours ${totalMinutes} minutes`);
  };

  const subtractTime = () => {
    const totalMin1 = parseInt(hours1 || "0") * 60 + parseInt(minutes1 || "0");
    const totalMin2 = parseInt(hours2 || "0") * 60 + parseInt(minutes2 || "0");
    const diff = Math.abs(totalMin1 - totalMin2);
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    setResult(`${h} hours ${m} minutes`);
  };

  return (
    <CalculatorLayout
      title="Time Calculator"
      description="Add or subtract time durations in hours and minutes"
      explanation="This calculator helps you perform addition and subtraction operations with time values."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Time 1 - Hours</Label>
              <Input
                type="number"
                value={hours1}
                onChange={(e) => setHours1(e.target.value)}
                placeholder="Hours"
              />
            </div>
            <div>
              <Label>Time 1 - Minutes</Label>
              <Input
                type="number"
                value={minutes1}
                onChange={(e) => setMinutes1(e.target.value)}
                placeholder="Minutes"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Time 2 - Hours</Label>
              <Input
                type="number"
                value={hours2}
                onChange={(e) => setHours2(e.target.value)}
                placeholder="Hours"
              />
            </div>
            <div>
              <Label>Time 2 - Minutes</Label>
              <Input
                type="number"
                value={minutes2}
                onChange={(e) => setMinutes2(e.target.value)}
                placeholder="Minutes"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={addTime}>Add Time</Button>
            <Button onClick={subtractTime} variant="secondary">Subtract Time</Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The time calculator performs addition and subtraction operations with time durations expressed in hours and minutes. This practical tool automatically handles time unit conversions, such as converting 90 minutes to 1 hour and 30 minutes, making time calculations simple and error-free. Whether you're tracking work hours, calculating project durations, planning schedules, or managing time logs, this calculator eliminates manual conversion headaches and ensures accurate results every time."
        useCases={[
          { title: "Work Hours Tracking", description: "Calculate total hours worked across multiple shifts or days, add overtime hours, or compute time differences for accurate payroll and timesheets." },
          { title: "Project Time Management", description: "Sum up time spent on different project tasks, calculate remaining time in schedules, or estimate total project duration across activities." },
          { title: "Travel Planning", description: "Calculate total travel time with layovers, add flight durations and connection times, or determine arrival times across time zones." },
          { title: "Exercise & Training", description: "Track workout durations, add up multiple exercise sessions, or calculate rest periods between training intervals for fitness planning." }
        ]}
        tips={[
          { title: "Automatic Rollover", description: "The calculator automatically converts minutes to hours when they exceed 60. For example, 90 minutes becomes 1 hour 30 minutes automatically." },
          { title: "24-Hour Format", description: "Enter times in 24-hour format for clarity. Use hours beyond 24 if calculating continuous time periods like project durations or marathon times." },
          { title: "Decimal Conversion", description: "To convert to decimal hours for billing, divide minutes by 60. For example, 2 hours 30 minutes = 2.5 hours for invoicing or time tracking." },
          { title: "Break Time Calculation", description: "Use subtraction to calculate work time excluding breaks. Subtract total break time from total hours to get actual working time." }
        ]}
        faqs={[
          { question: "How do I calculate time across midnight?", answer: "For times crossing midnight, calculate each day separately and add results. Or add 24 hours to the end time first, then calculate. For example, 11 PM to 2 AM = 11 PM to 2 AM + 24 hours = 23 to 26 hours = 3 hours difference." },
          { question: "Can I enter time in decimal format?", answer: "This calculator uses hours and minutes separately. To convert decimal hours, take the whole number as hours and multiply the decimal portion by 60 for minutes. For example, 2.5 hours = 2 hours and 30 minutes." },
          { question: "What if my result is negative?", answer: "The subtraction function shows absolute difference, always returning a positive result. If you need to track direction (earlier vs later), note which time value was larger in your original input." },
          { question: "How do I account for seconds?", answer: "This calculator works with hours and minutes only. For precision requiring seconds, convert to minutes: 90 seconds = 1.5 minutes. Add this to your minute value before calculating." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default TimeCalculator;
