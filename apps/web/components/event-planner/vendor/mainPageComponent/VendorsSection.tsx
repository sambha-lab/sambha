"use client";

import Link from "next/link";
import { VendorsSkeleton } from "./VendorsSkeleton";
import { LocationFilter } from "../LocationFilter";
import { VendorsGrid } from "../VendorsGrid";
import { Vendor } from "types/vendor";

const categories = [
  { name: "Catering", icon: "🍽️" },
  { name: "Audio-visual", icon: "🎤" },
  { name: "Venue", icon: "🏛️" },
  { name: "Photography", icon: "📷" },
  { name: "Entertainment", icon: "🎭" },
  { name: "Logistics", icon: "🚚" },
  { name: "Event-decor", icon: "🎀" },
];

type VendorsSectionProps = {
  vendors: Vendor[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  isLoading?: boolean;
};

export function VendorsSection({
  vendors,
  selectedLocation,
  onLocationChange,
  isLoading = false,
}: VendorsSectionProps): React.ReactElement {
  const filteredVendors = vendors.filter(
    (vendor) =>
      selectedLocation === "All" || vendor.location === selectedLocation
  );

  if (isLoading) {
    return <VendorsSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 bg-white">
      <h1 className="text-3xl font-bold text-[#2a1d52] mb-6">Vendors</h1>

      {/* Location Filter Section */}
      <div className="mb-12">
        <LocationFilter
          selectedLocation={selectedLocation}
          onLocationChange={onLocationChange}
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-4 mr-0 sm:mr-12 lg:mr-40">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/vendor/vendors/categories/${category.name.toLowerCase()}`}
              className="border border-[#c96fff] bg-[#f9f9f9] rounded-xl p-2 text-center hover:bg-[#f8e9ff] hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-[#2a1d52] hover:text-[#c96fff] cursor-pointer text-xs"
            >
              <span className="text-2xl block mb-2">{category.icon}</span>
              <span className="font-medium text-[#2a1d52]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Vendors Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-[#2a1d52]">
          Popular vendors
        </h2>

        {filteredVendors.length > 0 ? (
          <VendorsGrid
            vendors={filteredVendors}
            className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-5"
            imageHeight="h-82 sm:h-40"
          />
        ) : (
          <div className="py-12 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No vendors found
              </h3>
              <p className="mt-1 text-gray-500">
                We couldn&apos;t find any vendors in{" "}
                {selectedLocation === "All" ? "any location" : selectedLocation}
                .
              </p>
              <div className="mt-6">
                <button
                  onClick={() => onLocationChange("All")}
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Show all locations
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
