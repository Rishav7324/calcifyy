import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface UseCase {
  title: string;
  description: string;
}

interface Tip {
  title: string;
  description: string;
}

interface CalculatorContentSectionProps {
  faqs?: FAQ[];
  useCases?: UseCase[];
  tips?: Tip[];
  aboutContent?: string;
}

const CalculatorContentSection = ({ faqs, useCases, tips, aboutContent }: CalculatorContentSectionProps) => {
  return (
    <div className="max-w-5xl mx-auto mt-12 space-y-8">
      {aboutContent && (
        <Card className="glass-card p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">📚</span>
            About This Calculator
          </h2>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className="leading-relaxed">{aboutContent}</p>
          </div>
        </Card>
      )}

      {useCases && useCases.length > 0 && (
        <Card className="glass-card p-8 animate-scale-in" style={{ animationDelay: "100ms" }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-primary">🎯</span>
            Common Use Cases
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <h3 className="font-semibold text-primary mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tips && tips.length > 0 && (
        <Card className="glass-card p-8 animate-scale-in" style={{ animationDelay: "200ms" }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-primary">💡</span>
            Tips & Best Practices
          </h2>
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/5 border border-secondary/10">
                <h3 className="font-semibold text-secondary mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {faqs && faqs.length > 0 && (
        <Card className="glass-card p-8 animate-scale-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-primary">❓</span>
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass-card border-primary/10 px-4">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      )}
    </div>
  );
};

export default CalculatorContentSection;