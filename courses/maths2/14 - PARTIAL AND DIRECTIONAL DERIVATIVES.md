# PARTIAL DERIVATIVES AND THE GRADIENT

This file develops the theory of **partial derivatives**, **directional derivatives**, and the **gradient vector** for scalar-valued multivariable functions. These tools extend the idea of "rate of change" from single-variable calculus to functions of several variables, answering the fundamental question: *how fast does $f$ change, and in which direction?* The gradient, in particular, is one of the most important objects in applied mathematics — it drives optimisation algorithms such as gradient descent, which lies at the heart of machine learning.

**Prerequisites.** Familiarity with multivariable functions (see [[13 - MULTIVARIABLE FUNCTIONS]]) and the dot product and norms on $\mathbb{R}^n$ (see [[11 - INNER PRODUCTS]]).

---

## 1. Recall: Derivatives in One Variable

Before introducing partial derivatives, we briefly recall the single-variable derivative that motivates everything that follows.

Let $f: \mathbb{R} \to \mathbb{R}$ be defined on an open interval containing $a$. The function $f$ is **differentiable at $a$** if the following limit exists:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

The number $f'(a)$ is the **derivative of $f$ at $a$** and represents the instantaneous rate of change of $f$ at $a$. Collecting all points where $f$ is differentiable produces the **derivative function** $f'$.

The strategy for multivariable calculus is: reduce to this one-variable setup by holding all variables constant except one (for partial derivatives) or by restricting to a line through a point (for directional derivatives).

---

## 2. Notation and Conventions

Throughout this file, the following conventions are in force.

| Symbol | Meaning |
|--------|---------|
| $f$ (unqualified) | A scalar-valued multivariable function $f: D \subseteq \mathbb{R}^n \to \mathbb{R}$ |
| $\widetilde{a} = (a_1, a_2, \ldots, a_n)$ | A point in $\mathbb{R}^n$ |
| $B_r(\widetilde{a})$ | The **open ball** of radius $r$ around $\widetilde{a}$: $\{\widetilde{x} \in \mathbb{R}^n : \|\widetilde{x} - \widetilde{a}\| < r\}$ |
| $e_1, e_2, \ldots, e_n$ | The **standard ordered basis** of $\mathbb{R}^n$ |
| $\|v\|$ | The Euclidean norm (length) of the vector $v$ |

In $\mathbb{R}^2$, the open ball $B_r(\widetilde{a})$ is an open disk of radius $r$ centred at $\widetilde{a}$. In $\mathbb{R}^3$ it is an open solid sphere.

---

## 3. Partial Derivatives

### Definition

Let $f(x_1, x_2, \ldots, x_n)$ be a function defined on a domain $D \subseteq \mathbb{R}^n$ such that $D$ contains some open ball around the point $\widetilde{a} = (a_1, \ldots, a_n)$. The **partial derivative of $f$ with respect to $x_i$ at $\widetilde{a}$** is [▶ W9_L2 @ 06:01](https://www.youtube.com/watch?v=GoJoNFBuCJ8&t=361)

$$\frac{\partial f}{\partial x_i}(\widetilde{a}) = \lim_{h \to 0} \frac{f(\widetilde{a} + h\,e_i) - f(\widetilde{a})}{h}$$

provided this limit exists. Written out in coordinates:

$$\frac{\partial f}{\partial x_i}(\widetilde{a}) = \lim_{h \to 0} \frac{f(a_1, \ldots, a_{i-1},\, a_i + h,\, a_{i+1}, \ldots, a_n) - f(a_1, \ldots, a_n)}{h}$$

The notation $f_{x_i}(\widetilde{a})$ is used interchangeably with $\dfrac{\partial f}{\partial x_i}(\widetilde{a})$. The symbol $\partial$ is read "**del**" (or sometimes "partial").

### The Partial Derivative as a Function

By computing the above limit at every point $\widetilde{x} \in D$ where it exists, we obtain the **partial derivative function**:

$$\frac{\partial f}{\partial x_i} : D_i \subseteq D \to \mathbb{R}, \qquad \widetilde{x} \mapsto \lim_{h \to 0} \frac{f(\widetilde{x} + h\,e_i) - f(\widetilde{x})}{h}$$

where $D_i$ is the set of points in $D$ at which the limit exists. This is itself a scalar-valued multivariable function.

### Key Idea: Reduction to One Variable

The partial derivative $\frac{\partial f}{\partial x_i}$ at $\widetilde{a}$ is computed by defining the single-variable function [▶ W9_L2 @ 08:20](https://www.youtube.com/watch?v=GoJoNFBuCJ8&t=500)

$$g(t) = f(a_1, \ldots, a_{i-1},\, t,\, a_{i+1}, \ldots, a_n)$$

Then $\frac{\partial f}{\partial x_i}(\widetilde{a}) = g'(a_i)$.

**In words:** to compute the partial derivative with respect to $x_i$, **treat all other variables as constants** and differentiate as a function of $x_i$ alone using the usual rules of single-variable calculus.

> **Clarification:** The word "partial" reflects the fact that we are only looking at variation in *one* direction at a time, not capturing the full behaviour of the function simultaneously.

### Geometric Interpretation

For a function $f: \mathbb{R}^2 \to \mathbb{R}$ with graph $z = f(x,y)$:

- $\frac{\partial f}{\partial x}(a, b)$ is the slope of the curve obtained by **intersecting** the surface $z = f(x,y)$ with the plane $y = b$ (a plane parallel to the $xz$-plane), evaluated at $x = a$.
- $\frac{\partial f}{\partial y}(a, b)$ is the slope of the curve obtained by intersecting the surface with the plane $x = a$ (a plane parallel to the $yz$-plane), evaluated at $y = b$.

### Worked Examples

**Example 1:** Let $f(x,y) = x + y$. Compute $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$.

**Solution:** Treating $y$ as a constant: $\frac{\partial f}{\partial x}(x,y) = 1$. Treating $x$ as a constant: $\frac{\partial f}{\partial y}(x,y) = 1$.

*Verification from the limit definition:*

$$\frac{\partial f}{\partial x}(0,0) = \lim_{h \to 0} \frac{f(h, 0) - f(0,0)}{h} = \lim_{h \to 0} \frac{h}{h} = 1 \checkmark$$

---

**Example 2:** Let $f(x,y,z) = xy + yz + zx$. Compute all three partial derivatives. [▶ W9_L2 @ 26:34](https://www.youtube.com/watch?v=GoJoNFBuCJ8&t=1594)

**Solution:** Treat two variables as constants in each case:

$$\frac{\partial f}{\partial x}(x,y,z) = y + z, \qquad \frac{\partial f}{\partial y}(x,y,z) = x + z, \qquad \frac{\partial f}{\partial z}(x,y,z) = x + y$$

*Verification at $(1,2,3)$ with respect to $y$ from the limit:*

$$\lim_{h \to 0} \frac{f(1, 2+h, 3) - f(1,2,3)}{h} = \lim_{h \to 0} \frac{[1(2+h) + (2+h)3 + 3 \cdot 1] - [2 + 6 + 3]}{h} = \lim_{h \to 0} \frac{4h}{h} = 4$$

And indeed $\frac{\partial f}{\partial y}(1,2,3) = 1 + 3 = 4$. $\checkmark$

---

**Example 3:** Let $f(x,y) = \sin(xy)$. Compute $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$. [▶ W9_L2 @ 26:50](https://www.youtube.com/watch?v=GoJoNFBuCJ8&t=1610)

**Solution:** Using the chain rule (treating $y$ as a constant):

$$\frac{\partial f}{\partial x}(x,y) = y\cos(xy), \qquad \frac{\partial f}{\partial y}(x,y) = x\cos(xy)$$

*Check at $(1,0)$:*

- $\frac{\partial f}{\partial x}(1,0) = 0 \cdot \cos(0) = 0$.
- $\frac{\partial f}{\partial y}(1,0) = 1 \cdot \cos(0) = 1$.

From the limit definition for $\frac{\partial f}{\partial y}(1,0)$:

$$\lim_{h \to 0} \frac{\sin(1 \cdot h) - \sin(0)}{h} = \lim_{h \to 0} \frac{\sin h}{h} = 1 \checkmark$$

---

**Example 4 (Piecewise function):** Let

$$f(x,y) = \begin{cases} \dfrac{xy}{x^2 + y^2} & \text{if } (x,y) \neq (0,0) \\[6pt] 0 & \text{if } (x,y) = (0,0) \end{cases}$$

Compute the partial derivatives at $(0,0)$. [▶ W9_L2 @ 28:47](https://www.youtube.com/watch?v=GoJoNFBuCJ8&t=1727)

**Solution:** Away from the origin, the usual quotient rule applies. At the origin, we must compute from the definition:

$$\frac{\partial f}{\partial x}(0,0) = \lim_{h \to 0} \frac{f(h,0) - f(0,0)}{h} = \lim_{h \to 0} \frac{0 - 0}{h} = 0$$

By symmetry (or direct computation), $\frac{\partial f}{\partial y}(0,0) = 0$.

> **Clarification:** For piecewise-defined functions, especially at boundary points of the pieces, you **must** return to the limit definition. The "treat other variables as constants" shortcut applies only when the function has a single, smooth expression in a neighbourhood of the point.

### Computation Rules Summary

| Rule | Formula |
|------|---------|
| **Constant multiple** | $\frac{\partial}{\partial x_i}[cf] = c\,\frac{\partial f}{\partial x_i}$ |
| **Sum** | $\frac{\partial}{\partial x_i}[f + g] = \frac{\partial f}{\partial x_i} + \frac{\partial g}{\partial x_i}$ |
| **Product** | $\frac{\partial}{\partial x_i}[fg] = f\,\frac{\partial g}{\partial x_i} + g\,\frac{\partial f}{\partial x_i}$ |
| **Quotient** | $\frac{\partial}{\partial x_i}\!\left[\frac{f}{g}\right] = \frac{g\,\frac{\partial f}{\partial x_i} - f\,\frac{\partial g}{\partial x_i}}{g^2}$, provided $g \neq 0$ |
| **Chain rule** | $\frac{\partial}{\partial x_i}[h(f(\widetilde{x}))] = h'(f(\widetilde{x})) \cdot \frac{\partial f}{\partial x_i}(\widetilde{x})$ |

All of these follow from the corresponding single-variable rules, applied while treating all variables except $x_i$ as constants.

---

## 4. Directional Derivatives

Partial derivatives measure the rate of change along the coordinate axes. But there are infinitely many other directions in $\mathbb{R}^n$. The **directional derivative** generalises partial derivatives to an arbitrary direction.

### Rate of Change in a Given Direction

Let $f$ be defined on a domain $D \subseteq \mathbb{R}^n$ containing an open ball around $\widetilde{a}$, and let $u \in \mathbb{R}^n$ be a **unit vector** ($\|u\| = 1$). The **rate of change of $f$ at $\widetilde{a}$ in the direction of $u$** is [▶ W9_L3 @ 05:30](https://www.youtube.com/watch?v=uhUqybTaGns&t=330)

$$\lim_{h \to 0} \frac{f(\widetilde{a} + hu) - f(\widetilde{a})}{h}$$

provided the limit exists.

**Geometric picture.** The expression $\widetilde{a} + hu$ traces out a line through $\widetilde{a}$ in the direction of $u$. Define

$$g(h) = f(\widetilde{a} + hu)$$

Then $g$ is a function of one real variable, and the limit above is simply $g'(0)$. So the directional derivative is the ordinary derivative of $f$ restricted to the line through $\widetilde{a}$ in direction $u$.

> **Clarification:** We require $u$ to be a **unit vector** so that the parameter $h$ measures actual distance along the direction. If a problem gives a non-unit vector $v$, first normalise: $u = \frac{v}{\|v\|}$.

### The Directional Derivative Function

The **directional derivative of $f$ in the direction of the unit vector $u$** is the function denoted $f_u$ (or $D_u f$), defined by [▶ W9_L3 @ 22:46](https://www.youtube.com/watch?v=uhUqybTaGns&t=1366)

$$f_u(\widetilde{x}) = \lim_{h \to 0} \frac{f(\widetilde{x} + hu) - f(\widetilde{x})}{h}$$

Its domain consists of those points in $D$ where the limit exists.

**Connection to partial derivatives.** When $u = e_i$, the $i$-th standard basis vector, the directional derivative $f_{e_i}$ is exactly the partial derivative $\frac{\partial f}{\partial x_i}$. Partial derivatives are directional derivatives in the coordinate directions.

### Worked Examples

**Example 5:** Find the rate of change of $f(x,y) = x + y$ at $(0,0)$ in the direction of the line $y = x$. [▶ W9_L3 @ 08:56](https://www.youtube.com/watch?v=uhUqybTaGns&t=536)

**Solution:** The line $y = x$ makes an angle of $45°$ with the positive $x$-axis. The corresponding unit vector is:

$$u = (\cos 45°, \sin 45°) = \left(\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}\right)$$

Compute the limit:

$$\lim_{h \to 0} \frac{f\!\left(\frac{h}{\sqrt{2}}, \frac{h}{\sqrt{2}}\right) - f(0,0)}{h} = \lim_{h \to 0} \frac{\frac{h}{\sqrt{2}} + \frac{h}{\sqrt{2}}}{h} = \lim_{h \to 0} \frac{\sqrt{2}\,h}{h} = \sqrt{2}$$

---

**Example 6:** Find the rate of change of $f(x,y,z) = xy + yz + zx$ at $(1,2,3)$ in the direction of $(4, 3, 0)$. [▶ W9_L3 @ 10:40](https://www.youtube.com/watch?v=uhUqybTaGns&t=640)

**Solution:** First normalise:

$$\|v\| = \sqrt{16 + 9 + 0} = 5, \qquad u = \frac{1}{5}(4, 3, 0)$$

Then:

$$f_u(1,2,3) = \lim_{h \to 0} \frac{f\!\left(1 + \frac{4h}{5},\; 2 + \frac{3h}{5},\; 3\right) - f(1,2,3)}{h}$$

Expanding (using $f = xy + yz + zx$) and cancelling the constant terms:

$$\text{Numerator} = h^2 \cdot \frac{12}{25} + h\!\left(\frac{8}{5} + \frac{3}{5} + \frac{9}{5} + \frac{12}{5}\right)$$

Dividing by $h$ and taking $h \to 0$:

$$f_u(1,2,3) = \frac{8 + 3 + 9 + 12}{5} = \frac{32}{5}$$

---

**Example 7:** Find the rate of change of $f(x,y) = \sin(xy)$ at $(1, 0)$ in the direction making $60°$ with the positive $x$-axis. [▶ W9_L3 @ 14:41](https://www.youtube.com/watch?v=uhUqybTaGns&t=881)

**Solution:** The unit vector is $u = (\cos 60°, \sin 60°) = \left(\frac{1}{2}, \frac{\sqrt{3}}{2}\right)$.

Define $g(h) = \sin\!\left[\left(1 + \frac{h}{2}\right)\!\left(\frac{\sqrt{3}}{2}h\right)\right]$. Differentiating with respect to $h$ using the chain and product rules:

$$g'(h) = \cos\!\left[\left(1 + \tfrac{h}{2}\right)\tfrac{\sqrt{3}h}{2}\right] \cdot \left[\tfrac{\sqrt{3}h}{2} \cdot \tfrac{1}{2} + \left(1 + \tfrac{h}{2}\right)\cdot\tfrac{\sqrt{3}}{2}\right]$$

Setting $h = 0$:

$$g'(0) = \cos(0) \cdot \frac{\sqrt{3}}{2} = \frac{\sqrt{3}}{2}$$

### Properties of Directional Derivatives

The following properties hold whenever all relevant directional derivatives exist at the point $\widetilde{a}$ in the direction of the unit vector $u$:

| Property | Formula |
|----------|---------|
| **Linearity** | $(cf + g)_u(\widetilde{a}) = c\,f_u(\widetilde{a}) + g_u(\widetilde{a})$ |
| **Product rule** | $(fg)_u(\widetilde{a}) = f_u(\widetilde{a})\,g(\widetilde{a}) + f(\widetilde{a})\,g_u(\widetilde{a})$ |
| **Quotient rule** | $\left(\frac{f}{g}\right)_u(\widetilde{a}) = \frac{f_u(\widetilde{a})\,g(\widetilde{a}) - f(\widetilde{a})\,g_u(\widetilde{a})}{[g(\widetilde{a})]^2}$, provided $g(\widetilde{a}) \neq 0$ |

These follow directly from the corresponding single-variable derivative rules applied to $g(h) = f(\widetilde{a} + hu)$.

### A Cautionary Example

**Example 8:** Consider the piecewise function from Example 4:

$$f(x,y) = \begin{cases} \frac{xy}{x^2 + y^2} & (x,y) \neq (0,0) \\ 0 & (x,y) = (0,0) \end{cases}$$

At $(0,0)$, for a unit vector $u = (u_1, u_2)$: [▶ W9_L3 @ 34:26](https://www.youtube.com/watch?v=uhUqybTaGns&t=2066)

$$f_u(0,0) = \lim_{h \to 0} \frac{f(hu_1, hu_2)}{h} = \lim_{h \to 0} \frac{h^2 u_1 u_2}{h^2(u_1^2 + u_2^2)} \cdot \frac{1}{h} = \lim_{h \to 0} \frac{u_1 u_2}{h}$$

(using $u_1^2 + u_2^2 = 1$). This limit **does not exist** whenever both $u_1 \neq 0$ and $u_2 \neq 0$.

- If $u_1 = 0$ or $u_2 = 0$ (i.e., along the coordinate axes), the directional derivative is $0$.
- In **every other direction**, the directional derivative fails to exist.

This shows that partial derivatives can exist at a point even when most directional derivatives do not.

---

## 5. The Gradient Vector

The gradient packages all partial derivative information into a single vector. It is one of the most important objects in multivariable calculus and its applications.

### Definition

Let $f(x_1, x_2, \ldots, x_n)$ be defined on a domain $D \subseteq \mathbb{R}^n$ containing an open ball around $\widetilde{a}$. Suppose all partial derivatives of $f$ at $\widetilde{a}$ exist. The **gradient vector of $f$ at $\widetilde{a}$** is [▶ W9_L6 @ 10:06](https://www.youtube.com/watch?v=2eYER90_4wA&t=606)

$$\nabla f(\widetilde{a}) = \left(\frac{\partial f}{\partial x_1}(\widetilde{a}),\; \frac{\partial f}{\partial x_2}(\widetilde{a}),\; \ldots,\; \frac{\partial f}{\partial x_n}(\widetilde{a})\right)$$

This is a vector in $\mathbb{R}^n$. It is also written $\text{grad}\,f(\widetilde{a})$ or $\nabla f(\widetilde{a})$, where the symbol $\nabla$ is called **nabla** (or "del").

> **Clarification:** Depending on context, the gradient may be written as a row vector or column vector. The mathematical content is the same; the choice is dictated by how it will be used (e.g., row for dot products written left-to-right, column for matrix multiplication).

### The Gradient Function

The **gradient function** of $f$ is the vector-valued function [▶ W9_L6 @ 12:44](https://www.youtube.com/watch?v=2eYER90_4wA&t=764)

$$\nabla f : D' \subseteq D \to \mathbb{R}^n, \qquad \widetilde{x} \mapsto \nabla f(\widetilde{x})$$

where $D'$ is the set of points in $D$ at which **all** partial derivatives exist. Note the important shift: $f$ is scalar-valued ($\mathbb{R}^n \to \mathbb{R}$), but $\nabla f$ is vector-valued ($\mathbb{R}^n \to \mathbb{R}^n$).

### Worked Examples

**Example 9:** $f(x,y) = \sin(xy)$. [▶ W9_L6 @ 14:18](https://www.youtube.com/watch?v=2eYER90_4wA&t=858)

**Solution:**

$$\nabla f(x,y) = \left(y\cos(xy),\; x\cos(xy)\right)$$

Evaluating at specific points:

$$\nabla f(0,0) = (0, 0), \qquad \nabla f(\pi, 1) = (\cos\pi,\; \pi\cos\pi) = (-1, -\pi)$$

---

**Example 10:** $f(x,y,z) = x^2 + y^2 + z^2$.

**Solution:**

$$\nabla f(x,y,z) = (2x, 2y, 2z)$$

At $(1,2,3)$: $\nabla f(1,2,3) = (2, 4, 6)$.

Note that $\nabla f(x,y,z) = 2(x,y,z)$, so the gradient at any point is a vector pointing **radially outward** from the origin, with magnitude $2\|\widetilde{x}\|$.

---

**Example 11:** $f(x,y,z) = xy + yz + zx$.

**Solution:**

$$\nabla f(x,y,z) = (y+z,\; x+z,\; x+y)$$

---

**Example 12:** The piecewise function from Example 4.

**Solution:**

$$\nabla f(x,y) = \begin{cases} \displaystyle\frac{1}{(x^2+y^2)^2}\left(x^3 - xy^2,\; y^3 - x^2y\right) & (x,y) \neq (0,0) \\[8pt] (0,0) & (x,y) = (0,0) \end{cases}$$

The gradient exists everywhere, but as we will see, its behaviour at the origin is crucial.

### Properties of the Gradient

These follow directly from the corresponding rules for partial derivatives. [▶ W9_L6 @ 21:55](https://www.youtube.com/watch?v=2eYER90_4wA&t=1315)

| Rule | Formula |
|------|---------|
| **Linearity** | $\nabla(cf + g) = c\,\nabla f + \nabla g$ |
| **Product rule** | $\nabla(fg) = g\,\nabla f + f\,\nabla g$ |
| **Quotient rule** | $\nabla\!\left(\frac{f}{g}\right) = \frac{g\,\nabla f - f\,\nabla g}{g^2}$, provided $g \neq 0$ |

Here the right-hand sides involve scalar multiplication and vector addition in $\mathbb{R}^n$, exactly as studied in [[11 - INNER PRODUCTS]]. These rules mirror the single-variable derivative rules — indeed, the gradient can be viewed as the natural generalisation of the derivative to several variables.

---

## 6. Directional Derivatives in Terms of the Gradient

Computing directional derivatives from the limit definition is tedious (as the examples in Section 4 showed). The following theorem provides a far easier method, using the gradient and the dot product.

### The Fundamental Theorem

**Theorem.** Let $f$ be defined on a domain $D \subseteq \mathbb{R}^n$ containing an open ball around $\widetilde{a}$. Suppose $\nabla f$ exists and is **continuous** on some open ball around $\widetilde{a}$. Then for every unit vector $u \in \mathbb{R}^n$, the directional derivative $f_u(\widetilde{a})$ exists and equals [▶ W9_L6 @ 25:42](https://www.youtube.com/watch?v=2eYER90_4wA&t=1542)

$$\boxed{f_u(\widetilde{a}) = \nabla f(\widetilde{a}) \cdot u}$$

where $\cdot$ denotes the standard dot product in $\mathbb{R}^n$.

This is one of the central results of multivariable calculus. It says:

> **The directional derivative equals the dot product of the gradient with the direction vector.**

### Proof Sketch

For a function of two variables $f(x,y)$ at a point $(a,b)$ with $u = (u_1, u_2)$:

$$f_u(a,b) = \lim_{h \to 0} \frac{f(a + hu_1, b + hu_2) - f(a,b)}{h}$$

Add and subtract $f(a + hu_1, b)$:

$$= \lim_{h \to 0} \left[\frac{f(a+hu_1, b+hu_2) - f(a+hu_1, b)}{h} + \frac{f(a+hu_1, b) - f(a,b)}{h}\right]$$

The second fraction equals $\frac{f(a+hu_1, b) - f(a,b)}{hu_1} \cdot u_1$, which tends to $\frac{\partial f}{\partial x}(a,b) \cdot u_1$ as $h \to 0$.

For the first fraction, by the Mean Value Theorem there exists a value $c_h$ between $b$ and $b + hu_2$ such that

$$f(a+hu_1, b+hu_2) - f(a+hu_1, b) = \frac{\partial f}{\partial y}(a+hu_1, c_h) \cdot hu_2$$

Dividing by $h$ gives $\frac{\partial f}{\partial y}(a+hu_1, c_h) \cdot u_2$. As $h \to 0$, continuity of $\frac{\partial f}{\partial y}$ ensures this tends to $\frac{\partial f}{\partial y}(a,b) \cdot u_2$.

Therefore:

$$f_u(a,b) = \frac{\partial f}{\partial x}(a,b)\, u_1 + \frac{\partial f}{\partial y}(a,b)\, u_2 = \nabla f(a,b) \cdot u$$

> **Clarification:** The hypothesis that $\nabla f$ is **continuous** (not merely existent) is essential. It is this continuity that allows us to interchange limits in the proof. The cautionary Example 8 shows what can go wrong without it.

### Worked Examples Using the Formula

**Example 13:** $f(x,y) = x + y$, arbitrary unit vector $u = (u_1, u_2)$. [▶ W9_L6 @ 32:06](https://