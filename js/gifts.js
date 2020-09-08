console.log("link gifts ok");

class Gift {
  constructor(name, weight, x, y) {
    this.name = name;
    this.weight = weight; // MAYBE A NEXT FEATURE
    this.img = new Image();
    this.srcs = {
      "Bike": "./assets/Gifts/bike-1.png",
      "Car": "./assets/Gifts/car-toy-1.png",
      "Construction Blocks": "./assets/Gifts/construction-block-1.png",
      "Doll": "./assets/Gifts/doll-1.png",
      "Video Game": "./assets/Gifts/video-game.png",
      "Candy": "./assets/Gifts/lollipop-swirl.png",
      "Books": "./assets/Gifts/books.png  ",
      "Hi-Tech Stuff": "./assets/Gifts/pcb.png",
    };
    this.x = x;
    this.y = y;
    this.posArrObst = [];
    this.posArrFree = [];
    this.w = 0;
    this.h = 0;
  }
  giftImg(name) {
    const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
    this.w = 60;
    this.h = this.w / imgRatio;
    this.img.src = this.srcs[name];
    // this.draw()
  }

  draw() {
    if (!this.img) return;
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  randCoordinate(maxX, minX, maxY, minY) {
    this.randomGiftX(maxX, minX);
    this.randomGiftY(maxY, minY);
  }
  randPosA() {
    let randA = Math.floor(Math.random() * (aisleL1.x - this.w - 0 + 1) + 0);
    this.posArrObst.push(randA);
    return randA;
  }

  randPosB() {
    // let randB = Math.floor(Math.random() * (425 - 325 + 1) + 325);
    let randB = Math.floor(
      Math.random() * (belt.x - this.w - (aisleL1.x + aisleL1.w) + 1) +
      (aisleL1.x + aisleL1.w)
    );
    this.posArrObst.push(randB);
    return randB;
  }

  randPosC() {
    // let randC = Math.floor(Math.random() * (575 - 475 + 1) + 475);
    let randC = Math.floor(
      Math.random() * (aisleR1.x - this.w - (belt.x + belt.w) + 1) +
      (belt.x + belt.w)
    );
    this.posArrObst.push(randC);
    return randC;
  }

  randPosD() {
    // let randD = Math.floor(Math.random() * (900 - 825 + 1) + 825);
    let randD = Math.floor(
      Math.random() * (W - this.w - (aisleR1.x + aisleR1.w) + 1) +
      (aisleR1.x + aisleR1.w)
    );
    this.posArrObst.push(randD);
    return randD;
  }

  randPosE() {
    // let randE = Math.floor(Math.random() * (425 - 0 + 1) + 0);
    let randE = Math.floor(Math.random() * (belt.x - this.w + 1));
    this.posArrFree.push(randE);
    return randE;
  }

  randPosF() {
    // let randF = Math.floor(Math.random() * (900 - 475 + 1) + 475);
    let randF = Math.floor(
      Math.random() * (W - this.w - (belt.x + belt.w) + 1) + (belt.x + belt.w)
    );
    this.posArrFree.push(randF);
    return randF;
  }

  randY() {
    // let randX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
    // let randX = Math.floor(Math.random() * (600 - 110 + 1) + 110);
    let randY = Math.floor(Math.random() * (H - this.h - 110 + 1) + 110); // 600 - 50 - 110 + 1 = 441
    return randY;
  }
  randX(array) {
    let randX = Math.floor(Math.random() * array.length);
    return array[randX];
  }
  randPosGift() {
    this.posArrFree = [];
    this.posArrObst = [];
    let randY = this.randY();
    let randA = this.randPosA();
    let randB = this.randPosB();
    let randC = this.randPosC();
    let randD = this.randPosD();
    let randE = this.randPosE();
    let randF = this.randPosF();
    if (randY > belt.y - this.h && randY < belt.y + belt.h) {
      this.x = this.randX(this.posArrObst);
      this.y = randY;
    } else if (randY < belt.y - this.h) {
      this.x = this.randX(this.posArrObst);
      this.y = randY;
    } else if (randY > belt.y + belt.h) {
      this.x = this.randX(this.posArrObst);
      this.y = randY;
    } else {
      this.x = this.randX(this.posArrFree);
      this.y = randY;
    }
  }
}