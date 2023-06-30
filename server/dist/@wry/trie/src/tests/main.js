import * as assert from "assert";
import { Trie } from "../index.js";
describe("Trie", function () {
    it("can be imported", function () {
        assert.strictEqual(typeof Trie, "function");
    });
    it("can hold objects weakly", function () {
        const trie = new Trie(true);
        assert.strictEqual(trie.weakness, true);
        const obj1 = {};
        assert.strictEqual(trie.lookup(obj1, 2, 3), trie.lookup(obj1, 2, 3));
        const obj2 = {};
        assert.notStrictEqual(trie.lookup(1, obj2), trie.lookup(1, obj2, 3));
        assert.strictEqual(trie.weak.has(obj1), true);
        assert.strictEqual(trie.strong.has(obj1), false);
        assert.strictEqual(trie.strong.get(1).weak.has(obj2), true);
        assert.strictEqual(trie.strong.get(1).weak.get(obj2).strong.has(3), true);
    });
    it("can disable WeakMap", function () {
        const trie = new Trie(false);
        assert.strictEqual(trie.weakness, false);
        const obj1 = {};
        assert.strictEqual(trie.lookup(obj1, 2, 3), trie.lookup(obj1, 2, 3));
        const obj2 = {};
        assert.notStrictEqual(trie.lookup(1, obj2), trie.lookup(1, obj2, 3));
        assert.strictEqual(typeof trie.weak, "undefined");
        assert.strictEqual(trie.strong.has(obj1), true);
        assert.strictEqual(trie.strong.has(1), true);
        assert.strictEqual(trie.strong.get(1).strong.has(obj2), true);
        assert.strictEqual(trie.strong.get(1).strong.get(obj2).strong.has(3), true);
    });
    it("can produce data types other than Object", function () {
        const symbolTrie = new Trie(true, args => Symbol.for(args.join(".")));
        const s123 = symbolTrie.lookup(1, 2, 3);
        assert.strictEqual(s123.toString(), "Symbol(1.2.3)");
        assert.strictEqual(s123, symbolTrie.lookup(1, 2, 3));
        assert.strictEqual(s123, symbolTrie.lookupArray([1, 2, 3]));
        const sNull = symbolTrie.lookup();
        assert.strictEqual(sNull.toString(), "Symbol()");
        const regExpTrie = new Trie(true, args => new RegExp("^(" + args.join("|") + ")$"));
        const rXYZ = regExpTrie.lookup("x", "y", "z");
        assert.strictEqual(rXYZ.test("w"), false);
        assert.strictEqual(rXYZ.test("x"), true);
        assert.strictEqual(rXYZ.test("y"), true);
        assert.strictEqual(rXYZ.test("z"), true);
        assert.strictEqual(String(rXYZ), "/^(x|y|z)$/");
        class Data {
            constructor(args) {
                this.args = args;
            }
        }
        const dataTrie = new Trie(true, args => new Data(args));
        function checkData(...args) {
            const data = dataTrie.lookupArray(args);
            assert.strictEqual(data instanceof Data, true);
            assert.notStrictEqual(data.args, args);
            assert.deepStrictEqual(data.args, args);
            assert.strictEqual(data, dataTrie.lookup(...args));
            assert.strictEqual(data, dataTrie.lookupArray(arguments));
            return data;
        }
        const datas = [
            checkData(),
            checkData(1),
            checkData(1, 2),
            checkData(2),
            checkData(2, 3),
            checkData(true, "a"),
            checkData(/asdf/i, "b", function oyez() { }),
        ];
        // Verify that all Data objects are distinct.
        assert.strictEqual(new Set(datas).size, datas.length);
    });
    it("can peek at values", function () {
        const trie = new Trie(true, (args) => args);
        const obj = {};
        assert.strictEqual(trie.peek(1, 2, 'x'), undefined);
        assert.strictEqual(trie.peek(1, 2, obj), undefined);
        assert.strictEqual(trie.peekArray([1, 2, 'x']), undefined);
        assert.strictEqual(trie.peekArray([1, 2, obj]), undefined);
        // peek/peekArray should not create anything on its own
        assert.strictEqual(trie['weak'], undefined);
        assert.strictEqual(trie['strong'], undefined);
        assert.strictEqual(trie['data'], undefined);
        const data1 = trie.lookup(1, 2, 'x');
        const data2 = trie.lookup(1, 2, obj);
        assert.strictEqual(trie.peek(1, 2, 'x'), data1);
        assert.strictEqual(trie.peek(1, 2, obj), data2);
        assert.strictEqual(trie.peekArray([1, 2, 'x']), data1);
        assert.strictEqual(trie.peekArray([1, 2, obj]), data2);
    });
});
