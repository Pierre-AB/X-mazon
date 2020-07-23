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
        this.nextUp = this.y - this.speed;
        this.nextDown = this.y + this.speed;
        this.nextRight = this.x - this.speed;
        this.nextLeft = this.x + this.speed;
        this.nextX = 0;
        this.nextY = 0;
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

        // OPTION DE FAIRE UN ARRAY DE TOUTES LES COORDONNEES DOWN
        //_____
        // aisles.
        //     }
        // })

        // this.nextX = this.x;
        // this.nextY = this.nextUp;
        // if (this.collisionDetection(this.nextX, this.nextY, obstacle)) {
        //     return console.log("can't move up");
        // }
        //_____
        this.y -= this.speed;
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


/* When Elf moves and encounter an obstacle, he must not be able to move further however it should be free to go somewhere else */