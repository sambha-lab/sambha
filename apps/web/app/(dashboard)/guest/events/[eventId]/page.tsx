"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dummyEvents, Event } from "types/events/guestDummyEvents";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  CalendarWithDateIcon,
  CautionIcon,
  ChairIcon,
  ChatIcon,
  CheckCircle,
  LocationPinIcon,
} from "public/svg";
import dummyImage from "../../../../../public/Images/Racoon_Musicals.png";
import MapImage from "../../../../../public/map.png";

import ClockIcon from "components/icons/ClockIcon";
import { LocationSearch } from "@sambha/ui/form/LocationSearch";
import Map from "components/guest/Map";

function EventDetailsPage() {
  const { eventId } = useParams();
  const router = useRouter();
  const [eventData, setEventData] = useState<Event | null>(null);

  // Fetch event by ID
  useEffect(() => {
    const fetchEventData = async () => {
      const data = dummyEvents.find(
        (event) => event.id.toString() === eventId?.toString()
      );
      setEventData(data ?? null);
    };
    fetchEventData();
  }, [eventId]);

  // Go back to events list
  const handleNavigateBack = () => {
    router.push("/guest/events");
  };

  // RSVP handler
  const handleInvitation = (value: "yes" | "maybe" | "no") => {
    setEventData((prev) => (prev ? { ...prev, going: value } : null));
  };

  // Loading skeleton
  const LoadingState = () => (
    <div>
      <div className="h-8 w-1/3 bg-gray-300 rounded animate-pulse mb-4" />
      <div className="w-full max-w-2xl bg-gray-300 rounded-lg animate-pulse h-48 sm:h-72 mb-6" />
      <div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse mb-2" />
      <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-1" />
      <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-1" />
      <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mb-1" />
      <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse mb-1" />
      <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse mb-1" />
    </div>
  );

  if (!eventData) return <LoadingState />;

  return (
    <div className="p-10 space-y-8 bg-gradient-to-bl from-[#25417F] size-full to-[#3C2C72]">
      {/* Breadcrumb */}
      <nav className="flex gap-2 text-lg md:text-xl items-center my-6 text-primary-light">
        <button
          className="flex items-center text-base font-medium text-primary-light"
          onClick={handleNavigateBack}
        >
          <ChevronLeft className="text-primary-light" />
          <span className="cursor-pointer hover:opacity-95 transition-all pl-2">
            Events /
          </span>
        </button>
        <span className="font-medium text-base">{eventData.name}</span>
      </nav>

      <div className="flex gap-6 flex-col md:flex-row">
        {/* Left: Main Content */}
        <div className="space-y-11 sm:w-full flex-1">
          <Image
            src={dummyImage}
            className="object-cover w-full aspect-video rounded-lg"
            alt={eventData.name}
          />

          {/* Hosts */}
          <div className="space-y-2">
            <p className="text-lg font-bold text-primary-light">Hosted by</p>
            <hr />
            {eventData.host.map((host, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="size-9 rounded-full bg-gradient-primary" />
                <div>
                  <p className="text-primary-light font-semibold text-base">
                    {host.name}
                  </p>
                  <p className="text-sm font-normal text-[#D9D9D9]">
                    {host.email}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat */}
          <div className="space-y-2">
            <p className="text-lg font-bold text-primary-light">Chat</p>
            <hr />
            <button className="flex justify-between items-center text-primary-light w-full">
              <div className="flex gap-2 items-center">
                <div className="bg-[#846BA7] size-9 rounded-full flex items-center justify-center">
                  <ChatIcon />
                </div>
                <span className="text-base text-primary-light">
                  Open ChatSpace
                </span>
              </div>
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-full max-w-[26.6rem] space-y-12">
          <div className="space-y-8">
            {/* Event Details */}
            <div className="space-y-6">
              <h1 className="text-primary-light text-2xl font-bold truncate">
                {eventData.name}
              </h1>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="text-[#D9D9D9] font-normal text-base flex items-center gap-1">
                  <LocationPinIcon />
                  <p> {eventData.location}</p>
                </div>
                <div className="text-[#D9D9D9] font-normal text-base flex items-center gap-1">
                  <CalendarWithDateIcon />
                  <p> {eventData.date}</p>
                </div>
                <div className="text-[#D9D9D9] font-normal text-base flex items-center gap-1">
                  <ClockIcon />
                  <p>
                    {eventData.time} - {eventData.time}
                  </p>
                </div>
              </div>
            </div>

            {/* RSVP Buttons */}
            <div className="flex w-full bg-[#7A75AD] rounded-full">
              {["yes", "maybe", "no"].map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    handleInvitation(option as "yes" | "maybe" | "no")
                  }
                  className={`py-[0.875rem] px-3 flex-1 flex gap-2 rounded-full items-center justify-center font-medium text-base ${
                    eventData.going === option
                      ? "bg-primary-light text-[#C96FFF]"
                      : "text-primary-light"
                  }`}
                >
                  {eventData.going === option ? (
                    <CheckCircle />
                  ) : (
                    <CautionIcon />
                  )}
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>

            {/* Seating Chart */}
            <button className="px-8 py-6 bg-[#7A75AD] w-full rounded-2xl space-y-2">
              <div className="flex items-baseline gap-2">
                <ChairIcon />
                <p className="font-medium text-base text-primary-light">
                  Open sitting chart
                </p>
              </div>
              <p className="text-sm font-normal text-primary-light text-left text-pretty">
                Curious? Check where you’ll be sitting during this event
              </p>
            </button>
          </div>
          {/* about event */}
          <div className="space-y-2">
            <p className="text-lg font-bold text-primary-light">About</p>
            <hr />
            <p className="text-[#FFF6EF] text-pretty">{eventData.about}</p>
          </div>

          {/* events location */}
          <div className="space-y-2">
            <p className="text-lg font-bold text-primary-light">Location</p>
            <hr />
            <p className="text-[#FFF6EF]">{eventData.location}</p>
            <p className="text-sm text-[#D9D9D9]">{eventData.address}</p>
            <div className="space-y-2">
              <div
                style={{ backgroundImage: `url(${MapImage.src})` }}
                className="  rounded-lg bg-cover bg-center h-44 w-full relative"
              >
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
