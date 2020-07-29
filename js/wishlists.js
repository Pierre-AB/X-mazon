console.log("link wishlist ok");

// function random() { // Random only on wishlist length
//     let randNum = Math.floor(Math.random() * Wishlist.gifts.length);
//     return randNum;
// }

class Wishlist {
    constructor() {
        this.x = 195;
        this.y = 23;
        this.w = 150;
        this.gifts = ['Car', 'Bike', 'Video Game', 'Candy', 'Doll', 'Construction Blocks', 'Books', 'Hi-Tech Stuff'];
        this.wishList = [];
        this.img = new Image();
        // this.img.src = "./assets/background/santa-wishlist.png";

    }

    draw() {
        var nextItem = 0;
        //IMPROVE WISHLIST GAME DISPLAY
        // const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
        // ctx.drawImage(this.img, 550, 5, this.w, this.w / imgRatio);
        ctx.fillStyle = "orange";
        ctx.fillRect(190, 5, 155, 100); //SIZE OF WISHLIST PAD
        ctx.fillStyle = "white";
        ctx.font = "16px sans-serif";
        this.wishList.forEach((el) => {
            ctx.fillText(el.name, this.x, this.y + nextItem);
            nextItem += 23;
        })
    }

    newWishList() {
        var shuffledWishList = giftArr.sort(function (a, b) {
            return Math.random() - 0.5;
        });
        for (let i = 0; i < 4; i++) {
            this.wishList.push(shuffledWishList[i]);
        }
        return this.wishList;
    }

}