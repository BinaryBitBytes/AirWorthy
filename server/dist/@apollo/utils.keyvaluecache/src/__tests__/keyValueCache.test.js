import { expectType } from "ts-expect";
describe("KeyValueCache", () => {
    const minimalCompatibleCache = {
        get: async (_key) => undefined,
        set: async (_key, _value, _options) => undefined,
        delete: async (_key) => undefined,
    };
    it("minimum implementation type-checks", () => {
        expectType(minimalCompatibleCache);
    });
    describe("type-check failures", () => {
        it("get", () => {
            const { get, ...cacheNoGet } = minimalCompatibleCache;
            // @ts-expect-error
            expectType(cacheNoGet);
            {
                const cacheBadGet = {
                    ...minimalCompatibleCache,
                    // no async
                    get: (_key) => undefined,
                };
                // @ts-expect-error
                expectType(cacheBadGet);
            }
            {
                const cacheBadGet = {
                    ...minimalCompatibleCache,
                    // incompatible type
                    get: async (_key) => undefined,
                };
                // @ts-expect-error
                expectType(cacheBadGet);
            }
        });
        it("set", () => {
            const { set, ...cacheNoSet } = minimalCompatibleCache;
            // @ts-expect-error
            expectType(cacheNoSet);
            {
                const cacheBadSet = {
                    ...minimalCompatibleCache,
                    // no async
                    set: (_key) => undefined,
                };
                // @ts-expect-error
                expectType(cacheBadSet);
            }
            {
                const cacheBadSet = {
                    ...minimalCompatibleCache,
                    // incompatible type
                    set: async (_key) => undefined,
                };
                // @ts-expect-error
                expectType(cacheBadSet);
            }
        });
        it("delete", () => {
            const { delete: _delete, ...cacheNoDelete } = minimalCompatibleCache;
            // @ts-expect-error
            expectType(cacheNoDelete);
            {
                const cacheBadDelete = {
                    ...minimalCompatibleCache,
                    // no async
                    delete: (_key) => undefined,
                };
                // @ts-expect-error
                expectType(cacheBadDelete);
            }
            {
                const cacheBadDelete = {
                    ...minimalCompatibleCache,
                    // incompatible type
                    delete: async (_key) => undefined,
                };
                // @ts-expect-error
                expectType(cacheBadDelete);
            }
        });
    });
});
