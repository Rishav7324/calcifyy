export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  implemented: boolean;
}

export interface CalculatorCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  calculators: Calculator[];
}
