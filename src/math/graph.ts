class Graph {
    points: Point[];
    segments: Segment[];

    constructor(points: Point[], segments: Segment[]) {
        this.points = points;
        this.segments = segments;
    }

    static load(json: any) {
        const points = json.points.map((p: any) => {
            return new Point(p.x, p.y);
        });
        const segments = json.segments.map((s: any) => {
            return new Segment(
                points.find((p: Point) => p.equals(s.p1)),
                points.find((p: Point) => p.equals(s.p2))
            );
        });
        return new Graph(points, segments);
    }

    tryAddPoint(point: Point) {
        if (this.containsPoint(point)) {
            return false;
        }

        this.addPoint(point);
        return true;
    }

    addPoint(point: Point) {
        this.points.push(point);
    }

    addSegment(segment: Segment) {
        this.segments.push(segment);
    }

    containsSegment(segment: Segment) {
        return this.segments.some((s) => {
            return s.equals(segment);
        });
    }

    tryAddSegment(segment: Segment) {
        if (this.containsSegment(segment) || segment.p1.equals(segment.p2)) {
            return false;
        }

        this.addSegment(segment);
        return true;
    }

    tryRemoveSegment(segment: Segment) {
        if (!this.containsSegment(segment)) {
            return false;
        }

        this.removeSegment(segment);
        return true;
    }

    removeSegment(segment: Segment) {
        const index = this.segments.findIndex((s) => {
            return s.equals(segment);
        });

        this.segments.splice(index, 1);
    }

    containsPoint(point: Point) {
        return this.points.some((p) => {
            return p.equals(point);
        });
    }

    tryRemovePoint(point: Point) {
        if (!this.containsPoint(point)) {
            return false;
        }

        this.removePoint(point);
        return true;
    }

    getSegementsWithPoint(point: Point) {
        return this.segments.filter((segment) => {
            return segment.includes(point);
        });
    }

    removePoint(point: Point) {
        const segments = this.getSegementsWithPoint(point);
        segments.forEach((segment) => {
            this.removeSegment(segment);
        });
        const index = this.points.findIndex((p) => {
            return p.equals(point);
        });

        this.points.splice(index, 1);
    }

    dispose() {
        this.points = [];
        this.segments = [];
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.segments.forEach((segment) => {
            segment.draw(ctx);
        });

        this.points.forEach((point) => {
            point.draw(ctx);
        });
    }
}
