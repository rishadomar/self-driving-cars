class GraphEditor {
    viewport: Viewport;
    canvas: HTMLCanvasElement;
    graph: Graph;
    ctx: CanvasRenderingContext2D;
    selected: Point | null;
    hovered: Point | null;
    dragging: boolean;
    mouse: Point | undefined;

    constructor(viewport: Viewport, graph: Graph) {
        this.viewport = viewport;
        this.canvas = viewport.canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext('2d')!;
        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = undefined;

        this.addEventListeners();
    }

    addEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.handleMouseDown(e);
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
            this.handleMouseMove(e);
        });
    }

    handleMouseDown(e: MouseEvent) {
        if (e.button === 2) {
            // right click
            if (this.selected) {
                this.selected = null;
            } else if (this.hovered) {
                this.removePoint(this.hovered);
            }
            return;
        }

        if (e.button === 0) {
            // left click
            if (this.hovered) {
                this.handleSelect(this.hovered);
                this.dragging = true;
                return;
            }

            if (this.mouse) {
                this.graph.addPoint(this.mouse);
                this.handleSelect(this.mouse);
                this.hovered = this.mouse;
            }
        }
    }

    handleMouseMove(e: MouseEvent) {
        this.mouse = this.viewport.getMouse(e);

        this.hovered = getNearestPoint(this.mouse, this.graph.points, 10 * this.viewport.zoom);
        if (this.dragging && this.selected) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }

    removePoint(point: Point) {
        this.graph.removePoint(point);
        if (this.selected === point) {
            this.selected = null;
        }
        this.hovered = null;
    }

    handleSelect(point: Point) {
        if (this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }

    display() {
        this.graph.draw(this.ctx);
        if (this.hovered) {
            console.log('Fill hovered', this.hovered);
            this.hovered.draw(this.ctx, { fill: true });
        }
        if (this.selected) {
            const intent = this.hovered ?? this.mouse;
            new Segment(this.selected, intent!).draw(this.ctx, { dash: [3, 3] });
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}
