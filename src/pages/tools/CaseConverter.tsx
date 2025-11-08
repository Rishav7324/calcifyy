import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Type, Copy } from "lucide-react";
import { toast } from "sonner";

const CaseConverter = () => {
  const [text, setText] = useState("");

  const convertCase = (type: string) => {
    let converted = "";
    switch (type) {
      case "upper":
        converted = text.toUpperCase();
        break;
      case "lower":
        converted = text.toLowerCase();
        break;
      case "title":
        converted = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case "sentence":
        converted = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "camel":
        converted = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
        break;
      case "snake":
        converted = text.toLowerCase().replace(/\s+/g, '_');
        break;
    }
    setText(converted);
    toast.success("Text converted!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
      <CalculatorLayout
        title="Case Converter"
        description="Convert text between different cases - upper, lower, title, sentence, camel, and snake case"
        keywords="case converter, text converter, uppercase, lowercase, title case, sentence case, camel case, snake case"
        canonicalUrl="https://calcifyy.lovable.app/tool/case-converter"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="text">Enter your text</Label>
              <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!text}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[200px]"
            />
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Button onClick={() => convertCase("upper")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>UPPERCASE</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("lower")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>lowercase</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("title")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>Title Case</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("sentence")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>Sentence case</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("camel")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>camelCase</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("snake")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>snake_case</span>
              </div>
            </Button>
          </div>
        </div>
      </CalculatorLayout>
  );
};

export default CaseConverter;
