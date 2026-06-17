// components/ThemeSelector.tsx
"use client";

import { Theme } from "types";
import { ThemeCard } from "./ThemeCard";
import { themeConfigs } from "themeConfig";
import Image from "next/image";
import adaImage from "../../../assets/svgs/addImage.svg";

interface ThemeSelectorProps {
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
  onClose: () => void;
}

export const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  onClose,
}: ThemeSelectorProps) => {
  const handleThemeSelection = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="fixed inset-0 bg-primary-dark/30 backdrop-blur-sm z-50 flex justify-end items-center pr-2">
      <div className="bg-primary-light h-screen rounded-xl shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Choose a theme</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {themeConfigs.map((theme) => (
              <ThemeCard
                key={theme.name}
                theme={theme}
                isSelected={selectedTheme.name === theme.name}
                onClick={() => handleThemeSelection(theme)}
              />
            ))}
          </div>

          <div className="flex absolute bottom-6 items-center w-full justify-center whitespace-nowrap">
            <button
              className="justify-center z-10 rounded-md px-4 py-2 text-sm font-medium  hover:bg-primary-light flex items-center gap-2"
              onClick={() => alert("Edit background clicked")}
            >
              <Image
                src={adaImage}
                alt="Add Image"
                width={20} // Adjusted for better proportion
                height={20}
                quality={100}
                className="rounded-lg"
              />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Edit Background
              </span>
            </button>
          </div>

          {/* <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setSelectedTheme(selectedTheme);
                onClose();
              }}
              className="flex-1 py-2 px-4 bg-primary-darkPurple text-white rounded-lg hover:bg-primary-darkPurple/90 transition-colors"
            >
              OK
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
