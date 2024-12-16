// events.js

import { myState, updateState } from "../../states/state.js";

const state = myState

export function attachCanvasEvents(canvas, ctx) {

  canvas.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
      updateState("isDrawing", true);
      updateState("lastX", event.offsetX);
      updateState("lastY", event.offsetY);

      state.currentStrokes = []
      state.strokes.push(myState.currentStrokes)
    }
  });

  canvas.addEventListener("mousemove", (e) => {
   
  
    // Ensure isDrawing is true before continuing
    if (!state.isDrawing) return;
  
    // Get canvas bounding rect and calculate x, y positions
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    // Push current point to the stroke array
    state.currentStrokes.push({ x, y });
  
    // Set drawing properties
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = state.isEraser ? 100 : 2;
    ctx.strokeStyle = state.isEraser ? "white" : state.currentColor;
  
    // Draw the line if there are enough points
    if (state.currentStrokes.length > 1) {
      const lastPoint = state.currentStrokes[state.currentStrokes.length - 2];
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  
    // Update the state for lastX and lastY
    updateState("lastX", x);
    updateState("lastY", y);
  });
  

  canvas.addEventListener("mouseup", () => {
    updateState("isDrawing", false);
    
    state.currentStrokes = []
  });

  canvas.addEventListener("mouseout", () => {
    updateState("isDrawing", false);
   
    state.currentStrokes = []
  });

  document.addEventListener("keydown",(event)=> {
    
    if(event.key === "l") {
      console.log(state.strokes)
    }
  })
}
