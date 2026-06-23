import { FormInput } from "../../../../../../packages/ui/src/form/FormInput";
import { Search, X } from "lucide-react";
import React, { useState } from "react";
import { FullEventsProps } from "types/events/dummyEvents";

interface GuestProp {
  filterEVent: FullEventsProps | undefined;
}

function Guest({ filterEVent }: GuestProp) {
  const [tempEmail, setTempEmail] = useState("");
  const [activeTab, setActiveTab] = useState("invited");
  const [isSearching, setIsSearching] = useState(false);
  const [event, setEvent] = useState(filterEVent);
  const handleAddEmail = () => {
    if (!tempEmail.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emails = tempEmail.split(",").map((email) => email.trim());

    const validEmails: string[] = [];
    const invalidEmails: string[] = [];

    emails.forEach((email) => {
      if (email && emailRegex.test(email)) {
        validEmails.push(email);
      } else if (email) {
        invalidEmails.push(email);
      }
    });

    if (invalidEmails.length > 0) {
      alert(`Invalid email format: ${invalidEmails.join(", ")}`);
      return;
    }

    // Check for existing emails in current guests
    const existingEmails = event?.guests.map((guest) =>
      guest.email.toLowerCase()
    );
    const newValidEmails = validEmails.filter(
      (email) => !existingEmails?.includes(email.toLowerCase())
    );

    if (newValidEmails.length === 0) {
      alert("All emails are already invited!");
      return;
    }

    // Create new guests
    const newGuests = newValidEmails.map((email, index) => {
      return {
        id: Date.now() + index,
        name: "joh doe",
        email,
        status: "pending" as const,
        avatar: "",
        invitedDate: new Date().toISOString().split("T")[0],
      };
    });

    if (event) {
      setEvent({
        ...event,
        guests: [...newGuests, ...event.guests],
      });
    }

    // Create updated event with new guests
    // event?.guests.push(newGuests);
    setTempEmail("");

    // Show success message
    const addedCount = newGuests.length;
    alert(
      `Successfully invited ${addedCount} guest${addedCount > 1 ? "s" : ""}!`
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isSearching) {
        handleAddEmail();
      }
    }
  };

  const tabs = ["Invited", "Going", "Not going"];

  const getLength = (tab: string) => {
    switch (tab.toLowerCase()) {
      case "invited":
        return event?.guests.length; // Fixed: Use event.guests instead of invitedGuest
      case "going":
        return event?.guests.filter((g) => g.status === "going").length;
      case "not going":
        return event?.guests.filter((g) => g.status === "not_going").length; // Fixed: Use consistent status
      default:
        return 0;
    }
  };

  // Fixed: Properly filter guests based on active tab
  const getBaseGuests = () => {
    switch (activeTab.toLowerCase()) {
      case "invited":
        return event?.guests; // All guests
      case "going":
        return event?.guests.filter((g) => g.status === "going");
      case "not going":
        return event?.guests.filter((g) => g.status === "not_going");
      default:
        return event?.guests;
    }
  };

  const baseGuests = getBaseGuests();

  const filteredGuests = isSearching
    ? baseGuests?.filter(
        (guest) =>
          guest.name.toLowerCase().includes(tempEmail.toLowerCase()) ||
          guest.email.toLowerCase().includes(tempEmail.toLowerCase())
      )
    : baseGuests;

  return (
    <div className="space-y-4 grow">
      {/* Input */}
      <div className="space-y-2">
        <div className="w-full flex items-center gap-2">
          <div className="relative w-full">
            <FormInput
              placeholder={
                isSearching
                  ? `Search in ${activeTab.toLowerCase()} guests`
                  : "Enter email or phone number"
              }
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {!isSearching && (
              <button
                type="button"
                onClick={handleAddEmail}
                className="text-gray-base font-medium px-5 py-[13px] max-h-[37px] flex items-center justify-center rounded-full bg-white-800 absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 transition-colors"
              >
                Invite
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setIsSearching((prev) => !prev);
              setTempEmail("");
            }}
            title={isSearching ? "Exit search" : "Search"}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isSearching ? (
              <X className="text-gray-600" />
            ) : (
              <Search className="text-gray-600" />
            )}
          </button>
        </div>
        <p className="text-sm font-normal text-gray-base">
          {isSearching
            ? "Type to search guests by name or email"
            : "Use comma to add multiple emails"}
        </p>
      </div>

      {/* Tabs */}
      <ul
        className="flex gap-3 items-center w-full justify-center"
        role="tablist"
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.toLowerCase() === activeTab.toLowerCase();
          return (
            <li
              key={idx}
              onClick={() => {
                setActiveTab(tab.toLowerCase()); // Fixed: Consistent lowercase
                setTempEmail("");
              }}
              className={`${
                isActive
                  ? "bg-gradient-primary text-white-800"
                  : "bg-white-900 text-gray-600"
              } px-4 py-3 rounded-full grow text-center text-base font-semibold cursor-pointer transition-colors`}
              role="tab"
            >
              <span>
                {tab} ({getLength(tab.toLowerCase())})
              </span>
            </li>
          );
        })}
      </ul>

      {/* Guest List */}
      <div className="pt-5">
        {filteredGuests && filteredGuests.length > 0 ? (
          <ul className="space-y-3">
            {filteredGuests?.map((guest, index) => (
              <li key={guest.id || index}>
                {" "}
                {/* Fixed: Use guest.id if available */}
                <div className="flex gap-2 items-center">
                  <div className="size-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold" />

                  <div>
                    <p className="text-base font-normal text-gray-950">
                      {guest.name}
                    </p>
                    <p className="text-sm font-normal text-gray-600">
                      {guest.email}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-sm text-gray-500">
            {isSearching
              ? "No guests found matching your search."
              : "No guests found."}
          </div>
        )}
      </div>
    </div>
  );
}

export default Guest;
