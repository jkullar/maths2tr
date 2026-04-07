---
id: "12"
number: 12
title: "ORTHOGONALITY"
section: "Weeks 5–8 · Linear Algebra Advanced"
---
# ORTHOGONALITY AND THE GRAM-SCHMIDT PROCESS

This file develops the theory of orthogonality in inner product spaces, building on the foundations laid in [[11 - INNER PRODUCTS]]. We study orthogonal and orthonormal sets, prove that orthogonal sets are automatically linearly independent, define projections onto subspaces, and present the Gram-Schmidt process — the central algorithm for converting any basis into an orthonormal one. The file concludes with orthogonal matrices and their connection to rotations. These ideas are essential in data science (e.g., QR factorisation, principal component analysis, least-squares regression) and throughout applied mathematics.

---

## 1. Orthogonal Vectors

### Definition

Let $V$ be an inner product space (see [[11 - INNER PRODUCTS]] for the axioms). Two vectors $\mathbf{u}, \mathbf{v} \in V$ are **orthogonal** if their inner product is zero: [▶ W8_L1 @ 01:39](https://www.youtube.com/watch?v=G9bYPb-qSfw&t=99)

$$\langle \mathbf{u}, \mathbf{v} \rangle = 0.$$

We write $\mathbf{u} \perp \mathbf{v}$ to denote orthogonality.

### Geometric Motivation in $\mathbb{R}^n$

Recall from [[11 - INNER PRODUCTS]] that the angle $\theta$ between two nonzero vectors $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$ satisfies

$$\cos\theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|\,\|\mathbf{v}\|}.$$

When $\theta = 90°$, we have $\cos\theta = 0$, which forces $\mathbf{u} \cdot \mathbf{v} = 0$. Thus, in $\mathbb{R}^n$ with the standard dot product, orthogonality corresponds exactly to perpendicularity.

**Example:** Show that $\mathbf{u} = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$ and $\mathbf{v} = \begin{bmatrix} 2 \\ 2 \\ -2 \end{bmatrix}$ are orthogonal in $\mathbb{R}^3$.

**Solution:**

$$\mathbf{u} \cdot \mathbf{v} = (1)(2) + (2)(2) + (3)(-2) = 2 + 4 - 6 = 0.$$

Since the dot product is zero, $\mathbf{u} \perp \mathbf{v}$.

> **Clarification:** Orthogonality depends on the chosen inner product. Two vectors may be orthogonal with respect to one inner product but not another. When no inner product is specified, the convention is that we use the standard dot product on $\mathbb{R}^n$.

**Example (non-standard inner product):** Consider $\mathbb{R}^2$ with the inner product

$$\langle \mathbf{u}, \mathbf{v} \rangle = x_1 y_1 - x_1 y_2 - x_2 y_1 + 2x_2 y_2,$$

where $\mathbf{u} = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix}$, $\mathbf{v} = \begin{bmatrix} y_1 \\ y_2 \end{bmatrix}$. Then $\begin{bmatrix} 1 \\ 1 \end{bmatrix}$ and $\begin{bmatrix} 1 \\ 0 \end{bmatrix}$ are orthogonal:

$$\langle \begin{bmatrix} 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ 0 \end{bmatrix} \rangle = (1)(1) - (1)(0) - (1)(1) + 2(1)(0) = 1 - 0 - 1 + 0 = 0.$$

Note that under the standard dot product, $\begin{bmatrix} 1 \\ 1 \end{bmatrix} \cdot \begin{bmatrix} 1 \\ 0 \end{bmatrix} = 1 \neq 0$, so these vectors are *not* orthogonal in the usual sense.

---

## 2. Orthogonal Sets and Linear Independence

### Orthogonal Sets

An **orthogonal set** of vectors in an inner product space $V$ is a set $S = \{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\}$ whose elements are **mutually (pairwise) orthogonal**: [▶ W8_L1 @ 05:45](https://www.youtube.com/watch?v=G9bYPb-qSfw&t=345)

$$\langle \mathbf{v}_i, \mathbf{v}_j \rangle = 0 \quad \text{for all } i \neq j.$$

**Example:** In $\mathbb{R}^3$ with the dot product, the set

$$S = \left\{ \begin{bmatrix} 4 \\ 3 \\ -2 \end{bmatrix},\; \begin{bmatrix} -3 \\ 2 \\ -3 \end{bmatrix},\; \begin{bmatrix} -5 \\ 18 \\ 17 \end{bmatrix} \right\}$$

is orthogonal. We verify all three pairwise dot products:

$$\begin{bmatrix} 4\\3\\-2 \end{bmatrix} \cdot \begin{bmatrix} -3\\2\\-3 \end{bmatrix} = -12 + 6 + 6 = 0, \qquad \begin{bmatrix} 4\\3\\-2 \end{bmatrix} \cdot \begin{bmatrix} -5\\18\\17 \end{bmatrix} = -20 + 54 - 34 = 0,$$

$$\begin{bmatrix} -3\\2\\-3 \end{bmatrix} \cdot \begin{bmatrix} -5\\18\\17 \end{bmatrix} = 15 + 36 - 51 = 0.$$

### Theorem: Orthogonal Sets of Nonzero Vectors Are Linearly Independent

Let $V$ be an inner product space. If $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\}$ is an orthogonal set of **nonzero** vectors, then it is linearly independent. [▶ W8_L1 @ 08:11](https://www.youtube.com/watch?v=G9bYPb-qSfw&t=491)

**Proof sketch.** Suppose $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_k\mathbf{v}_k = \mathbf{0}$. Take the inner product of both sides with $\mathbf{v}_j$ (for an arbitrary $j \in \{1, \ldots, k\}$):

$$\left\langle \sum_{i=1}^{k} c_i \mathbf{v}_i,\; \mathbf{v}_j \right\rangle = \langle \mathbf{0}, \mathbf{v}_j \rangle = 0.$$

By linearity of the inner product in the first argument:

$$\sum_{i=1}^{k} c_i \langle \mathbf{v}_i, \mathbf{v}_j \rangle = 0.$$

Since the set is orthogonal, $\langle \mathbf{v}_i, \mathbf{v}_j \rangle = 0$ for all $i \neq j$. The only surviving term is $i = j$:

$$c_j \langle \mathbf{v}_j, \mathbf{v}_j \rangle = 0.$$

Since $\mathbf{v}_j \neq \mathbf{0}$, we have $\langle \mathbf{v}_j, \mathbf{v}_j \rangle > 0$ (positive-definiteness of the inner product), so $c_j = 0$. Since $j$ was arbitrary, every coefficient is zero, proving linear independence. $\blacksquare$

> **Clarification:** The condition that each $\mathbf{v}_i \neq \mathbf{0}$ is essential. The zero vector is orthogonal to everything, but including it would destroy linear independence (since $1 \cdot \mathbf{0} = \mathbf{0}$ is a nontrivial dependence relation).

### Practical Significance

Checking linear independence directly requires solving a homogeneous system — potentially expensive (see [[6 - INDEPENDENCE]]). Checking orthogonality requires only computing $\binom{k}{2}$ inner products, each of which is a simple arithmetic operation. Thus orthogonality provides a **quick route to establishing linear independence**.

---

## 3. Orthogonal Basis

### Definition

An **orthogonal basis** for an inner product space $V$ is a basis that is also an orthogonal set. [▶ W8_L1 @ 13:08](https://www.youtube.com/watch?v=G9bYPb-qSfw&t=788)

Equivalently, since an orthogonal set of nonzero vectors is automatically linearly independent (Section 2), an orthogonal basis is a **maximal orthogonal set** — an orthogonal set that cannot be enlarged while remaining orthogonal.

If $\dim(V) = n$, then an orthogonal basis is any orthogonal set of exactly $n$ nonzero vectors.

### Examples

1. The **standard basis** $\{\mathbf{e}_1, \mathbf{e}_2, \ldots, \mathbf{e}_n\}$ of $\mathbb{R}^n$ is an orthogonal basis with respect to the dot product: $\mathbf{e}_i \cdot \mathbf{e}_j = 0$ for $i \neq j$.

2. The set $S$ from Section 2 (three mutually orthogonal vectors in $\mathbb{R}^3$) is an orthogonal basis for $\mathbb{R}^3$, since it is an orthogonal set of size $3 = \dim(\mathbb{R}^3)$.

---

## 4. Orthonormal Sets and Orthonormal Bases

### Orthonormal Sets

An **orthonormal set** of vectors in an inner product space $V$ is an orthogonal set in which every vector has unit norm: [▶ W8_L2 @ 01:21](https://www.youtube.com/watch?v=T646BdbrRm0&t=81)

$$\langle \mathbf{v}_i, \mathbf{v}_j \rangle = \begin{cases} 0 & \text{if } i \neq j, \\ 1 & \text{if } i = j. \end{cases}$$

The condition $\langle \mathbf{v}_i, \mathbf{v}_i \rangle = 1$ is equivalent to $\|\mathbf{v}_i\| = 1$.

**Example:** In $\mathbb{R}^4$ with the dot product, the set

$$\left\{ \begin{bmatrix} -1/\sqrt{3} \\ 1/\sqrt{3} \\ 1/\sqrt{3} \\ 0 \end{bmatrix},\; \begin{bmatrix} 2/\sqrt{42} \\ 1/\sqrt{42} \\ 1/\sqrt{42} \\ 6/\sqrt{42} \end{bmatrix},\; \begin{bmatrix} 2/3 \\ 0 \\ 2/3 \\ -1/3 \end{bmatrix} \right\}$$

is orthonormal. Verification of unit norms:

$$\left\|\mathbf{v}_1\right\|^2 = \tfrac{1}{3} + \tfrac{1}{3} + \tfrac{1}{3} = 1, \qquad \left\|\mathbf{v}_2\right\|^2 = \tfrac{4}{42} + \tfrac{1}{42} + \tfrac{1}{42} + \tfrac{36}{42} = 1, \qquad \left\|\mathbf{v}_3\right\|^2 = \tfrac{4}{9} + 0 + \tfrac{4}{9} + \tfrac{1}{9} = 1.$$

(Pairwise orthogonality can also be checked by computing the three dot products.)

### Orthonormal Basis

An **orthonormal basis** for $V$ is a basis that is also an orthonormal set. [▶ W8_L2 @ 04:39](https://www.youtube.com/watch?v=T646BdbrRm0&t=279)

Equivalently:
- An orthogonal basis in which every vector has norm 1.
- A maximal orthonormal set.
- An orthonormal set of size $n = \dim(V)$.

**Example:** The standard basis $\{\mathbf{e}_1, \ldots, \mathbf{e}_n\}$ of $\mathbb{R}^n$ is an orthonormal basis, since $\mathbf{e}_i \cdot \mathbf{e}_j = 0$ for $i \neq j$ and $\|\mathbf{e}_i\| = 1$.

**Example:** In $\mathbb{R}^3$ with the dot product, the set

$$\beta = \left\{ \frac{1}{3}\begin{bmatrix} 1\\2\\2 \end{bmatrix},\; \frac{1}{3}\begin{bmatrix} -2\\-1\\2 \end{bmatrix},\; \frac{1}{3}\begin{bmatrix} 2\\-2\\1 \end{bmatrix} \right\}$$

is an orthonormal basis. Verification:

$$\|\mathbf{v}_1\|^2 = \tfrac{1}{9}(1+4+4) = 1, \qquad \|\mathbf{v}_2\|^2 = \tfrac{1}{9}(4+1+4) = 1, \qquad \|\mathbf{v}_3\|^2 = \tfrac{1}{9}(4+4+1) = 1.$$

$$\langle \mathbf{v}_1, \mathbf{v}_2 \rangle = \tfrac{1}{9}(-2 - 2 + 4) = 0, \qquad \langle \mathbf{v}_1, \mathbf{v}_3 \rangle = \tfrac{1}{9}(2 - 4 + 2) = 0, \qquad \langle \mathbf{v}_2, \mathbf{v}_3 \rangle = \tfrac{1}{9}(-4 + 2 + 2) = 0.$$

Since this is an orthonormal set of 3 vectors and $\dim(\mathbb{R}^3) = 3$, it is an orthonormal basis.

### Normalising an Orthogonal Set

Given an orthogonal set $\gamma = \{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ of nonzero vectors, the corresponding **orthonormal set** is obtained by dividing each vector by its norm:

$$\beta = \left\{ \frac{\mathbf{v}_1}{\|\mathbf{v}_1\|},\; \frac{\mathbf{v}_2}{\|\mathbf{v}_2\|},\; \ldots,\; \frac{\mathbf{v}_k}{\|\mathbf{v}_k\|} \right\}.$$

**Why this works:**
- **Orthogonality is preserved:** $\left\langle \frac{\mathbf{v}_i}{\|\mathbf{v}_i\|}, \frac{\mathbf{v}_j}{\|\mathbf{v}_j\|} \right\rangle = \frac{1}{\|\mathbf{v}_i\|\,\|\mathbf{v}_j\|}\langle \mathbf{v}_i, \mathbf{v}_j \rangle = 0$ for $i \neq j$.
- **Unit norm:** $\left\| \frac{\mathbf{v}_i}{\|\mathbf{v}_i\|} \right\| = \frac{\|\mathbf{v}_i\|}{\|\mathbf{v}_i\|} = 1$.

**Example:** Let $\gamma = \left\{ \begin{bmatrix} 1\\3 \end{bmatrix}, \begin{bmatrix} -3\\1 \end{bmatrix} \right\}$ be an orthogonal basis for $\mathbb{R}^2$. Both vectors have norm $\sqrt{1+9} = \sqrt{10}$. The corresponding orthonormal basis is

$$\beta = \left\{ \frac{1}{\sqrt{10}}\begin{bmatrix} 1\\3 \end{bmatrix},\; \frac{1}{\sqrt{10}}\begin{bmatrix} -3\\1 \end{bmatrix} \right\}.$$

---

## 5. Coordinates in an Orthonormal Basis

### The Fourier Coefficient Formula

Let $\gamma = \{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n\}$ be an orthonormal basis for an inner product space $V$, and let $\mathbf{v} \in V$. Then: [▶ W8_L2 @ 16:48](https://www.youtube.com/watch?v=T646BdbrRm0&t=1008)

$$\mathbf{v} = \sum_{i=1}^{n} c_i \mathbf{v}_i \quad \text{where} \quad c_i = \langle \mathbf{v}, \mathbf{v}_i \rangle.$$

**Proof.** Since $\gamma$ is a basis, there exist unique scalars $c_1, \ldots, c_n$ with $\mathbf{v} = \sum_{i=1}^n c_i \mathbf{v}_i$. Take the inner product with $\mathbf{v}_j$:

$$\langle \mathbf{v}, \mathbf{v}_j \rangle = \left\langle \sum_{i=1}^n c_i \mathbf{v}_i,\; \mathbf{v}_j \right\rangle = \sum_{i=1}^n c_i \langle \mathbf{v}_i, \mathbf{v}_j \rangle = c_j \langle \mathbf{v}_j, \mathbf{v}_j \rangle = c_j \cdot 1 = c_j. \quad \blacksquare$$

### Why This Matters

For a general basis, finding the coefficients $c_i$ requires solving a system of $n$ linear equations. For an orthonormal basis, each coefficient is obtained by a single inner product — no system to solve.

### Worked Example

**Example:** Express $\mathbf{v} = \begin{bmatrix} 2 \\ 5 \end{bmatrix}$ in the orthonormal basis $\beta = \left\{ \frac{1}{\sqrt{10}}\begin{bmatrix} 1\\3 \end{bmatrix},\; \frac{1}{\sqrt{10}}\begin{bmatrix} -3\\1 \end{bmatrix} \right\}$ from Section 4.

**Solution:** Let $\mathbf{v}_1 = \frac{1}{\sqrt{10}}\begin{bmatrix} 1\\3 \end{bmatrix}$, $\mathbf{v}_2 = \frac{1}{\sqrt{10}}\begin{bmatrix} -3\\1 \end{bmatrix}$.

$$c_1 = \langle \mathbf{v}, \mathbf{v}_1 \rangle = \frac{1}{\sqrt{10}}(2 \cdot 1 + 5 \cdot 3) = \frac{17}{\sqrt{10}},$$

$$c_2 = \langle \mathbf{v}, \mathbf{v}_2 \rangle = \frac{1}{\sqrt{10}}(2 \cdot (-3) + 5 \cdot 1) = \frac{-1}{\sqrt{10}}.$$

Therefore:

$$\begin{bmatrix} 2\\5 \end{bmatrix} = \frac{17}{\sqrt{10}} \cdot \frac{1}{\sqrt{10}}\begin{bmatrix} 1\\3 \end{bmatrix} + \frac{-1}{\sqrt{10}} \cdot \frac{1}{\sqrt{10}}\begin{bmatrix} -3\\1 \end{bmatrix} = \frac{17}{10}\begin{bmatrix} 1\\3 \end{bmatrix} - \frac{1}{10}\begin{bmatrix} -3\\1 \end{bmatrix} = \begin{bmatrix} 17/10 + 3/10 \\ 51/10 - 1/10 \end{bmatrix} = \begin{bmatrix} 2\\5 \end{bmatrix}. \checkmark$$

---

## 6. Projections onto Subspaces

### Motivation: Nearest Point on a Line

Consider $\mathbb{R}^2$ with the dot product. Given a vector $\mathbf{b}$ and a line through the origin in the direction of $\mathbf{a}$, the **nearest point** on that line to $\mathbf{b}$ is obtained by dropping a perpendicular from $\mathbf{b}$ onto the line. The foot of the perpendicular is a scalar multiple of $\mathbf{a}$: [▶ W8_L3 @ 00:25](https://www.youtube.com/watch?v=Qyiw4opSG9U&t=25)

$$\mathbf{v} = \alpha \mathbf{a}, \qquad \alpha = \frac{\|\mathbf{v}\|}{\|\mathbf{a}\|}.$$

Using the relation $\|\mathbf{v}\| = \|\mathbf{b}\|\cos\theta$ and $\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|\,\|\mathbf{b}\|}$, we derive:

$$\mathbf{v} = \frac{\langle \mathbf{a}, \mathbf{b} \rangle}{\langle \mathbf{a}, \mathbf{a} \rangle}\,\mathbf{a}.$$

This is the **projection of $\mathbf{b}$ onto $\mathbf{a}$**.

### Projection onto a Single Vector

Let $V$ be an inner product space and $\mathbf{w} \neq \mathbf{0}$. The **projection of $\mathbf{v}$ onto $\mathbf{w}$** is: [▶ W8_L3 @ 19:17](https://www.youtube.com/watch?v=Qyiw4opSG9U&t=1157)

$$\text{proj}_{\mathbf{w}}(\mathbf{v}) = \frac{\langle \mathbf{v}, \mathbf{w} \rangle}{\langle \mathbf{w}, \mathbf{w} \rangle}\,\mathbf{w} = \frac{\langle \mathbf{v}, \mathbf{w} \rangle}{\|\mathbf{w}\|^2}\,\mathbf{w}.$$

If $\mathbf{w}$ already has unit norm ($\|\mathbf{w}\| = 1$), this simplifies to $\text{proj}_{\mathbf{w}}(\mathbf{v}) = \langle \mathbf{v}, \mathbf{w} \rangle\,\mathbf{w}$.

### Projection onto a Subspace (Orthonormal Basis)

Let $W$ be a subspace of an inner product space $V$, and let $\{\mathbf{w}_1, \ldots, \mathbf{w}_m\}$ be an **orthonormal basis** for $W$. The **projection of $\mathbf{v}$ onto $W$** is: [▶ W8_L3 @ 11:28](https://www.youtube.com/watch?v=Qyiw4opSG9U&t=688)

$$\text{proj}_W(\mathbf{v}) = \sum_{i=1}^{m} \langle \mathbf{v}, \mathbf{w}_i \rangle\,\mathbf{w}_i.$$

This vector is the unique element of $W$ closest to $\mathbf{v}$:

$$\text{proj}_W(\mathbf{v}) = \arg\min_{\mathbf{w} \in W} \|\mathbf{v} - \mathbf{w}\|.$$

> **Clarification:** The formula is **independent of the choice of orthonormal basis** for $W$. Different orthonormal bases yield the same projection vector.

### Projection onto a Subspace (Orthogonal Basis)

If $\{\mathbf{v}_1, \ldots, \mathbf{v}_m\}$ is an **orthogonal** (but not necessarily orthonormal) basis for $W$, then:

$$\text{proj}_W(\mathbf{v}) = \sum_{i=1}^{m} \frac{\langle \mathbf{v}, \mathbf{v}_i \rangle}{\langle \mathbf{v}_i, \mathbf{v}_i \rangle}\,\mathbf{v}_i = \sum_{i=1}^{m} \text{proj}_{\mathbf{v}_i}(\mathbf{v}).$$

The projection onto the subspace equals the sum of the projections onto each orthogonal basis vector.

### Worked Examples

**Example 1:** Let $V = \mathbb{R}^2$, $W = \text{span}\!\left\{\begin{bmatrix} 3\\1 \end{bmatrix}\right\}$, and $\mathbf{v} = \begin{bmatrix} 1\\3 \end{bmatrix}$.

**Solution:** An orthonormal basis for $W$ is $\left\{\frac{1}{\sqrt{10}}\begin{bmatrix} 3\\1 \end{bmatrix}\right\}$.

$$\text{proj}_W(\mathbf{v}) = \left\langle \begin{bmatrix} 1\\3 \end{bmatrix}, \frac{1}{\sqrt{10}}\begin{bmatrix} 3\\1 \end{bmatrix} \right\rangle \cdot \frac{1}{\sqrt{10}}\begin{bmatrix} 3\\1 \end{bmatrix} = \frac{1}{\sqrt{10}}(3+3) \cdot \frac{1}{\sqrt{10}}\begin{bmatrix} 3\\1 \end{bmatrix} = \frac{6}{10}\begin{bmatrix} 3\\1 \end{bmatrix} = \begin{bmatrix} 1.8\\0.6 \end{bmatrix}.$$

**Example 2:** Let $V = \mathbb{R}^3$, $W = \text{span}\!\left\{\begin{bmatrix} 1\\0\\0 \end{bmatrix}, \begin{bmatrix} 0\\1\\0 \end{bmatrix}\right\}$ (the $xy$-plane), $\mathbf{v} = \begin{bmatrix} 2\\3\\5 \end{bmatrix}$.

**Solution:** The given basis is already orthonormal. So:

$$\text{proj}_W(\mathbf{v}) = (2 \cdot 1)\begin{bmatrix} 1\\0\\0 \end{bmatrix} + (3 \cdot 1)\begin{bmatrix} 0\\1\\0 \end{bmatrix} = \begin{bmatrix} 2\\3\\0 \end{bmatrix}.$$

This is geometrically obvious: projecting onto the $xy$-plane simply drops the $z$-coordinate.

**Example 3:** Let $V = \mathbb{R}^3$, and $W = \text{span}\!\left\{\begin{bmatrix} 1\\2\\1 \end{bmatrix}, \begin{bmatrix} 1\\-1\\1 \end{bmatrix}\right\}$, $\mathbf{v} = \begin{bmatrix} -2\\2\\2 \end{bmatrix}$.

**Solution:** First verify orthogonality: $(1)(1) + (2)(-1) + (1)(1) = 0$. ✓ This is an orthogonal basis, so use the orthogonal projection formula:

$$\text{proj}_{\mathbf{v}_1}(\mathbf{v}) = \frac{\langle \mathbf{v}, \mathbf{v}_1 \rangle}{\langle \mathbf{v}_1, \mathbf{v}_1 \rangle}\mathbf{v}_1 = \frac{-2+4+2}{1+4+1}\begin{bmatrix} 1\\2\\1 \end{bmatrix} = \frac{4}{6}\begin{bmatrix} 1\\2\\1 \end{bmatrix} = \frac{2}{3}\begin{bmatrix} 1\\2\\1 \end{bmatrix},$$

$$\text{proj}_{\mathbf{v}_2}(\mathbf{v}) = \frac{\langle \mathbf{v}, \mathbf{v}_2 \rangle}{\langle \mathbf{v}_2, \mathbf{v}_2 \rangle}\mathbf{v}_2 = \frac{-2-2+2}{1+1+1}\begin{bmatrix} 1\\-1\\1 \end{bmatrix} = \frac{-2}{3}\begin{bmatrix} 1\\-1\\1 \end{bmatrix},$$

$$\text{proj}_W(\mathbf{v}) = \frac{2}{3}\begin{bmatrix} 1\\2\\1 \end{bmatrix} - \frac{2}{3}\begin{bmatrix} 1\\-1\\1 \end{bmatrix} = \begin{bmatrix} 0\\2\\0 \end{bmatrix}.$$

### The Orthogonal Complement

Given a subspace $W$ of an inner product space $V$, the **orthogonal complement** of $W$ is: [▶ W8_L3 @ 29:54](https://www.youtube.com/watch?v=Qyiw4opSG9U&t=1794)

$$W^\perp