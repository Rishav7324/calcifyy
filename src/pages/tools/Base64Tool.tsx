import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FileCode, Copy } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      toast.success("Text encoded to Base64!");
    } catch (error) {
      toast.error("Error encoding to Base64");
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      toast.success("Base64 decoded!");
    } catch (error) {
      toast.error("Error decoding Base64 - invalid input");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <SEO
        title="Base64 Encoder/Decoder - Encode & Decode Base64 Online"
        description="Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 strings instantly and securely."
        keywords="base64 encoder, base64 decoder, encode base64, decode base64, base64 converter, base64 tool"
      />
      <CalculatorLayout
        title="Base64 Encoder/Decoder"
        description="Encode text to Base64 or decode Base64 strings"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode or Base64 to decode..."
              className="min-h-[150px] font-mono text-sm"
            />
            
            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1">
                <FileCode className="w-4 h-4 mr-2" />
                Encode to Base64
              </Button>
              <Button onClick={decode} variant="outline" className="flex-1">
                <FileCode className="w-4 h-4 mr-2" />
                Decode from Base64
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
                className="min-h-[150px] font-mono text-sm bg-muted/50"
              />
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
};

export default Base64Tool;
