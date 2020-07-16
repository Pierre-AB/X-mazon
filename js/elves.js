class Elf {
    constructor(startX, startY) {
        this.startX = startX; // where to place Elf on X at the beginnning og the game.
        this.startY = startY; // where to place Elf on Y at the beginnning og the game.
        const imgElfEmpty = document.createElement('img');
        const imgElfLoaded = docuement.createElement('img');
        imgElfEmpty.onload = () => { // HOW TO DO NOT REPEAT MYSELF
            const imgRatio = imgElfEmpty.naturalWidth / imgElfEmpty.naturalHeight;
            this.w = 50;
            this.h = this.w / imgRatio;
            this.draw()
        }
        imgElfLoaded.onload = () => {
            const imgRatio = imgElfEmpty.naturalWidth / imgElfEmpty.naturalHeight;
            this.w = 50;
            this.h = this.w / imgRatio;
            this.draw();
        }
        imgElfEmpty.src = "../assets/character/happy elf male.jpg";
        imgElfLoaded.src = "../assets/character/happy elf male loaded.jpg";
    }
    draw() {};
}