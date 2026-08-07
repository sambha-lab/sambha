"use client";

import { useAtom } from "jotai";
import React from "react";
import { modalAtom } from "../store/modalAtom";
import { Modal } from "./Modal";
import { ChatProfile } from "./chats/ChatProfile";
import { CreateGroup } from "./chats/CreateGroup";
import { GroupLists } from "./chats/GroupLists";
import { PaymentCard } from "./profile/settings/PaymentCard";
import { WithdrawalCard } from "./profile/settings/WithdrawalCard";

export const DisplayModal = () => {
  const [modal] = useAtom(modalAtom);
  const { type } = modal;
  return (
    <div>
      {type === "chat profile" ? (
        <Modal>
          <ChatProfile />
        </Modal>
      ) : type === "new group" ? (
        <Modal title="Create Group">
          <CreateGroup />
        </Modal>
      ) : type === "view group" ? (
        <Modal title="Groups">
          <GroupLists />
        </Modal>
      ) : type === "payment card" ? (
        <Modal title="Add Card">
          <PaymentCard />
        </Modal>
      ) : type === "withdrawal method" ? (
        <Modal title="Add Withdrawal Method">
          <WithdrawalCard />
        </Modal>
      ) : null}
    </div>
  );
};
