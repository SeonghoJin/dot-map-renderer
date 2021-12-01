import {Point} from "./interfaces/point";

export const throttle = (callback: any, second: number) => {
    let timer: undefined | NodeJS.Timeout = undefined;
    return (event: any) => {
        if (timer != undefined) {
            clearTimeout(timer);
        }
        timer = setTimeout(callback(event), second);
    };
}

export const debounce = (callback: any, second: number) => {
    let flag = true;
    return (event: WheelEvent) => {
        event.preventDefault();
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            flag = true;
            callback(event);
        }, second);
    };
}

export const formatll = (point: Point) : Point => {
    return [point[0] + 180, -point[1] + 90];
}

export const llToStagell = (point: Point, stageWidth: number, stageHeight: number) : Point => {
    const xRatio = point[0] / 360;
    const yRatio = point[1] / 180;
    return [xRatio * stageWidth, yRatio * stageHeight];
}