import { allMessages, users } from "app/[accessType]/chats/data";
import { atom } from "jotai";


export interface Message {
  id: string;
  fromId: string;
  toId: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

export interface User {
  id: string;
  name: string;
  image: string;
  category: string;
  verified: boolean;
  rate?: string;
}

export const usersAtom = atom<Record<string, User>>(users);

export const messagesAtom = atom<Message[]>(allMessages);

export const isTypingAtom = atom<Record<string, boolean>>({});
