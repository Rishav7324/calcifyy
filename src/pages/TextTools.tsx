import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { textTools } from "@/data/calculators";
import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";

const TextTools = () => {
  return (
    <>
      <SEO
        title="Free Online Text Tools - Word Counter, Case Converter & More"
        description="Professional text editing tools - word counter, case converter, Lorem Ipsum generator, URL encoder, Base64 encoder, JSON formatter, and more."
        keywords="text tools, word counter, case converter, lorem ipsum, url encoder, base64, json formatter, qr code, hash generator"
      />
      <CalculatorLayout
        title="Text & Developer Tools"
        description="Professional text and developer utilities - formatting, encoding, and generation tools"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {textTools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="group"
            >
              <Card className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
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
    </>
  );
};

export default TextTools;
