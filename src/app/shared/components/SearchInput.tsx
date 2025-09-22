import React, { memo } from 'react';

// Note:
// Search components usually implement debouncing for better performance, especially with large datasets or API calls.
// However, for simplicity, this example does not include debouncing logic.

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchInput = ({
  value,
  onChange,
  placeholder = '',
}: SearchInputProps) => (
  <input
    type="text"
    name="searchInput"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
  />
);

export default memo(SearchInput);
