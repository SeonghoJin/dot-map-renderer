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
