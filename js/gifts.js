console.log('link gifts ok');



class Gift {
    constructor(name, weight, x, y) {
        this.name = name;
        this.weight = weight; // MAYBE A NEXT FEATURE
        this.img = new Image();
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

    randomGiftX(maxX, minX) {
        let randX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
        let availableX = W;
        aisles.forEach(el => {
            availableX -= el.x + el.w;
        });
        this.x = randX * availableX;
    }

    randomGiftY(maxY, minY) {
        let randY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
        let availableY = H; // H = 600
        aisles.forEach(el => { // Pour chaque obstacle
            availableY -= el.y + el.h; // j'enlève la hauteur de tous les obstacles
        });
        this.y = randY * availableY;
    }

}