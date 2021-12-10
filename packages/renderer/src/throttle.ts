export const throttle = (callback: any, second: number) => {
    let timer: undefined | NodeJS.Timeout = undefined;
    return (event: any) => {
        if (timer != undefined) {
            clearTimeout(timer);
        }
        timer = setTimeout(callback(event), second);
    };
}
