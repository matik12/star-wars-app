import React from 'react';

import { formatDate } from '../../../shared/utils/formatData';
import type SortConfig from '../../../shared/types/SortConfig';
import Table from '../../../shared/components/Table/Table';
import PersonWithHomeworld from '../types/PersonWithHomeworld';

type PeopleTableProps = {
  people: PersonWithHomeworld[];
  onPlanetClick: (planetUrl: string) => void;
  sortConfig: SortConfig;
  onSort: (column: string) => void;
};

const PeopleTable = ({
  people,
  onPlanetClick,
  sortConfig,
  onSort,
}: PeopleTableProps) => (
  <Table
    headerCells={[
      <Table.HeaderCell
        key="name"
        column="name"
        sortConfig={sortConfig}
        onSort={onSort}
      >
        Name
      </Table.HeaderCell>,
      <Table.HeaderCell
        key="height"
        column="height"
        sortConfig={sortConfig}
        onSort={onSort}
      >
        Height
      </Table.HeaderCell>,
      <Table.HeaderCell
        key="mass"
        column="mass"
        sortConfig={sortConfig}
        onSort={onSort}
      >
        Mass
      </Table.HeaderCell>,
      <Table.HeaderCell
        key="created"
        column="created"
        sortConfig={sortConfig}
        onSort={onSort}
      >
        Created
      </Table.HeaderCell>,
      <Table.HeaderCell
        key="edited"
        column="edited"
        sortConfig={sortConfig}
        onSort={onSort}
      >
        Edited
      </Table.HeaderCell>,
      <Table.HeaderCell
        key="homeworld_name"
        column="homeworld_name"
        sortConfig={sortConfig}
        onSort={onSort}
      >
        Planet Name
      </Table.HeaderCell>,
    ]}
    rowCells={(person: PersonWithHomeworld) => [
      <Table.RowCell key="name" customClassName="font-medium text-white">
        {person.name}
      </Table.RowCell>,
      <Table.RowCell key="height">{person.height}</Table.RowCell>,
      <Table.RowCell key="mass">{person.mass}</Table.RowCell>,
      <Table.RowCell key="created">{formatDate(person.created)}</Table.RowCell>,
      <Table.RowCell key="edited">{formatDate(person.edited)}</Table.RowCell>,
      <Table.RowCell key="homeworld">
        <button
          onClick={() => onPlanetClick(person.homeworld)}
          className="text-yellow-400 hover:text-yellow-300 hover:underline"
        >
          {person.homeworld_name || 'Unknown'}
        </button>
      </Table.RowCell>,
    ]}
    rowKey="name"
    items={people}
  />
);

export default PeopleTable;
