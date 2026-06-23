"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Users,
  AlertCircle,
  Check,
  MoreVertical,

} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// Define types for milestones, client, and job
interface Milestone {
  name: string;
  date: string;
  amount: number;
  completed: boolean;
  id: number;
}

interface Client {
  name: string;
  email: string;
  imageUrl?: string;
}

interface Job {
  title: string;
  venue: string;
  host: string;
  hostImage?: string;
  totalPaid: number;
  pending: number;
  milestones: Milestone[];
  eventDates: string;
  guests: number;
  pricePerDay: number;
  totalPrice: number;
  client: Client;
  rating?: number;
}

interface JobDetailPageProps {
  params: Record<string, string | string[]>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const jobDataParam = searchParams.get("data");
    if (jobDataParam) {
      try {
        const decodedJobData = decodeURIComponent(jobDataParam);
        const jobData: Job = JSON.parse(decodedJobData);
        // Add IDs to milestones if they don't exist
        jobData.milestones = jobData.milestones.map((milestone, index) => ({
          ...milestone,
          id: index + 1,
        }));

        // Add sample host image  if not provided
        if (!jobData.hostImage) {
          jobData.hostImage =
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
        }

        if (!jobData.rating) {
          jobData.rating = 4.8;
        }

        setJob(jobData);
      } catch (error) {
        console.error("Error parsing job data:", error);
        router.back();
      }
    }
  }, [searchParams, router]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c96fff] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#f9fafb] sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className=" flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />{" "}
            <span className="hover:text-gray-700 cursor-pointer flex text-sm text-gray-500">
              Bookings
            </span>
          </button>
          <div>
            <nav className="flex text-sm text-gray-500">
              <span className="mr-2">/</span>
              <span className="text-gray-900">{job.title}</span>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Title and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0">
              <img
                className="h-28 w-28 rounded-lg object-cover border-2 border-white shadow-sm"
                src={job.hostImage}
                alt={job.host}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
              <div className="flex items-center mt-1 text-gray-600">
                <span>{job.venue}</span>
              </div>
              <div className="mt-2 flex items-center">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-[#2c8ca8] to-[#7a4ff1] mr-1"></div>
                <span className="text-sm text-gray-600">
                  Hosted by {job.host}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 md:mt-0">
            <button className="border border-primary-violet text-primary-violet  hover:bg-gradient-to-b from-primary-violet to-primary-main hover:text-gray-300 shadow-md px-14 py-2 rounded-full ">
              Message client
            </button>
            <button className="border border-primary-violet text-primary-violet  hover:bg-gradient-to-b from-primary-violet to-primary-main hover:text-gray-300 shadow-md px-14 py-2 rounded-full ">
              Dispute job
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Earnings Card */}
            <div className="flex flex-col sm:flex-row items-start justify-between md:mr-24">
                <div className="flex flex-col items-start justify-center mb-4">
                  <h3 className="font-medium text-gray-950">
                    Total paid{" "}
                    <span>
                      <AlertCircle className="h-4 w-4 text-gray-300 inline" />
                    </span>
                  </h3>

                  <p className="text-lg text-[#c96fff]">
                    ${job.totalPaid.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-start justify-center mb-4">
                  <div>
                    <h3 className="font-medium text-gray-950">
                      Pending earnings{" "}
                      <span>
                        <AlertCircle className="h-4 w-4 text-gray-300 inline" />
                      </span>
                    </h3>
                    <p className="text-lg text-[#c96fff]">
                      ${job.pending.toFixed(2)}
                    </p>
                  </div>
                </div>
            </div>

            {/* Updated Milestones Card */}
            <div className="p-6">
              <div className="flex flex-col justify-between items-start b-6">
                <h3 className="font-semibold text-gray-700 border-b border-gray-300 pb-2 w-full">
                  Milestones
                </h3>
                <div className="space-y-4 pt-6 w-full">
                  {job.milestones.map((milestone) => (
                    <div key={milestone.id} className="">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center h-5 mt-0.5">
                          {milestone.completed ? (
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div className="flex flex-row justify-between w-full">
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4
                                className={`font-medium ${
                                  milestone.completed
                                    ? "text-gray-500 line-through"
                                    : "text-gray-800"
                                }`}
                              >
                                {milestone.name}
                              </h4>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <span className="font-medium text-gray-700">
                                ${milestone.amount}
                              </span>
                              <span className="mx-2">•</span>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                {new Date(milestone.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <button className="text-gray-500 hover:text-gray-700">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Summary Table */}
            <div className=" p-6">
              <h3 className="font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
                Event Summary
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Date */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 font-medium flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Date
                  </div>
                  <div className="font-medium text-gray-900">
                    {job.eventDates}
                  </div>
                </div>

                {/* Guests */}
                <div className="bg-gray-50 p-4 ">
                  <div className="text-sm text-gray-500 font-medium flex items-center mb-2">
                    <Users className="h-4 w-4 mr-1" />
                    Guests
                  </div>
                  <div className="font-medium text-gray-900">
                    {job.guests} guests
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gray-50 p-4 ">
                  <div className="text-sm text-gray-500 font-medium flex items-center mb-2">
                    <span className="mr-1">$</span>
                    Price
                  </div>
                  <div className="font-medium text-gray-900">
                    ${job.pricePerDay} per day
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gray-50 p-4">
                  <div className="text-sm text-gray-500 font-medium flex items-center mb-2">
                    <span className="mr-1">$</span>
                    Total
                  </div>
                  <div className="font-medium text-gray-900">
                    ${job.totalPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
