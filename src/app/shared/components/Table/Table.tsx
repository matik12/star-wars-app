import React, { ReactNode } from 'react';

import HeaderCell from './HeaderCell';
import RowCell from './RowCell';

type TableProps<T> = {
  headerCells: ReactNode[];
  rowCells: (item: T) => ReactNode[];
  rowKey: string;
  items: T[];
};

const Table = <T extends { [key: string]: unknown }>({
  headerCells,
  rowCells,
  rowKey,
  items,
}: TableProps<T>) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-800" data-testid="table-header">
        <tr>{headerCells}</tr>
      </thead>
      <tbody
        className="bg-gray-900 divide-y divide-gray-700"
        data-testid="table-body"
      >
        {items.map((item: T) => (
          <tr
            key={item[rowKey] as string}
            className="hover:bg-gray-800 transition-colors duration-200"
          >
            {rowCells(item)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Table.HeaderCell = HeaderCell;
Table.RowCell = RowCell;

export default Table;
