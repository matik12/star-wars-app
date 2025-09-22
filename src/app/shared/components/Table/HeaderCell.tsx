import React, { ReactNode } from 'react';

import SortDirection from '../../types/SortDirection';
import type SortConfig from '../../types/SortConfig';

type HeaderCellProps = {
  children: ReactNode;
  column: string;
  sortConfig: SortConfig;
  onSort: (column: string) => void;
};

const HeaderCell = ({
  children,
  column,
  sortConfig,
  onSort,
}: HeaderCellProps) => {
  const isSorted: boolean = sortConfig.column === column;
  const directionIcon: string = isSorted
    ? sortConfig.direction === SortDirection.Asc
      ? '▲'
      : '▼'
    : '';

  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer select-none"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center">
        {children}
        <span className="ml-2 inline-block w-4">{directionIcon}</span>
      </div>
    </th>
  );
};

export default HeaderCell;
