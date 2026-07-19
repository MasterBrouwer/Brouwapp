import { BrewMethod } from '../domain/BrewMethod';

export class BrewMethodService {
  // TODO: Implement brew method operations
  // - Create brew method
  // - Update brew method
  // - Delete brew method
  // - Fetch all brew methods
  // - Search brew methods
  // - Duplicate brew method
  // - Activate/Deactivate

  async createBrewMethod(data: Partial<BrewMethod>): Promise<BrewMethod> {
    throw new Error('Not implemented');
  }

  async updateBrewMethod(id: string, data: Partial<BrewMethod>): Promise<BrewMethod> {
    throw new Error('Not implemented');
  }

  async deleteBrewMethod(id: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async getBrewMethods(): Promise<BrewMethod[]> {
    throw new Error('Not implemented');
  }

  async duplicateBrewMethod(id: string): Promise<BrewMethod> {
    throw new Error('Not implemented');
  }
}
