// controls.js

import { updateState } from "../../states/state.js";



export function createControls() {
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
  controlsContainer.style.zIndex = "10";
  

  const colors = ["black", "green", "red", "yellow", "blue", "purple", "orange"];
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.style.background = color;
    button.style.width = "55px";
    button.style.height = "55px";
    button.style.borderRadius = "50%";
    button.style.border = "none";
    button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    button.style.cursor = "pointer";
    button.addEventListener("click", () => setStrokeColor(color, false));
    controlsContainer.appendChild(button);
  });

  const eraserButton = document.createElement("button");
  eraserButton.textContent = "Eraser";
  eraserButton.addEventListener("click", () => setStrokeColor("white", true));
  controlsContainer.appendChild(eraserButton);

  return controlsContainer;
}

function setStrokeColor(color, isEraser) {
  updateState("isEraser", isEraser);
  updateState("currentColor", color);
}
