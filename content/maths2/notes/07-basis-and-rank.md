---
id: "7"
number: 7
title: "BASIS AND RANK"
section: "Weeks 1–4 · Linear Algebra Foundations"
---


# BASIS AND RANK

This file develops the central concept of a **basis** for a vector space — a set of vectors that is simultaneously linearly independent and spanning. A basis provides the most efficient way to represent every vector in a space, and its size gives us the **dimension** of that space. We then connect these ideas to matrices through the **rank**, establishing the fundamental equality of row rank and column rank. These concepts unify much of what we have studied so far: solving linear systems ([[2 - SOLVING SYSTEMS]]), understanding vector spaces ([[5 - VECTORS AND SPACES]]), and testing linear independence ([[6 - INDEPENDENCE]]).

---

## 1. Span of a Set of Vectors

Before defining a basis, we need the notion of **span** — the collection of all vectors reachable by forming linear combinations of a given set.

### Definition

Let $S = \{v_1, v_2, \ldots, v_k\}$ be a subset of a vector space $V$. The **span** of $S$ is the set of all finite linear combinations of vectors in $S$: [▶ W4_L1 @ 02:52](https://www.youtube.com/watch?v=lhAQIaFOPxA&t=172)

$$\text{span}(S) = \left\{ a_1 v_1 + a_2 v_2 + \cdots + a_k v_k \;\middle|\; a_1, a_2, \ldots, a_k \in \mathbb{R} \right\}$$

By convention, the span of the empty set is the zero vector alone:

$$\text{span}(\varnothing) = \{\mathbf{0}\}$$

### Key Property

The span of any subset $S \subseteq V$ is itself a **subspace** of $V$ (see [[5 - VECTORS AND SPACES]] for the subspace definition). This follows because:

1. $\mathbf{0} \in \text{span}(S)$ (take all coefficients equal to zero).
2. Any linear combination of elements in $\text{span}(S)$ is again in $\text{span}(S)$.

### Monotonicity of Span

If $T \subseteq S$, then $\text{span}(T) \subseteq \text{span}(S)$. More generally:

> If $T \subseteq \text{span}(S)$, then $\text{span}(T) \subseteq \text{span}(S)$.

This means that adding vectors to a set can only enlarge (or maintain) the span, and removing vectors can only shrink (or maintain) it.

### Worked Examples

**Example 1:** Let $S = \{(1, 0)\} \subset \mathbb{R}^2$.

$$\text{span}(S) = \{a(1,0) \mid a \in \mathbb{R}\} = \{(a, 0) \mid a \in \mathbb{R}\}$$

This is the $x$-axis in $\mathbb{R}^2$.

**Example 2:** Let $S = \{(1, 1)\} \subset \mathbb{R}^2$.

$$\text{span}(S) = \{a(1,1) \mid a \in \mathbb{R}\} = \{(a, a) \mid a \in \mathbb{R}\}$$

This is the line $y = x$ in $\mathbb{R}^2$.

**Example 3:** Let $S = \{(1, 0, 0),\; (0, 1, 0)\} \subset \mathbb{R}^3$.

$$\text{span}(S) = \{a(1,0,0) + b(0,1,0) \mid a, b \in \mathbb{R}\} = \{(a, b, 0) \mid a, b \in \mathbb{R}\}$$

This is the $xy$-plane in $\mathbb{R}^3$.

---

## 2. Spanning Sets

### Definition

Let $V$ be a vector space. A subset $S \subseteq V$ is called a **spanning set** for $V$ if $\text{span}(S) = V$. [▶ W4_L1 @ 05:49](https://www.youtube.com/watch?v=lhAQIaFOPxA&t=349)

Equivalently, $S$ is a spanning set for $V$ if every vector $v \in V$ can be written as a linear combination of vectors from $S$.

### Examples in $\mathbb{R}^2$

| Set $S$ | Spanning $\mathbb{R}^2$? | Reason |
|---|---|---|
| $\{(1,0),\;(0,1)\}$ | Yes | $(x,y) = x(1,0) + y(0,1)$ |
| $\{(1,0),\;(0,1),\;(1,2)\}$ | Yes | Superset of a spanning set |
| $\{(1,1),\;(0,1)\}$ | Yes | $(x,y) = x(1,1) + (y-x)(0,1)$ |
| $\{(1,0)\}$ | No | Only reaches the $x$-axis |

> **Clarification:** If $S$ is a spanning set for $V$, then any superset $S' \supseteq S$ is also a spanning set for $V$. This means spanning sets are not unique, and they can be much larger than necessary.

### Building a Spanning Set by Appending

A systematic way to construct a spanning set for a vector space (such as $\mathbb{R}^3$) is to start with the empty set and repeatedly **append** vectors that lie outside the current span: [▶ W4_L1 @ 11:52](https://www.youtube.com/watch?v=lhAQIaFOPxA&t=712)

1. Start with $S_0 = \varnothing$. Then $\text{span}(S_0) = \{\mathbf{0}\}$.
2. Choose $v_1 \notin \text{span}(S_0)$ and set $S_1 = \{v_1\}$. Now $\text{span}(S_1)$ is a line.
3. Choose $v_2 \notin \text{span}(S_1)$ and set $S_2 = \{v_1, v_2\}$. Now $\text{span}(S_2)$ is a plane.
4. Choose $v_3 \notin \text{span}(S_2)$ and set $S_3 = \{v_1, v_2, v_3\}$. Now $\text{span}(S_3) = \mathbb{R}^3$.

**Example:** Starting in $\mathbb{R}^3$:

- $S_0 = \varnothing$, $\;\text{span}(S_0) = \{(0,0,0)\}$.
- Append $(0, 2, 1)$: $\;S_1 = \{(0,2,1)\}$, $\;\text{span}(S_1)$ is a line through the origin.
- Append $(2,2,0)$: $\;S_2 = \{(0,2,1),\;(2,2,0)\}$, $\;\text{span}(S_2)$ is a plane.
- Append $(0,0,5)$: $\;S_3 = \{(0,2,1),\;(2,2,0),\;(0,0,5)\}$.

Every $(x,y,z) \in \mathbb{R}^3$ can be written as:

$$\left(\frac{y-x}{2}\right)(0,2,1) + \left(\frac{x}{2}\right)(2,2,0) + \left(\frac{x - y + 2z}{10}\right)(0,0,5) = (x,y,z)$$

Hence $\text{span}(S_3) = \mathbb{R}^3$, and $S_3$ is a spanning set for $\mathbb{R}^3$. The coefficients above are found by solving the corresponding $3 \times 3$ linear system (see [[2 - SOLVING SYSTEMS]]).

---

## 3. Basis: Definition and Fundamental Properties

### Definition

A **basis** $B$ for a vector space $V$ is a subset of $V$ that satisfies two conditions simultaneously: [▶ W4_L1 @ 19:12](https://www.youtube.com/watch?v=lhAQIaFOPxA&t=1152)

1. **Spanning:** $\text{span}(B) = V$.
2. **Linearly independent:** the only solution to $a_1 v_1 + a_2 v_2 + \cdots + a_k v_k = \mathbf{0}$ (where $v_i \in B$) is $a_1 = a_2 = \cdots = a_k = 0$.

A basis is, informally, a set that is "just the right size" — large enough to span $V$, but small enough to remain linearly independent.

### Unique Representation Property

If $B = \{v_1, v_2, \ldots, v_n\}$ is a basis for $V$, then every vector $v \in V$ can be written **uniquely** as: [▶ W4_L3 @ 00:28](https://www.youtube.com/watch?v=oATXqim4F5Q&t=28)

$$v = a_1 v_1 + a_2 v_2 + \cdots + a_n v_n$$

for scalars $a_1, a_2, \ldots, a_n \in \mathbb{R}$.

*Why uniqueness?* Suppose there were two representations:

$$v = a_1 v_1 + \cdots + a_n v_n = b_1 v_1 + \cdots + b_n v_n$$

Subtracting: $(a_1 - b_1)v_1 + \cdots + (a_n - b_n)v_n = \mathbf{0}$. By linear independence, $a_i - b_i = 0$ for all $i$, so $a_i = b_i$.

### Equivalent Characterisations

The following conditions on a subset $B \subseteq V$ are all equivalent: [▶ W4_L2 @ 01:31](https://www.youtube.com/watch?v=SxPhClO9zSU&t=91)

| Condition | Meaning |
|---|---|
| $B$ is linearly independent and $\text{span}(B) = V$ | Definition of basis |
| $B$ is a **maximal linearly independent set** | $B$ is linearly independent, and appending any vector to $B$ destroys independence |
| $B$ is a **minimal spanning set** | $B$ spans $V$, and removing any vector from $B$ destroys the spanning property |

**Sketch of proof that these are equivalent:**

*Basis $\Rightarrow$ maximal linearly independent:* Since $B$ is a basis, it is linearly independent. If we append any $v \in V$ to $B$, then $v \in \text{span}(B)$, so $v = a_1 v_1 + \cdots + a_n v_n$. This gives the non-trivial relation $1 \cdot v - a_1 v_1 - \cdots - a_n v_n = \mathbf{0}$, so $B \cup \{v\}$ is linearly dependent.

*Basis $\Rightarrow$ minimal spanning:* Since $B$ is a basis, it spans $V$. If we remove some $v_j$ from $B$, and $v_j$ were still in the span of the remaining vectors, then $v_j$ would be a linear combination of the others, contradicting the linear independence of $B$. So removing $v_j$ breaks the spanning property.

*Maximal linearly independent $\Rightarrow$ basis:* $B$ is linearly independent by assumption. For any $v \in V$, appending $v$ to $B$ makes it linearly dependent. This means $v$ is a linear combination of vectors in $B$ (if it were not, the enlarged set would still be independent — see [[6 - INDEPENDENCE]]). Hence $\text{span}(B) = V$.

> **Clarification:** A basis is not unique. A vector space typically has infinitely many different bases — but, as we shall see, they all have the same number of elements.

---

## 4. The Standard Basis

### Definition

For each $i \in \{1, 2, \ldots, n\}$, define the **standard basis vector** $e_i \in \mathbb{R}^n$ as the vector whose $i$-th coordinate is $1$ and all other coordinates are $0$: [▶ W4_L1 @ 21:30](https://www.youtube.com/watch?v=lhAQIaFOPxA&t=1290)

$$e_1 = \begin{bmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix}, \quad e_2 = \begin{bmatrix} 0 \\ 1 \\ \vdots \\ 0 \end{bmatrix}, \quad \ldots, \quad e_n = \begin{bmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{bmatrix}$$

The set $\mathcal{E} = \{e_1, e_2, \ldots, e_n\}$ is called the **standard basis** for $\mathbb{R}^n$.

### Proof that $\mathcal{E}$ is a Basis for $\mathbb{R}^n$

**Spanning:** Any $(x_1, x_2, \ldots, x_n) \in \mathbb{R}^n$ can be written as:

$$\begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix} = x_1 e_1 + x_2 e_2 + \cdots + x_n e_n$$

**Linear independence:** Suppose $a_1 e_1 + a_2 e_2 + \cdots + a_n e_n = \mathbf{0}$. The $j$-th coordinate of the left-hand side is $a_j$, and the $j$-th coordinate of the right-hand side is $0$. Hence $a_j = 0$ for all $j$.

Since $\mathcal{E}$ is both spanning and linearly independent, it is a basis for $\mathbb{R}^n$.

### Explicit Low-Dimensional Cases

**$\mathbb{R}^2$:**

$$\mathcal{E} = \left\{ \begin{bmatrix} 1 \\ 0 \end{bmatrix},\; \begin{bmatrix} 0 \\ 1 \end{bmatrix} \right\}$$

**$\mathbb{R}^3$:**

$$\mathcal{E} = \left\{ \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix},\; \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix},\; \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} \right\}$$

---

## 5. Finding a Basis: Two Approaches

Given a vector space (typically presented as the span of some set of vectors), there are two fundamental strategies for extracting a basis. [▶ W4_L2 @ 09:15](https://www.youtube.com/watch?v=SxPhClO9zSU&t=555)

### Method 1: Build Up (Append Vectors)

Start with $S_0 = \varnothing$ and repeatedly append vectors that are **not** in the span of the current set:

1. Set $S_0 = \varnothing$.
2. Choose any non-zero $v_1 \in V$; set $S_1 = \{v_1\}$.
3. If $\text{span}(S_1) \neq V$, choose $v_2 \notin \text{span}(S_1)$; set $S_2 = \{v_1, v_2\}$.
4. Continue until $\text{span}(S_k) = V$.

Because each new vector lies outside the previous span, the set remains linearly independent at every stage. When the process terminates, the result is a **maximal linearly independent set**, hence a basis.

**Example:** Find a basis for $\mathbb{R}^2$ by appending.

**Solution:**
- Start with $S_0 = \varnothing$.
- Append $(1, 2)$: $S_1 = \{(1,2)\}$. The span is the line $y = 2x$, not all of $\mathbb{R}^2$.
- Choose $(2, 3) \notin \text{span}(S_1)$ (since $(2,3) \neq a(1,2)$ for any $a$). Set $S_2 = \{(1,2),\;(2,3)\}$.
- $\text{span}(S_2) = \mathbb{R}^2$ (check: any $(x,y) = (2y - 3x)(1,2) + \frac{1}{2}(3x - 2y + y)(2,3)$... or more directly, the matrix $\begin{bmatrix} 1 & 2 \\ 2 & 3 \end{bmatrix}$ has determinant $3 - 4 = -1 \neq 0$, so the columns are linearly independent and span $\mathbb{R}^2$).

Therefore $\{(1,2),\;(2,3)\}$ is a basis for $\mathbb{R}^2$.

### Method 2: Trim Down (Delete Vectors)

Start with a spanning set $S$ and repeatedly remove vectors that are linear combinations of the remaining ones: [▶ W4_L2 @ 13:03](https://www.youtube.com/watch?v=SxPhClO9zSU&t=783)

1. Start with a spanning set $S$.
2. If some $v_j \in S$ can be written as a linear combination of the other vectors in $S$, remove $v_j$.
3. Repeat until no vector can be removed.

The resulting set is a **minimal spanning set**, hence a basis.

**Example:** Let $S = \{(1,0,0),\;(1,2,0),\;(1,0,3),\;(0,2,3),\;(0,4,2)\}$ span a subspace of $\mathbb{R}^3$. Find a basis.

**Solution:**

- Observe that $(0,4,2) = 2(1,2,0) + \tfrac{2}{3}(1,0,3) - \tfrac{8}{3}(1,0,0)$. Delete $(0,4,2)$.
- Remaining: $\{(1,0,0),\;(1,2,0),\;(1,0,3),\;(0,2,3)\}$.
- Observe that $(0,2,3) = (1,2,0) + (1,0,3) - 2(1,0,0)$. Delete $(0,2,3)$.
- Remaining: $\{(1,0,0),\;(1,2,0),\;(1,0,3)\}$.
- None of these three vectors is a linear combination of the other two (check by attempting to solve the relevant system). This is a basis.

> **Clarification:** The "trim down" method can be ad hoc when done by observation. The systematic algorithmic approaches using Gaussian elimination (Sections 6 and 7 below) are far more reliable.

---

## 6. Finding Bases and Dimension via Row Reduction

### The Row Method

This is the primary algorithmic method for finding a basis and dimension of a subspace given by a spanning set. [▶ W4_L4 @ 00:46](https://www.youtube.com/watch?v=0yEKEavVQJE&t=46)

**Procedure:**

1. Write the spanning vectors as the **rows** of a matrix $A$.
2. Row reduce $A$ to row echelon form (REF) or reduced row echelon form (RREF).
3. The **number of non-zero rows** in the echelon form equals the dimension of the subspace.
4. The **non-zero rows** themselves form a basis for the subspace.

**Why this works:** Elementary row operations do not change the row space of a matrix. That is, if $A$ row reduces to $R$, then $\text{row space}(A) = \text{row space}(R)$. In echelon form, the non-zero rows are automatically linearly independent (each has a leading $1$ in a column where all other rows have $0$), so they form a basis for the common row space.

For background on row reduction, see [[2 - SOLVING SYSTEMS]].

### Worked Example 1 (in $\mathbb{R}^3$)

**Example:** Find the dimension and a basis for the subspace $W$ of $\mathbb{R}^3$ spanned by $S = \{(1,0,1),\;(-2,-3,1),\;(3,3,0)\}$. [▶ W4_L4 @ 02:43](https://www.youtube.com/watch?v=0yEKEavVQJE&t=163)

**Solution:** Form the matrix with these vectors as rows:

$$A = \begin{bmatrix} 1 & 0 & 1 \\ -2 & -3 & 1 \\ 3 & 3 & 0 \end{bmatrix}$$

**Step 1:** Eliminate below the $(1,1)$ pivot.

$R_2 \leftarrow R_2 + 2R_1$:

$$\begin{bmatrix} 1 & 0 & 1 \\ 0 & -3 & 3 \\ 3 & 3 & 0 \end{bmatrix}$$

$R_3 \leftarrow R_3 - 3R_1$:

$$\begin{bmatrix} 1 & 0 & 1 \\ 0 & -3 & 3 \\ 0 & 3 & -3 \end{bmatrix}$$

**Step 2:** Scale $R_2$. $R_2 \leftarrow -\tfrac{1}{3}R_2$:

$$\begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & -1 \\ 0 & 3 & -3 \end{bmatrix}$$

**Step 3:** Eliminate below the $(2,2)$ pivot. $R_3 \leftarrow R_3 - 3R_2$:

$$\begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & -1 \\ 0 & 0 & 0 \end{bmatrix}$$

This is in RREF. There are **2 non-zero rows**, so $\dim(W) = 2$.

A basis for $W$ is:

$$\{(1, 0, 1),\; (0, 1, -1)\}$$

### Worked Example 2 (in $\mathbb{R}^4$)

**Example:** Find the dimension and a basis for the subspace $W$ spanned by $S = \{(1,-2,0,4),\;(3,1,1,0),\;(-1,-5,-1,8),\;(3,8,2,-12)\}$. [▶ W4_L4 @ 07:25](https://www.youtube.com/watch?v=0yEKEavVQJE&t=445)

**Solution:** Form the matrix:

$$A = \begin{bmatrix} 1 & -2 & 0 & 4 \\ 3 & 1 & 1 & 0 \\ -1 & -5 & -1 & 8 \\ 3 & 8 & 2 & -12 \end{bmatrix}$$

**Step 1:** Eliminate below the $(1,1)$ pivot.

$R_2 \leftarrow R_2 - 3R_1$, $\;R_3 \leftarrow R_3 + R_1$, $\;R_4 \leftarrow R_4 - 3R_1$:

$$\begin{bmatrix} 1 & -2 & 0 & 4 \\ 0 & 7 & 1 & -12 \\ 0 & -7 & -1 & 12 \\ 0 & 14 & 2 & -24 \end{bmatrix}$$

**Step 2:** Scale $R_2$. $R_2 \leftarrow \tfrac{1}{7}R_2$:

$$\begin{bmatrix} 1 & -2 & 0 & 4 \\ 0 & 1 & \tfrac{1}{7} & -\tfrac{12}{7} \\ 0 & -7 & -1 & 12 \\ 0 & 14 & 2 & -24 \end{bmatrix}$$

**Step 3:** Eliminate below the $(2,2)$ pivot.

$R_3 \leftarrow R_3 + 7R_2$, $\;R_4 \leftarrow R_4 - 14R_2$:

$$\begin{bmatrix} 1 & -2 & 0 & 4 \\ 0 & 1 & \tfrac{1}{7} & -\tfrac{12}{7} \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

This is in REF. There are **2 non-zero rows**, so $\dim(W) = 2$.

A basis for $W$ is:

$$\left\{(1, -2, 0, 4),\;\left(0, 1, \tfrac{1}{7}, -\tfrac{12}{7}\right)\right\}$$

Equivalently, scaling the second basis vector by $7$:

$$\{(1, -2, 0, 4),\;(0, 7, 1, -12)\}$$

> **Clarification:** You do not need to reach RREF — REF is sufficient to read off the dimension and obtain a basis. However, RREF sometimes yields "cleaner" basis vectors.

---

## 7. The Column Method: Basis from the Original Spanning Set

The row method produces a basis, but the basis vectors may differ from the original spanning vectors. If we want a basis consisting of vectors from the original set $S$, we use the **column method**. [▶ W4_L4 @ 11:49](https://www.youtube.com/watch?v=0yEKEavVQJE&t=709)

### Key Fact

Let $A$ be a matrix, and let $R$ be the row echelon form of $A$. Then the **columns of $A$** corresponding to the **pivot columns of $R$** form a basis for the column space of $A$.

### Procedure

1. Write the spanning vectors as the **columns** of a matrix $A$.
2. Row reduce $A$ to REF (or RREF).
3. Identify the **pivot columns** (the columns containing the leading $1$s).
4. The corresponding **original vectors** (columns of $A$) form a basis.
5. The number of pivot columns equals the dimension.

### Worked Example 1 (in $\mathbb{R}^3$)

**Example:** Find a basis for $W = \text{span}\{(1,0,1),\;(-2,-3,1),\;(3,3,0)\}$ consisting of vectors from this spanning set.

**Solution:** Write the vectors as columns:

$$A = \begin{bmatrix} 1 & -2 & 3 \\ 0 & -3 & 3 \\ 1 & 1 & 0 \end{bmatrix}$$

Row reduce:

$R_3 \leftarrow R_3 - R_1$:

$$\begin{bmatrix} 1 & -2 & 3 \\ 0 & -3 & 3 \\ 0 & 3 & -3 \end{bmatrix}$$

$R_2 \leftarrow -\tfrac{1}{3}R_2$:

$$\begin{bmatrix} 1 & -2 & 3 \\ 0 & 1 & -1 \\ 0 & 3 & -3 \end{bmatrix}$$

$R_3 \leftarrow R_3 - 3R_2$:

$$\begin{bmatrix} 1 & -2 & 3 \\ 0 & 1 & -1 \\ 0 & 0 & 0 \end{bmatrix}$$

The pivots are in **columns 1 and 2**. Therefore the first and second original vectors form a basis:

$$\{(1, 0, 1),\; (-2, -3, 1)\}$$

and $\dim(W) = 2$.

### Worked Example 2 (in $\mathbb{R}^4$)

**Example:** Find a basis for $W = \text{span}\{(1,-2,0,4),\;(3,1,1,0),\;(-1,-5,-1,8),\;(3,8,2,-12)\}$ from the original spanning set. [▶ W4_L4 @ 17:52](https://www.youtube.com/watch?v=0yEKEavVQJE&t=1072)

**Solution:** Write as columns:

$$A = \begin{bmatrix} 1 & 3 & -1 & 3 \\ -2 & 1 & -5 & 8 \\ 0 & 1 & -1 & 2 \\ 4 & 0 & 8 & -12 \end{bmatrix}$$

Row reduce. $R_2 \leftarrow R_2 + 2R_1$, $\;R_4 \leftarrow R_4 - 4R_1$:

$$\begin{bmatrix} 1 & 3 & -1 & 3 \\ 0 & 7 & -7 & 14 \\ 0 & 1 & -1 & 2 \\ 0 & -12 & 12 & -24 \end{bmatrix}$$

$R_2 \leftarrow \tfrac{1}{7}R_2$:

$$\begin{bmatrix} 1 & 3 & -1 & 3 \\ 0 & 1 & -1 & 2 \\ 0 & 1 & -1 & 2 \\ 0 & -12 & 12 & -24 \end{bmatrix}$$

$R_3 \leftarrow R_3 - R_2$, $\;R_4 \leftarrow R_4 + 12R_2$:

$$\begin{bmatrix} 1 & 3 & -1 & 3 \\ 0 & 1 & -1 & 2 \\ 0 & 0 & 0 & 0 \\ 0 & 