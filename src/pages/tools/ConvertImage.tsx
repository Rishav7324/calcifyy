import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { Upload, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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

      <CalculatorContentSection
        aboutContent="The Image Format Converter transforms images between popular formats including PNG, JPEG, and WebP. Converting image formats is essential for optimizing web performance, ensuring compatibility, or meeting specific platform requirements. PNG is best for graphics with transparency, JPEG excels for photographs with smaller file sizes, and WebP offers superior compression for modern web applications. This tool makes format conversion simple and fast without quality loss during the conversion process."
        useCases={[
          { title: "Web Optimization", description: "Convert images to WebP format for faster website loading times and reduced bandwidth usage while maintaining visual quality." },
          { title: "Transparency Preservation", description: "Convert images to PNG when you need to preserve transparent backgrounds for logos, icons, or graphics." },
          { title: "File Size Reduction", description: "Convert PNG photos to JPEG format to significantly reduce file sizes for faster uploads and storage savings." },
          { title: "Platform Compatibility", description: "Convert images to formats required by different platforms or content management systems that have specific format requirements." }
        ]}
        tips={[
          { title: "Choose the Right Format", description: "Use PNG for images needing transparency, JPEG for photographs, and WebP for modern web applications where browser support allows." },
          { title: "Consider Quality vs Size", description: "JPEG offers smaller files but lossy compression. PNG is lossless but larger. WebP provides the best of both worlds with superior compression." },
          { title: "Check Browser Support", description: "While WebP offers excellent compression, ensure your target browsers support it. Most modern browsers do, but older versions may need fallbacks." },
          { title: "Preserve Originals", description: "Always keep original high-quality images before converting to lossy formats like JPEG, as you cannot recover quality after conversion." }
        ]}
        faqs={[
          { question: "What's the difference between PNG and JPEG?", answer: "PNG uses lossless compression and supports transparency, making it ideal for graphics, logos, and images needing crisp edges. JPEG uses lossy compression for much smaller file sizes, perfect for photographs where minor quality loss is acceptable." },
          { question: "What is WebP and should I use it?", answer: "WebP is a modern image format developed by Google that provides superior compression (25-35% smaller files) compared to PNG and JPEG while maintaining quality. Use it for web applications where modern browser support is available." },
          { question: "Will I lose quality when converting formats?", answer: "Converting from PNG to JPEG or WebP may involve some quality loss due to compression. However, converting from JPEG to PNG won't improve quality - it will just increase file size. The conversion process itself is high-quality." },
          { question: "Which format is best for web use?", answer: "For modern websites, WebP offers the best compression and quality balance. For wider compatibility, use JPEG for photos and PNG for graphics with transparency. Consider providing multiple formats with fallbacks for optimal performance." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default ConvertImage;
