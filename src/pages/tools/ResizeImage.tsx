import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { Upload, Download, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import CalculatorContentSection from "@/components/CalculatorContentSection";

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
      canonicalUrl="https://primemetric.online/tool/resize-image"
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

      <CalculatorContentSection
        aboutContent="The Image Resize Tool adjusts image dimensions to specific widths and heights or uses preset sizes optimized for popular social media platforms and web applications. Resizing images is crucial for web optimization, ensuring images display correctly across devices, and meeting platform-specific dimension requirements. The tool offers preset dimensions for Instagram, Facebook, Twitter, LinkedIn profiles, and more, plus custom sizing for any specific needs. Properly sized images load faster, look professional, and ensure your content displays optimally everywhere."
        useCases={[
          { title: "Social Media Content", description: "Resize images to exact dimensions required by Instagram posts (1080x1080), Facebook covers (820x312), Twitter headers (1500x500), and other platforms for perfect display." },
          { title: "Website Optimization", description: "Resize large images to appropriate display dimensions for faster page loading, reduced bandwidth usage, and improved user experience across all devices." },
          { title: "Email Marketing", description: "Resize images to optimal email dimensions ensuring fast loading in email clients and proper display on mobile devices without slow load times." },
          { title: "Thumbnail Creation", description: "Create thumbnail versions of images for galleries, product listings, or blog posts by resizing to smaller dimensions while maintaining aspect ratio." }
        ]}
        tips={[
          { title: "Maintain Aspect Ratio", description: "When resizing, maintain the original aspect ratio to prevent distortion. If you need different proportions, crop first, then resize to your target dimensions." },
          { title: "Downsize, Don't Upsize", description: "Resizing images larger than their original size (upscaling) degrades quality significantly. Always work from high-resolution sources when creating multiple sizes." },
          { title: "Use Presets for Consistency", description: "Leverage preset dimensions for social media to ensure your images always meet platform requirements and display correctly without cropping or distortion." },
          { title: "Consider Retina Displays", description: "For web graphics, consider creating images at 2x dimensions for crisp display on retina/high-DPI screens, then let CSS scale them down appropriately." }
        ]}
        faqs={[
          { question: "What happens if I resize an image larger than the original?", answer: "Enlarging images (upscaling) degrades quality because the software must create new pixels through interpolation. The result will be blurry or pixelated. Always resize smaller from high-resolution originals rather than enlarging small images." },
          { question: "Should I resize before or after compressing?", answer: "Resize first, then compress. Resizing reduces the number of pixels, so there's no point compressing pixels that will be removed. Resize to final dimensions, then apply compression for optimal file size and quality." },
          { question: "What are the best dimensions for social media?", answer: "Instagram posts: 1080×1080 (square), Instagram stories: 1080×1920, Facebook posts: 1200×630, Twitter posts: 1200×675, LinkedIn posts: 1200×627. Use the preset dimensions in this tool for optimal platform compatibility." },
          { question: "How do custom dimensions work?", answer: "Custom dimensions let you specify exact width and height in pixels. The tool will resize your image to those dimensions, but be aware this may distort the image if the aspect ratio doesn't match your original. For best results, calculate dimensions that maintain your original aspect ratio." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default ResizeImage;
