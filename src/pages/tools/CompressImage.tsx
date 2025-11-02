import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState, useRef } from "react";
import { Upload, Download, Minimize2 } from "lucide-react";
import { toast } from "sonner";

const CompressImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompress = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            toast.success("Image compressed successfully!");
          }
        },
        "image/jpeg",
        quality[0] / 100
      );
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(
      (blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.download = `compressed-image-q${quality[0]}.jpg`;
          link.href = URL.createObjectURL(blob);
          link.click();
          toast.success("Image downloaded!");
        }
      },
      "image/jpeg",
      quality[0] / 100
    );
  };

  const compressionRatio = originalSize && compressedSize
    ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
    : 0;

  return (
    <CalculatorLayout
      title="Compress Image"
      description="Reduce image file size while maintaining quality"
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Quality: {quality[0]}%</Label>
                    <span className="text-sm text-muted-foreground">
                      Higher quality = larger file size
                    </span>
                  </div>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    min={1}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {compressedSize > 0 && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Original</div>
                      <div className="font-bold">{formatFileSize(originalSize)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Compressed</div>
                      <div className="font-bold text-primary">{formatFileSize(compressedSize)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Saved</div>
                      <div className="font-bold text-green-600">{compressionRatio}%</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>Preview</Label>
                <canvas ref={canvasRef} className="border rounded-lg max-w-full" />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCompress} className="flex-1">
                  <Minimize2 className="w-4 h-4 mr-2" />
                  Compress Image
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1" disabled={!compressedSize}>
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

export default CompressImage;
