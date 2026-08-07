// components/MessageList.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { isTypingAtom, Message, messagesAtom } from "../../store/chatAtoms";
import Image from "next/image";
import { userData, users } from "app/[accessType]/chats/data";
// import {
//   userData,
//   users,
// } from "../../app/(dashboard)/event-planner/chats/data";

interface MessageListProps {
  userId: string;
}

export default function MessageList({ userId }: MessageListProps) {
  const [messages] = useAtom<Message[]>(messagesAtom);
  const [isTypingMap] = useAtom(isTypingAtom);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const filteredMessages = messages
    .filter((msg) => msg.fromId === userId || msg.toId === userId)
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  const isTyping = isTypingMap[userId] || false;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto thin-scrollbar">
      <div className="flex flex-col justify-end min-h-full py-6 space-y-4">
        {filteredMessages.map((msg) => {
          const isMe = msg.fromId === "me";
          const otherImage = users[userId]?.image;
          const avatarSrc = isMe ? userData.image : otherImage;

          return (
            <div
              key={msg.id}
              className={`flex items-center gap-2 px-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <Image
                  src={avatarSrc ?? ""}
                  alt="User"
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
              )}

              <div
                className={`max-w-[50%] w-fit px-4 py-2 rounded-[70px] text-sm ${
                  isMe
                    ? "bg-primary-darkPurple text-white-base"
                    : "bg-grey-100 text-dark-base"
                }`}
              >
                {msg.message}
              </div>

              {isMe && (
                <Image
                  src={avatarSrc ?? ""}
                  alt="Me"
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="px-2 flex justify-start items-end gap-2">
            <div className="bg-grey-100 text-dark-base text-sm px-4 py-2 rounded-[70px] max-w-[50%] w-fit italic">
              Typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
