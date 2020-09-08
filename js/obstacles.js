console.log("link obstacles ok");

class Obstacles {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.color = color;
    this.img = new Image();
    this.img.src = "./assets/background/obstacle_2.png";
  }
  draw() {
    if (!this.img) return;
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
 
  }

}

class Belt extends Obstacles {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    // this.img = new.Image();
    this.img.src = "./assets/background/belt.png";
  }
}
