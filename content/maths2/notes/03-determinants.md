---
id: "3"
number: 3
title: "DETERMINANTS"
section: "Weeks 1–4 · Linear Algebra Foundations"
---


# DETERMINANTS

Every square matrix $A$ can be associated with a single number called its **determinant**, written $\det(A)$ or $|A|$. This file develops the theory of determinants from the ground up: explicit formulas for $2\times 2$ and $3\times 3$ matrices, the language of minors and cofactors, cofactor expansion along any row or column, Sarrus' rule for $3\times 3$ matrices, and the key properties that make determinants so powerful — including the effect of row operations, the determinant of triangular matrices, and the multiplicative property $\det(AB)=\det(A)\det(B)$. Determinants are essential for solving systems of linear equations, computing matrix inverses, and for the cross product in vector calculus. For background on matrix operations, see [[1 - MATRICES]].

---

## 1. Definition for Small Matrices

### 1×1 Matrices

If $A = \begin{bmatrix} a \end{bmatrix}$ is a $1\times 1$ matrix, its determinant is simply that number: [▶ W1_L4 @ 02:07](https://www.youtube.com/watch?v=A3fxp49I4U8&t=127)

$$\det(A) = a$$

### 2×2 Matrices

Let $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$. The **determinant of a $2\times 2$ matrix** is defined as [▶ W1_L4 @ 02:32](https://www.youtube.com/watch?v=A3fxp49I4U8&t=152)

$$\det(A) = ad - bc$$

The rule is: multiply the **main diagonal** entries ($a$ and $d$) and subtract the product of the **off-diagonal** entries ($b$ and $c$).

**Example:** Let $A = \begin{bmatrix} 2 & 3 \\ 6 & 10 \end{bmatrix}$.

**Solution:**

$$\det(A) = (2)(10) - (3)(6) = 20 - 18 = 2$$

**Example:** Let $A = \begin{bmatrix} 5 & \frac{2}{3} \\ 6 & \frac{3}{7} \end{bmatrix}$.

**Solution:**

$$\det(A) = (5)\!\left(\tfrac{3}{7}\right) - \left(\tfrac{2}{3}\right)(6) = \frac{15}{7} - 4 = \frac{15 - 28}{7} = -\frac{13}{7}$$

### 3×3 Matrices — Expansion Along the First Row

Let $A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$. The determinant is defined by **expanding along the first row**: [▶ W1_L4 @ 04:36](https://www.youtube.com/watch?v=A3fxp49I4U8&t=276)

$$\det(A) = a_{11}\det\!\begin{bmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{bmatrix} - a_{12}\det\!\begin{bmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{bmatrix} + a_{13}\det\!\begin{bmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{bmatrix}$$

Each $2\times 2$ determinant is obtained by deleting the row and column containing the entry that multiplies it. Note the **alternating signs**: $+, -, +$.

Expanding the $2\times 2$ determinants gives the full six-term formula:

$$\det(A) = a_{11}a_{22}a_{33} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31}$$

**Example:** Let $A = \begin{bmatrix} 2 & 4 & 1 \\ 3 & 8 & 7 \\ 5 & 6 & 9 \end{bmatrix}$. [▶ W1_L4 @ 09:11](https://www.youtube.com/watch?v=A3fxp49I4U8&t=551)

**Solution:**

$$\det(A) = 2\det\!\begin{bmatrix} 8 & 7 \\ 6 & 9 \end{bmatrix} - 4\det\!\begin{bmatrix} 3 & 7 \\ 5 & 9 \end{bmatrix} + 1\det\!\begin{bmatrix} 3 & 8 \\ 5 & 6 \end{bmatrix}$$

Computing each $2\times 2$ determinant:

$$= 2(72 - 42) - 4(27 - 35) + 1(18 - 40)$$

$$= 2(30) - 4(-8) + 1(-22) = 60 + 32 - 22 = 70$$

> **Clarification:** The key insight is that the $3\times 3$ determinant is computed *in terms of* $2\times 2$ determinants. This is the inductive structure that generalises to matrices of any size.

---

## 2. Minors and Cofactors

### The $(i,j)$-Minor

Let $A$ be an $n\times n$ matrix. The **$(i,j)$-minor**, denoted $M_{ij}$, is the determinant of the $(n-1)\times(n-1)$ sub-matrix obtained by deleting the $i$-th row and $j$-th column from $A$. [▶ W1_L5 @ 09:24](https://www.youtube.com/watch?v=wejxX0YYYg4&t=564)

**Example:** For the $3\times 3$ matrix $A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$:

$$M_{11} = \det\!\begin{bmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{bmatrix}, \qquad M_{12} = \det\!\begin{bmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{bmatrix}, \qquad M_{23} = \det\!\begin{bmatrix} a_{11} & a_{12} \\ a_{31} & a_{32} \end{bmatrix}$$

### The $(i,j)$-Cofactor

The **$(i,j)$-cofactor**, denoted $C_{ij}$, attaches an alternating sign to the minor: [▶ W1_L5 @ 11:48](https://www.youtube.com/watch?v=wejxX0YYYg4&t=708)

$$C_{ij} = (-1)^{i+j}\,M_{ij}$$

The sign factor $(-1)^{i+j}$ follows a **checkerboard pattern**:

$$\begin{bmatrix} + & - & + & \cdots \\ - & + & - & \cdots \\ + & - & + & \cdots \\ \vdots & \vdots & \vdots & \ddots \end{bmatrix}$$

**Example:**

- $C_{11} = (-1)^{1+1}M_{11} = (+1)M_{11} = M_{11}$
- $C_{12} = (-1)^{1+2}M_{12} = (-1)M_{12} = -M_{12}$
- $C_{23} = (-1)^{2+3}M_{23} = (-1)M_{23} = -M_{23}$
- $C_{22} = (-1)^{2+2}M_{22} = (+1)M_{22} = M_{22}$

> **Clarification:** The cofactor absorbs the alternating sign from the expansion formula. This means we can write the determinant as a simple sum (all plus signs) when we use cofactors, rather than remembering the sign pattern.

### Determinant in Terms of Cofactors

The first-row expansion of a $3\times 3$ determinant can now be written compactly:

$$\det(A) = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13} = \sum_{j=1}^{3} a_{1j}\,C_{1j}$$

Compare this with the explicit formula from Section 1, where the signs appeared explicitly:

$$\det(A) = a_{11}M_{11} - a_{12}M_{12} + a_{13}M_{13}$$

Both expressions are identical; the cofactor notation simply packages the signs.

---

## 3. Cofactor Expansion Along Any Row or Column

### Statement

The definition of the determinant uses expansion along the first row, but the determinant can equally be computed by expanding along **any** row or **any** column: [▶ W2_L1 @ 03:22](https://www.youtube.com/watch?v=uO3mocPU9Q4&t=202)

**Expansion along the $i$-th row:**

$$\det(A) = \sum_{j=1}^{n} (-1)^{i+j}\,a_{ij}\,M_{ij} = \sum_{j=1}^{n} a_{ij}\,C_{ij}$$

**Expansion along the $j$-th column:**

$$\det(A) = \sum_{i=1}^{n} (-1)^{i+j}\,a_{ij}\,M_{ij} = \sum_{i=1}^{n} a_{ij}\,C_{ij}$$

All $2n$ possible expansions (one for each row, one for each column) give the same value.

### Worked Example — Expansion Along the Second Row

**Example:** Compute the determinant of $A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$ by expanding along the second row. [▶ W2_L1 @ 05:27](https://www.youtube.com/watch?v=uO3mocPU9Q4&t=327)

**Solution:** Set $i=2$. The expansion is:

$$\det(A) = (-1)^{2+1}a_{21}\det\!\begin{bmatrix} a_{12} & a_{13} \\ a_{32} & a_{33} \end{bmatrix} + (-1)^{2+2}a_{22}\det\!\begin{bmatrix} a_{11} & a_{13} \\ a_{31} & a_{33} \end{bmatrix} + (-1)^{2+3}a_{23}\det\!\begin{bmatrix} a_{11} & a_{12} \\ a_{31} & a_{32} \end{bmatrix}$$

Evaluating the signs:

$$= -a_{21}\det\!\begin{bmatrix} a_{12} & a_{13} \\ a_{32} & a_{33} \end{bmatrix} + a_{22}\det\!\begin{bmatrix} a_{11} & a_{13} \\ a_{31} & a_{33} \end{bmatrix} - a_{23}\det\!\begin{bmatrix} a_{11} & a_{12} \\ a_{31} & a_{32} \end{bmatrix}$$

### Computational Tip — Choose the Best Row or Column

When computing a determinant by hand, expand along whichever row or column contains the most zeros. Each zero entry eliminates an entire $2\times 2$ (or larger) determinant from the calculation. [▶ W2_L1 @ 26:52](https://www.youtube.com/watch?v=uO3mocPU9Q4&t=1612)

**Example:** Let $A = \begin{bmatrix} 3 & 0 & 0 \\ 2 & 5 & 1 \\ 4 & 0 & 7 \end{bmatrix}$. Expanding along the first row requires computing three $2\times 2$ determinants. But expanding along **column 2** is far more efficient, since two of its three entries are zero:

$$\det(A) = (-1)^{1+2}(0)M_{12} + (-1)^{2+2}(5)M_{22} + (-1)^{3+2}(0)M_{32}$$

$$= 0 + 5\det\!\begin{bmatrix} 3 & 0 \\ 4 & 7 \end{bmatrix} + 0 = 5(21 - 0) = 105$$

---

## 4. Sarrus' Rule (3×3 Only)

**Sarrus' rule** is a visual shortcut for computing the determinant of a $3\times 3$ matrix. It applies **only** to $3\times 3$ matrices and does **not** generalise to larger sizes.

Given $A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$, copy the first two columns to the right of the matrix:

$$\begin{array}{ccccc} a_{11} & a_{12} & a_{13} & a_{11} & a_{12} \\ a_{21} & a_{22} & a_{23} & a_{21} & a_{22} \\ a_{31} & a_{32} & a_{33} & a_{31} & a_{32} \end{array}$$

Then:

- **Add** the products along the three downward diagonals ($\searrow$):
$$a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32}$$

- **Subtract** the products along the three upward diagonals ($\nearrow$):
$$a_{31}a_{22}a_{13} + a_{32}a_{23}a_{11} + a_{33}a_{21}a_{12}$$

The determinant is:

$$\det(A) = a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{12}a_{21}a_{33} - a_{11}a_{23}a_{32}$$

This is the same six-term formula from Section 1, rearranged.

**Example:** $A = \begin{bmatrix} 2 & 4 & 1 \\ 3 & 8 & 7 \\ 5 & 6 & 9 \end{bmatrix}$

**Solution (Sarrus):**

Positive diagonals: $(2)(8)(9) + (4)(7)(5) + (1)(3)(6) = 144 + 140 + 18 = 302$

Negative diagonals: $(1)(8)(5) + (4)(3)(9) + (2)(7)(6) = 40 + 108 + 84 = 232$

$$\det(A) = 302 - 232 = 70$$

This agrees with the cofactor expansion result from Section 1.

> **Clarification:** Sarrus' rule is a convenient mnemonic for $3\times 3$ determinants but must **never** be applied to $4\times 4$ or larger matrices — it will give incorrect results. For $n \geq 4$, use cofactor expansion (or row reduction).

---

## 5. The General Inductive Definition ($n\times n$)

### Definition

The determinant for an $n\times n$ matrix is defined **inductively** (recursively). [▶ W1_L5 @ 18:57](https://www.youtube.com/watch?v=wejxX0YYYg4&t=1137)

**Base case:** For a $1\times 1$ matrix $A = \begin{bmatrix} a \end{bmatrix}$, define $\det(A) = a$.

**Inductive step:** Assume the determinant is defined for all $(n-1)\times(n-1)$ matrices. For an $n\times n$ matrix $A$, define:

$$\det(A) = \sum_{j=1}^{n} (-1)^{1+j}\,a_{1j}\,M_{1j}$$

where $M_{1j}$ is the $(1,j)$-minor — the determinant of the $(n-1)\times(n-1)$ matrix obtained by deleting the first row and $j$-th column of $A$.

Equivalently, using cofactors:

$$\det(A) = \sum_{j=1}^{n} a_{1j}\,C_{1j}$$

### Example: 4×4 Determinant

For a $4\times 4$ matrix, expansion along the first row gives: [▶ W1_L5 @ 16:53](https://www.youtube.com/watch?v=wejxX0YYYg4&t=1013)

$$\det(A) = a_{11}\det(A_{11}) - a_{12}\det(A_{12}) + a_{13}\det(A_{13}) - a_{14}\det(A_{14})$$

where $A_{1j}$ denotes the $3\times 3$ sub-matrix obtained by deleting row 1 and column $j$. Each of these $3\times 3$ determinants is then computed by the methods of Sections 1–4.

> **Clarification:** The number of terms in the full expansion of an $n\times n$ determinant is $n!$ (factorial). For a $4\times 4$ matrix, that is $24$ terms; for $5\times 5$, it is $120$ terms. This is why exploiting zeros and using row reduction to simplify before expanding is crucial for larger matrices.

---

## 6. Properties of Determinants

### 6.1 Determinant of the Identity Matrix

For any $n$, [▶ W1_L5 @ 23:15](https://www.youtube.com/watch?v=wejxX0YYYg4&t=1395)

$$\det(I_n) = 1$$

*Proof sketch:* Expand along the first row. The only nonzero entry in the first row is $a_{11} = 1$, so $\det(I_n) = 1 \cdot \det(I_{n-1})$. Repeating this argument inductively, we reach $\det(I_1) = 1$, so $\det(I_n) = 1$ for all $n$.

### 6.2 Triangular Matrices

A square matrix is **upper triangular** if all entries below the main diagonal are zero ($a_{ij}=0$ for $i>j$), and **lower triangular** if all entries above the main diagonal are zero ($a_{ij}=0$ for $i<j$). See [[1 - MATRICES]] for definitions.

**Theorem.** The determinant of a triangular matrix (upper or lower) equals the product of its diagonal entries: [▶ W1_L5 @ 02:36](https://www.youtube.com/watch?v=wejxX0YYYg4&t=156)

$$\det(A) = a_{11}\,a_{22}\,\cdots\,a_{nn}$$

**Example:** $A = \begin{bmatrix} 2 & 4 & 3 \\ 0 & 8 & 7 \\ 0 & 0 & 9 \end{bmatrix}$

**Solution:** $A$ is upper triangular, so:

$$\det(A) = 2 \cdot 8 \cdot 9 = 144$$

We can verify by cofactor expansion along the first row:

$$\det(A) = 2\det\!\begin{bmatrix} 8 & 7 \\ 0 & 9 \end{bmatrix} - 4\det\!\begin{bmatrix} 0 & 7 \\ 0 & 9 \end{bmatrix} + 3\det\!\begin{bmatrix} 0 & 8 \\ 0 & 0 \end{bmatrix}$$

$$= 2(72 - 0) - 4(0 - 0) + 3(0 - 0) = 144 \checkmark$$

*Proof sketch:* Expand along the first column. Since $A$ is upper triangular, the only nonzero entry in the first column is $a_{11}$. The resulting minor is again an upper triangular matrix of size $(n-1)\times(n-1)$. Inductively, the determinant is $a_{11}\cdot a_{22}\cdots a_{nn}$.

> **Clarification:** A **diagonal matrix** is both upper and lower triangular, so its determinant is also the product of its diagonal entries.

### 6.3 Effect of Row and Column Swaps

**Theorem.** If $\tilde{A}$ is obtained from $A$ by interchanging two rows (or two columns), then [▶ W1_L4 @ 20:28](https://www.youtube.com/watch?v=A3fxp49I4U8&t=1228)

$$\det(\tilde{A}) = -\det(A)$$

**Example:** $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, $\tilde{A} = \begin{bmatrix} c & d \\ a & b \end{bmatrix}$ (rows swapped).

**Solution:**

$$\det(\tilde{A}) = cb - da = -(ad - bc) = -\det(A) \checkmark$$

**Corollary.** If a matrix has two identical rows (or two identical columns), its determinant is zero.

*Proof:* Swapping those two identical rows gives the same matrix, so $\det(A) = -\det(A)$, which forces $\det(A)=0$.

### 6.4 Adding a Multiple of One Row (Column) to Another

**Theorem.** If $\tilde{A}$ is obtained from $A$ by adding $t$ times one row to a different row (or $t$ times one column to a different column), then [▶ W1_L4 @ 22:55](https://www.youtube.com/watch?v=A3fxp49I4U8&t=1375)

$$\det(\tilde{A}) = \det(A)$$

The determinant is **unchanged** by this operation.

**Example:** $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, $\tilde{A} = \begin{bmatrix} a + tc & b + td \\ c & d \end{bmatrix}$ (added $t \times$ row 2 to row 1).

**Solution:**

$$\det(\tilde{A}) = (a+tc)d - (b+td)c = ad + tcd - bc - tdc = ad - bc = \det(A) \checkmark$$

### 6.5 Scaling a Single Row (Column)

**Theorem.** If $\tilde{A}$ is obtained from $A$ by multiplying a single row (or a single column) by a scalar $t$, then [▶ W1_L4 @ 26:48](https://www.youtube.com/watch?v=A3fxp49I4U8&t=1608)

$$\det(\tilde{A}) = t\,\det(A)$$

**Example:** $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, $\tilde{A} = \begin{bmatrix} ta & tb \\ c & d \end{bmatrix}$ (row 1 scaled by $t$).

**Solution:**

$$\det(\tilde{A}) = (ta)d - (tb)c = t(ad - bc) = t\,\det(A) \checkmark$$

> **Clarification (critical warning):** Scaling the **entire** $n\times n$ matrix by $t$ means every row is scaled by $t$, so: [▶ W2_L1 @ 24:49](https://www.youtube.com/watch?v=uO3mocPU9Q4&t=1489)
>
> $$\det(tA) = t^n \det(A)$$
>
> **Not** $t\det(A)$. This is a very common mistake. For example, if $A$ is $3\times 3$, then $\det(2A) = 2^3\det(A) = 8\det(A)$.

### 6.6 The Multiplicative Property

**Theorem.** For any two $n\times n$ matrices $A$ and $B$: [▶ W1_L4 @ 14:55](https://www.youtube.com/watch?v=A3fxp49I4U8&t=895)

$$\det(AB) = \det(A)\,\det(B)$$

This is one of the most important properties of determinants. We verified it for $2\times 2$ matrices explicitly in the source lectures. The proof for general $n$ requires more advanced techniques but the result holds universally.

**Immediate consequences:**

1. **Powers:** $\det(A^k) = (\det(A))^k$ for any positive integer $k$.

2. **Inverse:** If $A$ is invertible, then $AA^{-1} = I$, so $\det(A)\det(A^{-1}) = \det(I) = 1$, giving: [▶ W1_L4 @ 19:02](https://www.youtube.com/watch?v=A3fxp49I4U8&t=1142)

$$\det(A^{-1}) = \frac{1}{\det(A)} = (\det(A))^{-1}$$

3. **Commutativity of determinant products:** Even though $AB \neq BA$ in general, we always have:

$$\det(AB) = \det(A)\det(B) = \det(B)\det(A) = \det(BA)$$

4. **Similarity:** $\det(P^{-1}AP) = \det(P^{-1})\det(A)\det(P) = \frac{1}{\det(P)}\det(A)\det(P) = \det(A)$.

### 6.7 Determinant of the Transpose

**Theorem.** For any $n\times n$ matrix $A$: [▶ W1_L5 @ 07:54](https://www.youtube.com/watch?v=wejxX0YYYg4&t=474)

$$\det(A^T) = \det(A)$$

The transpose does not change the determinant. This is why every property stated for rows has an analogous property for columns (and vice versa): transposing turns rows into columns and preserves the determinant.

*Proof sketch (inductive):* For a $3\times 3$ matrix, expand $\det(A^T)$ along the first row of $A^T$ (which is the first column of $A$). After matching terms with the expansion of $\det(A)$ along the first column, the two expressions are identical once the inductive hypothesis ($\det(B^T) = \det(B)$ for $2\times 2$ matrices $B$) is applied to the minors.

**Example:** $A = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$, $A^T = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$.

$$\det(A) = 4 - 6 = -2, \qquad \det(A^T) = 4 - 6 = -2 \checkmark$$

### 6.8 Zero Rows, Zero Columns, and Linear Dependence

The following are direct consequences of the properties above: [▶ W2_L1 @ 25:57](https://www.youtube.com/watch?v=uO3mocPU9Q4&t=1557)

| Condition | Consequence |
|---|---|
| $A$ has a row (or column) of all zeros | $\det(A) = 0$ |
| $A$ has two identical rows (or columns) | $\det(A) = 0$ |
| One row (or column) of $A$ is a linear combination of other rows (columns) | $\det(A) = 0$ |

*Why the third holds:* Use the "add a multiple of one row to another" operation (which does not change the determinant) to reduce the dependent row to a zero row. Then $\det(A) = 0$.

---

## 7. Summary of Row/Column Operation Effects

| Operation | Effect on $\det(A)$ |
|---|---|
| Swap two rows (or two columns) | Multiplied by $-1$ |
| Add $t \times$ (one row) to another row | Unchanged |
| Add $t \times$ (one column) to another column | Unchanged |
| Multiply one row (or column) by scalar $t$ | Multiplied by $t$ |
| Multiply entire $n\times n$ matrix by scalar $t$ | Multiplied by $t^n$ |

---

## 8. Summary Table

| Concept | Key Formula / Fact |
|---|---|
| $1\times 1$ determinant | $\det\begin{bmatrix}a\end{bmatrix} = a$ |
| $2\times 2$ determinant | $\det\begin{bmatrix}a & b \\ c & d\end{bmatrix} = ad - bc$ |
| $3\times 3$ determinant | Cofactor expansion or Sarrus' rule (6 terms) |
| $(i,j)$-minor $M_{ij}$ | Determinant of sub-matrix after deleting row $i$, column $j$ |
| $(i,j)$-cofactor $C_{ij}$ | $(-1)^{i+j}M_{ij}$ |
| Expansion along row $i$ | $\det(A) = \sum_{j=1}^{n} a_{ij}\,C_{ij}$ |
| Expansion along column $j$ | $\det(A) = \sum_{i=1}^{n} a_{ij}\,C_{ij}$ |
| Sarrus' rule | Visual shortcut for $3\times 3$ only |
| Triangular matrices | $\det(A) = a_{11}a_{22}\cdots a_{nn}$ |
| Identity matrix | $\det(I_n) = 1$ |
| Multiplicativity | $\det(AB) = \det(A)\det(B)$ |
| Inverse | $\det(A^{-1}) = 1/\det(A)$ |
| Transpose | $\det(A^T) = \det(A)$ |
| Scalar multiplication | $\det(tA) = t^n\det(A)$ for $n\times n$ matrix |
| Row/column swap | Changes sign |
| Adding multiple of row to another | No change |
| Row/column with all zeros | $\det = 0$ |

---

##