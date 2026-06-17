"use client";

import { AccountSettings } from "components/profile/settings/AccountSettings";
import { SettingTab, TabItem } from "components/profile/settings/SettingTab";
import React, { useState } from "react";

const tabs: TabItem[] = [
  {
    label: "Account & Preferences",
    value: "Account & Preferences",
  },
];

export default function Settingspage() {
  const [activeTab, setActiveTab] = useState<string>("Account & Preferences");

  return (
    <div className="mt-4">
      <h1 className="text-primary-dark text-xl md:text-[42px] font-bold">Settings</h1>
      <div className="mt-6">
        <SettingTab
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />
      </div>
      <div className="">
        {activeTab === "Account & Preferences" && (
          <AccountSettings
            bio="This is a long bio about Bethany Stephens. Let us help you plan your events."
            email="jaydeejevic@gmail.com"
            name="Bethany Stephens"
            showCalendarAccess={true} // only visible on this page
          />
        )}
      </div>
    </div>
  );
}
