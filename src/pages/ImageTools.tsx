import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { imageTools } from "@/data/calculators";
import { Link } from "react-router-dom";
import { Image, ArrowRight } from "lucide-react";

const ImageTools = () => {
  return (
    <CalculatorLayout
      title="Image Tools"
      description="Professional image editing tools - crop, resize, compress, and convert images online"
      keywords="image tools, edit images online, resize image, compress image, convert image, crop image, image editor"
      canonicalUrl="https://calcifyy.lovable.app/image-tools"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageTools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group"
          >
            <Card className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {tool.description}
              </p>
            </Card>
          </Link>
        ))}
        </div>
      </CalculatorLayout>
  );
};

export default ImageTools;
