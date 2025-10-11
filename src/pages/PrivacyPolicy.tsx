import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <Card className="p-8 bg-card/80 backdrop-blur">
          <h1 className="text-4xl font-bold mb-6 text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us when using our calculators and tools. 
                This may include calculation inputs and usage data to improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our calculators and tools, 
                to develop new features, and to protect our users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Data Storage</h2>
              <p className="text-muted-foreground">
                All calculations are performed locally in your browser. We do not store your calculation data 
                on our servers unless you explicitly choose to save or share your results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to track activity on our service and 
                hold certain information to improve user experience and analyze usage patterns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
              <p className="text-muted-foreground">
                We may use third-party services such as Google AdSense for advertising. These services 
                may collect information about your visits to our website and other websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to access, update, or delete your personal information. You can also 
                opt out of certain data collection practices through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us through our 
                <Link to="/contact" className="text-primary hover:underline ml-1">contact page</Link>.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;