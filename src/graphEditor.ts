class GraphEditor {
    canvas: HTMLCanvasElement;
    graph: Graph;
    ctx: CanvasRenderingContext2D;
    selected: Point | null;
    hovered: Point | null;
    dragging: boolean;

    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext('2d')!;
        this.selected = null;
        this.hovered = null;
        this.dragging = false;

        this.addEventListeners();
    }

    addEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 2) {
                // right click
                if (this.hovered) {
                    this.graph.removePoint(this.hovered);
                    if (this.selected === this.hovered) {
                        this.selected = null;
                    }
                    this.hovered = null;
                }
                return;
            }

            if (e.button === 0) {
                // left click
                const x = e.offsetX;
                const y = e.offsetY;
                const point = new Point(x, y);

                if (this.hovered) {
                    this.selected = this.hovered;
                    this.dragging = true;
                    return;
                }

                this.graph.addPoint(point);
                this.selected = point;
                this.hovered = point;
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                // left click
                this.dragging = false;
            }
        });

        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const point = new Point(x, y);

            this.hovered = getNearestPoint(point, this.graph.points, 10);
            if (this.dragging && this.selected) {
                this.selected.x = x;
                this.selected.y = y;
            }
        });
    }

    display() {
        this.graph.draw(this.ctx);
        if (this.hovered) {
            console.log('Fill hovered', this.hovered);
            this.hovered.draw(this.ctx, { fill: true });
        }
        if (this.selected) {
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}
