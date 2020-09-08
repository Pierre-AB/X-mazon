// Test link
console.log("link script ok");

const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;
var G = 50; // GRID FINE TUNING - ONE SIDE OF A GRID SQUARE
//Gameover image
var gOImage = new Image();
gOImage.src = "./assets/Fun_to_add/gameover.png";
// Gameplay variables
var gameover = false;
var giftList; // object containing the wishlist -> giftList.wishlist is the current game list
var giftArr = []; //Contain all the gift objects invoked.
var santasHood = [];
var belt;
var aisles = [];
var theObstacle;
var happyChild = 0;
var children = [];
var giftX = [100, 750];
var giftY = [190, 290, 390, 490];
// Characters variables
var elfOne;
// Gifts variables
var videoGame;
var hiTech;
var candy;
var books;
var bike;
var car;
var lego;
var doll;
//Time variable
let startedAt;
let endAt = 120000; // 2min per game === 120000

// ########   #######     ###    ########  ########
// ##     ## ##     ##   ## ##   ##     ## ##     ##
// ##     ## ##     ##  ##   ##  ##     ## ##     ##
// ########  ##     ## ##     ## ########  ##     ##
// ##     ## ##     ## ######### ##   ##   ##     ##
// ##     ## ##     ## ##     ## ##    ##  ##     ##
// ########   #######  ##     ## ##     ## ########

const woodFloor = new Image();
woodFloor.src = "./assets/background/Woodfloor_oneimage.jpg";

// ########  ########     ###    ##      ##
// ##     ## ##     ##   ## ##   ##  ##  ##
// ##     ## ##     ##  ##   ##  ##  ##  ##
// ##     ## ########  ##     ## ##  ##  ##
// ##     ## ##   ##   ######### ##  ##  ##
// ##     ## ##    ##  ##     ## ##  ##  ##
// ########  ##     ## ##     ##  ###  ###

function draw() {
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(woodFloor, 0, 0, W, H);
  giftList.draw(); // print wishlist randomly picked on the board

  belt.draw();
  // LEFT AISLE DRAW
  aisleL1.draw();
  aisleL2.draw();
  aisleL3.draw();
  aisleL4.draw();
  aisleL5.draw();
  //RIGHT AISLE DRAW
  aisleR1.draw();
  aisleR2.draw();
  aisleR3.draw();
  aisleR4.draw();
  aisleR5.draw();

  //  ######   #######  ##       ##       ####  ######  ####  #######  ##    ##
  // ##    ## ##     ## ##       ##        ##  ##    ##  ##  ##     ## ###   ##
  // ##       ##     ## ##       ##        ##  ##        ##  ##     ## ####  ##
  // ##       ##     ## ##       ##        ##   ######   ##  ##     ## ## ## ##
  // ##       ##     ## ##       ##        ##        ##  ##  ##     ## ##  ####
  // ##    ## ##     ## ##       ##        ##  ##    ##  ##  ##     ## ##   ###
  //  ######   #######  ######## ######## ####  ######  ####  #######  ##    ##

  //CHECK IF ELF IS STUCK

  theObstacle = undefined;
  aisles.forEach((obstacle) => {
    // ON NE PEUT PAS BREAKER SUR FOR EACH
    if (elfOne.collision(obstacle)) {
      theObstacle = obstacle;
      // console.log(theObstacle);
    }
  });

  // console.log(theObstacle);

  //GIFTS COLLECT + DRAW OBJECTS
  for (let i = 0; i < giftArr.length; i++) {
    if (elfOne.collision(giftArr[i]) && elfOne.charge) {
      console.log("Elf Pick Up");
      elfOne.charge.randPosGift();
      giftArr.push(elfOne.charge);
      elfOne.charge = undefined;
    }

    if (elfOne.collision(giftArr[i])) {
      elfOne.charge = giftArr[i];
      console.log(elfOne.charge);
      giftArr.splice(i, 1);
      // console.log(giftArr);
    }
    if (giftArr[i]) {
      giftArr[i].giftImg(giftArr[i].name);
      giftArr[i].draw();
    }
  }

  // DROPPING GIFT IN santasHood
  if (theObstacle == belt) {
    if (giftList.wishList.indexOf(elfOne.charge) >= 0) {
      santasHood.push(elfOne.charge);
      elfOne.charge = undefined;
    } else if (elfOne.charge) {
      elfOne.charge.randPosGift();
      giftArr.push(elfOne.charge);
      elfOne.charge = undefined;
    } else {
      console.log("no gift");
    }
  }

  // DRAWING SANTASHOOD ON THE BELT
  santasHood.forEach((el, index) => {
    const gift = giftList.wishList.find((gift) => {
      return gift === el;
    });
    gift.h = gift.h / 2;
    gift.x = belt.x + belt.w / 2 - gift.w / 2;
    const i =
      (belt.y + belt.h - santasHood.length * gift.h) / (santasHood.length + 1);
    //300 - (51,15 * 4) /
    gift.y = (index + 1) * i + (index + 2) * gift.h; //+ gift.h;
    gift.giftImg(gift.name);
    // console.log("stop");
    gift.draw();
  });

  elfOne.decay();

  //         H
  // <--------------------->
  //   [ ]  [ ]  [ ]  [ ]
  // --

  // H = 5i+4h
  // i = (H-4h)/5 ----  (125 + 300 - (2 * 50))/2 = 425 - 100 /2 = 162
  // H =
  // 3i+2h (3e y)

  wishListCompleted();
  childDraw();
  //CHANGE ELF IMAGE
  if (elfOne.charge) {
    elfOne.changeSrc(1);
    elfOne.draw();
  } else {
    elfOne.changeSrc(0);
    elfOne.draw();
  }

  //  ######  ##     ## ########   #######  ##    ##  #######
  // ##    ## ##     ## ##     ## ##     ## ###   ## ##     ##
  // ##       ##     ## ##     ## ##     ## ####  ## ##     ##
  // ##       ######### ########  ##     ## ## ## ## ##     ##
  // ##       ##     ## ##   ##   ##     ## ##  #### ##     ##
  // ##    ## ##     ## ##    ##  ##     ## ##   ### ##     ##
  //  ######  ##     ## ##     ##  #######  ##    ##  #######

  const elapsed = new Date().getTime() - startedAt; // 78987 - 50000 = 28987
  if (elapsed < endAt) {
    const seconds = Math.floor((endAt - elapsed) / 1000) % 60; // 78 % 60 -> 18
    const minutes = Math.floor((endAt - elapsed) / 60000); // 1
    ctx.fillStyle = "white";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Remaining time`, 40, 20);
    ctx.fillText("before X-mas:", 45, 41);
    ctx.font = "30px sans-serif";
    ctx.fillText(`${minutes} : ${seconds}`, 47, 76);
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";
  } else {
    gameover = true;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowColor = "black";
    ctx.shadowBlur = 30;
    ctx.drawImage(gOImage, 135, 100);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "black";
    ctx.shadowBlur = 0;
    ctx.fillStyle = "black";
    ctx.fillText(`GAME OVER`, 400, 250);
    ctx.fillText(`You saved ${happyChild} X-mas!`, 380, 280);
    ctx.fillText(`Just few millions more to go...`, 350, 310);
  }

  // designGrid();
} //END DRAW FUNCTION

//  ######  ##     ## #### ##       ########
// ##    ## ##     ##  ##  ##       ##     ##
// ##       ##     ##  ##  ##       ##     ##
// ##       #########  ##  ##       ##     ##
// ##       ##     ##  ##  ##       ##     ##
// ##    ## ##     ##  ##  ##       ##     ##
//  ######  ##     ## #### ######## ########

function childDraw() {
  if (happyChild > 0) {
    let x = 375;
    let y = 30;
    var childImg = 0;
    ctx.fillStyle = "white";
    ctx.font = "16px Sans-Serif";
    ctx.fillText("Happy Children:", 360, 25);
    ctx.fillStyle = "black";
    for (let i = 0; i < happyChild; i++) {
      childImg = i % 4;
      children[childImg].x = x;
      children[childImg].y = y;
      x += 80;
      children[childImg].changeSrc(childImg);
      children[childImg].draw();
    }
  }
}

// ##      ## ####  ######  ##     ## ##       ####  ######  ########     ######   #######  ##     ## ########  ##       ######## ######## ######## ########
// ##  ##  ##  ##  ##    ## ##     ## ##        ##  ##    ##    ##       ##    ## ##     ## ###   ### ##     ## ##       ##          ##    ##       ##     ##
// ##  ##  ##  ##  ##       ##     ## ##        ##  ##          ##       ##       ##     ## #### #### ##     ## ##       ##          ##    ##       ##     ##
// ##  ##  ##  ##   ######  ######### ##        ##   ######     ##       ##       ##     ## ## ### ## ########  ##       ######      ##    ######   ##     ##
// ##  ##  ##  ##        ## ##     ## ##        ##        ##    ##       ##       ##     ## ##     ## ##        ##       ##          ##    ##       ##     ##
// ##  ##  ##  ##  ##    ## ##     ## ##        ##  ##    ##    ##       ##    ## ##     ## ##     ## ##        ##       ##          ##    ##       ##     ##
//  ###  ###  ####  ######  ##     ## ######## ####  ######     ##        ######   #######  ##     ## ##        ######## ########    ##    ######## ########

function wishListCompleted() {
  if (santasHood.length === giftList.wishList.length) {
    happyChild++;
    giftList.wishList = [];
    santasHood = [];
    giftArr = [];
    newGame();
  }
}

// ########  ########  ######  ####  ######   ##    ##     ######   ########  #### ########
// ##     ## ##       ##    ##  ##  ##    ##  ###   ##    ##    ##  ##     ##  ##  ##     ##
// ##     ## ##       ##        ##  ##        ####  ##    ##        ##     ##  ##  ##     ##
// ##     ## ######    ######   ##  ##   #### ## ## ##    ##   #### ########   ##  ##     ##
// ##     ## ##             ##  ##  ##    ##  ##  ####    ##    ##  ##   ##    ##  ##     ##
// ##     ## ##       ##    ##  ##  ##    ##  ##   ###    ##    ##  ##    ##   ##  ##     ##
// ########  ########  ######  ####  ######   ##    ##     ######   ##     ## #### ########

//
//UTILITY FUNCTION FOR BOARD DESIGN PURPOSE
//


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
    ctx.fillText(`${nextRow}`, nextRow + 3, 15);
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

// ##     ##  #######  ##     ## ######## ##     ## ######## ##    ## ########  ######
// ###   ### ##     ## ##     ## ##       ###   ### ##       ###   ##    ##    ##    ##
// #### #### ##     ## ##     ## ##       #### #### ##       ####  ##    ##    ##
// ## ### ## ##     ## ##     ## ######   ## ### ## ######   ## ## ##    ##     ######
// ##     ## ##     ##  ##   ##  ##       ##     ## ##       ##  ####    ##          ##
// ##     ## ##     ##   ## ##   ##       ##     ## ##       ##   ###    ##    ##    ##
// ##     ##  #######     ###    ######## ##     ## ######## ##    ##    ##     ######

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38:
      elfOne.moveUp();
      break;
    case 40:
      elfOne.moveDown();
      break;
    case 37:
      elfOne.moveLeft();
      break;
    case 39:
      elfOne.moveRight();
      break;
  }
});

//    ###    ##    ## #### ##     ##    ##        #######   #######  ########
//   ## ##   ###   ##  ##  ###   ###    ##       ##     ## ##     ## ##     ##
//  ##   ##  ####  ##  ##  #### ####    ##       ##     ## ##     ## ##     ##
// ##     ## ## ## ##  ##  ## ### ##    ##       ##     ## ##     ## ########
// ######### ##  ####  ##  ##     ##    ##       ##     ## ##     ## ##
// ##     ## ##   ###  ##  ##     ##    ##       ##     ## ##     ## ##
// ##     ## ##    ## #### ##     ##    ########  #######   #######  ##

let frames = 0;
let raf;

function animLoop() {
  frames++;
  // console.log(frames);
  draw();
  if (!gameover) {
    raf = requestAnimationFrame(animLoop);
  }
}

//  ######   #### ######## ########  ######     #### ##    ## ##     ##  #######  ##    ## ########
// ##    ##   ##  ##          ##    ##    ##     ##  ###   ## ##     ## ##     ## ##   ##  ##
// ##         ##  ##          ##    ##           ##  ####  ## ##     ## ##     ## ##  ##   ##
// ##   ####  ##  ######      ##     ######      ##  ## ## ## ##     ## ##     ## #####    ######
// ##    ##   ##  ##          ##          ##     ##  ##  ####  ##   ##  ##     ## ##  ##   ##
// ##    ##   ##  ##          ##    ##    ##     ##  ##   ###   ## ##   ##     ## ##   ##  ##
//  ######   #### ##          ##     ######     #### ##    ##    ###     #######  ##    ## ########

function giftInvoke() {
  bike = new Gift("Bike", 10, 100, 190);
  car = new Gift("Car", 20, 100, 290);
  lego = new Gift("Construction Blocks", -5, 100, 390);
  doll = new Gift("Doll", 0, 100, 490);
  videoGame = new Gift("Video Game", 5, 750, 190);
  candy = new Gift("Candy", 35, 750, 290);
  books = new Gift("Books", -5, 750, 390);
  hiTech = new Gift("Hi-Tech Stuff", 5, 750, 490);
  giftArr.push(bike, car, lego, doll, videoGame, candy, books, hiTech);
}

// ##    ## ######## ##      ##  ######      ###    ##     ## ########
// ###   ## ##       ##  ##  ## ##    ##    ## ##   ###   ### ##
// ####  ## ##       ##  ##  ## ##         ##   ##  #### #### ##
// ## ## ## ######   ##  ##  ## ##   #### ##     ## ## ### ## ######
// ##  #### ##       ##  ##  ## ##    ##  ######### ##     ## ##
// ##   ### ##       ##  ##  ## ##    ##  ##     ## ##     ## ##
// ##    ## ########  ###  ###   ######   ##     ## ##     ## ########

function newGame() {
  giftInvoke();
  //randomize position on board.
  for (let i = giftArr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = giftArr[i];
    giftArr[i] = giftArr[j];
    giftArr[j] = temp;
  }

  for (let i = 0; i < 4; i++) {
    giftArr[i].x = 100;
  }

  for (let i = 0; i < 4; i++) {
    var j = Math.floor(Math.random() * (i + 1));
    giftArr[i].y = giftY[i];
  }

  for (let i = 4; i < 8; i++) {
    giftArr[i].x = 750;
  }
  for (let i = 4; i < 8; i++) {
    var j = Math.floor(Math.random() * (i + 1));
    giftArr[i].y = giftY[i - 4];
  }

  //create a new random wishList containing objects
  giftList.newWishList();
}

//  ######  ########    ###    ########  ########     ######      ###    ##     ## ########
// ##    ##    ##      ## ##   ##     ##    ##       ##    ##    ## ##   ###   ### ##
// ##          ##     ##   ##  ##     ##    ##       ##         ##   ##  #### #### ##
//  ######     ##    ##     ## ########     ##       ##   #### ##     ## ## ### ## ######
//       ##    ##    ######### ##   ##      ##       ##    ##  ######### ##     ## ##
// ##    ##    ##    ##     ## ##    ##     ##       ##    ##  ##     ## ##     ## ##
//  ######     ##    ##     ## ##     ##    ##        ######   ##     ## ##     ## ########

function startGame() {
  if (raf) {
    cancelAnimationFrame(raf);
  }
  gameover = false;
  //INVOKE ALL OBJECTS
  //INVOKE ELVES
  elfOne = new Elf(350, 200);
  //INVOKE NEW WISHLIST
  giftList = new Wishlist(); //invoke new wishlist object.

  //CENTER BELT INVOKE
  belt = new Belt(425, 175, 50, 300, "orange");
  //LEFT AISLES INVOKE
  aisleL1 = new Obstacles(75, 150, 250, 25, "blue");
  aisleL2 = new Obstacles(75, 250, 250, 25, "blue");
  aisleL3 = new Obstacles(75, 350, 250, 25, "blue");
  aisleL4 = new Obstacles(75, 450, 250, 25, "blue");
  aisleL5 = new Obstacles(75, 550, 250, 25, "blue");
  //RIGHT AISLES INVOKE
  aisleR1 = new Obstacles(575, 150, 250, 25, "blue");
  aisleR2 = new Obstacles(575, 250, 250, 25, "blue");
  aisleR3 = new Obstacles(575, 350, 250, 25, "blue");
  aisleR4 = new Obstacles(575, 450, 250, 25, "blue");
  aisleR5 = new Obstacles(575, 550, 250, 25, "blue");
  //PUSH AISLES IN ARRAY TO ITERATE ON EACH
  aisles.push(
    belt,
    aisleL1,
    aisleL2,
    aisleL3,
    aisleL4,
    aisleL5,
    aisleR1,
    aisleR2,
    aisleR3,
    aisleR4,
    aisleR5
  );

  //GIFT INVOKE
  giftInvoke();
  //create a new random wishList containing objects
  giftList.newWishList();
  //Child scoring invoke
  child1 = new child();
  child2 = new child();
  child3 = new child();
  child4 = new child();
  children.push(child1, child2, child3, child4);
  //GAME START TIME
  startedAt = new Date().getTime();

  raf = requestAnimationFrame(animLoop);
  // drawBoard();
  draw();
  animLoop();
}

//INTRO WINDOW

ctx.fillStyle = "white";
ctx.fillRect(0, 0, W, H);
ctx.fillStyle = "orange";
ctx.font = "20px Sans-serif";
ctx.fillText(
  "Help Xanta's elf to fullfil the maximum of children's wishlists.",
  200,
  100
);
ctx.fillText("Pick-up gifts and drop them on the warehouse belt.", 235, 130);
ctx.fillText("Use your keyboard arrows!", 330, 230);
ctx.fillText("That's X-mas, gifts may have some tricks!", 260, 300);
ctx.fillStyle = "black";
ctx.font = "16px Sans-serif";
// designGrid();

// START GAME
var btn = document.getElementById("startGame");
btn.addEventListener("click", () => {
  document.getElementById("audio").play();
  ctx.clearRect(0, 0, W, H);
  startGame();
});