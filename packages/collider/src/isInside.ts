type PointLike = {
    x: number,
    y: number,
};

export const isInside = (polygon: PointLike[], point: PointLike) =>
{
    let count = 0;
    const polygonPointSize = polygon.length;

    for (let i = 0; i < polygonPointSize; i++)
    {
        const j = (i + 1) % polygonPointSize;
        const currentPoint = polygon[i];
        const nextPoint = polygon[j];

        if ((currentPoint.y > point.y) !== (nextPoint.y > point.y))
        {
            const atX = (nextPoint.x - currentPoint.x) * (point.y - currentPoint.y) / (nextPoint.y - currentPoint.y) + currentPoint.x;

            if (point.x < atX)
            {
                count++;
            }
        }
    }

    return count % 2;
};
