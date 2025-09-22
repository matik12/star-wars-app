import { useState, useEffect } from 'react';

import PersonApi from '../../../shared/api/personApi';
import PlanetApi, { Planet } from '../../../shared/api/planetApi';
import PersonWithHomeworld from '../types/PersonWithHomeworld';

// Note:
// In a real-world application, more robust state management solution can be considered
// or data fetching library (like React Query or SWR) for better handling of caching,
// background updates, and other advanced features.
//
// Fetching People with Planets data using SWAPI, is a classic example of N+1 problem.
// In a production app, API should ideally provide an endpoint that returns
// People along with their associated Planets to avoid multiple network requests.
// For this sample implementation, we are fetching all People and Planets concurrently
// and then mapping them together on the client side.
// This approach is acceptable here due to the limited dataset size (83 people/60 planets)
// and no API support for batch fetching related resources, pagination, filtering, or sorting.

export type PlanetMap = Record<string, Planet>;

const usePeopleApi = () => {
  const [people, setPeople] = useState<PersonWithHomeworld[]>([]);
  const [planetMap, setPlanetMap] = useState<PlanetMap>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const [resolvedPeople, resolvedPlanets] = await Promise.all([
          PersonApi.get(),
          PlanetApi.get(),
        ]);

        const normalizedPlanetMap = resolvedPlanets.reduce<PlanetMap>(
          (map, planet) => {
            map[planet.url] = planet;
            return map;
          },
          {}
        );

        const normalizedPeople = resolvedPeople.map((person) => ({
          ...person,
          homeworld_name: normalizedPlanetMap[person.homeworld].name || null,
        }));

        setPeople(normalizedPeople);
        setPlanetMap(normalizedPlanetMap);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error fetching data:', errorMessage);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { people, planetMap, isLoading, hasError };
};

export default usePeopleApi;
