// components/LocationFilter.tsx
"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface LocationFilterProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  locations?: string[];
}

export function LocationFilter({
  selectedLocation,
  onLocationChange,
  locations = [
    "Eastbridge",
    "Westridge",
    "Northbridge",
    "Southbridge",
    "Central District",
  ],
}: LocationFilterProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationChange = (location: string) => {
    onLocationChange(location);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-gray-base">Showing vendors in</p>
      <div className="relative">
        <button
          className="flex items-center gap-1 text-neutral-black font-medium cursor-pointer px-2 py-1 rounded transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-10 focus:ring-opacity-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {selectedLocation}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-48 bg-white-base rounded-lg shadow-dropdown border border-gray-200 overflow-hidden animate-fadeIn hover:animate-fadeOut hover:bg-gray-50">
            <div className="py-1">
              <button
                className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-100 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  selectedLocation === "All"
                    ? "bg-purple-10 text-primary-dark hover:bg-purple-10/90"
                    : "text-neutral-black hover:bg-gray-100 focus:bg-gray-100"
                }`}
                onClick={() => handleLocationChange("All")}
              >
                All Locations
              </button>
              {locations.map((location) => (
                <button
                  key={location}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-100 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    selectedLocation === location
                      ? "bg-purple-10 text-primary-dark hover:bg-purple-10/90"
                      : "text-neutral-black hover:bg-gray-100 focus:bg-gray-100"
                  }`}
                  onClick={() => handleLocationChange(location)}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
