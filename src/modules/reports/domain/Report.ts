import { BaseEntity } from '../../../types';

export enum ReportType {
  RECIPE = 'RECIPE',
  SESSION = 'SESSION',
  COMPARISON = 'COMPARISON',
  COMMUNITY = 'COMMUNITY',
}

export interface RecipeReport extends BaseEntity {
  recipeId: string;
  receptVersieId: string;
  title: string;
  generatedAt: Date;
  content: string;
}

export interface SessionReport extends BaseEntity {
  sessionId: string;
  title: string;
  generatedAt: Date;
  content: string;
  measurements: any[];
}

export interface ComparisonReport extends BaseEntity {
  recipeIds: string[];
  sessionIds: string[];
  title: string;
  generatedAt: Date;
  content: string;
}
