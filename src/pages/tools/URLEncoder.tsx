import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link, Copy } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

const URLEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      toast.success("URL encoded!");
    } catch (error) {
      toast.error("Error encoding URL");
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      toast.success("URL decoded!");
    } catch (error) {
      toast.error("Error decoding URL");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <SEO
        title="URL Encoder/Decoder - Encode & Decode URLs Online Free"
        description="Free online URL encoder and decoder. Encode and decode URLs and URI components instantly and securely."
        keywords="url encoder, url decoder, encode url, decode url, uri encoder, percent encoding"
      />
      <CalculatorLayout
        title="URL Encoder/Decoder"
        description="Encode and decode URLs and URI components"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <Label htmlFor="input">Input Text or URL</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or URL to encode/decode..."
              className="min-h-[150px]"
            />
            
            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1">
                <Link className="w-4 h-4 mr-2" />
                Encode URL
              </Button>
              <Button onClick={decode} variant="outline" className="flex-1">
                <Link className="w-4 h-4 mr-2" />
                Decode URL
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

export default URLEncoder;
