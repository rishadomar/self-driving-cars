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

    getMouse(e: MouseEvent) {
        return new Point(e.offsetX * this.zoom, e.offsetY * this.zoom);
    }

    getOffset() {
        return this.add(this.offset, this.drag.offset);
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

    subtract(p1: Point, p2: Point) {
        return new Point(p1.x - p2.x, p1.y - p2.y);
    }

    add(p1: Point, p2: Point) {
        return new Point(p1.x + p2.x, p1.y + p2.y);
    }

    handleWheel(e: WheelEvent) {
        e.preventDefault();
        const direction = Math.sign(e.deltaY);
        const step = 0.1;
        const zoom = this.zoom + direction * step;
        this.zoom = Math.max(1, Math.min(5, zoom));
    }
}
