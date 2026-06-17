"use client";
import React from "react";
import Image from "next/image";
import bgImage from "../../../../assets/images/bgImage.png";
import addImage from "../../../../assets/svgs/addImage.svg";
import FullMapImage from "../../../../assets/images/FullMap.png";
import Link from "next/link";
import LocationIcon from "components/icons/LocationIcon";
import ClockIcon from "components/icons/ClockIcon";
import ChairIcon from "components/icons/ChairIcon";
import MessageIcon from "components/icons/MessageIcon";
import ThemeIcon from "components/icons/ThemeIcon";
import GuestIcon from "components/icons/GuestIcon";
import PencilIconEdit from "components/icons/PencilIconEdit";
import { Theme } from "types";
import TeamMembers from "components/event-sittings/TeamMembers";
import CalendarIcon from "components/icons/CalendarIcon";

const icons = [
  { label: "Edit", icon: <PencilIconEdit /> },
  { label: "Message", icon: <MessageIcon /> },
  { label: "Theme", icon: <ThemeIcon /> },
  { label: "Guest", icon: <GuestIcon /> },
];

const event = {
  id: "abc123",
  slug: "oliver-and-emilys-wedding",
  name: "Oliver & Emily's Wedding",
};

export function ViewButton() {
  return (
    <button className="flex items-center md:w-auto justify-center gap-2 rounded-full text-gray-base  hover:text-gray-400 text-sm font-medium transition">
      View all
      <span>
        <Image
          src="/arrow-right.svg"
          width={20}
          height={20}
          className="w-4 h-4"
          alt="back svg Image"
        />
      </span>
    </button>
  );
}

// details component
interface DetailsProps {
  theme: Theme; // Use the Theme type instead of ThemeConfig
  onThemeClick: () => void;
}

export default function Details({ theme, onThemeClick }: DetailsProps) {
  return (
    <div className={`py-4 w-full ${theme.styles.contentBg}`}>
      <div className="flex flex-col md:flex-row md:gap-4 gap-8 w-full">
        <div className="md:max-w-[60%] w-full">
          <div className="md:h-[317px] xl:h-[400px] w-full">
            <Image
              src={bgImage}
              alt="Background Image"
              width={500}
              height={500}
              quality={100}
              className="h-full w-full rounded-lg"
            />

            {/* Edit Button */}
            <div className="-mt-14 z-20 justify-center flex w-full whitespace-nowrap">
              <div className="flex items-center">
                <Image
                  src={addImage}
                  alt="Add Image"
                  width={500}
                  height={500}
                  quality={100}
                  className="h-full w-full rounded-lg"
                />
                <button
                  className=" justify-center z-10 rounded-md bg-white/80 px-4 py-2 text-sm font-medium text-primary-light shadow hover:bg-white"
                  onClick={() => alert("Edit background clicked")}
                >
                  Edit Background
                </button>
              </div>
            </div>
          </div>

          <div className="py-4 space-y-3">
            <TeamMembers />

            {/* table for guest */}
            <div className="flex space-y-3 flex-col">
              <div className="space-y-3 flex justify-between border-b py-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-primary-darkPurple">
                    Guests
                  </h2>
                  <p className="text-sm text-gray-base">
                    Add event managers to see your event through.
                  </p>
                </div>
                <ViewButton />
              </div>

              <div className="grid grid-cols-3 w-full">
                <div>
                  <h1>0</h1>
                  <p>Going</p>
                </div>
                <div>
                  <h1>0</h1>
                  <p>Pending</p>
                </div>
                <div>
                  <h1>0</h1>
                  <p>Not going</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Slug-aware navigation */}
        <div className="space-y-4 md:max-w-[426px] w-full md:px-4">
          <div className="space-y-2 ">
            <h1 className="font-semibold text-primary-darkPurple text-xl md:text-2xl ">
              {event.name}
            </h1>
            <div className="flex justify-between w-full text-xs md:text-base">
              <div className="flex gap-2 items-center">
                <LocationIcon />
                The Grand Hall, Rosewood Estate
              </div>

              <div className="flex gap-2 text-neutral-black test-sm md:text-base  items-center">
                <CalendarIcon /> Sat, Aug 20
              </div>
            </div>
            <div className="flex gap-2 items-center text-sm md:text-base">
              <ClockIcon />
              3:00 PM - 10:00 PM
            </div>
          </div>

          {/* icons */}
          <div className="flex justify-between w-full py-4">
            {icons.map(({ label, icon }, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2"
                onClick={label === "Theme" ? onThemeClick : undefined} // Opens theme selector when Theme icon is clicked
              >
                <div
                  className={`${
                    theme.styles.cardBg
                  } rounded-full p-4 hover:scale-105 cursor-pointer ${theme.styles.shadowStyle}`}
                >
                  {React.cloneElement(icon, {
                    className: `md:w-8 md:h-8 ${theme.styles.primaryText}`,
                  })}
                </div>
                <h1
                  className={`text-sm ${theme.styles.primaryText} font-medium`}
                >
                  {label}
                </h1>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link href={`/planner/events/${event.slug}/create-sitting-chart`}>
              <div className="w-full h-[107px] bg-gradient-primary rounded-2xl gap-4 flex text-primary-light items-center justify-start p-4">
                <ChairIcon className="w-10 h-10" />
                <div>
                  <h1 className="text-lg font-semibold">
                    Create Seating Chart
                  </h1>
                  <p className="max-w-[220px] text-sm">
                    Assign seats to guests and notify them.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <h1 className="border-b text-primary-darkPurple font-semibold py-2">
              About
            </h1>
            <p className="text-sm text-neutral-black font-[300]">
              Celebrate the union of Oliver and Emily at the beautiful Rosewood
              Estate. Enjoy a romantic ceremony, followed by a gourmet dinner
              and lively dance. Join us for an evening of love, joy, and
              unforgettable memories as the couple begins their journey
              together.
            </p>
          </div>

          <div className="space-y-2 py-2">
            <h1 className="border-b text-primary-darkPurple font-semibold py-2">
              Location
            </h1>
            <p>The Grand Hall, Rosewood Estate</p>
            <p className="text-sm text-gray-base">
              123 Broadway Avenue, NY 10001
            </p>
            <div>
              <Image
                src={FullMapImage}
                alt="Background Image"
                width={500}
                height={500}
                quality={100}
                className="h-full w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
