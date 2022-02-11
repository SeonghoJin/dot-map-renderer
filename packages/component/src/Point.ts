export const isPoint = (object: any) : object is Point => {
    if(typeof object[0] !== 'number')return false;
    if(typeof object[1] !== 'number')return false;
    return true;
}
export type Point = [number, number];