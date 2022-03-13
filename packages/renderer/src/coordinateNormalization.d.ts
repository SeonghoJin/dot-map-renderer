import { Point } from '@dot-map-renderer/component';
export declare namespace CoordinateNormalization {
    const formatll: (point: Point) => Point;
    const llToStagell: (point: Point, stageWidth: number, stageHeight: number) => Point;
}
