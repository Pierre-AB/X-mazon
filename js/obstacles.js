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
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.fillStyle = "black";
  }
  // collision(elf) {
  //     return (this.y + this.h > elf.y &&
  //         this.y < elf.y + elf.h &&
  //         this.x + this.w > elf.x &&
  //         this.x < elf.x + elf.w);
  // }
}

class Belt extends Obstacles {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    // this.img = new.Image();
    this.img.src = "./assets/background/belt.png";
  }
}
