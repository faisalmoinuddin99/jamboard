// Jamboard.js

import { myState, updateState } from "../../../states/state.js";
import { createCanvas } from "../../components/canvasSetup.js";
import { createControls } from "../../components/controls.js";
import { attachCanvasEvents } from "../../components/events.js";

// Create the section
const Jamboard = document.createElement("section");
Jamboard.setAttribute("id", "jamboard");
Jamboard.classList.add("cls-jamboard");

// Centralized state management
const state = myState;

// Function to setup the canvas
function setupCanvas() {
  // Create canvas and append to the Jamboard
  const canvas = createCanvas();
  Jamboard.innerHTML = ""; // Clear previous content
  Jamboard.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Canvas context is null.");
    return;
  }

  // Attach events to canvas
  attachCanvasEvents(canvas, ctx);

  // Create controls and append them
  // const controls = createControls();
  const controls = createControls();
  Jamboard.appendChild(controls);
}


// Add ripple effect CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple-effect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export Jamboard and setupCanvas
export { Jamboard, setupCanvas };
