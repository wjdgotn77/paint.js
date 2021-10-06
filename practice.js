// 강의를 들으며 작성한 기본 기능에 대한 구현 코드입니다.

const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveButton = document.getElementById("jsSave");

const DEFAULT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

// Canvas Default Size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// Context Default
context.fillStyle = "#FFFF";
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
context.strokeStyle = DEFAULT_COLOR;
context.fillStyle = DEFAULT_COLOR;
context.lineWidth = 2.5;

// Flags
let isPainting = false;
let isFilling  = false;

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  //  바로 밑의 이벤트를 "click" 으로 했을 때 드래그되면서 동시에 draw 된 후 fill이 발생해서,
  //  "mousedown" 으로 변경.
  canvas.addEventListener("mousedown", handleClickCanvas);
  canvas.addEventListener("contextmenu", handleContext);
}

if (range) {
  range.addEventListener("input", handleClickRange);
}

if (mode) {
  mode.addEventListener("click", handleClickMode);
}

if (saveButton) {
  saveButton.addEventListener("click", handleClickSave);
}

function handleContext(event) {
  // 마우스 우클릭 막기.
  event.preventDefault();
}

function onMouseMove(event) {
  //  clientX,Y -> 윈도우 전체 범위 내의 마우스 위치값을 나타낸다.
  //  offset -> canvas 내의 좌표.
  const x = event.offsetX;
  const y = event.offsetY;

  if (!isPainting) {
    // 경로를 만들고
    context.beginPath();
    context.moveTo(x, y);
  } else {
    // 그린다.
    context.lineTo(x, y);
    context.stroke();
  }
}

function startPainting() {
  // 같은 로직을 반복해주어야 하기 때문에 함수로 만들어 사용.
  isPainting = true;
}

function stopPainting() {
  // 같은 로직을 반복해주어야 하기 때문에 함수로 만들어 사용.
  isPainting = false;
}

Array.from(colors).forEach(color => {
  color.addEventListener("click", handleColorClick);
});

function handleColorClick(event) {
  const pickedColor = event.target.style.backgroundColor;
  context.strokeStyle = pickedColor;
  context.fillStyle = pickedColor;
}

function handleClickRange(event) {
  const size = event.target.value;
  context.lineWidth = size;
}

function handleClickMode() {
  if (isFilling === true) {
    isFilling = false;
    mode.textContent = "Fill";
  } else {
    isFilling = true;
    mode.textContent = "DRAW";
  }
}

function handleClickCanvas() {
  if (!isFilling) {
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleClickSave() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS🎨";
  link.click();
}
