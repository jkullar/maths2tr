---
id: "4"
number: 4
title: "APPLYING DETERMINANTS"
section: "Weeks 1–4 · Linear Algebra Foundations"
---
# APPLYING DETERMINANTS

This file draws together the key applications of the determinant: computing matrix inverses via the cofactor (adjugate) method, solving linear systems with Cramer's rule, and using the inverse directly to find solutions. The central theme is that a square matrix $A$ is invertible **if and only if** $\det(A) \neq 0$, and when this condition holds, systems of the form $Ax = b$ have a unique solution that can be written down explicitly. Throughout, we build on the definitions and properties established in [[3 - DETERMINANTS]] and the matrix algebra from [[1 - MATRICES]].

---

## 1. Invertibility and the Determinant

### Recall: The Inverse of a Square Matrix

Let $A$ be an $n \times n$ matrix. An **inverse** of $A$ is an $n \times n$ matrix $B$ such that

$$AB = BA = I_n,$$

where $I_n$ is the $n \times n$ identity matrix. If such a $B$ exists, $A$ is called **invertible** (or **non-singular**), and we write $B = A^{-1}$. [▶ W2_L3 @ 01:31](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=91)

> **Clarification:** Both conditions $AB = I_n$ and $BA = I_n$ are required. For square matrices it turns out that one implies the other, but the definition demands both.

### Uniqueness of the Inverse

If $A$ has an inverse, that inverse is **unique**. [▶ W2_L3 @ 03:32](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=212)

*Proof sketch.* Suppose $B$ and $C$ are both inverses of $A$. Consider the product $C(AB)$:

$$C(AB) = CI_n = C.$$

By associativity of matrix multiplication (see [[1 - MATRICES]]),

$$C(AB) = (CA)B = I_n B = B.$$

Therefore $C = B$. $\square$

This justifies writing **the** inverse $A^{-1}$ rather than **an** inverse.

### The Determinant Test for Invertibility

The determinant provides a complete test for whether a square matrix is invertible. [▶ W2_L3 @ 05:31](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=331)

> **Theorem (Invertibility $\Leftrightarrow$ Non-Zero Determinant).** Let $A$ be an $n \times n$ matrix. Then
>
> $$A \text{ is invertible} \quad\Longleftrightarrow\quad \det(A) \neq 0.$$

**Why the forward direction ($\Rightarrow$) holds.** If $A^{-1}$ exists, then $AA^{-1} = I_n$. By the multiplicative property of determinants (see [[3 - DETERMINANTS]]),

$$\det(A)\,\det(A^{-1}) = \det(I_n) = 1.$$

Since their product is $1$, neither $\det(A)$ nor $\det(A^{-1})$ can be zero. In particular,

$$\det(A^{-1}) = \frac{1}{\det(A)}.$$

**Why the reverse direction ($\Leftarrow$) holds.** If $\det(A) \neq 0$, we can explicitly construct $A^{-1}$ using the adjugate matrix (see Section 2 below). The construction produces a matrix $B$ satisfying $AB = BA = I_n$.

| Condition | Conclusion |
|---|---|
| $\det(A) \neq 0$ | $A$ is invertible; $A^{-1}$ exists |
| $\det(A) = 0$ | $A$ is **singular** (not invertible); $A^{-1}$ does not exist |

---

## 2. The Adjugate (Cofactor) Method for Computing $A^{-1}$

### Minors and Cofactors (Recap)

These are defined in detail in [[3 - DETERMINANTS]]; we recall the essentials here.

- The **$(i,j)$-minor** $M_{ij}$ is the determinant of the $(n-1)\times(n-1)$ sub-matrix formed by deleting row $i$ and column $j$ from $A$.
- The **$(i,j)$-cofactor** is

$$C_{ij} = (-1)^{i+j}\,M_{ij}.$$

### The Cofactor Matrix

The **cofactor matrix** of $A$ is the $n \times n$ matrix whose $(i,j)$-entry is the cofactor $C_{ij}$:

$$\text{cof}(A) = \begin{bmatrix} C_{11} & C_{12} & \cdots & C_{1n} \\ C_{21} & C_{22} & \cdots & C_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ C_{n1} & C_{n2} & \cdots & C_{nn} \end{bmatrix}.$$

### The Adjugate Matrix

The **adjugate** (also called the **classical adjoint**) of $A$ is the **transpose** of the cofactor matrix: [▶ W2_L3 @ 10:53](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=653)

$$\text{adj}(A) = \bigl[\text{cof}(A)\bigr]^T.$$

Equivalently, the $(i,j)$-entry of $\text{adj}(A)$ is $C_{ji}$ (note the swapped indices).

> **Clarification:** The adjugate is **not** the cofactor matrix itself — it is its transpose. Forgetting this transposition is one of the most common errors in inverse computations.

### The Inverse Formula

> **Theorem (Inverse via Adjugate).** If $A$ is an $n \times n$ matrix with $\det(A) \neq 0$, then [▶ W2_L3 @ 18:07](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=1087)
>
> $$A^{-1} = \frac{1}{\det(A)}\,\text{adj}(A).$$

### Why the Formula Works (Proof Sketch)

We need to show that $A \cdot \dfrac{1}{\det(A)}\,\text{adj}(A) = I_n$.

**Diagonal entries.** The $(i,i)$-entry of $A\,\text{adj}(A)$ is

$$\sum_{j=1}^{n} a_{ij}\,[\text{adj}(A)]_{ji} = \sum_{j=1}^{n} a_{ij}\,C_{ij} = \det(A),$$

by cofactor expansion of $\det(A)$ along row $i$ (see [[3 - DETERMINANTS]]). Dividing by $\det(A)$ gives $1$.

**Off-diagonal entries.** For $i \neq k$, the $(i,k)$-entry of $A\,\text{adj}(A)$ is

$$\sum_{j=1}^{n} a_{ij}\,[\text{adj}(A)]_{jk} = \sum_{j=1}^{n} a_{ij}\,C_{kj}.$$

This sum can be interpreted as the cofactor expansion of a matrix $A'$ formed by replacing row $k$ of $A$ with a copy of row $i$. Since $A'$ has two identical rows (rows $i$ and $k$), $\det(A') = 0$ by the properties in [[3 - DETERMINANTS]]. Dividing by $\det(A)$ gives $0$. [▶ W2_L3 @ 21:37](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=1297)

Combining both cases: $A \cdot \dfrac{1}{\det(A)}\,\text{adj}(A) = I_n$. A symmetric argument using column expansions shows $\dfrac{1}{\det(A)}\,\text{adj}(A) \cdot A = I_n$. $\square$

### The $2 \times 2$ Special Case

For

$$A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}, \quad \det(A) = ad - bc \neq 0,$$

the adjugate method gives the well-known formula [▶ W2_L3 @ 07:00](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=420)

$$A^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}.$$

> **Clarification:** To form the $2\times 2$ inverse: swap the diagonal entries, negate the off-diagonal entries, and divide by the determinant.

**Example:** Find the inverse of $A = \begin{bmatrix} 4 & 7 \\ 2 & 6 \end{bmatrix}$.

**Solution:** $\det(A) = 4(6) - 7(2) = 24 - 14 = 10 \neq 0$. Therefore

$$A^{-1} = \frac{1}{10}\begin{bmatrix} 6 & -7 \\ -2 & 4 \end{bmatrix} = \begin{bmatrix} 0.6 & -0.7 \\ -0.2 & 0.4 \end{bmatrix}.$$

*Check:* $AA^{-1} = \begin{bmatrix} 4 & 7 \\ 2 & 6 \end{bmatrix}\begin{bmatrix} 0.6 & -0.7 \\ -0.2 & 0.4 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}.$ $\checkmark$ [▶ W2_L3 @ 02:24](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=144)

### Full $3 \times 3$ Worked Example

**Example:** Compute $A^{-1}$ for [▶ W2_L3 @ 12:07](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=727)

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 2 & 8 \\ 5 & 6 & 0 \end{bmatrix}.$$

**Solution:**

**Step 1 — Determinant.** Expanding along the first row:

$$\det(A) = 1(2 \cdot 0 - 8 \cdot 6) - 2(0 \cdot 0 - 8 \cdot 5) + 3(0 \cdot 6 - 2 \cdot 5)$$
$$= 1(-48) - 2(-40) + 3(-10) = -48 + 80 - 30 = 2.$$

Since $\det(A) = 2 \neq 0$, the matrix is invertible.

**Step 2 — Minors.** Each minor $M_{ij}$ is the determinant of the $2\times 2$ sub-matrix obtained by deleting row $i$ and column $j$:

$$\begin{array}{c|ccc}
 & j=1 & j=2 & j=3 \\
\hline
i=1 & \det\begin{bmatrix}2&8\\6&0\end{bmatrix}=-48 & \det\begin{bmatrix}0&8\\5&0\end{bmatrix}=-40 & \det\begin{bmatrix}0&2\\5&6\end{bmatrix}=-10 \\[6pt]
i=2 & \det\begin{bmatrix}2&3\\6&0\end{bmatrix}=-18 & \det\begin{bmatrix}1&3\\5&0\end{bmatrix}=-15 & \det\begin{bmatrix}1&2\\5&6\end{bmatrix}=-4 \\[6pt]
i=3 & \det\begin{bmatrix}2&3\\2&8\end{bmatrix}=10 & \det\begin{bmatrix}1&3\\0&8\end{bmatrix}=8 & \det\begin{bmatrix}1&2\\0&2\end{bmatrix}=2
\end{array}$$

**Step 3 — Cofactors.** Apply the sign pattern $(-1)^{i+j}$:

$$\text{cof}(A) = \begin{bmatrix} -48 & 40 & -10 \\ 18 & -15 & 4 \\ 10 & -8 & 2 \end{bmatrix}.$$

**Step 4 — Adjugate (transpose the cofactor matrix).**

$$\text{adj}(A) = \begin{bmatrix} -48 & 18 & 10 \\ 40 & -15 & -8 \\ -10 & 4 & 2 \end{bmatrix}.$$

**Step 5 — Inverse.**

$$A^{-1} = \frac{1}{2}\begin{bmatrix} -48 & 18 & 10 \\ 40 & -15 & -8 \\ -10 & 4 & 2 \end{bmatrix} = \begin{bmatrix} -24 & 9 & 5 \\ 20 & -15/2 & -4 \\ -5 & 2 & 1 \end{bmatrix}.$$

**Verification (selected entries).** The $(1,1)$-entry of $AA^{-1}$:

$$1(-24) + 2(20) + 3(-5) = -24 + 40 - 15 = 1. \;\checkmark$$

The $(1,2)$-entry of $AA^{-1}$:

$$1(9) + 2(-15/2) + 3(2) = 9 - 15 + 6 = 0. \;\checkmark$$

### Summary: Algorithm for the Adjugate Method

| Step | Action |
|------|--------|
| 1 | Compute $\det(A)$. If $\det(A) = 0$, **stop** — the matrix is not invertible. |
| 2 | Compute all $n^2$ minors $M_{ij}$. |
| 3 | Form the cofactor matrix: $C_{ij} = (-1)^{i+j} M_{ij}$. |
| 4 | Transpose the cofactor matrix to obtain $\text{adj}(A)$. |
| 5 | Divide by the determinant: $A^{-1} = \dfrac{1}{\det(A)}\,\text{adj}(A)$. |

---

## 3. Solving Linear Systems Using the Inverse

### The Method

Consider the system $Ax = b$ where $A$ is an $n \times n$ invertible matrix, $x$ is the column vector of unknowns, and $b$ is the column vector of constants. [▶ W2_L3 @ 23:01](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=1381)

Since $A^{-1}$ exists, multiply both sides on the left:

$$A^{-1}(Ax) = A^{-1}b$$
$$(A^{-1}A)x = A^{-1}b$$
$$I_n\,x = A^{-1}b$$
$$x = A^{-1}b.$$

> **Theorem.** If $A$ is an $n \times n$ matrix with $\det(A) \neq 0$, the system $Ax = b$ has the **unique** solution
>
> $$x = A^{-1}b.$$

> **Clarification:** This shows both existence (we can write down the solution) and uniqueness (the solution is completely determined). For more on solution structure, see [[2 - SOLVING SYSTEMS]].

### Worked Example

**Example:** Solve the system [▶ W2_L3 @ 24:33](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=1473)

$$\begin{cases} 8x_1 + 8x_2 + 4x_3 = 1960 \\ 12x_1 + 5x_2 + 7x_3 = 2215 \\ 3x_1 + 2x_2 + 5x_3 = 1135 \end{cases}$$

**Solution:** Write $Ax = b$ with

$$A = \begin{bmatrix} 8 & 8 & 4 \\ 12 & 5 & 7 \\ 3 & 2 & 5 \end{bmatrix}, \quad b = \begin{bmatrix} 1960 \\ 2215 \\ 1135 \end{bmatrix}.$$

**Step 1.** Compute $\det(A) = -188 \neq 0$, so $A$ is invertible.

**Step 2.** Compute the minors:

$$\begin{bmatrix} 11 & 39 & 9 \\ 32 & 28 & -8 \\ 36 & 8 & -56 \end{bmatrix}.$$

**Step 3.** Apply signs $(-1)^{i+j}$ to get the cofactor matrix:

$$\text{cof}(A) = \begin{bmatrix} 11 & -39 & 9 \\ -32 & 28 & 8 \\ 36 & -8 & -56 \end{bmatrix}.$$

**Step 4.** Transpose to get the adjugate:

$$\text{adj}(A) = \begin{bmatrix} 11 & -32 & 36 \\ -39 & 28 & -8 \\ 9 & 8 & -56 \end{bmatrix}.$$

**Step 5.** Compute the inverse:

$$A^{-1} = \frac{1}{-188}\begin{bmatrix} 11 & -32 & 36 \\ -39 & 28 & -8 \\ 9 & 8 & -56 \end{bmatrix}.$$

**Step 6.** Multiply $x = A^{-1}b$:

$$x = \frac{1}{-188}\begin{bmatrix} 11 & -32 & 36 \\ -39 & 28 & -8 \\ 9 & 8 & -56 \end{bmatrix}\begin{bmatrix} 1960 \\ 2215 \\ 1135 \end{bmatrix} = \begin{bmatrix} 45 \\ 125 \\ 150 \end{bmatrix}.$$

So $x_1 = 45$, $x_2 = 125$, $x_3 = 150$.

---

## 4. Cramer's Rule

Cramer's rule provides an alternative method for finding each unknown $x_i$ individually, using only determinants. It is especially elegant for theoretical work and for finding one particular variable without computing the entire inverse.

### Statement for $2 \times 2$ Systems

Consider the system [▶ W2_L2 @ 06:00](https://www.youtube.com/watch?v=sOFHgNXXRFM&t=360)

$$\begin{cases} a_{11}x_1 + a_{12}x_2 = b_1 \\ a_{21}x_1 + a_{22}x_2 = b_2 \end{cases}$$

with coefficient matrix $A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$ and $\det(A) \neq 0$.

Define the matrices $A_{x_1}$ and $A_{x_2}$ by replacing the column of $A$ corresponding to that variable with the constant vector $b$:

$$A_{x_1} = \begin{bmatrix} b_1 & a_{12} \\ b_2 & a_{22} \end{bmatrix}, \qquad A_{x_2} = \begin{bmatrix} a_{11} & b_1 \\ a_{21} & b_2 \end{bmatrix}.$$

Then:

$$x_1 = \frac{\det(A_{x_1})}{\det(A)} = \frac{b_1 a_{22} - a_{12}b_2}{a_{11}a_{22} - a_{21}a_{12}}, \qquad x_2 = \frac{\det(A_{x_2})}{\det(A)} = \frac{a_{11}b_2 - b_1 a_{21}}{a_{11}a_{22} - a_{21}a_{12}}.$$

### $2 \times 2$ Worked Example

**Example:** Solve the system [▶ W2_L2 @ 00:41](https://www.youtube.com/watch?v=sOFHgNXXRFM&t=41)

$$\begin{cases} 4x_1 - 3x_2 = 11 \\ 6x_1 + 5x_2 = 7 \end{cases}$$

**Solution:**

$$A = \begin{bmatrix} 4 & -3 \\ 6 & 5 \end{bmatrix}, \quad b = \begin{bmatrix} 11 \\ 7 \end{bmatrix}.$$

**Step 1.** Compute $\det(A) = 4(5) - (-3)(6) = 20 + 18 = 38 \neq 0$.

**Step 2.** Form the replacement matrices:

$$A_{x_1} = \begin{bmatrix} 11 & -3 \\ 7 & 5 \end{bmatrix}, \qquad A_{x_2} = \begin{bmatrix} 4 & 11 \\ 6 & 7 \end{bmatrix}.$$

**Step 3.** Compute their determinants:

$$\det(A_{x_1}) = 11(5) - (-3)(7) = 55 + 21 = 76,$$
$$\det(A_{x_2}) = 4(7) - 11(6) = 28 - 66 = -38.$$

**Step 4.** Apply Cramer's rule: [▶ W2_L2 @ 04:47](https://www.youtube.com/watch?v=sOFHgNXXRFM&t=287)

$$x_1 = \frac{76}{38} = 2, \qquad x_2 = \frac{-38}{38} = -1.$$

*Verification:* $4(2) - 3(-1) = 8 + 3 = 11\;\checkmark$; $\;6(2) + 5(-1) = 12 - 5 = 7\;\checkmark$.

### Statement for $3 \times 3$ Systems

For the system $Ax = b$ with $A$ a $3 \times 3$ matrix and $\det(A) \neq 0$: [▶ W2_L2 @ 08:53](https://www.youtube.com/watch?v=sOFHgNXXRFM&t=533)

Define $A_{x_i}$ ($i = 1, 2, 3$) as the matrix obtained by replacing column $i$ of $A$ with the vector $b$. Then:

$$x_1 = \frac{\det(A_{x_1})}{\det(A)}, \qquad x_2 = \frac{\det(A_{x_2})}{\det(A)}, \qquad x_3 = \frac{\det(A_{x_3})}{\det(A)}.$$

### $3 \times 3$ Worked Example

**Example:** Solve the system whose coefficient matrix and constant vector are [▶ W2_L2 @ 11:26](https://www.youtube.com/watch?v=sOFHgNXXRFM&t=686)

$$A = \begin{bmatrix} 1 & 0 & 3 \\ 0 & 2 & 5 \\ 4 & 3 & 1 \end{bmatrix}, \quad b = \begin{bmatrix} 0 \\ 2 \\ 1 \end{bmatrix}.$$

**Solution:**

**Step 1.** Compute $\det(A)$. Expanding along the first row:

$$\det(A) = 1(2\cdot1 - 5\cdot3) - 0 + 3(0\cdot3 - 2\cdot4) = 1(-13) + 3(-8) = -13 - 24 = -37.$$

Since $\det(A) = -37 \neq 0$, Cramer's rule applies.

**Step 2.** Form the replacement matrices:

$$A_{x_1} = \begin{bmatrix} 0 & 0 & 3 \\ 2 & 2 & 5 \\ 1 & 3 & 1 \end{bmatrix}, \quad A_{x_2} = \begin{bmatrix} 1 & 0 & 3 \\ 0 & 2 & 5 \\ 4 & 1 & 1 \end{bmatrix}, \quad A_{x_3} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 2 & 2 \\ 4 & 3 & 1 \end{bmatrix}.$$

**Step 3.** Compute determinants.

For $\det(A_{x_1})$: expand along the first row (two zeros make this efficient):

$$\det(A_{x_1}) = 0 - 0 + 3(2\cdot3 - 2\cdot1) = 3(6 - 2) = 12.$$

For $\det(A_{x_2})$: expand along the first row:

$$\det(A_{x_2}) = 1(2\cdot1 - 5\cdot1) - 0 + 3(0\cdot1 - 2\cdot4) = 1(-3) + 3(-8) = -3 - 24 = -27.$$

For $\det(A_{x_3})$: expand along the first row:

$$\det(A_{x_3}) = 1(2\cdot1 - 2\cdot3) - 0 + 0 = 1(2 - 6) = -4.$$

**Step 4.** Apply Cramer's rule:

$$x_1 = \frac{12}{-37} = -\frac{12}{37}, \qquad x_2 = \frac{-27}{-37} = \frac{27}{37}, \qquad x_3 = \frac{-4}{-37} = \frac{4}{37}.$$

### General Statement ($n \times n$)

> **Theorem (Cramer's Rule).** Consider the system $Ax = b$ where $A$ is an $n \times n$ matrix with $\det(A) \neq 0$, and $b \in \mathbb{R}^n$. For each $i = 1, 2, \ldots, n$, let $A_{x_i}$ denote the matrix obtained from $A$ by replacing its $i$-th column with $b$. Then the system has the unique solution [▶ W2_L2 @ 14:02](https://www.youtube.com/watch?v=sOFHgNXXRFM&t=842)
>
> $$x_i = \frac{\det(A_{x_i})}{\det(A)}, \qquad i = 1, 2, \ldots, n.$$

**Requirements for Cramer's rule:**

1. The coefficient matrix $A$ must be **square** ($n$ equations in $n$ unknowns).
2. $\det(A) \neq 0$ (equivalently, $A$ is invertible).

> **Clarification:** Cramer's rule is primarily a theoretical tool. For large $n$, computing $n+1$ determinants is far more expensive than Gaussian elimination (see [[2 - SOLVING SYSTEMS]]). However, for $2 \times 2$ and $3 \times 3$ systems it is practical, and it offers clean closed-form expressions that are useful in proofs and symbolic computation.

---

## 5. Conditions for Unique Solutions

We now collect the various equivalent conditions into a single coherent picture.

### The Invertible Matrix Theorem (Partial List)

For an $n \times n$ matrix $A$, the following are **all equivalent**:

| # | Condition |
|---|-----------|
| 1 | $A$ is invertible (i.e., $A^{-1}$ exists). |
| 2 | $\det(A) \neq 0$. |
| 3 | The system $Ax = b$ has a unique solution for **every** $b \in \mathbb{R}^n$. |
| 4 | The homogeneous system $Ax = 0$ has only the **trivial solution** $x = 0$. |
| 5 | The reduced row echelon form of $A$ is $I_n$ (see [[2 - SOLVING SYSTEMS]]). |

When these conditions **fail** (i.e., $\det(A) = 0$):
- $A$ is **singular** (not invertible).
- The system $Ax = b$ either has **no solution** or **infinitely many solutions**, depending on $b$.
- The homogeneous system $Ax = 0$ has **infinitely many** (non-trivial) solutions.

### Homogeneous Systems

A system of the form $Ax = 0$ (where $b = 0$) is called **homogeneous**. [▶ W2_L3 @ 27:33](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=1653)

The zero vector $x = 0$ is always a solution (the **trivial solution**). The interesting question is whether non-trivial solutions exist.

> **Theorem (Homogeneous Systems with Square Coefficient Matrix).** Let $A$ be an $n \times n$ matrix.
>
> - If $\det(A) \neq 0$: the only solution is $x = 0$ (since $x = A^{-1} \cdot 0 = 0$).
> - If $\det(A) = 0$: there are **infinitely many** solutions. [▶ W2_L3 @ 28:04](https://www.youtube.com/watch?v=0txe9Mu5OdM&t=1684)

> **Clarification:** For a homogeneous system with a square coefficient matrix, the dichotomy is: exactly **one** solution (the trivial one) or **infinitely many**.