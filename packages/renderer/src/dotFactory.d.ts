import { DotType } from "../../component/src/DotType";
import { Dot } from "./dot";
declare type CreateFunctionType = {
    new (...args: any[]): Dot;
};
export declare class DotFactory {
    type: DotType;
    createFunction: CreateFunctionType;
    constructor(type: DotType);
    create(x: number, y: number, size: number, gapSize: number, color: string): Dot;
}
export {};
