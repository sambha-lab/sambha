"use client";

import React from "react";

import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@sambha/ui/sidebar";

import {
  Chats,
  EarningIcon,
  EventIcon1,
  HomeIcon,
  PassIcon,
  VendorIcon,
} from "@sambha/ui/icons";
import { Input } from "@sambha/ui/input";
import SambhaSidebar from "@sambha/ui/layout/sidebar";
import { getKeyByValue } from "lib/fns";
import { UserType } from "lib/utils";
import { Bell } from "lucide-react";

const guestSidebarItems = [
  { icon: <EventIcon1 />, label: "Events", url: "/events" },
  { icon: <PassIcon />, label: "Pass", url: "/pass" },
  { icon: <Chats />, label: "Chats", url: "/chats" },
];

const eventPlannerSidebarItems = [
  { icon: <EventIcon1 />, label: "Events", url: "/events" },
  { icon: <VendorIcon />, label: "Vendors", url: "/vendors" },
  { icon: <Chats />, label: "Messages", url: "/chats" },
];
const vendorSidebarItems = [
  { icon: <HomeIcon />, label: "Home", url: "/" },
  { icon: <EventIcon1 />, label: "Bookings", url: "/bookings" },
  { icon: <Chats />, label: "Chats", url: "/chats" },
  {
    icon: <EarningIcon />,
    label: "Earnings",
    url: "/earnings",
  },
];

export type UrlSidebarItem = {
  icon: React.ReactNode; // Changed from ReactElement to ReactNode
  label: string;
  url: string;
};

export type SidebarProviderProps = {
  children: React.ReactNode;
};
const session = {
  user: {
    role: "vendor",
  },
};
export default function WrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = session?.user?.role
    ? getKeyByValue(UserType, session.user.role)
    : undefined;

  const currentSidebarItems = role
    ? role === "guest"
      ? guestSidebarItems
      : role === "planner"
        ? eventPlannerSidebarItems
        : role === "vendor"
          ? vendorSidebarItems
          : []
    : [];
  return (
    <SidebarProvider>
      <div className="h-screen flex-row py-4 flex w-full">
        <SambhaSidebar
          role={role as string}
          sidebarItems={currentSidebarItems}
        />
        <main className="flex-1 relative w-full overflow-auto no-scrollbar">
          <div className="absolute -top-1 right-0 w-max flex items-center">
            <SidebarTrigger>
              <div>{children}</div>
            </SidebarTrigger>
          </div>

          <MainContent>{children}</MainContent>
        </main>
      </div>
    </SidebarProvider>
  );
}

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSidebar();
  return (
    <main className={state === "expanded" ? "lg:ml-[20.625rem]" : "ml-0"}>
      <div className="w-full flex justify-between border-b px-4 md:px-8 pb-2">
        <Input
          placeholder="search...."
          className="max-w-64 lg:max-w-xl bg-[#EBECEE]"
        />
        <div className="p-2 rounded-full mr-16 h-fit w-fit bg-[#EBECEE]">
          <Bell />
        </div>
      </div>
      <main className="px-4 md:px-8">{children}</main>
    </main>
  );
};
