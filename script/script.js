function randomRGB() {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);

    return `rgb(${R}, ${G}, ${B})`;
}

/* Global color variable functions */
function getColor() {
    return color;
}

function setColor(boolean) {
    color = boolean;
}

function toggleColor() {
    setColor(!getColor());
    const colorBtn = document.querySelector('.controls .color');
    if (color === false) {
        //colorBtn.style.backgroundColor = '#b5b5b5';
        colorBtn.style.backgroundImage = ''
    } else {
        //colorBtn.style.backgroundColor = '#00e0f0';
        colorBtn.style.backgroundImage = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
    }
}

/* Global draw variable functions */
function initDraw() {
    const grid = document.querySelector('.grid');
    grid.addEventListener('click', toggleDraw);
}

function getDraw() {
    return draw;
}

function setDraw(boolean) {
    draw = boolean;
}

function toggleDraw() {
    setDraw(!getDraw());
}

/* Button functions */
function initCtrlButtons() {
    const ctrlButtons = document.querySelectorAll('.controls button');
    ctrlButtons.forEach(button => {
        button.addEventListener('click', parseCtrlButton);
    });
}

function parseCtrlButton() {
    // Execute function depending on button clicked
    if (this.className === 'clear') {
        clearGrid();
    } else if (this.className === 'new') {
        newGrid();
    } else if (this.className === 'color') {
        toggleColor();
    }
}

/* Grid creation and manipulation */
function createGrid() {
    // Create the grid gridSquares and add them to the main container
    const size = getGridSize();
    const container = document.querySelector('.grid');
    const gridSquareWidth = (100 / size) + "%";

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.setAttribute('class', 'gridSquare');
        gridSquare.style.width = gridSquareWidth
        gridSquare.style.backgroundColor = 'transparent';
        container.appendChild(gridSquare);
    }

    // Add event listener for grid hover
    const gridSquares = document.querySelectorAll('.gridSquare');
    gridSquares.forEach(div => {
        div.addEventListener('mouseover', fillGridSquare);
    });
}

function clearGrid() {
    // Clear each grid square
    const gridSquares = document.querySelectorAll('.gridSquare');
    gridSquares.forEach(div => {
        div.style.backgroundColor = 'transparent';
    });
}

function removeGrid() {
    // Remove an existing grid
    const container = document.querySelector('.grid');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function initGrid() {
    initGridSlider();
    setGridSize(getGridSliderValue());
    initCtrlButtons();
    initDraw();
    createGrid();
}

function newGrid() {
    //Remove existing grid
    removeGrid();

    // Create new grid
    createGrid();
}

function fillGridSquare() {
    // If the grid square hasn't been filled yet, fill it
    if (this.style.backgroundColor === 'transparent' && getDraw() === true) {
        // Fill with black or color
        if (getColor() === false) {
            this.style.backgroundColor = 'black';
        } else {
            this.style.backgroundColor = randomRGB();
        }
    }
}

/* Grid size functions */
function getGridSize() {
    return gridSize;
}

function setGridSize(size) {
    gridSize = size;
}

function updateGridSize() {
    setGridSize(this.value);
    setGridSliderText(this.value);
}

/* Grid slider functions */
function initGridSlider() {
    const gridSlider = document.getElementById('gridSlider');
    gridSlider.addEventListener('input', updateGridSize);

    setGridSliderText(gridSlider.value);
}

function getGridSliderValue() {
    const gridSlider = document.getElementById('gridSlider');
    return gridSlider.value;
}

function setGridSliderText(value) {
    const gridSliderText = document.getElementById('gridSliderText');
    gridSliderText.textContent = 'Grid: ' + value + ' x ' + value;
}

/* Main */
let color = false;
let draw = false;
let gridSize = 16;

initGrid();