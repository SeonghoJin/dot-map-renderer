import { Point } from './Point';
import { Drawable } from './Drawable';
import { Polygon } from './Polygon';

export class Country implements Drawable {
  polygons: Polygon[] = [];
  name: string;
  mapColor: [number, number, number, number];

  constructor(feature: any) {
    if (feature.geometry.type === 'Polygon') {
      this.polygons.push(new Polygon(0, 0, feature.geometry.coordinates[0] as Point[]));
    } else if (feature.geometry.type === 'MultiPolygon') {
      const multiPolygons = feature.geometry.coordinates;

      multiPolygons.forEach((multiPolygon: any) => {
        this.polygons.push(new Polygon(0, 0, multiPolygon[0] as Array<Point>));
      });
    }

    const { mapcolor7, mapcolor8, mapcolor9, mapcolor13, name } = feature.properties;

    this.mapColor = [mapcolor7, mapcolor8, mapcolor9, mapcolor13];
    this.name = name;
  }

  resize(x: number, y: number, polygonRatio: number) {
    this.polygons.forEach((polygon) => polygon.resize(x, y, polygonRatio));
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.polygons.forEach((polygon) => polygon.draw(ctx));
  }
}
