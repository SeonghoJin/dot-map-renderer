import { Point } from '@dot-map-renderer/component';
export declare const quadraticBezierCurveFactory: (A: Point, B: Point, C: Point) => (t: number) => number[];
export declare const animationQuadraticBezierCurveFactory: (B: Point) => (t: number) => number[];
