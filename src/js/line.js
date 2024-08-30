import { Sparker } from './sparks.js';

export class LineS {
    constructor(canvas,ctx,ball,Bounce_sound) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ball = ball;
        this.points = [{ x: 0, y: canvas.height }, { x: canvas.width, y: canvas.height }]
        this.currentPoint = { x: canvas.width / 2, y: canvas.height }
        this.lines = [[this.points[0], this.points[1]]]
        this.Bounce_sound = Bounce_sound;
        this.sparksList = [new Sparker(canvas.width / 2, canvas.height)]
    }
    addPoint(x, y) {
        this.addline(this.currentPoint, { x: x, y: y });
        this.currentPoint = { x: x, y: y };
        this.sparksList.push(new Sparker(this.currentPoint.x, this.currentPoint.y));

    }
    addline(point1, point2) {
        this.lines.push([point1, point2])
    }
    drawlines() {
        this.lines.forEach(line => {
            this.drawwline(line[0], line[1], 5);
            this.ring(line[0].x, line[0].y - this.ball.offset);
            this.ring(line[1].x, line[1].y - this.ball.offset);
            this.checkCollide(line[0], line[1], this.ball.position)

        });
        // this.drawSparks();
    }
    drawSparks() {
        this.sparksList.forEach((spark, index) => {
            if (spark.life <= 0) {
                this.sparksList.splice(index, 1); // Remove dead sparks
            } else {
                spark.draw(this.ctx, this.ball.offset);
            }
    });
    }
    drawwline(a, b, size) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "cyan";
        this.ctx.lineWidth = size;
        this.ctx.moveTo(a.x, a.y - this.ball.offset);
        this.ctx.lineTo(b.x, b.y - this.ball.offset);
        this.ctx.stroke();
        this.ctx.stroke_style = 1;

    }
    checkCollide(pos1, pos2,posball) {
        const den = ((pos2.x - pos1.x) * (pos2.x - pos1.x) + (pos2.y - pos1.y) * (pos2.y - pos1.y));
        const t = -((pos1.x - posball.x) * (pos2.x - pos1.x) + (pos1.y - posball.y) * (pos2.y - pos1.y)) / den;
        if (t <= 1 && t >= 0) {
            var d = Math.abs((pos2.x - pos1.x) * (pos1.y - posball.y) - (pos2.y - pos1.y) * (pos1.x - posball.x));
            d = d / Math.sqrt(den);
            if (d <= 20) {
                if (this.ball.vel.y > 0) {
                    this.ball.vel.y = -1;
                    var m = (pos2.y - pos1.y) / (pos2.x - pos1.x);
                    m=Math.min(m,100);
                    this.ball.vel.x = m;
                    this.ball.vel = this.unit(this.ball.vel);
                    this.ball.vel = this.mult(9, this.ball.vel)
                    this.Bounce_sound.play()
                }
                
            }
        }
    }
    unit(n) {
        var mag = (n.x * n.x + n.y * n.y);
        return this.mult(1 / mag, n);
    }
    mult(a, b) {
        return { x: a * b.x, y: a * b.y }
    }
    sub(a, b) {
        return { x: a.x - b.x, y: a.y - b.y }
    }
    dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    ring(x, y) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.linewidth = 10;
        this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#1B0324";
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    hoverline(x, y) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(this.currentPoint.x, this.currentPoint.y - this.ball.offset);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
    randomplatforms() {
        var t = Math.random() * this.canvas.height
        this.addline({ x: this.canvas.width * Math.random(), y: t - this.canvas.height + this.ball.offset }, { x: this.canvas.width * Math.random(), y: Math.random() * 100 + t - 50 - this.canvas.height + this.ball.offset })
    }
}
