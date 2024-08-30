export class Sprite {
    constructor(ball, ctx) {
        this.ball = ball;
        this.ctx = ctx;
        this.sprites = [];
        for (let i = 1; i <= 8; i++) {
            let img = new Image();
            img.src = `./src/assets/images/sprite${i}.png`;
            this.sprites.push(img);
        }
        this.currentFrame = 0;
        this.frameCount = 0;
    }

    draw() {
        if (!this.ball.death()) {
            this.frameCount++;
            if (this.frameCount % 5 === 0) { // Change sprite every 5 frames
                this.currentFrame = (this.currentFrame + 1) % this.sprites.length;
            }
            this.ctx.drawImage(this.sprites[this.currentFrame], this.ball.position.x - this.sprites[this.currentFrame].width / 2, this.ball.position.y- this.sprites[this.currentFrame].height + this.ball.rad - this.ball.offset);
        }
    }
}