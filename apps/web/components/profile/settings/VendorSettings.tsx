"use client";

import React, { useState } from "react";
import { SettingTab, TabItem } from "./SettingTab";
import { VendorAccountSettings } from "./VendorAccountSettings";
import { VendorWithdrawal } from "./VendorWithdrawal";

const tabs: TabItem[] = [
  {
    label: "Account & Preferences",
    value: "Account & Preferences",
  },
  {
    label: "Withdrawal method",
    value: "Withdrawal method",
  },
];

export const VendorSettings = () => {
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
        {activeTab === "Account & Preferences" && <VendorAccountSettings />}
        {activeTab === "Withdrawal method" && <VendorWithdrawal />}
      </div>
    </div>
  );
};
