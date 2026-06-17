"use client";

import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { getVendorById } from "../../../../../../lib/vendors";
import { Breadcrumbs } from "../../../../../../components/event-planner/vendor/Breadcrumbs";
import { MakeOfferForm } from "../../../../../../components/event-planner/vendor/vendorView/MakeOfferForm";

export default function MakeOfferPage({
  params,
}: {
  params: { vendorId: string };
}): React.JSX.Element {
  const router = useRouter();
  const vendor = getVendorById(params.vendorId);
  if (!vendor) return notFound();

  const events = [
    {
      id: "1",
      name: "Oliver & Emily's Wedding",
      description: "Wedding ceremony and reception",
      date: "May 1 - 2, 2025",
      guests: 100,
    },
    {
      id: "2",
      name: "Corporate Annual Gala",
      description: "Company annual celebration event",
      date: "June 15, 2025",
      guests: 200,
    },
    {
      id: "3",
      name: "Sarah's 30th Birthday",
      description: "Milestone birthday celebration",
      date: "July 20, 2025",
      guests: 50,
    },
  ];

  const handleSubmitOffer = async (offerData: {
    eventId: string;
    amount: number;
    message: string;
  }) => {
    if (!offerData.eventId) {
      throw new Error("Please select an event");
    }
    if (offerData.amount <= 0) {
      throw new Error("Please enter a valid offer amount");
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push(`/event-planner/vendors/view/${vendor.id}/offer-status`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <Breadcrumbs
        items={[
          { href: "/event-planner/vendors", label: "Vendors" },
          {
            href: `/event-planner/vendors/view/${vendor.id}`,
            label: vendor.name,
          },
          { label: "Make an offer", isCurrent: true },
        ]}
      />

      <MakeOfferForm
        vendor={vendor}
        events={events}
        onSubmit={handleSubmitOffer}
      />
    </div>
  );
}
