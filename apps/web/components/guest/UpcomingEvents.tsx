import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventCardSkeleton from "./eventCardSkeleton";
import { renderEmptyState } from "./EmptyState";
import { Event } from "types/events/guestDummyEvents";

type UpcomingProps = {
  events: Event[];
  title: string;
};

function UpcomingEvents({ events, title }: UpcomingProps) {
  const [todaysEvents, setTodaysEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

    const filtered = events.filter((event) => {
      const eventDateStr = new Date(event.date).toISOString().split("T")[0];
      return eventDateStr === todayStr;
    });

    setTodaysEvents(filtered);
  }, [events]);

  if (events.length === 0 && !isLoading) {
    return renderEmptyState(title);
  }
  return (
    <div>
      {isLoading && (
        <div className="flex flex-wrap gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      )}
      {!isLoading && todaysEvents.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-bold text-lg text-[#0F2501]">Today</h2>
          <div className="flex flex-wrap gap-6">
            {todaysEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      <div>
        {!isLoading && events.length > 0 && (
          <>
            <h2 className="font-bold text-lg text-[#0F2501] mt-10 mb-6">
              {title}
            </h2>
            <div className="flex flex-wrap gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UpcomingEvents;
