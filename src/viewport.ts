class Viewport {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    zoom: number;
    center: Point;
    offset: Point;
    drag: {
        start: Point;
        end: Point;
        offset: Point;
        active: boolean;
    };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')!;
        this.zoom = 1;
        this.center = new Point(canvas.width / 2, canvas.height / 2);
        this.offset = scale(this.center, -1);
        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        };
        this.addEventListeners();
    }

    reset() {
        this.ctx.restore();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.center.x, this.center.y);
        this.ctx.scale(1 / this.zoom, 1 / this.zoom);
        const offset = this.getOffset();
        this.ctx.translate(offset.x, offset.y);
    }

    getMouse(e: MouseEvent, subtractDragOffset = false) {
        const p = new Point(
            (e.offsetX - this.center.x) * this.zoom - this.offset.x,
            (e.offsetY - this.center.y) * this.zoom - this.offset.y
        );
        return subtractDragOffset ? subtract(p, this.drag.offset) : p;
    }

    getOffset() {
        return add(this.offset, this.drag.offset);
    }

    addEventListeners() {
        this.canvas.addEventListener('wheel', (e) => {
            this.handleWheel(e);
        });
        this.canvas.addEventListener('mousedown', (e) => {
            this.handleMouseDown(e);
        });
        this.canvas.addEventListener('mouseup', (e) => {
            this.handleMouseUp(e);
        });
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
    }

    handleMouseDown(e: MouseEvent) {
        if (e.button === 1) {
            // middle button
            this.drag.start = this.getMouse(e);
            this.drag.end = this.drag.start;
            this.drag.offset = this.offset;
            this.drag.active = true;
        }
    }

    handleMouseUp(e: MouseEvent) {
        if (e.button === 1 && this.drag.active) {
            // middle button
            this.offset = add(this.offset, this.drag.offset);
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            };
        }
    }

    handleMouseMove(e: MouseEvent) {
        const mouse = this.getMouse(e);
        if (this.drag.active) {
            this.drag.end = mouse;
            this.drag.offset = subtract(this.drag.end, this.drag.start);
        }
    }

    handleWheel(e: WheelEvent) {
        e.preventDefault();
        const direction = Math.sign(e.deltaY);
        const step = 0.1;
        const zoom = this.zoom + direction * step;
        this.zoom = Math.max(1, Math.min(5, zoom));
    }
}
