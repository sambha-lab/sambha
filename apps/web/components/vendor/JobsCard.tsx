"use client";

import React, { useState } from "react";
import { Search, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JobsCard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Racoon Musicals",
      totalPaid: 500.0,
      pending: 1000.0,
      description:
        "Hello, I want to rent your space for an event and I have created a couple of milestones that should...",
      date: "May 1-2",
      time: "12:00 PM",
      guests: 50,
      status: "Active",
      host: "Sonia Paul",
      milestones: [
        {
          name: "Milestone 1",
          amount: 500,
          date: "Sat, Mar 19",
          completed: true,
        },
        {
          name: "Milestone 2",
          amount: 500,
          date: "Sat, Mar 19",
          completed: true,
        },
        {
          name: "Deliver 5,000 chairs to event hall",
          amount: 500,
          date: "sep 1 - 2, 2025",
          completed: false,
        },
      ],
      eventDates: "sep 1 - 2, 2025",
      pricePerDay: 1500,
      totalPrice: 3000,
      client: {
        name: "Jenny Wilson",
        email: "jenny@example.com",
      },
      venue: "Grand Maple Theatre",
    },
    {
      id: 2,
      title: "Harmony Wellness Retreat",
      totalPaid: 200.0,
      pending: 170.0,
      description:
        "Hello, I want to rent your space for an event and I have created a couple of milestones that should...",
      date: "May 1-2",
      time: "12:00 PM",
      guests: 50,
      status: "Active",
      host: "Sarah Johnson",
      milestones: [
        {
          name: "Venue Deposit",
          amount: 200,
          date: "Sat, Apr 10",
          completed: true,
        },
        {
          name: "Final Payment",
          amount: 170,
          date: "Sat, Apr 24",
          completed: false,
        },
      ],
      eventDates: "May 1 - 2, 2025",
      pricePerDay: 185,
      totalPrice: 370,
      client: {
        name: "Michael Brown",
        email: "michael@example.com",
      },
      venue: "Serenity Spa Resort",
    },
    {
      id: 3,
      title: "Completed Event Example",
      totalPaid: 1000.0,
      pending: 0.0,
      description: "This is an example of a completed event.",
      date: "Apr 25-26",
      time: "3:00 PM",
      guests: 30,
      status: "Completed",
      host: "David Wilson",
      milestones: [
        {
          name: "Initial Payment",
          amount: 500,
          date: "Sat, Mar 5",
          completed: true,
        },
        {
          name: "Final Payment",
          amount: 500,
          date: "Sat, Apr 20",
          completed: true,
        },
      ],
      eventDates: "Apr 25 - 26, 2025",
      pricePerDay: 500,
      totalPrice: 1000,
      client: {
        name: "Emily Davis",
        email: "emily@example.com",
      },
      venue: "City Convention Center",
    },
  ];

  // Filter jobs by active tab and search query
  const filteredJobs = jobs.filter((job) => {
    const statusMatch = job.status === activeTab;
    const searchMatch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.guests.toString().includes(searchQuery);

    return statusMatch && (searchQuery === "" || searchMatch);
  });

  // Function to handle job title click
interface Milestone {
    name: string;
    amount: number;
    date: string;
    completed: boolean;
}

interface Client {
    name: string;
    email: string;
}

interface Job {
    id: number;
    title: string;
    totalPaid: number;
    pending: number;
    description: string;
    date: string;
    time: string;
    guests: number;
    status: string;
    host: string;
    milestones: Milestone[];
    eventDates: string;
    pricePerDay: number;
    totalPrice: number;
    client: Client;
    venue: string;
}

const handleJobClick = (job: Job) => {
    // Encode the job data to pass as URL parameter
    const encodedJobData = encodeURIComponent(JSON.stringify(job));
    router.push(`/vendor/job/${job.id}?data=${encodedJobData}`);
};

  return (
    <div className="overflow-hidden w-full">
      {/* Title and Search Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Jobs</h2>

        <div className="flex items-center w-full sm:w-auto">
          {showSearch ? (
            <div className="flex items-center w-full sm:w-64">
              <div className="relative flex-grow">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#c96fff] focus:border-transparent"
                  placeholder="Search jobs..."
                  autoFocus
                />
              </div>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-auto sm:ml-0"
            >
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-medium text-sm hover:text-gray-600 ${activeTab === "Active" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400"}`}
          onClick={() => setActiveTab("Active")}
        >
          Active
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm hover:text-gray-600 ${activeTab === "Completed" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400"}`}
          onClick={() => setActiveTab("Completed")}
        >
          Completed
        </button>
      </div>

      <div className="mt-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="mb-6 last:mb-0 border-b border-gray-200 pb-6"
            >
              <div
                className="hover:shadow-md transition-shadow cursor-pointer p-4 rounded-lg bg-white"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex justify-between items-start ">
                  <h4 className="text-gray-950 font-medium text-lg hover:text-[#c96fff] transition-colors">
                    {job.title}
                    <span className="text-gray-400"> &gt;</span>
                  </h4>
                </div>

                <div className="flex justify-between items-center my-3 text-[#c96fff]">
                  <p className="text-sm">
                    Total paid:{" "}
                    <span className="font-semibold">
                      ${job.totalPaid.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-sm">
                    Pending:{" "}
                    <span className="font-semibold">
                      ${job.pending.toFixed(2)}
                    </span>
                  </p>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {job.description}
                  <span className="text-[#c96fff] font-medium cursor-pointer">
                    {" "}
                    more
                  </span>
                </p>

                <div className="flex items-center text-xs text-gray-500">
                  <span>{job.date}</span>
                  <span className="mx-2">•</span>
                  <span>{job.time}</span>
                  <span className="mx-2">•</span>
                  <span>{job.guests} guests</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 font-medium">
              {searchQuery ? "No matching jobs found" : "No jobs found"}
            </p>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              {searchQuery
                ? "Try a different search term"
                : `Looks like there are no ${activeTab.toLowerCase()} jobs at the moment. Once tasks are started, they'll appear here.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
