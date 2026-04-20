import { TicketIcon02 } from "public/svg";

export const renderEmptyState = (label: string) => (
  <div className="pt-16 flex items-center justify-center sm:justify-normal">
    <div className="gap-y-2 flex-col justify-center items-center flex sm:items-start">
      <div className="rounded-xl bg-white-900 p-3 inline-block">
        <TicketIcon02 />
      </div>
      <p className="text-sm font-normal text-gray-base max-w-[20ch] text-center sm:text-start">
        Your {label.toLowerCase()} events will show up here.
      </p>
    </div>
  </div>
);
