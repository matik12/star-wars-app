import React, { ReactNode } from 'react';

type RowCellProps = {
  children: ReactNode;
  customClassName?: string;
};

const RowCell = ({
  children,
  customClassName = 'text-gray-300',
}: RowCellProps) => (
  <td
    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-300 ${customClassName}`}
  >
    {children}
  </td>
);

export default RowCell;
