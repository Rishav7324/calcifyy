import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CookiePolicy from "./pages/CookiePolicy";
import Disclaimer from "./pages/Disclaimer";
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
import PercentageCalculator from "./pages/calculators/PercentageCalculator";
import ScientificCalculator from "./pages/calculators/ScientificCalculator";
import AgeCalculator from "./pages/calculators/AgeCalculator";
import TimeCalculator from "./pages/calculators/TimeCalculator";
import GPACalculator from "./pages/calculators/GPACalculator";
import GradeCalculator from "./pages/calculators/GradeCalculator";
import TipCalculator from "./pages/calculators/TipCalculator";
import DateCalculator from "./pages/calculators/DateCalculator";
import PasswordGenerator from "./pages/calculators/PasswordGenerator";
import TimeZoneCalculator from "./pages/calculators/TimeZoneCalculator";
import RetirementCalculator from "./pages/calculators/RetirementCalculator";
import InvestmentCalculator from "./pages/calculators/InvestmentCalculator";
import InflationCalculator from "./pages/calculators/InflationCalculator";
import SalesTaxCalculator from "./pages/calculators/SalesTaxCalculator";
import SavingsCalculator from "./pages/calculators/SavingsCalculator";
import APRCalculator from "./pages/calculators/APRCalculator";
import BudgetCalculator from "./pages/calculators/BudgetCalculator";
import The401KCalculator from "./pages/calculators/the401KCalculator";
import AreaCalculator from "./pages/calculators/AreaCalculator";
import VolumeCalculator from "./pages/calculators/VolumeCalculator";
import SlopeCalculator from "./pages/calculators/SlopeCalculator";
import FractionCalculator from "./pages/calculators/FractionCalculator";
import BasicCalculator from "./pages/calculators/BasicCalculator";
import AverageCalculator from "./pages/calculators/AverageCalculator";
import PaymentCalculator from "./pages/calculators/PaymentCalculator";
import AmortizationCalculator from "./pages/calculators/AmortizationCalculator";
import FinanceCalculator from "./pages/calculators/FinanceCalculator";
import IncomeTaxCalculator from "./pages/calculators/IncomeTaxCalculator";
import HouseAffordabilityCalculator from "./pages/calculators/HouseAffordabilityCalculator";
import RentCalculator from "./pages/calculators/RentCalculator";
import CarbohydrateCalculator from "./pages/calculators/CarbohydrateCalculator";
import HealthyWeightCalculator from "./pages/calculators/HealthyWeightCalculator";
import PercentErrorCalculator from "./pages/calculators/PercentErrorCalculator";
import BinaryCalculator from "./pages/calculators/BinaryCalculator";
import MileageCalculator from "./pages/calculators/MileageCalculator";
import FuelCostCalculator from "./pages/calculators/FuelCostCalculator";
import FinancialCalculators from "./pages/FinancialCalculators";
import HealthCalculators from "./pages/HealthCalculators";
import MathCalculators from "./pages/MathCalculators";
import OtherCalculators from "./pages/OtherCalculators";
import AllCalculators from "./pages/AllCalculators";
import ImageTools from "./pages/ImageTools";
import CropImage from "./pages/tools/CropImage";
import ResizeImage from "./pages/tools/ResizeImage";
import CompressImage from "./pages/tools/CompressImage";
import ConvertImage from "./pages/tools/ConvertImage";
import ColorPicker from "./pages/tools/ColorPicker";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/financial-calculators" element={<FinancialCalculators />} />
          <Route path="/health-calculators" element={<HealthCalculators />} />
          <Route path="/math-calculators" element={<MathCalculators />} />
          <Route path="/other-calculators" element={<OtherCalculators />} />
          <Route path="/all-calculators" element={<AllCalculators />} />
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
          <Route path="/calculator/percentage" element={<PercentageCalculator />} />
          <Route path="/calculator/scientific" element={<ScientificCalculator />} />
          <Route path="/calculator/age" element={<AgeCalculator />} />
          <Route path="/calculator/time" element={<TimeCalculator />} />
          <Route path="/calculator/gpa" element={<GPACalculator />} />
          <Route path="/calculator/grade" element={<GradeCalculator />} />
          <Route path="/calculator/tip" element={<TipCalculator />} />
          <Route path="/calculator/date" element={<DateCalculator />} />
          <Route path="/calculator/password" element={<PasswordGenerator />} />
          <Route path="/calculator/time-zone" element={<TimeZoneCalculator />} />
          <Route path="/calculator/retirement" element={<RetirementCalculator />} />
          <Route path="/calculator/investment" element={<InvestmentCalculator />} />
          <Route path="/calculator/inflation" element={<InflationCalculator />} />
          <Route path="/calculator/sales-tax" element={<SalesTaxCalculator />} />
          <Route path="/calculator/savings" element={<SavingsCalculator />} />
          <Route path="/calculator/apr" element={<APRCalculator />} />
          <Route path="/calculator/budget" element={<BudgetCalculator />} />
          <Route path="/calculator/401k" element={<The401KCalculator />} />
          <Route path="/calculator/area" element={<AreaCalculator />} />
          <Route path="/calculator/volume" element={<VolumeCalculator />} />
          <Route path="/calculator/slope" element={<SlopeCalculator />} />
          <Route path="/calculator/fraction" element={<FractionCalculator />} />
          <Route path="/calculator/basic" element={<BasicCalculator />} />
          <Route path="/calculator/average" element={<AverageCalculator />} />
          <Route path="/calculator/payment" element={<PaymentCalculator />} />
          <Route path="/calculator/amortization" element={<AmortizationCalculator />} />
          <Route path="/calculator/finance" element={<FinanceCalculator />} />
          <Route path="/calculator/income-tax" element={<IncomeTaxCalculator />} />
          <Route path="/calculator/house-affordability" element={<HouseAffordabilityCalculator />} />
          <Route path="/calculator/rent" element={<RentCalculator />} />
          <Route path="/calculator/carbohydrate" element={<CarbohydrateCalculator />} />
          <Route path="/calculator/healthy-weight" element={<HealthyWeightCalculator />} />
          <Route path="/calculator/percent-error" element={<PercentErrorCalculator />} />
          <Route path="/calculator/binary" element={<BinaryCalculator />} />
          <Route path="/calculator/mileage" element={<MileageCalculator />} />
          <Route path="/calculator/fuel-cost" element={<FuelCostCalculator />} />
          <Route path="/image-tools" element={<ImageTools />} />
          <Route path="/tool/crop-image" element={<CropImage />} />
          <Route path="/tool/resize-image" element={<ResizeImage />} />
          <Route path="/tool/compress-image" element={<CompressImage />} />
          <Route path="/tool/convert-image" element={<ConvertImage />} />
          <Route path="/tool/color-picker" element={<ColorPicker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
