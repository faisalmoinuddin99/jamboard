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
  canvasLayout.style.border = "2px solid #ddd";
  canvasLayout.style.borderRadius = "15px";
  canvasLayout.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  canvasLayout.style.background = "white";
  
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
  controlsContainer.style.position = "absolute";
  controlsContainer.style.top = "50%";
  controlsContainer.style.right = "20px";
  controlsContainer.style.transform = "translateY(-50%)";
  controlsContainer.style.display = "flex";
  controlsContainer.style.flexDirection = "column";
  controlsContainer.style.alignItems = "center";
  controlsContainer.style.gap = "12px";
  controlsContainer.style.zIndex = "10";  // Ensure it's above the canvas

  const colors = ["black", "green", "red", "yellow", "blue", "purple", "orange"];

  colors.forEach((color) => {
    const button = document.createElement("button");
    button.style.background = color;
    button.style.width = "55px";
    button.style.height = "55px";
    button.style.borderRadius = "50%"; // Rounded dial style
    button.style.border = "none";
    button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    button.style.cursor = "pointer";
    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.style.transition = "transform 0.3s ease, box-shadow 0.3s ease"; // Smooth transition

    // Hover effect: enlarge and add shadow
    button.addEventListener("mouseover", () => {
      button.style.transform = "scale(1.2)"; // Enlarge the button
      button.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)"; // Add a deeper shadow
    });

    // Reset effect on mouse out
    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)"; // Reset size
      button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Reset shadow
    });

    // Click effect: Add ripple effect
    button.addEventListener("click", (event) => {
      // Remove any existing ripples
      const existingRipple = button.querySelector(".ripple");
      if (existingRipple) existingRipple.remove();

      // Create a new ripple element
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.6)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple-effect 0.6s linear";
      ripple.style.pointerEvents = "none";

      // Calculate size and position of the ripple
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      // Append ripple to button and remove after animation
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });

    button.addEventListener("click", () => setStrokeColor(color));
    controlsContainer.appendChild(button);
  });

  const eraserButton = document.createElement("button");
  eraserButton.textContent = "Eraser";
  eraserButton.style.width = "55px";
  eraserButton.style.height = "55px";
  eraserButton.style.borderRadius = "50%";
  eraserButton.style.background = "#f8f8f8";
  eraserButton.style.border = "1px solid #ddd";
  eraserButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  eraserButton.style.cursor = "pointer";
  eraserButton.style.position = "relative";
  eraserButton.style.overflow = "hidden";
  eraserButton.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

  // Hover and ripple effect for eraser
  eraserButton.addEventListener("mouseover", () => {
    eraserButton.style.transform = "scale(1.2)";
    eraserButton.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
  });

  eraserButton.addEventListener("mouseout", () => {
    eraserButton.style.transform = "scale(1)";
    eraserButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  });

  eraserButton.addEventListener("click", (event) => {
    enableEraser();

    // Ripple effect for eraser button
    const existingRipple = eraserButton.querySelector(".ripple");
    if (existingRipple) existingRipple.remove();

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(0, 0, 0, 0.1)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple-effect 0.6s linear";
    ripple.style.pointerEvents = "none";

    const rect = eraserButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    eraserButton.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });

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

// Export the Jamboard and setupCanvas function
export { Jamboard, setupCanvas };
