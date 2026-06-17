// themeConfig.ts
import frame1 from "../web/public/event-planner/Frame 1.png";
import frame2 from "../web/public/event-planner/Frame 2.png";
import frame3 from "../web/public/event-planner/Frame 3.png";
import frame4 from "../web/public/event-planner/Frame 4.png";
import frame5 from "../web/public/event-planner/Frame 5.png";
import frame6 from "../web/public/event-planner/Frame 6.png";
import frame7 from "../web/public/event-planner/Frame 7.png";
import frame8 from "../web/public/event-planner/Frame 8.png";
import frame9 from "../web/public/event-planner/Frame 9.png";
import frame10 from "../web/public/event-planner/Frame 10.png";
import frame11 from "../web/public/event-planner/Frame 11.png";
import { Theme } from "types";

//  default themes
export const defaultTheme: Theme = {
  name: "Default",
  image: frame1,
  isDefault: true,
  styles: {
    overlay: "bg-primary-light backdrop-blur-md",
    contentBg: "bg-primary-light backdrop-blur-md",
    // primaryText: "text-[#2A1D52]",
    // secondaryText: "text-[#98A2B3]",
    // cardBg: "bg-white/90 backdrop-blur-sm",
    // borderColor: "border-[#98A2B3]/30",
    // gradientFrom: "from-[#C96FFF]",
    // gradientTo: "to-[#2B2BCF]",
    // shadowStyle: "shadow-xl shadow-black/10",
    // buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
    // buttonText: "text-white font-medium",
  },
};

// themeConfig.ts

export const themeConfigs: Theme[] = [
  {
    name: "Classic Blue",
    image: frame8,
    styles: {
      overlay: "bg-blue-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      //   primaryText: "text-blue-900",
      //   secondaryText: "text-blue-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-blue-200/50",
      //   gradientFrom: "from-blue-500",
      //   gradientTo: "to-blue-700",
      //   shadowStyle: "shadow-xl shadow-blue-500/20",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
  {
    name: "Romantic Blush",
    image: frame3,
    styles: {
      overlay: "bg-pink-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      //   primaryText: "text-pink-900",
      //   secondaryText: "text-pink-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-pink-200/50",
      //   gradientFrom: "from-pink-400",
      //   gradientTo: "to-pink-600",
      //   shadowStyle: "shadow-xl shadow-pink-500/20",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
  {
    name: "Emerald Elegance",
    image: frame4,
    styles: {
      overlay: "bg-primary-dark/85 backdrop-blur-md",
      contentBg: "bg-primary-light/95 backdrop-blur-md",
      //   primaryText: "text-emerald-900",
      //   secondaryText: "text-emerald-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-emerald-200/50",
      //   gradientFrom: "from-emerald-500",
      //   gradientTo: "to-emerald-700",
      //   shadowStyle: "shadow-xl shadow-emerald-500/20",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
  {
    name: "Golden Luxury",
    image: frame5,
    styles: {
      overlay: "bg-amber-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      //   primaryText: "text-amber-900",
      //   secondaryText: "text-amber-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-amber-200/50",
      //   gradientFrom: "from-amber-400",
      //   gradientTo: "to-amber-600",
      //   shadowStyle: "shadow-xl shadow-amber-500/20",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
  {
    name: "Mystic Purple",
    image: frame6,
    styles: {
      overlay: "bg-purple-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      //   primaryText: "text-purple-900",
      //   secondaryText: "text-purple-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-purple-200/50",
      //   gradientFrom: "from-purple-500",
      //   gradientTo: "to-purple-700",
      //   shadowStyle: "shadow-xl shadow-purple-500/20",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
  {
    name: "Vintage Charm",
    image: frame7,
    styles: {
      overlay: "bg-rose-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      //   primaryText: "text-rose-900",
      //   secondaryText: "text-rose-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-rose-200/50",
      //   gradientFrom: "from-rose-400",
      //   gradientTo: "to-rose-600",
      //   shadowStyle: "shadow-xl shadow-rose-500/20",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
  {
    name: "Modern Minimal",
    image: frame9,
    styles: {
      overlay: "bg-gray-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      //   primaryText: "text-gray-900",
      //   secondaryText: "text-gray-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-gray-200/50",
      //   gradientFrom: "from-gray-500",
      //   gradientTo: "to-gray-700",
      //   shadowStyle: "shadow-xl shadow-gray-500/20",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
  {
    name: "Tropical Vibes",
    image: frame10,
    styles: {
      overlay: "bg-teal-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      //   primaryText: "text-teal-900",
      //   secondaryText: "text-teal-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-teal-200/50",
      //   gradientFrom: "from-teal-400",
      //   gradientTo: "to-teal-600",
      //   shadowStyle: "shadow-xl shadow-teal-500/20",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
  {
    name: "Sunset Glow",
    image: frame11,
    styles: {
      overlay: "bg-orange-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      //   primaryText: "text-orange-900",
      //   secondaryText: "text-orange-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-orange-200/50",
      //   gradientFrom: "from-orange-400",
      //   gradientTo: "to-orange-600",
      //   shadowStyle: "shadow-xl shadow-orange-500/20",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
  {
    name: "Royal Gold",
    image: frame2,
    styles: {
      overlay: "bg-amber-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      //   primaryText: "text-amber-900",
      //   secondaryText: "text-amber-600",
      //   cardBg: "bg-white/90 backdrop-blur-sm",
      //   borderColor: "border-amber-200/50",
      //   gradientFrom: "from-amber-300",
      //   gradientTo: "to-amber-500",
      //   shadowStyle: "shadow-xl shadow-amber-500/30",
      //   buttonBg: "bg-primary-darkPurple hover:bg-primary-darkPurple/90",
      //   buttonText: "text-white font-medium",
    },
  },
];
