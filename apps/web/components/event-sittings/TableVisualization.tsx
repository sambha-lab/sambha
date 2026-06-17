"use client";
import React, { useRef } from "react";
import { Chair, TableShape, TextItem } from "types";

// Local definitions instead of "types" import
// export type TableShape = {
//   id: number;
//   className: string;
//   name: string;
//   x: number;
//   y: number;
//   seats: number;
//   seatAssignments?: Record<number, string>; // Added to support seatAssignments
// };

// export type Chair = {
//   id: number;
//   tableId: number;
//   guest: Guest | null;
//   seatNumber?: number;
//   position?: { x: number; y: number };
//   guestName?: string | null;
// };

// export type Guest = {
//   id: string;
//   name: string;
// };

// export type TextItem = {
//   id: number;
//   text: string;
//   x: number;
//   y: number;
// };

interface TableVisualizationProps {
  tables: TableShape[];
  chairs: Chair[];
  textItems: TextItem[];
  selectedTable?: TableShape | null;
  setSelectedTable: (table: TableShape | null) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: () => void;
  dragState: {
    isDragging: boolean;
  };
  renderTable: (table: TableShape) => React.ReactNode;
  renderChair: (chair: Chair) => React.ReactNode;
  renderTextItem: (text: TextItem) => React.ReactNode;
}

export default function TableVisualization({
  tables,
  chairs,
  textItems,
  setSelectedTable,
  handleMouseMove,
  handleMouseUp,
  dragState,
  renderTable,
  renderChair,
  renderTextItem,
}: TableVisualizationProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 relative overflow-hidden bg-gray-50">
      <div
        ref={canvasRef}
        className="w-full h-full relative"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          cursor: dragState?.isDragging ? "grabbing" : "default",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={() => setSelectedTable(null)}
      >
        {tables.length === 0 &&
          textItems.length === 0 &&
          chairs.length === 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-sm -translate-y-1/2 text-center text-gray-400">
              <div className="text-4xl mb-4">🪑</div>
              <h3 className=" font-medium mb-2">
                Start designing your seating chart
              </h3>
              <p>Add tables and items from the left panel</p>
            </div>
          )}
        {tables.map(renderTable)}
        {chairs.map(renderChair)}
        {textItems.map(renderTextItem)}
      </div>
    </div>
  );
}
