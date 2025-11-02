import { Calculator } from "@/types/calculator";

export const financialCalculators: Calculator[] = [
  { id: "mortgage", name: "Mortgage Calculator", description: "Calculate monthly mortgage payments", category: "financial", path: "/calculator/mortgage", implemented: true },
  { id: "auto-loan", name: "Auto Loan Calculator", description: "Calculate car loan payments", category: "financial", path: "/calculator/auto-loan", implemented: true },
  { id: "loan", name: "Loan Calculator", description: "Calculate loan EMI and interest", category: "financial", path: "/calculator/loan", implemented: true },
  { id: "currency", name: "Currency Calculator", description: "Convert between currencies", category: "financial", path: "/calculator/currency", implemented: true },
  { id: "compound-interest", name: "Compound Interest Calculator", description: "Calculate compound interest growth", category: "financial", path: "/calculator/compound-interest", implemented: true },
  { id: "roi", name: "ROI Calculator", description: "Calculate return on investment", category: "financial", path: "/calculator/roi", implemented: true },
  { id: "sip", name: "SIP Calculator", description: "Systematic Investment Plan calculator", category: "financial", path: "/calculator/sip", implemented: true },
  { id: "swp", name: "SWP Calculator", description: "Systematic Withdrawal Plan calculator", category: "financial", path: "/calculator/swp", implemented: true },
  { id: "payment", name: "Payment Calculator", description: "Calculate payment schedules", category: "financial", path: "/calculator/payment", implemented: true },
  { id: "amortization", name: "Amortization Calculator", description: "Calculate loan amortization", category: "financial", path: "/calculator/amortization", implemented: true },
  { id: "finance", name: "Finance Calculator", description: "General finance calculations", category: "financial", path: "/calculator/finance", implemented: true },
  { id: "income-tax", name: "Income Tax Calculator", description: "Calculate income tax", category: "financial", path: "/calculator/income-tax", implemented: true },
  { id: "salary", name: "Salary Calculator", description: "Calculate salary components", category: "financial", path: "/calculator/salary", implemented: true },
  { id: "interest", name: "Interest Calculator", description: "Calculate simple/compound interest", category: "financial", path: "/calculator/interest", implemented: true },
  { id: "simple-interest", name: "Simple Interest Calculator", description: "Calculate simple interest", category: "financial", path: "/calculator/simple-interest", implemented: true },
  { id: "house-affordability", name: "House Affordability Calculator", description: "Calculate affordable house price", category: "financial", path: "/calculator/house-affordability", implemented: true },
  { id: "rent", name: "Rent Calculator", description: "Calculate rental costs", category: "financial", path: "/calculator/rent", implemented: true },
  { id: "discount", name: "Discount Calculator", description: "Calculate discounts and savings", category: "financial", path: "/calculator/discount", implemented: true },
  { id: "retirement", name: "Retirement Calculator", description: "Plan for retirement", category: "financial", path: "/calculator/retirement", implemented: true },
  { id: "investment", name: "Investment Calculator", description: "Calculate investment returns", category: "financial", path: "/calculator/investment", implemented: true },
  { id: "inflation", name: "Inflation Calculator", description: "Calculate inflation impact", category: "financial", path: "/calculator/inflation", implemented: true },
  { id: "401k", name: "401K Calculator", description: "Calculate 401K growth", category: "financial", path: "/calculator/401k", implemented: true },
  { id: "sales-tax", name: "Sales Tax Calculator", description: "Calculate sales tax", category: "financial", path: "/calculator/sales-tax", implemented: true },
  { id: "savings", name: "Savings Calculator", description: "Calculate savings growth", category: "financial", path: "/calculator/savings", implemented: true },
  { id: "budget", name: "Budget Calculator", description: "Plan your budget", category: "financial", path: "/calculator/budget", implemented: true },
  { id: "apr", name: "APR Calculator", description: "Calculate annual percentage rate", category: "financial", path: "/calculator/apr", implemented: true },
];

export const healthCalculators: Calculator[] = [
  { id: "bmi", name: "BMI Calculator", description: "Calculate Body Mass Index", category: "health", path: "/calculator/bmi", implemented: true },
  { id: "body-fat", name: "Body Fat Calculator", description: "Calculate body fat percentage", category: "health", path: "/calculator/body-fat", implemented: true },
  { id: "bmr", name: "BMR Calculator", description: "Calculate Basal Metabolic Rate", category: "health", path: "/calculator/bmr", implemented: true },
  { id: "calorie", name: "Calorie Calculator", description: "Calculate daily calorie needs", category: "health", path: "/calculator/calorie", implemented: true },
  { id: "tdee", name: "TDEE Calculator", description: "Total Daily Energy Expenditure", category: "health", path: "/calculator/tdee", implemented: true },
  { id: "macro", name: "Macro Calculator", description: "Calculate macronutrient needs", category: "health", path: "/calculator/macro", implemented: true },
  { id: "protein", name: "Protein Calculator", description: "Calculate protein needs", category: "health", path: "/calculator/protein", implemented: true },
  { id: "ideal-weight", name: "Ideal Weight Calculator", description: "Calculate ideal body weight", category: "health", path: "/calculator/ideal-weight", implemented: true },
  { id: "pregnancy", name: "Pregnancy Calculator", description: "Track pregnancy timeline", category: "health", path: "/calculator/pregnancy", implemented: true },
  { id: "pace", name: "Pace Calculator", description: "Calculate running pace", category: "health", path: "/calculator/pace", implemented: true },
  { id: "carbohydrate", name: "Carbohydrate Calculator", description: "Calculate carb intake", category: "health", path: "/calculator/carbohydrate", implemented: true },
  { id: "healthy-weight", name: "Healthy Weight Calculator", description: "Find healthy weight range", category: "health", path: "/calculator/healthy-weight", implemented: true },
];

export const mathCalculators: Calculator[] = [
  { id: "percentage", name: "Percentage Calculator", description: "Calculate percentages", category: "math", path: "/calculator/percentage", implemented: true },
  { id: "scientific", name: "Scientific Calculator", description: "Advanced scientific calculations", category: "math", path: "/calculator/scientific", implemented: true },
  { id: "area", name: "Area Calculator", description: "Calculate area of shapes", category: "math", path: "/calculator/area", implemented: true },
  { id: "volume", name: "Volume Calculator", description: "Calculate volume of shapes", category: "math", path: "/calculator/volume", implemented: true },
  { id: "slope", name: "Slope Calculator", description: "Calculate line slope", category: "math", path: "/calculator/slope", implemented: true },
  { id: "fraction", name: "Fraction Calculator", description: "Calculate with fractions", category: "math", path: "/calculator/fraction", implemented: true },
  { id: "basic", name: "Basic Calculator", description: "Basic arithmetic operations", category: "math", path: "/calculator/basic", implemented: true },
  { id: "average", name: "Average Calculator", description: "Calculate mean, median, mode", category: "math", path: "/calculator/average", implemented: true },
  { id: "random-number", name: "Random Number Generator", description: "Generate random numbers", category: "math", path: "/calculator/random-number", implemented: true },
  { id: "ratio", name: "Ratio Calculator", description: "Simplify ratios", category: "math", path: "/calculator/ratio", implemented: true },
  { id: "circle", name: "Circle Calculator", description: "Calculate circle properties", category: "math", path: "/calculator/circle", implemented: true },
  { id: "triangle", name: "Triangle Calculator", description: "Calculate triangle properties", category: "math", path: "/calculator/triangle", implemented: true },
  { id: "pythagorean", name: "Pythagorean Calculator", description: "Pythagorean theorem", category: "math", path: "/calculator/pythagorean", implemented: true },
  { id: "quadratic", name: "Quadratic Calculator", description: "Solve quadratic equations", category: "math", path: "/calculator/quadratic", implemented: true },
  { id: "standard-deviation", name: "Standard Deviation Calculator", description: "Calculate standard deviation", category: "math", path: "/calculator/standard-deviation", implemented: true },
  { id: "distance", name: "Distance Calculator", description: "Calculate distance between points", category: "math", path: "/calculator/distance", implemented: true },
  { id: "percent-error", name: "Percent Error Calculator", description: "Calculate percent error", category: "math", path: "/calculator/percent-error", implemented: true },
  { id: "binary", name: "Binary Calculator", description: "Binary calculations", category: "math", path: "/calculator/binary", implemented: true },
];

export const otherCalculators: Calculator[] = [
  { id: "age", name: "Age Calculator", description: "Calculate age precisely", category: "other", path: "/calculator/age", implemented: true },
  { id: "time", name: "Time Calculator", description: "Calculate time differences", category: "other", path: "/calculator/time", implemented: true },
  { id: "gpa", name: "GPA Calculator", description: "Calculate Grade Point Average", category: "other", path: "/calculator/gpa", implemented: true },
  { id: "grade", name: "Grade Calculator", description: "Calculate grades and scores", category: "other", path: "/calculator/grade", implemented: true },
  { id: "tip", name: "Tip Calculator", description: "Calculate tips and splits", category: "other", path: "/calculator/tip", implemented: true },
  { id: "date", name: "Date Calculator", description: "Calculate between dates", category: "other", path: "/calculator/date", implemented: true },
  { id: "password", name: "Password Generator", description: "Generate secure passwords", category: "other", path: "/calculator/password", implemented: true },
  { id: "time-zone", name: "Time Zone Calculator", description: "Convert time zones", category: "other", path: "/calculator/time-zone", implemented: true },
  { id: "height", name: "Height Calculator", description: "Convert height units", category: "other", path: "/calculator/height", implemented: true },
  { id: "conversion", name: "Conversion Calculator", description: "Unit conversions", category: "other", path: "/calculator/conversion", implemented: true },
  { id: "speed", name: "Speed Calculator", description: "Calculate speed", category: "other", path: "/calculator/speed", implemented: true },
  { id: "dice", name: "Dice Roller", description: "Roll virtual dice", category: "other", path: "/calculator/dice", implemented: true },
  { id: "mileage", name: "Mileage Calculator", description: "Calculate mileage", category: "other", path: "/calculator/mileage", implemented: true },
  { id: "fuel-cost", name: "Fuel Cost Calculator", description: "Calculate fuel costs", category: "other", path: "/calculator/fuel-cost", implemented: true },
];

export const imageTools: Calculator[] = [
  { id: "crop-image", name: "Crop Image", description: "Crop images online", category: "tools", path: "/tool/crop-image", implemented: true },
  { id: "resize-image", name: "Image Resizer", description: "Resize images", category: "tools", path: "/tool/resize-image", implemented: true },
  { id: "compress-image", name: "Image Compressor", description: "Compress images", category: "tools", path: "/tool/compress-image", implemented: true },
  { id: "convert-image", name: "Image Converter", description: "Convert image formats", category: "tools", path: "/tool/convert-image", implemented: true },
  { id: "color-picker", name: "Color Picker", description: "Pick colors from images", category: "tools", path: "/tool/color-picker", implemented: true },
];

export const allCalculators = [
  ...financialCalculators,
  ...healthCalculators,
  ...mathCalculators,
  ...otherCalculators,
  ...imageTools,
];
