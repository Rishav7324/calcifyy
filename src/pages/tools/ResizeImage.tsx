import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { Upload, Download, Maximize2 } from "lucide-react";
import { toast } from "sonner";

const ResizeImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [preset, setPreset] = useState("custom");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const presets = [
    { value: "custom", label: "Custom Size", width: 800, height: 600 },
    { value: "instagram-square", label: "Instagram Square", width: 1080, height: 1080 },
    { value: "instagram-portrait", label: "Instagram Portrait", width: 1080, height: 1350 },
    { value: "facebook-post", label: "Facebook Post", width: 1200, height: 630 },
    { value: "twitter-post", label: "Twitter Post", width: 1200, height: 675 },
    { value: "youtube-thumbnail", label: "YouTube Thumbnail", width: 1280, height: 720 },
    { value: "hd", label: "HD (1920x1080)", width: 1920, height: 1080 },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetChange = (value: string) => {
    setPreset(value);
    const selectedPreset = presets.find(p => p.value === value);
    if (selectedPreset) {
      setDimensions({ width: selectedPreset.width, height: selectedPreset.height });
    }
  };

  const handleResize = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      toast.success("Image resized successfully!");
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `resized-image-${dimensions.width}x${dimensions.height}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast.success("Image downloaded!");
  };

  return (
    <CalculatorLayout
      title="Resize Image"
      description="Resize images to custom dimensions or popular social media sizes"
      keywords="resize image, image resizer, scale image, resize photo, social media image sizes, instagram image size"
      canonicalUrl="https://calcifyy.lovable.app/tool/resize-image"
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
                  <Label>Preset Sizes</Label>
                  <Select value={preset} onValueChange={handlePresetChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {presets.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label} {p.value !== "custom" && `(${p.width}x${p.height})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Width (px)</Label>
                    <Input
                      type="number"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Height (px)</Label>
                    <Input
                      type="number"
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Preview</Label>
                <canvas ref={canvasRef} className="border rounded-lg max-w-full" />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleResize} className="flex-1">
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Resize Image
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

export default ResizeImage;
