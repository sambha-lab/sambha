"use client";
import React from "react";
import Image from "next/image";
import {
  AddIcon,
  EditPencil,
  PlaceHolder,
  VerifiedIdIcon,
  VerifiedLicenseIcon,
} from "@sambha/ui/icons";
import { Button } from "@sambha/ui/button";
import { useRouter } from "next/navigation";
import {
  EditableAddField,
  EditableField,
  EditableImageField,
} from "./VendorEditableFields";
import { vendorUser } from "./data";
import { formatFlexibleDate } from "utils/formatMessageDate";

export const VendorProfile = () => {
  const router = useRouter();
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4 text-primary-dark">Profile</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex flex-col md:flex-row items-center gap-2">
          {vendorUser.photo ? (
            <Image
              src={vendorUser.photo}
              alt={vendorUser.name}
              width={30}
              height={30}
              className="size-24 rounded-full"
            />
          ) : (
            <PlaceHolder />
          )}
          <div className="space-y-2">
            <p className="font-semibold text-xl text-primary-dark">
              {vendorUser.name}
            </p>
            <p className="text-sm">{vendorUser.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="relative bg-transparent border-0 p-[1px] focus-visible:ring-primary-dark group rounded-full overflow-hidden"
            onClick={() => router.push("/profile/settings")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2A1D52] via-[#8B5CF6] to-[#C96FFF] rounded-full group-hover:from-[#1E1537] group-hover:to-[#E879FF] transition-colors duration-300" />
            <div className="relative flex items-center justify-center px-4 h-full bg-white-base rounded-full group-hover:bg-gray-50 transition-colors duration-300">
              <span className="text-primary-violet font-medium">
                Add new service
              </span>
            </div>
          </Button>

          <Button
            className="max-md:w-full"
            onClick={() => router.push("/vendor/settings")}
          >
            Profile Settings
          </Button>
        </div>
      </div>
      {/* form field */}
      <div className="flex gap-4 md:gap-12 flex-col md:flex-row mt-6">
        <section className="flex-1 space-y-6">
          <EditableField
            label="About"
            value={vendorUser.about}
            icon={<EditPencil />}
            multiline={true}
          />
          <EditableAddField
            label="Locations"
            values={vendorUser.locations}
            icon={<AddIcon />}
          />
          {/* verified */}
          <div className="flex flex-col gap-3">
            <p>
              Verified since
              {formatFlexibleDate(vendorUser.verifiedDate, {
                formatStyle: "full",
              })}
            </p>
            <div className="flex flex-col space-y-5">
              {vendorUser.verifiedDocuments.length > 0 ? (
                vendorUser.verifiedDocuments.map((doc, idx) => {
                  const Icon =
                    doc === "id" ? <VerifiedIdIcon /> : <VerifiedLicenseIcon />;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center font-bold gap-2"
                    >
                      {Icon}
                      {doc === "id" ? "ID Verified" : "License Verified"}
                    </span>
                  );
                })
              ) : (
                <span className="text-sm text-gray-500">
                  (Not yet verified)
                </span>
              )}
            </div>
          </div>
        </section>
        <section className="flex-1 space-y-6">
          <EditableField
            label="Category"
            value={vendorUser.category}
            icon={<EditPencil />}
            style="font-bold text-lg text-primary-darkPurple"
          />
          <EditableField
            label="Open to negotiation"
            value={vendorUser.openToNegotiation ? "Yes" : "No"}
            icon={<EditPencil />}
            style="font-bold text-lg text-primary-darkPurple"
          />

          <EditableImageField
            label="Photos"
            values={vendorUser.images}
            icon={<EditPencil />}
          />
        </section>
      </div>
    </div>
  );
};
