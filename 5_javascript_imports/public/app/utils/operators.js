export function debounce(func, interval) {
    let timer = null;

    return (...args) => {
        clearTimeout(timer);
        return new Promise((resolve) => {
            timer = setTimeout(
                () => resolve(func(...args)),
                interval
            );
        });
    }
}