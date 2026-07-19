export interface CalculationMetadata {
  formula: string;
  inputs: { [key: string]: string | number };
  timestamp: Date;
  overridden: boolean;
  overriddenBy?: string;
}

export interface CalculationResult {
  value: number;
  unit: string;
  metadata: CalculationMetadata;
}

export interface RecipeCalculations {
  og: CalculationResult;
  fg: CalculationResult;
  abv: CalculationResult;
  ibu: CalculationResult;
  ebc: CalculationResult;
  brewhouse_efficiency: CalculationResult;
}
