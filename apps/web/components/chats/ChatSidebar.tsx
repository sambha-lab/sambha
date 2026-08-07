"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Tabs, { TabItem } from "@sambha/ui/Tabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RxCheck } from "react-icons/rx";
import clsx from "clsx";
import { useAtom } from "jotai";
import { messagesAtom, usersAtom } from "../../store/chatAtoms";
import { formatFlexibleDate } from "../../utils/formatMessageDate";
import { ChatMenuDropdown } from "./ChatMenuDropdown";
import { useEffect } from "react";
import { allMessages, users } from "app/[accessType]/chats/data";

const tabs: TabItem[] = [
  { key: "All", label: "All" },
  { key: "vendor", label: "Vendors" },
  { key: "event", label: "Event" },
  { key: "host", label: "Host" },
];

export default function ChatSidebar() {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [usersData, setUsersData] = useAtom(usersAtom);

  useEffect(() => {
    setMessages(allMessages);
    setUsersData(users);
  }, [setMessages, setUsersData]);

  const [activeTab, setActiveTab] = useState<string>("All");

  const params = useParams();
  const activeChatUserId = params?.id;

  const groupedMessages = useMemo(() => {
    const latest: Record<string, (typeof messages)[0]> = {};
    const unreadCounts: Record<string, number> = {};

    for (const msg of messages) {
      const userId = msg.fromId === "me" ? msg.toId : msg.fromId;

      if (msg.fromId !== "me" && msg.seen === false) {
        unreadCounts[userId] = (unreadCounts[userId] || 0) + 1;
      }

      const existing = latest[userId];
      if (!existing || new Date(msg.timestamp) > new Date(existing.timestamp)) {
        latest[userId] = msg;
      }
    }

    return Object.entries(latest)
      .map(([userId, message]) => {
        const user = usersData[userId as keyof typeof usersData];
        const unreadCount = unreadCounts[userId] || 0;

        return {
          userId,
          user,
          message,
          unreadCount,
        };
      })
      .filter(({ user }) => {
        if (activeTab === "All") return true;
        return user?.category === activeTab.toLowerCase();
      })
      .sort(
        (a, b) =>
          new Date(b.message.timestamp).getTime() -
          new Date(a.message.timestamp).getTime()
      );
  }, [activeTab, messages, usersData]);

  return (
    <div className="p-4">
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-xl text-primary-darkPurple">Messages</p>
          <ChatMenuDropdown />
        </div>

        <Tabs tabs={tabs} activeKey={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="mt-4 flex flex-col gap-2 overflow-y-auto h-full max-h-[calc(100vh-14rem)] scrollbar-hidden">
        {groupedMessages.map(({ user, message, unreadCount }) => {
          const name = user?.name;
          const image = user?.image;
          const isActive = user?.id === activeChatUserId;

          return (
            <Link key={user?.id} href={`/planner/chats/${user?.id ?? ""}`}>
              <div
                className={clsx(
                  "flex items-start gap-3 p-2 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50",
                  isActive && "bg-grey-light hover:bg-grey-light"
                )}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={image ?? ""}
                    alt={name ?? ""}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <p className="font-semibold text-sm text-neutral-base truncate">
                        {name}
                      </p>
                      {user?.verified && (
                        <span className="ml-1 inline-flex items-center justify-center text-white rounded-full text-xs font-medium bg-primary-violet">
                          <RxCheck />
                        </span>
                      )}
                    </div>

                    <span className="text-[8px] text-gray-400 whitespace-nowrap">
                      {formatFlexibleDate(message.timestamp)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p
                      className={clsx(
                        "text-xs truncate mt-1",
                        unreadCount > 0
                          ? "text-black font-medium"
                          : "text-grey-base"
                      )}
                    >
                      {message.message}
                    </p>

                    {unreadCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center size-1 p-[6px] text-gray-light rounded-full text-xs font-medium bg-primary-violet">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
