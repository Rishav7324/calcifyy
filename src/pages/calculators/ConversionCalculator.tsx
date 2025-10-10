import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

const ConversionCalculator = () => {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const units: any = {
    length: { meters: 1, kilometers: 0.001, miles: 0.000621371, feet: 3.28084, inches: 39.3701, yards: 1.09361 },
    weight: { kilograms: 1, grams: 1000, pounds: 2.20462, ounces: 35.274 },
    temperature: { celsius: "c", fahrenheit: "f", kelvin: "k" },
    volume: { liters: 1, milliliters: 1000, gallons: 0.264172, cups: 4.22675 }
  };

  const convert = () => {
    const val = parseFloat(value);
    let output = 0;
    
    if (category === "temperature") {
      if (fromUnit === "celsius" && toUnit === "fahrenheit") output = (val * 9/5) + 32;
      else if (fromUnit === "fahrenheit" && toUnit === "celsius") output = (val - 32) * 5/9;
      else if (fromUnit === "celsius" && toUnit === "kelvin") output = val + 273.15;
      else if (fromUnit === "kelvin" && toUnit === "celsius") output = val - 273.15;
      else if (fromUnit === "fahrenheit" && toUnit === "kelvin") output = (val - 32) * 5/9 + 273.15;
      else if (fromUnit === "kelvin" && toUnit === "fahrenheit") output = (val - 273.15) * 9/5 + 32;
      else output = val;
    } else {
      const baseValue = val / units[category][fromUnit];
      output = baseValue * units[category][toUnit];
    }
    
    setResult(`${output.toFixed(4)} ${toUnit}`);
  };

  return (
    <CalculatorLayout
      title="Unit Conversion Calculator"
      description="Convert between different units of measurement"
      explanation="This calculator converts values between various units including length, weight, temperature, and volume."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="length">Length</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units[category]).map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units[category]).map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={convert} className="w-full">Convert</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-3xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default ConversionCalculator;
