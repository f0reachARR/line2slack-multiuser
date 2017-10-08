export function promisize<T>(obj: {
    on: (
        event: string,
        handler: (data: T) => void
    ) => void
}, eventName: string, errorEventName = 'error'): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        obj.on(eventName, data => resolve(data));
        obj.on(errorEventName, data => reject(data));
    });
}

export function waitPromise(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
}