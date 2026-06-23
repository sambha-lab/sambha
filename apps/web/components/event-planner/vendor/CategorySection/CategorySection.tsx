"use client";

import { Vendor } from "../../../../types/vendor";
import { Breadcrumbs } from "../Breadcrumbs";
import { LocationFilter } from "../LocationFilter";
import { VendorsGrid } from "../VendorsGrid";
import { CategorySkeleton } from "./CategorySkeleton";
import Link from "next/link";

interface CategorySectionProps {
  icon?: string | React.ReactNode;
  categoryName: string;
  vendors: Vendor[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  isLoading?: boolean;
}

export function CategorySection({
  icon,
  categoryName,
  vendors,
  selectedLocation,
  onLocationChange,
  isLoading = false,
}: CategorySectionProps): React.ReactElement {
  const categories = [
    { name: "Catering", icon: "🍽️" },
    { name: "Audio-visual", icon: "🎤" },
    { name: "Venue", icon: "🏛️" },
    { name: "Photography", icon: "📷" },
    { name: "Entertainment", icon: "🎭" },
    { name: "Logistics", icon: "🚚" },
    { name: "Event-decor", icon: "🎀" },
  ];

  const categoryIcon =
    icon || categories.find((c) => c.name === categoryName)?.icon;
  const isAllLocationsSelected = selectedLocation.toLowerCase() === "all";

  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 bg-white">
      <Breadcrumbs
        items={[
          { href: "/vendor/vendors", label: "Vendors" },
          { label: categoryName, isCurrent: true },
        ]}
      />

      <header className="mb-8 mt-4">
        <div className="flex items-center gap-3">
          {categoryIcon && (
            <span className="text-3xl">
              {typeof categoryIcon === "string" ? categoryIcon : categoryIcon}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {categoryName}
          </h1>
        </div>
      </header>

      <div className="mb-8">
        <LocationFilter
          selectedLocation={selectedLocation}
          onLocationChange={onLocationChange}
        />
      </div>

      {vendors.length > 0 ? (
        <VendorsGrid
          vendors={vendors}
          className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          imageHeight="h-32 sm:h-40"
        />
      ) : (
        <div className="py-16 text-center">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-2 text-gray-500">
              We couldn&apos;t find any {categoryName.toLowerCase()} vendors{" "}
              {!isAllLocationsSelected && (
                <>in {selectedLocation.toLowerCase()}</>
              )}
              .
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {!isAllLocationsSelected && (
                <button
                  onClick={() => onLocationChange("All")}
                  className="px-6 py-3 text-sm font-semibold text-white rounded-lg bg-gradient-to-b from-primary.violet to-primary.main hover:from-purple-700 hover:to-primary.darkPurple transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                >
                  Show all locations
                </button>
              )}
              <Link
                href="//vendors"
                className="px-6 py-3 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Browse all categories
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
