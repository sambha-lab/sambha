import React from "react";
import { Settings } from "../../../components/profile/settings/Settings";
import { VendorSettings } from "components/profile/settings/VendorSettings";

export default function SettingsPage() {
  const role: string = "vendor";
  let SettingsData;

  if (role === "planner") {
    SettingsData = <Settings />;
  } else if (role === "vendor") {
    SettingsData = <VendorSettings />;
  } else {
    SettingsData = <div>Guest Profile</div>;
  }
  return <div>{SettingsData}</div>;
}
