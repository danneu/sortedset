'use strict'

module.exports = class SortedSet {
  // compare signature: (a, b) => int
  //
  // Valid:
  //     new SortedSet()
  //     new SortedSet([1, 2, 3])
  //     new SortedSet([], customCompare)
  //     new SortedSet([1, 2, 3], customCompare)
  //     new SortedSet(customCompare)
  constructor (array = [], compare = defaultCompare) {
    if (typeof array === 'function') {
      compare = array
      array = []
    }

    this.array = []
    this.compare = compare

    // Populate from init array
    const length = array.length
    let index = 0

    while (index < length) {
      this.add(array[index++])
    }
  }

  get size () {
    return this.array.length
  }

  // [Symbol.iterator] () {
  //   return this.array[Symbol.iterator]()
  // }

  toArray () {
    return this.array
  }

  clear () {
    this.array = []
    return this
  }

  add (element) {
    let high = this.array.length
    let low = 0

    while (high > low) {
      const index = Math.floor((high + low) / 2)
      const ordering = this.compare(this.array[index], element)

      if (ordering < 0) {
        low = index + 1
      } else if (ordering > 0) {
        high = index
      } else {
        // Item already exists
        return this
      }
    }

    this.array.splice(low, 0, element)

    return this
  }

  has (element) {
    return this.indexOf(element) !== -1
  }

  indexOf (element) {
    let high = this.array.length
    let low = 0

    while (high > low) {
      const index = Math.floor((high + low) / 2)
      const ordering = this.compare(this.array[index], element)

      if (ordering < 0) {
        low = index + 1
      } else if (ordering > 0) {
        high = index
      } else {
        return index
      }
    }

    return -1
  }

  // Returns removed element if there was one
  delete (element) {
    const index = this.indexOf(element)

    if (index === -1) {
      return
    }

    const removed = this.array[index]
    this.array.splice(index, 1)
    return removed
  }
}

function defaultCompare (a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1
}
