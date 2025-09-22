import SortDirection from '../../../shared/types/SortDirection';
import type SortConfig from '../../../shared/types/SortConfig';
import PersonWithHomeworld from '../types/PersonWithHomeworld';

const filterAndSortPeople = (
  people: PersonWithHomeworld[],
  searchTerm: string,
  sortConfig: SortConfig
) => {
  let processedPeople = [...people];

  const trimmedSearchTerm = searchTerm.trim();

  if (trimmedSearchTerm) {
    processedPeople = processedPeople.filter((person: PersonWithHomeworld) =>
      person.name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
    );
  }

  processedPeople.sort((a, b) => {
    const column = sortConfig.column as keyof typeof a;
    let aValue: string | string[] | number = a[column] || '';
    let bValue: string | string[] | number = b[column] || '';

    if (['height', 'mass'].includes(sortConfig.column)) {
      aValue = parseInt(aValue as string) || 0;
      bValue = parseInt(bValue as string) || 0;
    }

    if (aValue < bValue) {
      return sortConfig.direction === SortDirection.Asc ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortConfig.direction === SortDirection.Asc ? 1 : -1;
    }

    return 0;
  });

  return processedPeople;
};

export default filterAndSortPeople;
