console.log("link wishlist ok");

// function random() { // Random only on wishlist length
//     let randNum = Math.floor(Math.random() * Wishlist.gifts.length);
//     return randNum;
// }

class Wishlist {
    constructor() {
        this.x = 600;
        this.y = 25;
        this.gifts = ['Car', 'Bike', 'Video Game', 'Candy', 'Dolls', 'Construction Blocks', 'Books', 'Hi-Tech Stuff'];
        this.wishList = [];
        this.img = new Image();
        this.img.src = "./assets/background/santa-wishlist.png";

    }

    draw() {
        var nextItem = 0;
        ctx.font = "16px sans-serif";
        ctx.fillStyle = "white";
        this.wishList.forEach((el) => {
            ctx.fillText(el, this.x, this.y + nextItem);
            nextItem += 20;
        })
    }

    newWishList() {
        var shuffledWishList = this.gifts.sort(function (a, b) {
            return Math.random() - 0.5;
        });
        for (let i = 0; i < 4; i++) {
            this.wishList.push(shuffledWishList[i]);
        }
        return this.wishList;
    }

}