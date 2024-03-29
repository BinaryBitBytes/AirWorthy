export class HeaderMap extends Map {
    constructor() {
        super(...arguments);
        // In order for TypeScript to prevent a standard `Map` from being compatible
        // with a `HeaderMap`, we need some additional property on the class.
        // @ts-ignore (this is just unused)
        this.__identity = Symbol('HeaderMap');
    }
    set(key, value) {
        return super.set(key.toLowerCase(), value);
    }
    get(key) {
        return super.get(key.toLowerCase());
    }
    delete(key) {
        return super.delete(key.toLowerCase());
    }
    has(key) {
        return super.has(key.toLowerCase());
    }
}
