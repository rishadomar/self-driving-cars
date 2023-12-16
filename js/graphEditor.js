class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext('2d');
        this.selected = null;
        this.hovered = null;

        this.addEventListeners();
    }

    addEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const point = new Point(x, y);

            this.hovered = getNearestPoint(point, this.graph.points, 10);
            if (this.hovered) {
                this.selected = this.hovered;
                return;
            }

            this.graph.addPoint(point);
            this.selected = point;
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const point = new Point(x, y);

            this.hovered = getNearestPoint(point, this.graph.points, 10);
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
