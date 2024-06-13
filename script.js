const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const lineWidthPicker = document.getElementById('lineWidthPicker');
const fileName = document.getElementById('fileName');
const fileNameInput = document.getElementById('fileName');
const toggleDarkModeButton = document.getElementById('toggleDarkModeButton');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

colorPicker.addEventListener('change', () => {
    ctx.fillStyle = colorPicker.value;
    ctx.strokeStyle = colorPicker.value;
});

canvasColor.addEventListener('change', () => {
    ctx.fillStyle = canvasColor.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineWidth = lineWidthPicker.value;
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = fileNameInput.value || 'signature.png';
    link.click();
});
toggleDarkModeButton.addEventListener('click', () => {
    toggleDarkMode();
});



// Initial setup
ctx.fillStyle = colorPicker.value;
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = 2;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
