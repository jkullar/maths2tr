---
id: "5"
number: 5
title: "VECTORS AND SPACES"
section: "Weeks 1–4 · Linear Algebra Foundations"
---
# VECTORS AND SPACES

This file develops the foundational language of linear algebra: **vectors**, the **operations** we perform on them, and the **spaces** in which they live. We begin with the concrete view of vectors as ordered lists of real numbers, define addition and scalar multiplication component-wise, and show how these operations arise naturally from working with data. We then abstract these properties into the formal definition of a **vector space**, study **subspaces** and the **subspace test**, and introduce **span**, **spanning sets**, and the **column space** of a matrix. Every concept built in later files — linear independence, bases, dimension, linear transformations — rests on the ideas developed here.

---

## 1. Vectors as Lists of Numbers

### Definition

A **vector** is an ordered list (or tuple) of real numbers. [▶ W1_L1 @ 02:42](https://www.youtube.com/watch?v=1So2VV9Tm_A&t=162) A vector with $n$ entries is called a **vector in $\mathbb{R}^n$** (read "R-n"). We write vectors in two equivalent forms:

**Row vector:** a $1 \times n$ arrangement,

$$\mathbf{v} = \begin{bmatrix} v_1 & v_2 & \cdots & v_n \end{bmatrix}$$

**Column vector:** an $n \times 1$ arrangement,

$$\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix}$$

The individual numbers $v_1, v_2, \ldots, v_n$ are called the **components** (or **entries**, or **coordinates**) of the vector. The number $n$ is called the **size** or **dimension** of the vector.

> **Clarification:** Whether we write a vector as a row or a column depends on context. In most of linear algebra the default is the column vector. A row vector and a column vector with the same entries carry the same information, but they are formally different objects (a $1 \times n$ matrix versus an $n \times 1$ matrix). See [[1 - MATRICES]] for the distinction.

### Vectors from Data

Vectors arise naturally from tabular data. Each row or column of a data table — once headings are removed — is a vector.

**Example (GDP data):** A table of sector-wise GDP across years has rows indexed by year and columns indexed by sector. The row for the year 2010–11 is a vector in $\mathbb{R}^7$ (one component per sector), and the column for total GDP across 13 years is a vector in $\mathbb{R}^{13}$.

**Example (Cricket averages):** A table of batting averages with players as columns and opposition teams as rows yields vectors such as

$$\mathbf{v}_{\text{Kohli}} = \begin{bmatrix} 54.57 \\ 45.30 \\ 59.91 \\ 64.35 \\ 60.00 \\ 48.72 \end{bmatrix} \in \mathbb{R}^6$$

representing Kohli's averages against six different teams.

---

## 2. Vector Addition and Scalar Multiplication

### Vector Addition

Given two vectors of the **same size** $n$,

$$\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix}, \qquad \mathbf{w} = \begin{bmatrix} w_1 \\ w_2 \\ \vdots \\ w_n \end{bmatrix},$$

their **sum** is defined **component-wise**: [▶ W1_L1 @ 11:09](https://www.youtube.com/watch?v=1So2VV9Tm_A&t=669)

$$\mathbf{v} + \mathbf{w} = \begin{bmatrix} v_1 + w_1 \\ v_2 + w_2 \\ \vdots \\ v_n + w_n \end{bmatrix}$$

Vectors of different sizes **cannot** be added — the operation is undefined.

**Example (Grocery shopping):** Arun needs $\begin{bmatrix} 3 \\ 2 \end{bmatrix}$ (rice kg, dal kg) and Neela needs $\begin{bmatrix} 5 \\ 6 \end{bmatrix}$.

$$\begin{bmatrix} 3 \\ 2 \end{bmatrix} + \begin{bmatrix} 5 \\ 6 \end{bmatrix} = \begin{bmatrix} 3+5 \\ 2+6 \end{bmatrix} = \begin{bmatrix} 8 \\ 8 \end{bmatrix}$$

Together they need 8 kg of rice and 8 kg of dal.

### Scalar Multiplication

Given a scalar $c \in \mathbb{R}$ and a vector $\mathbf{v} \in \mathbb{R}^n$, the **scalar multiple** is defined component-wise: [▶ W1_L1 @ 19:04](https://www.youtube.com/watch?v=1So2VV9Tm_A&t=1144)

$$c\,\mathbf{v} = \begin{bmatrix} c\,v_1 \\ c\,v_2 \\ \vdots \\ c\,v_n \end{bmatrix}$$

**Example:** If buyer A's purchase vector is $\mathbf{a} = \begin{bmatrix} 8 & 8 & 4 & 10 & 4 \end{bmatrix}$ and the same purchase is repeated the next day, the two-day total is

$$\mathbf{a} + \mathbf{a} = 2\,\mathbf{a} = \begin{bmatrix} 16 & 16 & 8 & 20 & 8 \end{bmatrix}$$

### A Larger Worked Example: Stock-Taking

A grocery shop tracks five items: rice (kg), dal (kg), oil (litres), biscuit packets, soap bars.

| | Stock | Buyer A | Buyer B | Buyer C | New stock |
|---|---|---|---|---|---|
| Rice | 150 | 8 | 12 | 3 | 100 |
| Dal | 50 | 8 | 5 | 2 | 75 |
| Oil | 35 | 4 | 7 | 5 | 30 |
| Biscuits | 70 | 10 | 10 | 5 | 80 |
| Soap | 25 | 4 | 2 | 1 | 30 |

Sales are subtracted; new stock is added. In vector form:

$$\mathbf{s}_{\text{new}} = \begin{bmatrix}150\\50\\35\\70\\25\end{bmatrix} + \left(-\begin{bmatrix}8\\8\\4\\10\\4\end{bmatrix}\right) + \left(-\begin{bmatrix}12\\5\\7\\10\\2\end{bmatrix}\right) + \left(-\begin{bmatrix}3\\2\\5\\5\\1\end{bmatrix}\right) + \begin{bmatrix}100\\75\\30\\80\\30\end{bmatrix}$$

**Solution:** Compute component-wise. For rice: $150 - 8 - 12 - 3 + 100 = 227$. For soap: $25 - 4 - 2 - 1 + 30 = 48$. Completing all entries:

$$\mathbf{s}_{\text{new}} = \begin{bmatrix}227\\110\\49\\125\\48\end{bmatrix}$$

The minus signs encode demand (outflow), while positive signs encode supply (inflow). This sign convention lets a single vector addition capture the entire stock update.

---

## 3. Geometric Interpretation

### Vectors in $\mathbb{R}^2$

Every vector $\begin{bmatrix} a \\ b \end{bmatrix} \in \mathbb{R}^2$ can be identified with: [▶ W1_L1 @ 20:04](https://www.youtube.com/watch?v=1So2VV9Tm_A&t=1204)

1. **A point** $(a, b)$ in the Cartesian plane.
2. **An arrow** from the origin $(0,0)$ to the point $(a, b)$.
3. The expression $a\,\mathbf{i} + b\,\mathbf{j}$, where $\mathbf{i} = \begin{bmatrix}1\\0\end{bmatrix}$ and $\mathbf{j} = \begin{bmatrix}0\\1\end{bmatrix}$ are the **standard unit vectors**.

### The Parallelogram Law of Addition

To add $\mathbf{v}$ and $\mathbf{w}$ geometrically:

1. Draw both arrows from the origin.
2. Translate $\mathbf{w}$ so its tail sits at the tip of $\mathbf{v}$ (or vice versa), keeping direction and length unchanged.
3. The arrow from the origin to the new tip is $\mathbf{v} + \mathbf{w}$.

This traces out a parallelogram whose diagonal is $\mathbf{v} + \mathbf{w}$.

**Example:** $\mathbf{v} = \begin{bmatrix}1\\2\end{bmatrix}$, $\mathbf{w} = \begin{bmatrix}2\\1\end{bmatrix}$.

$$\mathbf{v} + \mathbf{w} = \begin{bmatrix}1+2\\2+1\end{bmatrix} = \begin{bmatrix}3\\3\end{bmatrix}$$

Geometrically, the parallelogram with vertices at $(0,0)$, $(1,2)$, $(2,1)$, and $(3,3)$ confirms this.

### Scalar Multiplication Geometrically

Multiplying $\mathbf{v}$ by $c > 0$ stretches the arrow by factor $c$ (same direction). Multiplying by $c < 0$ reverses direction and scales by $|c|$. Multiplying by $c = 0$ collapses the arrow to the origin.

### Beyond $\mathbb{R}^2$ and $\mathbb{R}^3$

For $n \geq 4$ there is no direct geometric picture, but the algebraic definitions (component-wise addition and scalar multiplication) remain identical. This is precisely why the **list viewpoint** is powerful: it works in any dimension.

> **Clarification:** Vectors in physics (force, velocity, acceleration) carry both **magnitude** and **direction**. While this geometric intuition is valuable, for linear algebra the algebraic definition as an ordered list is primary. The geometry guides intuition; the algebra carries the proofs.

---

## 4. The Space $\mathbb{R}^n$

### Definition

The set $\mathbb{R}^n$ is the collection of all column vectors with $n$ real entries:

$$\mathbb{R}^n = \left\{ \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix} : x_1, x_2, \ldots, x_n \in \mathbb{R} \right\}$$

Equipped with component-wise addition and scalar multiplication, $\mathbb{R}^n$ is the prototypical example of a vector space (formalised in the next section).

### The Zero Vector

The **zero vector** in $\mathbb{R}^n$ is [▶ W3_L1 @ 03:50](https://www.youtube.com/watch?v=dAttVL9a5Go&t=230)

$$\mathbf{0} = \begin{bmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{bmatrix} \in \mathbb{R}^n$$

It satisfies $\mathbf{v} + \mathbf{0} = \mathbf{0} + \mathbf{v} = \mathbf{v}$ for every $\mathbf{v} \in \mathbb{R}^n$.

### The Negative of a Vector

For each $\mathbf{v} = \begin{bmatrix} v_1 \\ \vdots \\ v_n \end{bmatrix}$, the **negative** (or **additive inverse**) is

$$-\mathbf{v} = \begin{bmatrix} -v_1 \\ \vdots \\ -v_n \end{bmatrix}$$

and satisfies $\mathbf{v} + (-\mathbf{v}) = \mathbf{0}$.

### Difference of Vectors

We define $\mathbf{v} - \mathbf{w} = \mathbf{v} + (-\mathbf{w})$, computed component-wise as $v_i - w_i$.

---

## 5. Vector Space Axioms

### Motivation

The eight properties listed below are not arbitrary: they are precisely the algebraic rules that hold for addition and scalar multiplication in $\mathbb{R}^n$. By abstracting these into axioms, we can study any mathematical structure that obeys the same rules using the same theorems.

### Definition: Vector Space

A **vector space over $\mathbb{R}$** is a set $V$ together with two operations, [▶ W3_L1 @ 06:00](https://www.youtube.com/watch?v=dAttVL9a5Go&t=360)

- **Addition** $+\colon V \times V \to V$, written $\mathbf{v}_1 + \mathbf{v}_2$,
- **Scalar multiplication** $\cdot\colon \mathbb{R} \times V \to V$, written $c\,\mathbf{v}$,

such that for all $\mathbf{v}, \mathbf{w}, \mathbf{u} \in V$ and all $a, b \in \mathbb{R}$ the following **eight axioms** hold:

| # | Axiom | Statement |
|---|-------|-----------|
| A1 | Commutativity of addition | $\mathbf{v} + \mathbf{w} = \mathbf{w} + \mathbf{v}$ |
| A2 | Associativity of addition | $(\mathbf{v} + \mathbf{w}) + \mathbf{u} = \mathbf{v} + (\mathbf{w} + \mathbf{u})$ |
| A3 | Existence of zero vector | There exists $\mathbf{0} \in V$ such that $\mathbf{v} + \mathbf{0} = \mathbf{v}$ |
| A4 | Existence of additive inverse | For each $\mathbf{v}$ there exists $\mathbf{v}' \in V$ with $\mathbf{v} + \mathbf{v}' = \mathbf{0}$ |
| M1 | Multiplicative identity | $1\,\mathbf{v} = \mathbf{v}$ |
| M2 | Compatibility of scalars | $(ab)\,\mathbf{v} = a(b\,\mathbf{v})$ |
| D1 | Distributivity over vector addition | $a(\mathbf{v} + \mathbf{w}) = a\mathbf{v} + a\mathbf{w}$ |
| D2 | Distributivity over scalar addition | $(a + b)\,\mathbf{v} = a\mathbf{v} + b\mathbf{v}$ |

The elements of $V$ are called **vectors**; the elements of $\mathbb{R}$ are called **scalars**.

> **Clarification:** The "addition" and "scalar multiplication" in a general vector space need not be the usual component-wise operations. They can be any functions $V \times V \to V$ and $\mathbb{R} \times V \to V$ — as long as all eight axioms are satisfied.

### Key Examples

1. **$\mathbb{R}^n$** with component-wise operations is a vector space (verify each axiom directly).

2. **$\mathbb{R}^{m \times n}$** — the set of all $m \times n$ matrices with real entries — is a vector space under matrix addition and scalar multiplication. Deeper treatment in [[1 - MATRICES]].

3. **The solution set of a homogeneous system** $A\mathbf{x} = \mathbf{0}$ (see Section 7).

### Non-Examples

Defining operations that violate even one axiom prevents the structure from being a vector space.

**Non-example 1:** On $\mathbb{R}^2$ define

$$\begin{bmatrix} x_1 \\ x_2 \end{bmatrix} \oplus \begin{bmatrix} y_1 \\ y_2 \end{bmatrix} = \begin{bmatrix} x_1 + y_1 \\ x_2 - y_2 \end{bmatrix}, \qquad c \odot \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} cx_1 \\ cx_2 \end{bmatrix}$$

[▶ W3_L1 @ 20:58](https://www.youtube.com/watch?v=dAttVL9a5Go&t=1258) Axiom A1 fails:

$$\begin{bmatrix}0\\0\end{bmatrix} \oplus \begin{bmatrix}1\\1\end{bmatrix} = \begin{bmatrix}1\\-1\end{bmatrix}, \qquad \begin{bmatrix}1\\1\end{bmatrix} \oplus \begin{bmatrix}0\\0\end{bmatrix} = \begin{bmatrix}1\\1\end{bmatrix}$$

Since $\begin{bmatrix}1\\-1\end{bmatrix} \neq \begin{bmatrix}1\\1\end{bmatrix}$, commutativity fails and this is **not** a vector space.

**Non-example 2:** On $\mathbb{R}^2$ define

$$\begin{bmatrix} x_1 \\ x_2 \end{bmatrix} \oplus \begin{bmatrix} y_1 \\ y_2 \end{bmatrix} = \begin{bmatrix} x_1 + y_1 \\ 0 \end{bmatrix}, \qquad c \odot \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} cx_1 \\ 0 \end{bmatrix}$$

Axiom A3 (existence of a proper zero vector) fails to work as expected: for $\mathbf{v} = \begin{bmatrix}1\\3\end{bmatrix}$, every candidate $\mathbf{0}$ gives $\mathbf{v} \oplus \mathbf{0} = \begin{bmatrix}1\\0\end{bmatrix} \neq \mathbf{v}$. Hence this is **not** a vector space.

---

## 6. Properties Derived from the Axioms

The following properties are **not** additional axioms; they are logical consequences of axioms A1–D2. We prove them to illustrate how all reasoning in a general vector space flows from the axioms alone.

### 6.1 Cancellation Law

**Theorem (Cancellation Law of Vector Addition).** If $\mathbf{v}_1 + \mathbf{v}_3 = \mathbf{v}_2 + \mathbf{v}_3$, then $\mathbf{v}_1 = \mathbf{v}_2$. [▶ W3_L2 @ 00:42](https://www.youtube.com/watch?v=yUISwV4LE20&t=42)

**Proof sketch.** By axiom A4, there exists $\mathbf{v}_3'$ with $\mathbf{v}_3 + \mathbf{v}_3' = \mathbf{0}$. Add $\mathbf{v}_3'$ to both sides on the right:

$$(\mathbf{v}_1 + \mathbf{v}_3) + \mathbf{v}_3' = (\mathbf{v}_2 + \mathbf{v}_3) + \mathbf{v}_3'$$

By associativity (A2):

$$\mathbf{v}_1 + (\mathbf{v}_3 + \mathbf{v}_3') = \mathbf{v}_2 + (\mathbf{v}_3 + \mathbf{v}_3')$$

$$\mathbf{v}_1 + \mathbf{0} = \mathbf{v}_2 + \mathbf{0}$$

By axiom A3: $\mathbf{v}_1 = \mathbf{v}_2$. $\blacksquare$

### 6.2 Uniqueness of the Zero Vector

**Corollary.** The zero vector $\mathbf{0}$ in axiom A3 is unique. [▶ W3_L2 @ 05:56](https://www.youtube.com/watch?v=yUISwV4LE20&t=356)

**Proof sketch.** Suppose $\mathbf{w}$ also satisfies $\mathbf{v} + \mathbf{w} = \mathbf{v}$ for all $\mathbf{v}$. Then $\mathbf{v} + \mathbf{w} = \mathbf{v} + \mathbf{0}$. Cancel $\mathbf{v}$ to get $\mathbf{w} = \mathbf{0}$. $\blacksquare$

### 6.3 Uniqueness of Additive Inverses

**Corollary.** For each $\mathbf{v} \in V$, the additive inverse $\mathbf{v}'$ in axiom A4 is unique. We denote it $-\mathbf{v}$.

**Proof sketch.** If both $\mathbf{v}'$ and $\mathbf{v}''$ satisfy $\mathbf{v} + \mathbf{v}' = \mathbf{0}$ and $\mathbf{v} + \mathbf{v}'' = \mathbf{0}$, then $\mathbf{v} + \mathbf{v}' = \mathbf{v} + \mathbf{v}''$. Cancel $\mathbf{v}$ to get $\mathbf{v}' = \mathbf{v}''$. $\blacksquare$

### 6.4 Scalar and Vector Zeros

**Proposition.** In any vector space $V$: [▶ W3_L2 @ 08:55](https://www.youtube.com/watch?v=yUISwV4LE20&t=535)

| Statement | Meaning |
|-----------|---------|
| $0\,\mathbf{v} = \mathbf{0}$ for all $\mathbf{v} \in V$ | The scalar zero times any vector gives the zero vector |
| $c\,\mathbf{0} = \mathbf{0}$ for all $c \in \mathbb{R}$ | Any scalar times the zero vector gives the zero vector |
| $(-1)\mathbf{v} = -\mathbf{v}$ for all $\mathbf{v} \in V$ | Scalar multiplication by $-1$ gives the additive inverse |
| $(-c)\mathbf{v} = -(c\mathbf{v}) = c(-\mathbf{v})$ | Signs can be moved freely between scalar and vector |

**Proof of $0\,\mathbf{v} = \mathbf{0}$:** By D2,

$$0\,\mathbf{v} = (0 + 0)\mathbf{v} = 0\,\mathbf{v} + 0\,\mathbf{v}$$

So $0\,\mathbf{v} + \mathbf{0} = 0\,\mathbf{v} + 0\,\mathbf{v}$. Cancel $0\,\mathbf{v}$ to get $\mathbf{0} = 0\,\mathbf{v}$. $\blacksquare$

**Proof of $(-1)\mathbf{v} = -\mathbf{v}$:** By D2,

$$\mathbf{v} + (-1)\mathbf{v} = 1\cdot\mathbf{v} + (-1)\mathbf{v} = (1 + (-1))\mathbf{v} = 0\,\mathbf{v} = \mathbf{0}$$

So $(-1)\mathbf{v}$ satisfies the defining property of $-\mathbf{v}$. By uniqueness, $(-1)\mathbf{v} = -\mathbf{v}$. $\blacksquare$

> **Clarification:** There are two different "zeros" at play: the scalar $0 \in \mathbb{R}$ and the zero vector $\mathbf{0} \in V$. Context always makes clear which is meant.

---

## 7. Subspaces and the Subspace Test

### Motivation

We frequently encounter subsets of a vector space that are themselves vector spaces under the same operations. Rather than verifying all eight axioms from scratch, the **subspace test** provides a shortcut.

### Definition: Subspace

Let $V$ be a vector space over $\mathbb{R}$. A non-empty subset $W \subseteq V$ is called a **subspace** of $V$ if $W$ is itself a vector space under the addition and scalar multiplication inherited from $V$. [▶ W3_L1 @ 19:35](https://www.youtube.com/watch?v=dAttVL9a5Go&t=1175)

### The Subspace Test (Two-condition Test)

**Theorem.** A non-empty subset $W \subseteq V$ is a subspace of $V$ if and only if:

1. **Closure under addition:** For all $\mathbf{u}, \mathbf{w} \in W$, $\quad \mathbf{u} + \mathbf{w} \in W$.
2. **Closure under scalar multiplication:** For all $c \in \mathbb{R}$ and $\mathbf{w} \in W$, $\quad c\,\mathbf{w} \in W$.

**Why this suffices:** Axioms A1, A2, M1, M2, D1, D2 are inherited automatically because they hold for *all* vectors in $V$, and every vector in $W$ is also in $V$. Condition (2) with $c = 0$ gives $\mathbf{0} = 0\,\mathbf{w} \in W$ (axiom A3). Condition (2) with $c = -1$ gives $-\mathbf{w} \in W$ (axiom A4).

> **Clarification:** The requirement that $W$ be **non-empty** is essential. Equivalently, you may check that $\mathbf{0} \in W$ as the first step — if the zero vector is missing, $W$ cannot be a subspace.

### One-condition Variant

Conditions (1) and (2) can be combined into a single condition:

$$\text{For all } c \in \mathbb{R} \text{ and all } \mathbf{u}, \mathbf{w} \in W: \quad c\,\mathbf{u} + \mathbf{w} \in W.$$

### Trivial Subspaces

Every vector space $V$ has two subspaces that always exist:

- $\{\mathbf{0}\}$, the **trivial subspace** (containing only the zero vector).
- $V$ itself.

All other subspaces are called **proper** (or **non-trivial**) subspaces.

### Key Example: Solution Set of a Homogeneous System

Let $A$ be an $m \times n$ matrix. Define

$$W = \{\mathbf{x} \in \mathbb{R}^n : A\mathbf{x} = \mathbf{0}\}$$

[▶ W3_L1 @ 14:37](https://www.youtube.com/watch?v=dAttVL9a5Go&t=877)

**Claim:** $W$ is a subspace of $\mathbb{R}^n$.

**Proof via the subspace test:**

- **Non-empty:** $\mathbf{x} = \mathbf{0}$ satisfies $A\mathbf{0} = \mathbf{0}$, so $\mathbf{0} \in W$.
- **Closure under addition:** If $\mathbf{v}, \mathbf{w} \in W$, then $A(\mathbf{v} + \mathbf{w}) = A\mathbf{v} + A\mathbf{w} = \mathbf{0} + \mathbf{0} = \mathbf{0}$, so $\mathbf{v} + \mathbf{w} \in W$.
- **Closure under scalar multiplication:** If $\mathbf{v} \in W$ and $c \in \mathbb{R}$, then $A(c\mathbf{v}) = c(A\mathbf{v}) = c\,\mathbf{0} = \mathbf{0}$, so $c\mathbf{v} \in W$. $\blacksquare$

This subspace is also called the **null space** of $A$, denoted $\text{null}(A)$ or $\ker(A)$.

> **Clarification:** The system must be **homogeneous** ($A\mathbf{x} = \mathbf{0}$). The solution set of a non-homogeneous system $A\mathbf{x} = \mathbf{b}$ with $\mathbf{b} \neq \mathbf{0}$ is **not** a subspace (it does not contain $\mathbf{0}$).

### Worked Example: Checking a Subset

**Example:** Let $W = \left\{ \begin{bmatrix} x \\ y \end{bmatrix} \in \mathbb{R}^2 : x + y = 0 \right\}$. Is $W$ a subspace of $\mathbb{R}^2$?

**Solution:**

- **Zero vector:** $\begin{bmatrix}0\\0\end{bmatrix}$ satisfies $0+0=0$, so $\mathbf{0} \in W$. ✓
- **Addition:** Let $\begin{bmatrix}x_1\\y_1\end{bmatrix}, \begin{bmatrix}x_2\\y_2\end{bmatrix} \in W$. Then $x_1+y_1=0$ and $x_2+y_2=0$. Their sum has first-plus-second entry: $(x_1+x_2)+(y_1+y_2) = (x_1+y_1)+(x_2+y_2)=0+0=0$. ✓
- **Scalar multiplication:** Let $c \in \mathbb{R}$ and $\begin{bmatrix}x\\y\end{bmatrix} \in W$. Then $cx + cy = c(x+y)=c\cdot 0=0$. ✓

Hence $W$ is a subspace.