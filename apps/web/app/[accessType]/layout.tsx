import React from "react";

import WrapperLayout from "components/dashboard/wrapper";
import ProtectedRoute from "../../utils/ProtectedRoutes";
interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ accessType: string }>;
}
const validTypes = ["planner", "vendor", "guest"];
export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { accessType } = await params;

  if (!validTypes.includes(accessType)) {
    //  notFound();
  }

  return (
    <ProtectedRoute role={accessType}>
      <WrapperLayout>{children}</WrapperLayout>
    </ProtectedRoute>
  );
}
