"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
/* eslint-enable */
/**
 * An extended Map class with additional utility functions.
 */
class Collection extends Map {
    /**
     * Similar to Array.find(). Searches the map for the first element that returns true when running the predicate.
     */
    find(predicate, thisArg) {
        if (typeof thisArg !== `undefined`)
            predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (predicate(val, key, this))
                return val;
        }
        return undefined;
    }
    /**
     * Similar to Array.findIndex(). Searches the map for the first key that returns true when running the predicate.
     */
    findKey(predicate, thisArg) {
        if (typeof thisArg !== `undefined`)
            predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (predicate(val, key, this))
                return key;
        }
        return undefined;
    }
    /**
     * Similar to Array.filter(). Returns a new Collection of all elements that pass the provided filter.
     */
    filter(predicate, thisArg) {
        if (typeof thisArg !== `undefined`)
            predicate = predicate.bind(thisArg);
        const results = new this.constructor[Symbol.species]();
        for (const [key, val] of this) {
            if (predicate(val, key, this))
                results.set(key, val);
        }
        return results;
    }
    /**
     * Identical to Collection.filter(), however all matched elements are removed from the collection.
     */
    sweep(predicate, thisArg) {
        if (typeof thisArg !== `undefined`)
            predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (predicate(val, key, this))
                this.delete(key);
        }
    }
    /**
     * Similar to Array.some(). Checks if there is an element that passes a boolean expression.
     */
    some(predicate, thisArg) {
        if (typeof thisArg !== `undefined`)
            predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (predicate(val, key, this))
                return true;
        }
        return false;
    }
    /**
     * Similar to Array.every(). Checks if all elements pass a boolean expression.
     */
    every(predicate, thisArg) {
        if (typeof thisArg !== `undefined`)
            predicate = predicate.bind(thisArg);
        for (const [key, val] of this) {
            if (!predicate(val, key, this))
                return false;
        }
        return true;
    }
    /**
     * Similar to Array.map(). Maps each element of the Collection into an array.
     */
    map(callbackfn, thisArg) {
        if (typeof thisArg !== `undefined`)
            callbackfn = callbackfn.bind(thisArg);
        const iter = this.entries();
        return Array.from({ length: this.size }, () => {
            const [key, value] = iter.next().value;
            return callbackfn(value, key, this);
        });
    }
    /**
     * Similar to Array.reduce(). Combines all elements to create a single value.
     */
    reduce(callbackfn, initialValue) {
        let accumulator;
        if (typeof initialValue !== `undefined`) {
            accumulator = initialValue;
            for (const [key, val] of this)
                accumulator = callbackfn(accumulator, val, key, this);
            return accumulator;
        }
        let first = true;
        for (const [key, val] of this) {
            if (first) {
                accumulator = val;
                first = false;
                continue;
            }
            accumulator = callbackfn(accumulator, val, key, this);
        }
        if (first)
            throw new TypeError(`Cannot reduce an empty Collection with no initial value`);
        return accumulator;
    }
    /**
     * Creates a shallow copy of the collection.
     */
    clone() {
        return new this.constructor[Symbol.species](this);
    }
    /**
     * Similar to Array.concat(), however the original collections are not modified.
     */
    concat(...items) {
        const newColl = this.clone();
        for (const coll of items) {
            for (const [key, val] of coll)
                newColl.set(key, val);
        }
        return newColl;
    }
    /**
     * Similar to Array.sort(). Sorts the collection based on a provided compare function.
     */
    sort(compareFn) {
        const entries = [...this.entries()];
        entries.sort((a, b) => compareFn(a[1], b[1], a[0], b[0]));
        this.clear();
        for (const [k, v] of entries)
            this.set(k, v);
        return this;
    }
}
exports.Collection = Collection;
