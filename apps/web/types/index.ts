// types/theme.ts
import { StaticImageData } from "next/image";

type ThemeStyles = {
  // buttonBg: string;
  // buttonText: string;
  overlay: string;
  contentBg: string;
  // primaryText: string;
  // secondaryText: string;
  // cardBg: string;
  // borderColor: string;
  // gradientFrom: string;
  // gradientTo: string;
  // shadowStyle: string;
  [key: string]: string; // Remove undefined from this type
};

export interface Theme {
  name: string;
  image: StaticImageData; // Changed from string to StaticImageData
  isDefault?: boolean;
  styles: ThemeStyles;
}

export interface ThemeSelectorProps {
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
  onClose: () => void;
}

export interface ThemeCardProps {
  theme: Theme;
  isSelected: boolean;
  onClick: () => void;
}

export type TableType = "round" | "rectangle" | "long" | "square";

// types.ts
export type TabValue = "Items" | "Text" | "Guests";

export interface Position {
  x: number;
  y: number;
}

// types.ts
export interface TableShape {
  id: string;
  type: "round" | "rectangle" | "long";
  name: string;
  position: { x: number; y: number };
  seats: number;
  seatAssignments: Record<number, string>;
}

export interface Chair {
  id: string;
  tableId: string;
  seatNumber: number;
  position: { x: number; y: number };
  guestName: string | null;
}

export interface Guest {
  id: string;
  name: string;
}

export interface TextItem {
  id: string;
  text: string;
  position: { x: number; y: number };
  fontFamily: string;
}

export interface DragState {
  isDragging: boolean;
  draggedItem?: TableShape | Chair | null;
  itemType?: "table" | "chair" | null;
  offset?: { x: number; y: number };
}

export interface SeatAssignmentProps {
  selectedTable: TableShape;
  updateSeatCount: (newSeatCount: number) => void;
  assignGuestToSeat: (seatNumber: number, guestName: string) => void;
  removeGuestFromSeat: (seatNumber: number) => void;
  AVAILABLE_GUESTS: string[];
}
