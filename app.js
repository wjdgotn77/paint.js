const $canvas = document.getElementById("jsCanvas");
const $canvasContext = $canvas.getContext("2d");
const $pallete = document.getElementById("jsColors");
const $brush = document.getElementById("jsRange");
const $chooseMode = document.getElementById("jsMode");
const $clearCanvas = document.getElementById("jsClear");

const $savePage = document.getElementById("jsSave");
const $saveForm = document.querySelector(".form-container");
const $inputName = document.getElementById("jsForm-name");
const $saveButton = document.querySelector(".jsForm-save");
const $backButton = document.querySelector(".jsForm-back");

const DEFAULT_COLOR = "#2c2c2c";
const DEFAULT_BGCOLOR = "#FFFF";
const DEFAULT_LINE = 2.5;
const CANVAS_SIZE = 500;
const CSS_PROPERTIES = {
  hide: "hide",
}

// Flags
let isDrawing = false;
let isFilling = false;

// Default Canvas
$canvas.width = CANVAS_SIZE;
$canvas.height = CANVAS_SIZE;

// Default Context
$canvasContext.fillStyle = DEFAULT_BGCOLOR;
$canvasContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
$canvasContext.strokeStyle = DEFAULT_COLOR;
$canvasContext.fillStyle = DEFAULT_COLOR;
$canvasContext.lineWidth = DEFAULT_LINE;

if ($canvas) {
  $canvas.addEventListener("mousemove", handleMouseMove);
  $canvas.addEventListener("mousedown", startDrawing);
  $canvas.addEventListener("mouseup", stopDrawing);
  $canvas.addEventListener("mouseleave", stopDrawing);
  $canvas.addEventListener("mousedown", handleFilledCanvas);
}

if ($pallete) {
  $pallete.addEventListener("click", handlePallete);
}

if ($brush) {
  $brush.addEventListener("input", handleInputBrush);
}

if ($chooseMode) {
  $chooseMode.addEventListener("click", handleClickMode);
}

if ($clearCanvas) {
  $clearCanvas.addEventListener("click", () => {
    $canvasContext.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  });
}

if ($savePage) {
  $savePage.addEventListener("click", () => {
    $saveForm.classList.remove(CSS_PROPERTIES.hide);
  });
}

$saveButton.addEventListener("click", handleClickSave);
$backButton.addEventListener("click", handleClickBack);

function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!isDrawing) {
    $canvasContext.beginPath();
    $canvasContext.moveTo(x, y);
  } else {
    $canvasContext.lineTo(x, y);
    $canvasContext.stroke();
  }
}

function startDrawing() {
  isDrawing = true;
}

function stopDrawing() {
  isDrawing = false;
}

function handlePallete(event) {
  const element = event.target;
  const pickedColor = element.style.backgroundColor;

  if (element.className !== "controls__color") return;

  $canvasContext.strokeStyle = pickedColor;
  $canvasContext.fillStyle = pickedColor;
}

function handleColorClick(event) {
  const pickedColor = event.target.style.backgroundColor;
  $canvasContext.strokeStyle = pickedColor;
  $canvasContext.fillStyle = pickedColor;
}

function handleInputBrush(event) {
  const brushSize = event.target.value;
  $canvasContext.lineWidth = brushSize;
}

function handleClickMode() {
  if (isFilling) {
    isFilling = false;
    $chooseMode.textContent = "Fill";
  } else {
    isFilling = true;
    $chooseMode.textContent = "Draw";
  }
}

function handleFilledCanvas() {
  if (!isFilling) {
    $canvasContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleClickBack() {
  $saveForm.classList.add(CSS_PROPERTIES.hide);
}

function handleClickSave() {
  const fileName = $inputName.value;
  const image = $canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = fileName;
  link.click();
}
