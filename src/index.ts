/* eslint-disable */
export interface CollectionConstructor {
    new (): Collection<unknown, unknown>;
    new <K, V>(entries?: ReadonlyArray<readonly [K, V]> | null): Collection<K, V>;
    new <K, V>(iterable: Iterable<readonly [K, V]>): Collection<K, V>;
    readonly prototype: Collection<unknown, unknown>;
    readonly [Symbol.species]: CollectionConstructor;
}
/* eslint-enable */

/**
 * An extended Map class with additional utility functions.
 */
export class Collection<K, V> extends Map<K, V> {
    public [`constructor`]: CollectionConstructor;

    /**
     * Similar to Array.find(). Searches the map for the first element that returns true when running the predicate.
     */
    public find (predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | undefined {
        if (typeof thisArg !== `undefined`) predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (predicate(val, key, this)) return val;
        }
        return undefined;
    }

    /**
     * Similar to Array.findIndex(). Searches the map for the first key that returns true when running the predicate.
     */
    public findKey (predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): K | undefined {
        if (typeof thisArg !== `undefined`) predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (predicate(val, key, this)) return key;
        }
        return undefined;
    }

    /**
     * Similar to Array.filter(). Returns a new Collection of all elements that pass the provided filter.
     */
    public filter (predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): Collection<K, V> {
        if (typeof thisArg !== `undefined`) predicate = predicate.bind(thisArg);
        const results = new this.constructor[Symbol.species]<K, V>();
        for (const [key, val] of this) {
            if (predicate(val, key, this)) results.set(key, val);
        }
        return results;
    }

    /**
     * Identical to Collection.filter(), however all matched elements are removed from the collection.
     */
    public sweep (predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): void {
        if (typeof thisArg !== `undefined`) predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (predicate(val, key, this)) this.delete(key);
        }
    }

    /**
     * Similar to Array.some(). Checks if there is an element that passes a boolean expression.
     */
    public some (predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean {
        if (typeof thisArg !== `undefined`) predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (predicate(val, key, this)) return true;
        }
        return false;
    }

    /**
     * Similar to Array.every(). Checks if all elements pass a boolean expression.
     */
    public every (predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean {
        if (typeof thisArg !== `undefined`) predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (!predicate(val, key, this)) return false;
        }
        return true;
    }

    /**
     * Similar to Array.map(). Maps each element of the Collection into an array.
     */
    public map<T> (callbackfn: (value: V, key: K, collection: this) => T, thisArg?: unknown): T[] {
        if (typeof thisArg !== `undefined`) callbackfn = callbackfn.bind(thisArg);
        const iter = this.entries();
        return Array.from({ length: this.size }, (): T => {
            const [key, value] = iter.next().value;
            return callbackfn(value, key, this);
        });
    }

    /**
     * Similar to Array.reduce(). Combines all elements to create a single value.
     */
    public reduce<T> (callbackfn: (previousValue: T, currentValue: V, currentKey: K, collection: this) => T, initialValue?: T): T {
        let accumulator!: T;
        if (typeof initialValue !== `undefined`) {
            accumulator = initialValue;
            for (const [key, val] of this) accumulator = callbackfn(accumulator, val, key, this);
            return accumulator;
        }
        let first = true;
        for (const [key, val] of this) {
            if (first) {
                accumulator = val as unknown as T;
                first = false;
                continue;
            }
            accumulator = callbackfn(accumulator, val, key, this);
        }
        if (first) throw new TypeError(`Cannot reduce an empty Collection with no initial value`);
        return accumulator;
    }

    /**
     * Creates a shallow copy of the collection.
     */
    public clone (): Collection<K, V> {
        return new this.constructor[Symbol.species](this);
    }

    /**
     * Similar to Array.concat(), however the original collections are not modified.
     */
    public concat (...items: Collection<K, V>[]): Collection<K, V> {
        const newColl = this.clone();
        for (const coll of items) {
            for (const [key, val] of coll) newColl.set(key, val);
        }
        return newColl;
    }

    /**
     * Similar to Array.sort(). Sorts the collection based on a provided compare function.
     */
    public sort (compareFn: (a: V, b: V, aKey: K, bKey: K) => number): this {
        const entries = [...this.entries()];
        entries.sort((a, b): number => compareFn(a[1], b[1], a[0], b[0]));
        this.clear();
        for (const [k, v] of entries) this.set(k, v);
        return this;
    }
}
