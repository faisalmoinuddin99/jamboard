// canvasSetup.js

export function createCanvas() {
    const canvasLayout = document.createElement("canvas");
    canvasLayout.id = "drawingCanvas";
    canvasLayout.width = innerWidth * 0.9;
    canvasLayout.height = 600;
    canvasLayout.style.cursor = "none";
    canvasLayout.style.border = "2px solid #ddd";
    canvasLayout.style.borderRadius = "15px";
    canvasLayout.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    canvasLayout.style.background = "white";
    canvasLayout.style.position = "relative";
  
    return canvasLayout;
  }
  