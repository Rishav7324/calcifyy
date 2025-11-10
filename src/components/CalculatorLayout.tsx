import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator } from "lucide-react";
import { Button } from "./ui/button";
import { SEO } from "./SEO";
import { Helmet } from "react-helmet-async";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  formula?: string;
  explanation?: ReactNode;
  keywords?: string;
  canonicalUrl?: string;
}

const CalculatorLayout = ({ title, description, children, formula, explanation, keywords, canonicalUrl }: CalculatorLayoutProps) => {
  const currentUrl = canonicalUrl || `https://primemetric.lovable.app${window.location.pathname}`;
  
  // Structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": currentUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "CalcHub"
    }
  };

  return (
    <>
      <SEO 
        title={title}
        description={description}
        keywords={keywords || `${title.toLowerCase()}, online calculator, free calculator tool, calculation tool`}
        canonicalUrl={currentUrl}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-card border-b border-primary/20" role="navigation" aria-label="Calculator navigation">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group" aria-label="CalcHub home">
              <Calculator className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" aria-hidden="true" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CalcHub
              </span>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm" className="glass-card border-primary/30">
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="max-w-5xl mx-auto mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </header>

        {/* Calculator Content */}
        <section className="max-w-5xl mx-auto" aria-label="Calculator interface">
          {children}
        </section>

        {/* Formula & Explanation */}
        {(formula || explanation) && (
          <section className="max-w-5xl mx-auto mt-12 space-y-6" aria-label="Additional information">
            {formula && (
              <div className="glass-card p-6 rounded-xl animate-scale-in">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-primary" aria-hidden="true">📐</span>
                  Formula Used
                </h3>
                <div className="bg-background/50 p-4 rounded-lg font-mono text-primary">
                  {formula}
                </div>
              </div>
            )}

            {explanation && (
              <div className="glass-card p-6 rounded-xl animate-scale-in" style={{ animationDelay: "100ms" }}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-primary" aria-hidden="true">💡</span>
                  How It Works
                </h3>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  {explanation}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 mt-20" role="contentinfo">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CalcHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default CalculatorLayout;
