import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BMICalculator from "./pages/calculators/BMICalculator";
import LoanCalculator from "./pages/calculators/LoanCalculator";
import DiscountCalculator from "./pages/calculators/DiscountCalculator";
import MortgageCalculator from "./pages/calculators/MortgageCalculator";
import AutoLoanCalculator from "./pages/calculators/AutoLoanCalculator";
import CurrencyCalculator from "./pages/calculators/CurrencyCalculator";
import ROICalculator from "./pages/calculators/ROICalculator";
import CompoundInterestCalculator from "./pages/calculators/CompoundInterestCalculator";
import SIPCalculator from "./pages/calculators/SIPCalculator";
import SWPCalculator from "./pages/calculators/SWPCalculator";
import BodyFatCalculator from "./pages/calculators/BodyFatCalculator";
import BMRCalculator from "./pages/calculators/BMRCalculator";
import TDEECalculator from "./pages/calculators/TDEECalculator";
import CalorieCalculator from "./pages/calculators/CalorieCalculator";
import MacroCalculator from "./pages/calculators/MacroCalculator";
import ProteinCalculator from "./pages/calculators/ProteinCalculator";
import IdealWeightCalculator from "./pages/calculators/IdealWeightCalculator";
import InterestCalculator from "./pages/calculators/InterestCalculator";
import PregnancyCalculator from "./pages/calculators/PregnancyCalculator";
import PaceCalculator from "./pages/calculators/PaceCalculator";
import RandomNumberGenerator from "./pages/calculators/RandomNumberGenerator";
import HeightCalculator from "./pages/calculators/HeightCalculator";
import ConversionCalculator from "./pages/calculators/ConversionCalculator";
import DiceRoller from "./pages/calculators/DiceRoller";
import SimpleInterestCalculator from "./pages/calculators/SimpleInterestCalculator";
import SalaryCalculator from "./pages/calculators/SalaryCalculator";
import RatioCalculator from "./pages/calculators/RatioCalculator";
import CircleCalculator from "./pages/calculators/CircleCalculator";
import TriangleCalculator from "./pages/calculators/TriangleCalculator";
import PythagoreanCalculator from "./pages/calculators/PythagoreanCalculator";
import QuadraticCalculator from "./pages/calculators/QuadraticCalculator";
import StandardDeviationCalculator from "./pages/calculators/StandardDeviationCalculator";
import DistanceCalculator from "./pages/calculators/DistanceCalculator";
import SpeedCalculator from "./pages/calculators/SpeedCalculator";
import FinancialCalculators from "./pages/FinancialCalculators";
import HealthCalculators from "./pages/HealthCalculators";
import MathCalculators from "./pages/MathCalculators";
import OtherCalculators from "./pages/OtherCalculators";
import AllCalculators from "./pages/AllCalculators";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/financial" element={<FinancialCalculators />} />
          <Route path="/health" element={<HealthCalculators />} />
          <Route path="/math" element={<MathCalculators />} />
          <Route path="/utilities" element={<OtherCalculators />} />
          <Route path="/calculators" element={<AllCalculators />} />
          <Route path="/calculator/bmi" element={<BMICalculator />} />
          <Route path="/calculator/loan" element={<LoanCalculator />} />
          <Route path="/calculator/discount" element={<DiscountCalculator />} />
          <Route path="/calculator/mortgage" element={<MortgageCalculator />} />
          <Route path="/calculator/auto-loan" element={<AutoLoanCalculator />} />
          <Route path="/calculator/currency" element={<CurrencyCalculator />} />
          <Route path="/calculator/roi" element={<ROICalculator />} />
          <Route path="/calculator/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/calculator/sip" element={<SIPCalculator />} />
          <Route path="/calculator/swp" element={<SWPCalculator />} />
          <Route path="/calculator/body-fat" element={<BodyFatCalculator />} />
          <Route path="/calculator/bmr" element={<BMRCalculator />} />
          <Route path="/calculator/tdee" element={<TDEECalculator />} />
          <Route path="/calculator/calorie" element={<CalorieCalculator />} />
          <Route path="/calculator/macro" element={<MacroCalculator />} />
          <Route path="/calculator/protein" element={<ProteinCalculator />} />
          <Route path="/calculator/ideal-weight" element={<IdealWeightCalculator />} />
          <Route path="/calculator/interest" element={<InterestCalculator />} />
          <Route path="/calculator/pregnancy" element={<PregnancyCalculator />} />
          <Route path="/calculator/pace" element={<PaceCalculator />} />
          <Route path="/calculator/random-number" element={<RandomNumberGenerator />} />
          <Route path="/calculator/height" element={<HeightCalculator />} />
          <Route path="/calculator/conversion" element={<ConversionCalculator />} />
          <Route path="/calculator/dice" element={<DiceRoller />} />
          <Route path="/calculator/simple-interest" element={<SimpleInterestCalculator />} />
          <Route path="/calculator/salary" element={<SalaryCalculator />} />
          <Route path="/calculator/ratio" element={<RatioCalculator />} />
          <Route path="/calculator/circle" element={<CircleCalculator />} />
          <Route path="/calculator/triangle" element={<TriangleCalculator />} />
          <Route path="/calculator/pythagorean" element={<PythagoreanCalculator />} />
          <Route path="/calculator/quadratic" element={<QuadraticCalculator />} />
          <Route path="/calculator/standard-deviation" element={<StandardDeviationCalculator />} />
          <Route path="/calculator/distance" element={<DistanceCalculator />} />
          <Route path="/calculator/speed" element={<SpeedCalculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
