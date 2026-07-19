import { User } from '../domain/User';

export class AuthService {
  // TODO: Implement authentication
  // - Login
  // - Logout
  // - Register
  // - Refresh token
  // - Get current user

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    throw new Error('Not implemented');
  }

  async logout(): Promise<void> {
    throw new Error('Not implemented');
  }

  async register(email: string, username: string, password: string): Promise<User> {
    throw new Error('Not implemented');
  }

  async getCurrentUser(): Promise<User | null> {
    throw new Error('Not implemented');
  }

  async refreshToken(): Promise<string> {
    throw new Error('Not implemented');
  }
}
