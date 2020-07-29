// Test link
console.log("link script ok");

const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;
var G = 50; // GRID FINE TUNING - ONE SIDE OF A GRID SQUARE
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
let endAt = 1200000; // 2min per game === 120000

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
    ctx.clearRect(0, 0, W, H); // --???-- A BIT HARDCORE NO ??
    ctx.drawImage(woodFloor, 0, 0, W, H);
    giftList.draw(); // print wishlist randomly picked on the board
    // ctx.fillRect(0, 0, 100, 100);
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
        ctx.font = "30px sans-serif";
        ctx.fillText(`${minutes} : ${seconds}`, 760, 50);
        ctx.fillStyle = "black";
        ctx.font = "16px sans-serif";
    } else {
        // ctx.fillText(`gameover`, 760, 50);
        gameover = true;
    }
    //debugger;
    // ctx.fillRect(200, 200, 100, 100);

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
            console.log("PASSE PAR LA");
            elfOne.charge.draw();
            elfOne.charge = undefined;
        }

        if (elfOne.collision(giftArr[i])) {
            elfOne.charge = giftArr[i];
            // elfOne.changeSrc(1); // A CHANGER EN FONCTION DE this.charge
            // console.log(elfOne.img.src);
            console.log(elfOne.charge);
            giftArr.splice(i, 1);
            // console.log(giftArr);
        }
        if (giftArr[i]) {
            giftArr[i].giftImg(giftArr[i].name);
            giftArr[i].draw();
        }
        elfOne.changeSrc(0);
    }



    // DROPPING GIFT IN santasHood
    if (theObstacle == belt) {
        // ctx.fillRect(400, 100, 100, 100);
        if (giftList.wishList.indexOf(elfOne.charge) >= 0) {
            santasHood.push(elfOne.charge);
            elfOne.charge = undefined;
        } else {
            console.log("not selected toy");
        }
    }

    // DRAWING SANTASHOOD
    santasHood.forEach((el, index) => {
        // Ajouter des objets dans un tableau au lieu de string.
        const gift = giftList.wishList.find((gift) => {
            return gift === el;
        });
        gift.x = belt.x - belt.w / 2 - gift.w / 2;
        const i = (belt.h - santasHood.length * gift.h) / santasHood.length + 1;
        gift.y = (index + 1) * i + index * gift.h;
        gift.giftImg(gift.name);
        console.log("stop");
        // ctx.fillRect(0, 0, 100, 100);
        gift.draw(); // -----????----- NE FONCTIONNE PAS
        console.log(index, gift.x, gift.y, );
    });

    // ctx.fillRect(200, 100, 100, 100);

    elfOne.decay();

    //         H
    // <--------------------->
    //   [ ]  [ ]  [ ]  [ ]
    // --

    // H = 5i+4h
    // i = (H-4h)/5
    // H =
    // 3i+2h (3e y)

    wishListCompleted();

    //IMPROVE DRAW FUNCTION IN ELF OBJECT
    if (elfOne.charge) {
        elfOne.changeSrc(1);
        elfOne.draw();
    } else {
        elfOne.changeSrc(0);
        elfOne.draw();
    }


    // Enlever la valeur de l'objet picked-up dans giftArr
    // Changer l'image de l'elf en fonction de la valeur de this.charge
    // ATTENTION: si plus d'objet, l'elf n'est plus affiché
    // elf-> lastStatus to order

    // designGrid();
} //END DRAW FUNCTION



//  ######  ##     ## #### ##       ########  
// ##    ## ##     ##  ##  ##       ##     ## 
// ##       ##     ##  ##  ##       ##     ## 
// ##       #########  ##  ##       ##     ## 
// ##       ##     ##  ##  ##       ##     ## 
// ##    ## ##     ##  ##  ##       ##     ## 
//  ######  ##     ## #### ######## ########  




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
        if (happyChild > 0) {
            let x = 475;
            let y = 25;
            for (let i = 0; i <= happyChild; i++) {
                children[i].x = x;
                children[i].y = y;
                x -= 70
                children[i].changeSrc(i);
                children[i].draw();
            }
        }
        giftList.wishList = [];
        santasHood = [];
        giftList.newWishList();
        // giftArr.push(bike, car, lego, doll, videoGame, candy, books, hiTech);
        // giftArr.forEach(el => {
        //     el.randCoordinate(W - el.w, 0, H - el.h, 0);
        // })
    }
}




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



// ########     ###    ##    ## ########     ########   #######   ######
// ##     ##   ## ##   ###   ## ##     ##    ##     ## ##     ## ##    ##
// ##     ##  ##   ##  ####  ## ##     ##    ##     ## ##     ## ##
// ########  ##     ## ## ## ## ##     ##    ########  ##     ##  ######
// ##   ##   ######### ##  #### ##     ##    ##        ##     ##       ##
// ##    ##  ##     ## ##   ### ##     ##    ##        ##     ## ##    ##
// ##     ## ##     ## ##    ## ########     ##         #######   ######


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
    bike = new Gift("Bike", 0, 100, 200);
    car = new Gift("Car", 0, 100, 300);
    lego = new Gift("Construction Blocks", 0, 100, 400);
    doll = new Gift("Doll", 0, 100, 500);
    videoGame = new Gift("Video Game", 0, 750, 200);
    candy = new Gift("Candy", 0, 750, 300);
    books = new Gift("Books", 0, 750, 400);
    hiTech = new Gift("Hi-Tech Stuff", 0, 750, 500);
    //PUSH GIFTS IN ARRAY TO ITERATE ON EACH
    giftArr.push(bike, car, lego, doll, videoGame, candy, books, hiTech);
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

startGame();

// ON CLICK DOWN ==> method pour guider en maintenant cliqué les elfs.

/*

Elf should go into an aisle to pick up a gift written on the list.
And then drop them on the belt.

1 - Make gift appear on the right place
2 - Test for each gift if Elf is on it or not
    In order to create this, we need to iterate on each gift to know if the Elf is not on it.
3 - change Elf image.


Gift location can be shuffled every 15 seconds.

Or

Elf should run on gifts which appeared randomly on the board and bring them to the belt.


*/