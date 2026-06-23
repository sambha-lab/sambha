"use client";

import { useState, useEffect } from "react";

interface MapEmbedProps {
  src?: string;
  height?: string | number;
  width?: string | number;
  className?: string;
  allowFullScreen?: boolean;
  loading?: "eager" | "lazy";
  location?: {
    latitude: number;
    longitude: number;
    zoom?: number;
  };
  apiKey?: string;
  fallbackComponent?: React.ReactNode;
}

const DEFAULT_MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.362974706922!2d3.3494461735047723!3d6.601734522252316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9230fc4fc853%3A0xd8babb191dac2f6b!2sAllen%20Ave%2C%20Allen%2C%20Ikeja%20101233%2C%20Lagos!5e0!3m2!1sen!2sng!4v1729671204756!5m2!1sen!2sng";

export function MapEmbed({
  src,
  height = "200px",
  width = "100%",
  className = "",
  allowFullScreen = false,
  loading = "lazy",
  location,
  apiKey,
  fallbackComponent,
}: MapEmbedProps): React.JSX.Element {
  const [mapError, setMapError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setMapError(false);

    const newSrc =
      apiKey && location
        ? `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${location.latitude},${location.longitude}&zoom=${location.zoom || 15}`
        : src || DEFAULT_MAP_SRC;

    setCurrentSrc(newSrc);
  }, [apiKey, location, src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setMapError(true);
    setIsLoading(false);
  };

  if (mapError) {
    return fallbackComponent ? (
      <>{fallbackComponent}</>
    ) : (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center`}
      >
        <p className="text-gray-500">Map could not be loaded</p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
      <iframe
        src={currentSrc}
        width={width}
        height={height}
        style={{ border: 0, visibility: isLoading ? "hidden" : "visible" }}
        loading={loading}
        allowFullScreen={allowFullScreen}
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Location map"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
// for proper usage wrap map in a div with className="relative overflow-hidden rounded-lg shadow-lg"
// and add className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
// example:
            //<div   className="relative overflow-hidden rounded-lg shadow-lg"
            //   style={{ height: "200px" }}
            // >
            //   <MapEmbed
            //     height="210px" 
            //     className="absolute -top-1 w-full" 
            //   />
            // </div>