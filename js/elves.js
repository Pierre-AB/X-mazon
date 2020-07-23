console.log('link elves ok');



class Elf {
    constructor(startX, startY) {
        this.x = startX; // where to place Elf on X at the beginnning og the game.
        this.y = startY; // where to place Elf on Y at the beginnning og the game.
        this.img = document.createElement('img'); // <img>
        this.srcs = ["./assets/character/happy-elf-male.png", "./assets/character/happy_elf_male_loaded.png"];
        this.changeSrc(0) // new Elf()
        this.charge = "";
        this.speed = 10;
        this.nextX = this.x + this.speed;
        this.nextY = this.y + this.speed;
    }
    changeSrc(i) {
        // this.img.onload = () => {
        const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
        this.w = 40;
        this.h = this.w / imgRatio;
        this.img.src = this.srcs[i];
        this.draw()
        // }

    }
    draw() {
        if (!this.img) return;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };

    moveUp() {
        if (!stuck) {
            this.y -= this.speed;
        }
    }
    moveDown() {
        if (!stuck) {
            this.y += this.speed;
        }
    }
    moveRight() {
        if (!stuck) {
            this.x += this.speed;
        }
    }
    moveLeft() {
        if (!stuck) {
            this.x -= this.speed;
        }
    }

    collision(obstacle) {
        return (this.y + this.h > obstacle.y &&
            this.y < obstacle.y + obstacle.h &&
            this.x + this.w > obstacle.x &&
            this.x < obstacle.x + obstacle.w);
    }
}