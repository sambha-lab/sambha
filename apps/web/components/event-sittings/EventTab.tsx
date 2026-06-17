import React from "react";

type EventTabsProps = {
  tabs: string[];
  activeTab?: string;
  onTabChange: (tab: string) => void;
};

export default function EventTabs({
  tabs,
  activeTab,
  onTabChange,
}: EventTabsProps) {
  return (
    <div className="inline-flex border-b border-gray-200 mb-4 space-x-4 h-12">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-2 text-sm font-medium capitalize px-4 ${
            activeTab === tab
              ? "border-b-2 border-primary-darkPurple text-primary-darkPurple"
              : "text-gray-base hover:text-primary-darkPurple"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
