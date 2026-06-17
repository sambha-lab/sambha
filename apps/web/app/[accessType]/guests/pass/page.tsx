"use client";
import React, { useState } from "react";
import EventPass from "components/event-pass/EventPass";
import { Button } from "@sambha/ui/button";
import { Download, X } from "lucide-react";
import avatar from "../../../../public/Images/oliver-emily.png";

import Image from "next/image";
import NotificationSwitch from "components/event-pass/NotificationSwitch";

const passes = [
  { date: "Sept 10, 2025", time: "7:00 PM", name: "John Doe" },
  { date: "Sept 12, 2025", time: "8:30 PM", name: "Jane Smith" },
];

const users = [
  { id: 1, name: "Alice book", img: avatar, host: true },
  { id: 2, name: "Bob mark", img: avatar, host: true },
  { id: 3, name: "Charlie", img: avatar },
  { id: 4, name: "Cody Fisher", img: avatar },
  { id: 5, name: "Ralph Edwards", img: avatar },
  { id: 6, name: "you", img: avatar },
];

// ✅ Our own modal
function CustomModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black-100 bg-opacity-60"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-primary-light w-full h-full sm:rounded-xl sm:h-auto sm:max-w-lg sm:w-full mx-auto overflow-y-auto shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-error-50/10 rounded-xl p-1"
        >
          <X className="w-6 h-6 text-error-50" />
        </button>

        {children}
      </div>
    </div>
  );
}

export default function Passpage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <div className="min-h-screen w-full py-8">
      <h1 className="text-[42px] font-bold text-gray-800 mb-8 font-[Fractul]">
        Pass
      </h1>

      {/* Pass cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {passes.map((pass, index) => (
          <div key={index} className="flex flex-col gap-4">
            {/* Event pass card */}

            <EventPass
              date={pass.date}
              image="assets/images/event-pass-bg.png"
              time={pass.time}
              name={pass.name}
            />

            {/* Download button */}
            <div className="flex justify-end">
              <Button
                variant="primary"
                className="md:w-auto text-sm w-full flex items-center gap-2"
              >
                Download
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Custom Modal */}
      <CustomModal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="flex flex-col space-y-6 p-6">
          {/* Event Header */}
          <div className="flex flex-col items-center space-y-4 pt-8">
            <Image
              src={avatar}
              alt="Avatar"
              quality={100}
              width={96}
              height={96}
              className="rounded-full h-24 w-24 object-cover border-4 border-white shadow-md"
            />

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Racoon Musicals
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-sm font-medium text-gray-700">
                  Wed, May 31
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">12:00 PM</span>
              </div>
            </div>

            <Button variant="secondary" className="w-full font-medium mt-2">
              View event
            </Button>
          </div>

          {/* Settings Section */}
          <div className="space-y-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Mute notifications
              </span>
              <NotificationSwitch />
            </div>
            <span className="text-sm text-red-600 cursor-pointer">
              Report listing
            </span>
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <span className="text-sm font-medium text-gray-700">Members</span>
              <span className="text-sm text-gray-500">23</span>
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={user.img}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full h-8 w-8 object-cover border"
                  />
                  <span className="text-sm text-gray-900">{user.name}</span>
                </div>

                {user.host && (
                  <span className="text-xs px-2 py-1 rounded-full text-gray-600 font-medium bg-gray-100 border border-gray-200">
                    Host
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
