export function background(ctx, canvas) {
    // Draw a simple starry background
    // for (let i = 0; i < 50; i++) {
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height;
    //     let radius = Math.random() * 1.5;
    //     ctx.beginPath();
    //     ctx.arc(x, y, radius, 0, 2 * Math.PI);
    //     ctx.fillStyle = "white";
    //     ctx.fill();
    // }
}

export class shape {
    constructor(center, size, size2) {
        this.center = center
        this.angles = []
        for (let i = 0; i < size2; i++) {
            this.angles.push(i * 360 / size2);
        }
        this.size = size
    }
    draw(canvas,ctx) {
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        this.points = []
        var size = this.size;
        this.angles.forEach(angle => {
            this.points.push([this.center[0] + Math.sin(angle * Math.PI / 180) * size, this.center[1] + Math.cos(angle * Math.PI / 180) * size])
        });
        ctx.moveTo(this.points[0][0], this.points[0][1])
        this.points.slice(1,).forEach(point => {
            ctx.lineTo(point[0], point[1])
        });
        ctx.closePath();
        ctx.stroke();
        this.rotate();
        ctx.globalAlpha = 1;
        // this.size -= .1;
    }
    rotate() {
        for (let index = 0; index < this.angles.length; index++) {
            this.angles[index] += 1;
        }
        this.center[1] += 1;
    }
}

export class Shapes
{
    constructor(canvas,ctx)
    {
        this.shapes = [];
        this.canvas = canvas;
        this.ctx = ctx;
    }
    chooseRandomShapes() 
    {
        var listShapesSize = [3, 4, 5, 6]
        var nShapes = 4;
        for (let index = 0; index < nShapes; index++) {
            this.shapes.push(new shape([Math.random() * this.canvas.width, -Math.floor(Math.random() * 2 * this.canvas.height / 3)], 40, listShapesSize[Math.floor(Math.random() * 4)]));
        }
    }
    draw()
    {
        this.shapes.forEach(square => {
            square.draw(this.canvas,this.ctx);
        });
        for (let i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i].center[1] >= this.canvas.height) {
                this.shapes = this.shapes.slice(i + 1,)
            }
        }
    }
}