// components/seating-chart/GuestSelector.tsx
"use client";

import React, { useState } from "react";
import FilterGuest from "./filterGuest";
import { FiSearch } from "react-icons/fi";

interface Props {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function SearchFilter({
  placeholder = "Search .....",
  onSearch,
}: Props) {
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full">
      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

export default function GuestSelector() {
  const guests = [
    { id: 1, name: "Kathryn Murphy", isSeated: true },
    { id: 2, name: "Theresa Webb", isSeated: false },
    { id: 3, name: "Darlene Robertson", isSeated: false },
    { id: 4, name: "Arlene McCoy", isSeated: false },
    { id: 5, name: "Jane Cooper", isSeated: false },
    { id: 6, name: "Jacob Jones", isSeated: false },
  ];
  return (
    <div className="flex space-y-4 flex-col w-full py-4 px-4">
      <SearchFilter onSearch={(query) => console.log(query)} />

      <div className="mt-10">
        <FilterGuest filteredGuests={guests} />
      </div>
    </div>
  );
}
