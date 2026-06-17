"use client";

import React, { useState } from "react";
import { SettingTab, TabItem } from "./SettingTab";
import { AccountSettings } from "./AccountSettings";
import { Payment } from "./Payment";

const tabs: TabItem[] = [
  {
    label: "Account & Preferences",
    value: "Account & Preferences",
  },
  {
    label: "Payment",
    value: "Payment",
  },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("Account & Preferences");

  return (
    <div className="mt-4">
      <h1 className="text-primary-dark text-2xl font-bold">Settings</h1>
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
            name="Bethany Stephens"
            bio="This is a long bio about Bethany Stephens. Let us help you plan your events."
            email="jaydeejevic@gmail.com"
            nameLabel="Company name"
            bioLabel="Description"
          />
        )}
        {activeTab === "Payment" && <Payment />}
      </div>
    </div>
  );
};
