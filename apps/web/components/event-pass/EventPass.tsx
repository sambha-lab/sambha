// components/event-pass/EventPass.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import avatar from "assets/images/avatar2.png";
// import QrCode from "assets/images/QR-code.png";
import bgImage from "assets/images/event-pass-bg.png";
import React from "react";
import QrCodeGenerator from "./QrCodeGenerator";

interface EventPassProps {
  date: string;
  time: string;
  image: string; // 👈 optional now
  name: string;
}

const EventPass: React.FC<EventPassProps> = ({ date, time, name }) => {
  const [qrValue] = useState("https://example.com/ticket/123");

  return (
    <div
      className="relative rounded-xl flex w-full items-center md:p-6 p-2"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content (Left) */}
      <div className="relative z-10 flex flex-col w-full space-y-4 pl-4">
        <h1 className="text-sm md:text-lg font-bold bg-gradientText bg-clip-text text-transparent">
          Raccoon Musicals
        </h1>

        {/* Date and Time */}
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-gray-base">Date</p>
            <p className="text-sm">{date}</p>
          </div>

          <div>
            <p className="text-xs text-gray-base">Time</p>
            <p className="text-sm">{time}</p>
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center space-x-4">
          <Image
            src={avatar}
            alt="Avatar"
            width={28}
            height={28}
            className="rounded-full h-7 w-7"
          />
          <h2 className="text-sm">{name}</h2>
        </div>
      </div>

      {/* Divider (Middle) */}
      <div className="self-stretch border-l-2 border-dashed border-primary-light mx-6" />

      {/* QR Code (Right) */}
      <div className="flex justify-center items-center w-32 pr-2">
        <QrCodeGenerator value={qrValue} size={96} />
      </div>
    </div>
  );
};

export default EventPass;
