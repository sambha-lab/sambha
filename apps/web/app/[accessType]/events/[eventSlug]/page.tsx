"use client";

import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
// import { Button } from "@sambha/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// === Assets ===
import eventImage from "../../../../../public/event-planner/background.png";
import back from "../../../../../public/event-planner/arrow.png";
import edit from "../../../../../public/event-planner/edit2.png";
import themeIcon from "../../../../../public/event-planner/theme.png";
import messages from "../../../../../public/event-planner/message.png";
import guestsIcon from "../../../../../public/event-planner/guest.png";
import image from "../../../../../public/event-planner/image1.png";
import location from "../../../../../public/event-planner/location.png";
import time from "../../../../../public/event-planner/time.png";
import date from "../../../../../public/event-planner/date.png";
import sitting from "../../../../../public/event-planner/sitting.png";
import map from "../../../../../public/event-planner/Full Map.png";

// Theme backgrounds
import frame1 from "../../../../../public/event-planner/Frame 1.png";
import frame2 from "../../../../../public/event-planner/Frame 2.png";
import frame3 from "../../../../../public/event-planner/Frame 3.png";
import frame4 from "../../../../../public/event-planner/Frame 4.png";
import frame5 from "../../../../../public/event-planner/Frame 5.png";
import frame6 from "../../../../../public/event-planner/Frame 6.png";
import frame7 from "../../../../../public/event-planner/Frame 7.png";
import frame8 from "../../../../../public/event-planner/Frame 8.png";
import frame9 from "../../../../../public/event-planner/Frame 9.png";
import frame10 from "../../../../../public/event-planner/Frame 10.png";
import frame11 from "../../../../../public/event-planner/Frame 11.png";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { slugify } from "hooks/Slugify";
import Guest from "./guest";
import BudgetBreakDown from "./budget";
import { dummyEvents, FullEventsProps } from "types/events/dummyEvents";

type ThemeConfig = {
  name: string;
  image: StaticImageData;
  isDefault?: boolean;
  styles: {
    overlay: string;
    contentBg: string;
    primaryText: string;
    secondaryText: string;
    cardBg: string;
    borderColor: string;
    gradientFrom: string;
    gradientTo: string;
    shadowStyle: string;
  };
};

const defaultTheme: ThemeConfig = {
  name: "Default",
  image: frame1,
  isDefault: true,
  styles: {
    overlay: "bg-white/80 backdrop-blur-sm",
    contentBg: "bg-white/95 backdrop-blur-md",
    primaryText: "text-[#2A1D52]",
    secondaryText: "text-[#98A2B3]",
    cardBg: "bg-white/90 backdrop-blur-sm",
    borderColor: "border-[#98A2B3]/30",
    gradientFrom: "from-[#C96FFF]",
    gradientTo: "to-[#2B2BCF]",
    shadowStyle: "shadow-xl shadow-black/10",
  },
};

const themeConfigs: ThemeConfig[] = [
  {
    name: "Default",
    image: frame1,
    isDefault: true,
    styles: {
      overlay: "bg-white/80 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-[#2A1D52]",
      secondaryText: "text-[#98A2B3]",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-[#98A2B3]/30",
      gradientFrom: "from-[#C96FFF]",
      gradientTo: "to-[#2B2BCF]",
      shadowStyle: "shadow-xl shadow-black/10",
    },
  },
  {
    name: "Classic Blue",
    image: frame8,
    styles: {
      overlay: "bg-blue-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-blue-900",
      secondaryText: "text-blue-600",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-blue-200/50",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-700",
      shadowStyle: "shadow-xl shadow-blue-500/20",
    },
  },
  {
    name: "Soft Pink",
    image: frame5,
    styles: {
      overlay: "bg-pink-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-rose-900",
      secondaryText: "text-rose-600",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-pink-200/50",
      gradientFrom: "from-pink-500",
      gradientTo: "to-rose-600",
      shadowStyle: "shadow-xl shadow-pink-500/20",
    },
  },
  {
    name: "Vintage",
    image: frame6,
    styles: {
      overlay: "bg-amber-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-amber-900",
      secondaryText: "text-amber-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-amber-200/50",
      gradientFrom: "from-amber-500",
      gradientTo: "to-orange-600",
      shadowStyle: "shadow-xl shadow-amber-500/20",
    },
  },
  {
    name: "Modern Black",
    image: frame3,
    styles: {
      overlay: "bg-gray-100/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-gray-900",
      secondaryText: "text-gray-600",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-gray-300/50",
      gradientFrom: "from-gray-700",
      gradientTo: "to-gray-900",
      shadowStyle: "shadow-xl shadow-gray-500/20",
    },
  },
  {
    name: "Nature Green",
    image: frame4,
    styles: {
      overlay: "bg-green-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-green-900",
      secondaryText: "text-green-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-green-200/50",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      shadowStyle: "shadow-xl shadow-green-500/20",
    },
  },
  {
    name: "Royal Purple",
    image: frame7,
    styles: {
      overlay: "bg-purple-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-purple-900",
      secondaryText: "text-purple-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-purple-200/50",
      gradientFrom: "from-purple-500",
      gradientTo: "to-violet-600",
      shadowStyle: "shadow-xl shadow-purple-500/20",
    },
  },
  {
    name: "Sunset",
    image: frame2,
    styles: {
      overlay: "bg-orange-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-orange-900",
      secondaryText: "text-orange-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-orange-200/50",
      gradientFrom: "from-orange-500",
      gradientTo: "to-red-500",
      shadowStyle: "shadow-xl shadow-orange-500/20",
    },
  },
  {
    name: "Ocean Blue",
    image: frame9,
    styles: {
      overlay: "bg-cyan-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-cyan-900",
      secondaryText: "text-cyan-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-cyan-200/50",
      gradientFrom: "from-cyan-500",
      gradientTo: "to-blue-600",
      shadowStyle: "shadow-xl shadow-cyan-500/20",
    },
  },
  {
    name: "Forest",
    image: frame10,
    styles: {
      overlay: "bg-emerald-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-emerald-900",
      secondaryText: "text-emerald-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-emerald-200/50",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-green-700",
      shadowStyle: "shadow-xl shadow-emerald-500/20",
    },
  },
  {
    name: "Golden",
    image: frame11,
    styles: {
      overlay: "bg-yellow-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-yellow-900",
      secondaryText: "text-yellow-800",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-yellow-200/50",
      gradientFrom: "from-yellow-500",
      gradientTo: "to-amber-600",
      shadowStyle: "shadow-xl shadow-yellow-500/20",
    },
  },
];

function ThemeSelector({
  selectedTheme,
  setSelectedTheme,
  onClose,
}: {
  selectedTheme: ThemeConfig | null;
  setSelectedTheme: (theme: ThemeConfig) => void;
  onClose: () => void;
}) {
  const handleThemeSelect = (theme: ThemeConfig) => {
    setSelectedTheme(theme);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl max-w-4xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold transition-colors"
        >
          &times;
        </button>
        <h1 className="text-3xl font-bold text-[#2A1D52] mb-6">
          Choose a theme
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {themeConfigs.map((theme, index) => (
            <div
              key={index}
              onClick={() => handleThemeSelect(theme)}
              className={`border-3 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedTheme?.name === theme.name
                  ? "border-[#2A1D52] shadow-lg scale-105"
                  : "border-transparent hover:border-gray-200"
              }`}
            >
              <div className="relative">
                <Image
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {theme.isDefault && (
                  <div className="absolute top-2 right-2 bg-[#2A1D52] text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Default
                  </div>
                )}
              </div>
              <p className="text-center text-base font-semibold p-3 text-gray-800">
                {theme.name}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => handleThemeSelect(defaultTheme)}
            className="px-8 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-semibold text-gray-700"
          >
            Reset to Default
          </button>
        </div>
        <p className="text-center text-base mt-6 text-[#2B2BCF] cursor-pointer hover:underline font-medium">
          Upload from gallery
        </p>
      </div>
    </div>
  );
}

function Page() {
  const params = useParams();
  const [event, setEvent] = useState<FullEventsProps>();
  const router = useRouter();
  const eventSlug = params?.eventSlug;

  useEffect(() => {
    if (eventSlug) {
      const foundEvent = dummyEvents.find((newEvent: FullEventsProps) => {
        console.log(slugify(newEvent.name), "event Name");

        return slugify(newEvent.name) === slugify(eventSlug.toString());
      });
      setEvent(foundEvent);
    }
  }, [eventSlug]);

  const status = [
    {
      stat: "Going",
      value: event?.guests.map((guest) => guest.status === "going").length,
    },
    {
      stat: "Pending",
      value: event?.guests.map((guest) => guest.status === "pending").length,
    },
    {
      stat: "Not going",
      value: event?.guests.map((guest) => guest.status === "not_going").length,
    },
  ];

  const edits = [
    { imageUrl: edit, tag: "Edit" },
    { imageUrl: themeIcon, tag: "Theme" },
    { imageUrl: messages, tag: "Messages" },
    { imageUrl: guestsIcon, tag: "Guests" },
  ];

  const tabs = ["Details", "Guests", "Tasks", "Budget"];
  const [activeTab, setActiveTab] = useState("Details");
  const [openTheme, setOpenTheme] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(defaultTheme);
  const [banner, setBanner] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBanner(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleNavigateBack = () => {
    router.back();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Details":
        return (
          <main className="grid grid-cols-1 mdlg:grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Section */}
            <section className="space-y-6">
              {/* Event Banner */}
              <div className="relative group">
                {banner ? (
                  <Image
                    src={banner}
                    alt="Custom banner"
                    className={`w-full rounded-2xl object-cover max-h-[400px] ${selectedTheme.styles.shadowStyle} transition-all duration-300 group-hover:scale-[1.02]`}
                    width={800}
                    height={400}
                  />
                ) : (
                  <Image
                    src={eventImage}
                    alt="Default banner"
                    className={`w-full rounded-2xl object-cover max-h-[400px] ${selectedTheme.styles.shadowStyle} transition-all duration-300 group-hover:scale-[1.02]`}
                    width={800}
                    height={400}
                  />
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`absolute bottom-4 left-4 ${selectedTheme.styles.cardBg} px-6 py-3 rounded-full text-base font-medium ${selectedTheme.styles.primaryText} ${selectedTheme.styles.shadowStyle} transition-all duration-300 hover:scale-105 backdrop-blur-sm`}
                >
                  Edit background
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="hidden"
                />
              </div>

              {/* Hosts Section */}
              <div
                className={`${selectedTheme.styles.cardBg} ${selectedTheme.styles.shadowStyle} p-6 rounded-2xl border ${selectedTheme.styles.borderColor} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex flex-col mdlg:flex-col md:flex-row justify-between gap-4 pb-4 border-b-2 border-current/20">
                  <div>
                    <h1
                      className={`text-2xl ${selectedTheme.styles.primaryText} font-semibold`}
                    >
                      Hosts
                    </h1>
                    <p
                      className={`${selectedTheme.styles.secondaryText} antialiased leading-relaxed`}
                    >
                      Add event manager to see your event through.
                    </p>
                  </div>
                  <button
                    className={`bg-gradient-to-r ${selectedTheme.styles.gradientFrom} ${selectedTheme.styles.gradientTo} text-white font-semibold text-lg py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  >
                    + Add host
                  </button>
                </div>

                {/* Host List */}
                <div className="space-y-4 mt-4">
                  {event &&
                    [event.host, event.coHost].map((official, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col w-full md:flex-row gap-3  justify-between items-center p-4 rounded-xl border ${selectedTheme.styles.borderColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-white/50`}
                      >
                        <div className="flex gap-3 items-center">
                          <Image
                            src={image}
                            alt="host"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <h2
                              className={`${selectedTheme.styles.primaryText} font-bold`}
                            >
                              {official.name}
                            </h2>
                            <p
                              className={`${selectedTheme.styles.secondaryText} antialiased leading-relaxed`}
                            >
                              {official.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 items-center">
                          <h2 className="text-[#2B2BCF] font-semibold">
                            {official.role}
                          </h2>
                          <Image
                            src={edit}
                            alt="edit"
                            height={20}
                            width={20}
                            className="cursor-pointer hover:scale-110 transition-transform"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Guests Section */}
              <div
                className={`${selectedTheme.styles.cardBg} ${selectedTheme.styles.shadowStyle} p-6 rounded-2xl border ${selectedTheme.styles.borderColor} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-between mb-4">
                  <div>
                    <h1
                      className={`text-2xl font-semibold ${selectedTheme.styles.primaryText}`}
                    >
                      Guests
                    </h1>
                    <p
                      className={`text-base ${selectedTheme.styles.secondaryText}`}
                    >
                      Add event managers to see your event through
                    </p>
                  </div>
                  <p
                    className={`cursor-pointer ${selectedTheme.styles.secondaryText} hover:underline antialiased leading-relaxed`}
                  >
                    View all &gt;
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {status.map((stat, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 text-center"
                    >
                      <p
                        className={`antialiased leading-relaxed ${selectedTheme.styles.primaryText} text-2xl font-bold`}
                      >
                        {stat.value}
                      </p>
                      <h2
                        className={`${selectedTheme.styles.secondaryText} text-base`}
                      >
                        {stat.stat}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Right Section */}
            <section className="space-y-6">
              {/* Event Title and Details */}
              <div
                className={`${selectedTheme.styles.cardBg} ${selectedTheme.styles.shadowStyle} p-6 rounded-2xl border ${selectedTheme.styles.borderColor} transition-all duration-300  hover:scale-[1.02]`}
              >
                <h1
                  className={`text-3xl font-bold mb-4 ${selectedTheme.styles.primaryText}`}
                >
                  {event?.name}
                </h1>
                <div
                  className={`space-y-3 text-base ${selectedTheme.styles.primaryText}`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={location}
                      alt="location"
                      width={20}
                      height={20}
                    />
                    <h2>{event?.venue.address}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={date} alt="date" width={20} height={20} />
                    <h2>{event?.date}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={time} alt="time" width={20} height={20} />
                    <h2>{event?.time.start}</h2>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-4">
                {edits.map((edit, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center cursor-pointer ${selectedTheme.styles.primaryText} transition-all duration-300 hover:scale-110`}
                    onClick={
                      edit.tag === "Theme" ? () => setOpenTheme(true) : () => {}
                    }
                  >
                    <div
                      className={`${selectedTheme.styles.cardBg} ${selectedTheme.styles.shadowStyle} rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300 hover:shadow-lg`}
                    >
                      <Image
                        src={edit.imageUrl}
                        alt={edit.tag}
                        width={24}
                        height={24}
                      />
                    </div>
                    <h2 className="mt-2 text-base font-medium">{edit.tag}</h2>
                  </div>
                ))}
              </div>

              {/* Sitting Chart Section */}
              <div
                className={`flex flex-col px-6 py-8 bg-gradient-to-br ${selectedTheme.styles.gradientFrom} ${selectedTheme.styles.gradientTo} items-center rounded-2xl text-white-base transition-all duration-300 hover:scale-[1.02] ${selectedTheme.styles.shadowStyle}`}
              >
                <div className="flex gap-2 items-center mb-2">
                  <Image src={sitting} alt="sitting" width={20} height={20} />
                  <h2 className="text-lg font-semibold">
                    Create sitting chart
                  </h2>
                </div>
                <p className="antialiased leading-relaxed text-center text-white/90">
                  Assign seats to guests and notify them
                </p>
              </div>

              {/* About Section */}
              <div
                className={`${selectedTheme.styles.cardBg} ${selectedTheme.styles.shadowStyle} p-6 rounded-2xl border ${selectedTheme.styles.borderColor} transition-all duration-300`}
              >
                <h1
                  className={`${selectedTheme.styles.primaryText} text-2xl font-semibold mb-4 pb-2 border-b ${selectedTheme.styles.borderColor}`}
                >
                  About
                </h1>
                <p
                  className={`antialiased leading-relaxed text-justify ${selectedTheme.styles.primaryText} leading-relaxed`}
                >
                  {event?.description}
                </p>
              </div>

              {/* Location Section */}
              <div
                className={`${selectedTheme.styles.cardBg} ${selectedTheme.styles.shadowStyle} p-6 rounded-2xl border ${selectedTheme.styles.borderColor} transition-all duration-300`}
              >
                <h1
                  className={`${selectedTheme.styles.primaryText} text-2xl font-semibold mb-4 pb-2 border-b ${selectedTheme.styles.borderColor}`}
                >
                  Location
                </h1>
                <h2
                  className={`${selectedTheme.styles.primaryText} font-semibold text-lg`}
                >
                  {event?.venue.address}{" "}
                </h2>
                <p className={`${selectedTheme.styles.secondaryText} mb-4`}>
                  {event?.venue.name}{" "}
                </p>
                <div className="relative group">
                  <Image
                    src={map}
                    alt="map"
                    className={`w-full h-40 object-cover rounded-xl ${selectedTheme.styles.shadowStyle} transition-all duration-300 group-hover:scale-[1.02]`}
                    width={600}
                    height={160}
                  />
                </div>
              </div>
            </section>
          </main>
        );

      case "Guests":
        return (
          <div>
            <div className="flex items-center gap-2">
              <div className="flex grow">
                <Guest filterEVent={event} />
              </div>
            </div>
          </div>
        );

      case "Tasks":
        return <div>Tasks Tab Coming Soon</div>;

      case "Budget":
        return <div>{event && <BudgetBreakDown event={event} />}</div>;

      default:
        return null;
    }
  };
  return (
    <div className="font-fractul min-h-screen relative">
      {/* Fixed Background with Theme Image */}
      <div
        className="antialiased fixed inset-0 -z-20 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${selectedTheme.image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      <div
        className={`fixed inset-0 -z-10 transition-all duration-700 ${selectedTheme.styles.overlay}`}
      />

      {/* Main Content Container */}
      <div className={`relative min-h-screen transition-all duration-500`}>
        <div
          className={`p-4 md:p-6 ${selectedTheme.styles.contentBg} ${selectedTheme.styles.shadowStyle} rounded-2xl m-4 transition-all duration-500`}
        >
          {/* Navigation */}
          <nav
            className={`flex gap-2 ${selectedTheme.styles.secondaryText} text-lg md:text-xl items-center my-6`}
          >
            <button className="flex items-center" onClick={handleNavigateBack}>
              <Image
                src={back}
                alt="back-arrow"
                width={20}
                height={20}
                className="transition-all duration-300 hover:scale-110"
              />
              <span className="cursor-pointer hover:underline transition-all">
                Events /{" "}
              </span>
            </button>
            <span
              className={`${selectedTheme.styles.primaryText} font-semibold text-lg md:text-2xl`}
            >
              {event && event.name}
            </span>
          </nav>

          {/* Tabs */}
          <ul
            className={`flex text-lg md:text-xl ${selectedTheme.styles.secondaryText} gap-4 my-6 pb-4 border-b-2 ${selectedTheme.styles.borderColor}`}
          >
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer pb-1 border-b-4 transition-all duration-300 hover:scale-105 ${
                  activeTab === tab
                    ? `${selectedTheme.styles.primaryText} border-current`
                    : `${selectedTheme.styles.secondaryText} border-transparent hover:${selectedTheme.styles.primaryText}`
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>

          {/*  Tab Content */}
          {renderTabContent()}
        </div>
      </div>

      {/* Theme Selector Modal */}
      {openTheme && (
        <ThemeSelector
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          onClose={() => setOpenTheme(false)}
        />
      )}

      {/* Theme Selector Modal */}
      {openTheme && (
        <ThemeSelector
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          onClose={() => setOpenTheme(false)}
        />
      )}
    </div>
  );
}

export default Page;
