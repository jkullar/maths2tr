---
id: "11"
number: 11
title: "INNER PRODUCTS"
section: "Weeks 5–8 · Linear Algebra Advanced"
---
# INNER PRODUCTS AND NORMS

This file develops the machinery for measuring **lengths**, **angles**, and **distances** in vector spaces. We begin with the familiar dot product in $\mathbb{R}^n$, show how it computes lengths and angles via the Pythagorean theorem, and then abstract these ideas to define **inner products** on general vector spaces. We then formalise the notion of length as a **norm**, establish the fundamental **Cauchy–Schwarz inequality**, and show that every inner product naturally induces a norm. These concepts are central to data science (measuring similarity between vectors), optimisation (projections), and the geometry of higher-dimensional spaces.

Prerequisites: [[5 - VECTORS AND SPACES]], [[6 - INDEPENDENCE]].

---

## 1. The Dot Product in $\mathbb{R}^n$

### Definition

The **dot product** (also called the **scalar product** or **Euclidean inner product**) of two vectors $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$ is the real number defined by [▶ W7_L3 @ 00:40](https://www.youtube.com/watch?v=TtQ6AQUlwl0&t=40)

$$\mathbf{u} \cdot \mathbf{v} \;=\; u_1 v_1 + u_2 v_2 + \cdots + u_n v_n \;=\; \sum_{i=1}^{n} u_i v_i.$$

Note that the dot product takes two vectors as input and produces a **scalar** (a real number), not a vector.

### In Matrix Notation

If we treat $\mathbf{u}$ and $\mathbf{v}$ as column vectors, then

$$\mathbf{u} \cdot \mathbf{v} = \mathbf{u}^T \mathbf{v}.$$

**Example (in $\mathbb{R}^2$):** Let $\mathbf{u} = \begin{bmatrix} 3 \\ 4 \end{bmatrix}$ and $\mathbf{v} = \begin{bmatrix} 2 \\ 7 \end{bmatrix}$.

**Solution:**

$$\mathbf{u} \cdot \mathbf{v} = 3 \cdot 2 + 4 \cdot 7 = 6 + 28 = 34.$$

**Example (in $\mathbb{R}^3$):** Let $\mathbf{u} = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$ and $\mathbf{v} = \begin{bmatrix} 2 \\ 0 \\ 1 \end{bmatrix}$. [▶ W7_L3 @ 09:55](https://www.youtube.com/watch?v=TtQ6AQUlwl0&t=595)

**Solution:**

$$\mathbf{u} \cdot \mathbf{v} = 1 \cdot 2 + 2 \cdot 0 + 3 \cdot 1 = 2 + 0 + 3 = 5.$$

### Basic Algebraic Properties

For all $\mathbf{u}, \mathbf{v}, \mathbf{w} \in \mathbb{R}^n$ and $c \in \mathbb{R}$:

| Property | Statement |
|---|---|
| **Commutativity** | $\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot \mathbf{u}$ |
| **Distributivity** | $\mathbf{u} \cdot (\mathbf{v} + \mathbf{w}) = \mathbf{u} \cdot \mathbf{v} + \mathbf{u} \cdot \mathbf{w}$ |
| **Scalar factoring** | $(c\,\mathbf{u}) \cdot \mathbf{v} = c\,(\mathbf{u} \cdot \mathbf{v})$ |
| **Positivity** | $\mathbf{u} \cdot \mathbf{u} \geq 0$, with equality if and only if $\mathbf{u} = \mathbf{0}$ |

These all follow directly from the definition and properties of real-number arithmetic. Commutativity holds because $u_i v_i = v_i u_i$ for each $i$.

---

## 2. Length (Norm) of a Vector via the Dot Product

### The Pythagorean Idea

In $\mathbb{R}^2$, the vector $\mathbf{v} = \begin{bmatrix} x \\ y \end{bmatrix}$ can be visualised as an arrow from the origin to the point $(x, y)$. Dropping a perpendicular to the $x$-axis creates a right triangle with legs of length $|x|$ and $|y|$. By the **Pythagorean theorem**, the length of $\mathbf{v}$ is [▶ W7_L3 @ 01:48](https://www.youtube.com/watch?v=TtQ6AQUlwl0&t=108)

$$\|\mathbf{v}\| = \sqrt{x^2 + y^2}.$$

**Example:** $\left\|\begin{bmatrix} 3 \\ 4 \end{bmatrix}\right\| = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5.$

### Extension to $\mathbb{R}^3$

For $\mathbf{v} = \begin{bmatrix} x \\ y \\ z \end{bmatrix} \in \mathbb{R}^3$, we apply the Pythagorean theorem twice: [▶ W7_L3 @ 11:59](https://www.youtube.com/watch?v=TtQ6AQUlwl0&t=719)

1. The projection onto the $xy$-plane has length $\sqrt{x^2 + y^2}$.
2. The full vector forms a right triangle with this projection (horizontal leg) and the $z$-component (vertical leg), so:

$$\|\mathbf{v}\| = \sqrt{(\sqrt{x^2 + y^2})^2 + z^2} = \sqrt{x^2 + y^2 + z^2}.$$

**Example:** $\left\|\begin{bmatrix} 4 \\ 3 \\ 3 \end{bmatrix}\right\| = \sqrt{16 + 9 + 9} = \sqrt{34}.$

### General Definition in $\mathbb{R}^n$

The **Euclidean length** (or **Euclidean norm**) of a vector $\mathbf{u} = \begin{bmatrix} u_1 \\ u_2 \\ \vdots \\ u_n \end{bmatrix} \in \mathbb{R}^n$ is

$$\|\mathbf{u}\| = \sqrt{u_1^2 + u_2^2 + \cdots + u_n^2} = \sqrt{\mathbf{u} \cdot \mathbf{u}}.$$

### The Key Link: Length from Dot Product

Observe that $\mathbf{u} \cdot \mathbf{u} = u_1^2 + u_2^2 + \cdots + u_n^2$. Therefore:

$$\boxed{\|\mathbf{u}\| = \sqrt{\mathbf{u} \cdot \mathbf{u}}.}$$

This relationship — that length is the square root of the dot product of a vector with itself — is the central idea that motivates the abstract definitions in Sections 4 and 6.

> **Clarification:** The notation $\|\mathbf{u}\|$ (with double bars) always denotes the **norm** or length, not absolute value. For a scalar $c \in \mathbb{R}$, we write $|c|$ for the absolute value.

---

## 3. Angles Between Vectors

### The Angle Formula

If $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$ are both nonzero, the **angle** $\theta$ between them satisfies [▶ W7_L3 @ 06:04](https://www.youtube.com/watch?v=TtQ6AQUlwl0&t=364)

$$\cos\theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|\;\|\mathbf{v}\|},$$

or equivalently,

$$\theta = \cos^{-1}\!\left(\frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|\;\|\mathbf{v}\|}\right).$$

We typically take $\theta \in [0, \pi]$ (i.e., $0$ to $180°$).

### Geometric Interpretation in $\mathbb{R}^3$ and Higher

For vectors in $\mathbb{R}^3$ (or $\mathbb{R}^n$ more generally), there is a unique plane containing both vectors (assuming they are not parallel). The angle $\theta$ is the angle between the vectors as measured within this plane. By rotating this plane to align with $\mathbb{R}^2$, the problem reduces to the familiar 2D case, and the same formula applies. [▶ W7_L3 @ 14:12](https://www.youtube.com/watch?v=TtQ6AQUlwl0&t=852)

### Worked Examples

**Example 1:** Find the angle between $\mathbf{u} = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$ and $\mathbf{v} = \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}$ in $\mathbb{R}^3$. [▶ W7_L3 @ 16:31](https://www.youtube.com/watch?v=TtQ6AQUlwl0&t=991)

**Solution:**

$$\mathbf{u} \cdot \mathbf{v} = 1(1) + 0(0) + 0(1) = 1$$

$$\|\mathbf{u}\| = \sqrt{1 + 0 + 0} = 1, \qquad \|\mathbf{v}\| = \sqrt{1 + 0 + 1} = \sqrt{2}$$

$$\cos\theta = \frac{1}{1 \cdot \sqrt{2}} = \frac{1}{\sqrt{2}} \implies \theta = \cos^{-1}\!\left(\frac{1}{\sqrt{2}}\right) = \frac{\pi}{4} \text{ radians} = 45°.$$

Both vectors lie in the $xz$-plane, confirming the geometric intuition.

**Example 2:** Find the angle between $\mathbf{u} = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$ and $\mathbf{v} = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}$.

**Solution:**

$$\mathbf{u} \cdot \mathbf{v} = 1, \qquad \|\mathbf{u}\| = 1, \qquad \|\mathbf{v}\| = \sqrt{3}$$

$$\cos\theta = \frac{1}{\sqrt{3}} \implies \theta = \cos^{-1}\!\left(\frac{1}{\sqrt{3}}\right) \approx 54.74°.$$

### Orthogonality

Two vectors $\mathbf{u}$ and $\mathbf{v}$ are **orthogonal** (perpendicular) if and only if $\mathbf{u} \cdot \mathbf{v} = 0$, since $\cos 90° = 0$.

| Angle $\theta$ | Dot product sign | Geometric meaning |
|---|---|---|
| $\theta = 0$ | $\mathbf{u} \cdot \mathbf{v} = \|\mathbf{u}\|\|\mathbf{v}\|$ | Same direction |
| $0 < \theta < \frac{\pi}{2}$ | $\mathbf{u} \cdot \mathbf{v} > 0$ | Acute angle |
| $\theta = \frac{\pi}{2}$ | $\mathbf{u} \cdot \mathbf{v} = 0$ | Orthogonal |
| $\frac{\pi}{2} < \theta < \pi$ | $\mathbf{u} \cdot \mathbf{v} < 0$ | Obtuse angle |
| $\theta = \pi$ | $\mathbf{u} \cdot \mathbf{v} = -\|\mathbf{u}\|\|\mathbf{v}\|$ | Opposite directions |

---

## 4. Abstract Inner Products

The dot product is just one way to "multiply" two vectors and get a scalar. The idea of an **inner product** captures the essential properties that make the dot product useful — positivity, symmetry, and linearity — and allows us to work in any vector space (polynomials, functions, matrices, etc.).

### Definition

An **inner product** on a (real) vector space $V$ is a function $\langle \cdot, \cdot \rangle : V \times V \to \mathbb{R}$ satisfying the following axioms for all $\mathbf{v}, \mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3 \in V$ and all $c \in \mathbb{R}$: [▶ W7_L4 @ 00:46](https://www.youtube.com/watch?v=HH2Md3dBlq4&t=46)

| # | Axiom | Statement |
|---|---|---|
| (IP1) | **Positive-definiteness** | $\langle \mathbf{v}, \mathbf{v} \rangle \geq 0$, with $\langle \mathbf{v}, \mathbf{v} \rangle = 0 \iff \mathbf{v} = \mathbf{0}$ |
| (IP2) | **Symmetry** | $\langle \mathbf{v}_1, \mathbf{v}_2 \rangle = \langle \mathbf{v}_2, \mathbf{v}_1 \rangle$ |
| (IP3) | **Additivity** | $\langle \mathbf{v}_1 + \mathbf{v}_2, \mathbf{v}_3 \rangle = \langle \mathbf{v}_1, \mathbf{v}_3 \rangle + \langle \mathbf{v}_2, \mathbf{v}_3 \rangle$ |
| (IP4) | **Homogeneity** | $\langle c\,\mathbf{v}_1, \mathbf{v}_2 \rangle = c\,\langle \mathbf{v}_1, \mathbf{v}_2 \rangle$ |

A vector space $V$ equipped with an inner product is called an **inner product space**. [▶ W7_L4 @ 03:24](https://www.youtube.com/watch?v=HH2Md3dBlq4&t=204)

### Consequences of the Axioms

Combining symmetry (IP2) with additivity (IP3) and homogeneity (IP4), we get **bilinearity**: the inner product is linear in **both** arguments.

- **Linearity in the second argument:** From (IP2) and (IP3),

$$\langle \mathbf{v}_1, \mathbf{v}_2 + \mathbf{v}_3 \rangle = \langle \mathbf{v}_2 + \mathbf{v}_3, \mathbf{v}_1 \rangle = \langle \mathbf{v}_2, \mathbf{v}_1 \rangle + \langle \mathbf{v}_3, \mathbf{v}_1 \rangle = \langle \mathbf{v}_1, \mathbf{v}_2 \rangle + \langle \mathbf{v}_1, \mathbf{v}_3 \rangle.$$

- **Scalar factoring in the second argument:** From (IP2) and (IP4),

$$\langle \mathbf{v}_1, c\,\mathbf{v}_2 \rangle = \langle c\,\mathbf{v}_2, \mathbf{v}_1 \rangle = c\,\langle \mathbf{v}_2, \mathbf{v}_1 \rangle = c\,\langle \mathbf{v}_1, \mathbf{v}_2 \rangle.$$

> **Clarification:** Axioms (IP3) and (IP4) state linearity in the **first** argument. Symmetry (IP2) then gives linearity in the second argument for free. Together, this is called **bilinearity** — the inner product is a **bilinear form**.

---

## 5. Examples of Inner Products

### Example 1: The Standard (Dot) Inner Product on $\mathbb{R}^n$

Define $\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v} = u_1 v_1 + u_2 v_2 + \cdots + u_n v_n$. [▶ W7_L4 @ 03:56](https://www.youtube.com/watch?v=HH2Md3dBlq4&t=236)

**Verification of (IP1):** $\langle \mathbf{u}, \mathbf{u} \rangle = u_1^2 + u_2^2 + \cdots + u_n^2$. This is a sum of squares of real numbers, so it is $\geq 0$. It equals $0$ if and only if every $u_i = 0$, i.e., $\mathbf{u} = \mathbf{0}$.

**Verification of (IP2):** $\langle \mathbf{u}, \mathbf{v} \rangle = \sum u_i v_i = \sum v_i u_i = \langle \mathbf{v}, \mathbf{u} \rangle$ since real multiplication commutes.

**Verification of (IP3)–(IP4):** Follow directly from distributivity and associativity of real-number arithmetic.

### Example 2: A Non-Standard Inner Product on $\mathbb{R}^2$

Let $\mathbf{u} = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix}$ and $\mathbf{v} = \begin{bmatrix} y_1 \\ y_2 \end{bmatrix}$. Define [▶ W7_L4 @ 06:00](https://www.youtube.com/watch?v=HH2Md3dBlq4&t=360)

$$\langle \mathbf{u}, \mathbf{v} \rangle = x_1 y_1 - x_1 y_2 - x_2 y_1 + 2\,x_2 y_2.$$

**Matrix form.** This can be written as

$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u}^T A \,\mathbf{v}, \qquad \text{where } A = \begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix}.$$

**Verification:**

$$\begin{bmatrix} x_1 & x_2 \end{bmatrix} \begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix} \begin{bmatrix} y_1 \\ y_2 \end{bmatrix} = \begin{bmatrix} x_1 - x_2 & -x_1 + 2x_2 \end{bmatrix} \begin{bmatrix} y_1 \\ y_2 \end{bmatrix} = x_1 y_1 - x_2 y_1 - x_1 y_2 + 2x_2 y_2. \checkmark$$

**Why the axioms hold:**

- **(IP2) Symmetry:** $A$ is symmetric ($A^T = A$), so $\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u}^T A \mathbf{v} = (\mathbf{u}^T A \mathbf{v})^T = \mathbf{v}^T A^T \mathbf{u} = \mathbf{v}^T A \mathbf{u} = \langle \mathbf{v}, \mathbf{u} \rangle$. (A $1 \times 1$ matrix equals its own transpose.)
- **(IP3)–(IP4) Bilinearity:** Follows from the distributive and scalar-factoring properties of matrix multiplication.
- **(IP1) Positive-definiteness:** We compute $\langle \mathbf{u}, \mathbf{u} \rangle$ directly:

$$\langle \mathbf{u}, \mathbf{u} \rangle = x_1^2 - 2x_1 x_2 + 2x_2^2 = (x_1 - x_2)^2 + x_2^2.$$

This is a sum of two squares, hence $\geq 0$. It equals $0$ only when $x_1 - x_2 = 0$ and $x_2 = 0$, which forces $x_1 = x_2 = 0$, i.e., $\mathbf{u} = \mathbf{0}$. $\checkmark$ [▶ W7_L4 @ 10:15](https://www.youtube.com/watch?v=HH2Md3dBlq4&t=615)

### General Pattern: Inner Products from Symmetric Positive-Definite Matrices

The previous example illustrates a general construction. If $A \in \mathbb{R}^{n \times n}$ is a **symmetric positive-definite** matrix (i.e., $A^T = A$ and $\mathbf{x}^T A \mathbf{x} > 0$ for all $\mathbf{x} \neq \mathbf{0}$), then

$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u}^T A \,\mathbf{v}$$

defines an inner product on $\mathbb{R}^n$. Conversely, every inner product on $\mathbb{R}^n$ can be written in this form.

### Example 3: An Inner Product on Function Spaces

Let $V = C([a,b])$ be the vector space of continuous real-valued functions on $[a,b]$. Define

$$\langle f, g \rangle = \int_a^b f(x)\,g(x)\,dx.$$

This is an inner product (verification uses properties of integration). This example shows the power of the abstract definition: inner products are not limited to $\mathbb{R}^n$.

> **Clarification:** Not every "formula that multiplies two vectors and gives a number" is an inner product. You must verify all four axioms. In particular, positive-definiteness (IP1) is often the hardest to check.

---

## 6. Norms on a Vector Space

### Definition

A **norm** on a vector space $V$ is a function $\|\cdot\| : V \to \mathbb{R}$ satisfying the following axioms for all $\mathbf{x}, \mathbf{y} \in V$ and $c \in \mathbb{R}$: [▶ W7_L4 @ 11:17](https://www.youtube.com/watch?v=HH2Md3dBlq4&t=677)

| # | Axiom | Statement |
|---|---|---|
| (N1) | **Triangle inequality** | $\|\mathbf{x} + \mathbf{y}\| \leq \|\mathbf{x}\| + \|\mathbf{y}\|$ |
| (N2) | **Absolute homogeneity** | $\|c\,\mathbf{x}\| = |c|\;\|\mathbf{x}\|$ |
| (N3) | **Positive-definiteness** | $\|\mathbf{x}\| \geq 0$, with $\|\mathbf{x}\| = 0 \iff \mathbf{x} = \mathbf{0}$ |

A vector space $V$ equipped with a norm is called a **normed vector space** (or **normed space**).

> **Clarification:** The norm axioms are stated for general vector spaces; they do **not** require an inner product. Every inner product induces a norm (see Section 7), but not every norm comes from an inner product.

### Example 1: The Euclidean Norm on $\mathbb{R}^n$

$$\|\mathbf{u}\|_2 = \sqrt{u_1^2 + u_2^2 + \cdots + u_n^2}.$$

This is the norm induced by the dot product: $\|\mathbf{u}\|_2 = \sqrt{\mathbf{u} \cdot \mathbf{u}}$.

**Verification of (N2):**

$$\|c\,\mathbf{u}\|_2 = \sqrt{(cu_1)^2 + (cu_2)^2 + \cdots + (cu_n)^2} = \sqrt{c^2(u_1^2 + \cdots + u_n^2)} = |c|\sqrt{u_1^2 + \cdots + u_n^2} = |c|\;\|\mathbf{u}\|_2. \checkmark$$

**Verification of (N3):** Sum of squares is $\geq 0$; equals $0$ iff every $u_i = 0$.

**Verification of (N1):** Requires the Cauchy–Schwarz inequality (see Section 8).

### Example 2: The 1-Norm (Taxicab Norm) on $\mathbb{R}^n$

Define [▶ W7_L4 @ 15:54](https://www.youtube.com/watch?v=HH2Md3dBlq4&t=954)

$$\|\mathbf{u}\|_1 = |u_1| + |u_2| + \cdots + |u_n|.$$

**Verification of (N3):** Each $|u_i| \geq 0$, so the sum is $\geq 0$. The sum equals $0$ iff every $|u_i| = 0$, i.e., $\mathbf{u} = \mathbf{0}$.

**Verification of (N2):**

$$\|c\,\mathbf{u}\|_1 = |cu_1| + |cu_2| + \cdots + |cu_n| = |c||u_1| + |c||u_2| + \cdots + |c||u_n| = |c|\;\|\mathbf{u}\|_1. \checkmark$$

**Verification of (N1):** Using the **triangle inequality for absolute values** ($|a + b| \leq |a| + |b|$):

$$\|\mathbf{u} + \mathbf{v}\|_1 = \sum_{i=1}^n |u_i + v_i| \leq \sum_{i=1}^n (|u_i| + |v_i|) = \sum_{i=1}^n |u_i| + \sum_{i=1}^n |v_i| = \|\mathbf{u}\|_1 + \|\mathbf{v}\|_1. \checkmark$$

### Example 3: The $\infty$-Norm (Max Norm) on $\mathbb{R}^n$

$$\|\mathbf{u}\|_\infty = \max\{|u_1|, |u_2|, \ldots, |u_n|\}.$$

This is also a valid norm (verification is a good exercise).

### Summary of Common Norms on $\mathbb{R}^n$

| Norm | Notation | Formula |
|---|---|---|
| Euclidean (2-norm) | $\|\mathbf{u}\|_2$ | $\sqrt{u_1^2 + u_2^2 + \cdots + u_n^2}$ |
| Taxicab (1-norm) | $\|\mathbf{u}\|_1$ | $|u_1| + |u_2| + \cdots + |u_n|$ |
| Max ($\infty$-norm) | $\|\mathbf{u}\|_\infty$ | $\max_i |u_i|$ |

> **Clarification:** When we write $\|\mathbf{u}\|$ without a subscript, we typically mean the Euclidean norm $\|\mathbf{u}\|_2$ unless otherwise stated.

---

## 7. From Inner Products to Norms

### Theorem: Every Inner Product Induces a Norm

Let $(V, \langle \cdot, \cdot \rangle)$ be an inner product space. Define [▶ W7_L4 @ 18:50](https://www.youtube.com/watch?v=HH2Md3dBlq4&t=1130)

$$\|\mathbf{v}\| = \sqrt{\langle \mathbf{v}, \mathbf{v} \rangle}.$$

Then $\|\cdot\|$ is a norm on $V$.

**Proof sketch:**

**(N3) Positive-definiteness:** By inner product axiom (IP1), $\langle \mathbf{v}, \mathbf{v} \rangle \geq 0$, so the square root is well-defined and non-negative. Moreover, $\|\mathbf{v}\| = 0 \iff \langle \mathbf{v}, \mathbf{v} \rangle = 0 \iff \mathbf{v} = \mathbf{0}$.

**(N2) Absolute homogeneity:**

$$\|c\,\mathbf{v}\| = \sqrt{\langle c\mathbf{v}, c\mathbf{v} \rangle} = \sqrt{c^2 \langle \mathbf{v}, \mathbf{v} \rangle} = |c| \sqrt{\langle \mathbf{v}, \mathbf{v} \rangle} = |c|\;\|\mathbf{v}\|.$$

Here we used homogeneity (IP4) twice: $\langle c\mathbf{v}, c\mathbf{v} \rangle = c\langle \mathbf{v}, c\mathbf{v} \rangle = c \cdot c\langle \mathbf{v}, \mathbf{v} \rangle = c^2 \langle \mathbf{v}, \mathbf{v} \rangle$.

**(N1) Triangle inequality:** This is the most substantial part and requires the **Cauchy–Schwarz inequality** (Section 8). The full argument is