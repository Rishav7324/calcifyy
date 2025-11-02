import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { Upload, Copy, Pipette } from "lucide-react";
import { toast } from "sonner";

const ColorPicker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 });
  const [hslColor, setHslColor] = useState({ h: 0, s: 0, l: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

  useEffect(() => {
    if (image && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
      };
    }
  }, [image]);

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    setRgbColor({ r, g, b });
    setSelectedColor(`#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`);
    setHslColor(rgbToHsl(r, g, b));
    toast.success("Color picked!");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <CalculatorLayout
      title="Color Picker"
      description="Pick colors from images and get HEX, RGB, and HSL values"
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Pipette className="w-4 h-4" />
                  <span>Click anywhere on the image to pick a color</span>
                </div>
                
                <div className="border rounded-lg overflow-hidden bg-muted/20">
                  <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className="max-w-full h-auto cursor-crosshair"
                  />
                  <img
                    ref={imageRef}
                    src={image}
                    alt="Color picker"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
                  <div
                    className="w-24 h-24 rounded-lg border-2 border-border shadow-lg"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground">HEX</div>
                        <div className="font-mono font-bold text-lg">{selectedColor.toUpperCase()}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(selectedColor.toUpperCase(), "HEX")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground">RGB</div>
                        <div className="font-mono font-bold">
                          rgb({rgbColor.r}, {rgbColor.g}, {rgbColor.b})
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`, "RGB")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground">HSL</div>
                        <div className="font-mono font-bold">
                          hsl({hslColor.h}, {hslColor.s}%, {hslColor.l}%)
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`, "HSL")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default ColorPicker;
