// Create the section
const Jamboard = document.createElement("section");
Jamboard.setAttribute("id", "jamboard");
Jamboard.classList.add("cls-jamboard");

// Function to create and setup the canvas
function setupCanvas() {
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

  // Set initial stroke color
  let currentColor = "black";

  // function to set stroke color
  function setStrokeColor(color) {
    currentColor = color;
  }
  const colorButton = document.createElement("div");
  colorButton.setAttribute("id", "color-button");

  const colors = ["black", "green", "red", "yellow", "blue", "purple", "orange"];

  colors.forEach((color) => {
    const button = document.createElement("button");
    button.style.background = color;
    button.style.width = "100px"
    button.style.height = "50px"
    button.style.cursor = "pointer"
    button.addEventListener("click", () => setStrokeColor(color));
    colorButton.appendChild(button);
  });

  // Append color buttons to the page (or Jamboard section)
  Jamboard.appendChild(colorButton);
  // Drawing state variables
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  // Start drawing
  canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
  });

  // Draw on the canvas
  canvas.addEventListener("mousemove", (event) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 1;
    ctx.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
  });

  // Stop drawing
  canvas.addEventListener("mouseup", () => (isDrawing = false));
  canvas.addEventListener("mouseout", () => (isDrawing = false));
}

// Export the Jamboard and setupCanvas function
export { Jamboard, setupCanvas };
