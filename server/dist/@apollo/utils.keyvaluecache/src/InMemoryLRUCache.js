import LRUCache from "lru-cache";
// LRUCache wrapper to implement the KeyValueCache interface.
export class InMemoryLRUCache {
    constructor(lruCacheOpts) {
        this.cache = new LRUCache({
            sizeCalculation: InMemoryLRUCache.sizeCalculation,
            // Create ~about~ a 30MiB cache by default. Configurable by providing
            // `lruCacheOpts`.
            maxSize: Math.pow(2, 20) * 30,
            ...lruCacheOpts,
        });
    }
    /**
     * default size calculator for strings and serializable objects, else naively
     * return 1
     */
    static sizeCalculation(item) {
        if (typeof item === "string") {
            return item.length;
        }
        if (typeof item === "object") {
            // will throw if the object has circular references
            return Buffer.byteLength(JSON.stringify(item), "utf8");
        }
        return 1;
    }
    async set(key, value, options) {
        if (options?.ttl) {
            this.cache.set(key, value, { ttl: options.ttl * 1000 });
        }
        else {
            this.cache.set(key, value);
        }
    }
    async get(key) {
        return this.cache.get(key);
    }
    async delete(key) {
        return this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    keys() {
        // LRUCache.keys() returns a generator (we just want an array)
        return [...this.cache.keys()];
    }
}
