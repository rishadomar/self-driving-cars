class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    tryAddPoint(point) {
        if (this.containsPoint(point)) {
            return false;
        }

        this.addPoint(point);
        return true;
    }

    addPoint(point) {
        this.points.push(point);
    }

    addSegment(segment) {
        this.segments.push(segment);
    }

    containsSegment(segment) {
        return this.segments.some((s) => {
            return s.equals(segment);
        });
    }

    tryAddSegment(segment) {
        if (this.containsSegment(segment) || segment.p1.equals(segment.p2)) {
            return false;
        }

        this.addSegment(segment);
        return true;
    }

    tryRemoveSegment(segment) {
        if (!this.containsSegment(segment)) {
            return false;
        }

        this.removeSegment(segment);
        return true;
    }

    removeSegment(segment) {
        const index = this.segments.findIndex((s) => {
            return s.equals(segment);
        });

        this.segments.splice(index, 1);
    }

    containsPoint(point) {
        return this.points.some((p) => {
            return p.equals(point);
        });
    }

    tryRemovePoint(point) {
        if (!this.containsPoint(point)) {
            return false;
        }

        this.removePoint(point);
        return true;
    }

    getSegementsWithPoint(point) {
        return this.segments.filter((segment) => {
            return segment.includes(point);
        });
    }

    removePoint(point) {
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

    draw(ctx) {
        this.segments.forEach((segment) => {
            segment.draw(ctx);
        });

        this.points.forEach((point) => {
            point.draw(ctx);
        });
    }
}
