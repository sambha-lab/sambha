"use client";
import React from "react";

type CalenderIconProps = {
  className?: string;
};

export default function CalendarIcon({ className }: CalenderIconProps) {
  return (
    <>
      <svg
        className={className}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.33317 8.66659H10.6665M5.33317 8.66659H5.33917M8.6665 11.3333H5.33317M10.6665 11.3333H10.6605M11.9998 1.33325V2.66659M3.99984 1.33325V2.66659M1.99984 5.33325H13.9998M1.6665 8.16192C1.6665 5.25725 1.6665 3.80459 2.50117 2.90192C3.33584 1.99992 4.67984 1.99992 7.3665 1.99992H8.63317C11.3198 1.99992 12.6638 1.99992 13.4985 2.90259C14.3332 3.80459 14.3332 5.25725 14.3332 8.16259V8.50459C14.3332 11.4093 14.3332 12.8619 13.4985 13.7646C12.6638 14.6666 11.3198 14.6666 8.63317 14.6666H7.3665C4.67984 14.6666 3.33584 14.6666 2.50117 13.7639C1.6665 12.8619 1.6665 11.4093 1.6665 8.50392V8.16192Z"
          stroke="#2A1D52"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
