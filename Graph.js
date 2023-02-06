const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

var grid = [];
var oneBlockSize = 20;
var fps = 30;
var gridY = Math.floor(canvas.height / oneBlockSize);
var gridX = Math.floor(canvas.width / oneBlockSize);


let gameLoop = () => {
    updateGrid();
    drawCells();
};

randomColor = () => {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
}

getSizeOfBrowser = () => {
    var size = {
        width: canvas.width,
        height: canvas.height
    }
    return size;
}

let drawCells = () => {
    for (let i = 0; i < this.gridY; i++) {
        for (let j = 0; j < this.gridX; j++) {
            createRect(
                j * oneBlockSize,
                i * oneBlockSize,
                oneBlockSize / 1.1,
                oneBlockSize / 1.1,
                this.grid[i][j].getColor());
        }
    }
};

let createGrid = (length, height) => {
    for (let i = 0; i < this.gridY; i++) {
        this.grid[i] = [];
        for (let j = 0; j < this.gridX; j++) {
            var cell = new Cell(randomColor(), i, j, this.gridY, this.gridX);
            this.grid[i][j] = cell;
        }
    }
}

createGrid(canvas.width, canvas.height);

let updateGrid = () => {
    var swapCount = 0;
    for (let i = 0; i < this.gridY; i++) {
        for (let j = 0; j < this.gridX - 1; j++) {
            var swapNeighborVals = this.grid[i][j].getRandomNeighbor();
            var swapNeighbor = this.grid[swapNeighborVals[0]][swapNeighborVals[1]];
            // ensure self and given neighbor only change once per cycle
            if (this.grid[i][j].getMovedThisTurn() || swapNeighbor.getMovedThisTurn()) {
                continue; // skip
            }
            var currColor = this.grid[i][j].getColor().replace("#", "");
            var neighborColor = swapNeighbor.getColor().replace("#", "");
            if (currColor.localeCompare(neighborColor, undefined, { numeric: true }) > 0) {
                this.grid[i][j].setColor("#" + neighborColor);
                swapNeighbor.setColor("#" + currColor);
                // mark both as moved this turn
                this.grid[i][j].setMovedThisTurn(true);
                swapNeighbor.setMovedThisTurn(true);
                // increment the swap counter
                swapCount++
            } else {
                console.log("winner is neighborColor");
            }
        }
    }
    // once update cycle is complete.. reset all moved booleans for next turn
    for (let i = 0; i < this.gridY; i++) {
        for (let j = 0; j < this.gridX - 1; j++) {
            this.grid[i][j].setMovedThisTurn(false);
        }
    }
    if(swapCount == 0){
        createGrid(canvas.width, canvas.height);
    }
}

let gameInterval = setInterval(gameLoop, 1000/fps);