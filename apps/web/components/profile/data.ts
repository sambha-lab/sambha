import { EventDetails } from "types/events/data";

export const paymentHistory = [
  {
    id: 1,
    title: "Payment to book vendor",
    vendor: "Elegant Catering",
    time: "4h",
    amount: "- $1,500",
  },
  {
    id: 2,
    title: "Payment to book vendor",
    vendor: "Elegant Catering",
    time: "8/12/24",
    amount: "- $1,500",
  },
  {
    id: 3,
    title: "Payment to book vendor",
    vendor: "Elegant Catering",
    time: "4h",
    amount: "- $1,500",
  },
  {
    id: 4,
    title: "Payment to book vendor",
    vendor: "Elegant Catering",
    time: "4h",
    amount: "- $1,500",
  },
];
export const eventsList: EventDetails[] = [
  {
    id: "1",
    title: "Oliver & Emily's Wedding",
    description:
      "Celebrate the union of Oliver and Emily at the beautiful Rosewood Estate. Enjoy a romantic ceremony, followed by a gourmet dinner and lively dance.",
    location: "The Grand Hall, Rosewood Estate",
    venue: "Eko Hotel Convention Center",
    todo: 10,
    host: "InnovateX",
    image: "",
    date: "Sun, Jul 20",
    time: "7:00 PM",
    eventType: "past",
    guest: {
      invited: 22,
      going: 17,
      pending: 3,
      notGoing: 2,
    },
    officials: [
      {
        position: "creator",
        name: "Jerry Wilson (You)",
        email: "jerrywilson (you)@gmail.com",
      },
      { position: "manager", name: "Groommail", email: "groommail@gmail.com" },
    ],
  },
  {
    id: "2",
    title: "Tech Innovators Conference 2025",
    description:
      "A two-day tech gathering for innovators and startups to share their latest breakthroughs and ideas.",
    location: "Main Auditorium, Silicon Hub",
    venue: "Landmark Event Center",
    todo: 25,
    host: "TechNet Africa",
    image: "",
    date: "Fri, Sep 5",
    time: "9:00 AM",
    eventType: "past",
    guest: {
      invited: 150,
      going: 120,
      pending: 20,
      notGoing: 10,
    },
    officials: [
      {
        position: "creator",
        name: "Amaka Joseph",
        email: "amaka@technet.africa",
      },
      {
        position: "coordinator",
        name: "Michael Lee",
        email: "mlee@technet.africa",
      },
    ],
  },
  {
    id: "3",
    title: "Lagos Startup Pitch Night",
    description:
      "Top 10 startups pitch to investors and VCs for seed funding and mentorship.",
    location: "Innovation Hall, Yaba",
    venue: "Civic Center",
    todo: 7,
    host: "StartUpCity",
    image: "",
    date: "Thu, Oct 10",
    time: "6:00 PM",
    eventType: "past",
    guest: {
      invited: 80,
      going: 55,
      pending: 15,
      notGoing: 10,
    },
    officials: [
      { position: "host", name: "Chuka Nwosu", email: "chuka@startupcity.io" },
      {
        position: "judge",
        name: "Adaeze Smith",
        email: "adaeze@vcconnect.org",
      },
    ],
  },
  {
    id: "4",
    title: "UX/UI Design Bootcamp",
    description:
      "A hands-on workshop teaching modern UX/UI principles and tools like Figma, Adobe XD, and design systems.",
    location: "Design Studio, Victoria Island",
    venue: "Radisson Blu",
    todo: 5,
    host: "Designers Guild",
    image: "",
    date: "Mon, Nov 11",
    time: "10:00 AM",
    eventType: "past",
    guest: {
      invited: 60,
      going: 40,
      pending: 15,
      notGoing: 5,
    },
    officials: [
      {
        position: "trainer",
        name: "Tomi Adebayo",
        email: "tomi@designguild.com",
      },
    ],
  },
  {
    id: "5",
    title: "Fashion Connect Expo",
    description:
      "Annual fashion showcase connecting designers, models, and buyers from around the continent.",
    location: "Fashion Pavilion, Lekki",
    venue: "Lekki Event Center",
    todo: 15,
    host: "StyleHaus Africa",
    image: "",
    date: "Sat, Dec 14",
    time: "2:00 PM",
    eventType: "past",
    guest: {
      invited: 200,
      going: 170,
      pending: 20,
      notGoing: 10,
    },
    officials: [
      {
        position: "director",
        name: "Kemi Balogun",
        email: "kemi@stylehaus.africa",
      },
    ],
  },
  {
    id: "6",
    title: "Music Fest 2025",
    description:
      "Live performances by top Nigerian and international artists. Food, fun, and festival vibes.",
    location: "Freedom Park, Lagos",
    venue: "Freedom Park",
    todo: 30,
    host: "Soundwave Ent.",
    image: "",
    date: "Sun, Jan 5",
    time: "3:00 PM",
    eventType: "past",
    guest: {
      invited: 500,
      going: 450,
      pending: 30,
      notGoing: 20,
    },
    officials: [
      { position: "organizer", name: "Dayo Sax", email: "dayo@soundwave.com" },
    ],
  },
  {
    id: "7",
    title: "Corporate Retreat 2025",
    description:
      "Team-building activities, seminars, and workshops to re-energize your company culture.",
    location: "Obudu Mountain Resort",
    venue: "Mountain Resort",
    todo: 20,
    host: "PeopleFirst HR",
    image: "",
    date: "Wed, Mar 15",
    time: "8:00 AM",
    eventType: "past",
    guest: {
      invited: 70,
      going: 65,
      pending: 3,
      notGoing: 2,
    },
    officials: [
      {
        position: "facilitator",
        name: "Ngozi Okeke",
        email: "ngozi@peoplefirst.com",
      },
    ],
  },
  {
    id: "8",
    title: "Food & Wine Festival",
    description:
      "Taste dishes and wines from top chefs and sommeliers in Nigeria.",
    location: "Federal Palace Hotel",
    venue: "Garden Pavilion",
    todo: 18,
    host: "Tasty Events",
    image: "",
    date: "Sat, Apr 12",
    time: "1:00 PM",
    eventType: "past",
    guest: {
      invited: 150,
      going: 140,
      pending: 5,
      notGoing: 5,
    },
    officials: [
      {
        position: "organizer",
        name: "Seyi Bello",
        email: "seyi@tastyevents.ng",
      },
    ],
  },
  {
    id: "9",
    title: "Crypto Masterclass",
    description:
      "Understand blockchain, investing, and Web3 with leading crypto educators.",
    location: "Zoom (Online)",
    venue: "Online Event",
    todo: 12,
    host: "CryptoLearn",
    image: "",
    date: "Tue, May 9",
    time: "5:00 PM",
    eventType: "past",
    guest: {
      invited: 100,
      going: 85,
      pending: 10,
      notGoing: 5,
    },
    officials: [
      {
        position: "speaker",
        name: "Chinedu Onu",
        email: "chinedu@cryptolearn.io",
      },
    ],
  },
  {
    id: "10",
    title: "Photography Walk & Workshop",
    description:
      "Join fellow photographers for a guided walk and learn street/documentary photography tips.",
    location: "Lekki Phase 1",
    venue: "Kickoff at The Bridge Café",
    todo: 8,
    host: "NaijaClicks",
    image: "",
    date: "Sat, Jun 3",
    time: "4:30 PM",
    eventType: "past",
    guest: {
      invited: 40,
      going: 32,
      pending: 6,
      notGoing: 2,
    },
    officials: [
      {
        position: "guide",
        name: "Tunde Frames",
        email: "tunde@naijaclicks.com",
      },
    ],
  },
];

export interface HostedType {
  name: string;
  host: string;
  date: string | number;
  todo: number;
  venue: string;
}

export const hostedEvents: HostedType[] = [
  {
    name: "Team Strategy Meeting",
    host: "Alice Johnson",
    date: "2025-08-15T10:00:00Z",
    todo: 4,
    venue: "Conference Room A",
  },
  {
    name: "Product Launch Event",
    host: "David Smith",
    date: "2025-09-01T14:30:00Z",
    todo: 7,
    venue: "Main Hall",
  },
  {
    name: "Weekly Sync-up",
    host: "Sophie Lee",
    date: "2025-07-30T09:00:00Z",
    todo: 2,
    venue: "Zoom",
  },
  {
    name: "Board Meeting",
    host: "Michael Brown",
    date: "2025-10-05T13:00:00Z",
    todo: 5,
    venue: "Executive Suite",
  },
  {
    name: "Design Workshop",
    host: "Nina Patel",
    date: "2025-08-22T11:00:00Z",
    todo: 6,
    venue: "Creative Lab",
  },
];

type VerifiedDocument = "id" | "license";
export interface Location {
  name: string;
  address: string;
}
interface VendorUser {
  name: string;
  email: string;
  venue: string;
  locations: Location[];
  about: string;
  verifiedDate: string;
  verifiedDocuments: VerifiedDocument[];
  category: string;
  openToNegotiation: boolean;
  photo: string;
  images: string[];
}

export const vendorUser: VendorUser = {
  name: "Elegant Halls Services",
  email: "jaydeejevic@gmail.com",
  venue: "Grand Maple Theatre",
  photo: "https://randomuser.me/api/portraits/men/15.jpg",
  locations: [
    {
      name: "Grand Maple Theatre, New York City",
      address: `123 Broadway Avenue
New York, NY 10001
United States`,
    },
    {
      name: "Emerald Gardens, Los Angeles",
      address: `456 Sunset Boulevard
Los Angeles, CA 90028
United States`,
    },
  ],
  about:
    "We specialize in creating unforgettable wedding receptions and corporate events with over 10 years of experience in the industry.",
  verifiedDate: "2025-06-15T10:30:00.000Z",
  verifiedDocuments: ["id", "license"],
  category: "Catering",
  openToNegotiation: true,
  images: [
    "https://images.unsplash.com/photo-1556742517-fde6c2abbe11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1556742517-fde6c2abbe11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1556742517-fde6c2abbe11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1556742517-fde6c2abbe11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1556742517-fde6c2abbe11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1556742517-fde6c2abbe11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
  ],
};
