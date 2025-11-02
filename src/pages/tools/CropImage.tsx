import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Upload, Download, RotateCw } from "lucide-react";
import { toast } from "sonner";

const CropImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleCrop = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
      ctx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      );
      toast.success("Image cropped successfully!");
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast.success("Image downloaded!");
  };

  return (
    <CalculatorLayout
      title="Crop Image"
      description="Upload and crop your images to the perfect size"
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>X Position</Label>
                  <Input
                    type="number"
                    value={cropArea.x}
                    onChange={(e) => setCropArea({ ...cropArea, x: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Y Position</Label>
                  <Input
                    type="number"
                    value={cropArea.y}
                    onChange={(e) => setCropArea({ ...cropArea, y: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Width</Label>
                  <Input
                    type="number"
                    value={cropArea.width}
                    onChange={(e) => setCropArea({ ...cropArea, width: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Height</Label>
                  <Input
                    type="number"
                    value={cropArea.height}
                    onChange={(e) => setCropArea({ ...cropArea, height: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/20">
                  <img src={image} alt="Preview" className="max-w-full h-auto" />
                </div>
                <canvas ref={canvasRef} className="border rounded-lg max-w-full" />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCrop} className="flex-1">
                  <RotateCw className="w-4 h-4 mr-2" />
                  Crop Image
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

export default CropImage;
