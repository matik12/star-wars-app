import { API_URL, ApiBase } from './swApi';

export type Person = ApiBase & {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
};

class PersonApi {
  private static URL = `${API_URL}/people`;

  public async get(): Promise<Person[]> {
    const response: Response = await fetch(PersonApi.URL);

    if (!response.ok) {
      throw new Error('Failed to get people', { cause: response });
    }

    return await response.json();
  }
}

export default new PersonApi();
