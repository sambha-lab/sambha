"use client";
import React, { useState } from "react";
import { Search, CheckCircle, AlertCircle, XCircle } from "lucide-react";

export default function EarningsPage() {
  const [hasWithdrawalMethod, setHasWithdrawalMethod] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const withdrawalHistory = [
    {
      id: 1,
      title: "Withdrawal to Paypal",
      amount: 100.34,
      date: "6 Jul, 2023",
      time: "10:20am",
      details: "Paypal ...2342",
      email: "thekdfisher@email.com",
    },
    {
      id: 2,
      title: "Bank Transfer",
      amount: 250.0,
      date: "5 Jul, 2023",
      time: "1:00 PM",
      details: "Chase ...5678",
    },
    {
      id: 3,
      title: "Wire Transfer",
      amount: 500.0,
      date: "3 Jul, 2023",
      time: "1:00 PM",
      details: "Bank of America ...9012",
    },
    {
      id: 4,
      title: "Direct Deposit",
      amount: 350.75,
      date: "1 Jul, 2023",
      time: "9:15 AM",
      details: "Wells Fargo ...3456",
    },
  ];

  // Filter data based on search query
  const filteredHistory = searchQuery
    ? withdrawalHistory.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.amount.toString().includes(searchQuery) ||
          item.details.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [withdrawalHistory[0]];
     // Show only first item by default
  return (
 <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
        </div>

        {!hasWithdrawalMethod && (
          <div className="bg-[#f7ebff] rounded-xl px-6 py-2 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-start">
              <div className="rounded-lg mr-1">
                <CheckCircle className="h-4 text-[#9f64f2] " />
              </div>

              <div>
                <h3 className="text-xs ">
                  You haven&apos;t set up any withdrawal methods yet. Add a
                  withdrawal method to your account
                </h3>
              </div>
            </div>
            <button
              onClick={() => setHasWithdrawalMethod(true)}
              className="text-[#c96fff]  text-xs font-medium underline"
            >
              Add a withdrawal Method
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-16 gap-8 mb-6">
          <div>
            <div className="flex flex-col items-center justify-center mb-4">
              <h3 className="font-medium text-gray-950">
                Available balance{" "}
                <span>
                  <AlertCircle className="h-4 w-4 text-gray-300 inline" />
                </span>
              </h3>
 <p className="text-2xl font-semibold text-[#c96fff]">$700.00</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col items-center justify-center mb-4">
              <div>
                <h3 className="font-medium text-gray-950">
                  Pending balance{" "}
                  <span>
                    <AlertCircle className="h-4 w-4 text-gray-300 inline" />
                  </span>
                </h3>
                <p className="text-2xl font-semibold text-[#c96fff]">
                  $1,170.00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <button className="text-[#c96fff] px-12 sm:px-24 py-3 rounded-full font-medium border-ring-2 border border-[#c96fff] hover:bg-gradient-to-b from-primary-violet to-primary-main hover:text-zinc-50  hover:border-purple-500 transition-colors">
            Withdraw
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Withdrawal History
              </h2>
              <div className="flex items-center w-full sm:w-auto">
                {showSearch ? (
                  <div className="flex items-center w-full">
                    <div className="relative flex-grow">
                      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#c96fff] focus:border-transparent"
                        placeholder="Search transactions..."
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
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredHistory.map((item) =>
                  item ? (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          ${item.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm text-gray-900">{item.date}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm text-gray-900">{item.time}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {item.details}
                        </div>
                        {item.email && (
                          <div className="text-xs text-gray-500">
                            {item.email}
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>

            {filteredHistory.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">No transactions found</div>
                <div className="text-sm text-gray-500">
                  Try a different search term
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          {!searchQuery && (
            <p>Showing most recent transaction. Use search to find more.</p>
          )}
        </div>
      </div>
    </div>
  );
}