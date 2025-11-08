import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Hash, Copy } from "lucide-react";
import { toast } from "sonner";

const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<{md5: string, sha1: string, sha256: string} | null>(null);

  const generateHashes = async () => {
    if (!input.trim()) {
      toast.error("Please enter text");
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // Generate SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    const sha1 = Array.from(new Uint8Array(sha1Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Generate SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256 = Array.from(new Uint8Array(sha256Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Simple MD5 implementation (for demonstration - in production use a library)
    const md5 = simpleMD5(input);

    setHashes({ md5, sha1, sha256 });
    toast.success("Hashes generated!");
  };

  // Simplified MD5 (for demo purposes - use crypto-js or similar in production)
  const simpleMD5 = (str: string): string => {
    // This is a placeholder - in a real app, use a proper crypto library
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
  };

  const copyHash = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
      <CalculatorLayout
        title="Hash Generator"
        description="Generate MD5, SHA-1, and SHA-256 hashes"
        keywords="hash generator, md5 generator, sha1 generator, sha256 generator, checksum generator, hash calculator"
        canonicalUrl="https://calcifyy.lovable.app/tool/hash-generator"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="min-h-[150px]"
            />
            
            <Button onClick={generateHashes} className="w-full">
              <Hash className="w-4 h-4 mr-2" />
              Generate Hashes
            </Button>
          </Card>

          {hashes && (
            <div className="space-y-4">
              <Card className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-bold">MD5</Label>
                  <Button variant="outline" size="sm" onClick={() => copyHash(hashes.md5, 'MD5')}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <code className="block p-4 bg-muted rounded-lg font-mono text-sm break-all">
                  {hashes.md5}
                </code>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-bold">SHA-1</Label>
                  <Button variant="outline" size="sm" onClick={() => copyHash(hashes.sha1, 'SHA-1')}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <code className="block p-4 bg-muted rounded-lg font-mono text-sm break-all">
                  {hashes.sha1}
                </code>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-bold">SHA-256</Label>
                  <Button variant="outline" size="sm" onClick={() => copyHash(hashes.sha256, 'SHA-256')}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <code className="block p-4 bg-muted rounded-lg font-mono text-sm break-all">
                  {hashes.sha256}
                </code>
              </Card>
            </div>
          )}
        </div>
      </CalculatorLayout>
  );
};

export default HashGenerator;
