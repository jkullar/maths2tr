---
id: "1"
number: 1
title: "MATRICES"
section: "Weeks 1–4 · Linear Algebra Foundations"
---
# MATRICES

Matrices are one of the most fundamental objects in linear algebra. They provide a compact way to organise numerical data, represent systems of linear equations, and encode linear transformations. This file covers matrix definitions and notation, special matrix types, the core algebraic operations (addition, scalar multiplication, and matrix multiplication), the transpose, and an overview of invertibility. Mastery of these basics is essential for everything that follows — from solving systems of equations (see [[2 - SOLVING SYSTEMS]]) to understanding vector spaces (see [[5 - VECTORS AND SPACES]]).

---

## 1. Definitions and Notation

### What Is a Matrix?

A **matrix** is a rectangular array of numbers arranged in rows and columns. [▶ W1_L2 @ 01:51](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=111)

We enclose matrices in square brackets. For example:

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 3 & 4 \end{bmatrix}$$

This matrix has 2 rows and 3 columns, so we call it a **$2 \times 3$ matrix**. In general, a matrix with $m$ rows and $n$ columns is called an **$m \times n$ matrix** (read "$m$ by $n$"). The pair $(m, n)$ is called the **size** or **order** of the matrix.

We denote the set of all $m \times n$ matrices with real entries by $\mathbb{R}^{m \times n}$.

### Entry Notation

The individual numbers inside a matrix are called its **entries** (or **elements**). We refer to a specific entry by its row and column position. [▶ W1_L2 @ 03:00](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=180)

If $A$ is an $m \times n$ matrix, then $a_{ij}$ (or equivalently $(A)_{ij}$) denotes the entry in the **$i$-th row** and **$j$-th column**. The first index always refers to the row; the second always refers to the column.

We sometimes write a matrix compactly as:

$$A = [a_{ij}]_{\substack{1 \le i \le m \\ 1 \le j \le n}}$$

or simply $A = [a_{ij}]$ when the dimensions are understood from context.

**Example:** Consider the matrix

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 3 & 4 \end{bmatrix}$$

**Solution:**
- $a_{12}$ (row 1, column 2) $= 2$
- $a_{23}$ (row 2, column 3) $= 4$
- $a_{11}$ (row 1, column 1) $= 1$
- $a_{21}$ (row 2, column 1) $= 2$

> **Clarification:** The notation $a_{ij}$ always means "row first, column second." A common early mistake is to reverse the indices. Think of it as an address: the row is the street, the column is the house number.

### Rows and Columns as Vectors

Each row of an $m \times n$ matrix can be viewed as a $1 \times n$ **row vector**, and each column as an $m \times 1$ **column vector**. For the matrix $A$ above:

- Row 1: $\begin{bmatrix} 1 & 2 & 3 \end{bmatrix}$, Row 2: $\begin{bmatrix} 2 & 3 & 4 \end{bmatrix}$
- Column 1: $\begin{bmatrix} 1 \\ 2 \end{bmatrix}$, Column 2: $\begin{bmatrix} 2 \\ 3 \end{bmatrix}$, Column 3: $\begin{bmatrix} 3 \\ 4 \end{bmatrix}$

This perspective becomes crucial when we discuss matrix–vector multiplication and column/row space in [[5 - VECTORS AND SPACES]].

---

## 2. Special Types of Matrices

### Square Matrices

A **square matrix** is a matrix where the number of rows equals the number of columns, i.e., an $n \times n$ matrix. [▶ W1_L2 @ 04:50](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=290)

**Example:**

$$B = \begin{bmatrix} 1 & 0 & 2 \\ 3 & 1 & 1 \\ 5 & 4 & 7 \end{bmatrix}$$

is a $3 \times 3$ square matrix.

The **main diagonal** (or simply **diagonal**) of a square matrix consists of the entries $a_{11}, a_{22}, \ldots, a_{nn}$ — that is, all entries where the row index equals the column index. For $B$ above, the diagonal entries are $1, 1, 7$.

> **Clarification:** We speak of "the diagonal" only for square matrices. While rectangular matrices have entries $a_{ii}$ for $1 \le i \le \min(m,n)$, the term "diagonal matrix" and related concepts are reserved for the square case.

### The Zero Matrix

The **zero matrix**, denoted $O$ or $\mathbf{0}_{m \times n}$, is the $m \times n$ matrix in which every entry is $0$:

$$O = \begin{bmatrix} 0 & 0 & \cdots & 0 \\ 0 & 0 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 0 \end{bmatrix}$$

The zero matrix serves as the **additive identity** for matrices: $A + O = O + A = A$ for any matrix $A$ of the same size.

### Diagonal Matrices

A **diagonal matrix** is a square matrix whose only non-zero entries lie on the main diagonal. [▶ W1_L2 @ 06:51](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=411) That is, $a_{ij} = 0$ whenever $i \neq j$.

**Example:**

$$D = \begin{bmatrix} 1 & 0 & 0 \\ 0 & -3 & 0 \\ 0 & 0 & 4.2 \end{bmatrix}$$

We often write this compactly as $D = \text{diag}(1, -3, 4.2)$.

Diagonal matrices are particularly convenient because their algebra reduces to operations on the diagonal entries alone. For example, if $D_1 = \text{diag}(d_1, \ldots, d_n)$ and $D_2 = \text{diag}(e_1, \ldots, e_n)$, then:

$$D_1 D_2 = \text{diag}(d_1 e_1,\, d_2 e_2,\, \ldots,\, d_n e_n)$$

### Scalar Matrices

A **scalar matrix** is a diagonal matrix in which all diagonal entries are equal. [▶ W1_L2 @ 07:26](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=446) That is, $a_{ii} = c$ for some fixed scalar $c$ and all $i$, while $a_{ij} = 0$ for $i \neq j$.

**Example:**

$$S = \begin{bmatrix} -3 & 0 & 0 \\ 0 & -3 & 0 \\ 0 & 0 & -3 \end{bmatrix}$$

A scalar matrix $cI_n$ acts on any conformable matrix exactly like scalar multiplication by $c$ (see Section 5 below for the proof). This is the reason for the name "scalar matrix."

### The Identity Matrix

The **identity matrix**, denoted $I_n$ (or simply $I$ when the size is clear from context), is the $n \times n$ scalar matrix with every diagonal entry equal to $1$. [▶ W1_L2 @ 08:27](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=507)

$$I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \qquad I_4 = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

Using the Kronecker delta notation, $(I_n)_{ij} = \delta_{ij}$ where $\delta_{ij} = 1$ if $i = j$ and $\delta_{ij} = 0$ if $i \neq j$.

The identity matrix is the **multiplicative identity** for matrices:

$$I_m A = A = A I_n \quad \text{for any } A \in \mathbb{R}^{m \times n}$$

Note the sizes: left-multiplication uses $I_m$; right-multiplication uses $I_n$.

### Upper and Lower Triangular Matrices

A square matrix $A$ is **upper triangular** if all entries below the main diagonal are zero:

$$a_{ij} = 0 \quad \text{whenever } i > j$$

**Example:**

$$U = \begin{bmatrix} 2 & 5 & -1 \\ 0 & 3 & 7 \\ 0 & 0 & 4 \end{bmatrix}$$

Similarly, $A$ is **lower triangular** if all entries above the main diagonal are zero:

$$a_{ij} = 0 \quad \text{whenever } i < j$$

**Example:**

$$L = \begin{bmatrix} 2 & 0 & 0 \\ 1 & 3 & 0 \\ -4 & 6 & 4 \end{bmatrix}$$

Key properties of triangular matrices:

- The product of two upper (resp. lower) triangular matrices is upper (resp. lower) triangular.
- The diagonal entries of a triangular matrix are its eigenvalues.
- A triangular matrix is invertible if and only if all its diagonal entries are non-zero.
- A matrix that is both upper and lower triangular is a diagonal matrix.

Triangular matrices play a central role in Gaussian elimination and LU decomposition; see [[2 - SOLVING SYSTEMS]] for details.

### Symmetric Matrices

A square matrix $A$ is **symmetric** if it equals its own transpose (defined in Section 6):

$$A^T = A \quad \Longleftrightarrow \quad a_{ij} = a_{ji} \text{ for all } i, j$$

**Example:**

$$A = \begin{bmatrix} 1 & 4 & 5 \\ 4 & 2 & 6 \\ 5 & 6 & 3 \end{bmatrix}$$

Note how the entries are mirrored across the main diagonal: $a_{12} = a_{21} = 4$, $a_{13} = a_{31} = 5$, $a_{23} = a_{32} = 6$.

Symmetric matrices arise naturally in many applications (covariance matrices, distance matrices, quadratic forms) and have particularly nice spectral properties.

### Summary of Special Matrix Types

| Type | Conditions | Example Size $3 \times 3$ |
|------|-----------|---------------------------|
| Square | $m = n$ | Any $3 \times 3$ matrix |
| Zero | All entries $= 0$ | $\mathbf{0}_{3 \times 3}$ |
| Diagonal | $a_{ij} = 0$ for $i \neq j$ | $\text{diag}(2, -1, 7)$ |
| Scalar | Diagonal with all diagonal entries equal | $\text{diag}(5, 5, 5) = 5I_3$ |
| Identity | Scalar with diagonal entries $= 1$ | $I_3$ |
| Upper triangular | $a_{ij} = 0$ for $i > j$ | Non-zero entries on and above diagonal |
| Lower triangular | $a_{ij} = 0$ for $i < j$ | Non-zero entries on and below diagonal |
| Symmetric | $a_{ij} = a_{ji}$ for all $i,j$ | Mirrored across diagonal |

---

## 3. Matrix Addition

### Definition

Two matrices can be added **only if they have the same size**. If $A$ and $B$ are both $m \times n$ matrices, their **sum** $A + B$ is the $m \times n$ matrix defined entry-wise: [▶ W1_L2 @ 11:20](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=680)

$$(A + B)_{ij} = a_{ij} + b_{ij} \quad \text{for all } 1 \le i \le m,\; 1 \le j \le n$$

In words: add corresponding entries.

**Example:** Compute $A + B$ where

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 7 \\ 5 & 9 \end{bmatrix}, \qquad B = \begin{bmatrix} 0 & -2 \\ 1 & -7 \\ 3 & 0 \end{bmatrix}$$

**Solution:** Both matrices are $3 \times 2$, so addition is defined:

$$A + B = \begin{bmatrix} 1+0 & 2+(-2) \\ 3+1 & 7+(-7) \\ 5+3 & 9+0 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 4 & 0 \\ 8 & 9 \end{bmatrix}$$

**Example:** Compute the sum of the two $1 \times 3$ matrices:

$$\begin{bmatrix} \frac{1}{2} & -\frac{3}{4} & 3 \end{bmatrix} + \begin{bmatrix} 2 & -3 & -1 \end{bmatrix} = \begin{bmatrix} \frac{5}{2} & -\frac{15}{4} & 2 \end{bmatrix}$$

**Solution (detail for the second entry):** $-\frac{3}{4} + (-3) = -\frac{3}{4} - \frac{12}{4} = -\frac{15}{4}$.

### Properties of Matrix Addition

For matrices $A, B, C \in \mathbb{R}^{m \times n}$ and the zero matrix $O \in \mathbb{R}^{m \times n}$:

| Property | Statement |
|----------|-----------|
| Commutativity | $A + B = B + A$ |
| Associativity | $(A + B) + C = A + (B + C)$ |
| Additive identity | $A + O = A$ |
| Additive inverse | $A + (-A) = O$, where $(-A)_{ij} = -a_{ij}$ |

All of these follow directly from the corresponding properties of real number addition, applied entry-wise.

---

## 4. Scalar Multiplication

### Definition

The **scalar multiple** of a matrix $A \in \mathbb{R}^{m \times n}$ by a scalar $c \in \mathbb{R}$ is the $m \times n$ matrix $cA$ defined by: [▶ W1_L2 @ 13:58](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=838)

$$(cA)_{ij} = c \cdot a_{ij} \quad \text{for all } i, j$$

In words: multiply every entry by $c$.

**Example:** Compute $3A$ where $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$.

**Solution:**

$$3A = \begin{bmatrix} 3 \cdot 1 & 3 \cdot 2 & 3 \cdot 3 \\ 3 \cdot 4 & 3 \cdot 5 & 3 \cdot 6 \end{bmatrix} = \begin{bmatrix} 3 & 6 & 9 \\ 12 & 15 & 18 \end{bmatrix}$$

### Properties of Scalar Multiplication

For matrices $A, B \in \mathbb{R}^{m \times n}$ and scalars $\lambda, \mu \in \mathbb{R}$:

| Property | Statement |
|----------|-----------|
| Distributivity over matrix addition | $\lambda(A + B) = \lambda A + \lambda B$ |
| Distributivity over scalar addition | $(\lambda + \mu)A = \lambda A + \mu A$ |
| Associativity of scalars | $\lambda(\mu A) = (\lambda \mu) A$ |
| Multiplicative identity | $1 \cdot A = A$ |

---

## 5. Matrix Multiplication

Matrix multiplication is the most important — and initially the most surprising — operation in linear algebra. Unlike addition and scalar multiplication, it is **not** performed entry-wise.

### Definition

Let $A \in \mathbb{R}^{m \times n}$ and $B \in \mathbb{R}^{n \times p}$. The **product** $AB$ is the $m \times p$ matrix whose $(i,j)$-th entry is: [▶ W1_L2 @ 15:25](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=925)

$$(AB)_{ij} = \sum_{k=1}^{n} a_{ik}\, b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}$$

In words: to compute the $(i,j)$-th entry of $AB$, take the **$i$-th row of $A$** and the **$j$-th column of $B$**, multiply corresponding entries, and sum.

### The Conformability Condition

The product $AB$ is defined **only when the number of columns of $A$ equals the number of rows of $B$**. [▶ W1_L2 @ 19:32](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=1172)

$$A \in \mathbb{R}^{m \times \mathbf{n}}, \quad B \in \mathbb{R}^{\mathbf{n} \times p} \quad \Longrightarrow \quad AB \in \mathbb{R}^{m \times p}$$

The shared dimension $n$ is "consumed" in the multiplication; the result has $m$ rows (from $A$) and $p$ columns (from $B$).

> **Clarification:** A helpful mnemonic is to write the sizes side by side: $(m \times \mathbf{n})(\mathbf{n} \times p) = (m \times p)$. The inner dimensions must match; the outer dimensions give the size of the product.

### Worked Examples

**Example 1:** Compute $AB$ where

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \qquad B = \begin{bmatrix} 1 & 2 & 3 \\ 3 & 4 & 5 \end{bmatrix}$$

**Solution:** $A$ is $2 \times 2$, $B$ is $2 \times 3$. Inner dimensions match ($2 = 2$), so $AB$ is $2 \times 3$.

$$(AB)_{11} = 1 \cdot 1 + 2 \cdot 3 = 1 + 6 = 7$$
$$(AB)_{12} = 1 \cdot 2 + 2 \cdot 4 = 2 + 8 = 10$$
$$(AB)_{13} = 1 \cdot 3 + 2 \cdot 5 = 3 + 10 = 13$$
$$(AB)_{21} = 3 \cdot 1 + 4 \cdot 3 = 3 + 12 = 15$$
$$(AB)_{22} = 3 \cdot 2 + 4 \cdot 4 = 6 + 16 = 22$$
$$(AB)_{23} = 3 \cdot 3 + 4 \cdot 5 = 9 + 20 = 29$$

$$AB = \begin{bmatrix} 7 & 10 & 13 \\ 15 & 22 & 29 \end{bmatrix}$$

**Example 2:** Compute $AB$ where

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \qquad B = \begin{bmatrix} 5 \\ 6 \end{bmatrix}$$

**Solution:** $A$ is $2 \times 2$, $B$ is $2 \times 1$. The product $AB$ is $2 \times 1$.

$$(AB)_{11} = 1 \cdot 5 + 2 \cdot 6 = 5 + 12 = 17$$
$$(AB)_{21} = 3 \cdot 5 + 4 \cdot 6 = 15 + 24 = 39$$

$$AB = \begin{bmatrix} 17 \\ 39 \end{bmatrix}$$

**Example 3:** Compute $AB$ where

$$A = \begin{bmatrix} 1 & 2 & 3 \end{bmatrix}, \qquad B = \begin{bmatrix} 2 & 0.8 \\ 5 & 0.7 \\ 0.5 & -2 \end{bmatrix}$$

**Solution:** $A$ is $1 \times 3$, $B$ is $3 \times 2$. The product $AB$ is $1 \times 2$.

$$(AB)_{11} = 1 \cdot 2 + 2 \cdot 5 + 3 \cdot 0.5 = 2 + 10 + 1.5 = 13.5$$
$$(AB)_{12} = 1 \cdot 0.8 + 2 \cdot 0.7 + 3 \cdot (-2) = 0.8 + 1.4 - 6 = -3.8$$

$$AB = \begin{bmatrix} 13.5 & -3.8 \end{bmatrix}$$

### Multiplication by a Scalar Matrix

Let $S = cI_n$ be the $n \times n$ scalar matrix with diagonal entries $c$, and let $A$ be any $n \times p$ matrix. Then: [▶ W1_L2 @ 23:50](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=1430)

$$SA = (cI_n)A = cA$$

**Proof sketch:** The $(i,j)$-entry of $SA$ is $\sum_{k=1}^n (cI_n)_{ik}\, a_{kj}$. Since $(cI_n)_{ik} = c\,\delta_{ik}$, only the $k = i$ term survives, giving $c \cdot a_{ij}$. This is exactly $(cA)_{ij}$.

This confirms that multiplication by a scalar matrix is the same as scalar multiplication. In particular, taking $c = 1$:

$$I_n A = A \quad \text{and} \quad A I_p = A \qquad \text{for } A \in \mathbb{R}^{n \times p}$$

### When Multiplication Is Undefined

If $A$ is $m \times n$ and $B$ is $r \times p$ with $n \neq r$, then the product $AB$ is **not defined**.

**Example:** Let

$$A = \begin{bmatrix} 1 & 2 & 3 \end{bmatrix}, \qquad B = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$$

$A$ is $1 \times 3$ and $B$ is $2 \times 2$. Since $3 \neq 2$, the product $AB$ does not exist. However, $BA$ is defined: $B$ is $2 \times 2$ and $A$ is $1 \times 3$ — wait, $2 \neq 1$, so $BA$ is also undefined.

Now consider $A$ being $2 \times 3$ and $B$ being $3 \times 1$. Then $AB$ is defined ($2 \times 1$), but $BA$ requires $1 \times 3$ times $2 \times 3$: since $3 \neq 2$, $BA$ is undefined.

### Properties of Matrix Multiplication

For matrices $A, B, C$ of compatible sizes and scalar $\lambda \in \mathbb{R}$: [▶ W1_L2 @ 27:19](https://www.youtube.com/watch?v=rnIDlZnrCc0&t=1639)

| Property | Statement | Notes |
|----------|-----------|-------|
| Associativity | $(AB)C = A(BC)$ | Order preserved; grouping doesn't matter |
| Left distributivity | $A(B + C) = AB + AC$ | $B, C$ must be same size |
| Right distributivity | $(A + B)C = AC + BC$ | $A, B$ must be same size |
| Scalar compatibility | $\lambda(AB) = (\lambda A)B = A(\lambda B)$ | Scalar can "float" freely |
| Multiplicative identity | $I_m A = A = A I_n$ | For $A \in \mathbb{R}^{m \times n}$ |
| **NOT commutative** | $AB \neq BA$ in general | See warning below |

> **Clarification:** Matrix multiplication is **not commutative**. This is one of the most important distinctions from ordinary arithmetic. Three things can go wrong:
> 1. $AB$ may be defined while $BA$ is not (different sizes).
> 2. $AB$ and $BA$ may both be defined but have different sizes.
> 3. $AB$ and $BA$ may both be defined and the same size, yet $AB \neq BA$.
>
> **Example of case 3:** Take $A = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}$ and $B = \begin{bmatrix} 1 & 0 \\ 3 & 1 \end{bmatrix}$. Then $AB = \begin{bmatrix} 7 & 2 \\ 3 & 1 \end{bmatrix}$ while $BA = \begin{bmatrix} 1 & 2 \\ 3 & 7 \end{bmatrix}$. Clearly $AB \neq BA$.

Another important warning: **$AB = O$ does not imply $A = O$ or $B = O$**. For example:

$$\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$$

Neither factor is the zero matrix, yet the product is zero. This means the **cancellation law** ($AB = AC \Rightarrow B = C$) does **not** hold in general.

---

## 6. The Transpose

### Definition

The **transpose** of an $m \times n$ matrix $A$, denoted $A^T$, is the $n \times m$ matrix obtained by interchanging rows and columns:

$$(A^T)_{ij} = a_{ji}$$

In words: the $i$-th row of $A$ becomes the $i$-th column of $A^T$.

**Example:**

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \qquad \Longrightarrow \qquad A^T = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}$$

$A$ is $2 \times 3$; $A^T$ is $3 \times 2$.

**Example:**

$$\mathbf{v} = \begin{bmatrix} 3 \\ -1 \\ 7 \end{bmatrix} \qquad \Longrightarrow \qquad \mathbf{v}^T = \begin{bmatrix} 3 & -1 & 7 \end{bmatrix}$$

### Properties of the Transpose

For matrices $A, B$ of compatible sizes and scalar $c \in \mathbb{R}$:

| Property | Statement |
|----------|-----------|
| Double transpose | $(A^T)^T = A$ |
| Sum | $(A + B)^T = A^T + B^T$ |
| Scalar multiple | $(cA)^T = c\,A^T$ |
| Product (reversal!) | $(AB)^T = B^T A^T$ |
| Identity | $I_n^T = I_n$ |

> **Clarification:** The **transpose of a product reverses the order**: $(AB)^T = B^T A^T$. This generalises to any number of factors: $(ABC)^T = C^T B^T A^T$. Think of it like reversing the order when turning socks inside out.

**Proof sketch for $(AB)^T = B^T A^T$:** The $(i,j)$-entry of $(AB)^T$ is $(AB)_{ji} = \sum_k a_{jk}b_{ki}$. The $(i,j)$-entry of $B^TA^T$ is $\sum_k (B^T)_{ik}(A^T)_{kj} = \sum_k b_{ki}a_{jk}$, which is the same sum.

### Symmetric Matrices Revisited

With the transpose defined, we can restate the definition: a square matrix $A$ is **symmetric** if and only if $A^T = A$.

Useful facts:
- For **any** matrix $A \in \mathbb{R}^{m \times n}$, the products $A^T A$ (which is $n \times n$) and $AA^T$ (which is $m \times m$) are both symmetric. 
  
  *Proof:* $(A^T A)^T = A^T (A^T)^T = A^T A$. Similarly for $AA^T$.

- If $A$ and $B$ are both $n \times n$ symmetric matrices, then $A + B$ is symmetric,