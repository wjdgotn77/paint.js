const canvas = document.getElementById("jsCanvas");
const canvasContext = canvas.getContext("2d");
const pallete = document.getElementById("jsColors");
const brush = document.getElementById("jsRange");
const chooseMode = document.getElementById("jsMode");

const defaultValue = {
  canvasSize : 500,
  selectedColor : "#2c2c2c",
  fillColor : "#FFFF",
  controlBrush : 0.5,
  fill : "FILL",
  draw : "DRAW",
};

// Default Canvas
canvas.width = defaultValue.canvasSize;
canvas.height = defaultValue.canvasSize;

// Default Context
canvasContext.fillStyle = defaultValue.fillColor;
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
canvasContext.strokeStyle = defaultValue.selectedColor;
canvas.fillStyle = defaultValue.selectedColor;
canvasContext.lineWidth = defaultValue.controlBrush;

// Flags
let isDrawing = false;
let isFilling = false;

if (canvas) {
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);
  canvas.addEventListener("mousedown", handleFilledCanvas);
}

if (pallete) {
  pallete.addEventListener("click", handlePallete);
}

if (brush) {
  brush.addEventListener("input",handleInputBrush);
}

if (chooseMode) {
  chooseMode.addEventListener("click", handleClickMode);
}

function startDrawing() {
  isDrawing = true;
}

function stopDrawing() {
  isDrawing = false;
}

function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (isDrawing) {
    canvasContext.lineTo(x, y);
    canvasContext.stroke();
  } else {
    canvasContext.beginPath();
    canvasContext.moveTo(x, y);
  }
}

function handlePallete(event) {
  const element = event.target;
  const color = element.style.backgroundColor;
  if (element.className !== "controls__color") return;

  canvasContext.strokeStyle = color;
  canvasContext.fillStyle = color;
}

function handleInputBrush(event) {
  const brushSize = event.target.value;
  canvasContext.lineWidth = brushSize;
}

function handleClickMode() {
  if (isFilling === true) {
    isFilling = false;
    chooseMode.textContent = defaultValue.fill;
  } else {
    isFilling = true;
    chooseMode.textContent = defaultValue.draw;
  }
}

function handleFilledCanvas() {
  if (!isFilling) {
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  }
}
