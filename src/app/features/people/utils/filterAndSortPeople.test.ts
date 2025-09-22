import filterAndSortPeople from './filterAndSortPeople';
import SortDirection from '../../../shared/types/SortDirection';
import type PersonWithHomeworld from '../types/PersonWithHomeworld';

const mockPeople: PersonWithHomeworld[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.info/api/planets/1',
    homeworld_name: 'Tatooine',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.info/api/people/1',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'yellow',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    homeworld: 'https://swapi.info/api/planets/1',
    homeworld_name: 'Tatooine',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:18:20.704000Z',
    edited: '2014-12-20T21:17:50.313000Z',
    url: 'https://swapi.info/api/people/4/',
  },
  {
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'brown',
    birth_year: '19BBY',
    gender: 'female',
    homeworld: 'https://swapi.info/api/planets/2',
    homeworld_name: 'Alderaan',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:20:09.791000Z',
    edited: '2014-12-20T21:17:50.315000Z',
    url: 'https://swapi.info/api/people/5/',
  },
];

describe('filterAndSortPeople', () => {
  it('filters people by name search term', () => {
    const searchTerm = 'luke';
    const result = filterAndSortPeople(mockPeople, searchTerm, {
      column: 'name',
      direction: SortDirection.Asc,
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Luke Skywalker');
  });

  it('filters people by case insensitive search term', () => {
    const searchTerm = 'LUKE';
    const result = filterAndSortPeople(mockPeople, searchTerm, {
      column: 'name',
      direction: SortDirection.Asc,
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Luke Skywalker');
  });

  it('sorts by name ascending', () => {
    const result = filterAndSortPeople(mockPeople, '', {
      column: 'name',
      direction: SortDirection.Asc,
    });

    expect(result.map((p) => p.name)).toEqual([
      'Darth Vader',
      'Leia Organa',
      'Luke Skywalker',
    ]);
  });

  it('sorts by name descending', () => {
    const result = filterAndSortPeople(mockPeople, '', {
      column: 'name',
      direction: SortDirection.Desc,
    });

    expect(result.map((p) => p.name)).toEqual([
      'Luke Skywalker',
      'Leia Organa',
      'Darth Vader',
    ]);
  });

  it('sorts by height numerically', () => {
    const result = filterAndSortPeople(mockPeople, '', {
      column: 'height',
      direction: SortDirection.Asc,
    });

    expect(result.map((p) => p.height)).toEqual(['150', '172', '202']);
  });

  it('sorts by mass numerically', () => {
    const result = filterAndSortPeople(mockPeople, '', {
      column: 'mass',
      direction: SortDirection.Desc,
    });

    expect(result.map((p) => p.mass)).toEqual(['136', '77', '49']);
  });

  it('sorts by planet name', () => {
    const result = filterAndSortPeople(mockPeople, '', {
      column: 'homeworld_name',
      direction: SortDirection.Asc,
    });

    expect(result.map((p) => p.homeworld_name)).toEqual([
      'Alderaan',
      'Tatooine',
      'Tatooine',
    ]);
  });

  it('handles invalid sort column', () => {
    const result = filterAndSortPeople(mockPeople, '', {
      column: 'invalid',
      direction: SortDirection.Asc,
    });

    expect(result.map((p) => p.name)).toEqual([
      'Luke Skywalker',
      'Darth Vader',
      'Leia Organa',
    ]);
  });

  it('handles empty search term', () => {
    const searchTerm = '';
    const result = filterAndSortPeople(mockPeople, searchTerm, {
      column: 'name',
      direction: SortDirection.Asc,
    });

    expect(result).toHaveLength(3);
  });

  it('handles whitespace search term', () => {
    const searchTerm = '   ';
    const result = filterAndSortPeople(mockPeople, searchTerm, {
      column: 'name',
      direction: SortDirection.Asc,
    });

    expect(result).toHaveLength(3);
  });
});
