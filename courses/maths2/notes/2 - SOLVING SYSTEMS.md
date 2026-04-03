# SOLVING SYSTEMS OF LINEAR EQUATIONS

This file covers the central problem of linear algebra: solving systems of linear equations. We develop the theory from first definitions through to a complete algorithmic method — **Gaussian elimination** — that can determine all solutions of any linear system. Along the way we introduce the **augmented matrix**, **elementary row operations**, **row echelon form (REF)**, **reduced row echelon form (RREF)**, **free and dependent variables**, and **parametric descriptions** of solution sets. The matrix concepts used here build on [[1 - MATRICES]].

---

## 1. Linear Equations and Systems

### What Is a Linear Equation?

A **linear equation** in the unknowns (variables) $x_1, x_2, \dots, x_n$ is an equation of the form [▶ W1_L3 @ 06:50](https://www.youtube.com/watch?v=WzR4NKeLHMY&t=410)

$$a_1 x_1 + a_2 x_2 + \cdots + a_n x_n = b$$

where $a_1, a_2, \dots, a_n$ are real numbers called the **coefficients**, and $b$ is a real number called the **constant** (or right-hand side). The variables $x_1, \dots, x_n$ are the quantities we wish to determine.

**Example:** The equation $2x + 3y + 5z = -9$ is a linear equation in three unknowns $x, y, z$ with coefficients $2, 3, 5$ and constant $-9$.

> **Clarification:** A linear equation has no products of variables (like $xy$), no powers (like $x^2$), and no functions of variables (like $\sin x$). Every variable appears to the first power, multiplied by a constant.

### What Is a System of Linear Equations?

A **system of linear equations** (or **linear system**) is a collection of one or more linear equations in the same set of unknowns $x_1, x_2, \dots, x_n$. [▶ W1_L3 @ 07:55](https://www.youtube.com/watch?v=WzR4NKeLHMY&t=475) A general system of $m$ equations in $n$ unknowns is written:

$$\begin{cases} a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\ a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\ \quad\vdots \\ a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m \end{cases}$$

Here the coefficient $a_{ij}$ sits in the $i$-th equation multiplying the $j$-th unknown.

### A Solution and the Solution Set

A **solution** of a linear system is an assignment of values to the unknowns $x_1 = s_1,\; x_2 = s_2,\; \dots,\; x_n = s_n$ that simultaneously satisfies every equation in the system. The **solution set** is the collection of all such solutions.

**Example:** Consider the system

$$\begin{cases} 3x + 2y + z = 6 \\ x - \tfrac{1}{2}y + \tfrac{2}{3}z = \tfrac{7}{6} \\ 4x + 6y - 10z = 0 \end{cases}$$

The assignment $x = 1,\; y = 1,\; z = 1$ is a solution because:

- $3(1) + 2(1) + 1 = 6$ ✓
- $1 - \tfrac{1}{2}(1) + \tfrac{2}{3}(1) = 1 - \tfrac{1}{2} + \tfrac{2}{3} = \tfrac{6 - 3 + 4}{6} = \tfrac{7}{6}$ ✓
- $4(1) + 6(1) - 10(1) = 0$ ✓

### Naming Conventions for Variables

| Number of unknowns | Typical names |
|---|---|
| 1 | $x$ |
| 2 | $x,\, y$ |
| 3 | $x,\, y,\, z$ |
| 4 or more | $x_1, x_2, x_3, \dots, x_n$ |

---

## 2. Matrix Representation of Linear Systems

### The Coefficient Matrix, Variable Vector, and Constant Vector

Any linear system can be written in the compact matrix form [▶ W1_L3 @ 11:49](https://www.youtube.com/watch?v=WzR4NKeLHMY&t=709)

$$Ax = b$$

where:

- $A \in \mathbb{R}^{m \times n}$ is the **coefficient matrix** whose $(i,j)$-entry is $a_{ij}$,
- $x \in \mathbb{R}^{n \times 1}$ is the **variable (column) vector** $\begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}$,
- $b \in \mathbb{R}^{m \times 1}$ is the **constant (column) vector** $\begin{bmatrix} b_1 \\ b_2 \\ \vdots \\ b_m \end{bmatrix}$.

The product $Ax$ is well-defined because $A$ is $m \times n$ and $x$ is $n \times 1$, yielding an $m \times 1$ vector. See [[1 - MATRICES]] for the definition of matrix multiplication.

**Example:** The system

$$\begin{cases} 8x + 8y + 4z = 1960 \\ 12x + 5y + 7z = 2215 \\ 3x + 2y + 5z = 1135 \end{cases}$$

has the matrix form $Ax = b$ with

$$A = \begin{bmatrix} 8 & 8 & 4 \\ 12 & 5 & 7 \\ 3 & 2 & 5 \end{bmatrix}, \qquad x = \begin{bmatrix} x \\ y \\ z \end{bmatrix}, \qquad b = \begin{bmatrix} 1960 \\ 2215 \\ 1135 \end{bmatrix}$$

> **Clarification:** There is an unfortunate clash of notation: the letter $x$ is used both for the column vector of unknowns and sometimes for the first scalar variable. Context makes the meaning clear — the bold or column-vector $x$ is the entire vector, while the scalar $x$ (or $x_1$) is its first entry.

### The Augmented Matrix

The **augmented matrix** of the system $Ax = b$ is the $m \times (n+1)$ matrix formed by appending $b$ as an extra column to $A$: [▶ W2_L6 @ 05:44](https://www.youtube.com/watch?v=gdk1_aEe7j4&t=344)

$$[A \mid b] = \left[\begin{array}{cccc|c} a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\ a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\ \vdots & \vdots & \ddots & \vdots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} & b_m \end{array}\right]$$

The vertical line is a visual reminder that the last column holds the constants; it is not a mathematical operator.

**Example:** For the system $3x_1 + 2x_2 + x_3 + x_4 = 6$, $x_1 + x_2 = 2$, $7x_2 + x_3 + x_4 = 8$, the augmented matrix is

$$\left[\begin{array}{cccc|c} 3 & 2 & 1 & 1 & 6 \\ 1 & 1 & 0 & 0 & 2 \\ 0 & 7 & 1 & 1 & 8 \end{array}\right]$$

---

## 3. How Many Solutions Can a Linear System Have?

A fundamental theorem states that every system of linear equations has **exactly one of three possible outcomes**: [▶ W1_L3 @ 18:22](https://www.youtube.com/watch?v=WzR4NKeLHMY&t=1102)

| Outcome | Description |
|---|---|
| **No solution** | The system is **inconsistent**; no assignment of values satisfies all equations simultaneously. |
| **Exactly one solution** | The system is **consistent** with a **unique** solution. |
| **Infinitely many solutions** | The system is **consistent** with a family of solutions depending on one or more free parameters. |

There is no other possibility. In particular, a linear system **cannot** have exactly 2, 3, or any other finite number of solutions greater than 1.

### Geometric Intuition (Two Equations in Two Unknowns)

Each linear equation in two unknowns represents a straight line in the $xy$-plane. Two lines can relate in exactly three ways:

1. **Intersecting lines** → one unique solution (the point of intersection).
2. **Parallel lines** → no solution (the lines never meet).
3. **Coincident lines** (the same line) → infinitely many solutions (every point on the line).

**Example (Infinitely many solutions):**

$$\begin{cases} 2x + y = 215 \\ 4x + 2y = 430 \end{cases}$$

The second equation is exactly twice the first, so both represent the same line. Every point $(x, y)$ with $y = 215 - 2x$ is a solution — for instance $(0, 215)$ and $(107.5, 0)$.

**Example (No solution):**

$$\begin{cases} 2x + y = 215 \\ 4x + 2y = 400 \end{cases}$$

Doubling the first equation gives $4x + 2y = 430$, which contradicts $4x + 2y = 400$. The lines are parallel, and the system is inconsistent.

**Example (Unique solution):**

$$\begin{cases} 2x + y = 215 \\ 3x + y = 260 \end{cases}$$

Subtracting the first from the second gives $x = 45$, whence $y = 125$. The two lines intersect at the single point $(45, 125)$.

---

## 4. Elementary Row Operations

**Elementary row operations (EROs)** are the tools that transform a matrix into echelon form without changing the solution set of the corresponding system. There are three types: [▶ W2_L5 @ 01:22](https://www.youtube.com/watch?v=ECRhKDTUxM8&t=82)

| Type | Operation | Notation | Effect on Determinant |
|---|---|---|---|
| **Type 1** — Row swap | Interchange rows $i$ and $j$ | $R_i \leftrightarrow R_j$ | $\det$ changes sign |
| **Type 2** — Scalar multiply | Multiply row $i$ by nonzero scalar $t$ | $R_i \to t\,R_i$ | $\det$ is multiplied by $t$ |
| **Type 3** — Row replacement | Add $t$ times row $j$ to row $i$ | $R_i \to R_i + t\,R_j$ | $\det$ unchanged |

> **Clarification:** In a Type 3 operation $R_i \to R_i + t\,R_j$, the row being *changed* is $R_i$; the row $R_j$ remains untouched. The notation puts the row being modified first.

**Example of each type applied to**

$$\begin{bmatrix} 3 & 2 & 1 & 1 \\ 1 & 1 & 0 & 0 \\ 0 & 7 & 1 & 1 \end{bmatrix}$$

**Type 1** — $R_1 \leftrightarrow R_2$:

$$\begin{bmatrix} 1 & 1 & 0 & 0 \\ 3 & 2 & 1 & 1 \\ 0 & 7 & 1 & 1 \end{bmatrix}$$

**Type 2** — $R_1 \to \tfrac{1}{3}R_1$:

$$\begin{bmatrix} 1 & \tfrac{2}{3} & \tfrac{1}{3} & \tfrac{1}{3} \\ 1 & 1 & 0 & 0 \\ 0 & 7 & 1 & 1 \end{bmatrix}$$

**Type 3** — $R_1 \to R_1 - 3R_2$ (applied to the original):

$$\begin{bmatrix} 0 & -1 & 1 & 1 \\ 1 & 1 & 0 & 0 \\ 0 & 7 & 1 & 1 \end{bmatrix}$$

### Key Property of Elementary Row Operations

Two systems are called **row equivalent** if one can be obtained from the other by a finite sequence of EROs. Row equivalent systems have **exactly the same solution set**. This is the foundational fact that makes the entire Gaussian elimination procedure valid.

---

## 5. Row Echelon Form (REF) and Reduced Row Echelon Form (RREF)

### Row Echelon Form (REF)

A matrix is in **row echelon form** if it satisfies the following three conditions: [▶ W2_L4 @ 06:28](https://www.youtube.com/watch?v=6N8owlkf9AQ&t=388)

1. The first nonzero entry in each nonzero row is $1$. This entry is called the **leading 1** (or **pivot**).
2. Each leading 1 is in a column **strictly to the right** of the leading 1 in the row above it. (The leading 1s "staircase" down and to the right.)
3. All **zero rows** (rows consisting entirely of zeros) are at the **bottom** of the matrix.

**Example (in REF):**

$$\begin{bmatrix} 1 & \tfrac{2}{3} & \tfrac{1}{3} & \tfrac{1}{3} \\ 0 & 1 & -1 & -1 \\ 0 & 0 & 1 & 1 \end{bmatrix}$$

Check: each nonzero row starts with a 1; the leading 1s are in columns 1, 2, 3 (moving right); no zero rows.

### Reduced Row Echelon Form (RREF)

A matrix is in **reduced row echelon form** if it is in REF **and** additionally satisfies: [▶ W2_L4 @ 08:28](https://www.youtube.com/watch?v=6N8owlkf9AQ&t=508)

4. Each leading 1 is the **only nonzero entry** in its column. (All entries above and below a leading 1 are $0$.)

**Example (in RREF):**

$$\begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 1 \end{bmatrix}$$

Here the leading 1s in columns 1, 2, 3 each have zeros everywhere else in that column.

> **Clarification:** Every matrix in RREF is also in REF, but not conversely. The RREF of a matrix is **unique** — there is only one RREF for any given matrix — whereas there are many possible REFs.

### Pivot Positions and Pivot Columns

A **pivot position** is a location in a matrix that corresponds to a leading 1 in an echelon form. A **pivot column** is a column that contains a pivot position.

### Summary Table

| Property | REF | RREF |
|---|---|---|
| Leading entry of each nonzero row is 1 | ✓ | ✓ |
| Leading 1s staircase right | ✓ | ✓ |
| Zero rows at bottom | ✓ | ✓ |
| Each leading 1 is the only nonzero entry in its column | Not required | ✓ |
| Unique for a given matrix | ✗ | ✓ |

---

## 6. Row Reduction Algorithm (Gaussian Elimination)

The process of using EROs to transform a matrix into REF is called **Gaussian elimination** (or **forward elimination**). Continuing to RREF is called **Gauss–Jordan elimination**. [▶ W2_L5 @ 04:09](https://www.youtube.com/watch?v=ECRhKDTUxM8&t=249)

### Algorithm: From a General Matrix to REF

Given an $m \times n$ matrix $A$ (or an augmented matrix $[A \mid b]$):

**Step 1.** Find the **leftmost nonzero column**. This is the first pivot column.

**Step 2.** Select a nonzero entry in the pivot column at or below the current row. If it is not already in the current row, use a **Type 1** (row swap) operation to move it there. This entry becomes the **pivot**.

**Step 3.** Use a **Type 2** operation to scale the pivot to $1$.

**Step 4.** Use **Type 3** operations to create zeros in all entries **below** the pivot.

**Step 5.** Cover (ignore) the current row and all rows above it. Repeat Steps 1–4 on the remaining sub-matrix. Continue until no nonzero rows remain below the current row.

The matrix is now in **REF**.

### Algorithm: From REF to RREF

**Step 6.** Starting from the **rightmost** pivot and working **left**: use **Type 3** operations to create zeros in all entries **above** each leading 1.

The matrix is now in **RREF**.

### Worked Example: Full Row Reduction

**Example:** Reduce the following matrix to RREF.

$$A = \begin{bmatrix} 2 & 4 & 1 \\ 3 & 8 & 7 \\ 5 & 6 & 9 \end{bmatrix}$$

**Solution:**

**Step 1–3.** The leftmost nonzero column is column 1. Scale $R_1$ to get a leading 1:

$R_1 \to \tfrac{1}{2}R_1$:

$$\begin{bmatrix} 1 & 2 & \tfrac{1}{2} \\ 3 & 8 & 7 \\ 5 & 6 & 9 \end{bmatrix}$$

**Step 4.** Eliminate below the pivot in column 1:

$R_2 \to R_2 - 3R_1$, $\;R_3 \to R_3 - 5R_1$:

$$\begin{bmatrix} 1 & 2 & \tfrac{1}{2} \\ 0 & 2 & \tfrac{11}{2} \\ 0 & -4 & \tfrac{13}{2} \end{bmatrix}$$

**Step 5.** Move to the sub-matrix (rows 2–3, columns 2–3). The leftmost nonzero column is column 2.

$R_2 \to \tfrac{1}{2}R_2$:

$$\begin{bmatrix} 1 & 2 & \tfrac{1}{2} \\ 0 & 1 & \tfrac{11}{4} \\ 0 & -4 & \tfrac{13}{2} \end{bmatrix}$$

$R_3 \to R_3 + 4R_2$:

$$\begin{bmatrix} 1 & 2 & \tfrac{1}{2} \\ 0 & 1 & \tfrac{11}{4} \\ 0 & 0 & \tfrac{35}{2} \end{bmatrix}$$

$R_3 \to \tfrac{2}{35}R_3$:

$$\begin{bmatrix} 1 & 2 & \tfrac{1}{2} \\ 0 & 1 & \tfrac{11}{4} \\ 0 & 0 & 1 \end{bmatrix}$$

This is **REF**. Now continue to RREF.

**Step 6.** Work from the rightmost pivot (column 3) leftward:

$R_2 \to R_2 - \tfrac{11}{4}R_3$, $\;R_1 \to R_1 - \tfrac{1}{2}R_3$:

$$\begin{bmatrix} 1 & 2 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

$R_1 \to R_1 - 2R_2$:

$$\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

This is **RREF** — in fact, it is the $3 \times 3$ identity matrix $I_3$.

---

## 7. Gaussian Elimination for Solving Systems

The **Gaussian elimination method** combines the augmented matrix, row reduction, and the technique for reading solutions from RREF into a single algorithm for solving any system $Ax = b$. [▶ W2_L6 @ 00:14](https://www.youtube.com/watch?v=gdk1_aEe7j4&t=14)

### The Procedure

1. **Form the augmented matrix** $[A \mid b]$.
2. **Row reduce** $[A \mid b]$ to obtain $[R \mid c]$, where $R$ is in RREF.
3. **Check for inconsistency:** If any row of $R$ is entirely zero but the corresponding entry in $c$ is nonzero, the system has **no solution** (inconsistent).
4. **Read off solutions:** If the system is consistent, identify dependent and independent variables (see Section 8), and write the general solution.

### Why It Works

Each elementary row operation corresponds to a reversible manipulation of the system of equations (multiplying an equation by a nonzero scalar, adding a multiple of one equation to another, or reordering equations). These manipulations do not change the solution set. Therefore the original system $Ax = b$ and the reduced system $Rx = c$ have **identical solution sets**.

### Worked Example 1: Infinitely Many Solutions

**Example:** Solve the system

$$\begin{cases} 3x_1 + 2x_2 + x_3 + x_4 = 6 \\ x_1 + x_2 = 2 \\ 7x_2 + x_3 + x_4 = 8 \end{cases}$$

**Solution:** [▶ W2_L6 @ 15:07](https://www.youtube.com/watch?v=gdk1_aEe7j4&t=907)

Form the augmented matrix:

$$\left[\begin{array}{cccc|c} 3 & 2 & 1 & 1 & 6 \\ 1 & 1 & 0 & 0 & 2 \\ 0 & 7 & 1 & 1 & 8 \end{array}\right]$$

$R_1 \to \tfrac{1}{3}R_1$:

$$\left[\begin{array}{cccc|c} 1 & \tfrac{2}{3} & \tfrac{1}{3} & \tfrac{1}{3} & 2 \\ 1 & 1 & 0 & 0 & 2 \\ 0 & 7 & 1 & 1 & 8 \end{array}\right]$$

$R_2 \to R_2 - R_1$:

$$\left[\begin{array}{cccc|c} 1 & \tfrac{2}{3} & \tfrac{1}{3} & \tfrac{1}{3} & 2 \\ 0 & \tfrac{1}{3} & -\tfrac{1}{3} & -\tfrac{1}{3} & 0 \\ 0 & 7 & 1 & 1 & 8 \end{array}\right]$$

$R_2 \to 3R_2$:

$$\left[\begin{array}{cccc|c} 1 & \tfrac{2}{3} & \tfrac{1}{3} & \tfrac{1}{3} & 2 \\ 0 & 1 & -1 & -1 & 0 \\ 0 & 7 & 1 & 1 & 8 \end{array}\right]$$

$R_3 \to R_3 - 7R_2$:

$$\left[\begin{array}{cccc|c} 1 & \tfrac{2}{3} & \tfrac{1}{3} & \tfrac{1}{3} & 2 \\ 0 & 1 & -1 & -1 & 0 \\ 0 & 0 & 8 & 8 & 8 \end{array}\right]$$

$R_3 \to \tfrac{1}{8}R_3$:

$$\left[\begin{array}{cccc|c} 1 & \tfrac{2}{3} & \tfrac{1}{3} & \tfrac{1}{3} & 2 \\ 0 & 1 & -1 & -1 & 0 \\ 0 & 0 & 1 & 1 & 1 \end{array}\right]$$

This is REF. Now convert to RREF:

$R_2 \to R_2 + R_3$, $\;R_1 \to R_1 - \tfrac{1}{3}R_3$:

$$\left[\begin{array}{cccc|c} 1 & \tfrac{2}{3} & 0 & 0 & \tfrac{5}{3} \\ 0 & 1 & 0 & 0 & 1 \\ 0 & 0 & 1 & 1 & 1 \end{array}\right]$$

$R_1 \to R_1 - \tfrac{2}{3}R_2$:

$$\left[\begin{array}{cccc|c} 1 & 0 & 0 & 0 & 1 \\ 0 & 1 & 0 & 0 & 1 \\ 0 & 0 & 1 & 1 & 1 \end{array}\right]$$

This is RREF. The corresponding system is:

$$\begin{cases} x_1 = 1 \\ x_2 = 1 \\ x_3 + x_4 = 1 \end{cases}$$

- **Pivot columns:** 1, 2, 3. So $x_1, x_2, x_3$ are **dependent variables**.
- **Non-pivot column:** 4. So $x_4$ is a **free (independent) variable**.

Set $x_4 = c$ (any real number). Then $x_3 = 1 - c$, and the **general solution** is:

$$\begin{bmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{bmatrix} = \begin{bmatrix} 1 \\ 1 \\ 1 - c \\ c \end{bmatrix} = \begin{bmatrix} 1 \\ 1 \\ 1 \\ 0 \end{bmatrix} + c\begin{bmatrix} 0 \\ 0 \\ -1 \\ 1 \end{bmatrix}, \qquad c \in \mathbb{R}$$

The system has **infinitely many solutions**, parametrised by the single free parameter $c$.

### Worked Example 2: No Solution

**Example:** Solve the system

$$\begin{cases} x_1 + x_2 + x_3 = 2 \\ x_2 - 3x_3 = 1 \\ 2x_1 + x_2 + 5x_3 = 0 \end{cases}$$

**Solution:** [▶ W2_L6 @ 21:52](https://www.youtube.com/watch?v=gdk1_aEe7j4&t=1312)

Form the augmented matrix:

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 2 \\ 0 & 1 & -3 & 1 \\ 2 & 1 & 5 & 0 \end{array}\right]$$

$R_3 \to R_3 - 2R_1$:

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 2 \\ 0 & 1 & -3 & 1 \\ 0 & -1 & 3 & -4 \end{array}\right]$$

$R_3 \to R_3 + R_2$:

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 2 \\ 0 & 1 & -3 & 1 \\ 0 & 0 & 0 & -3 \end{array}\right]$$

The third row reads $0x_1 + 0x_2 + 0x_3 = -3$, i.e., $0 = -3$. This is a contradiction. The system is **inconsistent** — it has **no solution**.

> **Clarification:** As soon as a row of the form $[0 \; 0 \; \cdots \; 0 \mid d]$ with $d \neq 0$ appears at any stage, you may immediately conclude the system is inconsistent. You need not complete the reduction to RREF.

### Worked Example 3: Unique Solution (Back-Substitution from REF)

Rather than always reducing to RREF, we can stop at REF and use **back substitution** — solving from the bottom equation upward.

**Example:** Solve the system whose augmented matrix row-reduces to the REF:

$$\left[\begin{array}{ccc|c} 1 & 2 & \tfrac{1}{2} & 5 \\ 0 & 1 & \tfrac{11}{4} & 3 \\ 0 & 0 & 1 & 2 \end{array}\right]$$

**Solution:** The corresponding system is:

$$\begin{cases} x_1 + 2x_2 + \tfrac{1}{2}x_3 = 5 \\ x_2 + \tfrac{11}{4}x_3 = 3 \\ x_3 = 2 \end{cases}$$

**Back substitution:** From equation 3: $x_3 = 2$.

Substitute into equation 2: $x_2 + \tfrac{11}{4}(2) = 3 \implies x_2 = 3 - \tfrac{11}{2} = -\tfrac{5}{2}$.

Substitute $x_2$