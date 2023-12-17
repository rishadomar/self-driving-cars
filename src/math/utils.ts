function getNearestPoint(point: Point, points: Point[], threshold = Infinity) {
    let nearest = null;
    let minDistance = Infinity;

    points.forEach((p) => {
        const distance = point.distance(p);
        if (distance < minDistance && distance < threshold) {
            minDistance = distance;
            nearest = p;
        }
    });

    return nearest;
}
