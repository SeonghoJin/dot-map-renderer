export const throttle = (callback: any, second: number) => {
    let timer: undefined | NodeJS.Timeout = undefined;
    return () => {
        if (timer != undefined) {
            clearTimeout(timer);
        }
        timer = setTimeout(callback, second);
    };
}