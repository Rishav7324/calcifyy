import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CalculatorLayout from "@/components/CalculatorLayout";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (chars === "") {
      toast.error("Please select at least one character type");
      return;
    }
    
    // Use cryptographically secure random number generation
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(array[i] % chars.length);
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  return (
    <CalculatorLayout
      title="Password Generator"
      description="Generate strong, secure random passwords"
      explanation="This tool creates cryptographically secure passwords with customizable length and character types to enhance your online security."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          <div>
            <Label>Password Length: {length}</Label>
            <Input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="mt-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox checked={uppercase} onCheckedChange={(checked) => setUppercase(checked as boolean)} />
              <Label>Uppercase Letters (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox checked={lowercase} onCheckedChange={(checked) => setLowercase(checked as boolean)} />
              <Label>Lowercase Letters (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox checked={numbers} onCheckedChange={(checked) => setNumbers(checked as boolean)} />
              <Label>Numbers (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox checked={symbols} onCheckedChange={(checked) => setSymbols(checked as boolean)} />
              <Label>Symbols (!@#$%^&*)</Label>
            </div>
          </div>
          <Button onClick={generate} className="w-full">
            Generate Password
          </Button>
          {password && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg break-all">
                <p className="text-xl font-mono font-bold text-primary">{password}</p>
              </div>
              <Button onClick={copyToClipboard} variant="outline" className="w-full">
                Copy to Clipboard
              </Button>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default PasswordGenerator;
