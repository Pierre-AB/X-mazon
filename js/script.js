const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;

function test() {
    console.log('link script ok');
}

//UTILITY FUNCTION FOR BOARD DESIGN PURPOSE
function designGrid() {
    var g = 50 // GRID FINE TUNING
    var nextRow = 0;
    var nextCol = 0;
    // DRAW VERTICAL DASHED LINES
    for (let i = 0; i < W / g; i++) {
        nextRow = nextRow + g;
        ctx.beginPath();
        ctx.setLineDash([3, 15]);
        ctx.moveTo(nextRow, 0);
        ctx.fillText(`${nextRow}`, nextRow + 3, 10);
        ctx.lineTo(nextRow, H);
        ctx.stroke();
        ctx.closePath();
    }
    // DRAW HORIZONTAL DASHED LINES
    for (let i = 0; i < H / g; i++) {
        nextCol = nextCol + g;
        ctx.beginPath();
        ctx.setLineDash([3, 15]);
        ctx.moveTo(0, nextCol);
        ctx.fillText(`${nextCol}`, 3, nextCol - 3);
        ctx.lineTo(W, nextCol);
        ctx.stroke();
        ctx.closePath();
    }
}


test();
designGrid();