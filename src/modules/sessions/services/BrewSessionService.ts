import { BrewSession } from '../domain/BrewSession';

export class BrewSessionService {
  // TODO: Implement brew session operations
  // - Create session
  // - Update session
  // - Complete session
  // - Pause/Resume session
  // - Add measurement
  // - Fetch all sessions
  // - Get active session

  async createSession(receptVersieId: string): Promise<BrewSession> {
    throw new Error('Not implemented');
  }

  async getSession(id: string): Promise<BrewSession> {
    throw new Error('Not implemented');
  }

  async getSessions(): Promise<BrewSession[]> {
    throw new Error('Not implemented');
  }

  async getActiveSession(): Promise<BrewSession | null> {
    throw new Error('Not implemented');
  }

  async updateSession(id: string, data: Partial<BrewSession>): Promise<BrewSession> {
    throw new Error('Not implemented');
  }

  async completeSession(id: string): Promise<BrewSession> {
    throw new Error('Not implemented');
  }

  async addMeasurement(sessionId: string, measurement: any): Promise<BrewSession> {
    throw new Error('Not implemented');
  }
}
