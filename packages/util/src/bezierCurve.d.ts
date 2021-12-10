import { Point } from "../../renderer/src/point";
export declare const quadraticBezierCurveFactory: (A: Point, B: Point, C: Point) => (t: number) => number[];
export declare const animationQuadraticBezierCurveFactory: (B: Point) => (t: number) => number[];
