import { createClientAsync, Client } from 'soap';
import { resolve } from 'path';

class TripsClient {
  private client?: Client;

  public async init() {
    this.client = await createClientAsync(resolve('wsdl', 'trips.xml'));
  }

  public async createTrip(data: {
    token: string;
    name: string;
    description: string;
    boat: number;
    startDate: number;
  }) {
    try {
      if (!this.client) {
        throw new Error('Trips client not initialized');
      }

      const response = await this.client.CreateTripAsync(data);
      return response[0];
    } catch (error) {
      console.log((error as Error).message);
      return null;
    }
  }

  public async getTrip(data: { token: string; id: number }) {
    try {
      if (!this.client) {
        throw new Error('Trips client not initialized');
      }

      const response = await this.client.GetTripAsync(data);
      return response[0];
    } catch (error) {
      console.log((error as Error).message);
      return null;
    }
  }

  public async deleteTrip(data: { token: string; id: number }) {
    try {
      if (!this.client) {
        throw new Error('Trips client not initialized');
      }

      const response = await this.client.DeleteTripAsync(data);
      return response[0];
    } catch (error) {
      console.log((error as Error).message);
      return null;
    }
  }
}

export default TripsClient;
