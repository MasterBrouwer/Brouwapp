import { BaseEntity } from '../../../types';
import { ProcessStap } from '../../brew-methods/domain/BrewMethod';

export enum RecipeStatus {
  CONCEPT = 'CONCEPT',
  ACTIEF = 'ACTIEF',
  GEBRUIKT = 'GEBRUIKT',
  GEARCHIVEERD = 'GEARCHIVEERD',
}

export interface ExpectedResults {
  og?: number;
  fg?: number;
  abv?: number;
  ibu?: number;
  ebc?: number;
  brouwhefficiency?: number;
}

export interface RecipeIngredient {
  id: string;
  ingrediëntId: string;
  naam: string;
  hoeveelheid: number;
  eenheid: string;
  eigenschappen: { [key: string]: string | number };
}

export interface RecipeVersion extends BaseEntity {
  recipeId: string;
  versieNummer: number;
  batchGrootte: number;
  ingrediënten: RecipeIngredient[];
  processtappen: ProcessStap[];
  verwachteResultaten: ExpectedResults;
  status: RecipeStatus;
}

export interface Recipe extends BaseEntity {
  naam: string;
  stijl: string;
  beschrijving?: string;
  status: RecipeStatus;
  versies: RecipeVersion[];
  userId: string;
}
