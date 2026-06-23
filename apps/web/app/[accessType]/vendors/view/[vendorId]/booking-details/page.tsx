import { notFound } from "next/navigation";
import { getVendorById } from "../../../../../../lib/vendors";
import { ReactElement } from "react";
import { BookingDetailsClient } from "../../../../../../components/event-planner/vendor/BookingDetailsClient";
import { ReviewsProvider } from "components/event-planner/vendor/vendorView/ReviewsContext";

export default async function BookingDetailsPage({
  params,
}: {
  params: { vendorId: string };
}): Promise<ReactElement> {
  const vendor = await getVendorById(params.vendorId);
  if (!vendor) return notFound();

  return (
    <ReviewsProvider>
      <BookingDetailsClient vendor={vendor} />
    </ReviewsProvider>
  );}
