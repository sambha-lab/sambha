"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { FormInput } from "@sambha/ui/form/FormInput";
import { Select } from "@sambha/ui/form/select";
import { FormToggle } from "@sambha/ui/form/FormToggle";
import { Button } from "@sambha/ui/button";
import { LocationSearch } from "@sambha/ui/form/LocationSearch";
import {
  StepperAtom,
  eventFormAtom,
  handleNextStepAtom,
  handlePreviousStepAtom,
  updateEventFormAtom,
} from "../../../../../../../packages/store/eventsAtom";

import {
  AddBackgroundIcon,
  ChevronDown,
  ChevronLeft,
} from "../../../../../public/svg";
import Image from "next/image";
import MapImage from "../../../../../public/map.png";
import EventBudget from "./EventBudget";
import { TaskList } from "./TaskList";
import { InviteGuest } from "./InviteGuest";
import FormError from "@sambha/ui/form/FormError";

const eventTypes = [
  { label: "Conference", value: "conference" },
  { label: "Workshop", value: "workshop" },
  { label: "Webinar", value: "webinar" },
  { label: "Meetup", value: "meetup" },
  { label: "Wedding", value: "wedding" },
  { label: "Birthday Party", value: "birthday" },
  { label: "Corporate Event", value: "corporate" },
];

const steps = [
  { title: "Step 1", subtitle: "Enter event details" },
  { title: "Step 2", subtitle: "Set your budget" },
  { title: "Step 3", subtitle: "Edit task list" },
  { title: "Step 4", subtitle: "Invite guests" },
];

interface ValidationErrors {
  eventName?: string;
  eventType?: string;
  location?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  description?: string;
  budget?: string;
  expectedGuests?: string;
  inviteEmails?: string;
}

type CreateEventProps = {
  setIsCreated: Dispatch<SetStateAction<boolean>>;
  setIsModal: Dispatch<SetStateAction<boolean>>;
};

const CreateEvent: React.FC<CreateEventProps> = ({
  setIsCreated,
  setIsModal,
}) => {
  // Form state
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [isOneOffEvent, setIsOneOffEvent] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("ngn");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [selectedAsset, setSelectedAsset] = useState("btc");
  const [budget, setBudget] = useState("");
  const [expectedGuests, setExpectedGuests] = useState("");
  const [isFixedBudget, setIsFixedBudget] = useState(false);
  const [coveredAsset, setCoveredAsset] = useState("");
  const [location, setLocation] = useState("");
  const [inviteEmails, setInviteEmails] = useState("");

  // New date/time fields
  const [startDate, setStartDate] = useState<string | undefined>("");
  const [startTime, setStartTime] = useState("12:00");
  const [endDate, setEndDate] = useState<string | undefined>("");
  const [endTime, setEndTime] = useState("18:00");
  const [description, setDescription] = useState("");

  // Loading and submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Atoms
  const [stepper] = useAtom(StepperAtom);
  const [eventForm] = useAtom(eventFormAtom);
  const updateEventForm = useSetAtom(updateEventFormAtom);
  const nextStep = useSetAtom(handleNextStepAtom);
  const previousStep = useSetAtom(handlePreviousStepAtom);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (!startDate) {
      setStartDate(tomorrow.toISOString().split("T")[0]);
    }
    if (!endDate) {
      setEndDate(tomorrow.toISOString().split("T")[0]);
    }
  }, []);

  // Load saved form data on component mount
  useEffect(() => {
    const stored = localStorage.getItem("event-form");
    if (stored) {
      const parsed = JSON.parse(stored);
      setEventName(parsed.title || "");
      setEventType(parsed.eventType || "");
      setIsOneOffEvent(parsed.isOneOffEvent ?? true);
      setLocation(parsed.location || "");
      setBudget(parsed.budget || "");
      setExpectedGuests(
        parsed.expectedGuests ? String(parsed.expectedGuests) : ""
      );
      setStartDate(parsed.startDate || "");
      setStartTime(parsed.startTime || "12:00");
      setEndDate(parsed.endDate || "");
      setEndTime(parsed.endTime || "18:00");
      setDescription(parsed.description || "");
    }
  }, []);

  // Validation functions
  const validateStep1 = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Event name validation
    if (!eventName.trim()) {
      newErrors.eventName = "Event name is required";
    } else if (eventName.length < 3) {
      newErrors.eventName = "Event name must be at least 3 characters";
    } else if (eventName.length > 50) {
      newErrors.eventName = "Event name must be less than 50 characters";
    }

    // Event type validation
    if (!eventType) {
      newErrors.eventType = "Please select an event type";
    }

    // Location validation
    if (!location.trim()) {
      newErrors.location = "Event location is required";
    }

    // Start date validation
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    } else {
      const selectedDate = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
    }

    // Start time validation
    if (!startTime) {
      newErrors.startTime = "Start time is required";
    }

    // End date validation (only if not one-day event)
    if (!isOneOffEvent) {
      if (!endDate) {
        newErrors.endDate = "End date is required";
      } else if (startDate && endDate < startDate) {
        newErrors.endDate = "End date cannot be before start date";
      }

      if (!endTime) {
        newErrors.endTime = "End time is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Budget validation (only if not fixed budget)
    if (!isFixedBudget) {
      if (!budget.trim()) {
        newErrors.budget = "Budget is required";
      } else {
        const budgetNumber = parseFloat(budget);
        if (isNaN(budgetNumber) || budgetNumber <= 0) {
          newErrors.budget = "Please enter a valid budget amount";
        } else if (budgetNumber > 1000000) {
          newErrors.budget = "Budget amount seems too high";
        }
      }
    }

    // Expected guests validation
    if (!expectedGuests.trim()) {
      newErrors.expectedGuests = "Expected number of guests is required";
    } else {
      const guestsNumber = parseInt(expectedGuests);
      if (isNaN(guestsNumber) || guestsNumber <= 0) {
        newErrors.expectedGuests = "Please enter a valid number of guests";
      } else if (guestsNumber > 10000) {
        newErrors.expectedGuests = "Number of guests seems too high";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Email validation (optional but if provided, must be valid)
    if (inviteEmails.trim()) {
      const emails = inviteEmails.split(",").map((email) => email.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      for (const email of emails) {
        if (email && !emailRegex.test(email)) {
          newErrors.inviteEmails = `Invalid email format: ${email}`;
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCurrentStep = (): boolean => {
    setIsValidating(true);
    let isValid = false;

    switch (stepper) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = true; // Task list step doesn't require validation
        break;
      case 4:
        isValid = validateStep4();
        break;
      default:
        isValid = true;
    }

    setIsValidating(false);
    return isValid;
  };

  // Handle location update from LocationSearch component
  const handleLocationUpdate = (selectedLocation: string) => {
    setLocation(selectedLocation);
    // Clear location error when location is updated
    if (errors.location && selectedLocation.trim()) {
      setErrors((prev) => ({ ...prev, location: undefined }));
    }
  };

  // Handle cover image upload
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      setCoverImage(file);
    }
  };

  // Format date for display
  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTimeForDisplay = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    if (hours && minutes) {
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare final form data
      const finalEventData = {
        ...eventForm,
        id: `event_${Date.now()}`,
        title: eventName,
        eventType,
        location,
        isOneOffEvent,
        startDate,
        startTime,
        endDate: isOneOffEvent ? startDate : endDate,
        endTime: isOneOffEvent ? startTime : endTime,
        description,
        budget: isFixedBudget ? "" : budget,
        expectedGuests: expectedGuests ? parseInt(expectedGuests) || 0 : 0,
        currency: selectedCurrency,
        asset: selectedAsset,
        coveredAsset,
        isFixedBudget,
        inviteEmails: inviteEmails
          ? inviteEmails
              .split(",")
              .map((email) => email.trim())
              .filter(Boolean)
          : [],
        coverImage: coverImage ? coverImage.name : null,
        createdAt: new Date().toISOString(),
      };

      // Update the form atom with final data
      updateEventForm(finalEventData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsModal(false);
      setIsCreated(true);
      console.log("Event created successfully:", finalEventData);

      // Clear form data from localStorage after successful submission
      localStorage.removeItem("event-form");
      localStorage.removeItem("event-step");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle next step
  const handleNext = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    // Update form data before moving to next step
    const currentStepData = {
      title: eventName,
      eventType,
      location,
      isOneOffEvent,
      startDate,
      startTime,
      endDate,
      endTime,
      description,
      budget: isFixedBudget ? "" : budget,
      expectedGuests: expectedGuests ? parseInt(expectedGuests) || 0 : 0,
      currency: selectedCurrency,
      asset: selectedAsset,
      coveredAsset,
      isFixedBudget,
    };

    updateEventForm(currentStepData);

    // If this is the last step, submit the form
    if (stepper === 4) {
      await handleSubmit();
      return;
    }

    // Otherwise, move to next step
    if (stepper < 4) {
      nextStep();
    }
  };

  const handlePrevious = () => {
    previousStep();
  };

  // Real-time validation for event name
  const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEventName(value);

    // Clear previous errors and validate in real-time
    const newErrors = { ...errors };

    if (!value.trim()) {
      newErrors.eventName = "Event name is required";
    } else if (value.length < 3) {
      newErrors.eventName = "Event name must be at least 3 characters";
    } else if (value.length > 50) {
      newErrors.eventName = "Event name must be less than 50 characters";
    } else {
      delete newErrors.eventName;
    }

    setErrors(newErrors);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-primary-dark">Create Event</h1>

      {/* Stepper */}
      <div className="md:flex items-center justify-between gap-2 lg:gap-4 hidden">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="relative size-4">
              <input
                type="radio"
                readOnly
                checked={stepper >= index + 1}
                className="peer absolute appearance-none size-2 rounded-full bg-transparent checked:bg-primary-dark top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
              <div className="peer-checked:border-primary-dark border-2 border-gray-300 size-4 rounded-full absolute inset-0" />
            </div>
            <div>
              <p className={`text-sm text-gray-base`}>{step.title}</p>
              <p
                className={`font-medium text-sm lg:text-base text-gray-600 ${stepper >= index + 1 ? "text-primary-darkPurple" : "text-gray-base"}`}
              >
                {step.subtitle}
              </p>
            </div>
            {index < steps.length - 1 && (
              <hr className="lg:w-20 w-10 border border-gray-600" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Event Details */}
      {stepper === 1 && (
        <div className="flex flex-col sm:flex-row gap-14 w-full pt-20">
          {/* Left: Preview Card */}
          <div className="w-full h-80 rounded-lg bg-gradient-primary relative overflow-hidden max-w-[31rem]">
            {coverImage ? (
              <Image
                src={URL.createObjectURL(coverImage)}
                alt="Cover"
                className="w-full h-full object-cover"
                width={500}
                height={320}
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-black-100/0 to-black-100" />
                <div className="flex items-center justify-center text-center size-full relative">
                  <p className="text-4xl font-medium text-primary-light">
                    Welcome
                  </p>
                </div>
              </>
            )}

            <div className="bottom-0 absolute backdrop:blur-sm bg-black-100/30 left-0 right-0">
              <label className="flex justify-center items-center gap-2 py-2 px-6 text-primary-light cursor-pointer text-center w-full">
                <AddBackgroundIcon />
                <span className="text-center">
                  {coverImage ? "Edit Background" : "Add Background"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageChange}
                />
              </label>
            </div>
          </div>

          {/* Right: Form */}
          <div className="max-w-sm w-full">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <FormInput
                  id="eventName"
                  placeholder="Enter Event name"
                  value={eventName}
                  onChange={handleEventNameChange}
                />
                {errors.eventName && <FormError message={errors.eventName} />}
              </div>

              <div className="space-y-2">
                <Select
                  id="eventType"
                  options={eventTypes}
                  selected={eventType}
                  setSelected={(value) => {
                    setEventType(value);
                    if (errors.eventType) {
                      setErrors((prev) => ({ ...prev, eventType: undefined }));
                    }
                  }}
                  placeholder="Select event type"
                />
                {errors.eventType && <FormError message={errors.eventType} />}
              </div>

              <div className="space-y-2">
                <div
                  style={{ backgroundImage: `url(${MapImage.src})` }}
                  className="p-6 border border-[#E4E7EC] rounded-lg bg-cover bg-center h-64 w-full relative"
                >
                  <LocationSearch
                    onLocationSelect={handleLocationUpdate}
                    placeholder="Enter Event location"
                    initialValue={location}
                  />
                </div>
                {errors.location && <FormError message={errors.location} />}
              </div>

              <div className="flex items-center justify-between gap-2 py-4 px-6 rounded-lg border border-gray-300">
                <p className="text-base font-normal text-gray-950">
                  One-day event
                </p>
                <FormToggle
                  id="isOneOffEvent"
                  name="isOneOffEvent"
                  checked={isOneOffEvent}
                  onChange={() => setIsOneOffEvent((prev) => !prev)}
                />
              </div>

              {/* Date and Time Section */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Starts
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          if (errors.startDate) {
                            setErrors((prev) => ({
                              ...prev,
                              startDate: undefined,
                            }));
                          }
                        }}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-main"
                      />
                      {errors.startDate && (
                        <FormError message={errors.startDate} />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                          if (errors.startTime) {
                            setErrors((prev) => ({
                              ...prev,
                              startTime: undefined,
                            }));
                          }
                        }}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-main"
                      />
                      {errors.startTime && (
                        <FormError message={errors.startTime} />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {startDate && formatDateForDisplay(startDate)} at{" "}
                    {startTime && formatTimeForDisplay(startTime)}
                  </p>
                </div>

                {!isOneOffEvent && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Ends
                    </p>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => {
                            setEndDate(e.target.value);
                            if (errors.endDate) {
                              setErrors((prev) => ({
                                ...prev,
                                endDate: undefined,
                              }));
                            }
                          }}
                          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-main"
                        />
                        {errors.endDate && (
                          <FormError message={errors.endDate} />
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => {
                            setEndTime(e.target.value);
                            if (errors.endTime) {
                              setErrors((prev) => ({
                                ...prev,
                                endTime: undefined,
                              }));
                            }
                          }}
                          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-main"
                        />
                        {errors.endTime && (
                          <FormError message={errors.endTime} />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {endDate && formatDateForDisplay(endDate)} at{" "}
                      {endTime && formatTimeForDisplay(endTime)}
                    </p>
                  </div>
                )}
              </div>

              {/* Event Description */}
              <div className="space-y-2">
                <textarea
                  placeholder="Add event description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) {
                      setErrors((prev) => ({
                        ...prev,
                        description: undefined,
                      }));
                    }
                  }}
                  rows={4}
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-main resize-none"
                />
                {errors.description && (
                  <FormError message={errors.description} />
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Budget */}
      {stepper === 2 && (
        <div className="space-y-4">
          <EventBudget
            budget={budget}
            setBudget={setBudget}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            expectedGuests={expectedGuests}
            setExpectedGuests={(value) => {
              setExpectedGuests(value);
              // Clear error when user types
              if (errors.expectedGuests) {
                setErrors((prev) => ({ ...prev, expectedGuests: undefined }));
              }
            }}
            isFixedBudget={isFixedBudget}
            setIsFixedBudget={(value) => {
              setIsFixedBudget(value);
              // Clear budget error when toggling fixed budget
              if (value && errors.budget) {
                setErrors((prev) => ({ ...prev, budget: undefined }));
              }
            }}
            asset={coveredAsset}
            setAsset={setCoveredAsset}
          />
          {errors.budget && <FormError message={errors.budget} />}
          {errors.expectedGuests && (
            <FormError message={errors.expectedGuests} />
          )}
        </div>
      )}

      {/* Step 3: Task List */}
      {stepper === 3 && <TaskList />}

      {/* Step 4: Invite Guests */}
      {stepper === 4 && (
        <div className="space-y-4">
          <InviteGuest
            inviteEmails={inviteEmails}
            setInviteEmails={(value) => {
              setInviteEmails(value);
              // Clear error when user types
              if (errors.inviteEmails) {
                setErrors((prev) => ({ ...prev, inviteEmails: undefined }));
              }
            }}
          />
          {errors.inviteEmails && <FormError message={errors.inviteEmails} />}
        </div>
      )}

      {/* Control Buttons */}
      <div
        className={`w-full pt-10 flex ${stepper > 1 ? "justify-between " : "justify-end"} `}
      >
        {stepper > 1 && (
          <Button
            variant="outline"
            size="md"
            onClick={handlePrevious}
            disabled={isSubmitting || isValidating}
            className={`capitalize p-[0.5px] bg-gradient-primary bg-clip-border text-transparent w-ft`}
          >
            <div className="flex items-center gap-2 size-full bg-primary-light rounded-full px-6">
              <span>
                <ChevronLeft />
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-primary">
                back
              </span>
            </div>
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={isSubmitting || isValidating}
          className={`${stepper === 1 ? "w-fit" : "w-fit"} px-6 gap-2`}
          size="md"
        >
          {isSubmitting ? (
            <span>Creating Event...</span>
          ) : (
            <>
              <span>{stepper === 4 ? "Create Event" : "Next"}</span>
              <span className="-rotate-90 text-primary-light transform">
                <ChevronDown />
              </span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateEvent;
