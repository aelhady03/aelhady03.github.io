---
title: "Demystifying Golang Struct Embedded Fields Promotion: Why Documentation Matters?"
date: "2025-08-28"
tags: ["golang", "structs", "docs"]
excerpt: "They say documentation is always your friend, and most of the time people will escape that part, eventually lacking the required information needed to understand the internals of something. In this post, I will share my experience with Golang struct embedded fields promotion and how documentation played a crucial role in understanding it."
---

## Introduction

They say documentation is always your friend, and most of the time people will escape that part, eventually lacking the required information needed to understand the internals of something. Eventually, they will forget about some edge cases that might cause problems or misunderstanding.

Today, we are going to demystify a case to prove the previous statement, which is all about:
***Golang struct embedded fields promotion***

Most tutorials, books, or blogs will talk about struct embedded fields promotion as if it's trivial information. And they—most of the time—misuse it because they didn't reinforce their intuition about it by reading the docs.

So, let's talk about the following topics:
- **Struct embedded fields**
- **Embedded fields promotion**  
- **Common confusion** (which people don't really understand)

I will embed Go playgrounds to play with it along the way, so make sure to read it!

## What are Struct Embedded Fields?

An **embedded field** is when you define a field inside a struct without giving it a name because the name of the field refers to a type. In the previous snippet of code: `T` in `S` is an embedded field.

<br>[Go Playground Example](https://go.dev/play/p/gYAvYH3AkQm)<br>

## Embedded Field Promotion

The `TField` in the `T` type got **promoted** to be accessed within `S` type since `T` is an embedded field inside the `S` type.

***Important note:*** Promoted fields act like ordinary fields of a struct except that they ***cannot*** be used as field names in composite literals of the struct. That means the following code is not going to work:

```go
s := S{TField: "value"} // This will NOT compile
```

[Go Playground Example](https://go.dev/play/p/P0W2Ar1JA10)<br>

## The Common Confusion Part

Now, let's go to the common confusion part. Quoting from the ***Golang spec*** about structs:

> Given a struct type S and a type name T, promoted methods are included in the method set of the struct as follows:
>
> - If S contains an embedded field T, the method sets of S and *S both include promoted methods with receiver T. The method set of *S also includes promoted methods with receiver *T.
>
> - If S contains an embedded field *T, the method sets of S and *S both include promoted methods with receiver T or *T.



So, what's the gotcha here? Refer back to the following when I said we will go back again:

```go
func (t *T) TBar() { fmt.Println("(*T).TBar") }
```

I gave you back then a hint in the printing part why the previous code works, which happens to be that ***Golang does automatic address taking*** (AKA address dereference) on the pointers:

So, `T.TBar()` is actually the same as `(*T).TBar()`, which is why the previous code works!

<br>[Go Playground Example](https://go.dev/play/p/a4Srrl8_Os0)<br>

## How Can We Make Sure That the First Rule Is Actually True?

In order to do this, let's try to invoke the method on a **temporary non-addressable value**.

**Temporary non-addressable value?** What? What does that even mean?

It means that any value that has no variable name bound to it and cannot have its memory address taken since it exists only in the moment of an expression.

<br>[Go Playground Example](https://go.dev/play/p/4gpYKgo1dZ6)<br>

## Conclusion

Finally, we proved that ***reading docs, playing with it, and trying to understand it*** will make you have a good intuition about it.

**Thanks for reading!**