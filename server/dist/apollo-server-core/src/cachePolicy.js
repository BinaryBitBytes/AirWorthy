import { CacheScope } from 'apollo-server-types';
export function newCachePolicy() {
    return {
        maxAge: undefined,
        scope: undefined,
        restrict(hint) {
            if (hint.maxAge !== undefined &&
                (this.maxAge === undefined || hint.maxAge < this.maxAge)) {
                this.maxAge = hint.maxAge;
            }
            if (hint.scope !== undefined && this.scope !== CacheScope.Private) {
                this.scope = hint.scope;
            }
        },
        replace(hint) {
            if (hint.maxAge !== undefined) {
                this.maxAge = hint.maxAge;
            }
            if (hint.scope !== undefined) {
                this.scope = hint.scope;
            }
        },
        policyIfCacheable() {
            if (this.maxAge === undefined || this.maxAge === 0) {
                return null;
            }
            return { maxAge: this.maxAge, scope: this.scope ?? CacheScope.Public };
        },
    };
}
