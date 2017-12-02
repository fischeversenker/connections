document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const MIN_X = 100;
    const MAX_X = width - 100;
    const MIN_Y = 100;
    const MAX_Y = height - 100;

    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    let scale = 3;

    class Point {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
        }
        draw(ctx, lastPoint) {
            let s = Math.random() * 0.2 + 0.2;
            ctx.strokeStyle = 'rgba(0, 0, 0, ' + s + ')';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(lastPoint.x, lastPoint.y);
            ctx.stroke();
        }
    }

    function start(p) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 0, 0, ' + Math.random() + ')';
    }

    function end() {
        ctx.stroke();
    }

    function getRandomPoint() {
        let x = MIN_X + Math.random() * (MAX_X - MIN_X);
        let y = MIN_Y + Math.random() * (MAX_Y - MIN_Y);
        let offsX = (width / 2) - x;
        let offsY = (height / 2) - y;
        x += Math.pow(Math.random(), 3) * offsX;
        y += Math.pow(Math.random(), 2) * offsY;
        return new Point(x, y, Math.random() * 4);
    }
    
    function init() {
        let count = 128;
        let p = getRandomPoint();
        let n = getRandomPoint();
        p.draw(ctx, p);

        start();

        for( let i = 0; i < count; i++) {
            n.draw(ctx, p);
            p = n;
            n = getRandomPoint();
        }

        end();
    }

    init();

}, false);