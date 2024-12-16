// Create the section
const Jamboard = document.createElement("section");
Jamboard.setAttribute("id", "jamboard");
Jamboard.classList.add("cls-jamboard");

// Centralized state management
const state = {
  currentColor: "black", // Current drawing color
  isEraser: false, // Eraser state
  isDrawing: false, // Drawing state
  lastX: 0, // Last X coordinate of the cursor
  lastY: 0, // Last Y coordinate of the cursor
};

// Function to update state values
function updateState(key, value) {
  state[key] = value;
}

// Function to create and setup the canvas
function setupCanvas() {
  // Create canvas element
  const canvasLayout = document.createElement("canvas");
  canvasLayout.id = "drawingCanvas";
  canvasLayout.width = 800;
  canvasLayout.height = 600;
  canvasLayout.style.cursor = "crosshair";
  canvasLayout.style.border = "1px solid #ccc";

  // Append the canvas to the Jamboard
  Jamboard.innerHTML = ""; // Clear previous content
  Jamboard.appendChild(canvasLayout);

  // Access the canvas and its context
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error(
      "Canvas context is null. Ensure the Jamboard is appended to the DOM before setupCanvas."
    );
    return;
  }

  // Function to set the stroke color
  function setStrokeColor(color) {
    updateState("isEraser", false); // Disable eraser when setting a color
    updateState("currentColor", color);
  }

  // Function to enable the eraser
  function enableEraser() {
    updateState("isEraser", true);
  }

  // Create color buttons and eraser button
  const controlsContainer = document.createElement("div");
  controlsContainer.setAttribute("id", "controls-container");

  const colors = [
    "black",
    "green",
    "red",
    "yellow",
    "blue",
    "purple",
    "orange",
  ];

  colors.forEach((color) => {
    const button = document.createElement("button");
    button.style.background = color;
    button.style.width = "80px";
    button.style.height = "40px";
    button.style.margin = "5px";
    button.style.cursor = "pointer";
    button.addEventListener("click", () => setStrokeColor(color));
    controlsContainer.appendChild(button);
  });

  const eraserButton = document.createElement("button");
  eraserButton.textContent = "Eraser";
  eraserButton.style.width = "80px";
  eraserButton.style.height = "40px";
  eraserButton.style.margin = "5px";
  eraserButton.style.cursor = "pointer";
  eraserButton.addEventListener("click", enableEraser);
  controlsContainer.appendChild(eraserButton);

  // Append controls to the Jamboard
  Jamboard.appendChild(controlsContainer);

  // Canvas event handlers
  canvas.addEventListener("mousedown", (event) => {
    updateState("isDrawing", true);
    updateState("lastX", event.offsetX);
    updateState("lastY", event.offsetY);
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!state.isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(state.lastX, state.lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = state.isEraser ? "white" : state.currentColor;
    ctx.lineWidth = state.isEraser ? 100 : 7;
    ctx.stroke();

    updateState("lastX", event.offsetX);
    updateState("lastY", event.offsetY);
  });

  canvas.addEventListener("mouseup", () => updateState("isDrawing", false));
  canvas.addEventListener("mouseout", () => updateState("isDrawing", false));
}

// Export the Jamboard and setupCanvas function
export { Jamboard, setupCanvas };
