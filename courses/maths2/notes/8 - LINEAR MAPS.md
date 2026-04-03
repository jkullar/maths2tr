# LINEAR MAPS AND NULL SPACE

This file develops two deeply connected ideas in linear algebra: the **null space** of a matrix (the set of all solutions to $Ax = 0$) and **linear mappings/transformations** (functions between vector spaces that preserve the algebraic structure). Understanding the null space is essential for characterising the solution sets of linear systems, while linear transformations provide the language for describing how matrices act as functions. The **rank–nullity theorem** ties these ideas together, relating the dimension of the null space to the rank of a matrix. These concepts are foundational for everything that follows in linear algebra and its applications to data science.

**Prerequisites:** Familiarity with row reduction and RREF ([[2 - SOLVING SYSTEMS]]), vector spaces and subspaces ([[5 - VECTORS AND SPACES]]), and basis, dimension, and rank ([[7 - BASIS AND RANK]]).

---

## 1. The Null Space of a Matrix

### Definition

Let $A$ be an $m \times n$ matrix. The **null space** (or **kernel**) of $A$ is the set [▶ W5_L1 @ 02:13](https://www.youtube.com/watch?v=3_U6oMJeklc&t=133)

$$\text{null}(A) = \left\{ \mathbf{x} \in \mathbb{R}^n \;\middle|\; A\mathbf{x} = \mathbf{0} \right\}.$$

Equivalently, $\text{null}(A)$ is the **solution space** of the homogeneous system $A\mathbf{x} = \mathbf{0}$. The name "null" reflects the fact that we seek vectors $\mathbf{x}$ that $A$ sends to the **zero vector**.

> **Clarification:** The null space lives in $\mathbb{R}^n$ (the domain), not in $\mathbb{R}^m$ (the codomain). The number of columns of $A$ determines the ambient space.

### The Null Space Is a Subspace

$\text{null}(A)$ is a **subspace** of $\mathbb{R}^n$. To verify this, we check the two subspace conditions (see [[5 - VECTORS AND SPACES]]):

**Closure under addition.** Suppose $\mathbf{x}, \mathbf{y} \in \text{null}(A)$, so $A\mathbf{x} = \mathbf{0}$ and $A\mathbf{y} = \mathbf{0}$. Then

$$A(\mathbf{x} + \mathbf{y}) = A\mathbf{x} + A\mathbf{y} = \mathbf{0} + \mathbf{0} = \mathbf{0},$$

so $\mathbf{x} + \mathbf{y} \in \text{null}(A)$.

**Closure under scalar multiplication.** Suppose $\mathbf{x} \in \text{null}(A)$ and $\lambda \in \mathbb{R}$. Then

$$A(\lambda \mathbf{x}) = \lambda (A\mathbf{x}) = \lambda \mathbf{0} = \mathbf{0},$$

so $\lambda \mathbf{x} \in \text{null}(A)$.

Since $\text{null}(A)$ is a subspace, it is a vector space in its own right, and we may speak of its **dimension** and **basis**.

---

## 2. Finding the Null Space via Row Reduction

### The Method

To find $\text{null}(A)$, we solve $A\mathbf{x} = \mathbf{0}$ using Gaussian elimination. Because the right-hand side is the zero vector, the augmented column of zeros never changes during row reduction. We therefore **row-reduce $A$ alone** (dropping the augmented zero column) and reintroduce the equation $R\mathbf{x} = \mathbf{0}$ at the end, where $R$ is the reduced row echelon form of $A$. [▶ W5_L1 @ 19:30](https://www.youtube.com/watch?v=3_U6oMJeklc&t=1170)

**Step-by-step procedure:**

1. Row-reduce $A$ to its reduced row echelon form $R$.
2. Identify the **pivot columns** (columns containing a leading 1). The corresponding variables are **dependent variables**.
3. All remaining variables are **independent (free) variables**.
4. Assign arbitrary parameters $t_1, t_2, \dots, t_k$ to the free variables (one parameter per free variable).
5. Use the equations from $R\mathbf{x} = \mathbf{0}$ to express each dependent variable in terms of the parameters.
6. Write the general solution as a vector whose entries are expressions in $t_1, \dots, t_k$.

For a refresher on dependent/independent variables and reading solutions from RREF, see [[2 - SOLVING SYSTEMS]].

### Example 1: A $3 \times 3$ Matrix

**Example:** Find the null space of

$$A = \begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \\ 3 & 3 & 3 \end{bmatrix}.$$

[▶ W5_L1 @ 13:17](https://www.youtube.com/watch?v=3_U6oMJeklc&t=797)

**Solution:** Row-reduce $A$. Subtract $2R_1$ from $R_2$ and $3R_1$ from $R_3$:

$$A \xrightarrow{R_2 - 2R_1,\; R_3 - 3R_1} \begin{bmatrix} 1 & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix} = R.$$

**Identify variables:**
- The leading 1 is in column 1, so $x_1$ is a **dependent variable**.
- Columns 2 and 3 have no leading 1, so $x_2$ and $x_3$ are **independent (free) variables**.

**Assign parameters:** Let $x_2 = t_1$ and $x_3 = t_2$.

**Back-solve:** The single nonzero equation from $R\mathbf{x} = \mathbf{0}$ is

$$x_1 + x_2 + x_3 = 0 \quad \Longrightarrow \quad x_1 = -t_1 - t_2.$$

**General solution:**

$$\mathbf{x} = \begin{bmatrix} -t_1 - t_2 \\ t_1 \\ t_2 \end{bmatrix} = t_1 \begin{bmatrix} -1 \\ 1 \\ 0 \end{bmatrix} + t_2 \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}, \qquad t_1, t_2 \in \mathbb{R}.$$

Geometrically, the null space is the plane $x + y + z = 0$ through the origin in $\mathbb{R}^3$.

### Example 2: A $3 \times 4$ Matrix

**Example:** Find the null space of

$$A = \begin{bmatrix} 1 & 2 & 0 & 3 \\ 2 & 3 & 0 & 3 \\ 1 & 1 & 1 & 2 \end{bmatrix}.$$

[▶ W5_L2 @ 00:14](https://www.youtube.com/watch?v=sDKAGDJlSAE&t=14)

**Solution:** Row-reduce $A$:

$$\begin{bmatrix} 1 & 2 & 0 & 3 \\ 2 & 3 & 0 & 3 \\ 1 & 1 & 1 & 2 \end{bmatrix} \xrightarrow{R_2 - 2R_1,\; R_3 - R_1} \begin{bmatrix} 1 & 2 & 0 & 3 \\ 0 & -1 & 0 & -3 \\ 0 & -1 & 1 & -1 \end{bmatrix}$$

$$\xrightarrow{-R_2} \begin{bmatrix} 1 & 2 & 0 & 3 \\ 0 & 1 & 0 & 3 \\ 0 & -1 & 1 & -1 \end{bmatrix} \xrightarrow{R_3 + R_2} \begin{bmatrix} 1 & 2 & 0 & 3 \\ 0 & 1 & 0 & 3 \\ 0 & 0 & 1 & 2 \end{bmatrix}$$

$$\xrightarrow{R_1 - 2R_2} \begin{bmatrix} 1 & 0 & 0 & -3 \\ 0 & 1 & 0 & 3 \\ 0 & 0 & 1 & 2 \end{bmatrix} = R.$$

**Identify variables:**
- Leading 1s in columns 1, 2, 3 → $x_1, x_2, x_3$ are **dependent**.
- Column 4 has no leading 1 → $x_4$ is **independent (free)**.

**Assign parameter:** Let $x_4 = t$.

**Back-solve** from $R\mathbf{x} = \mathbf{0}$:

$$\begin{cases} x_1 - 3x_4 = 0 &\Longrightarrow x_1 = 3t \\ x_2 + 3x_4 = 0 &\Longrightarrow x_2 = -3t \\ x_3 + 2x_4 = 0 &\Longrightarrow x_3 = -2t \end{cases}$$

**General solution:**

$$\mathbf{x} = t \begin{bmatrix} 3 \\ -3 \\ -2 \\ 1 \end{bmatrix}, \qquad t \in \mathbb{R}.$$

**Verification:** Multiply $A$ by the basis vector:

$$\begin{bmatrix} 1 & 2 & 0 & 3 \\ 2 & 3 & 0 & 3 \\ 1 & 1 & 1 & 2 \end{bmatrix} \begin{bmatrix} 3 \\ -3 \\ -2 \\ 1 \end{bmatrix} = \begin{bmatrix} 3 - 6 + 0 + 3 \\ 6 - 9 + 0 + 3 \\ 3 - 3 - 2 + 2 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}. \checkmark$$

---

## 3. Nullity and Basis for the Null Space

### Nullity

The **nullity** of $A$ is the dimension of $\text{null}(A)$: [▶ W5_L1 @ 03:44](https://www.youtube.com/watch?v=3_U6oMJeklc&t=224)

$$\text{nullity}(A) = \dim\!\bigl(\text{null}(A)\bigr).$$

Computationally:

$$\text{nullity}(A) = \text{number of free (independent) variables in the RREF of } A.$$

### Constructing a Basis for the Null Space

Once you have the general solution written in terms of free parameters $t_1, \dots, t_k$, obtain a basis by:

- For each $i = 1, \dots, k$: set $t_i = 1$ and $t_j = 0$ for all $j \neq i$.
- The resulting $k$ vectors form a basis for $\text{null}(A)$.

**Why this works:** The general solution has the form

$$\mathbf{x} = t_1 \mathbf{v}_1 + t_2 \mathbf{v}_2 + \cdots + t_k \mathbf{v}_k.$$

- **Spanning:** Every solution is a linear combination of $\mathbf{v}_1, \dots, \mathbf{v}_k$.
- **Linear independence:** In each $\mathbf{v}_i$, the entry corresponding to the $i$-th free variable is 1, while the entries corresponding to all other free variables are 0. This staggered pattern of 1s and 0s forces linear independence.

### Summary of Examples

| Matrix | Size | RREF pivot columns | Free variables | Nullity | Basis for null space |
|--------|------|--------------------|----------------|---------|----------------------|
| Example 1 | $3 \times 3$ | Column 1 | $x_2, x_3$ | 2 | $\{(-1,1,0)^T,\; (-1,0,1)^T\}$ |
| Example 2 | $3 \times 4$ | Columns 1, 2, 3 | $x_4$ | 1 | $\{(3,-3,-2,1)^T\}$ |

---

## 4. The Rank–Nullity Theorem

### Statement

Let $A$ be an $m \times n$ matrix. Then [▶ W5_L2 @ 05:42](https://www.youtube.com/watch?v=sDKAGDJlSAE&t=342)

$$\boxed{\operatorname{rank}(A) + \operatorname{nullity}(A) = n}$$

where $n$ is the number of columns of $A$.

### Why It Is True

Row-reduce $A$ to its RREF $R$. Every column of $R$ either:

- **contains a leading 1** (a pivot) — this column corresponds to a **dependent variable**, or
- **does not contain a leading 1** — this column corresponds to a **free variable**.

Since every column falls into exactly one category:

$$\underbrace{\text{number of pivot columns}}_{\text{rank}(A)} + \underbrace{\text{number of non-pivot columns}}_{\text{nullity}(A)} = n.$$

Recall from [[7 - BASIS AND RANK]] that $\operatorname{rank}(A)$ equals the number of nonzero rows in the RREF, which equals the number of pivot columns, which equals both the row rank and the column rank.

### Example

For Example 2 above, $A$ is $3 \times 4$ with $n = 4$:

$$\operatorname{rank}(A) = 3 \quad \text{(three pivot columns)}, \qquad \operatorname{nullity}(A) = 1 \quad \text{(one free variable)}.$$

$$3 + 1 = 4 = n. \checkmark$$

### Consequences

| If you know... | Then you can conclude... |
|----------------|--------------------------|
| $\operatorname{rank}(A) = n$ | $\operatorname{nullity}(A) = 0$; the only solution to $A\mathbf{x} = \mathbf{0}$ is $\mathbf{x} = \mathbf{0}$ |
| $\operatorname{rank}(A) < n$ | $\operatorname{nullity}(A) > 0$; there exist nontrivial solutions to $A\mathbf{x} = \mathbf{0}$ |
| $A$ is $n \times n$ and $\det(A) \neq 0$ | $\operatorname{rank}(A) = n$, so $\operatorname{nullity}(A) = 0$ |

For further discussion of the rank–nullity theorem, see [[7 - BASIS AND RANK]].

---

## 5. Using Determinants to Check if Vectors Form a Basis

When you have exactly $n$ vectors in $\mathbb{R}^n$, you can test whether they form a basis by a single determinant computation. [▶ W5_L2 @ 10:54](https://www.youtube.com/watch?v=sDKAGDJlSAE&t=654)

### The Test

Given $n$ vectors $\mathbf{v}_1, \dots, \mathbf{v}_n \in \mathbb{R}^n$:

1. Form the $n \times n$ matrix $A$ whose columns are $\mathbf{v}_1, \dots, \mathbf{v}_n$.
2. Compute $\det(A)$.
3. If $\det(A) \neq 0$, then $\{\mathbf{v}_1, \dots, \mathbf{v}_n\}$ is a basis for $\mathbb{R}^n$.
4. If $\det(A) = 0$, then the vectors are linearly dependent and do **not** form a basis.

**Why this works:** For $n$ vectors in $\mathbb{R}^n$, linear independence alone is sufficient for a basis (any linearly independent set of $n$ vectors in an $n$-dimensional space automatically spans). The determinant is nonzero if and only if the matrix is invertible, which happens if and only if the columns are linearly independent.

### Example

**Example:** Is $\{(1,2,3),\; (0,1,2),\; (1,3,0)\}$ a basis for $\mathbb{R}^3$?

**Solution:** Form the matrix and compute its determinant:

$$A = \begin{bmatrix} 1 & 0 & 1 \\ 2 & 1 & 3 \\ 3 & 2 & 0 \end{bmatrix}.$$

Expanding along the first row:

$$\det(A) = 1 \cdot \det\begin{bmatrix} 1 & 3 \\ 2 & 0 \end{bmatrix} - 0 \cdot \det\begin{bmatrix} 2 & 3 \\ 3 & 0 \end{bmatrix} + 1 \cdot \det\begin{bmatrix} 2 & 1 \\ 3 & 2 \end{bmatrix}$$

$$= 1(0 - 6) - 0 + 1(4 - 3) = -6 + 1 = -5 \neq 0.$$

Since $\det(A) \neq 0$, the set is a basis for $\mathbb{R}^3$.

---

## 6. Linear Mappings

### Motivation: Cost Functions as Linear Functions

Consider a grocery shop with prices $p_1, p_2, p_3$ for three items. The total cost of buying quantities $x_1, x_2, x_3$ is [▶ W5_L3 @ 02:00](https://www.youtube.com/watch?v=MvCkhmYhTkw&t=120)

$$c(x_1, x_2, x_3) = p_1 x_1 + p_2 x_2 + p_3 x_3.$$

This is a **linear combination** of the quantities with fixed coefficients, and we can view it as a function $c : \mathbb{R}^3 \to \mathbb{R}$. Such a function is called **linear** because:
- It involves only first powers of the variables (no $x_i^2$, $\log x_i$, $e^{x_i}$, etc.).
- It can be written as matrix multiplication: $c(\mathbf{x}) = \mathbf{p}^T \mathbf{x}$ where $\mathbf{p} = (p_1, p_2, p_3)^T$.

When we have multiple shops, the costs can be assembled into a vector-valued function. If three shops have price vectors $\mathbf{p}_A, \mathbf{p}_B, \mathbf{p}_C$, we define

$$C(\mathbf{x}) = \begin{bmatrix} \mathbf{p}_A^T \mathbf{x} \\ \mathbf{p}_B^T \mathbf{x} \\ \mathbf{p}_C^T \mathbf{x} \end{bmatrix} = \begin{bmatrix} 45 & 125 & 150 \\ 40 & 120 & 170 \\ 50 & 130 & 160 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix}.$$

This is a function $C : \mathbb{R}^3 \to \mathbb{R}^3$, and each component is a linear combination of $x_1, x_2, x_3$.

### The Key Property: Linearity

The cost function satisfies a remarkable property. If $\mathbf{x}$ represents Monday's demand and $\mathbf{y}$ represents Tuesday's demand, then the cost on Wednesday (when the demand is $\alpha \mathbf{x} + \mathbf{y}$) equals [▶ W5_L3 @ 17:18](https://www.youtube.com/watch?v=MvCkhmYhTkw&t=1038)

$$C(\alpha \mathbf{x} + \mathbf{y}) = \alpha\, C(\mathbf{x}) + C(\mathbf{y}).$$

In other words, you can compute the cost for a combined order either by:
1. **First combining** the demand vectors, then evaluating the cost function, or
2. **First evaluating** the cost function on each demand separately, then combining the results.

Both methods give the same answer. This is **linearity**.

### Definition of a Linear Mapping

A **linear mapping** $f : \mathbb{R}^n \to \mathbb{R}^m$ is a function of the form [▶ W5_L4 @ 13:42](https://www.youtube.com/watch?v=aRNE_GrR0Yk&t=822)

$$f(x_1, x_2, \dots, x_n) = \left(\sum_{j=1}^n a_{1j} x_j,\; \sum_{j=1}^n a_{2j} x_j,\; \dots,\; \sum_{j=1}^n a_{mj} x_j\right)$$

where the $a_{ij}$ are fixed real numbers. Equivalently, $f(\mathbf{x}) = A\mathbf{x}$ where $A \in \mathbb{R}^{m \times n}$ has $(i,j)$-entry $a_{ij}$.

Every linear mapping can be represented by matrix multiplication, and every matrix multiplication defines a linear mapping.

> **Clarification:** Not every function is linear. Functions such as $f(x) = x^2$, $f(x) = \log x$, or $f(x) = e^x$ are **not** linear mappings.

---

## 7. Linear Transformations

### Definition

A **linear transformation** is a function $f: V \to W$ between vector spaces $V$ and $W$ satisfying the following two conditions for all $\mathbf{v}_1, \mathbf{v}_2 \in V$ and all $c \in \mathbb{R}$: [▶ W5_L5 @ 02:01](https://www.youtube.com/watch?v=6jA-RRGbmOw&t=121)

1. **Preservation of addition:** $f(\mathbf{v}_1 + \mathbf{v}_2) = f(\mathbf{v}_1) + f(\mathbf{v}_2)$
2. **Preservation of scalar multiplication:** $f(c\,\mathbf{v}_1) = c\,f(\mathbf{v}_1)$

These two conditions are equivalent to the single **linearity condition**:

$$f(\mathbf{v}_1 + c\,\mathbf{v}_2) = f(\mathbf{v}_1) + c\,f(\mathbf{v}_2).$$

**Proof of equivalence:**
- **(Two conditions $\Rightarrow$ single condition):** Given $\mathbf{v}_1 + c\,\mathbf{v}_2$, first use condition 1 to split the sum, then use condition 2 to pull out the scalar $c$.
- **(Single condition $\Rightarrow$ two conditions):** Set $c = 1$ to recover condition 1. Set $\mathbf{v}_1 = \mathbf{0}$ and rename $\mathbf{v}_2$ as $\mathbf{v}_1$ to recover condition 2.

More generally, linearity extends to arbitrary finite linear combinations:

$$f\!\left(\sum_{i=1}^k c_i \mathbf{v}_i\right) = \sum_{i=1}^k c_i\, f(\mathbf{v}_i).$$

### Relationship to Linear Mappings

Every **linear mapping** $f : \mathbb{R}^n \to \mathbb{R}^m$ (defined by $f(\mathbf{x}) = A\mathbf{x}$) is a linear transformation, because matrix multiplication distributes over addition and commutes with scalar multiplication. The concept of linear transformation is more general: it applies to **any** vector spaces $V$ and $W$, not just $\mathbb{R}^n$ and $\mathbb{R}^m$.

### Important Properties

If $f: V \to W$ is a linear transformation, then:

1. **$f$ maps zero to zero:** $f(\mathbf{0}_V) = \mathbf{0}_W$.

   *Proof:* $f(\mathbf{0}) = f(\mathbf{0} + \mathbf{0}) = f(\mathbf{0}) + f(\mathbf{0})$. Subtracting $f(\mathbf{0})$ from both sides gives $\mathbf{0}_W = f(\mathbf{0})$.

2. **$f$ preserves negatives:** $f(-\mathbf{v}) = -f(\mathbf{v})$.

   *Proof:* $\mathbf{0}_W = f(\mathbf{0}_V) = f(\mathbf{v} + (-\mathbf{v})) = f(\mathbf{v}) + f(-\mathbf{v})$. Therefore $f(-\mathbf{v}) = -f(\mathbf{v})$.

### Examples of Linear Transformations

All of the following are linear transformations (they are linear mappings): [▶ W5_L5 @ 04:36](https://www.youtube.com/watch?v=6jA-RRGbmOw&t=276)

| Function | Domain → Codomain | Matrix representation |
|----------|--------------------|-----------------------|
| $f(x,y) = (2x,\, y)$ | $\mathbb{R}^2 \to \mathbb{R}^2$ | $\begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}$ |
| $f(x,y) = (2x,\, 0)$ | $\mathbb{R}^2 \to \mathbb{R}^2$ | $\begin{bmatrix} 2 & 0 \\ 0 & 0 \end{bmatrix}$ |
| $f(x,y,z) = \bigl(\tfrac{x}{2},\, 3y,\, 5z\bigr)$ | $\mathbb{R}^3 \to \mathbb{R}^3$ | $\begin{bmatrix} 1/2 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 5 \end{bmatrix}$ |
| $f(t) = \bigl(t,\, 3t,\, \tfrac{23}{89}t\bigr)$ | $\mathbb{R} \to \mathbb{R}^3$ | $\begin{bmatrix} 1 \\ 3 \\ 23/89 \end{bmatrix}$ |
| $f(x,y) = x$ (projection) | $\mathbb{R}^2 \to \mathbb{R}$ | $\begin{bmatrix} 1 & 0 \end{bmatrix}$ |

### Non-Examples

- $f(x) = x^2$ — fails additivity: $f(1+1) = 4 \neq 2 = f(1) + f(1)$.
- $f(x) = e^x$ — fails additivity: $e^{x+y} \neq e^x + e^y$ in general.
- $f(x) = \log x$ — fails scalar multiplication: $\log(cx) = \log c + \log x \neq c \log x$ in general.

---

## 8. Injectivity, Surjectivity, and Isomorphisms

### One-to-One (Injective) Linear Transformations

A function $f: V \to W$ is **one-to-one (injective)** if $f(\mathbf{v}_1) = f(\mathbf{v}_2)$ implies $\mathbf{v}_1 = \mathbf{v}_2$.

For linear transformations, injectivity has a simpler characterisation: [▶ W5_L5 @ 07:30](https://www.youtube.com/watch?v=6jA-RRGbmOw&t=450)

$$f \text{ is injective} \quad \Longleftrightarrow \quad \bigl[f(\mathbf{v}) = \mathbf{0} \implies \mathbf{v} = \mathbf{0}\bigr].$$

In other words, **$f$ is injective if and only if its null space is trivial** (contains only the zero vector).

**Proof sketch:**

($\Rightarrow$) Assume $f$ is injective. Since $f(\mathbf{0}) = \mathbf{0}$ (property of linear transformations), if $f(\mathbf{v}) = \mathbf{0} = f(\mathbf{0})$, then injectivity forces $\mathbf{v} = \mathbf{0}$.

($\Leftarrow$) Assume $f(\mathbf{v}) = \mathbf{0}$ implies $\mathbf{v} = \mathbf{0}$. Suppose $f(\mathbf{v}_1) = f(\mathbf{v}_2)$. Then $f(\mathbf{v}_1) - f(\mathbf{v}_2) = \mathbf{0}$, so $f(\mathbf{v}_1 - \mathbf{v}_2) = \mathbf{0}$ by linearity, which forces $\mathbf{v}_1 - \mathbf{v}_2 = \mathbf{0}$, i.e., $\mathbf{v}_1 = \mathbf{v}_2$.

> **Clarification:** This simplification is only valid for **linear** transformations, not for arbitrary functions.

### Onto (Surjective) Linear Transformations

A function $f: V \to W$ is **onto (surjective)** if for every $\mathbf{w} \in W$, there exists $\mathbf{v} \in V$ such that $f(\math