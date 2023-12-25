function distance(p1: Point, p2: Point) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function getNearestPoint(point: Point, points: Point[], threshold = Infinity) {
    let nearest = null;
    let minDistance = Infinity;

    points.forEach((p) => {
        const d = distance(p, point);
        if (d < minDistance && d < threshold) {
            minDistance = d;
            nearest = p;
        }
    });

    return nearest;
}

function subtract(p1: Point, p2: Point) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
}

function add(p1: Point, p2: Point) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
}

function scale(p: Point, scaler: number) {
    return new Point(p.x * scaler, p.y * scaler);
}
