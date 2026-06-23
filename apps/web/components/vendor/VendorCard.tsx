import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Vendor } from "types/vendor";

export function VendorCard({ vendor }: { vendor: Vendor}) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        <Image
          src={vendor.images[0] ?? "/default-image.jpg"}
          alt={vendor.name}
          fill
          className="object-cover"
        />
        {vendor.verified && (
          <div className="absolute top-2 left-2 bg-white p-1 rounded-full">
            <CheckCircle className="w-4 h-4 text-[#c96fff]" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{vendor.name}</h3>
          <span className="text-gray-600">{vendor.price}</span>
        </div>
        {vendor.verified ? (
          <div className="flex items-center gap-1 text-xs text-[#c96fff] mb-1">
            <CheckCircle className="w-3 h-3" />
            <span>Verified</span>
          </div>
        ) : (
          <p className="text-xs text-gray-500 mb-1">{vendor.category}</p>
        )}
        <div className="flex items-center">
          <span className="text-yellow-500">★ {vendor.rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1 text-sm">({vendor.reviewCount})</span>
        </div>
      </div>
    </div>
  );
}