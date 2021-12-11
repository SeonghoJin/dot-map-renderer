import {Point} from "@dot-map-renderer/component";

export const quadraticBezierCurveFactory = (A: Point, B: Point, C: Point) => {
    return (t : number) => {
        return [(1-t) * A[0] + 2*(1-t)* t * B[0] + t*t*C[0], (1-t) * A[1] + 2 * ( 1 - t ) * t * B[1] + t*t*C[1]];
    }
}

export const animationQuadraticBezierCurveFactory = (B: Point) => {
    return quadraticBezierCurveFactory([0,0],B,[1,1]);
}