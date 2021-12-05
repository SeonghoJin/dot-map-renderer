import {Point} from "../core/interfaces/point";

export const quadraticBezierCurveFactory = (A: Point, B: Point, C: Point) => {
    return (t : number) => {
        return [(1-t) * A[0] + 2*(1-t)* t * B[0] + t*t*C[0], (1-t) * A[1] + 2 * ( 1 - t ) * t * B[1] + t*t*C[1]];
    }
}