"use client";
import { useState } from "react";

export default function NotificationSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
      />
      <div
        className="relative w-11 h-6 rounded-full
    bg-gray-300 peer-checked:bg-green-500
    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
    after:bg-primary-light after:rounded-full after:h-5 after:w-5 after:transition-all 
    after:shadow-md
    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"
      />
    </label>
  );
}
