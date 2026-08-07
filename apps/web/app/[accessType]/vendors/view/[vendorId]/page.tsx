"use client";

import { notFound } from "next/navigation";
// import { useState, useEffect } from "react";
import { getVendorById } from "../../../../../lib/vendors";
import { use } from "react";
import { CheckCircle } from "lucide-react";
import { Breadcrumbs } from "../../../../../components/event-planner/vendor/Breadcrumbs";
import { ImageGallery } from "../../../../../components/event-planner/vendor/ImageGallery";
import { VendorHeader } from "../../../../../components/event-planner/vendor/vendorView/VendorHeader";
import { VendorActions } from "../../../../../components/event-planner/vendor/vendorView/VendorActions";
import { VendorReviews } from "../../../../../components/event-planner/vendor/vendorView/VendorReviews";
import { VendorDetails } from "../../../../../components/event-planner/vendor/vendorView/VendorDetails";

export default function VendorPage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}): React.JSX.Element {
  const { vendorId } = use(params);
  const vendor = getVendorById(vendorId);

  // const [images, setImages] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //       setImages([
  //         "/images/product1.jpg",
  //         "/images/product2.jpg",
  //         "/images/product3.jpg",
  //         "/images/product4.jpg",
  //       ]);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error loading images:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  if (!vendor) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { href: "/event-planner/vendors", label: "Vendors" },
          { label: vendor.name, isCurrent: true },
        ]}
      />

      <div className="flex flex-col justify-start items-start sm:flex-row gap-6">
        {/* Left Column - Images */}
        <div className="w-full lg:w-[58%] xl:w-[52%]">
          <ImageGallery
            containerWidth="w-full"
            images={vendor.images}
            mainImageHeight="h-64 sm:h-80 md:h-[450px]"
            thumbnailHeight="h-16 sm:h-20 md:h-24"
            thumbnailWidth="w-16 sm:w-20 md:w-24"
            // isLoading={isLoading}
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

            <VendorReviews vendor={vendor} />

            <VendorDetails vendor={vendor} />

            {/* Map placeholder */}
            <div className="w-full h-[200px] sm:h-[250px] overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.362974706922!2d3.3494461735047723!3d6.601734522252316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9230fc4fc853%3A0xd8babb191dac2f6b!2sAllen%20Ave%2C%20Allen%2C%20Ikeja%20101233%2C%20Lagos!5e0!3m2!1sen!2sng!4v1729671204756!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
                      {new Date(vendor.verifiedDate)
                        .toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/\//g, "/")}
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
