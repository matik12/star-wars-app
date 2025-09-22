import { API_URL, ApiBase } from './swApi';

export type Planet = ApiBase & {
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
};

class PlanetApi {
  private static URL = `${API_URL}/planets`;

  public async get(): Promise<Planet[]> {
    const response: Response = await fetch(PlanetApi.URL);

    if (!response.ok) {
      throw new Error('Failed to get planets', { cause: response });
    }

    return await response.json();
  }
}

export default new PlanetApi();
