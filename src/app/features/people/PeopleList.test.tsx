import {
  render,
  screen,
  fireEvent,
  getByTestId,
  getByText,
  queryAllByRole,
} from '@testing-library/react';

import PeopleList from './PeopleList';
import usePeopleApi, { PlanetMap } from './hooks/usePeopleApi';
import SortDirection from '../../shared/types/SortDirection';
import type PersonWithHomeworld from './types/PersonWithHomeworld';

jest.mock('./hooks/usePeopleApi');
const mockUsePeopleApi = usePeopleApi as jest.Mock<
  ReturnType<typeof usePeopleApi>
>;

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
];

const mockPlanetMap: PlanetMap = {
  'https://swapi.info/api/planets/1': {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'Arid',
    gravity: '1 standard',
    terrain: 'Desert',
    surface_water: '1',
    population: '200000',
    residents: [],
    films: [],
    created: '2014-12-09T13:50:49.641000Z',
    edited: '2014-12-20T20:58:18.411000Z',
    url: 'https://swapi.info/api/planets/1',
  },
};

describe('PeopleList', () => {
  beforeEach(() => {
    mockUsePeopleApi.mockReturnValue({
      people: mockPeople,
      planetMap: mockPlanetMap,
      isLoading: false,
      hasError: false,
    });
  });

  it('renders loading state', () => {
    mockUsePeopleApi.mockReturnValue({
      people: [],
      planetMap: {},
      isLoading: true,
      hasError: false,
    });

    render(<PeopleList />);

    expect(screen.getByText('Loading characters...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUsePeopleApi.mockReturnValue({
      people: [],
      planetMap: {},
      isLoading: false,
      hasError: true,
    });

    render(<PeopleList />);

    expect(
      screen.getByText(/Failed to load characters data/)
    ).toBeInTheDocument();
  });

  it('renders people list and allows searching', () => {
    render(<PeopleList />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search by name...');

    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.queryByText('Darth Vader')).not.toBeInTheDocument();
  });

  it('handles sorting when clicking column headers', () => {
    render(<PeopleList />);

    const nameHeader = screen.getByTestId('header-name');

    // First column click - should sort descending,
    // since name column is already sorted ascending
    fireEvent.click(nameHeader);
    expect(getByTestId(nameHeader, 'sort-icon')).toHaveAttribute(
      'data-direction',
      SortDirection.Desc
    );

    // Second column click - should sort ascending
    fireEvent.click(nameHeader);
    expect(getByTestId(nameHeader, 'sort-icon')).toHaveAttribute(
      'data-direction',
      SortDirection.Asc
    );
  });

  it('shows planet modal when clicking on planet name', () => {
    render(<PeopleList />);

    const homeworldLink = screen.getAllByText('Tatooine')[0];

    fireEvent.click(homeworldLink);
    const climateElement = screen.getByTestId('planet-modal-climate');
    expect(getByText(climateElement, 'Arid')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-icon');
    fireEvent.click(closeButton);
    expect(climateElement).not.toBeInTheDocument();
  });

  it('handles empty search results gracefully', () => {
    render(<PeopleList />);

    const searchInput = screen.getByPlaceholderText('Search by name...');
    const tableBody = screen.getByTestId('table-body');
    const firstRow = queryAllByRole(tableBody, 'row')[0];
    expect(firstRow).toBeInTheDocument();

    fireEvent.change(searchInput, {
      target: { value: 'NonexistentSearchTerm' },
    });
    expect(firstRow).not.toBeInTheDocument();
  });
});
