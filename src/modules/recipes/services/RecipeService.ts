import { Recipe, RecipeVersion } from '../domain/Recipe';

export class RecipeService {
  // TODO: Implement recipe operations
  // - Create recipe
  // - Update recipe (create new version)
  // - Delete recipe
  // - Fetch all recipes
  // - Search recipes
  // - Duplicate recipe
  // - Change recipe status
  // - Get recipe versions

  async createRecipe(data: Partial<Recipe>): Promise<Recipe> {
    throw new Error('Not implemented');
  }

  async updateRecipe(id: string, data: Partial<Recipe>): Promise<RecipeVersion> {
    throw new Error('Not implemented');
  }

  async deleteRecipe(id: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async getRecipes(): Promise<Recipe[]> {
    throw new Error('Not implemented');
  }

  async getRecipeById(id: string): Promise<Recipe> {
    throw new Error('Not implemented');
  }

  async getRecipeVersion(recipeId: string, versieNummer: number): Promise<RecipeVersion> {
    throw new Error('Not implemented');
  }

  async duplicateRecipe(id: string): Promise<Recipe> {
    throw new Error('Not implemented');
  }
}
