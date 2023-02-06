class Cell {

    constructor(randomColor, i, j, gridY, gridX) {
        this.currColor = randomColor;
        this.movedThisTurn = false;
        this.i = i;
        this.j = j;
        this.gridY = gridY;
        this.gridX = gridX;
    }

    getColor() {
        return this.currColor;
    }

    setColor(inputColor) {
        this.currColor = inputColor;
    }

    getMovedThisTurn(){
        return this.movedThisTurn;
    }

    setMovedThisTurn(moved){
        this.movedThisTurn = moved;
    }

    calculateRandomIVal() {
        if (this.i == 0) {
            // at the top.. avoid going up
            return Math.floor(Math.random() * ((this.i + 1) - (this.i) + 1) + (this.i));
        }
        else if (this.i == this.gridY - 1) {
            // at the bottom.. avoid going down
            return Math.floor(Math.random() * ((this.i) - (this.i - 1) + 1) + (this.i - 1));
        }
        else {
            return Math.floor(Math.random() * ((this.i + 1) - (this.i - 1) + 1) + (this.i - 1));
        }
    }

    calculateRandomJVal() {
        if (this.j == this.gridX - 1) {
            // at the bottom.. avoid going down
            return this.j;
        }
        else {
            return this.j + 1;
        }
    }
 
    getRandomNeighbor() {
        var swapI = this.calculateRandomIVal();
        var swapJ = this.calculateRandomJVal();
        return [swapI, swapJ]
    }


}