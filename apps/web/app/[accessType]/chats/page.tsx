
import { ChatLight } from "@sambha/ui/icons";
import React from "react";
import ChatSidebar from "../../../components/chats/ChatSidebar";

function HomePage() {
  return (
    <>
      <div className="md:hidden">
        <ChatSidebar />
      </div>
      <div className="text-sm flex-col flex justify-center items-center h-full max-md:hidden">
        <span className="bg-grey-200 rounded-2xl p-3 flex items-center justify-center">
          <ChatLight />
        </span>
        <p className="text-grey-base">Select a conversation to view details</p>
      </div>
    </>
  );
}

export default HomePage;

