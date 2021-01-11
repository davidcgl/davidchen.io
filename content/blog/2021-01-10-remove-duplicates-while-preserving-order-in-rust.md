+++
title = "Remove duplicates while preserving order in Rust"
description = "How to remove duplicates from a vector in Rust while preserving its order."
+++

Suppose we have a vector in Rust:

```rust
vec![1, 3, 1, 2, 2]
```

We want to remove all duplicates while preserving the order, like this:

```rust
vec![1, 3, 2]
```

One typical solution is to keep a set of encountered items as we move or copy items into a new vector:

```rust
let items = vec![1, 3, 1, 2, 2];

let mut uniq = Vec::new();
let mut seen = HashSet::new();

for item in items {
    if !seen.contains(&item) {
        seen.insert(item);
        uniq.push(item);
    }
}

assert_eq!(uniq, vec![1, 3, 2]);
```

But I recently learned a nifty idiom from [Programming Rust][0]:

```rust
let mut items = vec![1, 3, 1, 2, 2];

let mut seen = HashSet::new();
items.retain(|item| seen.insert(*item));

assert_eq!(items, vec![1, 3, 2]);
```

This works because `retain` only keeps items for which the predicate returns true, and `insert` only returns true if the item was not previously present in the set. Since the vector is traversed in order, we end up keeping just the first occurrence of each item. Neat!
