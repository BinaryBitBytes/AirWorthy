import { LRUMap } from './lru';
let m = new LRUMap(3);
let entit = m.entries();
let k = entit.next().value[0];
let v = entit.next().value[1];
