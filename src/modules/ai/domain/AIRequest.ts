export enum AIUseCase {
  RECIPE_ADVICE = 'RECIPE_ADVICE',
  PROCESS_STEP_ADVICE = 'PROCESS_STEP_ADVICE',
  FERMENTATION_ANALYSIS = 'FERMENTATION_ANALYSIS',
  HISTORICAL_COMPARISON = 'HISTORICAL_COMPARISON',
  GENERAL_CHAT = 'GENERAL_CHAT',
}

export interface AIContext {
  recipeData?: any;
  sessionData?: any;
  measurementData?: any;
  historicalData?: any;
}

export interface AIRequest {
  useCase: AIUseCase;
  context: AIContext;
  userMessage?: string;
}

export interface AIResponse {
  id: string;
  timestamp: Date;
  content: string;
  useCase: AIUseCase;
  privacyFiltered: boolean;
}
