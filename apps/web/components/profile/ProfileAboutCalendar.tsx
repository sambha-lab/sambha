"use client";
import { useState } from "react";
import { Pencil, Calendar } from "lucide-react";
import { Button } from "@sambha/ui/button";

interface Event {
  time: string;
  title: string;
  icon: string; // You can use emojis or icons
}

export default function ProfileAboutCalendar() {
  const [isEditing, setIsEditing] = useState(false);
  const [calendarAccess, setCalendarAccess] = useState(false);
  const [aboutText, setAboutText] = useState(
    "This is a description about you. Let us rent the best halls to you at the best prices."
  );

  const events: Event[] = [
    { time: "12:00 PM", title: "Racoons Musicals", icon: "🎵" },
    { time: "2:00 PM", title: "Lunch with the Pope", icon: "☀️" },
    { time: "4:00 PM", title: "Kickboxing with Kixa", icon: "☀️" },
    { time: "9:00 PM", title: "Dinner", icon: "🌙" },
  ];

  // Fixed calendar data to match the screenshot exactly
  const calendarDays = [
    { day: "27", label: "30H" },
    { day: "28", label: "MON" },
    { day: "29", label: "TUE" },
    { day: "30", label: "WEB", isCurrent: true },
    { day: "1", label: "THU" },
    { day: "2", label: "NEW", isCurrent: true },
    { day: "3", label: "SAT" },
  ];

  return (
    <div className="w-full max-w-md p-6 space-y-6">
      {/* About Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold text-primary-darkPurple">
            About
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
        {isEditing ? (
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="w-full border rounded p-2 text-sm text-gray-700"
          />
        ) : (
          <p className="text-sm text-gray-700">{aboutText}</p>
        )}
      </div>

      {/* Calendar Section */}
      <h2 className="text-base font-semibold text-primary-darkPurple">
        Your calendar
      </h2>

      {!calendarAccess ? (
        <div className="flex flex-col items-center justify-center text-center space-y-3 border-t pt-4">
          <div className="rounded-full bg-gray-200 p-2">
            <Calendar className="h-6 w-6 text-primary-darkPurple" />
          </div>
          <h3 className="text-sm font-medium text-gray-900">
            Allow access to your calendar
          </h3>
          <p className="text-xs text-gray-base max-w-xs">
            Sync your calendar on Sambha and keep all your events in one place.
          </p>
          <Button
            variant="primary"
            className="mt-2 w-full"
            onClick={() => setCalendarAccess(true)}
          >
            Allow access
          </Button>
        </div>
      ) : (
        <div className="space-y-4 border-t pt-4">
          {/* Calendar Header */}
          <h3 className="text-lg font-semibold text-gray-900">May 02</h3>

          {/* Calendar Grid - Fixed to match screenshot */}
          <div className="grid grid-cols-7 gap-2 pb-4">
            {calendarDays.map((dayData, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div
                    className={`flex flex-col items-center justify-center h-14 w-14 rounded-full ${
                      dayData.isCurrent
                        ? "bg-primary-darkPurple text-primary-light"
                        : "text-primary-darkPurple"
                    }`}
                  >
                    <div
                      className={`text-lg font-medium ${dayData.isCurrent ? "font-bold" : ""}`}
                    >
                      {dayData.day}
                    </div>
                    <div
                      className={`text-xs ${dayData.isCurrent ? "text-white" : "text-gray-400"} mt-1`}
                    >
                      {dayData.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {events.map((event, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b p-2"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">{event.icon}</span>
                <span className="text-sm font-medium text-gray-900">
                  {event.title}
                </span>
              </div>
              <span className="text-xs text-gray-500">{event.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
