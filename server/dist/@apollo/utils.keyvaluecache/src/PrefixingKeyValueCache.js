var _a;
const prefixesAreUnnecessaryForIsolationSymbol = Symbol("prefixesAreUnnecessaryForIsolation");
// PrefixingKeyValueCache wraps another cache and adds a prefix to all keys used
// by all operations. This allows multiple features to share the same underlying
// cache without conflicts.
//
// Note that PrefixingKeyValueCache explicitly does not implement methods like
// flush() that aren't part of KeyValueCache, even though most KeyValueCache
// implementations also have a flush() method. Most implementations of flush()
// send a simple command that wipes the entire backend cache system, which
// wouldn't support "only wipe the part of the cache with this prefix", so
// trying to provide a flush() method here could be confusingly dangerous.
export class PrefixingKeyValueCache {
    constructor(wrapped, prefix) {
        this.wrapped = wrapped;
        if (PrefixingKeyValueCache.prefixesAreUnnecessaryForIsolation(wrapped)) {
            this.prefix = "";
            // If we try to again prefix this cache, we should still skip the
            // prefixing. (This would be cleaner if we made PrefixingKeyValueCaches
            // via a static method rather than the constructor and could just return
            // `wrapped`...)
            this[prefixesAreUnnecessaryForIsolationSymbol] = true;
        }
        else {
            this.prefix = prefix;
        }
    }
    get(key) {
        return this.wrapped.get(this.prefix + key);
    }
    set(key, value, options) {
        return this.wrapped.set(this.prefix + key, value, options);
    }
    delete(key) {
        return this.wrapped.delete(this.prefix + key);
    }
    // Checks to see if a cache is a PrefixesAreUnnecessaryForIsolationCache,
    // without using instanceof (so that installing multiple copies of this
    // package doesn't break things).
    static prefixesAreUnnecessaryForIsolation(c) {
        return prefixesAreUnnecessaryForIsolationSymbol in c;
    }
    static cacheDangerouslyDoesNotNeedPrefixesForIsolation(c) {
        return new PrefixesAreUnnecessaryForIsolationCache(c);
    }
}
// This class lets you opt a cache out of the prefixing provided by
// PrefixingKeyValueCache. See the README for details.
class PrefixesAreUnnecessaryForIsolationCache {
    constructor(wrapped) {
        this.wrapped = wrapped;
        this[_a] = true;
    }
    get(key) {
        return this.wrapped.get(key);
    }
    set(key, value, options) {
        return this.wrapped.set(key, value, options);
    }
    delete(key) {
        return this.wrapped.delete(key);
    }
}
_a = prefixesAreUnnecessaryForIsolationSymbol;
