"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb } from "components/event-sittings/Breadcrumb";
import { TabNavigation } from "components/event-sittings/TabNavigation";
import { TableEditor } from "components/event-sittings/TableEditor";
import { TableVisualization } from "components/event-sittings/TableVisualization";
import AddText from "components/event-sittings/AddText";
import GuestSelector from "components/event-sittings/GuestSelector";
import TableItems from "components/event-sittings/TableItems";

// Define types
type TableShape = {
  id: number;
  className: string;
  name: string;
};

type Guest = {
  name: string;
};

// Fake fetched data
const events = [
  {
    id: "abc123",
    slug: "oliver-and-emilys-wedding",
    name: "Oliver & Emily's Wedding",
  },
];

export default function CreateSittingChartPage() {
  const [activeTab, setActiveTab] = useState("Items");
  const { eventSlug } = useParams();
  const decodedSlug = decodeURIComponent(eventSlug as string);
  const currentEvent = events.find((event) => event.slug === decodedSlug);

  const [selectedTable, setSelectedTable] = useState<TableShape | null>(null);
  const [seatCount, setSeatCount] = useState<number>(1);
  const [assignedSeats, setAssignedSeats] = useState<(Guest | null)[]>([null]);

  const incrementSeat = () => {
    setSeatCount((prev) => {
      setAssignedSeats((prevSeats) => [...prevSeats, null]);
      return prev + 1;
    });
  };

  const decrementSeat = () => {
    setSeatCount((prev) => {
      if (prev <= 1) return prev;
      setAssignedSeats((prevSeats) => prevSeats.slice(0, -1));
      return prev - 1;
    });
  };

  const addGuest = (index: number) => {
    const name = prompt("Enter guest name");
    if (!name) return;
    const updated = [...assignedSeats];
    updated[index] = { name };
    setAssignedSeats(updated);
  };

  const removeGuest = (index: number) => {
    const updated = [...assignedSeats];
    updated[index] = null;
    setAssignedSeats(updated);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Items":
        return selectedTable ? (
          <TableEditor
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            seatCount={seatCount}
            assignedSeats={assignedSeats}
            incrementSeat={incrementSeat}
            decrementSeat={decrementSeat}
            addGuest={addGuest}
            removeGuest={removeGuest}
          />
        ) : (
          <TableItems onSelectTable={setSelectedTable} />
        );
      case "Text":
        return <AddText />;
      case "Guests":
        return <GuestSelector />;
      default:
        return null;
    }
  };

  return (
    <div className="py-6 space-y-4">
      <Breadcrumb eventSlug={eventSlug as string} currentEvent={currentEvent} />

      <div>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* to display render  */}
      <div
        className={`flex w-full h-[743px] ${
          selectedTable
            ? "flex-col-reverse md:flex-row-reverse"
            : "flex-col md:flex-row"
        }`}
      >
        <div
          className={`md:max-w-[30%] w-full md:pr-8 px-4 md:px-0 ${
            selectedTable ? "md:pl-4 border-l" : "border-r"
          }`}
        >
          {renderContent()}
        </div>

        <TableVisualization
          selectedTable={selectedTable || undefined} // Convert null to undefined
          seatCount={seatCount}
          assignedSeats={assignedSeats}
        />
      </div>
    </div>
  );
}
