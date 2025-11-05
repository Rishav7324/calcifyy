import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Braces, Copy, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
      toast.success("JSON formatted successfully!");
    } catch (error) {
      setIsValid(false);
      toast.error("Invalid JSON");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      toast.success("JSON minified successfully!");
    } catch (error) {
      setIsValid(false);
      toast.error("Invalid JSON");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <SEO
        title="JSON Formatter & Validator - Format & Minify JSON Online"
        description="Free online JSON formatter and validator. Format, validate, and minify JSON data instantly. Check JSON syntax errors."
        keywords="json formatter, json validator, format json, minify json, json beautifier, json parser"
      />
      <CalculatorLayout
        title="JSON Formatter & Validator"
        description="Format, validate, and minify JSON data"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON</Label>
              {isValid !== null && (
                <div className={`flex items-center gap-2 text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {isValid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {isValid ? 'Valid JSON' : 'Invalid JSON'}
                </div>
              )}
            </div>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setIsValid(null);
              }}
              placeholder='{"name": "value", "array": [1, 2, 3]}'
              className="min-h-[200px] font-mono text-sm"
            />
            
            <div className="flex gap-2">
              <Button onClick={format} className="flex-1">
                <Braces className="w-4 h-4 mr-2" />
                Format JSON
              </Button>
              <Button onClick={minify} variant="outline" className="flex-1">
                <Braces className="w-4 h-4 mr-2" />
                Minify JSON
              </Button>
            </div>
          </Card>

          {output && (
            <Card className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Label>Output</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[200px] font-mono text-sm bg-muted/50"
              />
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
};

export default JSONFormatter;
