function createGrid() {
    // Create the grid gridSquares and add them to the main container
    const container = document.querySelector('.grid');
    const gridSquareWidth = (100 / gridSize) + "%";

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.setAttribute('class', 'gridSquare');
        gridSquare.style.width = gridSquareWidth
        gridSquare.style.backgroundColor = 'transparent';
        container.appendChild(gridSquare);
    }

    // Add event listener for grid hover
    const gridSquares = document.querySelectorAll('.gridSquare');
    gridSquares.forEach(div => {
        div.addEventListener('mouseover', setColor);
    });
}

function setColor() {
    // If the grid square hasn't been filled yet, fill it
    if(this.style.backgroundColor === 'transparent'){
        this.style.backgroundColor = gridColor;
    }
}

function toggleColor() {
    const colorBtn = document.querySelector('.controls .color')
    
    if(gridColor === 'black'){
        colorBtn.style.backgroundColor = 'cyan';
        gridColor = 'red';

    } else{
        colorBtn.style.backgroundColor = '#e9e9ed';
        gridColor = 'black';
    }
}

function parseButton() {
    if (this.className === 'clear') {
        clearGrid();
    } else if (this.className === 'new') {
        newGrid();
    } else if (this.className === 'color') {
        toggleColor();
    }
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

function newGrid() {
    //Remove existing grid
    removeGrid();

    // Create new grid
    createGrid();
}

let gridColor = 'black';

// Add dynamic slider functionality, default value is 16. [room for a separate event handler & function here?]
const gridSlider = document.getElementById('gridSlider');
const gridSliderValue = document.getElementById('gridSliderValue');
gridSlider.value = 16;
gridSliderValue.textContent = gridSlider.value;
let gridSize = gridSlider.value;
gridSlider.oninput = function () {
    gridSize = this.value;
    gridSliderValue.textContent = this.value;
}

// Add event listener for buttons
const buttons = document.querySelectorAll('.controls button');
buttons.forEach(button => {
    button.addEventListener('click', parseButton);
});

// Init the base grid on page load
createGrid();