# MATRIX EQUIVALENCE, SIMILARITY AND AFFINE MAPS

This file covers three interconnected topics. First, we study **matrix equivalence**, which captures when two matrices represent the same linear transformation under different choices of bases for the domain and codomain. Second, we study **matrix similarity**, the important special case for square matrices where the same basis change is applied on both sides — this preserves deep algebraic invariants such as the determinant, trace, and eigenvalues. Third, we introduce **affine subspaces** and **affine mappings**, which generalise vector subspaces and linear transformations by allowing translations. The central application is that the solution set of any consistent system $Ax = b$ (even when $b \neq 0$) is an affine subspace. These ideas build on the foundations in [[1 - MATRICES]], [[5 - VECTORS AND SPACES]], and [[9 - TRANSFORMATIONS]].

---

## 1. Equivalence Relations — A Brief Review

Before defining equivalence and similarity of matrices, we recall the abstract notion that underlies both.

**Definition.** A relation $\sim$ on a set $S$ is an **equivalence relation** if it satisfies three properties:

| Property | Statement | Meaning |
|---|---|---|
| **Reflexivity** | $a \sim a$ for all $a \in S$ | Every element is related to itself |
| **Symmetry** | $a \sim b \implies b \sim a$ | The relation is mutual |
| **Transitivity** | $a \sim b$ and $b \sim c \implies a \sim c$ | The relation chains |

An equivalence relation partitions $S$ into disjoint **equivalence classes**: the class of $a$ is $[a] = \{b \in S : a \sim b\}$. Two elements share a class precisely when they are related.

> **Clarification:** Both "equivalence of matrices" (Section 2) and "similarity of matrices" (Section 3) are equivalence relations on appropriate sets of matrices. They partition those sets into classes of matrices that share common properties (invariants).

---

## 2. Matrix Equivalence

### Definition

Let $A$ and $B$ be $m \times n$ matrices (both of the same size). We say $A$ is **equivalent** to $B$, written $A \sim B$, if there exist invertible matrices $Q \in \mathbb{R}^{m \times m}$ and $P \in \mathbb{R}^{n \times n}$ such that

$$B = QAP.$$

[▶ W7_L1 @ 00:31](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=31)

Here $P$ is invertible and $n \times n$ (it acts on the right, matching the number of columns of $A$), and $Q$ is invertible and $m \times m$ (it acts on the left, matching the number of rows of $A$).

### Interpretation via Row and Column Operations

Recall from [[1 - MATRICES]] that left-multiplying by an invertible matrix corresponds to a sequence of elementary row operations, and right-multiplying by an invertible matrix corresponds to a sequence of elementary column operations. Therefore:

> $A$ is equivalent to $B$ if and only if $B$ can be obtained from $A$ by a finite sequence of elementary row operations followed by a finite sequence of elementary column operations (or vice versa).

### Equivalence of Matrices Is an Equivalence Relation

[▶ W7_L1 @ 03:54](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=234)

**Theorem.** Matrix equivalence is an equivalence relation on $\mathbb{R}^{m \times n}$.

**Proof sketch.**

1. **Reflexivity.** $A = I_m \, A \, I_n$, and both identity matrices are invertible. Hence $A \sim A$.

2. **Symmetry.** If $A \sim B$, then $B = QAP$ for invertible $Q, P$. Then
$$A = Q^{-1} B \, P^{-1},$$
and $Q^{-1}, P^{-1}$ are invertible, so $B \sim A$.

3. **Transitivity.** If $B = QAP$ and $C = Q'BP'$, then
$$C = Q'(QAP)P' = (Q'Q)\,A\,(PP').$$
Since products of invertible matrices are invertible, $A \sim C$.

### Characterisation by Rank

**Theorem.** Two $m \times n$ matrices $A$ and $B$ are equivalent if and only if $\text{rank}(A) = \text{rank}(B)$.

**Proof sketch ($\Leftarrow$).** If $\text{rank}(A) = r$, then by performing row and column operations we can reduce $A$ to the **canonical form**

$$D_r = \begin{bmatrix} I_r & 0 \\ 0 & 0 \end{bmatrix} \in \mathbb{R}^{m \times n},$$

where $I_r$ is the $r \times r$ identity. The same is true for $B$ if $\text{rank}(B) = r$. So both $A$ and $B$ are equivalent to $D_r$, and by transitivity, $A \sim B$.

**Proof sketch ($\Rightarrow$).** If $B = QAP$ with $Q, P$ invertible, then multiplication by invertible matrices preserves rank (see [[1 - MATRICES]]), so $\text{rank}(B) = \text{rank}(A)$.

> **Clarification:** The canonical form $D_r$ is the unique "simplest representative" of each equivalence class. Every $m \times n$ matrix of rank $r$ is equivalent to $D_r$.

### Connection to Linear Transformations and Change of Basis

Let $T: V \to W$ be a linear transformation between finite-dimensional vector spaces. Suppose $V$ has two ordered bases $\beta_1, \beta_2$ and $W$ has two ordered bases $\gamma_1, \gamma_2$ (see [[9 - TRANSFORMATIONS]] for matrix representations). Let

$$A = [T]_{\beta_1}^{\gamma_1}, \qquad B = [T]_{\beta_2}^{\gamma_2}$$

be the matrix representations of $T$ with respect to these pairs of bases. Then $A$ and $B$ are equivalent:

$$B = QAP$$

[▶ W7_L1 @ 06:42](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=402)

where:

- **$P$** is the **change-of-basis matrix** obtained by expressing each vector of $\beta_2$ as a linear combination of vectors from $\beta_1$. The coefficients of the $j$-th vector of $\beta_2$ form the $j$-th column of $P$.
- **$Q$** is the matrix obtained by expressing each vector of $\gamma_1$ as a linear combination of vectors from $\gamma_2$. The coefficients of the $j$-th vector of $\gamma_1$ form the $j$-th column of $Q$.

### Worked Example: Equivalence via Change of Basis

[▶ W7_L1 @ 07:52](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=472)

**Example.** Let $T: \mathbb{R}^3 \to \mathbb{R}^2$ be defined by $T(x,y,z) = (x+y,\; y+z)$.

Consider the ordered bases:

- $\beta_1 = \{e_1, e_2, e_3\}$ (standard basis of $\mathbb{R}^3$), $\quad \gamma_1 = \{e_1, e_2\}$ (standard basis of $\mathbb{R}^2$).
- $\beta_2 = \{(1,1,0),\; (0,1,1),\; (0,0,1)\}$, $\quad \gamma_2 = \{(1,0),\; (1,1)\}$.

**Solution.**

**Step 1: Matrix $A = [T]_{\beta_1}^{\gamma_1}$ (standard bases).**

$$T(1,0,0) = (1,0), \quad T(0,1,0) = (1,1), \quad T(0,0,1) = (0,1).$$

Writing these as coordinate vectors with respect to $\gamma_1$ (which is the standard basis, so coordinates are the vectors themselves):

$$A = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \end{bmatrix}.$$

**Step 2: Matrix $B = [T]_{\beta_2}^{\gamma_2}$.**

$$T(1,1,0) = (2,1) = 1 \cdot (1,0) + 1 \cdot (1,1)$$
$$T(0,1,1) = (1,2) = -1 \cdot (1,0) + 2 \cdot (1,1)$$
$$T(0,0,1) = (0,1) = -1 \cdot (1,0) + 1 \cdot (1,1)$$

$$B = \begin{bmatrix} 1 & -1 & -1 \\ 1 & 2 & 1 \end{bmatrix}.$$

**Step 3: Construct $P$ and $Q$.**

For $P$: express $\beta_2$ in terms of $\beta_1$ (standard basis). Since $\beta_1$ is standard, the coordinates are just the vectors themselves:

$$P = \begin{bmatrix} 1 & 0 & 0 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{bmatrix}.$$

For $Q$: express $\gamma_1$ in terms of $\gamma_2$. We need $(1,0)$ and $(0,1)$ in terms of $\{(1,0), (1,1)\}$:

$$(1,0) = 1 \cdot (1,0) + 0 \cdot (1,1), \qquad (0,1) = -1 \cdot (1,0) + 1 \cdot (1,1).$$

$$Q = \begin{bmatrix} 1 & -1 \\ 0 & 1 \end{bmatrix}.$$

**Step 4: Verify $B = QAP$.**

First compute $QA$:

$$QA = \begin{bmatrix} 1 & -1 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & 1 \end{bmatrix}.$$

Then compute $(QA)P$:

$$(QA)P = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{bmatrix} = \begin{bmatrix} 1 & -1 & -1 \\ 1 & 2 & 1 \end{bmatrix} = B. \checkmark$$

---

## 3. Matrix Similarity

### Definition

Let $A$ and $B$ be $n \times n$ (square) matrices. We say $A$ is **similar** to $B$, written $A \sim B$, if there exists an invertible matrix $P \in \mathbb{R}^{n \times n}$ such that

$$B = P^{-1}AP.$$

[▶ W7_L1 @ 16:36](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=996)

> **Clarification:** Similarity is a special case of equivalence where both $Q$ and $P$ appear, but now $Q = P^{-1}$. This single constraint ($Q = P^{-1}$) is what makes similarity much more restrictive — and much more useful — than general equivalence.

### Similarity Is an Equivalence Relation

[▶ W7_L1 @ 17:16](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=1036)

**Theorem.** Matrix similarity is an equivalence relation on $\mathbb{R}^{n \times n}$.

**Proof.**

1. **Reflexivity.** $A = I^{-1}AI$. Take $P = I$.

2. **Symmetry.** If $B = P^{-1}AP$, then multiplying on the left by $P$ and on the right by $P^{-1}$:
$$PBP^{-1} = A, \quad \text{i.e.} \quad A = (P^{-1})^{-1} B (P^{-1}).$$
Setting $P' = P^{-1}$ (which is invertible), we get $A = P'^{-1}BP'$, so $B \sim A$.

3. **Transitivity.** If $B = P^{-1}AP$ and $C = Q^{-1}BQ$, then
$$C = Q^{-1}(P^{-1}AP)Q = (PQ)^{-1} A (PQ).$$
Setting $R = PQ$ (invertible), we get $C = R^{-1}AR$, so $A \sim C$.

Since similarity is an equivalence relation, we may simply say "$A$ and $B$ are **similar matrices**" without specifying direction.

### Invariants of Similar Matrices

[▶ W7_L1 @ 20:18](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=1218)

If $A$ and $B$ are similar, then they share many important properties:

| Invariant | Why it is preserved |
|---|---|
| **Equivalence** | Similarity implies equivalence (take $Q = P^{-1}$) |
| **Rank** | Follows from equivalence |
| **Determinant** | $\det(B) = \det(P^{-1}AP) = \det(P^{-1})\det(A)\det(P) = \frac{1}{\det(P)}\det(A)\det(P) = \det(A)$ |
| **Trace** | $\text{tr}(B) = \text{tr}(P^{-1}AP) = \text{tr}(A P P^{-1}) = \text{tr}(A)$ (using the cyclic property of trace) |
| **Characteristic polynomial** | $\det(B - \lambda I) = \det(P^{-1}AP - \lambda I) = \det(P^{-1}(A-\lambda I)P) = \det(A - \lambda I)$ |
| **Eigenvalues** | Roots of the characteristic polynomial, hence preserved |
| **Minimal polynomial** | Preserved (proof requires more machinery) |

> **Clarification:** Two equivalent matrices need only share the same rank. Similar matrices share *all* the invariants listed above. This is why similarity is the much more important notion for square matrices.

### Connection to Linear Transformations: Same Space, Different Bases

Let $T: V \to V$ be a linear transformation from a vector space to **itself**. Let $\beta$ and $\gamma$ be two ordered bases for $V$, and let

$$A = [T]_\beta, \qquad B = [T]_\gamma$$

be the matrix representations (note: when domain and codomain are the same space, the same basis is used on both sides). Then $A$ and $B$ are **similar**:

$$B = P^{-1}AP$$

[▶ W7_L1 @ 30:57](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=1857)

where:

- **$P$** is the **change-of-basis matrix from $\beta$ to $\gamma$**: express each vector of $\gamma$ as a linear combination of vectors from $\beta$; the coefficients form the columns of $P$.
- **$P^{-1}$** is the change-of-basis matrix from $\gamma$ to $\beta$: express each vector of $\beta$ in terms of $\gamma$.

> **Clarification:** For equivalence (Section 2), we had *two independent* invertible matrices $P$ and $Q$ because the domain and codomain could have different bases. For similarity, domain and codomain are the same space $V$, so there is only *one* change of basis — hence only one matrix $P$ appears (and $Q = P^{-1}$).

### Worked Example 1: Diagonalisation in $\mathbb{R}^3$

[▶ W7_L1 @ 22:51](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=1371)

**Example.** Let $T: \mathbb{R}^3 \to \mathbb{R}^3$ be defined by

$$T(x,y,z) = (-x+y+z,\; x-y+z,\; x+y-z).$$

**Solution.**

**Step 1: Matrix $A = [T]_\beta$ with $\beta = \{e_1,e_2,e_3\}$ (standard basis).**

$$T(1,0,0) = (-1,1,1), \quad T(0,1,0) = (1,-1,1), \quad T(0,0,1) = (1,1,-1).$$

$$A = \begin{bmatrix} -1 & 1 & 1 \\ 1 & -1 & 1 \\ 1 & 1 & -1 \end{bmatrix}.$$

**Step 2: Find a basis $\beta'$ under which $T$ acts by scaling.**

Consider $\beta' = \{(1,1,1),\; (-1,1,0),\; (-1,0,1)\}$. Compute:

$$T(1,1,1) = (-1+1+1,\; 1-1+1,\; 1+1-1) = (1,1,1) = 1 \cdot (1,1,1).$$

$$T(-1,1,0) = (1+1+0,\; -1-1+0,\; -1+1-0) = (2,-2,0) = -2 \cdot (-1,1,0).$$

$$T(-1,0,1) = (1+0+1,\; -1-0+1,\; -1+0-1) = (2,0,-2) = -2 \cdot (-1,0,1).$$

Each basis vector is mapped to a scalar multiple of itself! Therefore, the matrix with respect to $\beta'$ is diagonal:

$$B = [T]_{\beta'} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & -2 & 0 \\ 0 & 0 & -2 \end{bmatrix}.$$

**Step 3: Construct $P$ and verify $B = P^{-1}AP$.**

$P$ is formed by expressing $\beta'$ in terms of $\beta$ (the standard basis), so the columns are just the vectors of $\beta'$:

$$P = \begin{bmatrix} 1 & -1 & -1 \\ 1 & 1 & 0 \\ 1 & 0 & 1 \end{bmatrix}.$$

Computing $P^{-1}$ (e.g. by row reduction of $[P \mid I]$):

$$P^{-1} = \frac{1}{3}\begin{bmatrix} 1 & 1 & 1 \\ -1 & 2 & -1 \\ -1 & -1 & 2 \end{bmatrix}.$$

One can verify by direct multiplication that

$$P^{-1}AP = \frac{1}{3}\begin{bmatrix} 1 & 1 & 1 \\ -1 & 2 & -1 \\ -1 & -1 & 2 \end{bmatrix} \begin{bmatrix} -1 & 1 & 1 \\ 1 & -1 & 1 \\ 1 & 1 & -1 \end{bmatrix} \begin{bmatrix} 1 & -1 & -1 \\ 1 & 1 & 0 \\ 1 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & -2 & 0 \\ 0 & 0 & -2 \end{bmatrix} = B. \checkmark$$

Hence $A$ and $B$ are similar. The scalars $1, -2, -2$ on the diagonal of $B$ are the **eigenvalues** of $T$ (and of $A$); they will be studied in depth in a later course. Deeper treatment of eigenvalues appears in courses on spectral theory and data science applications.

### Worked Example 2: A $2 \times 2$ Case

[▶ W7_L1 @ 29:03](https://www.youtube.com/watch?v=ORWbVJ54hW8&t=1743)

**Example.** Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be defined by $T(x,y) = (2x, y)$.

**Solution.**

With $\beta = \{(1,0),\; (1,1)\}$ (non-standard basis):

$$T(1,0) = (2,0) = 2 \cdot (1,0) + 0 \cdot (1,1)$$
$$T(1,1) = (2,1) = 1 \cdot (1,0) + 1 \cdot (1,1)$$

$$A = [T]_\beta = \begin{bmatrix} 2 & 1 \\ 0 & 1 \end{bmatrix}.$$

With $\beta' = \{e_1, e_2\}$ (standard basis):

$$T(1,0) = (2,0), \quad T(0,1) = (0,1).$$

$$B = [T]_{\beta'} = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}.$$

The change-of-basis matrix (expressing $\beta'$ in terms of $\beta$, i.e. expressing each standard basis vector as a combination of $\beta$):

$$P = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}, \qquad P^{-1} = \begin{bmatrix} 1 & -1 \\ 0 & 1 \end{bmatrix}.$$

**Verification:**

$$P^{-1}AP = \begin{bmatrix} 1 & -1 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 2 & 1 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix} = B. \checkmark$$

### Why Similarity Matters

The key motivation for studying similarity is **diagonalisation**: given a matrix $A$, we seek a basis $\beta'$ such that $[T]_{\beta'} = P^{-1}AP$ is diagonal. A diagonal matrix reveals the geometric action of the transformation — it simply scales along each basis direction. This is the foundation for eigenvalue decomposition, principal component analysis, and many other applications in data science.

### Summary Table: Equivalence vs. Similarity

| | **Matrix Equivalence** | **Matrix Similarity** |
|---|---|---|
| **Applies to** | $m \times n$ matrices | $n \times n$ (square) matrices |
| **Relation** | $B = QAP$, with $Q \in \mathrm{GL}_m$, $P \in \mathrm{GL}_n$ | $B = P^{-1}AP$, with $P \in \mathrm{GL}_n$ |
| **Comes from** | Changing bases independently in domain and codomain | Changing basis in a single space (same basis both sides) |
| **Canonical form** | $D_r = \begin{bmatrix} I_r & 0 \\ 0 & 0 \end{bmatrix}$ | Diagonal matrix (when diagonalisable) |
| **Key invariant** | Rank | Rank, determinant, trace, eigenvalues, characteristic polynomial |
| **Equivalence relation?** | Yes | Yes |

---

## 4. Affine Subspaces

### Definition

[▶ W7_L2 @ 01:11](https://www.youtube.com/watch?v=RUJInY6skG0&t=71)

Let $V$ be a vector space. An **affine subspace** of $V$ is a subset $L \subseteq V$ of the form

$$L = v + U = \{v + u : u \in U\}$$

where $v \in V$ is a fixed vector and $U$ is a vector subspace of $V$.

We call $v$ a **support point** (or **translation vector**) and $U$ the **direction subspace** of $L$.

Geometrically, $L$ is obtained by taking the subspace $U$ (which passes through the origin) and **translating** it so that it passes through the point $v$.

> **Clarification:** An affine subspace is generally **not** a vector subspace — it need not contain the zero vector. However, every vector subspace *is* an affine subspace (take $v = 0$).

### Dimension of an Affine Subspace

An affine subspace $L = v + U$ is said to be **$k$-dimensional** if $\dim(U) = k$. [▶ W7_L2 @ 02:20](https://www.youtube.com/watch?v=RUJInY6skG0&t=140)

### Uniqueness of the Direction Subspace

**Theorem.** The direction subspace $U$ of an affine subspace $L$ is unique: if $L = v + U = v' + U'$, then $U = U'$.

[▶ W7_L2 @ 02:30](https://www.youtube.com/watch?v=RUJInY6skG0&t=150)

**Proof sketch.** Since $v' \in L = v + U$, we can write $v' = v + u_1$ for some $u_1 \in U$, so $v' - v = u_1 \in U$. Similarly, since $v \in L = v' + U'$, we get $v - v' \in U'$, hence $v' - v \in U'$ as well.

Now take any $u \in U$. Then $v + u \in L = v' + U'$, so $v + u = v' + u'$ for some $u' \in U'$. This gives $u = (v' - v) + u'$. Since $v' - v \in U'$ and $u' \in U'$, and $U'$ is a subspace, we get $u \in U'$. Hence $U \subseteq U'$. By the symmetric argument, $U' \subseteq U$, so $U = U'$. $\square$

> **Clarification:** While $U$ is unique, the translation vector $v$ is **not** unique. Any $v' \in L$ can serve as a translation vector: if $v' = v + u_0$ with $u_0 \in U$, then $L = v' + U$ as well.

### Affine Subspaces in $\mathbb{R}^2$

[▶ W7_L2 @ 10:23](https://www.youtube.com/watch?v=RUJInY6skG0&t=623)

| Type | Dimension | $U$ | $L = v + U$ |
|---|---|---|---|
| **Point** | 0 | $\{(0,0)\}$ | $\{v\}$ for any $v \in \mathbb{R}^2$ |
| **Line** | 1 | A line through the origin | A line (possibly not through the origin) |
| **Plane** | 2 | $\mathbb{R}^2$ | $\mathbb{R}^2$ |

**Example (Line).** The line $y = mx + c$ is an affine subspace:

$$L = (0, c) + \{(t, mt) : t \in \mathbb{R}\} = (0, c) + \text{span}\{(1, m)\}.$$

Here $v = (0,c)$ and $U = \text{span}\{(1,m)\}$ is the line through the origin with slope $m$.

**Non-example.** The parabola $y = x^2 + 1$ is **not** an affine subspace — it is not a translate of any vector subspace (it is curved, not flat).

### Affine Subspaces in $\mathbb{R}^3$

[▶ W7_L2 @ 14:49](https://www.youtube.com/watch?v=RUJInY6skG0&t=889)

| Type | Dimension | $U$ | $L = v + U$ |
|---|---|---|---|
| **Point** | 0 | $\{0\}$ | $\{v\}$ |
| **Line** | 1 | $\text{span}\{v_1\}$ | $v + \{\lambda v_1 : \lambda \in \mathbb{R}\}$ |
| **Plane** | 2 | $\text{span}\{v_1, v_2\}$ | $v + \{\lambda_1 v_1 + \lambda_2 v_2 : \lambda_1, \lambda_2 \in \mathbb{R}\}$ |
| **Entire space** | 3 | $\mathbb{R}^3$ | $\mathbb{R}^3$ |

**Parametric description of a 2-dimensional affine subspace (plane) in $\mathbb{R}^3$:**

$$L = \{v + \lambda_1 v_1 + \lambda_2 v_2 : \lambda_1, \lambda_2 \in \mathbb{R}\}$$

where $v \in \mathbb{R}^3$ is a point on the plane and $v_1, v_2$ are linearly independent direction vectors.

### General Parametric Form

In $\mathbb{R}^n$, a $k$-dimensional affine subspace can be written as:

$$L = \{v + \lambda_1 v_1 + \lambda_2 v_2 + \cdots + \lambda_k v_k : \lambda_1, \ldots, \lambda_k \in \mathbb{R}\}$$

where $\{v_1, \ldots, v_k\}$ is a basis for the direction subspace $U$.

---

## 5. Solution Sets as Affine Subspaces

This is the most important application of affine subspaces in the course.

[▶ W7_L2 @ 17:16](https://www.