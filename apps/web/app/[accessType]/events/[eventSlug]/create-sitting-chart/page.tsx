"use client";
import React, { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb } from "components/event-sittings/Breadcrumb";
import { TabNavigation } from "components/event-sittings/TabNavigation";
import { TableEditor } from "components/event-sittings/TableEditor";
import AddText from "components/event-sittings/AddText";
import GuestSelector from "components/event-sittings/GuestSelector";
import TableItems from "components/event-sittings/TableItems";
import TableVisualization from "components/event-sittings/TableVisualization";
import { Chair, Guest, TableShape, TabValue, TextItem } from "types";

const events = [
  {
    id: "abc123",
    slug: "oliver-and-emilys-wedding",
    name: "Oliver & Emily's Wedding",
  },
];

const snapToGrid = (position: { x: number; y: number }) => {
  const gridSize = 20;
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize,
  };
};

const getTableDimensions = (type: string) => {
  switch (type) {
    case "long":
      return { width: 120, height: 60 };
    case "round":
      return { width: 80, height: 80 };
    default: // rectangle
      return { width: 80, height: 80 };
  }
};

// chair postion
const generateChairPositions = (table: TableShape) => {
  const positions = [];
  const radius = 60;

  const center = {
    x: table.position.x + getTableDimensions(table.type).width / 2,
    y: table.position.y + getTableDimensions(table.type).height / 2,
  };

  for (let i = 0; i < table.seats; i++) {
    const angle = i * (360 / table.seats) * (Math.PI / 180);

    positions.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    });
  }

  return positions;
};

export default function CreateSittingChartPage() {
  // State management
  const [activeTab, setActiveTab] = useState<TabValue>("Items");
  const { eventSlug } = useParams();
  const decodedSlug = decodeURIComponent(eventSlug as string);
  const currentEvent = events.find((event) => event.slug === decodedSlug);
  const [textItems] = useState<TextItem[]>([]);

  const [tables, setTables] = useState<TableShape[]>([]);
  const [chairs, setChairs] = useState<Chair[]>([]);
  const [tableCounter, setTableCounter] = useState(1);
  const [selectedTable, setSelectedTable] = useState<TableShape | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // to create chair to a table selected
  const createChairsForTable = (table: TableShape) => {
    const positions = generateChairPositions(table);
    return positions.map((position, index) => ({
      id: `chair-${table.id}-${index + 1}`,
      tableId: table.id,
      seatNumber: index + 1,
      position: snapToGrid(position),
      guestName: table.seatAssignments?.[index + 1] || null,
    }));
  };

  // to avoid different shape render on eachother
  const checkCollision = (
    newTable: TableShape,
    existingTables: TableShape[]
  ) => {
    const newDims = getTableDimensions(newTable.type);
    const buffer = 20;

    return existingTables.some((table) => {
      if (table.id === newTable.id) return false;

      const dims = getTableDimensions(table.type);
      const distance = Math.sqrt(
        Math.pow(newTable.position.x - table.position.x, 2) +
          Math.pow(newTable.position.y - table.position.y, 2)
      );

      return distance < (newDims.width + dims.width) / 2 + buffer;
    });
  };

  // if user wants to update a selected table
  const updateSelectedTable = (updates: Partial<TableShape>) => {
    if (!selectedTable) return;

    setTables((prevTables) => {
      const updatedTable = {
        ...prevTables.find((t) => t.id === selectedTable.id)!,
        ...updates,
      };

      // Update chairs
      if (updates.seats !== undefined) {
        const newChairs = createChairsForTable(updatedTable);
        setChairs((prev) => [
          ...prev.filter((chair) => chair.tableId !== updatedTable.id),
          ...newChairs,
        ]);
      } else {
        setChairs((prev) =>
          prev.map((chair) =>
            chair.tableId === updatedTable.id
              ? {
                  ...chair,
                  guestName:
                    updatedTable.seatAssignments?.[chair.seatNumber] || null,
                }
              : chair
          )
        );
      }

      setSelectedTable(updatedTable);

      return prevTables.map((t) =>
        t.id === selectedTable.id ? updatedTable : t
      );
    });
  };

  // to update sit
  const updateSeatCount = (newSeatCount: number) => {
    if (!selectedTable) return;

    const newAssignments: Record<number, string> = {};
    for (let i = 1; i <= newSeatCount; i++) {
      const guest = selectedTable.seatAssignments?.[i];
      if (guest) {
        newAssignments[i] = guest;
      }
    }

    updateSelectedTable({
      seats: newSeatCount,
      seatAssignments: newAssignments,
    });
  };

  // add guest
  const assignGuestToSeat = (seatNumber: number, guestName: string) => {
    if (!selectedTable) return;

    updateSelectedTable({
      seatAssignments: {
        ...selectedTable.seatAssignments,
        [seatNumber]: guestName,
      },
    });
  };

  // remove guest
  const removeGuestFromSeat = (seatNumber: number) => {
    if (!selectedTable) return;

    const newAssignments = { ...selectedTable.seatAssignments };
    delete newAssignments[seatNumber];

    updateSelectedTable({
      seatAssignments: newAssignments,
    });
  };

  // Event handlers for drag and drop
  const handleDragStart = useCallback(
    (e: React.MouseEvent, table: TableShape) => {
      setIsDragging(true);
      setSelectedTable(table);
      setDragOffset({
        x: e.clientX - table.position.x,
        y: e.clientY - table.position.y,
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !selectedTable) return;

      const newPosition = snapToGrid({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });

      // Update the table position
      const updatedTable = {
        ...selectedTable,
        position: newPosition,
      };

      setTables((prev) =>
        prev.map((table) =>
          table.id === selectedTable.id ? updatedTable : table
        )
      );

      // Update all chairs for this table
      setChairs((prevChairs) => {
        const newChairPositions = generateChairPositions(updatedTable);

        return prevChairs.map((chair) => {
          if (
            chair.tableId === selectedTable.id &&
            chair.seatNumber !== undefined
          ) {
            const newPosition = newChairPositions[chair.seatNumber - 1];

            if (!newPosition) return chair; // safeguard

            return {
              ...chair,
              position: snapToGrid(newPosition),
            };
          }
          return chair;
        });
      });

      setSelectedTable(updatedTable);
    },
    [isDragging, selectedTable, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const addTable = useCallback(
    (type: "round" | "rectangle" | "long") => {
      let position = snapToGrid({ x: 400, y: 300 });

      const newTable = {
        id: `table-${Date.now()}`,
        type,
        position,
        name: `Table ${tableCounter}`,
        seats: 3,
        seatAssignments: { 1: "Kathryn Murphy" },
      };

      let attempts = 0;
      while (checkCollision(newTable, tables) && attempts < 20) {
        position = snapToGrid({
          x: 300 + attempts * 60,
          y: 250 + Math.floor(attempts / 3) * 100,
        });
        newTable.position = position;
        attempts++;
      }

      const newChairs = createChairsForTable(newTable);

      setTables((prev) => [...prev, newTable]);
      setChairs((prev) => [...prev, ...newChairs]);
      setTableCounter((prev) => prev + 1);
      setSelectedTable(newTable);
    },
    [tableCounter, tables]
  ); // depends on tableCounter and tables

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "Items":
        return <TableItems onSelectTable={addTable} />;
      case "Text":
        return <AddText />;
      case "Guests":
        return <GuestSelector />;
      default:
        return null;
    }
  }, [activeTab, addTable]);

  // Sample guests data
  const AVAILABLE_GUESTS: Guest[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "2", name: "Emily Davis" },
    { id: "2", name: "Michael Brown" },
    { id: "2", name: "Sarah Wilson" },
    { id: "2", name: "David Johnson" },
    { id: "2", name: "Lisa Anderson" },
    { id: "2", name: "Robert Taylor" },
  ];

  // this is when any table is being display with  chair and there names
  const renderTable = useCallback(
    (table: TableShape) => (
      <div
        key={`table-${table.id}`}
        onMouseDown={(e: React.MouseEvent) => handleDragStart(e, table)}
        onDoubleClick={() => setSelectedTable(table)} // ✅ This line enables re-selection
        style={{
          position: "absolute",
          left: `${table.position.x}px`,
          top: `${table.position.y}px`,
          cursor:
            isDragging && selectedTable?.id === table.id ? "grabbing" : "grab",
        }}
      >
        <div
          className={`flex items-center justify-center text-primary-light font-medium text-sm 
            ${table.type === "round" ? "rounded-full" : "rounded"} 
            ${table.type === "long" ? "w-32 h-16" : "w-20 h-20"} 
            bg-purple-base`}
        >
          {table.name}
        </div>
      </div>
    ),
    [handleDragStart, isDragging, selectedTable]
  );

  // for chair
  const renderChair = useCallback((chair: Chair) => {
    return (
      <div
        key={`chair-${chair.id}`}
        style={{
          position: "absolute",
          left: `${chair.position.x}px`,
          top: `${chair.position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-6 h-6 cursor-move transition-all duration-200 rounded-full bg-purple-base flex items-center justify-center text-primary-light text-xs">
          {chair.guestName ? chair.guestName[0] : chair.seatNumber}
        </div>
      </div>
    );
  }, []);

  const renderTextItem = useCallback(
    (textItem: TextItem) => (
      <div
        key={`text-${textItem.id}`}
        style={{
          position: "absolute",
          left: `${textItem.position.x}px`,
          top: `${textItem.position.y}px`,
          fontFamily: textItem.fontFamily,
        }}
        className="text-gray-700 text-sm"
      >
        {textItem.text}
      </div>
    ),
    []
  );

  return (
    <div className="py-6 space-y-4">
      <Breadcrumb eventSlug={eventSlug as string} currentEvent={currentEvent} />

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex w-full h-[743px]">
        <div className="md:max-w-sm w-full px-4 md:px-0 border-r">
          {renderContent()}
        </div>

        <TableVisualization
          tables={tables}
          chairs={chairs}
          textItems={textItems}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          dragState={{ isDragging }}
          renderTable={renderTable}
          renderChair={renderChair}
          renderTextItem={renderTextItem}
        />

        {selectedTable && (
          <div className="w-80 hidden md:block border-l pl-4">
            <TableEditor
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
              seatCount={selectedTable.seats}
              assignedSeats={chairs
                .filter((c) => c.tableId === selectedTable.id)
                .reduce(
                  (acc, chair) => {
                    if (chair.guestName) {
                      acc[chair.seatNumber] = { name: chair.guestName };
                    }
                    return acc;
                  },
                  {} as Record<number, { name: string }>
                )}
              incrementSeat={() => updateSeatCount(selectedTable.seats + 1)}
              decrementSeat={() =>
                updateSeatCount(Math.max(1, selectedTable.seats - 1))
              }
              addGuest={(index) => {
                const guest = AVAILABLE_GUESTS[0];
                if (guest) {
                  assignGuestToSeat(index + 1, guest.name);
                }
              }}
              removeGuest={(index) => {
                removeGuestFromSeat(index + 1);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
