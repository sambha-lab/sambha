"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";

interface BreadcrumbProps {
  eventSlug: string;
  currentEvent?: { name: string };
}

export const Breadcrumb = ({ eventSlug, currentEvent }: BreadcrumbProps) => (
  <div className="md:text-sm text-xs flex items-center whitespace-nowrap text-gray-600 space-x-2">
    <Image
      src="/back.svg"
      width={10}
      height={10}
      className="w-4 h-4"
      alt="Back"
    />
    <Link
      href="/planner/events"
      className="text-gray-base font-medium md:text-base text-xs"
    >
      Events
    </Link>
    <span>/</span>
    <Link
      href={`/planner/events/${eventSlug}`}
      className="text-gray-base font-medium md:text-base text-xs"
    >
      <span>{currentEvent?.name ?? "Event not found"}</span>
    </Link>
    <span>/</span>
    <h1 className="font-medium text-primary-darkPurple text-xs md:text-base">
      Create Seating Chart
    </h1>
  </div>
);
