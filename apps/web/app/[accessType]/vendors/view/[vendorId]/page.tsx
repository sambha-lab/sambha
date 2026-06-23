import { getVendorById } from "lib/vendors";
import { notFound } from "next/navigation";
import { VendorPageContent } from "components/event-planner/vendor/vendorView/page-content";
import { ReviewsProvider } from "components/event-planner/vendor/vendorView/ReviewsContext";

export default async function VendorPage({
  params,
}: {
  params: { vendorId: string };
}) {
  const vendor = await getVendorById(params.vendorId);
  if (!vendor) return notFound();

  // Clean the vendor data (filter empty images)
  const validatedVendor = {
    ...vendor,
    images: vendor.images.filter((img) => img),
  };

 return (
   <ReviewsProvider>
     <VendorPageContent vendor={validatedVendor} />
   </ReviewsProvider>
 );}
