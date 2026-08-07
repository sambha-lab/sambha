import React, { useRef, useState } from "react";
import Image from "next/image";
import { IoCameraOutline } from "react-icons/io5";
import { Input } from "@sambha/ui/input";
import { PencilEdit } from "@sambha/ui/icons";
import { Switch } from "@sambha/ui/switch";
import { vendorUser } from "../data";

export const VendorAccountSettings = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mt-9 w-full md:max-w-[500px]">
      <form action="" className="">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="">
            <div className="relative w-32 h-32 rounded-full">
              {profileImage ? (
                <Image
                  width={40}
                  height={40}
                  src={URL.createObjectURL(profileImage)}
                  alt="Preview Image"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Image
                  src={vendorUser.photo}
                  alt={vendorUser.name}
                  width={40}
                  height={40}
                  className="w-full rounded-full"
                />
              )}

              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute bottom-1 right-2 bg-gray-700 border-white border-2 rounded-full p-1 shadow"
              >
                <IoCameraOutline className="w-4 h-4 text-white-base" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-4 md:ml-6 w-full">
            <div className="grid grid-cols-1 space-y-1">
              <label htmlFor="name" className="font-medium text-sm">
                Business name
              </label>
              <Input
                type="text"
                defaultValue={vendorUser.name}
                id="name"
                className="min-h-10 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 space-y-1">
              <label htmlFor="description" className="font-medium text-sm">
                Description
              </label>
              <textarea
                id="description"
                defaultValue={vendorUser.about}
                className="resize-none min-h-28 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-1 space-y-1 mt-8">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            type="email"
            defaultValue={vendorUser.email}
            className="rounded-lg min-h-10 text-grey-base"
          />
          <div className="absolute top-1/2 right-4">
            <PencilEdit />
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <p>Allow Notification</p>
          <Switch defaultChecked />
        </div>
      </form>
      <button className="w-full text-center mt-6 text-error-dark">
        Delete Account
      </button>
    </div>
  );
};
