console.log("link wishlist ok");

class Wishlist {
    constructor() {
        this.x = 195;
        this.y = 23;
        this.w = 150;
        this.gifts = ['Car', 'Bike', 'Video Game', 'Candy', 'Doll', 'Construction Blocks', 'Books', 'Hi-Tech Stuff'];
        this.wishList = [];
        this.img = new Image();

    }

    draw() {
        var nextItem = 0;
        ctx.fillStyle = "black";
        ctx.strokeRect(190, 5, 155, 100);
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