import { BaseEntity } from '../../../types';

export enum IngredientType {
  MOUT = 'MOUT',
  HOP = 'HOP',
  GIST = 'GIST',
  SUIKER = 'SUIKER',
  CUSTOM = 'CUSTOM',
}

export interface IngredientProperties {
  [key: string]: string | number | boolean;
}

export interface MoutProperties extends IngredientProperties {
  ebc: number;
  extractOpbrengst: number;
  type?: string;
}

export interface HopProperties extends IngredientProperties {
  alfazuur: number;
  type?: string;
  oogstjaar?: number;
}

export interface GistProperties extends IngredientProperties {
  gistType: string;
  vergistingsgraad: number;
  aanbevolenTemperatuur: number;
  alcoholTolerantie: number;
}

export interface SuikerProperties extends IngredientProperties {
  type?: string;
}

export interface Ingredient extends BaseEntity {
  naam: string;
  type: IngredientType;
  leverancier?: string;
  beschrijving?: string;
  actief: boolean;
  favoriet: boolean;
  eigenschappen: IngredientProperties;
  userId: string;
}
