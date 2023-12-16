function getNearestPoint(point, points, threshold = Infinity) {
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
