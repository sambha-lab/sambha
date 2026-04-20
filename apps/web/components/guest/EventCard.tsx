import Image from "next/image";
import dummyImage from "public/images/Racoon_Musicals.png";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { Event } from "types/events/guestDummyEvents";
function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`events/${event.id}`}
      className="flex  gap-3 flex-col sm:flex-row border-[0.8px]  text-pretty p-2 max-w-sm border-[#6260604f] rounded-xl shadow-md"
    >
      <div className="rounded-xl overflow-hidden h-24 w-36">
        <Image
          src={dummyImage}
          alt="Event Image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-[2px]">
        <div className="flex gap-[2px] items-center">
          <div className="rounded-full bg-gradient-primary size-[14px] " />
          <p className="text-sm text-primary-darkPurple tracking-[-1%] leading-[140%]">
            You were invited
          </p>
        </div>
        <p className="text-base font-medium text-[#070D17] leading-[140%] tracking-[-1%] truncate ">
          {event.name}
        </p>
        <div className="flex text-sm font-normal items-center gap-2">
          <div className="flex items-center gap-1">
            <CalendarDays size={12} />
            <p className="text-primary-darkPurple">Wed, May 1</p>
          </div>
          <p className="text-gray-base">12:00 pm</p>
        </div>
        <p className="text-sm font-normal text-gray-base tracking-[-1%] leading-[140%] ">
          Grand Maple Theatre
        </p>
      </div>
    </Link>
  );
}
export default EventCard;
