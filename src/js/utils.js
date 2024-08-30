export function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// export function run(circle_effects, ctx, offset) {
//     circle_effects.forEach((effect, index) => {
//         let [center, maxRadius, growth, lineWidth, color] = effect;
//         if (growth[0] > 0) {
//             ctx.beginPath();
//             ctx.arc(center[0], center[1] - offset, maxRadius - growth[0], 0, 2 * Math.PI);
//             ctx.lineWidth = lineWidth[0];
//             ctx.strokeStyle = color;
//             ctx.stroke();
//             growth[0] -= growth[1];
//             lineWidth[0] -= lineWidth[1];
//         } else {
//             circle_effects.splice(index, 1); // Remove finished effects
//         }
//     });
// }
export function run(circle_effects,ctx,offset)
{
    ctx.strokeStyle="#be2864"
    for (let i = 0; i < circle_effects.length; i++) {
        var circle=circle_effects[i]
        circle[1] += circle[3][0]
        circle[2][0] -= circle[2][1]
        circle[3][0] -= circle[3][1]
        if(circle[2][0] < 1)
        {
            circle_effects.pop(i)
        }
        else
        {
            ctx.beginPath();
            ctx.arc(circle[0][0],circle[0][1]-offset, Math.abs(circle[1]) ,0,Math.PI*2);
            ctx.stroke();
        }
    }
}
