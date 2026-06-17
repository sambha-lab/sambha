// utils.ts
import { TableShape, Position } from "types";

export const snapToGrid = (position: Position): Position => {
  const gridSize = 20;
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize,
  };
};

export const getTableDimensions = (
  type: TableShape["type"]
): { width: number; height: number } => {
  switch (type) {
    case "long":
      return { width: 120, height: 40 };
    case "round":
      return { width: 80, height: 80 };
    case "rectangle":
      return { width: 80, height: 80 };
    default:
      return { width: 80, height: 80 };
  }
};

export const generateChairPositions = (table: TableShape): Position[] => {
  const positions: Position[] = [];
  const seats = table.seats || 6;

  if (table.type === "round") {
    const radius = 60;
    for (let i = 0; i < seats; i++) {
      const angle = (i * 2 * Math.PI) / seats - Math.PI / 2;
      positions.push({
        x: table.position.x + radius * Math.cos(angle),
        y: table.position.y + radius * Math.sin(angle),
      });
    }
  } else if (table.type === "long") {
    const perSide = Math.ceil(seats / 2);
    for (let i = 0; i < seats; i++) {
      if (i < perSide) {
        positions.push({
          x: table.position.x - 60 + (i * 120) / (perSide - 1 || 1),
          y: table.position.y - 50,
        });
      } else {
        positions.push({
          x:
            table.position.x -
            60 +
            ((i - perSide) * 120) / (seats - perSide - 1 || 1),
          y: table.position.y + 50,
        });
      }
    }
  } else {
    // square
    const perSide = Math.ceil(seats / 4);
    for (let i = 0; i < seats; i++) {
      const side = Math.floor(i / perSide);
      const pos = i % perSide;

      switch (side) {
        case 0: // top
          positions.push({
            x: table.position.x - 40 + (pos * 80) / (perSide - 1 || 1),
            y: table.position.y - 50,
          });
          break;
        case 1: // right
          positions.push({
            x: table.position.x + 50,
            y: table.position.y - 40 + (pos * 80) / (perSide - 1 || 1),
          });
          break;
        case 2: // bottom
          positions.push({
            x: table.position.x + 40 - (pos * 80) / (perSide - 1 || 1),
            y: table.position.y + 50,
          });
          break;
        default: // left
          positions.push({
            x: table.position.x - 50,
            y: table.position.y + 40 - (pos * 80) / (perSide - 1 || 1),
          });
      }
    }
  }

  return positions.slice(0, seats);
};

export const createChairsForTable = (
  table: TableShape
): Array<{
  id: string;
  tableId: string;
  seatNumber: number;
  position: Position;
  guestName: string | null;
}> => {
  const positions = generateChairPositions(table);
  return positions.map((position, index) => ({
    id: `chair-${table.id}-${index + 1}`,
    tableId: table.id,
    seatNumber: index + 1,
    position: snapToGrid(position),
    guestName: table.seatAssignments?.[index + 1] || null,
  }));
};

export const checkCollision = (
  newTable: TableShape,
  existingTables: TableShape[]
): boolean => {
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
