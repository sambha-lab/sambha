"use client";
import TextIcon from "components/icons/TestIcon";
import React, { useState } from "react";

const fonts = ["Arial", "Helvetica", "Inter", "Montserrat", "Open Sans"];

export function FontSelector() {
  const [selectedFont, setSelectedFont] = useState("Arial");

  return (
    <ul>
      {fonts.map((font) => (
        <li
          key={font}
          onClick={() => setSelectedFont(font)}
          className={`flex items-center p-3  rounded-lg cursor-pointer hover:bg-gray-50 transition ${
            selectedFont === font ? "" : "gap-4"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-5">
              {selectedFont === font && (
                <span className=" text-lg font-normal">✔</span>
              )}
            </span>
            <span className="font-normal">{font}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function AddText() {
  return (
    <div className="pt-4 px-4">
      <div className="flex flex-col space-y-4">
        <button className="rounded-full border-primary-darkPurple gap-2 flex items-center justify-center font-medium text-darkPurple py-2 cursor-pointer w-full border">
          <TextIcon isActive={true} /> Add text box
        </button>
        <div className="space-y-2">
          <h1 className="border-b py-3">Font</h1>
          <FontSelector />
        </div>
      </div>
    </div>
  );
}
