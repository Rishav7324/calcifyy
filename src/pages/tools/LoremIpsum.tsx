import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { FileText, Copy } from "lucide-react";
import { toast } from "sonner";

const LoremIpsum = () => {
  const [count, setCount] = useState("5");
  const [type, setType] = useState("paragraphs");
  const [generated, setGenerated] = useState("");

  const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  
  const sentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
  ];

  const generate = () => {
    const num = parseInt(count) || 1;
    let result = "";

    if (type === "paragraphs") {
      result = Array(num).fill(loremText).join("\n\n");
    } else if (type === "sentences") {
      const allSentences = [];
      for (let i = 0; i < num; i++) {
        allSentences.push(sentences[i % sentences.length]);
      }
      result = allSentences.join(" ");
    } else if (type === "words") {
      const words = loremText.split(" ");
      const selectedWords = [];
      for (let i = 0; i < num; i++) {
        selectedWords.push(words[i % words.length]);
      }
      result = selectedWords.join(" ");
    }

    setGenerated(result);
    toast.success("Lorem ipsum generated!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    toast.success("Copied to clipboard!");
  };

  return (
      <CalculatorLayout
        title="Lorem Ipsum Generator"
        description="Generate placeholder text for your design and development projects"
        keywords="lorem ipsum, placeholder text, dummy text, lorem ipsum generator, filler text, sample text"
        canonicalUrl="https://calcifyy.lovable.app/tool/lorem-ipsum"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Count</Label>
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="words">Words</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={generate} className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Generate Lorem Ipsum
            </Button>
          </Card>

          {generated && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Label>Generated Text</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={generated}
                readOnly
                className="min-h-[300px] font-mono text-sm"
              />
            </Card>
          )}
        </div>
      </CalculatorLayout>
  );
};

export default LoremIpsum;
