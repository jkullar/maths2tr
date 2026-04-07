---
id: "13"
number: 13
title: "MULTIVARIABLE FUNCTIONS"
section: "Weeks 9–11 · Multivariable Calculus"
---
# MULTIVARIABLE FUNCTIONS

This file introduces **multivariable functions** — functions whose inputs live in $\mathbb{R}^n$ rather than on the real line. We cover the classification into scalar-valued and vector-valued functions, how to specify their domains and ranges, how to visualise them via graphs and level sets, and how to extend the fundamental notions of **limits** and **continuity** from single-variable calculus to higher dimensions. These ideas form the foundation for all of multivariable calculus: partial derivatives, gradients, optimisation, and integration over regions in $\mathbb{R}^n$ all depend on a solid understanding of the material here.

Prerequisites: familiarity with functions of one variable (polynomials, trigonometric, exponential, logarithmic), basic properties of $\mathbb{R}^n$ as a vector space (see [[5 - VECTORS AND SPACES]]), and single-variable limits and continuity.

---

## 1. From One Variable to Several Variables

### Recall: Functions of One Variable

A **function of one variable** is a map $f: D \to \mathbb{R}$, where $D \subseteq \mathbb{R}$. For each input $x \in D$, the function produces a single real number $f(x)$. Standard families include: [▶ W9_L1 @ 00:44](https://www.youtube.com/watch?v=MfrAPZRrqxw&t=44)

| Family | Form | Domain notes |
|---|---|---|
| Linear | $f(x) = ax + b$ | All of $\mathbb{R}$ |
| Polynomial | $f(x) = a_nx^n + \cdots + a_1x + a_0$ | All of $\mathbb{R}$ |
| Rational | $f(x) = p(x)/q(x)$, polynomials $p,q$ | $\{x \in \mathbb{R} : q(x) \neq 0\}$ |
| Trigonometric | $\sin x,\;\cos x,\;\tan x, \ldots$ | Varies ($\tan x$ excludes odd multiples of $\pi/2$) |
| Exponential | $f(x) = e^x$ | All of $\mathbb{R}$ |
| Logarithmic | $f(x) = \ln x$ | $(0, \infty)$ |

New functions can be built from these by **arithmetic combinations** (sums, differences, products, quotients where the denominator is nonzero) and **compositions** (e.g. $\ln(x^2 + 1)$, $e^{\sin x}$), provided domains are compatible.

### Why Several Variables?

In applications — data science, physics, economics — quantities almost always depend on more than one input. Temperature depends on latitude, longitude, and altitude; a cost function in machine learning depends on many parameters simultaneously. We therefore need a calculus that handles functions of $n$ variables, where $n$ can be $2, 3$, or much larger.

---

## 2. Scalar-Valued Multivariable Functions

A **scalar-valued multivariable function** is a function [▶ W9_L1 @ 04:16](https://www.youtube.com/watch?v=MfrAPZRrqxw&t=256)

$$f: D \to \mathbb{R}, \quad D \subseteq \mathbb{R}^n, \quad n > 1.$$

The input is a point (or vector) $\tilde{x} = (x_1, x_2, \ldots, x_n) \in \mathbb{R}^n$ and the output is a single real number $f(\tilde{x}) \in \mathbb{R}$.

> **Notation convention.** Throughout these notes we write $\tilde{x}$ (or sometimes $\mathbf{x}$) to denote an element of $\mathbb{R}^n$ when we do not wish to spell out all $n$ coordinates. So $f(\tilde{x})$ means $f(x_1, x_2, \ldots, x_n)$.

### Standard Families in Several Variables

**Linear functions.** A linear function $T: \mathbb{R}^n \to \mathbb{R}$ has the form

$$T(x_1, x_2, \ldots, x_n) = a_1 x_1 + a_2 x_2 + \cdots + a_n x_n$$

for fixed scalars $a_1, \ldots, a_n \in \mathbb{R}$. This is a $1 \times n$ matrix (a row vector) acting on a column vector — a concept studied in detail in [[5 - VECTORS AND SPACES]].

**Polynomial functions.** A polynomial in $n$ variables is a finite sum of **monomials** $c \, x_1^{\alpha_1} x_2^{\alpha_2} \cdots x_n^{\alpha_n}$ where $c \in \mathbb{R}$ and each $\alpha_i$ is a non-negative integer.

**Example:**
$$f(x_1, x_2, x_3) = x_1 x_2 x_3 + x_1^2 x_2^3 x_3^4 - x_1^5 x_3^6$$
is a polynomial in three variables. Its **total degree** is the maximum of $1{+}1{+}1 = 3$, $2{+}3{+}4 = 9$, and $5{+}0{+}6 = 11$, which is $11$.

**Rational functions.** A quotient $p(\tilde{x})/q(\tilde{x})$ of two polynomials, defined wherever $q(\tilde{x}) \neq 0$.

**Compositions and combinations.** Just as in one variable, we can build new functions by applying known single-variable functions to multivariable expressions:

| Function | Expression | Domain restriction |
|---|---|---|
| $f(x,y) = \sin(x^2 + y^2)$ | composition of $g(x,y)=x^2+y^2$ with $\sin$ | $\mathbb{R}^2$ |
| $f(x,y) = \ln(x^2 + y^2)$ | composition with $\ln$ | $\mathbb{R}^2 \setminus \{(0,0)\}$ |
| $f(x,y) = \frac{1}{2\pi}\,e^{-(x^2+y^2)/2}$ | standard bivariate normal density | $\mathbb{R}^2$ |
| $f(x,y) = \frac{xy}{x^2 + y^2}$ | rational function | $\mathbb{R}^2 \setminus \{(0,0)\}$ |

**Piecewise-defined functions.** Functions may be defined by different expressions on different regions of $\mathbb{R}^n$.

**Example (Uniform density on the unit square):**
$$f(x,y) = \begin{cases} 1 & \text{if } 0 \le x \le 1 \text{ and } 0 \le y \le 1, \\ 0 & \text{otherwise.} \end{cases}$$

---

## 3. Vector-Valued Multivariable Functions

A **vector-valued multivariable function** is a function [▶ W9_L1 @ 06:51](https://www.youtube.com/watch?v=MfrAPZRrqxw&t=411)

$$f: D \to \mathbb{R}^m, \quad D \subseteq \mathbb{R}^n, \quad n > 1, \; m > 1.$$

Such a function can be written in terms of its **component functions** $f_1, f_2, \ldots, f_m$, each of which is a scalar-valued multivariable function:

$$f(\tilde{x}) = \bigl(f_1(\tilde{x}),\; f_2(\tilde{x}),\; \ldots,\; f_m(\tilde{x})\bigr).$$

**Example:**
$$f(x, y, z) = \bigl(x^2 + y^2,\; y^2 + z^2,\; z^2 + x^2\bigr)$$
is a function $f: \mathbb{R}^3 \to \mathbb{R}^3$ with component functions $f_1(x,y,z) = x^2+y^2$, $f_2(x,y,z) = y^2+z^2$, $f_3(x,y,z) = z^2+x^2$.

**Example (mixed composition):**
$$f(x,y,z) = \bigl(\sin x \cos y,\; \tan(y+z),\; \ln(x^2+y^2+z^2),\; e^{xyz}\bigr)$$
is a function from a domain $D \subseteq \mathbb{R}^3$ to $\mathbb{R}^4$. The domain $D$ must exclude points where $\tan(y+z)$ is undefined (i.e. $y+z \neq (2k+1)\pi/2$ for integer $k$) and where $\ln(x^2+y^2+z^2)$ is undefined (i.e. $(x,y,z) \neq (0,0,0)$).

### Terminology Summary

A **multivariable function** (or **function of several variables**) is any function $f: D \to \mathbb{R}^m$ where $D \subseteq \mathbb{R}^n$ with $n > 1$. If $m = 1$, we call it scalar-valued; if $m > 1$, we call it vector-valued.

---

## 4. Domain and Range

### Domain

The **domain** of a multivariable function $f$ is the set $D \subseteq \mathbb{R}^n$ on which $f$ is defined. When no domain is explicitly stated, the **natural domain** is the largest subset of $\mathbb{R}^n$ for which the defining expression makes sense.

**Example:** For $f(x,y) = \dfrac{xy}{x^2 + y^2}$, the natural domain is $\mathbb{R}^2 \setminus \{(0,0)\}$, since the denominator vanishes only at the origin.

**Example:** For $f(x,y) = \sqrt{1 - x^2 - y^2}$, we need $1 - x^2 - y^2 \ge 0$, so the domain is the closed unit disk $\{(x,y) \in \mathbb{R}^2 : x^2 + y^2 \le 1\}$.

### Range

The **range** (or **image**) of $f$ is the set

$$\text{range}(f) = \{f(\tilde{x}) : \tilde{x} \in D\} \subseteq \mathbb{R}^m.$$

**Example:** For $f(x,y) = x^2 + y^2$, the domain is $\mathbb{R}^2$ and the range is $[0, \infty)$, since $x^2 + y^2 \ge 0$ and every non-negative value is attained (e.g. $f(r,0) = r^2$ for $r \ge 0$).

**Example:** For $f(x,y) = \dfrac{1}{2\pi} e^{-(x^2+y^2)/2}$, the range is $(0, \frac{1}{2\pi}]$ since the exponential is always positive, achieves its maximum $\frac{1}{2\pi}$ at the origin, and approaches $0$ as $x^2+y^2 \to \infty$ but never equals $0$.

> **Clarification:** The domain of a multivariable function is a subset of $\mathbb{R}^n$ — a region in the plane, in space, etc. — not an interval on the real line. When defining functions piecewise, the "pieces" are regions in $\mathbb{R}^n$, not intervals.

---

## 5. Arithmetic Operations and Composition

### Arithmetic on Multivariable Functions

Let $f, g: D \to \mathbb{R}^m$ be multivariable functions defined on the same domain $D \subseteq \mathbb{R}^n$, and let $c \in \mathbb{R}$. [▶ W9_L1 @ 22:01](https://www.youtube.com/watch?v=MfrAPZRrqxw&t=1321)

| Operation | Definition | Conditions |
|---|---|---|
| **Sum** | $(f+g)(\tilde{x}) = f(\tilde{x}) + g(\tilde{x})$ | Vector addition in $\mathbb{R}^m$ |
| **Scalar multiple** | $(cf)(\tilde{x}) = c \cdot f(\tilde{x})$ | Scalar multiplication in $\mathbb{R}^m$ |
| **Product** ($m=1$ only) | $(fg)(\tilde{x}) = f(\tilde{x}) \cdot g(\tilde{x})$ | Multiplication in $\mathbb{R}$ |
| **Quotient** ($m=1$ only) | $(f/g)(\tilde{x}) = f(\tilde{x}) / g(\tilde{x})$ | Defined on $\{\tilde{x} \in D : g(\tilde{x}) \neq 0\}$ |

> **Clarification:** Products and quotients of functions are defined only for scalar-valued functions ($m = 1$), because multiplication of arbitrary vectors in $\mathbb{R}^m$ (for $m > 1$) is not defined in the usual sense.

### Composition

If $f: D \to \mathbb{R}^m$ (with $D \subseteq \mathbb{R}^n$) and $g: E \to \mathbb{R}^p$ (with $E \subseteq \mathbb{R}^m$) are such that the range of $f$ is contained in $E$, then the **composition** $g \circ f: D \to \mathbb{R}^p$ is defined by [▶ W9_L1 @ 24:06](https://www.youtube.com/watch?v=MfrAPZRrqxw&t=1446)

$$(g \circ f)(\tilde{x}) = g\bigl(f(\tilde{x})\bigr).$$

**Example:** Let $f(x,y) = x^2 + y^2$ (a function $\mathbb{R}^2 \to \mathbb{R}$) and $g(t) = \sqrt{t}$ (a function $[0,\infty) \to \mathbb{R}$). Since the range of $f$ is $[0,\infty) \subseteq [0,\infty)$, the composition is well defined:

$$(g \circ f)(x,y) = \sqrt{x^2 + y^2}.$$

This gives the Euclidean distance from the origin — the "radius" in polar coordinates.

---

## 6. Curves in $\mathbb{R}^m$

A **curve in $\mathbb{R}^m$** is the range of a function $\gamma: I \to \mathbb{R}^m$, where $I \subseteq \mathbb{R}$ is an interval. The function $\gamma$ is called a **parametrisation** of the curve, and the variable $t \in I$ is the **parameter**. [▶ W9_L1 @ 26:35](https://www.youtube.com/watch?v=MfrAPZRrqxw&t=1595)

This is the case $n = 1$, $m > 1$ — complementary to the multivariable functions we are mainly studying (where $n > 1$).

### Examples

**Lines.** A line through point $\mathbf{p}$ in direction $\mathbf{d}$ is parametrised by $\gamma(t) = \mathbf{p} + t\mathbf{d}$.

**Circle.** The unit circle in $\mathbb{R}^2$: $\gamma(t) = (\cos t, \sin t)$ for $t \in [0, 2\pi)$.

**Ellipse.** $\gamma(t) = (a\cos t,\; b\sin t)$ traces the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$.

**Helix.** $\gamma(t) = (\cos t, \sin t, t)$ for $t \in \mathbb{R}$ traces a helix in $\mathbb{R}^3$ — a curve that spirals upward around the $z$-axis.

> **Clarification (parametric vs. implicit).** A curve can be described **parametrically** (as above, via $\gamma(t)$) or **implicitly** (via an equation such as $x^2 + y^2 = 1$). One can often convert between the two representations.

---

## 7. Visualisation

### Graphs of Functions $f: \mathbb{R}^2 \to \mathbb{R}$

The **graph** of a function $f: D \to \mathbb{R}^m$ is the set

$$\Gamma_f = \{(\tilde{x},\, f(\tilde{x})) : \tilde{x} \in D\} \subseteq \mathbb{R}^{n+m}.$$

For a scalar-valued function $f: D \subseteq \mathbb{R}^2 \to \mathbb{R}$, the graph lives in $\mathbb{R}^3$ and can be visualised as a **surface** $z = f(x,y)$. This is the only case where direct graphing is feasible with our three-dimensional intuition. [▶ W9_L1 @ 16:18](https://www.youtube.com/watch?v=MfrAPZRrqxw&t=978)

**Example (Linear function):** $f(x,y) = ax + by$. The graph is the plane $z = ax + by$ passing through the origin.

**Example (Sine ripple):** $f(x,y) = \sin(x^2 + y^2)$. The value depends only on $r^2 = x^2 + y^2$, so the surface has **circular symmetry** about the $z$-axis. Moving outward from the origin, the height oscillates between $-1$ and $1$, creating a "ripple" pattern. The first peak ($z = 1$) occurs on the circle $x^2 + y^2 = \pi/2$.

**Example (Bivariate normal density):**
$$f(x,y) = \frac{1}{2\pi}\,e^{-(x^2+y^2)/2}.$$
This is a "bell-shaped" surface with a single maximum of $\frac{1}{2\pi}$ at the origin, decaying rapidly to $0$ in all directions.

**Example (Rational function with singularity):**
$$f(x,y) = \frac{xy}{x^2 + y^2}, \quad (x,y) \neq (0,0).$$
Near the origin, the surface exhibits different behaviour depending on the direction of approach — hills in some directions, troughs in others — foreshadowing the failure of the limit at the origin.

### Level Curves and Level Surfaces

When direct graphing is impossible (e.g. for functions $f: \mathbb{R}^3 \to \mathbb{R}$, whose graphs live in $\mathbb{R}^4$), we use **level sets**.

**Definition.** Let $f: D \subseteq \mathbb{R}^n \to \mathbb{R}$. For each constant $c \in \mathbb{R}$, the **level set** of $f$ at height $c$ is

$$L_c = \{\tilde{x} \in D : f(\tilde{x}) = c\}.$$

- When $n = 2$, these are called **level curves** (or **contour lines**). They are curves in the $xy$-plane.
- When $n = 3$, these are called **level surfaces**. They are surfaces in $xyz$-space.

**Example:** For $f(x,y) = x^2 + y^2$, the level curve at height $c > 0$ is the circle $x^2 + y^2 = c$, i.e. a circle of radius $\sqrt{c}$. At $c = 0$ the level set is the single point $(0,0)$. For $c < 0$ the level set is empty.

**Example:** For $f(x,y,z) = x^2 + y^2 + z^2$, the level surface at height $c > 0$ is the sphere of radius $\sqrt{c}$. Topographic maps and weather charts (isobars, isotherms) are everyday examples of level curves.

> **Clarification:** A level curve of $f(x,y)$ is **not** the same as the graph of $f$. The graph lives in $\mathbb{R}^3$; a level curve lives in $\mathbb{R}^2$ and represents all points where $f$ takes a particular constant value.

---

## 8. Limits of Sequences in $\mathbb{R}^p$

Before defining limits of multivariable functions, we need limits of **sequences** in higher-dimensional spaces. [▶ W9_L4 @ 03:54](https://www.youtube.com/watch?v=Uvv8-Ujgqjo&t=234)

### Definition

Let $(\tilde{a}_n)_{n \ge 1}$ be a sequence in $\mathbb{R}^p$, with coordinate representation

$$\tilde{a}_n = (a_{n1},\, a_{n2},\, \ldots,\, a_{np}).$$

We say $\tilde{a}_n$ **converges** to $\tilde{a} = (a_1, a_2, \ldots, a_p) \in \mathbb{R}^p$, and write $\tilde{a}_n \to \tilde{a}$ as $n \to \infty$, if **each coordinate sequence** converges to the corresponding coordinate:

$$a_{ni} \to a_i \quad \text{as } n \to \infty, \quad \text{for every } i = 1, 2, \ldots, p.$$

In other words, convergence in $\mathbb{R}^p$ reduces to $p$ separate convergences in $\mathbb{R}$.

A sequence is **divergent** if it is not convergent — which happens when at least one coordinate sequence fails to converge.

### Worked Examples

**Example 1:** $\tilde{a}_n = \left(\dfrac{1}{n},\; n\sin\dfrac{1}{n}\right)$ in $\mathbb{R}^2$. [▶ W9_L4 @ 07:57](https://www.youtube.com/watch?v=Uvv8-Ujgqjo&t=477)

**Solution:** First coordinate: $1/n \to 0$. Second coordinate: $n\sin(1/n) = \dfrac{\sin(1/n)}{1/n} \to 1$ as $n \to \infty$ (by the standard limit $\lim_{u \to 0} \frac{\sin u}{u} = 1$). Therefore $\tilde{a}_n \to (0, 1)$.

**Example 2:** $\tilde{a}_n = \bigl((-1)^n,\; n\sin(1/n)\bigr)$ in $\mathbb{R}^2$.

**Solution:** The first coordinate $(-1)^n$ oscillates between $-1$ and $1$ and does not converge. Therefore $\tilde{a}_n$ **diverges**, even though the second coordinate converges.

**Example 3:** $\tilde{a}_n = \left(\dfrac{\cos n}{n},\;\displaystyle\sum_{i=1}^{n}\dfrac{5}{i!},\;\displaystyle\sum_{i=0}^{n}\dfrac{1}{i!},\; n\cos\dfrac{1}{n}\right)$ in $\mathbb{R}^4$.

**Solution:**
- Coordinate 1: $|\cos n / n| \le 1/n \to 0$. Limit: $0$.
- Coordinate 2: $5\sum_{i=1}^{n} 1/i! \to 5(e - 1)$.
- Coordinate 3: $\sum_{i=0}^{n} 1/i! \to e$.
- Coordinate 4: $\cos(1/n) \to 1$ but is multiplied by $n \to \infty$, so $n\cos(1/n) \to \infty$. Diverges.

Since coordinate 4 diverges, the sequence in $\mathbb{R}^4$ **does not converge**.

---

## 9. Limits of Scalar-Valued Multivariable Functions

### Definition

Let $f: D \to \mathbb{R}$ be a scalar-valued multivariable function, with $D \subseteq \mathbb{R}^k$, and let $\tilde{a}$ be a point such that there exists at least one sequence in $D$ converging to $\tilde{a}$. We say that the **limit of $f$ at $\tilde{a}$ exists and equals $L \in \mathbb{R}$** if [▶ W9_L4 @ 14:01](https://www.youtube.com/watch?v=Uvv8-Ujgqjo&t=841)

$$\text{for every sequence } (\tilde{a}_n) \text{ in } D \text{ with } \tilde{a}_n \to \tilde{a}, \quad f(\tilde{a}_n) \to L.$$

We write

$$\lim_{\tilde{x} \to \tilde{a}} f(\tilde{x}) = L.$$

If no such $L$ exists, we say the **limit does not exist**.

> **Clarification:** The point $\tilde{a}$ need not belong to $D$ itself — we only require that $\tilde{a}$ can be approached by sequences from $D$. This mirrors single-variable calculus where we can discuss $\lim_{x \to 0} \frac{\sin x}{x}$ even though the function is undefined at $x = 0$.

### Basic Limits

For $\tilde{a} = (a_1, \ldots, a_k)$, the following limits hold directly from coordinate-wise convergence:

| Expression | Limit | Condition |
|---|---|---|
| $x_i^k$ | $a_i^k$ | $k \ge 0$ integer |
| $x_i^k$ (negative $k$) | $a_i^k$ | $a_i \neq 0$ |
| $e^{x_i}$ | $e^{a_i}$ | — |
| $\ln(x_i)$ | $\ln(a_i)$ | $a_i > 0$ |
| $\sin(x_i)$ | $\sin(a_i)$ | — |
| $\tan(x_i)$ | $\tan(a_i)$ | $a_i \in (-\pi/2, \pi/2)$ |

### Limit Laws

Let $f, g: D \to \mathbb{R}$ with $\lim_{\tilde{x}\to\tilde{a}} f(\tilde{x}) = F$ and $\lim_{\tilde{x}\to\tilde{a}} g(\tilde{x}) = G$, and let $c \in \mathbb{R}$. [▶ W9_L4 @ 17:13](https://www.youtube.com/watch?v=Uvv8-Ujgqjo&t=1033)

1. **Linearity:** $\displaystyle\lim_{\tilde{x}\to\tilde{a}} \bigl[c\,f(\tilde{x}) + g(\tilde{x})\bigr] = cF + G.$

2. **Product:** $\displaystyle\lim_{\tilde{x}\to\tilde{a}} \bigl[f(\tilde{x})\,g(\tilde{x})\bigr] = F \cdot G.$

3. **Quotient:** If $G \neq 0$, then $\displaystyle\lim_{\tilde{x}\to\tilde{a}} \frac{f(\tilde{x})}{g(\tilde{x})} = \frac{F}{G}.$

4. **Composition:** If $h: E \to \mathbb{R}$ is a single-variable function with $\lim_{u \to F} h(u) = L$, and the range of $f$ near $\tilde{a}$ lies in $E$, then [▶ W9_L4 @ 22:42](https://www.youtube.com/watch?v=Uvv8-Ujgqjo&t=1362)

$$\lim_{\tilde{x}\to\tilde{a}} h\bigl(f(\tilde{x})\bigr) = L.$$

5. **Sandwich (Squeeze) Principle:** If $f(\tilde{x}) \le h(\tilde{x}) \le g(\tilde{x})$ near $\tilde{a}$ and both $f$ and $g$ have limit $L$ at $\tilde{a}$, then $\lim_{\tilde{x}\to\tilde{a}} h(\tilde{x}) = L.$

### Worked Example: Polynomial

**Example:** Compute $\displaystyle\lim_{(x,y,z)\to(1,2,3)} \bigl(x^2 y^3 + y^3 z^2 + xyz\bigr)$.

**Solution:** Each monomial is a product of coordinate powers, and each coordinate limit can be substituted directly. By the product and sum rules:

$$= 1^2 \cdot 2^3 + 2^3 \cdot 3^2 + 1 \cdot 2 \cdot 3 = 8 + 72 + 6 = 86.$$

### Worked Example: Composition

**Example:** Compute $\displaystyle\lim_{(x,y,z)\to(1,2,3)} e^{xyz}$.

**Solution:** Write $e^{xyz} = h(f(x,y,z))$ where $f(x,y,z) = xyz$ and $h(u) = e^u$. By the product rule, $\lim f = 1 \cdot 2 \cdot 3 = 6$. By the composition rule, $\lim e^{xyz} = e^6$.

### When Substitution Fails

Substitution works whenever the function is built from polynomials, rational functions (with nonzero denominator at the limit point), and compositions with standard continuous functions. It **fails** when the expression yields an indeterminate form such as $\frac{0}{0}$.

**Example:** Consider $\displaystyle\lim_{(x,y)\to(0,0)} \frac{x^3 - y^2 x}{(x^2+y^2)^2}$. [▶ W9_L4 @ 26:53](https://www.youtube.com/watch?v=Uvv8-Ujgqjo&t=1613)

**Solution:** Direct substitution gives $\frac{0}{0}$. We test specific sequences.

*Along the $x$-axis* ($y = 0$): $f(1/n, 0) = \dfrac{(1/n)^3}{(1/n)^4} = n \to \infty