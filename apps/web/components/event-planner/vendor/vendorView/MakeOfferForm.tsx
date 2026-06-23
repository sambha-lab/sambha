"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Vendor } from "../../../../types/vendor";
import { VendorProfile } from "../VendorProfile";
import { Button } from "@sambha/ui/button";

interface MakeOfferFormProps {
  vendor: Vendor;
  onSubmit: (offerData: {
    eventId: string;
    amount: number;
    message: string;
  }) => Promise<void>;
  events: Array<{
    id: string;
    name: string;
    description: string;
    date: string;
    guests: number;
  }>;
}

export function MakeOfferForm({
  vendor,
  onSubmit,
  events,
}: MakeOfferFormProps): React.JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(events[0]!.id);
  const [offerAmount, setOfferAmount] = useState(1200);
  const [message, setMessage] = useState(
    "We're hosting a corporate event and would like you to consider our offer to rent your hall for 2 days at this price."
  );

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit({
        eventId: selectedEventId,
        amount: offerAmount,
        message,
      });
    } catch (err) {
      setError(
        (err as Error).message || "Failed to submit offer. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8">
      {/* Left Column - Offer Form (2/3 width) */}
      <div className="lg:col-span-2">
        <div className="bg-white p-6">
          {/* Event Selection Dropdown */}
          <div className="mb-6">
            <label
              htmlFor="event-select"
              className="font-semibold text-gray-800 mb-4 block"
            >
              Assign to event
            </label>
            <select
              id="event-select"
              className="w-full p-3 border border-gray-200 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          {/* Event Details */}
          <h4 className="font-semibold text-gray-800 mb-4 block border-b border-gray-200 pb-2">
            Your event
          </h4>
          <div className="flex gap-28 sm:gap-52 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400">Dates</h4>
              <p className="mt-1 font-medium text-gray-800">
                {selectedEvent?.date}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Guests</h4>
              <p className="mt-1 font-medium text-gray-800">
                {selectedEvent?.guests} guests
              </p>
            </div>
          </div>

          {/* Offer Amount */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 block pb-2">
              Your offer amount
            </h3>
            <div className="relative">
              <select
                value={offerAmount}
                onChange={(e) => setOfferAmount(Number(e.target.value))}
                className="w-full pl-3 pr-12 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2] appearance-none"
              >
                <option value="1000">$1,000</option>
                <option value="1100">$1,100</option>
                <option value="1200">$1,200</option>
                <option value="1300">$1,300</option>
                <option value="1400">$1,400</option>
                <option value="1500">$1,500</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">per day</span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Message to Vendor */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 block pb-2">
              Message to vendor (optional)
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2] resize-none"
              rows={4}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full border border-[#6946e2] text-white ${
              isSubmitting ? "opacity-75" : ""
            }`}
          >
              {isSubmitting ? "Submitting..." : "Submit offer"}
          </Button>

          {error && (
            <div className="mt-4 text-red-600 text-sm flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Vendor Summary (1/3 width) */}
      <div>
        <VendorProfile vendor={vendor} />
      </div>
    </div>
  );
}
