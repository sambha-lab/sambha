"use client";
import React, { useState } from "react";
import { Calendar, Briefcase, DollarSign, ShieldCheck } from "lucide-react"; // ✅ imported icons
import JobsCard from "components/vendor/JobsCard";
import ReviewsCard from "components/vendor/ReviewsCard";

const timeframes = ["24 hours", "7 days", "30 days"];

const StatsCard = ({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  change?: string;
}) => (
  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-start">
    <div className="flex justify-start mb-4">
      <Icon className="h-5 w-5 text-primary-violet" />
    </div>
    <div className="text-gray-400 text-xs mt-1">{label}</div>
    <div className="text-sm font-bold text-gray-900">
      {value}
      {change && (
        <span className="text-xs font-medium bg-[#f7ebff] rounded-full px-1 ml-1">
          {change}
        </span>
      )}
    </div>
  </div>
);

export default function VendorHome() {
  const [activeFrame, setActiveFrame] = useState("24 hours");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 lg:gap-16">
        {/* Left Section */}
        <div className="space-y-16 lg:space-y-20">
          {/* Stats */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-darkPurple">
              Your stats
            </h2>

            {/* Timeframe Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              {timeframes.map((frame) => (
                <button
                  key={frame}
                  onClick={() => setActiveFrame(frame)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    frame === activeFrame
                      ? "bg-gradient-to-b from-primary-violet to-primary-main text-white shadow-md"
                      : "bg-[#f3f3f3] text-gray-600 border hover:bg-gray-50"
                  }`}
                >
                  {frame}
                </button>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <StatsCard
                icon={Briefcase}
                label="Bookings"
                value="27"
                change="↑ 7%"
              />
              <StatsCard
                icon={Calendar}
                label="Events"
                value="5"
                change="↑ 1%"
              />
              <StatsCard
                icon={DollarSign}
                label="Total earned"
                value="$2,700"
                change="↑ 10%"
              />
            </div>

            {/* KYC Banner */}
            <div className="bg-gradient-to-b from-primary-violet to-primary-main text-gray-300 p-4 rounded-lg flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm">
                  Complete KYC verification
                </div>
                <div className="text-xs opacity-90">
                  Submit valid ID to verify your business.
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <ReviewsCard rating={4.95} reviewCount={24} />
        </div>

        {/* Right Section */}
        <div>
          <JobsCard />
        </div>
      </div>
    </div>
  );
}
