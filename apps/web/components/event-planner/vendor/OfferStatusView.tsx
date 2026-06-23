"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { Vendor } from "../../../types/vendor";
import { VendorProfile } from "./VendorProfile";

interface OfferStatusViewProps {
  vendor: Vendor;
  offerDetails: {
    status: string;
    sentDate: string;
    eventDates: string;
    guests: number;
    offerAmount: number;
    days: number;
    totalAmount: number;
  };
}

export function OfferStatusView({
  vendor,
  offerDetails,
}: OfferStatusViewProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-8">
      {/* Left Column - Offer Status (2/3 width) */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6">
          <div className="flex items-center gap-3 mb-6 p-4 bg-[#f7ebff] rounded-lg w-full">
            <Clock className="w-6 h-6 text-yellow-500" />
            <div className="">
              <h2 className="font-semibold text-gray-800">Offer sent</h2>
              <p className="text-gray-600">Awaiting vendor response</p>
              <p className="text-sm text-gray-500 mt-1">
                Sent on {offerDetails.sentDate}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Your offer
            </h3>
            <div className="flex gap-18 sm:gap-32 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Dates</h4>
                <p className="mt-1 font-medium text-gray-800">
                  {offerDetails.eventDates}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Guests</h4>
                <p className="mt-1 font-medium text-gray-800">
                  {offerDetails.guests} guests
                </p>
              </div>
            </div>
            <div className="flex gap-28 sm:gap-32 mb-4">
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400">
                  Offer amount
                </h4>
                <p className="mt-1 font-medium text-gray-800">
                  ${offerDetails.offerAmount} per day
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400">Total</h4>
                <p className="mt-1 font-bold text-gray-800">
                  ${offerDetails.totalAmount}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/vendor/vendors/view/${vendor.id}/make-offer`}
            className="text-[#6946e2] font-medium hover:underline"
          >
            Edit offer
          </Link>
        </div>
      </div>

      {/* Right Column - Vendor Summary (1/3 width) */}
      <div>
        <VendorProfile vendor={vendor} />
      </div>
    </div>
  );
}
