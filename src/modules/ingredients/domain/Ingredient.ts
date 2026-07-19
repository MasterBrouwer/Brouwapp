import { BaseEntity } from '../../../types';

/**
 * Unique identifier for an ingredient
 */
export type IngredientId = string & { readonly __brand: 'IngredientId' };

/**
 * Type of ingredient
 * Standard types defined in functional specs
 */
export enum IngredientType {
  MALT = 'MALT',
  HOP = 'HOP',
  YEAST = 'YEAST',
  SUGAR = 'SUGAR',
  CUSTOM = 'CUSTOM',
}

/**
 * Category for organizing ingredients
 */
export enum IngredientCategory {
  MALT = 'MALT',
  ADJUNCT = 'ADJUNCT',
  HOP = 'HOP',
  YEAST = 'YEAST',
  SPICE = 'SPICE',
  WATER_TREATMENT = 'WATER_TREATMENT',
  CLARIFIER = 'CLARIFIER',
  OTHER = 'OTHER',
}

/**
 * Generic ingredient properties container
 */
export interface IngredientProperties {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Malt-specific properties
 * From functional specs section 2.4
 */
export interface MaltProperties extends IngredientProperties {
  ebc: number; // European Brewery Convention color
  extractOpbrengst: number; // Extract yield percentage
  type?: string; // Type of malt (e.g., base, caramel, roasted)
}

/**
 * Hop-specific properties
 * From functional specs section 2.4
 */
export interface HopProperties extends IngredientProperties {
  alfazuur: number; // Alpha acid percentage
  type?: string; // Type of hop (e.g., bittering, aroma, dual-purpose)
  oogstjaar?: number; // Harvest year (optional)
}

/**
 * Yeast-specific properties
 * From functional specs section 2.4
 */
export interface YeastProperties extends IngredientProperties {
  gistType: string; // Type of yeast (ale, lager, hybrid)
  vergistingsgraad: number; // Attenuation percentage
  aanbevolenTemperatuur: number; // Recommended fermentation temperature (°C)
  alcoholTolerantie: number; // Alcohol tolerance percentage
}

/**
 * Sugar-specific properties
 * From functional specs section 2.4
 */
export interface SugarProperties extends IngredientProperties {
  type?: string; // Type of sugar (e.g., table, honey, brown)
}

/**
 * Custom ingredient properties
 */
export interface CustomProperties extends IngredientProperties {
  customType: string; // Custom category name
}

/**
 * Union type for all ingredient property types
 */
export type AnyIngredientProperties =
  | MaltProperties
  | HopProperties
  | YeastProperties
  | SugarProperties
  | CustomProperties
  | IngredientProperties;

/**
 * Main Ingredient domain model
 * From functional specs section 2.3
 */
export interface Ingredient extends BaseEntity {
  id: IngredientId;
  // Required fields
  naam: string; // Ingredient name
  type: IngredientType; // Ingredient type
  // Optional fields
  leverancier?: string; // Supplier/Manufacturer
  beschrijving?: string; // Description
  notities?: string; // Notes
  // Status fields
  actief: boolean; // Whether ingredient is active
  favoriet: boolean; // Whether marked as favorite
  // Properties based on type
  eigenschappen: AnyIngredientProperties;
  // Metadata
  userId: string; // Owner of this ingredient
  category?: IngredientCategory; // Categorization
}

/**
 * Search and filter criteria for ingredients
 */
export interface IngredientSearchFilter {
  // Search term
  query?: string;
  // Filter by type
  type?: IngredientType | IngredientType[];
  // Filter by category
  category?: IngredientCategory | IngredientCategory[];
  // Filter by status
  actief?: boolean;
  // Filter by favorite
  favoriet?: boolean;
  // Filter by supplier
  leverancier?: string;
  // Pagination
  page?: number;
  pageSize?: number;
  // Sorting
  sortBy?: 'naam' | 'type' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Result set for ingredient searches
 */
export interface IngredientSearchResult {
  items: Ingredient[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Data transfer object for creating an ingredient
 */
export interface CreateIngredientDTO {
  naam: string;
  type: IngredientType;
  leverancier?: string;
  beschrijving?: string;
  notities?: string;
  eigenschappen: AnyIngredientProperties;
  category?: IngredientCategory;
}

/**
 * Data transfer object for updating an ingredient
 */
export interface UpdateIngredientDTO {
  naam?: string;
  type?: IngredientType;
  leverancier?: string;
  beschrijving?: string;
  notities?: string;
  actief?: boolean;
  favoriet?: boolean;
  eigenschappen?: AnyIngredientProperties;
  category?: IngredientCategory;
}

/**
 * Error result for ingredient operations
 */
export interface IngredientError {
  code: string;
  message: string;
  details?: Record<string, string>;
}
