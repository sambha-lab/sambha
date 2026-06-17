import React from "react";

import { users } from "../data";
import MessageList from "../../../../components/chats/MessageList";
import { TextInput } from "../../../../components/chats/TextInput";

import { ChatHeader } from "../../../../components/chats/ChatHeader";

interface MessageDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function MessageDetails({ params }: MessageDetailsProps) {
  const { id } = await params;
  const user = users[id];

  return (
    <div className="p-2 md:px-8 md:py-6 flex flex-col h-full">
      {user && <ChatHeader user={user} />}
      <MessageList userId={id} />

      <div className="pt-4">
        <TextInput userId={id} />
      </div>
    </div>
  );
}
