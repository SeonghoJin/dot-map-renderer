"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationQuadraticBezierCurveFactory = exports.quadraticBezierCurveFactory = void 0;
const quadraticBezierCurveFactory = (A, B, C) => (t) => [(1 - t) * A[0] + 2 * (1 - t) * t * B[0] + t * t * C[0], (1 - t) * A[1] + 2 * (1 - t) * t * B[1] + t * t * C[1]];
exports.quadraticBezierCurveFactory = quadraticBezierCurveFactory;
const animationQuadraticBezierCurveFactory = (B) => (0, exports.quadraticBezierCurveFactory)([0, 0], B, [1, 1]);
exports.animationQuadraticBezierCurveFactory = animationQuadraticBezierCurveFactory;
//# sourceMappingURL=bezierCurve.js.map