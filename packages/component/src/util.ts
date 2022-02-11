import {Point} from "./Point";

export const formatll = (point: Point) : Point => {
    return [point[0] + 180, -point[1] + 90];
}

export const llToStagell = (point: Point, stageWidth: number, stageHeight: number) : Point => {
    const xRatio = point[0] / 360;
    const yRatio = point[1] / 180;
    return [xRatio * stageWidth, yRatio * stageHeight];
}
