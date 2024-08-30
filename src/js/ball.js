export class Ball {
    constructor(canvas, ctx, HIGHSCORE) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.position = { x: this.canvas.width / 2, y: 3 * (this.canvas.height-20) / 5 - 20 };
        this.vel = { x: 0, y: 0 };
        this.rad = 20;
        this.offset = 0;
        this.score = 0;
        this.HIGHSCORE = HIGHSCORE;
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.font = 'Bold 20px sans-serif';
        this.score = Math.max(this.score, Math.floor(-this.offset / 10))
        this.ctx.fillText(`Score:${this.score}`, 10, 50);
        this.HIGHSCORE = Math.max(this.score, this.HIGHSCORE)
        this.ctx.fillText(`High Score:${this.HIGHSCORE}`, this.canvas.width - 200, 50);
        if (this.death()) {
            this.ctx.fillText(`YOU DIED! PRESS CTRL+R TO RESTART `, this.canvas.width / 2 - 190, this.canvas.height / 2);
        }
    }
    move() {
        this.position.y += this.vel.y
        this.position.x += this.vel.x
        this.vel.y += 0.1
        if (this.position.y < 3 * (this.canvas.height - 20) / 5) {
            this.offset = this.position.y - 3 * (this.canvas.height - 20) / 5
        }
        this.death();
    }
    collide() {
        if (this.position.y > this.canvas.height - this.rad) {
            this.vel.y -= 0.1;
            this.vel.y *= -1;
        }
    }
    death() {
        if (this.position.x < 0 || this.position.x > this.canvas.width) {
            return true;
        }
        return false;
    }
}
