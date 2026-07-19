/**
 * Ingredient Module
 *
 * This module manages the central ingredient library for BrouwApp.
 * From functional specs:
 * "De ingrediëntenbibliotheek vormt de centrale kennisbron van de applicatie."
 *
 * Exports:
 * - Domain models and types
 * - IngredientService for business logic
 * - React components for UI
 *
 * Usage:
 * ```
 * import { Ingredient, IngredientService, IngredientList } from '@modules/ingredients';
 * ```
 */

// Export domain models and types
export type {
  IngredientId,
  Ingredient,
  IngredientSearchFilter,
  IngredientSearchResult,
  CreateIngredientDTO,
  UpdateIngredientDTO,
  IngredientError,
  IngredientProperties,
  MaltProperties,
  HopProperties,
  YeastProperties,
  SugarProperties,
  CustomProperties,
  AnyIngredientProperties,
} from './domain';

export { IngredientType, IngredientCategory } from './domain';

// Export services
export { IngredientService } from './services';

// Export components
export { default as IngredientList } from './components/IngredientList';
export { default as IngredientForm } from './components/IngredientForm';
export { default as IngredientDetail } from './components/IngredientDetail';
export { default as IngredientSearchBar } from './components/IngredientSearchBar';

// Export component props for external use
export type { IngredientListProps } from './components/IngredientList';
export type { IngredientFormProps } from './components/IngredientForm';
export type { IngredientDetailProps } from './components/IngredientDetail';
export type { IngredientSearchBarProps } from './components/IngredientSearchBar';
