"use client";

import React, { ReactElement } from "react";

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
import { Bell } from "lucide-react";
import { ReactNode } from "react";

const guestSidebarItems = [
  { icon: <EventIcon1 />, label: "Events", url: "/guest/events" },
  { icon: <PassIcon />, label: "Pass", url: "/guest/pass" },
  { icon: <Chats />, label: "Chats", url: "/guest/chats" },
];

const eventPlannerSidebarItems = [
  { icon: <EventIcon1 />, label: "Events", url: "/event-planner/events" },
  { icon: <VendorIcon />, label: "Vendors", url: "/event-planner/vendors" },
  { icon: <Chats />, label: "Messages", url: "/event-planner/chats" },
];
const vendorSidebarItems = [
  { icon: <HomeIcon />, label: "Home", url: "/vendor/" },
  { icon: <EventIcon1 />, label: "Bookings", url: "/vendor/bookings" },
  { icon: <Chats />, label: "Chats", url: "/vendor/chats" },
  {
    icon: <EarningIcon />,
    label: "Earnings",
    url: "/vendor/earnings",
  },
];

export type SidebarItem = {
  icon: ReactElement; // More specific than ReactNode
  label: string;
  url: string;
};

export type SidebarProviderProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const role: string = "guest"; // or get from your auth logic

  let sidebarItems: { icon: ReactNode; label: string; url: string }[] = [];
  if (role === "event-planner") {
    sidebarItems = eventPlannerSidebarItems;
  } else if (role === "vendor") {
    sidebarItems = vendorSidebarItems;
  } else {
    sidebarItems = guestSidebarItems;
  }

  return (
    <SidebarProvider>
      <div className="h-screen flex-row py-4 flex w-full">
        <SambhaSidebar sidebarItems={sidebarItems} />
        <main className="flex-1 relative w-full overflow-auto no-scrollbar">
          <div className="absolute -top-1 right-0 w-max flex items-center">
            <SidebarTrigger>{children}</SidebarTrigger>
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
