import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Heart, TrendingUp, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">About Us</h1>
          <p className="text-muted-foreground text-lg">
            Your trusted source for accurate and easy-to-use calculators
          </p>
        </div>

        <Card className="p-8 bg-card/80 backdrop-blur mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            We are dedicated to providing free, accurate, and user-friendly calculators and tools 
            that help people make informed decisions in their daily lives. Whether you're planning 
            your finances, monitoring your health, or solving mathematical problems, we're here to help.
          </p>
          <p className="text-muted-foreground">
            Our platform offers a comprehensive collection of calculators across multiple categories 
            including financial planning, health and fitness, mathematics, and everyday utilities.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-card/80 backdrop-blur">
            <div className="flex items-start space-x-4">
              <Calculator className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">100+ Calculators</h3>
                <p className="text-muted-foreground">
                  A comprehensive suite of calculators covering financial, health, math, 
                  and everyday calculations.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur">
            <div className="flex items-start space-x-4">
              <Heart className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">User-Focused</h3>
                <p className="text-muted-foreground">
                  Designed with simplicity and accuracy in mind, making complex calculations 
                  accessible to everyone.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur">
            <div className="flex items-start space-x-4">
              <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Always Improving</h3>
                <p className="text-muted-foreground">
                  We continuously update and add new calculators based on user feedback 
                  and emerging needs.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur">
            <div className="flex items-start space-x-4">
              <Users className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
                <p className="text-muted-foreground">
                  Built for users by listening to your needs and incorporating your valuable suggestions.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-card/80 backdrop-blur">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>100% free to use - no hidden fees or subscriptions</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Privacy-focused - calculations done locally in your browser</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Mobile-friendly - works seamlessly on all devices</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>No registration required - instant access to all tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Regular updates with new calculators and features</span>
            </li>
          </ul>
        </Card>

        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Have questions or suggestions?
          </p>
          <Link to="/contact">
            <Button>Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;