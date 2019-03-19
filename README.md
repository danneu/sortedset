# sortedset [![NPM version](https://badge.fury.io/js/sortedset.svg)](http://badge.fury.io/js/sortedset) [![Build Status](https://travis-ci.org/danneu/sortedset.svg?branch=master)](https://travis-ci.org/danneu/sortedset)

A fast, simple sorted set implementation for javascript (browser and node) that allows a custom compare function.

Similar API to javascript's [Set](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set).

```
npm install sortedset
```

## Compare Function

The compare function is the same thing that works with [Array#sort()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

-   If `compare(a, b) < 0`, `a` comes before `b`.
-   If `compare(a, b) === 0`, `a` and `b` are considered identical in the set.
-   If `compare(a, b) > 0`, `b` comes before `a`.

If no compare function is provided, a default ascending comparator is used.

```javascript
const SortedSet = require('sortedset')

const set = new SortedSet([2, 1, 3])

console.log(Array.from(set)) // [1, 2, 3]
```

Or pass in a custom comparator.

```javascript
const SortedSet = require('sortedset')

function reverse(a, b) {
    if (a === b) return 0
    return a < b ? 1 : -1
}

const set = new SortedSet([2, 1, 3], reverse)

console.log(Array.from(set)) // [3, 2, 1]
```

## API

Constructor:

-   `new SortedSet()`
-   `new SortedSet([2, 1, 3])`
-   `new SortedSet(customCompare)`
-   `new SortedSet([2, 1, 3], customCompare)`

Properties:

-   `SortedSet#size`

Methods:

-   `SortedSet#add(item)`
-   `SortedSet#delete(item)` Note: Returns the deleted item if it existed, else undefined
-   `SortedSet#clear()`
-   `SortedSet#has(item)`

SortedSet is iterable:

```javascript
const set = new SortedSet([2, 1, 3])
assert([...set], [1, 2, 3])

for (const item of set) {
    console.log(item)
}
```
