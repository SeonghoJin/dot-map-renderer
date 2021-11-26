import geoJson from "./geo.json";
import { Polygon } from "./polygon";
import { Point } from "./point";
const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


const polygons = geoJson.features.filter((feature) => {
    return feature.geometry.type === 'Polygon';
}).map((polygonFeature) => {
    return polygonFeature.geometry.coordinates;
})

const multiPolygons = geoJson.features.filter((feature) => {
    return feature.geometry.type === 'MultiPolygon';
}).map((polygonFeature) => {
    return polygonFeature.geometry.coordinates;
})


const polygonRenderer = new Polygon(ctx);
polygons.forEach((polygon) => {
    const realPolygon = polygon[0];
    polygonRenderer.draw(realPolygon as Point[]);
})

multiPolygons.forEach((_polygons) => {
    _polygons.forEach((_polygon) => {
        polygonRenderer.draw(_polygon[0] as Point[])
    })
})

// ctx.moveTo(10, 10);
// ctx.lineTo(15, 15);
// ctx.stroke();