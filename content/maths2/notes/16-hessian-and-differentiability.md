---
id: "16"
number: 16
title: "HESSIAN AND DIFFERENTIABILITY"
section: "Weeks 9–11 · Multivariable Calculus"
---
# THE HESSIAN MATRIX AND DIFFERENTIABILITY

This file develops the theory of **higher-order partial derivatives** for multivariable functions, culminating in the **Hessian matrix** and its use as a classification tool for critical points. We begin by defining second-order and higher-order partial derivatives, establish the important symmetry result known as **Clairaut's theorem**, construct the Hessian matrix, and then present the **Hessian test** — the multivariable analogue of the second derivative test from one-variable calculus. We treat the test separately for functions of two and three variables, and conclude with a precise definition of **differentiability** for multivariable functions. Throughout, we connect back to foundational material on partial derivatives and gradients (see [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]]) and critical points (see [[15 - TANGENTS AND CRITICAL POINTS]]).

---

## 1. Higher-Order Partial Derivatives

### Recall: First-Order Partial Derivatives

Let $f(x_1, x_2, \ldots, x_n)$ be a scalar-valued function defined on a domain $D \subseteq \mathbb{R}^n$. The **partial derivative** of $f$ with respect to the variable $x_i$ is the function defined by [▶ W11_L1 @ 02:09](https://www.youtube.com/watch?v=SNAyzb35MAc&t=129)

$$\frac{\partial f}{\partial x_i}(\tilde{x}) = \lim_{h \to 0} \frac{f(\tilde{x} + h\mathbf{e}_i) - f(\tilde{x})}{h}$$

where $\mathbf{e}_i$ is the $i$-th standard basis vector in $\mathbb{R}^n$. The domain of $\frac{\partial f}{\partial x_i}$ consists of all points in $D$ where this limit exists. The partial derivative measures the **rate of change** of $f$ in the direction of $\mathbf{e}_i$ — equivalently, it treats $f$ as a function of $x_i$ alone while holding all other variables constant.

A full treatment of partial derivatives appears in [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]].

### Second-Order Partial Derivatives for $f(x,y)$

Since the partial derivative $\frac{\partial f}{\partial x}$ is itself a scalar-valued multivariable function, we may take its partial derivatives in turn. The resulting functions are called **second-order partial derivatives**. [▶ W11_L1 @ 03:52](https://www.youtube.com/watch?v=SNAyzb35MAc&t=232)

For a function $f(x,y)$ defined on a domain $D \subseteq \mathbb{R}^2$, there are four second-order partial derivatives:

| Notation (subscript) | Notation (Leibniz) | Meaning |
|---|---|---|
| $f_{xx}$ | $\dfrac{\partial^2 f}{\partial x^2}$ | Differentiate $f$ w.r.t. $x$, then again w.r.t. $x$ |
| $f_{yy}$ | $\dfrac{\partial^2 f}{\partial y^2}$ | Differentiate $f$ w.r.t. $y$, then again w.r.t. $y$ |
| $f_{xy}$ | $\dfrac{\partial^2 f}{\partial y \, \partial x}$ | Differentiate $f$ w.r.t. $x$ first, then w.r.t. $y$ |
| $f_{yx}$ | $\dfrac{\partial^2 f}{\partial x \, \partial y}$ | Differentiate $f$ w.r.t. $y$ first, then w.r.t. $x$ |

The derivatives $f_{xy}$ and $f_{yx}$ are called the **mixed partial derivatives**.

> **Clarification:** There is an important notational subtlety regarding the order of differentiation. In the **subscript notation** $f_{xy}$, the order reads **left to right**: differentiate first with respect to $x$, then with respect to $y$. In the **Leibniz notation** $\frac{\partial^2 f}{\partial y \, \partial x}$, the order reads **right to left**: the variable closest to $f$ is applied first. That is:
> $$f_{xy} = \frac{\partial}{\partial y}\!\left(\frac{\partial f}{\partial x}\right) = \frac{\partial^2 f}{\partial y \, \partial x}$$
> This reversal is a common source of errors. Remember: subscript notation goes left-to-right; Leibniz notation goes right-to-left.

### Worked Examples

**Example 1:** Compute all second-order partial derivatives of $f(x,y) = x + y$.

**Solution:** The first-order partial derivatives are $f_x = 1$ and $f_y = 1$. Since these are constants:

$$f_{xx} = 0, \quad f_{yy} = 0, \quad f_{xy} = 0, \quad f_{yx} = 0$$

Observe that $f_{xy} = f_{yx} = 0$.

---

**Example 2:** Compute all second-order partial derivatives of $f(x,y) = \sin(xy)$.

**Solution:** First-order partial derivatives:

$$f_x = y\cos(xy), \qquad f_y = x\cos(xy)$$

Second-order partial derivatives:

$$f_{xx} = \frac{\partial}{\partial x}\bigl[y\cos(xy)\bigr] = y \cdot (-y\sin(xy)) = -y^2\sin(xy)$$

$$f_{yy} = \frac{\partial}{\partial y}\bigl[x\cos(xy)\bigr] = x \cdot (-x\sin(xy)) = -x^2\sin(xy)$$

For the mixed partials, we compute $f_{xy}$:

$$f_{xy} = \frac{\partial}{\partial y}\bigl[y\cos(xy)\bigr] = 1 \cdot \cos(xy) + y \cdot (-x\sin(xy)) = \cos(xy) - xy\sin(xy)$$

And $f_{yx}$:

$$f_{yx} = \frac{\partial}{\partial x}\bigl[x\cos(xy)\bigr] = 1 \cdot \cos(xy) + x \cdot (-y\sin(xy)) = \cos(xy) - xy\sin(xy)$$

Again, $f_{xy} = f_{yx}$. This equality is not a coincidence — it is guaranteed by Clairaut's theorem (Section 2) whenever the mixed partials are continuous.

### Second-Order Partial Derivatives for $f(x_1, x_2, \ldots, x_n)$

For a function of $n$ variables, there are $n^2$ second-order partial derivatives. [▶ W11_L1 @ 20:22](https://www.youtube.com/watch?v=SNAyzb35MAc&t=1222) The general second-order partial derivative is:

$$f_{x_i x_j} = \frac{\partial^2 f}{\partial x_j \, \partial x_i} = \frac{\partial}{\partial x_j}\!\left(\frac{\partial f}{\partial x_i}\right)$$

When $i = j$, this simplifies to $f_{x_i x_i} = \frac{\partial^2 f}{\partial x_i^2}$.

**Example 3:** Let $f(x,y,z) = xy + yz + zx$. Compute all second-order partial derivatives.

**Solution:** First-order partial derivatives:

$$f_x = y + z, \qquad f_y = x + z, \qquad f_z = x + y$$

The nine second-order partial derivatives are:

$$f_{xx} = 0, \quad f_{yy} = 0, \quad f_{zz} = 0$$

$$f_{xy} = 1, \quad f_{xz} = 1, \quad f_{yz} = 1$$

$$f_{yx} = 1, \quad f_{zx} = 1, \quad f_{zy} = 1$$

All mixed partials agree: $f_{xy} = f_{yx} = 1$, $f_{xz} = f_{zx} = 1$, $f_{yz} = f_{zy} = 1$.

### Higher-Order Partial Derivatives

One can iterate this process indefinitely. The **$k$-th order partial derivative** is defined by taking $k$ successive partial differentiations: [▶ W11_L1 @ 24:49](https://www.youtube.com/watch?v=SNAyzb35MAc&t=1489)

$$f_{x_{i_1} x_{i_2} \cdots x_{i_k}} = \frac{\partial}{\partial x_{i_k}} \!\left( \frac{\partial}{\partial x_{i_{k-1}}} \!\left( \cdots \frac{\partial}{\partial x_{i_2}}\!\left(\frac{\partial f}{\partial x_{i_1}}\right) \cdots \right)\right)$$

In the subscript notation, differentiation proceeds left to right: first w.r.t. $x_{i_1}$, then w.r.t. $x_{i_2}$, and so on. In the Leibniz notation, differentiation proceeds right to left. As always, the existence of such derivatives is not guaranteed — the domain consists of those points where all required limits exist.

---

## 2. Symmetry of Mixed Partials: Clairaut's Theorem

### Statement of the Theorem

A natural question arises: does the order of differentiation matter for mixed partials? The answer, under a mild continuity hypothesis, is **no**.

**Theorem (Clairaut's Theorem).** Let $f(x,y)$ be a function defined on a domain $D \subseteq \mathbb{R}^2$ containing a point $\mathbf{a}$ and an open ball around it. If the second-order mixed partial derivatives $f_{xy}$ and $f_{yx}$ are both **continuous** in an open ball around $\mathbf{a}$, then [▶ W11_L1 @ 12:27](https://www.youtube.com/watch?v=SNAyzb35MAc&t=747)

$$f_{xy}(\mathbf{a}) = f_{yx}(\mathbf{a})$$

> **Clarification:** The hypothesis that the mixed partials are **continuous** is essential — it cannot be dropped. There exist functions for which the mixed partials exist at a point but are not equal there, precisely because the continuity condition fails (see Example 4 below).

### Generalization to $n$ Variables and Higher Orders

An analogous statement holds for functions of $n$ variables: under suitable continuity hypotheses, any $k$-th order partial derivative is independent of the order in which the differentiations are performed. Formally, if all $k$-th order partial derivatives are continuous in a neighbourhood of a point, then

$$f_{x_{i_1} x_{i_2} \cdots x_{i_k}} = f_{x_{j_1} x_{j_2} \cdots x_{j_k}}$$

whenever $(j_1, j_2, \ldots, j_k)$ is a rearrangement (permutation) of $(i_1, i_2, \ldots, i_k)$.

In practice, for "nice" functions (polynomials, trigonometric functions, exponentials, and their compositions — wherever they are defined), all partial derivatives are continuous and Clairaut's theorem applies freely.

### A Counterexample Where the Hypothesis Fails

**Example 4:** Consider the function

$$f(x,y) = \begin{cases} \dfrac{xy(x^2 - y^2)}{x^2 + y^2} & \text{if } (x,y) \neq (0,0) \\[6pt] 0 & \text{if } (x,y) = (0,0) \end{cases}$$

**Step 1: Compute the first-order partial derivatives at $(0,0)$.**

$$f_x(0,0) = \lim_{h \to 0} \frac{f(h,0) - f(0,0)}{h} = \lim_{h \to 0} \frac{0 - 0}{h} = 0$$

Similarly, $f_y(0,0) = 0$.

**Step 2: Compute the partial derivatives away from $(0,0)$.**

Using the quotient rule for $(x,y) \neq (0,0)$:

$$f_x(x,y) = \frac{y(x^4 - y^4 + 4x^2y^2)}{(x^2+y^2)^2} \quad \text{(after simplification)}$$

$$f_y(x,y) = \frac{x(x^4 - y^4 - 4x^2y^2)}{(x^2+y^2)^2} \quad \text{(after simplification)}$$

**Step 3: Compute the mixed partials at $(0,0)$ from the definition.**

$$f_{xy}(0,0) = \frac{\partial}{\partial y}\!\left(\frac{\partial f}{\partial x}\right)\bigg|_{(0,0)} = \lim_{h \to 0} \frac{f_x(0,h) - f_x(0,0)}{h}$$

Substituting: $f_x(0,h) = \frac{h \cdot(-h^4)}{h^4} = -h$, so

$$f_{xy}(0,0) = \lim_{h \to 0} \frac{-h - 0}{h} = -1$$

Now compute $f_{yx}(0,0)$:

$$f_{yx}(0,0) = \lim_{h \to 0} \frac{f_y(h,0) - f_y(0,0)}{h}$$

Substituting: $f_y(h,0) = \frac{h \cdot h^4}{h^4} = h$, so

$$f_{yx}(0,0) = \lim_{h \to 0} \frac{h - 0}{h} = 1$$

**Conclusion:** $f_{xy}(0,0) = -1 \neq 1 = f_{yx}(0,0)$. The mixed partials are **not equal** at the origin. This occurs because the mixed partials, while they exist at $(0,0)$, are **not continuous** there, violating the hypothesis of Clairaut's theorem.

---

## 3. The Hessian Matrix

### Definition

Let $f(x_1, x_2, \ldots, x_n)$ be a function defined on a domain $D \subseteq \mathbb{R}^n$ whose second-order partial derivatives all exist. The **Hessian matrix** of $f$ is the $n \times n$ matrix of second-order partial derivatives: [▶ W11_L1 @ 28:10](https://www.youtube.com/watch?v=SNAyzb35MAc&t=1690)

$$H_f = \begin{bmatrix} \dfrac{\partial^2 f}{\partial x_1^2} & \dfrac{\partial^2 f}{\partial x_1 \, \partial x_2} & \cdots & \dfrac{\partial^2 f}{\partial x_1 \, \partial x_n} \\[10pt] \dfrac{\partial^2 f}{\partial x_2 \, \partial x_1} & \dfrac{\partial^2 f}{\partial x_2^2} & \cdots & \dfrac{\partial^2 f}{\partial x_2 \, \partial x_n} \\[10pt] \vdots & \vdots & \ddots & \vdots \\[10pt] \dfrac{\partial^2 f}{\partial x_n \, \partial x_1} & \dfrac{\partial^2 f}{\partial x_n \, \partial x_2} & \cdots & \dfrac{\partial^2 f}{\partial x_n^2} \end{bmatrix}$$

The $(i,j)$-entry of the Hessian matrix is:

$$(H_f)_{ij} = \frac{\partial^2 f}{\partial x_j \, \partial x_i} = f_{x_i x_j}$$

When the hypotheses of Clairaut's theorem are satisfied, the Hessian matrix is **symmetric**: $(H_f)_{ij} = (H_f)_{ji}$.

> **Clarification:** The Hessian is a matrix-valued **function** — its entries may depend on the point $(x_1, \ldots, x_n)$. When we write $H_f(\mathbf{a})$, we mean the Hessian evaluated at the specific point $\mathbf{a}$, giving a matrix of numbers.

### Worked Examples

**Example 5:** The Hessian matrix of $f(x,y) = x + y$.

Since all second-order partial derivatives are zero:

$$H_f = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$$

---

**Example 6:** The Hessian matrix of $f(x,y) = \sin(xy)$.

From Example 2:

$$H_f = \begin{bmatrix} -y^2\sin(xy) & \cos(xy) - xy\sin(xy) \\ \cos(xy) - xy\sin(xy) & -x^2\sin(xy) \end{bmatrix}$$

Note the symmetry $H_f = H_f^T$, consistent with Clairaut's theorem.

---

**Example 7:** The Hessian matrix of $f(x,y,z) = xy + yz + zx$.

From Example 3:

$$H_f = \begin{bmatrix} 0 & 1 & 1 \\ 1 & 0 & 1 \\ 1 & 1 & 0 \end{bmatrix}$$

This is a $3 \times 3$ symmetric matrix with a familiar structure from linear algebra (see [[1 - MATRICES]]).

---

## 4. The Hessian Test for $f(x,y)$

### Recall: The Second Derivative Test for One Variable

For a function $f$ of one variable, suppose $a$ is a critical point (i.e., $f'(a) = 0$) and $f$ is twice differentiable at $a$: [▶ W11_L2 @ 00:46](https://www.youtube.com/watch?v=XJH8RJ5m3OU&t=46)

| Condition | Conclusion |
|---|---|
| $f''(a) > 0$ | $a$ is a **local minimum** |
| $f''(a) < 0$ | $a$ is a **local maximum** |
| $f''(a) = 0$ | **Inconclusive** |

The Hessian test generalises this to functions of two (and more) variables.

### Statement of the Hessian Test for Two Variables

**Theorem (Hessian Test for $f(x,y)$).** Let $f(x,y)$ be defined on a domain $D \subseteq \mathbb{R}^2$, and let $\mathbf{a} = (a,b)$ be a critical point of $f$ (i.e., $\nabla f(\mathbf{a}) = \mathbf{0}$). Suppose the first- and second-order partial derivatives of $f$ are continuous in an open ball around $\mathbf{a}$. Define the **Hessian determinant**: [▶ W11_L2 @ 03:00](https://www.youtube.com/watch?v=XJH8RJ5m3OU&t=180)

$$D = \det(H_f(\mathbf{a})) = f_{xx}(\mathbf{a}) \cdot f_{yy}(\mathbf{a}) - \bigl(f_{xy}(\mathbf{a})\bigr)^2$$

(Note: by Clairaut's theorem, $f_{xy}(\mathbf{a}) = f_{yx}(\mathbf{a})$ under our hypotheses, so the cross-term is $f_{xy}^2$.)

Then:

| Condition | Conclusion |
|---|---|
| $D > 0$ and $f_{xx}(\mathbf{a}) > 0$ | $\mathbf{a}$ is a **local minimum** |
| $D > 0$ and $f_{xx}(\mathbf{a}) < 0$ | $\mathbf{a}$ is a **local maximum** |
| $D < 0$ | $\mathbf{a}$ is a **saddle point** |
| $D = 0$ | **Inconclusive** (degenerate case) |

> **Clarification:** When $D > 0$, the sign of $f_{xx}$ alone determines the nature of the critical point. You do **not** need to check $f_{yy}$ separately, because $D > 0$ together with $f_{xx} > 0$ automatically implies $f_{yy} > 0$ (and similarly for the negative case). Indeed, $D > 0$ means $f_{xx} f_{yy} > f_{xy}^2 \geq 0$, so $f_{xx}$ and $f_{yy}$ must have the same sign.

### Prototype Examples to Remember the Test

The following four functions are the canonical examples for each case. Memorising them provides an easy way to reconstruct the test from scratch.

**Prototype 1: Local minimum — $f(x,y) = x^2 + y^2$**

- $\nabla f = (2x, 2y)$; critical point: $(0,0)$.
- $H_f = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}$, so $D = 4 > 0$ and $f_{xx} = 2 > 0$.
- **Conclusion:** $(0,0)$ is a local minimum. ✓ (This is obvious since $f \geq 0$ with equality only at the origin.)

**Prototype 2: Local maximum — $f(x,y) = -x^2 - y^2$**

- $\nabla f = (-2x, -2y)$; critical point: $(0,0)$.
- $H_f = \begin{bmatrix} -2 & 0 \\ 0 & -2 \end{bmatrix}$, so $D = 4 > 0$ and $f_{xx} = -2 < 0$.
- **Conclusion:** $(0,0)$ is a local maximum. ✓

**Prototype 3: Saddle point — $f(x,y) = x^2 - y^2$**

- $\nabla f = (2x, -2y)$; critical point: $(0,0)$.
- $H_f = \begin{bmatrix} 2 & 0 \\ 0 & -2 \end{bmatrix}$, so $D = -4 < 0$.
- **Conclusion:** $(0,0)$ is a saddle point. ✓

**Prototype 4: Inconclusive — $f(x,y) = x^4 + y^4$**

- $\nabla f = (4x^3, 4y^3)$; critical point: $(0,0)$.
- $H_f(0,0) = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$, so $D = 0$.
- **Conclusion:** Inconclusive. ✗ (In reality, $(0,0)$ is a global minimum — the test simply cannot detect it because the second-order information vanishes.)

### Further Worked Examples

**Example 8:** Classify the critical points of $f(x,y) = x^2 + 6xy + 4y^2 + 2x - 4y$.

**Solution:**

*Step 1: Find the gradient.*

$$\nabla f = (2x + 6y + 2, \; 6x + 8y - 4)$$

*Step 2: Set the gradient to zero.*

$$\begin{cases} 2x + 6y + 2 = 0 \\ 6x + 8y - 4 = 0 \end{cases}$$

Solving (e.g., by Gaussian elimination): from the first equation, $x = -3y - 1$. Substituting into the second: $6(-3y-1) + 8y - 4 = 0 \implies -10y - 10 = 0 \implies y = -1$. Then $x = -3(-1) - 1 = 2$.

Critical point: $(2, -1)$.

*Step 3: Compute the Hessian.*

$$H_f = \begin{bmatrix} 2 & 6 \\ 6 & 8 \end{bmatrix}$$

(This Hessian is constant — it does not depend on the point.)

*Step 4: Apply the test at $(2,-1)$.*

$$D = \det(H_f) = (2)(8) - (6)^2 = 16 - 36 = -20 < 0$$

Since $D < 0$, the point $(2,-1)$ is a **saddle point**.

---

**Example 9:** Classify the critical points of $f(x,y) = xy - x^3 - y^2$.

**Solution:**

*Step 1: Gradient.*

$$\nabla f = (y - 3x^2, \; x - 2y)$$

*Step 2: Set to zero.*

From $x - 2y = 0$, we get $x = 2y$. Substituting into $y - 3x^2 = 0$:

$$y - 3(2y)^2 = 0 \implies y - 12y^2 = 0 \implies y(1 - 12y) = 0$$

- If $y = 0$: then $x = 0$. Critical point: $(0,0)$.
- If $y = \frac{1}{12}$: then $x = \frac{1}{6}$. Critical point: $\left(\frac{1}{6}, \frac{1}{12}\right)$.

*Step 3: Hessian.*

$$H_f = \begin{bmatrix} -6x & 1 \\ 1 & -2 \end{bmatrix}$$

*Step 4: Test at $(0,0)$.*

$$H_f(0,0) = \begin{bmatrix} 0 & 1 \\ 1 & -2 \end{bmatrix}, \qquad D = (0)(-2) - (1)^2 = -1 < 0$$

**Conclusion:** $(0,0)$ is a **saddle point**.

*Step 5: Test at $\left(\frac{1}{6}, \frac{1}{12}\right)$.*

$$H_f\!\left(\tfrac{1}{6}, \tfrac{1}{12}\right) = \begin{bmatrix} -1 & 1 \\ 1 & -2 \end{bmatrix}, \qquad D = (-1)(-2) - (1)^2 = 2 - 1 = 1 > 0$$

Since $D > 0$ and $f_{xx} = -1 < 0$:

**Conclusion:** $\left(\frac{1}{6}, \frac{1}{12}\right)$ is a **local maximum**.

---

**Example 10:** Classify the critical point $(0,0)$ of $f(x,y) = \sin(xy)$.

**Solution:** We identified in [[15 - TANGENTS AND CRITICAL POINTS]] that the critical points of $\sin(xy)$ include $(0,0)$ (where $\cos(0) \neq 0$ forces $x = 0$ and $y = 0$) and curves where $\cos(xy) = 0$.

At $(0,0)$:

$$H_f(0,0) = \begin{bmatrix} 0 & \cos(0) - 0 \\ \cos(0) - 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$

$$D = (0)(0) - (1)^2 = -1 < 0$$

**Conclusion:** $(0,0)$ is a **saddle point**. [▶ W11_L2 @ 25:13](https://www.youtube.com/watch?v=XJH8RJ5m3OU&t=1513)

For critical points where $\cos(xy) = 0$ (i.e., $\sin(xy) = \pm 1$), the Hessian has the form:

$$H_f = \begin{bmatrix} -y^2 \sin(xy) & -xy\sin(xy) \\ -xy\sin(xy) & -x^2 \sin(xy) \end{bmatrix}$$

with $\cos(xy) = 0$. The determinant is:

$$D = (y^2 \sin(xy))(x^2 \sin(xy)) - (xy\sin(xy))^2 = x^2 y^2 \sin^2(xy) - x^2 y^2 \sin^2(xy) = 0$$

The test is **inconclusive** at every point on these curves, even though we know they are global maxima ($\sin(xy) = 1$) or global minima ($\sin(xy) = -1$). This illustrates that the Hessian test can fail even at points whose nature is completely understood by other means.

---

## 5. Leading Principal Minors and the Hessian Test for $f(x,y,z)$

### Leading Principal Minors

To state the Hessian test for three (or more) variables, we need the concept of **leading principal minors** of a matrix. [▶ W11_L3 @ 07:02](https://www.youtube.com/watch?v=QOqj5I8q_eU&t=422)

**Definition.** For an $n \times n$ matrix $A$, the **$k$-th leading principal minor** $\Delta_k$ is the determinant of the $k \times k$ submatrix in the **top-left corner** of $A$, for $k = 1, 2, \ldots, n$.

For a $3 \times 3$ Hessian matrix:

$$H_f(\mathbf{a}) = \begin{bmatrix} f_{xx} & f_{xy} & f_{xz} \\ f_{xy} & f_{yy} & f_{yz} \\ f_{xz} & f_{yz} & f_{zz} \end{bmatrix}$$

(where all entries are evaluated at $\mathbf{a}$ and we use Clairaut's theorem for symmetry), the leading principal minors are:

$$\Delta_1 = f_{xx}(\mathbf{a})$$

$$\Delta_2 = \det\begin{bmatrix} f_{xx} & f_{xy} \\ f_{xy} & f_{yy} \end{bmatrix}\bigg|_{\mathbf{a}} = f_{xx}(\mathbf{a}) \cdot f_{yy}(\mathbf{a}) - \bigl(f_{xy}(\mathbf{a})\bigr)^2$$

$$\Delta_3 = \det(H_f(\mathbf{a}))$$

Note that $\Delta