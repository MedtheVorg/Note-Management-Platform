export function debounce(callback: any, delay: number) {
    let timeoutId: NodeJS.Timeout;

    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, delay);
    };
}
