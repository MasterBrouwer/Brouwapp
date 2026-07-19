import { Ingredient } from '../domain/Ingredient';

export class IngredientService {
  // TODO: Implement ingredient operations
  // - Create ingredient
  // - Update ingredient
  // - Delete ingredient
  // - Fetch all ingredients
  // - Search ingredients
  // - Filter ingredients by type
  // - Mark as favorite
  // - Activate/Deactivate

  async createIngredient(data: Partial<Ingredient>): Promise<Ingredient> {
    throw new Error('Not implemented');
  }

  async updateIngredient(id: string, data: Partial<Ingredient>): Promise<Ingredient> {
    throw new Error('Not implemented');
  }

  async deleteIngredient(id: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async getIngredients(): Promise<Ingredient[]> {
    throw new Error('Not implemented');
  }

  async searchIngredients(query: string): Promise<Ingredient[]> {
    throw new Error('Not implemented');
  }
}
