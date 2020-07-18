console.log('link gifts ok');



class Gift {
    constructor(name, imageLink, weight, x, y) {
        this.name = name;
        this.weight = weight; // MAYBE A NEXT FEATURE
        const giftImage = document.createElement('img');
        this.x = x;
        this.y = y;
        giftImage.onload = () => {
            this.giftImage = giftImage;
            const imgRatio = giftImage.naturalWidth / giftImage.naturalHeight;
            this.w = 100; // TO BE CHANGED ACCORDING TO THE BOARD
            this.h = this.w / imgRatio;
            this.draw()
        }
        giftImage.src = imageLink;
    }
    draw() {
        if (!this.giftImage) return;
        ctx.drawImage(this.giftImage, this.x, this.y, this.w, this.h);

    }
}