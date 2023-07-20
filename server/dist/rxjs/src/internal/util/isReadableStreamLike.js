import { isFunction } from './isFunction';
export async function* readableStreamLikeToAsyncGenerator(readableStream) {
    const reader = readableStream.getReader();
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                return;
            }
            yield value;
        }
    }
    finally {
        reader.releaseLock();
    }
}
export function isReadableStreamLike(obj) {
    // We don't want to use instanceof checks because they would return
    // false for instances from another Realm, like an <iframe>.
    return isFunction(obj?.getReader);
}
