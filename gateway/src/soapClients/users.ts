import { createClientAsync, Client } from 'soap';
import { resolve } from 'path';

class UsersClient {
  private client?: Client;

  public async init() {
    this.client = await createClientAsync(resolve('wsdl', 'users.xml'));
  }

  public async signup(data: {
    login: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  }) {
    try {
      if (!this.client) {
        throw new Error('Users client not initialized');
      }

      const response = await this.client.SignupAsync(data);
      return response[0];
    } catch (error) {
      console.log((error as Error).message);
      return null;
    }
  }

  public async signin(data: { login: string; password: string }) {
    try {
      if (!this.client) {
        throw new Error('Users client not initialized');
      }

      const response = await this.client.SigninAsync(data);
      return response[0];
    } catch (error) {
      console.log((error as Error).message);
      return null;
    }
  }
}

export default UsersClient;
