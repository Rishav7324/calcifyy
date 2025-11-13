import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const PercentErrorCalculator = () => {
  const [actual, setActual] = useState("");
  const [measured, setMeasured] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const actualValue = parseFloat(actual);
    const measuredValue = parseFloat(measured);
    
    const error = Math.abs((measuredValue - actualValue) / actualValue) * 100;
    const difference = measuredValue - actualValue;
    const relativeDiff = (difference / actualValue) * 100;

    setResult({
      percentError: error.toFixed(2),
      absoluteError: Math.abs(difference).toFixed(4),
      relativeDiff: relativeDiff.toFixed(2)
    });
  };

  return (
    <CalculatorLayout
      title="Percent Error Calculator"
      description="Calculate experimental error percentage"
      formula="% Error = |Measured - Actual| / Actual × 100"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Actual Value</Label>
            <Input
              type="number"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              placeholder="10"
              step="any"
            />
          </div>
          <div>
            <Label>Measured Value</Label>
            <Input
              type="number"
              value={measured}
              onChange={(e) => setMeasured(e.target.value)}
              placeholder="9.5"
              step="any"
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate Error
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Percent Error</p>
                <p className="text-4xl font-bold text-primary">{result.percentError}%</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Absolute Error</p>
                  <p className="text-xl font-bold">{result.absoluteError}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <p className="text-sm text-muted-foreground">Relative Diff</p>
                  <p className="text-xl font-bold">{result.relativeDiff}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Percent Error Calculator determines the accuracy of measurements by comparing measured values to actual (true) values. Percent error quantifies how close an experimental or measured value is to the accepted or theoretical value, expressed as a percentage. This is crucial in scientific experiments, quality control, and any scenario where measurement precision matters."
        useCases={[
          { title: "Laboratory Experiments", description: "Compare experimental results to theoretical predictions, assess measurement accuracy, and evaluate experimental techniques in chemistry, physics, and biology labs." },
          { title: "Quality Control", description: "Monitor manufacturing tolerances, verify product specifications against targets, and maintain quality standards in production environments." },
          { title: "Scientific Research", description: "Validate experimental data, compare results across different measurement methods, and assess the reliability of research findings." },
          { title: "Educational Assessment", description: "Grade laboratory assignments, teach measurement concepts, and help students understand experimental error and precision." }
        ]}
        tips={[
          { title: "Actual Value First", description: "Enter the true, accepted, or theoretical value as 'Actual Value.' This is your reference point against which measurements are compared." },
          { title: "Understanding Absolute Values", description: "Percent error uses absolute value, so positive and negative errors of equal magnitude yield the same percent error. This focuses on magnitude, not direction." },
          { title: "Low vs High Percent Error", description: "Less than 5% is generally excellent, 5-10% is good, 10-20% is acceptable for some applications. Above 20% often indicates systematic errors or poor methodology." },
          { title: "Zero Actual Values", description: "Percent error is undefined when the actual value is zero (division by zero). Use absolute error instead for such cases." }
        ]}
        faqs={[
          { question: "What's an acceptable percent error?", answer: "It depends on context. Laboratory experiments often aim for under 5%. Engineering might accept 10-15%. Medical measurements require less than 1%. High-precision work demands under 0.1%." },
          { question: "Why use percent error instead of absolute error?", answer: "Percent error provides context. An error of 0.5 meters is significant for a 1-meter measurement (50% error) but trivial for a 1000-meter measurement (0.05% error)." },
          { question: "What causes percent error?", answer: "Human error (reading instruments incorrectly), instrument error (calibration issues), methodology error (flawed procedures), and environmental factors (temperature, pressure variations)." },
          { question: "Can percent error be negative?", answer: "The calculator shows absolute percent error (always positive). However, relative difference is also displayed showing direction: positive means measured > actual, negative means measured < actual." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default PercentErrorCalculator;