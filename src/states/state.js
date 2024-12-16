
export const myState = {
    currentColor: "black", // Current drawing color
    isEraser: false, // Eraser state
    isDrawing: false, // Drawing state
    lastX: 0, // Last X coordinate of the cursor
    lastY: 0, // Last Y coordinate of the cursor
    offsetX: 0, // X offset for panning
    offsetY: 0, // Y offset for panning
    isPanning: false, // Panning state
    strokes : [],
    currentStrokes : [],
  };
  
  export function updateState(key, value) {
    myState[key] = value;
  }
  