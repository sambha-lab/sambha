"use client";

import { Button } from "@sambha/ui/button";
import { PlaceHolder } from "@sambha/ui/icons";
import { userData } from "app/[accessType]/chats/data";
import ProfileAboutCalendar from "components/profile/ProfileAboutCalendar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div>
      <div className="mt-4 space-y-4">
        <h1 className="text-[42px] font-bold mb-4 text-primary-dark font-[">
          Profile
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex flex-col md:flex-row items-center gap-2">
            {userData.image ? (
              <Image
                src={userData.image}
                alt={userData.name}
                width={40}
                height={40}
                className="size-32 rounded-full"
              />
            ) : (
              <PlaceHolder />
            )}
            <div className="space-y-2">
              <p className="font-semibold text-xl text-primary-dark">
                {userData.name}
              </p>
              <p className="text-sm">{userData.email}</p>
            </div>
          </div>
          <Button
            className="max-md:w-full border-neutral-violet"
            variant="outline"
            onClick={() => router.push("/guest/guests/profile/settings")}
          >
            <span className=" bg-gradientText bg-clip-text text-transparent font-medium">
              Profile Settings
            </span>
          </Button>
        </div>
        <ProfileAboutCalendar />
      </div>
    </div>
  );
}
