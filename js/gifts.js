console.log('link gifts ok');



class Gift {
    constructor(name, weight, x, y) {
        this.name = name;
        this.weight = weight; // MAYBE A NEXT FEATURE
        this.img = document.createElement('img');
        // this.srcs = ["./assets/Gifts/bike-1.jpg", "./assets/Gifts/car-toy-1.jpg", "./assets/Gifts/construction-block-1.jpg", "../assets/Gifts/doll-2.png"];
        this.srcs = {
            'Bike': "./assets/Gifts/bike-1.jpg",
            'Car': "./assets/Gifts/car-toy-1.jpg",
            'Construction Blocks': "./assets/Gifts/construction-block-1.jpg",
            'Doll': "./assets/Gifts/doll-2.png",
            'Video Game': "./assets/Gifts/video-game.jpg",
            'Candy': "./assets/Gifts/lollipop-swirl.jpg",
            'Books': "./assets/Gifts/books.webp",
            'Hi-Tech Stuff': "./assets/Gifts/pcb.jpg"
        }
        this.x = x;
        this.y = y;
    }
    giftImg(name) {
        const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
        this.w = 40;
        this.h = this.w / imgRatio;
        this.img.src = this.srcs[name];
        this.draw()
    }

    draw() {
        if (!this.img) return;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
    pickUp(elf) {
        return (this.y + this.h > elf.y &&
            this.y < elf.y + elf.h &&
            this.x + this.w > elf.x &&
            this.x < elf.x + elf.w);
    }
}