import { User } from "../../../types/events/data";

export const userData = {
  id: "me",
  name: "Jenny Wilson",
  email: "jenny@gmail.com",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  description:
    "This is a long bio about Egun’s events. Let us help you plan your events.",
  hosts: [
    {
      name: "Tech Summit 2025",
      host: "InnovateX",
      date: "2025-07-20T10:00:00Z",
      todo: 12,
      vanue: "Eko Hotel Convention Center",
    },
    {
      name: "Creative Design Workshop",
      host: "Pixel Studio",
      date: 1721558400000,
      todo: 8,
      vanue: "Lagos Tech Hub",
    },
    {
      name: "AI & Machine Learning Meetup",
      host: "DataMinds",
      date: "2025-08-01T15:30:00Z",
      todo: 5,
      vanue: "Yaba Co-working Space",
    },
    {
      name: "Startup Pitch Night",
      host: "VC Africa",
      date: "2025-07-28T18:00:00Z",
      todo: 3,
      vanue: "Lekki Innovation Centre",
    },
    {
      name: "DevOps Bootcamp",
      host: "CloudMasters",
      date: 1722158400000,
      todo: 10,
      vanue: "Mainland Conference Hall",
    },
  ],
};

export const users: Record<string, User> = {
  // Vendors
  vendor1: {
    id: "vendor1",
    name: "Elegant Halls Services",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    category: "vendor",
    verified: true,
    rate: "$1,500 per day",
    serviceCharge: "$150",
    phoneNumber: "(201) 555-0124",
  },
  vendor2: {
    id: "vendor2",
    name: "Bright Lights Vendor",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    category: "vendor",
    verified: false,
    rate: "$1,000 per day",
    serviceCharge: "$100",
    phoneNumber: "(401) 535-0124",
  },
  vendor3: {
    id: "vendor3",
    name: "DecorMax Rentals",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    category: "vendor",
    verified: false,
    rate: "$2,000 per day",
    serviceCharge: "$200",
    phoneNumber: "(601) 515-0124",
  },

  // Hosts
  host1: {
    id: "host1",
    name: "Brooklyn Simmons",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    category: "host",
    verified: false,
    rate: "$2,500 per day",
    dateCreated: "2025-07-01",
    phoneNumber: "(221) 255-0124",

    members: [
      {
        id: "mem1",
        name: "Alice Green",
        image: "https://randomuser.me/api/portraits/women/20.jpg",
      },
      {
        id: "mem2",
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ],
    membersTotal: 2,
  },
  host2: {
    id: "host2",
    name: "Grace Thompson",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    category: "host",
    verified: true,
    rate: "$1,200 per day",
    dateCreated: "2025-06-15",
    phoneNumber: "(421) 511-0124",

    members: [
      {
        id: "mem3",
        name: "Sophia Miller",
        image: "https://randomuser.me/api/portraits/women/22.jpg",
      },
    ],
    membersTotal: 1,
  },

  // Events
  event1: {
    id: "event1",
    name: "Event Central",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    category: "event",
    verified: false,
    rate: "$1,300 per day",
    eventDate: "2025-08-12",
    eventTodo: 3,
    dateCreated: "2025-06-25",
    phoneNumber: "(201) 555-0124",

    members: [
      {
        id: "mem5",
        name: "Nina Raye",
        image: "https://randomuser.me/api/portraits/women/35.jpg",
      },
      {
        id: "mem6",
        name: "Chris Zane",
        image: "https://randomuser.me/api/portraits/men/35.jpg",
      },
      {
        id: "mem7",
        name: "Ella Brown",
        image: "https://randomuser.me/api/portraits/women/36.jpg",
      },
    ],
    membersTotal: 3,
  },
  event2: {
    id: "event2",
    name: "PartyWorks Events",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    category: "event",
    verified: true,
    rate: "$1,600 per day",
    eventDate: "2025-09-01",
    eventTodo: 2,
    dateCreated: "2025-07-01",
    phoneNumber: "(301) 525-0124",

    members: [
      {
        id: "mem8",
        name: "Leo Bright",
        image: "https://randomuser.me/api/portraits/men/40.jpg",
      },
    ],
    membersTotal: 1,
  },
};

export const allMessages = [
  {
    id: "msg-1",
    fromId: "me",
    toId: "vendor1",
    message: "Welcome to Racoon Musicals Chatspace...",
    timestamp: "2025-07-19T08:30:00Z",
    seen: true,
  },
  {
    id: "msg-2",
    fromId: "vendor1",
    toId: "me",
    message: "Yes, I’ll send the contract by 5 PM.",
    timestamp: "2025-07-19T08:45:00Z",
    seen: true,
  },
  {
    id: "msg-3",
    fromId: "me",
    toId: "vendor1",
    message: "Great, waiting for it.",
    timestamp: "2025-07-19T08:47:00Z",
    seen: true,
  },
  {
    id: "msg-4",
    fromId: "vendor1",
    toId: "me",
    message: "Sent it just now. Let me know if it opens fine.",
    timestamp: "2025-07-19T08:55:00Z",
    seen: false,
  },
  {
    id: "msg-5",
    fromId: "vendor1",
    toId: "me",
    message: "Also, check the package details on page 3.",
    timestamp: "2025-07-19T08:56:00Z",
    seen: false,
  },

  // Vendor2
  {
    id: "msg-6",
    fromId: "me",
    toId: "vendor2",
    message: "Do you handle outdoor lighting?",
    timestamp: "2025-07-19T11:20:00Z",
    seen: true,
  },
  {
    id: "msg-7",
    fromId: "vendor2",
    toId: "me",
    message: "Yes, we do. I can send you our packages.",
    timestamp: "2025-07-19T11:21:10Z",
    seen: false,
  },

  // Host1
  {
    id: "msg-8",
    fromId: "me",
    toId: "host1",
    message: "Hey, did you like the stage design?",
    timestamp: "2025-07-15T14:00:00Z",
    seen: true,
  },
  {
    id: "msg-9",
    fromId: "host1",
    toId: "me",
    message: "Absolutely loved it!",
    timestamp: "2025-07-15T14:05:00Z",
    seen: true,
  },

  // Host2
  {
    id: "msg-10",
    fromId: "me",
    toId: "host2",
    message: "How early can you arrive on Saturday?",
    timestamp: "2025-07-18T17:30:00Z",
    seen: true,
  },
  {
    id: "msg-11",
    fromId: "host2",
    toId: "me",
    message: "I’ll be there by 4 PM.",
    timestamp: "2025-07-18T17:35:00Z",
    seen: false,
  },

  // Vendor3
  {
    id: "msg-12",
    fromId: "vendor3",
    toId: "me",
    message: "Would you like to see our new table set options?",
    timestamp: "2025-07-17T12:15:00Z",
    seen: true,
  },
  {
    id: "msg-13",
    fromId: "me",
    toId: "vendor3",
    message: "Sure, send them over.",
    timestamp: "2025-07-17T12:17:00Z",
    seen: true,
  },

  // Event1
  {
    id: "msg-14",
    fromId: "me",
    toId: "event1",
    message: "Reminder: Setup starts by 2 PM tomorrow.",
    timestamp: "2025-07-01T10:15:00Z",
    seen: true,
  },
  {
    id: "msg-15",
    fromId: "event1",
    toId: "me",
    message: "All set. Team will arrive early.",
    timestamp: "2025-07-01T11:00:00Z",
    seen: true,
  },

  // Event2
  {
    id: "msg-16",
    fromId: "event2",
    toId: "me",
    message: "Can you confirm the address for the decorators?",
    timestamp: "2025-07-16T09:45:00Z",
    seen: true,
  },
  {
    id: "msg-17",
    fromId: "me",
    toId: "event2",
    message: "Yes, it’s 123 Palm Street, venue B.",
    timestamp: "2025-07-16T10:10:00Z",
    seen: true,
  },
];
