# LINEAR INDEPENDENCE

This file develops one of the most fundamental concepts in linear algebra: **linear independence**. Given a collection of vectors, we ask whether any vector in the collection is "redundant" — that is, expressible in terms of the others. This idea underpins the notions of basis, dimension, and rank that appear throughout the subject. We begin with linear combinations, proceed to the formal definitions of dependence and independence, develop systematic tests (row reduction, determinants), explore the geometric meaning, and conclude with results on maximal independent sets. Throughout, vectors are assumed to live in $\mathbb{R}^m$ unless stated otherwise; for the general vector space framework, see [[5 - VECTORS AND SPACES]].

---

## 1. Linear Combinations

### Definition

Let $V$ be a vector space and let $\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n \in V$. A **linear combination** of $\mathbf{v}_1, \dots, \mathbf{v}_n$ with **coefficients** (or **scalars**) $a_1, a_2, \dots, a_n \in \mathbb{R}$ is the vector [▶ W3_L3 @ 02:55](https://www.youtube.com/watch?v=1Krnnc6wKyk&t=175)

$$a_1\mathbf{v}_1 + a_2\mathbf{v}_2 + \cdots + a_n\mathbf{v}_n = \sum_{i=1}^{n} a_i\mathbf{v}_i.$$

Each term $a_i\mathbf{v}_i$ is formed by **scalar multiplication** (see [[5 - VECTORS AND SPACES]]), and the terms are combined using **vector addition**. Because addition in a vector space is associative and commutative, the order in which the terms are summed does not matter.

We say that a vector $\mathbf{v}$ **is a linear combination of** $\mathbf{v}_1, \dots, \mathbf{v}_n$ if there exist scalars $a_1, \dots, a_n$ such that

$$\mathbf{v} = \sum_{i=1}^{n} a_i \mathbf{v}_i.$$

### Worked Examples of Linear Combinations

**Example 1 (in $\mathbb{R}^2$):** Show that $\begin{bmatrix}4\\5\end{bmatrix}$ is a linear combination of $\begin{bmatrix}1\\2\end{bmatrix}$ and $\begin{bmatrix}2\\1\end{bmatrix}$.

**Solution:** We compute

$$2\begin{bmatrix}1\\2\end{bmatrix} + 1\cdot\begin{bmatrix}2\\1\end{bmatrix} = \begin{bmatrix}2\\4\end{bmatrix} + \begin{bmatrix}2\\1\end{bmatrix} = \begin{bmatrix}4\\5\end{bmatrix}.$$

Hence $\begin{bmatrix}4\\5\end{bmatrix}$ is a linear combination of the two given vectors with coefficients $a_1 = 2$ and $a_2 = 1$.

**Example 2 (in $\mathbb{R}^3$):** Show that $\begin{bmatrix}3\\7\\2\end{bmatrix}$ is a linear combination of $\begin{bmatrix}0\\2\\1\end{bmatrix}$ and $\begin{bmatrix}2\\2\\0\end{bmatrix}$.

**Solution:**

$$2\begin{bmatrix}0\\2\\1\end{bmatrix} + \frac{3}{2}\begin{bmatrix}2\\2\\0\end{bmatrix} = \begin{bmatrix}0\\4\\2\end{bmatrix} + \begin{bmatrix}3\\3\\0\end{bmatrix} = \begin{bmatrix}3\\7\\2\end{bmatrix}. \checkmark$$

**Example 3 (a vector that is NOT a linear combination):** Show that $\begin{bmatrix}1\\2\\0\end{bmatrix}$ is **not** a linear combination of $\begin{bmatrix}0\\2\\1\end{bmatrix}$ and $\begin{bmatrix}2\\2\\0\end{bmatrix}$. [▶ W3_L3 @ 15:09](https://www.youtube.com/watch?v=1Krnnc6wKyk&t=909)

**Solution:** Suppose, for contradiction, that scalars $a, b$ exist with

$$a\begin{bmatrix}0\\2\\1\end{bmatrix} + b\begin{bmatrix}2\\2\\0\end{bmatrix} = \begin{bmatrix}1\\2\\0\end{bmatrix}.$$

Equating coordinates gives the system

$$\begin{cases} 2b = 1 \\ 2a + 2b = 2 \\ a = 0 \end{cases}$$

From the third equation $a = 0$; from the first equation $b = \tfrac{1}{2}$. Substituting into the second equation: $2(0) + 2(\tfrac{1}{2}) = 1 \neq 2$. This is a contradiction, so no such $a, b$ exist.

### Rearranging Linear Combination Equations

An important observation is that when $\mathbf{v} = a_1\mathbf{v}_1 + \cdots + a_n\mathbf{v}_n$, we can rearrange to express any vector with a non-zero coefficient in terms of the others. For instance, from the equation

$$2\begin{bmatrix}1\\2\end{bmatrix} + 1\cdot\begin{bmatrix}2\\1\end{bmatrix} = \begin{bmatrix}4\\5\end{bmatrix},$$

we can solve for $\begin{bmatrix}1\\2\end{bmatrix}$:

$$\begin{bmatrix}1\\2\end{bmatrix} = \frac{1}{2}\begin{bmatrix}4\\5\end{bmatrix} - \frac{1}{2}\begin{bmatrix}2\\1\end{bmatrix}.$$

Equivalently, we can rewrite the original equation with the zero vector on one side:

$$2\begin{bmatrix}1\\2\end{bmatrix} + 1\cdot\begin{bmatrix}2\\1\end{bmatrix} - 1\cdot\begin{bmatrix}4\\5\end{bmatrix} = \begin{bmatrix}0\\0\end{bmatrix}.$$

This is a linear combination of the three vectors that equals $\mathbf{0}$ with coefficients $2, 1, -1$ — **not all zero**. This observation motivates the definition of linear dependence.

---

## 2. Linear Dependence

### Definition

A set of vectors $\{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ in a vector space $V$ is **linearly dependent** if there exist scalars $a_1, a_2, \dots, a_n$, **not all zero**, such that [▶ W3_L3 @ 18:53](https://www.youtube.com/watch?v=1Krnnc6wKyk&t=1133)

$$a_1\mathbf{v}_1 + a_2\mathbf{v}_2 + \cdots + a_n\mathbf{v}_n = \mathbf{0}.$$

The phrase "not all zero" is critical. For **any** collection of vectors, choosing $a_1 = a_2 = \cdots = a_n = 0$ trivially yields $\mathbf{0}$. Linear dependence demands that we can produce $\mathbf{0}$ in a **non-trivial** way — with at least one $a_i \neq 0$.

> **Clarification:** "Not all zero" means $\exists\, i$ such that $a_i \neq 0$. It does **not** require every coefficient to be non-zero; even a single non-zero coefficient suffices.

### Equivalent Formulation

$\{\mathbf{v}_1, \dots, \mathbf{v}_n\}$ is linearly dependent if and only if **at least one** of the vectors can be expressed as a linear combination of the others.

*Proof sketch.* ($\Rightarrow$) Suppose $\sum a_i \mathbf{v}_i = \mathbf{0}$ with some $a_k \neq 0$. Then

$$\mathbf{v}_k = -\frac{1}{a_k}\sum_{i \neq k} a_i \mathbf{v}_i.$$

($\Leftarrow$) Suppose $\mathbf{v}_k = \sum_{i \neq k} b_i \mathbf{v}_i$. Then $\sum_{i \neq k} b_i \mathbf{v}_i - 1 \cdot \mathbf{v}_k = \mathbf{0}$, and the coefficient of $\mathbf{v}_k$ is $-1 \neq 0$. $\square$

### Worked Examples

**Example 4:** Show that $\{(2,1,2),\; (3,0,1),\; (10,-4,-2)\}$ is linearly dependent.

**Solution:** We verify the equation [▶ W3_L3 @ 22:18](https://www.youtube.com/watch?v=1Krnnc6wKyk&t=1338)

$$2\begin{bmatrix}2\\1\\2\end{bmatrix} - 3\begin{bmatrix}3\\0\\1\end{bmatrix} + \frac{1}{2}\begin{bmatrix}10\\-4\\-2\end{bmatrix} = \begin{bmatrix}4-9+5\\2-0-2\\4-3-1\end{bmatrix} = \begin{bmatrix}0\\0\\0\end{bmatrix}.$$

The coefficients $2, -3, \tfrac{1}{2}$ are all non-zero, so the set is linearly dependent.

**Example 5:** Two vectors that are scalar multiples of each other are linearly dependent.

Consider $\begin{bmatrix}2\\3\\7\end{bmatrix}$ and $\begin{bmatrix}5/3\\5/2\\35/6\end{bmatrix}$. Observe that

$$5\begin{bmatrix}2\\3\\7\end{bmatrix} - 6\begin{bmatrix}5/3\\5/2\\35/6\end{bmatrix} = \begin{bmatrix}10-10\\15-15\\35-35\end{bmatrix} = \begin{bmatrix}0\\0\\0\end{bmatrix}.$$

Both coefficients are non-zero, confirming linear dependence. Geometrically, these two vectors point along the same line through the origin.

### Supersets of Dependent Sets

**Proposition.** If $\{\mathbf{v}_1, \dots, \mathbf{v}_n\}$ is linearly dependent, then for any vector $\mathbf{w}$, the set $\{\mathbf{v}_1, \dots, \mathbf{v}_n, \mathbf{w}\}$ is also linearly dependent. [▶ W3_L3 @ 23:45](https://www.youtube.com/watch?v=1Krnnc6wKyk&t=1425)

*Proof.* If $\sum_{i=1}^n a_i\mathbf{v}_i = \mathbf{0}$ with not all $a_i$ zero, then $\sum_{i=1}^n a_i\mathbf{v}_i + 0\cdot\mathbf{w} = \mathbf{0}$, and the coefficients $(a_1, \dots, a_n, 0)$ are not all zero. $\square$

In other words, **adding more vectors to a dependent set cannot make it independent**. Dependence can only grow, never shrink.

---

## 3. Linear Independence

### Definition

A set of vectors $\{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ in a vector space $V$ is **linearly independent** if it is **not** linearly dependent. [▶ W3_L4 @ 02:37](https://www.youtube.com/watch?v=Uf5nqIJv1Fk&t=157)

Equivalently, $\{\mathbf{v}_1, \dots, \mathbf{v}_n\}$ is linearly independent if the equation

$$a_1\mathbf{v}_1 + a_2\mathbf{v}_2 + \cdots + a_n\mathbf{v}_n = \mathbf{0}$$

implies $a_1 = a_2 = \cdots = a_n = 0$.

In words: the **only** linear combination of these vectors that produces the zero vector is the **trivial** one (all coefficients zero).

### Equivalent Formulation for Three or More Vectors

For three vectors $\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3$: they are linearly independent if and only if **none** of them is a linear combination of the other two. [▶ W3_L4 @ 16:13](https://www.youtube.com/watch?v=Uf5nqIJv1Fk&t=973)

More generally, $\{\mathbf{v}_1, \dots, \mathbf{v}_n\}$ is linearly independent if and only if **no** vector in the set can be written as a linear combination of the remaining vectors.

### The Zero Vector and Dependence

**Proposition.** Any set of vectors that contains the zero vector $\mathbf{0}$ is linearly dependent. [▶ W3_L4 @ 06:56](https://www.youtube.com/watch?v=Uf5nqIJv1Fk&t=416)

*Proof.* Suppose $\mathbf{v}_i = \mathbf{0}$. Set $a_i = 1$ and $a_j = 0$ for all $j \neq i$. Then $\sum a_j \mathbf{v}_j = 1 \cdot \mathbf{0} = \mathbf{0}$, and not all coefficients are zero. $\square$

> **Clarification:** A single non-zero vector $\{\mathbf{v}\}$ (with $\mathbf{v} \neq \mathbf{0}$) is always linearly independent, because $a\mathbf{v} = \mathbf{0}$ forces $a = 0$. A single vector $\{\mathbf{0}\}$ is linearly dependent.

### Linear Independence of Two Non-Zero Vectors

**Proposition.** Two non-zero vectors $\mathbf{v}_1, \mathbf{v}_2$ are linearly dependent if and only if one is a scalar multiple of the other. Equivalently, two non-zero vectors are **linearly independent** if and only if **neither is a scalar multiple of the other**. [▶ W3_L4 @ 09:02](https://www.youtube.com/watch?v=Uf5nqIJv1Fk&t=542)

*Proof sketch.* If $a_1\mathbf{v}_1 + a_2\mathbf{v}_2 = \mathbf{0}$ with, say, $a_1 \neq 0$, then $\mathbf{v}_1 = (-a_2/a_1)\mathbf{v}_2$. Since both vectors are non-zero, $a_2$ must also be non-zero (otherwise $a_1\mathbf{v}_1 = \mathbf{0}$ with $a_1 \neq 0$ would force $\mathbf{v}_1 = \mathbf{0}$, a contradiction). Conversely, if $\mathbf{v}_1 = c\,\mathbf{v}_2$ for some $c \neq 0$, then $1\cdot\mathbf{v}_1 - c\,\mathbf{v}_2 = \mathbf{0}$ is a non-trivial relation. $\square$

**Example 6:** The vectors $\begin{bmatrix}-1\\3\end{bmatrix}$ and $\begin{bmatrix}2\\0\end{bmatrix}$ are linearly independent because neither is a scalar multiple of the other (there is no constant $c$ with $(-1, 3) = c(2, 0)$, since the second component would require $3 = 0$).

---

## 4. Testing Independence via Row Reduction

### Setting Up the Homogeneous System

Given vectors $\mathbf{v}_1, \dots, \mathbf{v}_n \in \mathbb{R}^m$, write each vector as a column and form the $m \times n$ matrix [▶ W3_L5 @ 01:33](https://www.youtube.com/watch?v=9Adm4c2alAY&t=93)

$$V = \begin{bmatrix} | & | & & | \\ \mathbf{v}_1 & \mathbf{v}_2 & \cdots & \mathbf{v}_n \\ | & | & & | \end{bmatrix} \in \mathbb{R}^{m \times n}.$$

The equation $a_1\mathbf{v}_1 + \cdots + a_n\mathbf{v}_n = \mathbf{0}$ is precisely the **homogeneous system**

$$V\mathbf{x} = \mathbf{0}, \qquad \mathbf{x} = \begin{bmatrix}a_1\\\vdots\\a_n\end{bmatrix}.$$

- The vectors are **linearly independent** if and only if $V\mathbf{x} = \mathbf{0}$ has only the **trivial solution** $\mathbf{x} = \mathbf{0}$.
- The vectors are **linearly dependent** if and only if $V\mathbf{x} = \mathbf{0}$ has a **non-trivial solution**.

To determine which case holds, apply **Gaussian elimination** (row reduction) to the augmented matrix $[V \mid \mathbf{0}]$. For a review of Gaussian elimination, see [[1 - MATRICES]].

### The General Procedure

1. Form the $m \times n$ matrix $V$ whose columns are the given vectors.
2. Row reduce $V$ (or the augmented matrix $[V \mid \mathbf{0}]$) to row echelon form.
3. Count the **pivot columns** (columns containing leading 1s).
   - If every column is a pivot column (i.e., there are $n$ pivots), the system has only the trivial solution, so the vectors are **linearly independent**.
   - If there is at least one **free variable** (a non-pivot column), the system has infinitely many solutions (including non-trivial ones), so the vectors are **linearly dependent**.

> **Clarification:** Since the right-hand side is $\mathbf{0}$, you can row-reduce just the coefficient matrix $V$ — the zero column on the right remains zero throughout row reduction.

### Worked Examples

**Example 7 ($2 \times 2$ — two vectors in $\mathbb{R}^2$):** Are $\begin{bmatrix}5\\2\end{bmatrix}$ and $\begin{bmatrix}1\\3\end{bmatrix}$ linearly independent? [▶ W3_L5 @ 06:32](https://www.youtube.com/watch?v=9Adm4c2alAY&t=392)

**Solution:** Form the matrix and the system:

$$V = \begin{bmatrix}5 & 1\\2 & 3\end{bmatrix}, \qquad \begin{cases}5x_1 + x_2 = 0\\2x_1 + 3x_2 = 0\end{cases}$$

Row reduce: $R_2 \leftarrow R_2 - \tfrac{2}{5}R_1$:

$$\begin{bmatrix}5 & 1\\0 & \tfrac{13}{5}\end{bmatrix}.$$

Both columns are pivot columns, so the only solution is $x_1 = x_2 = 0$. The vectors are **linearly independent**.

(Alternatively, $\det(V) = 15 - 2 = 13 \neq 0$; see Section 5.)

---

**Example 8 ($3 \times 2$ — two vectors in $\mathbb{R}^3$):** Are $\begin{bmatrix}1\\2\\0\end{bmatrix}$ and $\begin{bmatrix}3\\3\\5\end{bmatrix}$ linearly independent? [▶ W3_L5 @ 08:25](https://www.youtube.com/watch?v=9Adm4c2alAY&t=505)

**Solution:** Form:

$$V = \begin{bmatrix}1 & 3\\2 & 3\\0 & 5\end{bmatrix}, \qquad \begin{cases}x_1 + 3x_2 = 0\\2x_1 + 3x_2 = 0\\5x_2 = 0\end{cases}$$

From the third equation, $x_2 = 0$; substituting into the first gives $x_1 = 0$. Both columns are pivot columns. The vectors are **linearly independent**.

(Quick check: these are not scalar multiples of each other, confirming the result.)

---

**Example 9 ($2 \times 3$ — three vectors in $\mathbb{R}^2$):** Are $\begin{bmatrix}1\\2\end{bmatrix}$, $\begin{bmatrix}1\\3\end{bmatrix}$, and $\begin{bmatrix}3\\4\end{bmatrix}$ linearly independent? [▶ W3_L5 @ 11:33](https://www.youtube.com/watch?v=9Adm4c2alAY&t=693)

**Solution:** Form:

$$V = \begin{bmatrix}1 & 1 & 3\\2 & 3 & 4\end{bmatrix}.$$

Row reduce: $R_2 \leftarrow R_2 - 2R_1$:

$$\begin{bmatrix}1 & 1 & 3\\0 & 1 & -2\end{bmatrix}.$$

There are two pivots but three columns, so $x_3$ is a free variable. Setting $x_3 = c$:

$$x_2 = 2c, \qquad x_1 = -x_2 - 3x_3 = -2c - 3c = -5c.$$

For example, $c = 1$ gives the non-trivial relation

$$-5\begin{bmatrix}1\\2\end{bmatrix} + 2\begin{bmatrix}1\\3\end{bmatrix} + 1\cdot\begin{bmatrix}3\\4\end{bmatrix} = \begin{bmatrix}-5+2+3\\-10+6+4\end{bmatrix} = \begin{bmatrix}0\\0\end{bmatrix}. \checkmark$$

The vectors are **linearly dependent**.

---

**Example 10 ($3 \times 3$ — three vectors in $\mathbb{R}^3$):** Are $\begin{bmatrix}1\\1\\2\end{bmatrix}$, $\begin{bmatrix}1\\2\\0\end{bmatrix}$, $\begin{bmatrix}0\\2\\1\end{bmatrix}$ linearly independent? [▶ W3_L4 @ 17:10](https://www.youtube.com/watch?v=Uf5nqIJv1Fk&t=1030)

**Solution:** Form the system $a\begin{bmatrix}1\\1\\2\end{bmatrix} + b\begin{bmatrix}1\\2\\0\end{bmatrix} + c\begin{bmatrix}0\\2\\1\end{bmatrix} = \begin{bmatrix}0\\0\\0\end{bmatrix}$:

$$\begin{cases}a + b = 0\\a + 2b + 2c = 0\\2a + c = 0\end{cases}$$

From equation 1: $b = -a$. From equation 3: $c = -2a$. Substitute into equation 2:

$$a + 2(-a) + 2(-2a) = a - 2a - 4a = -5a = 0 \implies a = 0.$$

Then $b = 0$ and $c = 0$. The only solution is the trivial one, so the vectors are **linearly independent**.

---

**Example 11 ($3 \times 4$ — four vectors in $\mathbb{R}^3$):** Are $\begin{bmatrix}1\\2\\0\end{bmatrix}$, $\begin{bmatrix}0\\2\\4\end{bmatrix}$, $\begin{bmatrix}3\\0\\0\end{bmatrix}$, $\begin{bmatrix}1\\2\\3\end{bmatrix}$ linearly independent? [▶ W3_L5 @ 19:20](https://www.youtube.com/watch?v=9Adm4c2alAY&t=1160)

**Solution:** Form the $3 \times 4$ augmented matrix and row reduce:

$$\left[\begin{array}{cccc|c}1 & 0 & 3 & 1 & 0\\2 & 2 & 0 & 2 & 0\\0 & 4 & 0 & 3 & 0\end{array}\right] \xrightarrow{\text{row reduce}} \left[\begin{array}{cccc|c}1 & 0 & 0 & \tfrac{1}{4} & 0\\0 & 1 & 0 & \tfrac{3}{4} & 0\\0 & 0 & 1 & \tfrac{1}{4} & 0\end{array}\right].$$

There are 3 pivots and 4 unknowns, so $x_4$ is free. Setting $x_4 = 4$:

$$x_1 = -1,\quad x_2 = -3,\quad x_3 = -1, \quad x_4 = 4.$$

Verification:

$$-1\begin{bmatrix}1\\2\\0\end{bmatrix} - 3\begin{bmatrix}0\\2\\4\end{bmatrix} - 1\begin{bmatrix}3\\0\\0\end{bmatrix} + 4\begin{bmatrix}1\\2\\3\end{bmatrix} = \begin{bmatrix}-1-0-3+4\\-2-6-0+8\\0-12-0+12\end{bmatrix} = \begin{bmatrix}0\\0\\0\end{bmatrix}. \checkmark$$

The four vectors are **linearly dependent**. (This was expected — see Section 6.)

---

## 5. Relationship to the Determinant (Square Case)

When the number of vectors equals the dimension of the space — that is, $n$ vectors in $\mathbb{R}^n$ — the matrix $V$ is **square** ($n \times n$), and the determinant provides a direct test. [▶ W3_L5 @ 23:06](https://www.youtube.com/watch?v=9Adm4c2alAY&t=1386)

### The Determinant Test

Let $\mathbf{v}_1, \dots, \mathbf{v}_n \in \mathbb{R}^n$ and form the $n \times n$ matrix $V$ with the $j$-th column equal to $\mathbf{v}_j$. Then:

| $\det(V)$ | Invertibility of $V$ | Solution of $V\mathbf{x}=\mathbf{0}$ | Conclusion |
|---|---|---|---|
| $\det(V) \neq 0$ | $V$ is invertible | Only trivial solution $\mathbf{x} = \mathbf{0}$ | **Linearly independent** |
| $\det(V) = 0$ | $V$ is singular | Non-trivial solutions exist | **Linearly dependent** |

*Why it works.* The system $V\mathbf{x} = \mathbf{0}$ has a unique solution if and only if $V$ is invertible. And $V$ is invertible if and only if $\det(V) \neq 0$.

### Worked Examples

**Example 12:** Test whether $\begin{bmatrix}5\\2\end{bmatrix}$ and $\begin{bmatrix}1\\3\end{bmatrix}$ are linearly independent using the determinant.

**Solution:**

$$V = \begin{bmatrix}5 & 1\\2 & 3\end{bmatrix}, \qquad \det(V) = 5 \cdot 3 - 2 \cdot 1 = 13 \neq 0.$$

Since the determinant is non-zero, the vectors are **linearly independent**.

---

**Example 13:** Test whether $\begin{bmatrix}1\\4\\2\end{bmatrix}$, $\begin{bmatrix}0\\4\\3\end{bmatrix}$, $\begin{bmatrix}1\\1\\0\end{bmatrix}$ are linearly independent. [▶ W3_L5 @ 25:43](https://www.youtube.com/watch?v=9Adm4c2alAY&t=1543)

**Solution:** Form $V$ with these vectors as columns:

$$V = \begin{bmatrix}1 & 0 & 1\\4 & 4 & 1\\2 & 3 & 0\end{bmatrix}.$$

Compute the determinant (using the rule of Sarrus or cofactor expansion):

$$\det(V) = 1(4\cdot0 - 3\cdot1) - 0(4\cdot0 - 2\cdot1) + 1(4\cdot3 - 4\cdot2) = 1(-3) - 0 + 1(4) = 1.$$

Since $\det(V) = 1 \neq 0$, the vectors are **linearly independent**.

---

**Example 14:** Test whether $\begin{bmatrix}1\\2\end{bmatrix}$, $\begin{bmatrix}2\\4\end{bmatrix}$ are linearly independent.

**Solution:**

$$V = \begin{bmatrix}1 & 2\\2 & 4\end{bmatrix}, \qquad \det(V) = 1\cdot 4 - 2\cdot 2 = 0.$$

Since $\det(V) = 0$, the vectors are **linearly dependent**. (Indeed, the second vector is twice the first.)

> **Clarification:** The determinant test applies **only** when you have exactly $n$ vectors in $\mathbb{R}^n$. If you have fewer or more vectors than the dimension, you must use row reduction or the observations in