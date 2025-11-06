import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { Upload, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const ConvertImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState("png");
  const [originalFormat, setOriginalFormat] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formats = [
    { value: "png", label: "PNG", mimeType: "image/png" },
    { value: "jpeg", label: "JPEG", mimeType: "image/jpeg" },
    { value: "webp", label: "WebP", mimeType: "image/webp" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const format = file.type.split("/")[1];
      setOriginalFormat(format.toUpperCase());
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      toast.success(`Image converted to ${outputFormat.toUpperCase()} successfully!`);
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const format = formats.find(f => f.value === outputFormat);
    if (!format) return;

    canvasRef.current.toBlob(
      (blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.download = `converted-image.${outputFormat}`;
          link.href = URL.createObjectURL(blob);
          link.click();
          toast.success("Image downloaded!");
        }
      },
      format.mimeType,
      outputFormat === "jpeg" ? 0.92 : undefined
    );
  };

  return (
    <CalculatorLayout
      title="Convert Image"
      description="Convert images between different formats (PNG, JPEG, WebP)"
      keywords="convert image, image converter, png to jpg, jpg to png, webp converter, image format converter"
      canonicalUrl="https://calcifyy.lovable.app/tool/convert-image"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <Label>Upload Image</Label>
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-1"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          {image && (
            <>
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Original Format</div>
                  <div className="font-bold text-lg">{originalFormat}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Convert To</div>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Preview</Label>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <img src={image} alt="Preview" className="max-w-full h-auto" />
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleConvert} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Convert Image
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default ConvertImage;
