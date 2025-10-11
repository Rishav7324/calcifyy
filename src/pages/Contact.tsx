import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Have a question or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card/80 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                  <p className="text-muted-foreground">
                    For general inquiries and support:
                  </p>
                  <a href="mailto:support@calculators.com" className="text-primary hover:underline">
                    support@calculators.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex items-start space-x-4">
                <MessageSquare className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Feedback</h3>
                  <p className="text-muted-foreground">
                    We value your feedback! Let us know how we can improve our calculators 
                    and tools to better serve you.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur">
              <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/privacy-policy" className="block text-primary hover:underline">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="block text-primary hover:underline">
                  Terms of Service
                </Link>
                <Link to="/about" className="block text-primary hover:underline">
                  About Us
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;