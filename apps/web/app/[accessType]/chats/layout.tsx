"use client";

import React from "react";
import ChatSidebar from "../../../components/chats/ChatSidebar";
import { usePathname } from "next/navigation";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if a specific chat route is selected (e.g., /chats/[id])
  const isChatOpen = pathname !== "/chats"; // adjust if your route is different

  return (
    <div className="h-[calc(100vh-5.5rem)]">
      {/* Desktop Layout */}
      <div className="max-md:hidden h-full">
        <div className="flex h-full">
          <aside className="w-[320px] border-r p-2">
            <ChatSidebar />
          </aside>
          <main className="flex-1 overflow-y-auto thin-scrollbar px-4">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden h-full">
        {isChatOpen ? (
          // Show chat view
          <div className="h-full overflow-y-auto">{children}</div>
        ) : (
          // Show sidebar
          <div className="h-full">
            <ChatSidebar />
          </div>
        )}
      </div>
    </div>
  );
}
