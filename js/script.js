// Test link
console.log('link script ok');

const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;
var G = 50; // GRID FINE TUNING - ONE SIDE OF A GRID SQUARE
// Gameplay variables
var gameover = false;

// Characters variables
var elfOne;


// ########   #######     ###    ########  ########  
// ##     ## ##     ##   ## ##   ##     ## ##     ## 
// ##     ## ##     ##  ##   ##  ##     ## ##     ## 
// ########  ##     ## ##     ## ########  ##     ## 
// ##     ## ##     ## ######### ##   ##   ##     ## 
// ##     ## ##     ## ##     ## ##    ##  ##     ## 
// ########   #######  ##     ## ##     ## ########  

function drawBoard() {
    const woodFloor = new Image();
    woodFloor.onload = () => {
        for (var i = 0; i < (H / G); i++) {
            for (var j = 0; j < (W / G); j++) {
                ctx.drawImage(woodFloor, j * G, i * G, 5 * G, 5 * G); //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas - PERF OPTIMISATION SCALE OUT OF DRAW IMAGE 
            }
        }
        designGrid();
    }
    woodFloor.src = "./assets/background/woodfloor 1000x1000.jpg";
}

// ##      ## ####  ######  ##     ## ##       ####  ######  ######## 
// ##  ##  ##  ##  ##    ## ##     ## ##        ##  ##    ##    ##    
// ##  ##  ##  ##  ##       ##     ## ##        ##  ##          ##    
// ##  ##  ##  ##   ######  ######### ##        ##   ######     ##    
// ##  ##  ##  ##        ## ##     ## ##        ##        ##    ##    
// ##  ##  ##  ##  ##    ## ##     ## ##        ##  ##    ##    ##    
//  ###  ###  ####  ######  ##     ## ######## ####  ######     ##    


function drawWishList() {

}

// ########  ########     ###    ##      ## 
// ##     ## ##     ##   ## ##   ##  ##  ## 
// ##     ## ##     ##  ##   ##  ##  ##  ## 
// ##     ## ########  ##     ## ##  ##  ## 
// ##     ## ##   ##   ######### ##  ##  ## 
// ##     ## ##    ##  ##     ## ##  ##  ## 
// ########  ##     ## ##     ##  ###  ###  

function draw() {
    elfOne.changeSrc(0);
}


// drawGame(); <===== to be removed 

// ########  ########  ######  ####  ######   ##    ##     ######   ########  #### ########  
// ##     ## ##       ##    ##  ##  ##    ##  ###   ##    ##    ##  ##     ##  ##  ##     ## 
// ##     ## ##       ##        ##  ##        ####  ##    ##        ##     ##  ##  ##     ## 
// ##     ## ######    ######   ##  ##   #### ## ## ##    ##   #### ########   ##  ##     ## 
// ##     ## ##             ##  ##  ##    ##  ##  ####    ##    ##  ##   ##    ##  ##     ## 
// ##     ## ##       ##    ##  ##  ##    ##  ##   ###    ##    ##  ##    ##   ##  ##     ## 
// ########  ########  ######  ####  ######   ##    ##     ######   ##     ## #### ########  


//UTILITY FUNCTION FOR BOARD DESIGN PURPOSE
function designGrid() {
    var dash = 3; // Dash size
    var gap = 15; // Gap btw dash size
    var nextRow = 0;
    var nextCol = 0;
    // DRAW VERTICAL DASHED LINES
    for (let i = 0; i < W / G; i++) {
        nextRow = nextRow + G;
        ctx.beginPath();
        ctx.setLineDash([dash, gap]);
        ctx.moveTo(nextRow, 0);
        ctx.fillText(`${nextRow}`, nextRow + 3, 10);
        ctx.lineTo(nextRow, H);
        ctx.stroke();
        ctx.closePath();
    }
    // DRAW HORIZONTAL DASHED LINES
    for (let i = 0; i < H / G; i++) {
        nextCol = nextCol + G;
        ctx.beginPath();
        ctx.setLineDash([dash, gap]);
        ctx.moveTo(0, nextCol);
        ctx.fillText(`${nextCol}`, 3, nextCol - 3);
        ctx.lineTo(W, nextCol);
        ctx.stroke();
        ctx.closePath();
    }
}

//    ###    ##    ## #### ##     ##    ##        #######   #######  ########  
//   ## ##   ###   ##  ##  ###   ###    ##       ##     ## ##     ## ##     ## 
//  ##   ##  ####  ##  ##  #### ####    ##       ##     ## ##     ## ##     ## 
// ##     ## ## ## ##  ##  ## ### ##    ##       ##     ## ##     ## ########  
// ######### ##  ####  ##  ##     ##    ##       ##     ## ##     ## ##        
// ##     ## ##   ###  ##  ##     ##    ##       ##     ## ##     ## ##        
// ##     ## ##    ## #### ##     ##    ########  #######   #######  ##        

//ANIMATION LOOP
let frames = 0;
let raf;

function animLoop() {
    frames++;
    // console.log(frames);
    draw()
    if (!gameover) {
        raf = requestAnimationFrame(animLoop);
    }
}

function startGame() {
    if (raf) {
        cancelAnimationFrame(raf);
    }
    elfOne = new Elf(300, 150);
    raf = requestAnimationFrame(animLoop);
    drawBoard();
    draw();
    animLoop();
}

startGame();
// animLoop()


// ON CLICK DOWN ==> method pour guider en maintenant cliqué les elfs.