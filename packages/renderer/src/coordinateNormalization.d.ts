import { Point } from "./point";
export declare namespace CoordinateNormalization {
    const formatll: (point: Point) => Point;
    const llToStagell: (point: Point, stageWidth: number, stageHeight: number) => Point;
}
