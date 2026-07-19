// REST API client for communication with backend
// Handles:
// - Authentication
// - Request/response formatting
// - Error handling
// - Offline queueing

export class ApiClient {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string): void {
    this.token = token;
  }

  // TODO: GET request
  async get<T>(endpoint: string): Promise<T> {
    throw new Error('Not implemented');
  }

  // TODO: POST request
  async post<T>(endpoint: string, data: any): Promise<T> {
    throw new Error('Not implemented');
  }

  // TODO: PUT request
  async put<T>(endpoint: string, data: any): Promise<T> {
    throw new Error('Not implemented');
  }

  // TODO: DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    throw new Error('Not implemented');
  }
}
