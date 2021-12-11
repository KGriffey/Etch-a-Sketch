function createGrid(size) {
    // Limit the grid size to 100x100
    if (size > 100) {
        size = 100;
    }

    // Create the grid squares and add them to the main container
    const container = document.querySelector('.grid');
    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.setAttribute('class', 'gridSquare');
        gridSquare.style.width = (100 / size) + "%";
        container.appendChild(gridSquare);
    }
}

function setColor() {
    this.style.backgroundColor = 'black';
}

// Init the grid
createGrid(16);

// Add event listener for grid hover
const squares = document.querySelectorAll('.gridSquare');
squares.forEach(div => {
    div.addEventListener('mouseover', setColor);
});