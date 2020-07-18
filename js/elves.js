console.log('link elves ok');



class Elf {
    constructor(startX, startY) {
        this.startX = startX; // where to place Elf on X at the beginnning og the game.
        this.startY = startY; // where to place Elf on Y at the beginnning og the game.

        this.img = document.createElement('img'); // <img>
        this.srcs = ["./assets/character/happy-elf-male.jpg", "./assets/character/happy_elf_male_loaded.jpg"];

        this.changeSrc(0) // new Elf()
    }
    changeSrc(i = 0) {
        this.img.onload = () => {
            const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
            this.w = 50;
            this.h = this.w / imgRatio;

            this.draw()
        }
        this.img.src = this.srcs[i];
    }
    draw() {
        if (!this.img) return;
        ctx.drawImage(this.img, this.startX, this.startY, this.w, this.h);
    };
}