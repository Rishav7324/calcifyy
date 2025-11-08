import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";
import { QrCode, Download } from "lucide-react";
import { toast } from "sonner";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState("256");
  const [qrCode, setQrCode] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = () => {
    if (!text.trim()) {
      toast.error("Please enter text or URL");
      return;
    }

    // Simple QR code generation using a public API
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    setQrCode(apiUrl);
    toast.success("QR code generated!");
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCode;
    link.click();
    toast.success("QR code downloaded!");
  };

  return (
      <CalculatorLayout
        title="QR Code Generator"
        description="Generate QR codes for URLs, text, and more"
        keywords="qr code generator, create qr code, qr code maker, generate qr code, free qr code, qr code creator"
        canonicalUrl="https://calcifyy.lovable.app/tool/qr-code"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <div>
              <Label htmlFor="text">Text or URL</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, or any data..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label>QR Code Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="128">Small (128x128)</SelectItem>
                  <SelectItem value="256">Medium (256x256)</SelectItem>
                  <SelectItem value="512">Large (512x512)</SelectItem>
                  <SelectItem value="1024">Extra Large (1024x1024)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateQR} className="w-full">
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
          </Card>

          {qrCode && (
            <Card className="p-6 space-y-4">
              <Label>Generated QR Code</Label>
              <div className="flex justify-center p-8 bg-white rounded-lg">
                <img src={qrCode} alt="QR Code" className="max-w-full" />
              </div>
              <Button onClick={downloadQR} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </Card>
          )}
        </div>
      </CalculatorLayout>
  );
};

export default QRCodeGenerator;
