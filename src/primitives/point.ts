class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(point: Point) {
        return this.x === point.x && this.y === point.y;
    }

    draw(ctx: CanvasRenderingContext2D, { size = 18, color = 'black', outline = false, fill = false } = {}) {
        const rad = size / 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        if (outline) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'yellow';
            ctx.arc(this.x, this.y, rad + 2, 0, 2 * Math.PI);
            ctx.stroke();
        }
        if (fill) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, rad * 0.4, 0, 2 * Math.PI);
            ctx.fillStyle = 'purple';
            ctx.fill();
        }
    }

    distance(point: Point) {
        return Math.hypot(this.x - point.x, this.y - point.y);
    }
}
