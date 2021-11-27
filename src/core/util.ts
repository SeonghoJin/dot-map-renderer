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