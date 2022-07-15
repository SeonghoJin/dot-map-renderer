import { Point } from './Point';
import { Drawable } from './Drawable';
import { Polygon } from './Polygon';
import countryMap from './CountryMap';
import { rgbToHex } from '@dot-map-renderer/util/src/rgbToHex';
import { simpleHash } from '@dot-map-renderer/util/src/simpleHash';

export class Country implements Drawable {
  polygons: Polygon[] = [];
  name: string;
  mapColor: string;

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
    const hash1 = simpleHash(name) % 17;
    const hash2 = simpleHash(name) % 51;
    const hash = simpleHash(name) % 100;

    this.mapColor = `#${rgbToHex(mapcolor7 + hash1, mapcolor8 + hash2, mapcolor9 + hash)}`;

    countryMap.set(this.mapColor, name);
    this.name = name;
    this.repaint();
  }

  repaint = () => {
    // const [r, g, b, a] = this.mapColor;
    this.polygons.forEach((polygon) => {
      polygon.color = '#111111';
    });
  };

  resize(x: number, y: number, polygonRatio: number) {
    this.polygons.forEach((polygon) => polygon.resize(x, y, polygonRatio));
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.polygons.forEach((polygon) => polygon.draw(ctx));
  }
}
