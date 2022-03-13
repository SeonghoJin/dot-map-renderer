export const throttle = (callback: any, second: number) =>
{
    let timer: undefined | NodeJS.Timeout;

    return (event: any) =>
    {
        if (timer !== undefined)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(callback(event), second);
    };
};
