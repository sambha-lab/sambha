"use client";
import React from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  UserRoundPlus,
  UserRoundX,
} from "lucide-react";

interface TableEditorProps {
  selectedTable: {
    id: string;
    name: string;
    seats: number;
    seatAssignments: Record<number, string>;
  };
  setSelectedTable: (table: null) => void;
  seatCount: number;
  assignedSeats: Record<number, { name: string }>;
  incrementSeat: () => void;
  decrementSeat: () => void;
  addGuest: (index: number) => void;
  removeGuest: (index: number) => void;
}

export const TableEditor = ({
  selectedTable,
  setSelectedTable,
  seatCount,
  assignedSeats,
  incrementSeat,
  decrementSeat,
  addGuest,
  removeGuest,
}: TableEditorProps) => {
  return (
    <div className="h-full w-full">
      <div className="border-b">
        <button
          onClick={() => setSelectedTable(null)}
          className="flex gap-2 py-3 items-center cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-gray-500" />
          <span className="text-darkPurple text-lg font-medium">
            {selectedTable.name}
          </span>
        </button>
      </div>

      <div className="flex justify-between items-center py-4">
        <h1 className="text-base font-medium">Name</h1>
        <span className="text-lg text-purple-base font-normal">
          {selectedTable.name}
        </span>
      </div>

      <div className="border-b text-sm font-normal text-gray-base w-full pb-4">
        <span>Seats</span>
      </div>

      <div className="flex justify-between items-center py-4">
        <span className="text-lg font-normal">Number of seats</span>
        <div className="flex gap-3 items-center">
          <Minus
            className="w-8 h-8 p-2 rounded-full bg-white-90 cursor-pointer"
            onClick={decrementSeat}
          />
          <span>{seatCount}</span>
          <Plus
            className="w-8 h-8 p-2 rounded-full bg-white-90 cursor-pointer"
            onClick={incrementSeat}
          />
        </div>
      </div>

      {Array.from({ length: seatCount }).map((_, index) => {
        const guest = assignedSeats[index + 1] ?? null;
        return (
          <div
            key={index}
            className="flex justify-between items-center text-sm py-2"
          >
            <span className="rounded-full text-center flex items-center justify-center bg-purple-10 text-gradientText font-medium w-8 h-8">
              {index + 1}
            </span>

            {guest ? (
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-white-90 rounded-full capitalize">
                  {guest.name}
                </span>
                <UserRoundX
                  className="w-8 h-8 p-2 rounded-full bg-red-10 text-red-base cursor-pointer"
                  onClick={() => removeGuest(index)}
                />
              </div>
            ) : (
              <UserRoundPlus
                className="w-8 h-8 p-2 rounded-full bg-white-90 text-purple-base cursor-pointer"
                onClick={() => addGuest(index)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
