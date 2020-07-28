console.log("link elves ok");

class Elf {
    constructor(startX, startY) {
        this.x = startX; // where to place Elf on X at the beginnning og the game.
        this.y = startY; // where to place Elf on Y at the beginnning og the game.
        this.img = new Image(); // <img>
        this.srcs = [
            "./assets/character/happy-elf-male-xmazon3.png",
            "./assets/character/happy_elf_male_carrying2.png",
        ];
        this.changeSrc(0); // new Elf()
        this.charge;
        this.speed = 10;
        // this.nextUp = this.y - this.speed;
        // this.nextDown = this.y + this.speed;
        // this.nextRight = this.x - this.speed;
        // this.nextLeft = this.x + this.speed;
        // this.nextX = 0;
        // this.nextY = 0;
        this.lastmove = undefined;
    }
    changeSrc(i) {
        // this.img.onload = () => {
        const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
        this.w = 40;
        this.h = this.w / imgRatio;
        this.img.src = this.srcs[i];
        // this.draw();
        // }
    }
    draw() {
        // ctx.fillRect(this.x, this.y, this.w, this.h);
        if (!this.img) return;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    decay() { // DETECTION DU DEPLACEMENT A CHAQUE INSTANT ET NON PAS A CHAQUE MOUVEMENT
        switch (this.lastmove) {
            case 'up':
                if (theObstacle) {
                    // decalage bas
                    this.y = theObstacle.y + theObstacle.h;
                }
                break;
            case 'down':
                if (theObstacle) {
                    //décalage haut
                    this.y = theObstacle.y - this.h;
                }
                break;
            case 'right':
                if (theObstacle) {
                    this.x = theObstacle.x - this.w;
                }
                break;
            case 'left':
                if (theObstacle) {
                    this.x = theObstacle.x + theObstacle.w;
                }
                break;
        }
    }

    moveUp() {
        this.lastmove = 'up';
        if (this.y < 0) { //-20
            this.y = H + this.y; // 600 -20 = 580
        };
        this.y -= this.speed;
    }
    moveDown() {
        this.lastmove = 'down';
        if (this.y + this.h > H) {
            this.y = this.y % H;
        };
        this.y += this.speed;
    }
    moveRight() {
        this.lastmove = 'right';
        if (this.x + this.w > W) {
            this.x = this.x % W;
        };
        this.x += this.speed;
    }
    moveLeft() {
        this.lastmove = 'left';
        if (this.x < 0) {
            this.x = W + this.x
        };
        this.x -= this.speed;
    }

    collision(obstacle) {
        return (
            this.y + this.h > obstacle.y &&
            this.y < obstacle.y + obstacle.h &&
            this.x + this.w > obstacle.x &&
            this.x < obstacle.x + obstacle.w
        );
    }
}

/* When Elf moves and encounter an obstacle, he must not be able to move further however it should be free to go somewhere else */