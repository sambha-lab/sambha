import { atom } from "jotai";
import { Host, User } from "../types/events/data";

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

export const usersAtom = atom<Record<string, User>>({});

export const groupsAtom = atom<Host[]>([]);

export const messagesAtom = atom<Message[]>([]);

export const isTypingAtom = atom<Record<string, boolean>>({});
