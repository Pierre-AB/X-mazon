function test() {
    console.log('link elves ok');
}
test()

class Elf {
    constructor(startX, startY) {
        this.startX = startX; // where to place Elf on X at the beginnning og the game.
        this.startY = startY; // where to place Elf on Y at the beginnning og the game.
        const imgElfEmpty = document.createElement('img');
        const imgElfLoaded = document.createElement('img');
        imgElfEmpty.onload = () => { // HOW TO DO NOT REPEAT MYSELF
            //POSSIBILITY TO PLACE THEM IN AN ARRAY ?
            this.imgElfEmpty = imgElfEmpty
            const imgRatio = imgElfEmpty.naturalWidth / imgElfEmpty.naturalHeight;
            this.w = 50;
            this.h = this.w / imgRatio;
            this.drawEmpty()
        }
        imgElfLoaded.onload = () => {
            this.imgElfEmpty = imgElfLoaded
            const imgRatio = imgElfEmpty.naturalWidth / imgElfEmpty.naturalHeight;
            this.w = 50;
            this.h = this.w / imgRatio;
            this.draw();
        }
        imgElfEmpty.src = "../assets/character/happy elf male.jpg";
        imgElfLoaded.src = "../assets/character/happy elf male loaded.jpg";
    }
    drawEmpty() {
        if (!this.imgElfEmpty) return;
        ctx.drawImage(this.imageElfEmpty, this.startX, this.startY, this.w, this.h);
    };
    drawLoaded() {
        if (!this.imgElfLoaded) return;
        ctx.drawImage(this.imageElfLoaded, this.startX, this.startY, this.w, this.h);
    }
}