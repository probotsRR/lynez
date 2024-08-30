import { Ball } from './ball.js';
import { LineS } from './line.js';
import { Shapes,  background } from './shape.js';

import { Sprite } from './sprite.js';
import { getMousePosition, run } from './utils.js';

// Canvas and context setup
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Audio setup
const Bounce_sound = new Audio('./src/assets/audio/bounce.wav');
const place_sound = new Audio('./src/assets/audio/place.wav');
const death_sound = new Audio('./src/assets/audio/death.wav');
Bounce_sound.volume = 0.9;
place_sound.volume = 0.9;
death_sound.volume = 0.9;

let HIGHSCORE = 0;
let True = false;
let a = { x: 0, y: 0 };
let shake = true;
let screen_shake = 0;
let gameEnd = false;
let circle_effects = [];

try {
    HIGHSCORE = window.localStorage.getItem("highscore") || 0;
} catch (err) {
    HIGHSCORE = 0;
    window.localStorage.setItem("highscore", HIGHSCORE);
}

// Initialize game objects
const ball = new Ball(canvas, ctx, HIGHSCORE);
const line = new LineS(canvas, ctx, ball, Bounce_sound);
const sprite = new Sprite(ball, ctx);
const shapes = new Shapes(canvas,ctx);

// setInterval(chooseRandomShapes, 5000);
setInterval(() => line.randomplatforms(), 7000);
setInterval(() => shapes.chooseRandomShapes(), 5000)

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1B0324";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(animate);

    ball.draw();
    ball.move();
    sprite.draw();
    line.drawlines();
    shapes.draw();
    if (!ball.death()) {
        line.hoverline(a.x, a.y);
    } else {
        if (shake) {
            screen_shake = 15;
            shake = false;
            death_sound.play();
        }
    }
    if (screen_shake) {
        ball.offset += Math.random() * 20 - 10;
        if (ball.vel.y > 0) ball.vel.y = -ball.vel.y;
        screen_shake -= 1;
    }
    line.drawSparks();
    background(ctx,canvas);

    if (ball.death() && !gameEnd) {
        window.localStorage.setItem("highscore", ball.HIGHSCORE);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#be2864";
        circle_effects.push([[ball.position.x, ball.position.y], 500, [500, 0.15], [10, 0.2], "#be2864"]);
        circle_effects.push([[ball.position.x, ball.position.y], 500, [500, 0.05], [5, 0.04], "#be2864"]);
        circle_effects.push([[ball.position.x, ball.position.y], 50, [250, 0.2], [4, 0.3], "#000"]);
        circle_effects.push([[ball.position.x, ball.position.y], 100, [250, 0.2], [4, 0.3], "#000"]);
        circle_effects.push([[ball.position.x, ball.position.y], 250, [250, 0.2], [4, 0.3], "#000"]);
    }
    if (ball.death()) {
        run(circle_effects, ctx, ball.offset);
        gameEnd = True
    }
}

canvas.addEventListener("mousedown", function (e) {
    let t = getMousePosition(canvas, e);
    if (!ball.death()) {
        line.addPoint(t.x, t.y+ball.offset);
        place_sound.play();
    }
    if (!True) {
        document.getElementById("music").play();
        True = true;
    }
});

canvas.addEventListener("mousemove", function (e) {
    a = getMousePosition(canvas, e);
});

animate();
