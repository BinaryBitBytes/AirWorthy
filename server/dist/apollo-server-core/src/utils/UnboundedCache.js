export class UnboundedCache {
    constructor(cache = new Map()) {
        this.cache = cache;
    }
    async get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return undefined;
        if (entry.deadline && entry.deadline <= Date.now()) {
            await this.delete(key);
            return undefined;
        }
        return entry.value;
    }
    async set(key, value, { ttl } = { ttl: null }) {
        this.cache.set(key, {
            value,
            deadline: ttl ? Date.now() + ttl * 1000 : null,
        });
    }
    async delete(key) {
        this.cache.delete(key);
    }
}
