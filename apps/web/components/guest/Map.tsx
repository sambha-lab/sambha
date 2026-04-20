"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // ✅ keep API key safe in env
        version: "weekly",
        libraries: ["places"],
      });

      // Import Maps library
      const { Map } = await loader.importLibrary("maps");
      const { Maker } = await loader.importLibrary("marker");
      // Default position (example: New York City)
      const position = {
        lat: 40.7128,
        lng: -74.006,
      };

      const mapOptions = {
        center: position,
        zoom: 14,
        mapId: "Open_task_mapId", // replace with your real Map ID if you created one
      };

      // Initialize map in the ref container
      if (mapRef.current) {
        const map = new Map(mapRef.current, mapOptions);

        // // Add a marker
        new Maker({
          map,
          position,
        });
      }
    };

    initMap();
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      className="rounded-lg shadow-md"
    />
  );
}

export default Map;
