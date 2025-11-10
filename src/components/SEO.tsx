import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
}

export const SEO = ({ 
  title, 
  description, 
  keywords = "calculator, online calculator, free calculator, math calculator, financial calculator",
  canonicalUrl,
  ogType = "website"
}: SEOProps) => {
  const siteName = "CalcHub - Free Online Calculators";
  const fullTitle = title.includes("CalcHub") ? title : `${title} | CalcHub`;
  const baseUrl = "https://primemetric.lovable.app";
  const canonical = canonicalUrl || baseUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#4F97FF" />
    </Helmet>
  );
};
