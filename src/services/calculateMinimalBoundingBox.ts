const calculateMinimalBoundingBox = (x: number, y: number, width: number, height: number, rotation: number) => {
    const rotationInRadians = (rotation * Math.PI) / 180;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const x1 = x - halfWidth;
    const y1 = y - halfHeight;
    const x2 = x + halfWidth;
    const y2 = y - halfHeight;
    const x3 = x - halfWidth;
    const y3 = y + halfHeight;
    const x4 = x + halfWidth;
    const y4 = y + halfHeight;

    const rotatedX1 = x + (x1 - x) * Math.cos(rotationInRadians) - (y1 - y) * Math.sin(rotationInRadians);
    const rotatedY1 = y + (x1 - x) * Math.sin(rotationInRadians) + (y1 - y) * Math.cos(rotationInRadians);
    const rotatedX2 = x + (x2 - x) * Math.cos(rotationInRadians) - (y2 - y) * Math.sin(rotationInRadians);
    const rotatedY2 = y + (x2 - x) * Math.sin(rotationInRadians) + (y2 - y) * Math.cos(rotationInRadians);
    const rotatedX3 = x + (x3 - x) * Math.cos(rotationInRadians) - (y3 - y) * Math.sin(rotationInRadians);
    const rotatedY3 = y + (x3 - x) * Math.sin(rotationInRadians) + (y3 - y) * Math.cos(rotationInRadians);
    const rotatedX4 = x + (x4 - x) * Math.cos(rotationInRadians) - (y4 - y) * Math.sin(rotationInRadians);
    const rotatedY4 = y + (x4 - x) * Math.sin(rotationInRadians) + (y4 - y) * Math.cos(rotationInRadians);

    const minX = Math.min(rotatedX1, rotatedX2, rotatedX3, rotatedX4);
    const maxX = Math.max(rotatedX1, rotatedX2, rotatedX3, rotatedX4);
    const minY = Math.min(rotatedY1, rotatedY2, rotatedY3, rotatedY4);
    const maxY = Math.max(rotatedY1, rotatedY2, rotatedY3, rotatedY4);

    return {
        top: minY,
        left: minX,
        width: maxX - minX,
        height: maxY - minY
    }
}

export default calculateMinimalBoundingBox;
