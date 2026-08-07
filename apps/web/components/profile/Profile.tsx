"use client";

import React from "react";
import Image from "next/image";
import { PlaceHolder } from "@sambha/ui/icons";
import { Button } from "@sambha/ui/button";
import { useRouter } from "next/navigation";
import { HostedTable } from "./hostedTable/HostedTable";
import { hostedEvents } from "./data";
import { userData } from "app/[accessType]/chats/data";

export const Profile = () => {
  const router = useRouter();
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4 text-primary-dark">Profile</h1>
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
          className="max-md:w-full"
          onClick={() => router.push("/planner/settings")}
        >
          Profile Settings
        </Button>
      </div>
      <HostedTable loading={false} data={hostedEvents} />
    </div>
  );
};
