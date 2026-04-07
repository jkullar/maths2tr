---
id: "9"
number: 9
title: "TRANSFORMATIONS"
section: "Weeks 5–8 · Linear Algebra Advanced"
---
# LINEAR TRANSFORMATIONS AND MATRICES

This file develops the machinery that connects **linear transformations** (abstract functions between vector spaces) to **matrices** (concrete rectangular arrays of numbers). The central idea is that once we fix ordered bases for the domain and codomain, every linear transformation corresponds to a unique matrix and vice versa. This bijection lets us translate abstract questions — Is the transformation injective? What is its image? — into concrete linear algebra computations: row reduction, null spaces, and column spaces. Prerequisites: [[8 - LINEAR MAPS]] for the definition of linear transformations, [[7 - BASIS AND RANK]] for bases, dimension, and rank, and [[1 - MATRICES]] for matrix operations and row reduction.

---

## 1. Ordered Bases

### Definition

An **ordered basis** for a vector space $V$ of dimension $n$ is a basis $(v_1, v_2, \dots, v_n)$ in which the listing order matters. [▶ W6_L1 @ 13:05](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=785)

As a set, $\{v_1, v_2\}$ and $\{v_2, v_1\}$ are the same basis. As ordered bases, $(v_1, v_2)$ and $(v_2, v_1)$ are **different**. The distinction is essential: changing the order of basis vectors changes the matrix that represents a given linear transformation.

### Notation

We write $\beta = (v_1, v_2, \dots, v_n)$ for an ordered basis of $V$ and $\gamma = (w_1, w_2, \dots, w_m)$ for an ordered basis of $W$.

**Example:** For $\mathbb{R}^2$, the **standard ordered basis** is $\beta = (e_1, e_2) = \bigl((1,0),\;(0,1)\bigr)$. The ordered basis $\beta' = \bigl((0,1),\;(1,0)\bigr)$ consists of the same vectors but in reverse order. These are different ordered bases.

### Coordinate Vectors

Given an ordered basis $\beta = (v_1, \dots, v_n)$ for $V$, every $v \in V$ can be written uniquely as

$$v = c_1 v_1 + c_2 v_2 + \cdots + c_n v_n.$$

The **coordinate vector** of $v$ with respect to $\beta$ is

$$[v]_\beta = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix} \in \mathbb{R}^n.$$

This gives an isomorphism $V \to \mathbb{R}^n$ that depends on the choice of $\beta$.

---

## 2. Every Finite-Dimensional Vector Space Is Isomorphic to $\mathbb{R}^n$

### Statement

Let $V$ be a vector space with $\dim(V) = n$, and choose a basis $\beta = (v_1, \dots, v_n)$. Define $\phi_\beta : V \to \mathbb{R}^n$ by

$$\phi_\beta\!\left(\sum_{i=1}^n c_i v_i\right) = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix}.$$ [▶ W6_L1 @ 02:34](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=154)

Then $\phi_\beta$ is an **isomorphism** of vector spaces (a bijective linear transformation).

### Proof Sketch

- **Linearity.** If $v = \sum c_i v_i$ and $u = \sum d_i v_i$, then $v + \alpha u = \sum (c_i + \alpha d_i) v_i$, so $\phi_\beta(v + \alpha u) = \phi_\beta(v) + \alpha\,\phi_\beta(u)$.
- **Surjective.** Given $(x_1, \dots, x_n)^T \in \mathbb{R}^n$, set $v = \sum x_i v_i$. Then $\phi_\beta(v) = (x_1, \dots, x_n)^T$.
- **Injective.** If $\phi_\beta(v) = 0$, then every $c_i = 0$, so $v = 0$.

### Example: A Subspace of $\mathbb{R}^3$

Let $W = \{(x, y, z) \in \mathbb{R}^3 : x + y + z = 0\}$. This is a subspace of dimension 2 with basis $\beta = \bigl((-1,1,0),\;(-1,0,1)\bigr)$.

Define $f: W \to \mathbb{R}^2$ by $f(v_1) = (1,0)$ and $f(v_2) = (0,1)$, then extend by linearity. [▶ W6_L1 @ 07:28](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=448)

Any $(x,y,z) \in W$ satisfies $x = -y - z$, so

$$(x,y,z) = y(-1,1,0) + z(-1,0,1).$$

Therefore $f(x,y,z) = (y,z)$ — the projection onto the $yz$-coordinates. One can verify:

- **Onto:** Given $(y,z) \in \mathbb{R}^2$, set $x = -y-z$. Then $(x,y,z) \in W$ and $f(x,y,z) = (y,z)$.
- **One-to-one:** If $f(x,y,z) = (0,0)$, then $y = 0$, $z = 0$, so $x = 0$.

Hence $f$ is an isomorphism and $W \cong \mathbb{R}^2$.

> **Clarification:** The isomorphism $\phi_\beta$ depends on the choice of basis $\beta$. A different basis gives a different (but equally valid) isomorphism. The abstract vector space $V$ and $\mathbb{R}^n$ are isomorphic, but not in a single "canonical" way unless a basis is specified.

---

## 3. Matrix Representation of a Linear Transformation

### Construction

Let $T: V \to W$ be a linear transformation, with ordered bases $\beta = (v_1, \dots, v_n)$ for $V$ and $\gamma = (w_1, \dots, w_m)$ for $W$. [▶ W6_L1 @ 13:05](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=785)

Since each $T(v_j)$ lies in $W$, it can be expressed uniquely in terms of $\gamma$:

$$T(v_j) = a_{1j}\,w_1 + a_{2j}\,w_2 + \cdots + a_{mj}\,w_m, \qquad j = 1, 2, \dots, n.$$

The **matrix of $T$ with respect to $\beta$ and $\gamma$** is the $m \times n$ matrix

$$[T]_\beta^\gamma = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{bmatrix}.$$

**Key rule:** The $j$-th column of $[T]_\beta^\gamma$ is the coordinate vector $[T(v_j)]_\gamma$.

### How to Compute the Matrix — Step by Step

1. Apply $T$ to each basis vector $v_j$ of $\beta$.
2. Express $T(v_j)$ as a linear combination of the basis vectors $w_1, \dots, w_m$ of $\gamma$.
3. Place the coefficients as the $j$-th column of the matrix.

### Example 1: Standard Bases

Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be defined by $T(x,y) = (2x, y)$. Choose $\beta = \gamma = (e_1, e_2)$, the standard ordered basis. [▶ W6_L1 @ 11:48](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=708)

**Solution:**

$$T(e_1) = T(1,0) = (2,0) = 2\cdot(1,0) + 0\cdot(0,1)$$
$$T(e_2) = T(0,1) = (0,1) = 0\cdot(1,0) + 1\cdot(0,1)$$

So the matrix is:

$$[T]_\beta^\gamma = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}.$$

This recovers the familiar fact: $T(x,y) = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix}$.

### Example 2: Non-Standard Basis

Same transformation $T(x,y) = (2x,y)$, but now choose $\beta = \gamma = \bigl((1,0),\;(1,1)\bigr)$. [▶ W6_L1 @ 15:43](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=943)

**Solution:**

$$T(1,0) = (2,0) = 2\cdot(1,0) + 0\cdot(1,1) \quad \Longrightarrow \quad \text{column 1} = \begin{bmatrix} 2 \\ 0 \end{bmatrix}$$

$$T(1,1) = (2,1) = ?\cdot(1,0) + ?\cdot(1,1)$$

Solve: $a(1,0) + b(1,1) = (2,1)$ gives $a + b = 2$ and $b = 1$, so $a = 1$, $b = 1$.

$$T(1,1) = 1\cdot(1,0) + 1\cdot(1,1) \quad \Longrightarrow \quad \text{column 2} = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$$

$$[T]_\beta^\gamma = \begin{bmatrix} 2 & 1 \\ 0 & 1 \end{bmatrix}.$$

> **Clarification:** The same linear transformation $T(x,y) = (2x,y)$ produced the matrix $\begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}$ with the standard basis but $\begin{bmatrix} 2 & 1 \\ 0 & 1 \end{bmatrix}$ with a different basis. **Changing the ordered bases changes the matrix representation.** The linear transformation itself has not changed — only the "coordinate description" has. [▶ W6_L1 @ 25:29](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=1529)

### Example 3: Transformation Between Different Spaces

Let $W = \{(x,y,z) \in \mathbb{R}^3 : x+y+z=0\}$ and $V = \mathbb{R}^2$. Let $\beta = \bigl((-1,1,0),\;(-1,0,1)\bigr)$ and $\gamma = (e_1, e_2)$. Define $f: W \to V$ by $f(x,y,z) = (y,z)$. [▶ W6_L1 @ 23:55](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=1435)

**Solution:**

$$f(-1,1,0) = (1,0) = 1\cdot e_1 + 0\cdot e_2 \quad \Longrightarrow \quad \text{column 1} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$$

$$f(-1,0,1) = (0,1) = 0\cdot e_1 + 1\cdot e_2 \quad \Longrightarrow \quad \text{column 2} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

$$[f]_\beta^\gamma = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I_2.$$

The identity matrix appears because the basis $\beta$ was chosen so that $f$ maps each basis vector to the corresponding standard basis vector.

---

## 4. The Bijection Between Linear Transformations and Matrices

### Theorem

Let $V$ and $W$ be finite-dimensional vector spaces with $\dim(V) = n$ and $\dim(W) = m$. Fix ordered bases $\beta$ for $V$ and $\gamma$ for $W$. Then the map

$$T \;\longmapsto\; [T]_\beta^\gamma$$

is a **bijection** between the set of all linear transformations $T: V \to W$ and the set of all $m \times n$ real matrices $\mathbb{R}^{m \times n}$. [▶ W6_L1 @ 20:31](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=1231)

### Direction 1: From Transformation to Matrix

Given $T$, compute $[T]_\beta^\gamma$ by the column-by-column procedure in Section 3.

### Direction 2: From Matrix to Transformation

Given an $m \times n$ matrix $A = (a_{ij})$ and ordered bases $\beta = (v_1, \dots, v_n)$, $\gamma = (w_1, \dots, w_m)$, define

$$T(v_j) = \sum_{i=1}^m a_{ij}\, w_i, \qquad j = 1, \dots, n,$$

and extend by linearity: for $v = \sum_{j=1}^n c_j v_j$,

$$T(v) = \sum_{j=1}^n c_j \, T(v_j) = \sum_{j=1}^n c_j \sum_{i=1}^m a_{ij}\, w_i.$$

This produces a well-defined linear transformation whose matrix representation is precisely $A$. [▶ W6_L1 @ 16:50](https://www.youtube.com/watch?v=lVX2mih3mcQ&t=1010)

### Why It Is a Bijection

- **Starting from $A$:** construct $T$, then compute $[T]_\beta^\gamma$. The columns of $[T]_\beta^\gamma$ are, by construction, the columns of $A$. So $[T]_\beta^\gamma = A$.
- **Starting from $T$:** compute $A = [T]_\beta^\gamma$, then build a transformation $T'$ from $A$. Since $T'(v_j) = T(v_j)$ for all basis vectors, and both are linear, $T' = T$.

> **Clarification:** The bijection depends on the choice of $\beta$ and $\gamma$. With different ordered bases, the same transformation maps to a different matrix. The set of all matrices obtainable from a single transformation by varying the bases is an important topic (change of basis / similarity), treated later.

---

## 5. Kernel of a Linear Transformation

### Definition

Let $T: V \to W$ be a linear transformation. The **kernel** (or **null space**) of $T$ is [▶ W6_L2 @ 00:48](https://www.youtube.com/watch?v=e4BXKGcntiQ&t=48)

$$\ker(T) = \{v \in V : T(v) = 0_W\}.$$

### The Kernel Is a Subspace of $V$

Let $v_1, v_2 \in \ker(T)$ and $c \in \mathbb{R}$. Then:

$$T(v_1 + c\,v_2) = T(v_1) + c\,T(v_2) = 0_W + c \cdot 0_W = 0_W,$$

so $v_1 + c\,v_2 \in \ker(T)$. Hence $\ker(T)$ is a subspace of $V$.

### Examples

**Example 1:** $T: \mathbb{R}^2 \to \mathbb{R}^2$, $T(x,y) = (2x, y)$. [▶ W6_L2 @ 03:26](https://www.youtube.com/watch?v=e4BXKGcntiQ&t=206)

**Solution:** $T(x,y) = (0,0)$ requires $2x = 0$ and $y = 0$, giving $x = 0$, $y = 0$. So $\ker(T) = \{(0,0)\}$.

**Example 2:** $T: \mathbb{R}^2 \to \mathbb{R}^2$, $T(x,y) = (2x, 0)$. [▶ W6_L2 @ 05:46](https://www.youtube.com/watch?v=e4BXKGcntiQ&t=346)

**Solution:** $T(x,y) = (0,0)$ requires $2x = 0$, so $x = 0$ and $y$ is free. Hence $\ker(T) = \{(0, y) : y \in \mathbb{R}\}$, which is the $y$-axis.

---

## 6. Image of a Linear Transformation

### Definition

The **image** (or **range**) of $T: V \to W$ is [▶ W6_L2 @ 01:28](https://www.youtube.com/watch?v=e4BXKGcntiQ&t=88)

$$\text{im}(T) = \{w \in W : w = T(v) \text{ for some } v \in V\}.$$

### The Image Is a Subspace of $W$

If $w_1 = T(v_1)$ and $w_2 = T(v_2)$ are in $\text{im}(T)$, then for any scalar $\alpha$:

$$w_1 + \alpha\, w_2 = T(v_1) + \alpha\, T(v_2) = T(v_1 + \alpha\, v_2) \in \text{im}(T).$$

### Examples

**Example 1:** $T(x,y) = (2x, y)$.

**Solution:** Given any $(u,v) \in \mathbb{R}^2$, set $(x,y) = (u/2, v)$. Then $T(u/2, v) = (u, v)$, so $\text{im}(T) = \mathbb{R}^2$.

**Example 2:** $T(x,y) = (2x, 0)$. [▶ W6_L2 @ 05:46](https://www.youtube.com/watch?v=e4BXKGcntiQ&t=346)

**Solution:** Every output has the form $(2x, 0)$, so $\text{im}(T) \subseteq \{(u, 0) : u \in \mathbb{R}\}$. Conversely, $(u, 0) = T(u/2, 0)$, so $\text{im}(T) = \{(u,0) : u \in \mathbb{R}\}$, the $x$-axis.

---

## 7. Injectivity, Surjectivity, and the Kernel/Image

### Injectivity and the Kernel

A linear transformation $T: V \to W$ is **injective** (one-to-one) if and only if

$$\ker(T) = \{0_V\}.$$ [▶ W6_L2 @ 07:50](https://www.youtube.com/watch?v=e4BXKGcntiQ&t=470)

**Proof.**

$(\Rightarrow)$ Suppose $T$ is injective and $v \in \ker(T)$. Then $T(v) = 0_W = T(0_V)$. By injectivity, $v = 0_V$. So $\ker(T) = \{0_V\}$.

$(\Leftarrow)$ Suppose $\ker(T) = \{0_V\}$ and $T(v_1) = T(v_2)$. Then $T(v_1 - v_2) = 0_W$, so $v_1 - v_2 \in \ker(T) = \{0_V\}$, giving $v_1 = v_2$. So $T$ is injective.

### Surjectivity and the Image

A linear transformation $T: V \to W$ is **surjective** (onto) if and only if

$$\text{im}(T) = W.$$ [▶ W6_L2 @ 10:26](https://www.youtube.com/watch?v=e4BXKGcntiQ&t=626)

This is immediate from the definitions: surjectivity means every element of $W$ is hit by $T$, which is precisely the statement that the image equals $W$.

### Summary Table

| Property | Equivalent Condition | How to Check via Matrix |
|---|---|---|
| $T$ is injective | $\ker(T) = \{0\}$ | $\text{null}(A) = \{0\}$, i.e., nullity $= 0$ |
| $T$ is surjective | $\text{im}(T) = W$ | Column space of $A$ is all of $\mathbb{R}^m$, i.e., rank $= m$ |
| $T$ is bijective (isomorphism) | Both of the above | $n = m$ and $A$ is invertible |

See also [[8 - LINEAR MAPS]] for further discussion of injectivity and surjectivity.

---

## 8. Connection to Null Spaces and Column Spaces

Once ordered bases $\beta$ and $\gamma$ are fixed and the matrix $A = [T]_\beta^\gamma$ is computed, the abstract kernel and image correspond precisely to the null space and column space studied in [[7 - BASIS AND RANK]] and [[8 - LINEAR MAPS]].

### Kernel and Null Space

Let $T: V \to W$ with matrix $A = [T]_\beta^\gamma$. Then: [▶ W6_L2 @ 12:01](https://www.youtube.com/watch?v=e4BXKGcntiQ&t=721)

$$v \in \ker(T) \quad \Longleftrightarrow \quad [v]_\beta \in \text{null}(A).$$

**Derivation.** Write $v = \sum_{j=1}^n c_j v_j$. Then

$$T(v) = \sum_{j=1}^n c_j\, T(v_j) = \sum_{j=1}^n c_j \sum_{i=1}^m a_{ij}\, w_i = \sum_{i=1}^m \left(\sum_{j=1}^n a_{ij}\, c_j\right) w_i.$$

Since $\gamma$ is a basis, $T(v) = 0_W$ if and only if every coefficient vanishes:

$$\sum_{j=1}^n a_{ij}\, c_j = 0 \quad \text{for all } i = 1, \dots, m.$$

This is exactly the system $A\mathbf{c} = \mathbf{0}$, where $\mathbf{c} = [v]_\beta$. Hence $v \in \ker(T)$ if and only if $[v]_\beta \in \text{null}(A)$.

The coordinate map $v \mapsto [v]_\beta$ restricts to an **isomorphism** $\ker(T) \cong \text{null}(A)$.

### Image and Column Space

Similarly: [▶ W6_L2 @ 16:25](https://www.youtube.com/watch?v=e4BXKGcntiQ&t=985)

$$w \in \text{im}(T) \quad \Longleftrightarrow \quad [w]_\gamma \in \text{col}(A).$$

**Derivation.** A vector $w = \sum_{i=1}^m d_i w_i$ lies in $\text{im}(T)$ if and only if there exist scalars $c_1, \dots, c_n$ such that

$$d_i = \sum_{j=1}^n a_{ij}\, c_j \quad \text{for all } i,$$

which is the system $\mathbf{d} = A\mathbf{c}$. This holds if and only if $\mathbf{d}$ is a linear combination of the columns of $A$, i.e., $\mathbf{d} \in \text{col}(A)$.

The coordinate map $w \mapsto [w]_\gamma$ restricts to an isomorphism $\text{im}(T) \cong \text{col}(A)$.

### Consequence: Translating Basis Computations

| Abstract object | Matrix object | How to compute |
|---|---|---|
| $\ker(T)$ | $\text{null}(A)$ | Row reduce $A$, read off null space basis, translate back via $\beta$ |
| $\text{im}(T)$ | $\text{col}(A)$ | Row reduce $A$, identify pivot columns, translate back via $\gamma$ |

---

## 9. Finding Bases for the Kernel and Image

### The Method

1. Choose ordered bases $\beta$ for $V$ and $\gamma$ for $W$.
2. Compute the matrix $A = [T]_\beta^\gamma$.
3. Row reduce $A$ to reduced row echelon form (RREF).
4. **For $\ker(T)$:** Find a basis for $\text{null}(A)$ (free variables give basis vectors). Convert each null-space basis vector back to a vector in $V$ using $\beta$.
5. **For $\text{im}(T)$:** Identify the pivot columns. The corresponding columns of the **original** matrix $A$ form a basis for $\text{col}(A)$. Convert each column-space basis vector back to a vector in $W$ using $\gamma$.

For full details on row reduction and finding bases, see [[7 - BASIS AND RANK]] and [[8 - LINEAR MAPS]].

### Example 1: Standard Bases ($\mathbb{R}^4 \to \mathbb{R}^3$)

Let $T: \mathbb{R}^4 \to \mathbb{R}^3$ be defined by [▶ W6_L3 @ 03:49](https://www.youtube.com/watch?v=5slY2FjErkc&t=229)

$$T(x_1, x_2, x_3, x_4) = (2x_1 + 4x_2 + 6x_3 + 8x_4,\; x_1 + 3x_2 + 5x_4,\; x_1 + x_2 + 6x_3 + 3x_4).$$

Choose $\beta$ and $\gamma$ to be the standard ordered bases for $\mathbb{R}^4$ and $\mathbb{R}^3$.

**Solution:**

**Step 1 — Write the matrix.** With standard bases, the matrix is read directly from the coefficients:

$$A = \begin{bmatrix} 2 & 4 & 6 & 8 \\ 1 & 3 & 0 & 5 \\ 1 & 1 & 6 & 3 \end{bmatrix}.$$

**Step 2 — Row reduce.**

$$\begin{bmatrix} 2 & 4 & 6 & 8 \\ 1 & 3 & 0 & 5 \\ 1 & 1 & 6 & 3 \end{bmatrix} \xrightarrow{\frac{1}{2}R_1} \begin{bmatrix} 1 & 2 & 3 & 4 \\ 1 & 3 & 0 & 5 \\ 1 & 1 & 6 & 3 \end{bmatrix}$$

$$\xrightarrow{R_2 - R_1,\; R_3 - R_1} \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 1 & -3 & 1 \\ 0 & -1 & 3 & -1 \end{bmatrix}$$

$$\xrightarrow{R_3 + R_2} \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 1 & -3 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

$$\xrightarrow{R_1 - 2R_2} \begin{bmatrix} 1 & 0 & 9 & 2 \\ 0 & 1 & -3 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}.$$

**Step 3 — Basis for $\ker(T)$.**

Pivot columns: 1 and 2. Free variables: $x_3 = s$, $x_4 = t$.

From the RREF:

$$\begin{cases} x_1 + 9x_3 + 2x_4 = 0 \\ x_2 - 3x_3 + x_4 = 0 \end{cases} \quad \Longrightarrow \quad \begin{cases} x_1 = -9s - 2t \\ x_2 = 3s - t \end{cases}$$

Setting $(s,t) = (1,0)$ and $(0,1)$:

$$\ker(T) = \text{span}\left\{\begin{bmatrix} -9 \\ 3 \\ 1 \\ 0 \end{bmatrix},\; \begin{bmatrix} -2 \\ -1 \\ 0 \\ 1 \end{bmatrix}\right\}.$$

Since $\beta$ is the standard basis, these coordinate vectors are literally the vectors in $\mathbb{R}^4$: a basis for $\ker(T)$ is $\{(-9, 3, 1, 0),\; (-2, -1, 0, 1)\}$. [▶ W6_L3 @ 07:33](https://www.youtube.com/watch?v=5slY2FjErkc&t=453)

**Step 4