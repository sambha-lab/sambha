import React from "react";
import { Profile } from "../../../components/profile/Profile";
import { VendorProfile } from "components/profile/VendorProfile";

export default function ProfilePage() {
  const role: string = "vendor";
  let profileContent;

  if (role === "planner") {
    profileContent = <Profile />;
  } else if (role === "vendor") {
    profileContent = <VendorProfile />;
  } else {
    profileContent = <div>Guest Profile</div>;
  }

  return <div>{profileContent}</div>;
}
