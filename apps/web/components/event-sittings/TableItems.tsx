import React from "react";
import { SearchFilter } from "./GuestSelector";
import { ViewButton } from "app/[accessType]/events/[eventSlug]/Details";

type TableItemsProps = {
  onSelectTable: (type: "round" | "rectangle" | "long") => void;
};

export default function TableItems({ onSelectTable }: TableItemsProps) {
  const tableTypes = [
    {
      name: "Long Table",
      type: "long" as const,
      seats: {},
    },
    {
      name: "Round Table",
      type: "round" as const,
      seats: {},
    },
    {
      name: "Square Table",
      type: "rectangle" as const,
      seats: {},
    },
  ];

  return (
    <div className="flex flex-col w-full py-4 space-y-6 px-4">
      <div className="flex justify-between w-full">
        <SearchFilter onSearch={(query) => console.log(query)} />
      </div>

      <div className="flex justify-between border-b py-4">
        <h2 className="text-green-900 text-lg font-medium">Seating</h2>
        <ViewButton />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2 items-center py-4">
        {tableTypes.map((table, index) => (
          <div
            key={index}
            className="flex flex-col cursor-pointer items-center gap-2 p-3 border border-gray-200 rounded-lg h-32 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            onClick={() => onSelectTable(table.type)}
          >
            <div
              className={`flex items-center justify-center text-white font-medium text-sm border-[3px] border-primary-dark
                    ${table.type === "round" ? "rounded-full" : "rounded-none"} 
                    ${table.type === "long" ? "w-24 h-14" : "w-14 h-14"} 
                    bg-purple-base`}
            />
            <h6 className="text-gray-base text-sm mt-1">{table.name}</h6>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors w-full">
        <div className="flex gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-purple-base rounded-full"></div>
          ))}
        </div>
        <span className="text-xs text-gray-600">Seating row</span>
      </div>
    </div>
  );
}
