import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Home, Calculator } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="p-8 max-w-md w-full text-center bg-card/80 backdrop-blur">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2 text-foreground">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-3">
          <Link to="/" className="block">
            <Button className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          
          <Link to="/all-calculators" className="block">
            <Button variant="outline" className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Browse All Calculators
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
