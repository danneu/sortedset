import test from 'ava'
import SortedSet from '../src'

test('constructor variants', (t) => {
    const reverse = (a, b) => {
        if (a === b) return 0
        return a < b ? 1 : -1
    }
    // No arguments
    {
        const set = new SortedSet()
        t.deepEqual(Array.from(set), [])
    }
    // Only custom compare
    {
        const set = new SortedSet(reverse)
        t.deepEqual(Array.from(set), [])
    }
    // Initial array and custom compare
    {
        const set = new SortedSet([2, 1, 3], reverse)
        t.deepEqual(Array.from(set), [3, 2, 1])
    }
    // Only initial array
    {
        const set = new SortedSet([2, 1, 3])
        t.deepEqual(Array.from(set), [1, 2, 3])
    }
})

test('#insert', (t) => {
    const set = new SortedSet()
    set.add(2)
    set.add(1)
    set.add(3)
    t.deepEqual(Array.from(set), [1, 2, 3])
})

test('#clear', (t) => {
    const set = new SortedSet()
    set.add(42)
    set.clear()
    set.add(200)
    set.add(100)
    set.add(300)
    t.deepEqual(Array.from(set), [100, 200, 300])
})

test('#has', (t) => {
    const set = new SortedSet([1, 2, 3])
    t.true(set.has(1))
    t.true(set.has(2))
    t.true(set.has(3))
    t.false(set.has(4))
})

test('#indexOf when element exists', (t) => {
    const set = new SortedSet([1, 2, 3])
    const index = set.indexOf(2)
    t.is(index, 1)
})

test('#indexOf when element does not exist', (t) => {
    const set = new SortedSet()
    const index = set.indexOf(42)
    t.is(index, -1)
})

test('#delete when element exists', (t) => {
    const set = new SortedSet([1, 2, 3])
    const result = set.delete(1)
    t.is(result, 1)
    t.deepEqual(Array.from(set), [2, 3])
})

test('#delete when element does not exist', (t) => {
    const set = new SortedSet([1, 2, 3])
    const result = set.delete(42)
    t.falsy(result)
    t.deepEqual(Array.from(set), [1, 2, 3])
})

test('.size', (t) => {
    const set = new SortedSet([1, 2, 3])
    t.is(set.size, 3)
})

test('values where compare(a, b) === 0 are considered identical', (t) => {
    {
        const set = new SortedSet([1, 2, 1, 3, 1])
        t.deepEqual(Array.from(set), [1, 2, 3])
    }
    {
        const alwaysEqual = (a, b) => 0
        const set = new SortedSet([1, 2, 1, 3, 1], alwaysEqual)
        t.deepEqual(Array.from(set), [1])
    }
})

test('test custom compare', (t) => {
    // sort leaderboard by highest balances first,
    // but break ties with username comparison.
    const compare = (a, b) => {
        if (a.balance < b.balance) return 1
        if (a.balance > b.balance) return -1
        return a.uname.localeCompare(b.uname)
    }

    const set = new SortedSet(
        [
            { uname: 'user6', balance: 50 },
            { uname: 'user3', balance: 75 },
            { uname: 'user1', balance: 10 },
            { uname: 'user2', balance: 50 },
            { uname: 'user1', balance: 10 },
        ],
        compare
    )

    t.deepEqual(Array.from(set), [
        { uname: 'user3', balance: 75 },
        { uname: 'user2', balance: 50 },
        { uname: 'user6', balance: 50 },
        { uname: 'user1', balance: 10 },
    ])
})
