"use client";
import ElementIcon from "components/icons/ElementIcon";
import TextIcon from "components/icons/TestIcon";
import UserIcon from "components/icons/UserIcon";
import React from "react";
import { TabValue } from "types"; // or define locally

interface TabNavigationProps {
  activeTab: TabValue;
  setActiveTab: (tab: TabValue) => void;
}

const tabConfigs = [
  { value: "Items", Icon: ElementIcon },
  { value: "Text", Icon: TextIcon },
  { value: "Guests", Icon: UserIcon },
] as const;

export const TabNavigation = ({
  activeTab,
  setActiveTab,
}: TabNavigationProps) => (
  <div className="flex w-[254px] border-b items-center justify-between">
    {tabConfigs.map(({ value, Icon }) => (
      <div
        key={value}
        onClick={() => setActiveTab(value)}
        className={`flex flex-col items-center py-2 ${
          activeTab === value
            ? "bg-primary-100 text-primary-600 border-b-2 px-4 border-primary-darkPurple"
            : "text-gray-600 px-4"
        }`}
      >
        <Icon isActive={activeTab === value} />
        <span className="text-xs cursor-pointer">{value}</span>
      </div>
    ))}
  </div>
);
