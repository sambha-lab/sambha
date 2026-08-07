"use client";

import { notFound } from "next/navigation";
import { getVendorById } from "../../../../../../lib/vendors";
import { Breadcrumbs } from "../../../../../../components/event-planner/vendor/Breadcrumbs";
import { OfferStatusView } from "../../../../../../components/event-planner/vendor/OfferStatusView";
// import { Breadcrumbs } from "../../../../../../../_components/event-planner/vendor/Breadcrumbs";
// import { OfferStatusView } from "../../../../../../../_components/event-planner/vendor/OfferStatusView";

export default function OfferStatusPage({
  params,
}: {
  params: { vendorId: string };
}): React.JSX.Element {
  const vendor = getVendorById(params.vendorId);
  if (!vendor) return notFound();

  // Sample offer data - in a real app this would come from props or API
  const offerDetails = {
    status: "sent",
    sentDate: "April 24, 2025",
    eventDates: "May 1 - 2, 2025",
    guests: 100,
    offerAmount: 1200,
    days: 2,
    totalAmount: 2400,
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white h-screen">
      <Breadcrumbs
        items={[
          { href: "/event-planner/vendors", label: "Vendors" },
          {
            href: `/event-planner/vendors/view/${vendor.id}`,
            label: vendor.name,
          },
          { label: "Offer status", isCurrent: true },
        ]}
      />

      <OfferStatusView vendor={vendor} offerDetails={offerDetails} />
    </div>
  );
}
