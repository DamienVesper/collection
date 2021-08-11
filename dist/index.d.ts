/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * @license
 */
export interface CollectionConstructor {
    new (): Collection<unknown, unknown>;
    new <K, V>(entries?: ReadonlyArray<readonly [K, V]> | null): Collection<K, V>;
    new <K, V>(iterable: Iterable<readonly [K, V]>): Collection<K, V>;
    readonly prototype: Collection<unknown, unknown>;
    readonly [Symbol.species]: CollectionConstructor;
}
/**
 * An extended Map class with additional utility functions.
 */
export declare class Collection<K, V> extends Map<K, V> {
    [`constructor`]: CollectionConstructor;
    /**
     * Similar to Array.find(). Searches the map for the first element that returns true when running the predicate.
     */
    find(predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | undefined;
    /**
     * Similar to Array.findIndex(). Searches the map for the first key that returns true when running the predicate.
     */
    findKey(predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): K | undefined;
    /**
     * Similar to Array.filter(). Returns a new Collection of all elements that pass the provided filter.
     */
    filter(predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): Collection<K, V>;
    /**
     * Identical to Collection.filter(), however all matched elements are removed from the collection.
     */
    sweep(predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): void;
    /**
     * Similar to Array.some(). Checks if there is an element that passes a boolean expression.
     */
    some(predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean;
    /**
     * Similar to Array.every(). Checks if all elements pass a boolean expression.
     */
    every(predicate: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean;
    /**
     * Similar to Array.map(). Maps each element of the Collection into an array.
     */
    map<T>(callbackfn: (value: V, key: K, collection: this) => T, thisArg?: unknown): T[];
    /**
     * Similar to Array.reduce(). Combines all elements to create a single value.
     */
    reduce<T>(callbackfn: (previousValue: T, currentValue: V, currentKey: K, collection: this) => T, initialValue?: T): T;
    /**
     * Creates a shallow copy of the collection.
     */
    clone(): Collection<K, V>;
    /**
     * Similar to Array.concat(), however the original collections are not modified.
     */
    concat(...items: Collection<K, V>[]): Collection<K, V>;
    /**
     * Similar to Array.sort(). Sorts the collection based on a provided compare function.
     */
    sort(compareFn: (a: V, b: V, aKey: K, bKey: K) => number): this;
}
