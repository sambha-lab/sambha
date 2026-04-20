export type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  address: string;
  imageUrl: string;
  status: "upcoming" | "past";
  time: string;
  about: string;
  host: { name: string; email: string }[];
  isInvited: boolean;
  going: "yes" | "maybe" | "no";
};

export const dummyEvents: Event[] = [
  {
    id: 1,
    name: "Racoon Musicals",
    date: "2023-10-15",
    location: "New York",
    address: "123 Broadway Avenue, NY 10001",
    imageUrl: "/images/event1.jpg",
    status: "upcoming",
    time: "12:00 PM",
    about:
      "Step into a magical evening of music, dance, and storytelling with Racoon Musicals! Experience an unforgettable performance featuring live orchestra, stunning vocals, and breathtaking choreography.",
    host: [
      { name: "Daniel Jesugoroye", email: "danieljesugoroye@email.com" },
      { name: "Groom’s Name", email: "groom’sname@email.com" },
    ],
    isInvited: false,
    going: "yes",
  },
  {
    id: 2,
    name: "Tech Innovators Conference",
    date: "2023-11-20",
    location: "San Francisco",
    address: "456 Market Street, SF 94105",
    imageUrl: "/images/event2.jpg",
    status: "upcoming",
    time: "09:00 AM",
    about:
      "Join industry leaders and tech enthusiasts at the annual Tech Innovators Conference.",
    host: [{ name: "Jane Doe", email: "jane.doe@email.com" }],
    isInvited: true,
    going: "no",
  },
  {
    id: 3,
    name: "Art & Wine Festival",
    date: "2025-08-27",
    location: "Los Angeles",
    address: "789 Sunset Blvd, LA 90028",
    imageUrl: "/images/event3.jpg",
    status: "upcoming",
    time: "03:00 PM",
    about:
      "Enjoy a relaxing afternoon with local artists and wineries. Explore art exhibits, taste exquisite wines, and enjoy live music performances.",
    host: [{ name: "Emily Smith", email: "emily.smith@email.com" }],
    isInvited: false,
    going: "maybe",
  },
  {
    id: 4,
    name: "Startup Pitch Night",
    date: "2023-09-10",
    location: "Austin",
    address: "321 Congress Ave, Austin 78701",
    imageUrl: "/images/event4.jpg",
    status: "past",
    time: "06:30 PM",
    about:
      "Watch aspiring entrepreneurs pitch their ideas to a panel of investors. Network with founders, investors, and tech enthusiasts.",
    host: [{ name: "Michael Lee", email: "michael.lee@email.com" }],
    isInvited: true,
    going: "yes",
  },
];
