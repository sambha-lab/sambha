"use client";
import Tab from "@sambha/ui/tab";
import UpcomingEvents from "components/guest/UpcomingEvents";
import React, { useEffect, useState } from "react";
import { dummyEvents, Event } from "types/events/guestDummyEvents";

const EventPage = () => {
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState<Event[]>(
    []
  );
  const [filteredPastEvents, setFilteredPastEvents] = useState<Event[]>([]);

  const EVENT_STATUSES = ["upcoming", "past"];
  const [isActive, setIsActive] = useState<string>("upcoming");

  useEffect(() => {
    const upcoming = dummyEvents.filter((event) => event.status === "upcoming");
    const past = dummyEvents.filter((event) => event.status === "past");
    setFilteredUpcomingEvents(upcoming);
    setFilteredPastEvents(past);
  }, []);

  const handleTabOnclick = (tab: string) => {
    setIsActive(tab);
  };

  return (
    <div className="pt-8">
      <div className="flex w-full justify-between gap-4 sm:items-end flex-col sm:flex-row">
        <div className="space-y-6">
          <h1 className="md:text-5xl font-medium sm:text-4xl text-3xl text-gray-900">
            Events
          </h1>
          <Tab
            tabs={EVENT_STATUSES}
            isActive={isActive}
            onclick={handleTabOnclick}
          />
        </div>
      </div>

      {/* Events List */}
      <div className="mt-8">
        {isActive === "upcoming" ? (
          <UpcomingEvents events={filteredUpcomingEvents} title="Upcoming" />
        ) : (
          <UpcomingEvents events={filteredPastEvents} title="Past" />
        )}
      </div>
    </div>
  );
};

export default EventPage;
