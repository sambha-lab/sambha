"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Breadcrumbs } from "../../../../components/event-planner/vendor/Breadcrumbs";
import { ImageGallery } from "../../../../components/event-planner/vendor/ImageGallery";
import { VendorHeader } from "../../../../components/event-planner/vendor/vendorView/VendorHeader";
import { VendorActions } from "../../../../components/event-planner/vendor/vendorView/VendorActions";
import { VendorReviews } from "../../../../components/event-planner/vendor/vendorView/VendorReviews";
import { VendorDetails } from "../../../../components/event-planner/vendor/vendorView/VendorDetails";
import { MapEmbed } from "components/map/MapEmbed";
import { useReviews } from "components/event-planner/vendor/vendorView/ReviewsContext";
import { Vendor } from "../../../../types/vendor";

type BookingStatus = "pending" | "confirmed" | "add-milestone" | "add-review";

interface VendorPageContentProps {
  vendor: Vendor;
}

export function VendorPageContent({ vendor }: VendorPageContentProps) {
  const { reviews, addReview } = useReviews();
  const [status, setStatus] = useState<BookingStatus>("pending");

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { href: "/vendor/vendors", label: "Vendors" },
          { label: vendor.name, isCurrent: true },
        ]}
      />

      <div className="flex flex-col justify-start items-start md:flex-row gap-6">
        {/* Left Column - Images */}
        <div className="w-full lg:w-[58%] xl:w-[52%]">
          <ImageGallery
            containerWidth="w-full"
            images={vendor.images}
            mainImageHeight="h-64 sm:h-80 md:h-[450px]"
            thumbnailHeight="h-16 sm:h-20 md:h-24"
            thumbnailWidth="w-16 sm:w-20 md:w-24"
            thumbnailCount={4}
          />
        </div>

        {/* Right Column - Vendor Info */}
        <div className="w-full lg:w-[42%] xl:w-[40%]">
          <div className="sticky top-8 space-y-6">
            <VendorHeader vendor={vendor} />

            {/* Message Form */}
            <div className="bg-[#f9f9f9] p-4 rounded-lg">
              <h3 className="text-gray-600 mb-2 text-sm font-semibold">
                Send vendor a message
              </h3>
              <div className="relative flex items-center">
                <textarea
                  className="w-full p-3 bg-[#f2f2f2] rounded text-gray-500 text-sm pr-16 resize-none h-10"
                  placeholder="Type your message..."
                  rows={1}
                />
                <button className="absolute right-3 bg-[#ebecee] text-gray-400 text-sm py-1 px-4 rounded-full hover:bg-[#c96fff] transition-colors">
                  Send
                </button>
              </div>
            </div>

            <VendorActions vendorId={vendor.id} />

            <div className="space-y-4">
              <h2 className="text-gray-700 font-semibold border-y-[1px] border-gray-200 py-3">
                Description
              </h2>
              <p className="text-gray-800 text-sm">{vendor.description}</p>
            </div>

            {/* Vendor Reviews - Now fully using context */}
            <VendorReviews
              vendor={{
                ...vendor,
                reviews,
                reviewCount: reviews.length,
              }}
              onAddReview={() => setStatus("add-review")}
              onSubmitReview={({ rating, content }) => {
                addReview({
                  userName: "You",
                  content,
                  rating,
                  userImage: "/user-avatar.png",
                  isLiked: false,
                  currentLikes: 0,
                  userAvatar: "",
                  comment: "",
                });
              }}
            />

            <VendorDetails vendor={vendor} />

            {/* Map Embed */}
            <div
              className="relative overflow-hidden rounded-lg shadow-lg"
              style={{ height: "200px" }}
            >
              <MapEmbed height="210px" className="absolute -top-1 w-full" />
            </div>

            {vendor.verified && (
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0e7b33] mt-0.5" />
                  <div>
                    <span className="text-gray-800 font-bold">
                      Verified vendor
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      This vendor was verified on{" "}
                      {new Date(vendor.verifiedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
