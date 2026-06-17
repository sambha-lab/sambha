import { notFound } from "next/navigation";
import { getVendorById } from "../../../../../../lib/vendors";
// import BookNowClient from "../../../../../../../_components/event-planner/vendor/BookNowClient";
import { ReactElement } from "react";
import BookNowClient from "../../../../../../components/event-planner/vendor/BookNowClient";

export default async function BookNowPage({
  params,
}: {
  params: { vendorId: string };
}): Promise<ReactElement> {
  const { vendorId } = params;
  const vendor = await getVendorById(vendorId);

  if (!vendor) return notFound();

  return <BookNowClient vendor={vendor} />;
}
