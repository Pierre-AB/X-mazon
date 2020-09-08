console.log("link children ok");

class child {
    constructor() {
        this.x = 475;
        this.y = 32;
        this.w = 50;
        this.h;
        this.img = new Image();
        this.srcs = ["./assets/Fun_to_add/HappyChild1.png",
            "./assets/Fun_to_add/HappyChild2.png",
            "./assets/Fun_to_add/HappyChild3.png",
            "./assets/Fun_to_add/HappyChild4.png"
        ]
        this.changeSrc(0);
    }
    changeSrc(i) {
        const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
        this.w = 80;
        this.h = this.w / imgRatio;
        this.img.src = this.srcs[i];
    }
    draw() {
        if (!this.img) return;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}