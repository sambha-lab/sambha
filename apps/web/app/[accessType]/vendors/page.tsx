"use client";

import { VendorsSection } from "components/event-planner/vendor/mainPageComponent/VendorsSection";
import { vendors } from "lib/vendors";
import { useState, useEffect } from "react";
import { Vendor } from "types/vendor";

export default function VendorsPage(): React.JSX.Element {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [vendorsData, setVendorsData] = useState<Vendor[]>([]); // Properly typed

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setVendorsData(vendors);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <VendorsSection
      vendors={vendorsData}
      selectedLocation={selectedLocation}
      onLocationChange={setSelectedLocation}
      isLoading={isLoading}
    />
  );
}
