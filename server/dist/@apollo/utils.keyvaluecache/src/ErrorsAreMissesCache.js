/**
 * This cache wraps a KeyValueCache and returns undefined (a cache miss) for any
 * errors thrown by the underlying cache. You can also provide a logger to
 * capture these errors rather than just swallow them.
 */
export class ErrorsAreMissesCache {
    constructor(cache, logger) {
        this.cache = cache;
        this.logger = logger;
    }
    async get(key) {
        try {
            return await this.cache.get(key);
        }
        catch (e) {
            if (this.logger) {
                if (e instanceof Error) {
                    this.logger.error(e.message);
                }
                else {
                    this.logger.error(e);
                }
            }
            return undefined;
        }
    }
    async set(key, value, opts) {
        return this.cache.set(key, value, opts);
    }
    async delete(key) {
        return this.cache.delete(key);
    }
}
