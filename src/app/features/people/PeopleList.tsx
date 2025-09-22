import React, { useState, useMemo, useCallback } from 'react';

import PeopleTable from '../people/components/PeopleTable';
import PlanetModal from '../people/components/PlanetModal';
import usePeopleApi from '../people/hooks/usePeopleApi';
import { Planet } from '../../shared/api/planetApi';
import SearchInput from '../../shared/components/SearchInput';
import SortDirection from '../../shared/types/SortDirection';
import filterAndSortPeople from '../people/utils/filterAndSortPeople';
import type SortConfig from '../../shared/types/SortConfig';

const PeopleList = () => {
  const { people, planetMap, isLoading, hasError } = usePeopleApi();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: 'name',
    direction: SortDirection.Asc,
  });

  const filteredAndSortedPeople = useMemo(
    () => filterAndSortPeople(people, searchTerm, sortConfig),
    [people, searchTerm, sortConfig]
  );

  const handleSort = useCallback((column: string) => {
    setSortConfig((prevConfig: SortConfig) => {
      const direction: SortDirection =
        prevConfig.column === column &&
        prevConfig.direction === SortDirection.Asc
          ? SortDirection.Desc
          : SortDirection.Asc;

      return { column, direction };
    });
  }, []);

  const handlePlanetClick = useCallback(
    (planetUrl: string) => {
      setSelectedPlanet(planetMap[planetUrl] || null);
    },
    [planetMap]
  );

  const handlePlanetModalClose = useCallback(() => {
    setSelectedPlanet(null);
  }, []);

  return (
    <div className="feature-container">
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          placeholder="Search by name..."
          onChange={setSearchTerm}
        />
      </div>

      {isLoading && (
        <p className="text-center text-lg">Loading characters...</p>
      )}

      {hasError && (
        <p className="text-center text-red-500">
          Failed to load characters data. Please refresh the page to try again.
        </p>
      )}

      {!isLoading && !hasError && (
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <PeopleTable
            people={filteredAndSortedPeople}
            onPlanetClick={handlePlanetClick}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      )}

      {selectedPlanet && (
        <PlanetModal planet={selectedPlanet} onClose={handlePlanetModalClose} />
      )}
    </div>
  );
};

export default PeopleList;
