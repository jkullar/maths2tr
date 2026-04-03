

# MULTIVARIABLE LIMITS AND PATH TESTS

This file develops the core analytical tools for studying multivariable functions at a point: computing limits, detecting when limits fail to exist, verifying continuity, computing partial and directional derivatives from first principles, and connecting directional derivatives to the gradient via the dot-product theorem. These ideas underpin all of differential calculus in several variables — without a firm grasp of limits and their path-dependence, later topics such as differentiability, the chain rule, and optimisation cannot be placed on solid footing. Prerequisites are covered in [[13 - MULTIVARIABLE FUNCTIONS]] and [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]].

---

## 1. Partial Derivatives from First Principles

### 1.1 The Limit Definition

Recall from [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]] that the **partial derivative** of a scalar-valued function $f : \mathbb{R}^n \to \mathbb{R}$ with respect to its $i$-th variable at a point $\mathbf{a} = (a_1, \dots, a_n)$ is defined by

$$f_{x_i}(\mathbf{a}) \;=\; \frac{\partial f}{\partial x_i}(\mathbf{a}) \;=\; \lim_{h \to 0} \frac{f(a_1, \dots, a_i + h, \dots, a_n) - f(a_1, \dots, a_i, \dots, a_n)}{h}$$

provided this limit exists. [▶ MDS2_1 @ 00:15](https://www.youtube.com/watch?v=UJFe9JIBogc&t=15)

Only the $i$-th argument is perturbed by $h$; every other variable is held constant. This reduces the computation to a **single-variable limit** in the variable $h$.

### 1.2 Worked Example — Exponential Function

**Example:** Let $f(x,y) = e^{xy}$. Compute $f_x(x,y)$ and $f_y(x,y)$ using the limit definition.

**Solution (partial derivative with respect to $x$):**

$$f_x(x,y) = \lim_{h \to 0} \frac{f(x+h,\, y) - f(x,\,y)}{h} = \lim_{h \to 0} \frac{e^{(x+h)y} - e^{xy}}{h}$$

Factor out $e^{xy}$ (which does not depend on $h$): [▶ MDS2_1 @ 01:26](https://www.youtube.com/watch?v=UJFe9JIBogc&t=86)

$$= e^{xy} \lim_{h \to 0} \frac{e^{hy} - 1}{h}$$

To evaluate the remaining limit, multiply numerator and denominator by $y$ (treating $y$ as a constant with respect to $h$):

$$= e^{xy} \cdot y \cdot \lim_{h \to 0} \frac{e^{hy} - 1}{hy}$$

As $h \to 0$ we have $hy \to 0$, and by the standard single-variable result $\displaystyle\lim_{t \to 0}\frac{e^{t}-1}{t} = 1$, the limit equals $1$. Therefore:

$$\boxed{f_x(x,y) = y\, e^{xy}}$$

**Solution (partial derivative with respect to $y$):**

By the definition:

$$f_y(x,y) = \lim_{h \to 0} \frac{f(x,\, y+h) - f(x,\,y)}{h} = \lim_{h \to 0} \frac{e^{x(y+h)} - e^{xy}}{h}$$

The calculation is identical with the roles of $x$ and $y$ interchanged:

$$= e^{xy} \cdot x \cdot \lim_{h \to 0}\frac{e^{hx}-1}{hx} = x\,e^{xy}$$

$$\boxed{f_y(x,y) = x\, e^{xy}}$$

> **Clarification:** Notice that $f_x$ treats $y$ as a constant and differentiates with respect to $x$; the result therefore contains $y$ as a multiplicative factor. Conversely $f_y$ treats $x$ as constant, producing $x$ as a factor. This pattern — "differentiate with respect to one variable while freezing the others" — is the hallmark of partial differentiation. [▶ MDS2_1 @ 04:05](https://www.youtube.com/watch?v=UJFe9JIBogc&t=245)

### 1.3 Summary Table — First-Principles Computation

| Step | Action |
|------|--------|
| 1 | Write the limit definition, perturbing only the variable of interest by $h$ |
| 2 | Substitute the explicit formula for $f$ |
| 3 | Factor out every term that does not depend on $h$ |
| 4 | Reduce to a known single-variable limit in $h$ |
| 5 | Evaluate and simplify |

---

## 2. Multivariable Limits

### 2.1 Recall of the Definition

For a function $f : D \subseteq \mathbb{R}^p \to \mathbb{R}$ and a limit point $\mathbf{a}$ of $D$, we say

$$\lim_{\mathbf{x} \to \mathbf{a}} f(\mathbf{x}) = L$$

if for every $\varepsilon > 0$ there exists $\delta > 0$ such that

$$0 < \|\mathbf{x} - \mathbf{a}\| < \delta \;\Longrightarrow\; |f(\mathbf{x}) - L| < \varepsilon.$$

A fuller discussion of this $\varepsilon$-$\delta$ formulation and basic limit laws appears in [[13 - MULTIVARIABLE FUNCTIONS]].

### 2.2 Why Multivariable Limits Are Harder

In single-variable calculus, $x$ can approach $a$ from only **two directions** (left and right). In $\mathbb{R}^2$, the point $(x,y)$ can approach $(a,b)$ along **infinitely many paths**: straight lines of every slope, parabolas, spirals, etc. For the limit $L$ to exist, $f$ must tend to the **same value** $L$ along **every** path. This makes proving existence harder — and opens up a powerful strategy for proving non-existence.

---

## 3. The Path Test for Non-Existence of Limits

### 3.1 Statement of the Path Test

**Theorem (Path Test).** Let $f : D \subseteq \mathbb{R}^p \to \mathbb{R}$ and let $\mathbf{a}$ be a limit point of $D$. If there exist **two paths** $\boldsymbol{\gamma}_1(t)$ and $\boldsymbol{\gamma}_2(t)$ with $\boldsymbol{\gamma}_i(t) \to \mathbf{a}$ as $t \to 0$ (or $t \to \infty$) such that

$$\lim_{t \to 0} f(\boldsymbol{\gamma}_1(t)) \neq \lim_{t \to 0} f(\boldsymbol{\gamma}_2(t)),$$

then $\displaystyle\lim_{\mathbf{x}\to\mathbf{a}} f(\mathbf{x})$ **does not exist**.

*Proof sketch.* If the limit $L$ existed, then composing with any continuous path through $\mathbf{a}$ would give $L$. Two different values along two paths contradicts uniqueness of $L$. $\square$

> **Clarification:** The path test can only **disprove** the existence of a limit. If every path you try yields the same value, that does **not** prove the limit exists — there may be an untried path giving a different value. To **prove** existence, one must use an $\varepsilon$-$\delta$ argument, the squeeze theorem, or conversion to polar coordinates.

### 3.2 Common Path Families

When testing limits as $(x,y) \to (0,0)$, the following families of paths are most useful:

| Path | Parametrisation | When to try |
|------|----------------|-------------|
| Along the $x$-axis | $y = 0$ | Always try first |
| Along the $y$-axis | $x = 0$ | Always try first |
| Straight lines through origin | $y = mx$ | When degrees of numerator and denominator match |
| Parabolic paths | $x = y^2$ or $y = x^2$ | When straight lines all give the same limit |
| Higher-order curves | $x = y^k$ or $y = x^k$ | When lower-order paths are inconclusive |

### 3.3 A Degree Heuristic

A useful (informal) guide: given a rational function $f(x,y) = \frac{p(x,y)}{q(x,y)}$ where $p$ and $q$ are homogeneous polynomials:

- If $\deg(p) > \deg(q)$, the limit at the origin is often $0$.
- If $\deg(p) = \deg(q)$, try straight-line paths $y = mx$; the limit frequently depends on $m$, so it does not exist.
- If $\deg(p) < \deg(q)$, the function blows up and the limit does not exist (or is $\pm\infty$).

This heuristic guides path selection but is **not** a theorem — always verify rigorously.

### 3.4 Worked Example — Straight-Line Path Test

**Example:** Determine whether $\displaystyle\lim_{(x,y)\to(0,0)} \frac{x^2 y}{x^3 + y^3}$ exists. [▶ MDS2_2 @ 00:15](https://www.youtube.com/watch?v=wj73NcPIeZE&t=15)

**Solution:**

Both numerator and denominator have degree 3, so the degree heuristic suggests trying straight-line paths.

**Path 1:** $y = mx$ (any straight line through the origin). Substituting:

$$\frac{x^2(mx)}{x^3 + (mx)^3} = \frac{mx^3}{x^3(1 + m^3)} = \frac{m}{1 + m^3}$$

provided $m \neq -1$. This expression is **independent of $x$**, so [▶ MDS2_2 @ 01:34](https://www.youtube.com/watch?v=wj73NcPIeZE&t=94)

$$\lim_{\substack{(x,y)\to(0,0)\\y=mx}} f(x,y) = \frac{m}{1+m^3}.$$

**Path 1a:** $m = 0$ (along the $x$-axis): limit $= 0$.

**Path 1b:** $m = 1$ (along $y = x$): limit $= \dfrac{1}{2}$.

Since $0 \neq \dfrac{1}{2}$, the two paths yield different limiting values.

$$\boxed{\lim_{(x,y)\to(0,0)} \frac{x^2 y}{x^3 + y^3} \text{ does not exist.}}$$

> **Clarification:** We do **not** need to check every value of $m$. Finding **any two** values of $m$ that give different results is sufficient. [▶ MDS2_2 @ 02:03](https://www.youtube.com/watch?v=wj73NcPIeZE&t=123)

---

## 4. When Straight Lines Are Not Enough — Parabolic Path Test

### 4.1 Motivation

Sometimes every straight line through $\mathbf{a}$ gives the **same** limiting value, yet the limit still does not exist because a curved path produces a different value. This is a subtlety unique to multivariable calculus.

### 4.2 Worked Example — All Straight Lines Agree, but the Limit Does Not Exist

**Example:** Consider the piecewise function [▶ MDS2_3 @ 00:14](https://www.youtube.com/watch?v=SEevQPGIJSE&t=14)

$$f(x,y) = \begin{cases} \dfrac{xy^2}{x^2 + y^4}, & (x,y) \neq (0,0), \\[6pt] 0, & (x,y) = (0,0). \end{cases}$$

Determine whether $\displaystyle\lim_{(x,y)\to(0,0)} f(x,y)$ exists.

**Solution:**

**Step 1 — Along the axes.**

- Along the $x$-axis ($y = 0$): $f(x,0) = 0$ for all $x \neq 0$, so limit $= 0$. [▶ MDS2_3 @ 01:13](https://www.youtube.com/watch?v=SEevQPGIJSE&t=73)
- Along the $y$-axis ($x = 0$): $f(0,y) = 0$ for all $y \neq 0$, so limit $= 0$.

**Step 2 — Along arbitrary straight lines $y = mx$.**

$$f(x,mx) = \frac{x \cdot m^2 x^2}{x^2 + m^4 x^4} = \frac{m^2 x^3}{x^2(1 + m^4 x^2)} = \frac{m^2 x}{1 + m^4 x^2}$$

As $x \to 0$:

$$\lim_{x \to 0} \frac{m^2 x}{1 + m^4 x^2} = 0 \quad \text{for every } m.$$

So **every straight line** through the origin yields limit $0$. [▶ MDS2_3 @ 02:37](https://www.youtube.com/watch?v=SEevQPGIJSE&t=157)

**Step 3 — Along the parabola $x = y^2$.**

Substitute $x = y^2$ into the formula: [▶ MDS2_3 @ 03:47](https://www.youtube.com/watch?v=SEevQPGIJSE&t=227)

$$f(y^2, y) = \frac{y^2 \cdot y^2}{(y^2)^2 + y^4} = \frac{y^4}{y^4 + y^4} = \frac{y^4}{2y^4} = \frac{1}{2}.$$

Therefore

$$\lim_{\substack{(x,y)\to(0,0)\\x = y^2}} f(x,y) = \frac{1}{2} \neq 0.$$

The straight-line paths give $0$ while the parabolic path gives $\tfrac{1}{2}$.

$$\boxed{\lim_{(x,y)\to(0,0)} f(x,y) \text{ does not exist.}}$$

> **Clarification:** This example is a classic cautionary tale. Agreement along all straight lines is **necessary** but **not sufficient** for the limit to exist. Always consider curved paths when the degrees of numerator and denominator do not match in a way that straight-line substitution fully resolves. A useful rule of thumb: if substituting $y = mx$ causes terms to cancel completely (leaving a limit of $0$ regardless of $m$), try matching the dominant terms in the denominator. Here $x^2$ and $y^4$ have the same degree when $x \sim y^2$, which motivates the parabolic path.

---

## 5. Continuity at a Point for Multivariable Functions

### 5.1 Definition

A function $f : D \subseteq \mathbb{R}^p \to \mathbb{R}$ is **continuous at** $\mathbf{a} \in D$ if all three of the following conditions hold: [▶ MDS2_3 @ 00:37](https://www.youtube.com/watch?v=SEevQPGIJSE&t=37)

1. $f(\mathbf{a})$ is defined (i.e., $\mathbf{a} \in D$).
2. $\displaystyle\lim_{\mathbf{x} \to \mathbf{a}} f(\mathbf{x})$ exists.
3. $\displaystyle\lim_{\mathbf{x} \to \mathbf{a}} f(\mathbf{x}) = f(\mathbf{a})$.

If any one of these fails, $f$ is **discontinuous at** $\mathbf{a}$.

### 5.2 Strategy for Checking Continuity

| Step | Question | If it fails |
|------|----------|-------------|
| 1 | Is $f(\mathbf{a})$ defined? | Not continuous (trivially) |
| 2 | Does the limit exist? Use path tests (Sections 3–4) | Not continuous |
| 3 | Does the limit equal $f(\mathbf{a})$? | Not continuous |

### 5.3 Worked Example — Discontinuity at the Origin

**Example:** Is the function from Section 4.2 continuous at the origin?

**Solution:** We have $f(0,0) = 0$ (given by the piecewise definition), but we showed in Section 4.2 that $\displaystyle\lim_{(x,y)\to(0,0)} f(x,y)$ does not exist. Therefore condition (2) fails, and

$$\boxed{f \text{ is not continuous at } (0,0).}$$

[▶ MDS2_3 @ 05:15](https://www.youtube.com/watch?v=SEevQPGIJSE&t=315)

### 5.4 Continuity and Algebraic Combinations

The following results, whose proofs rest on the corresponding limit laws (see [[13 - MULTIVARIABLE FUNCTIONS]]), are used constantly:

- If $f$ and $g$ are continuous at $\mathbf{a}$, then so are $f + g$, $f - g$, $fg$, and $f/g$ (provided $g(\mathbf{a}) \neq 0$).
- If $f$ is continuous at $\mathbf{a}$ and $\phi$ is a single-variable function continuous at $f(\mathbf{a})$, then $\phi \circ f$ is continuous at $\mathbf{a}$.
- Every polynomial in several variables is continuous on all of $\mathbb{R}^p$.
- Every rational function (ratio of polynomials) is continuous on its domain.

---

## 6. Directional Derivatives for Three-Variable Functions

### 6.1 Recall of the Definition

For a scalar-valued function $f : \mathbb{R}^n \to \mathbb{R}$ and a **unit vector** $\hat{\mathbf{u}} \in \mathbb{R}^n$, the **directional derivative** of $f$ at $\mathbf{a}$ in the direction $\hat{\mathbf{u}}$ is [▶ MDS2_4 @ 00:27](https://www.youtube.com/watch?v=qcT49XqFzXo&t=27)

$$D_{\hat{\mathbf{u}}}\, f(\mathbf{a}) = \lim_{h \to 0} \frac{f(\mathbf{a} + h\,\hat{\mathbf{u}}) - f(\mathbf{a})}{h}$$

provided the limit exists. A deeper discussion of the definition and its properties is in [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]].

> **Clarification:** The direction vector **must be a unit vector**. If the given vector $\mathbf{v}$ is not unit, normalise it first: $\hat{\mathbf{u}} = \dfrac{\mathbf{v}}{\|\mathbf{v}\|}$.

### 6.2 Worked Example — From the Definition

**Example:** Let $f(x,y,z) = x^2 y + y^2 z$. Compute the directional derivative of $f$ at a general point $(x,y,z)$ along $\mathbf{v} = (-1, 0, 1)$ using the limit definition. [▶ MDS2_4 @ 00:14](https://www.youtube.com/watch?v=qcT49XqFzXo&t=14)

**Solution:**

**Step 1 — Normalise $\mathbf{v}$.**

$$\|\mathbf{v}\| = \sqrt{(-1)^2 + 0^2 + 1^2} = \sqrt{2}$$

$$\hat{\mathbf{u}} = \frac{1}{\sqrt{2}}\begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}$$

[▶ MDS2_4 @ 02:17](https://www.youtube.com/watch?v=qcT49XqFzXo&t=137)

**Step 2 — Write $f(\mathbf{a} + h\hat{\mathbf{u}})$.**

$$f\!\left(x - \frac{h}{\sqrt{2}},\; y,\; z + \frac{h}{\sqrt{2}}\right) = \left(x - \frac{h}{\sqrt{2}}\right)^{\!2} y \;+\; y^2\!\left(z + \frac{h}{\sqrt{2}}\right)$$

**Step 3 — Expand.**

$$= \left(x^2 - \frac{2xh}{\sqrt{2}} + \frac{h^2}{2}\right)y + y^2 z + \frac{y^2 h}{\sqrt{2}}$$

$$= x^2 y - \frac{2xyh}{\sqrt{2}} + \frac{h^2 y}{2} + y^2 z + \frac{y^2 h}{\sqrt{2}}$$

**Step 4 — Subtract $f(x,y,z) = x^2 y + y^2 z$ and divide by $h$.**

$$\frac{f(\mathbf{a}+h\hat{\mathbf{u}})-f(\mathbf{a})}{h} = \frac{-\dfrac{2xyh}{\sqrt{2}} + \dfrac{h^2 y}{2} + \dfrac{y^2 h}{\sqrt{2}}}{h}$$

$$= -\frac{2xy}{\sqrt{2}} + \frac{hy}{2} + \frac{y^2}{\sqrt{2}}$$

**Step 5 — Take $h \to 0$.**

$$D_{\hat{\mathbf{u}}}\, f = \lim_{h\to 0}\left(-\frac{2xy}{\sqrt{2}} + \frac{hy}{2} + \frac{y^2}{\sqrt{2}}\right) = -\frac{2xy}{\sqrt{2}} + \frac{y^2}{\sqrt{2}}$$

$$\boxed{D_{\hat{\mathbf{u}}}\, f(x,y,z) = \frac{-2xy + y^2}{\sqrt{2}}}$$

[▶ MDS2_4 @ 05:53](https://www.youtube.com/watch?v=qcT49XqFzXo&t=353)

---

## 7. The Gradient Dot-Product Theorem

### 7.1 Statement

**Theorem (Gradient Dot-Product Theorem).** If $f : \mathbb{R}^n \to \mathbb{R}$ is differentiable at $\mathbf{a}$ and $\hat{\mathbf{u}}$ is a unit vector, then [▶ MDS2_4 @ 06:18](https://www.youtube.com/watch?v=qcT49XqFzXo&t=378)

$$D_{\hat{\mathbf{u}}}\, f(\mathbf{a}) = \nabla f(\mathbf{a}) \cdot \hat{\mathbf{u}}$$

where the **gradient** is

$$\nabla f = \begin{bmatrix} f_{x_1} \\ f_{x_2} \\ \vdots \\ f_{x_n} \end{bmatrix}.$$

This theorem converts a limit computation into a dot product — a dramatic simplification.

> **Clarification:** The theorem requires **differentiability**, which is a stronger condition than merely having all partial derivatives. In practice, if the partial derivatives exist and are continuous in a neighbourhood of $\mathbf{a}$, then $f$ is differentiable there (this is a standard sufficient condition). Deeper treatment in [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]].

### 7.2 Verification of the Worked Example via Gradient

**Example (continued):** Verify the directional derivative from Section 6.2 using the gradient.

**Solution:**

$$f(x,y,z) = x^2 y + y^2 z$$

Compute the partial derivatives:

$$f_x = 2xy, \qquad f_y = x^2 + 2yz, \qquad f_z = y^2$$

Therefore:

$$\nabla f = \begin{bmatrix} 2xy \\ x^2 + 2yz \\ y^2 \end{bmatrix}$$

The unit direction vector is:

$$\hat{\mathbf{u}} = \frac{1}{\sqrt{2}}\begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}$$

Take the dot product: [▶ MDS2_4 @ 07:17](https://www.youtube.com/watch?v=qcT49XqFzXo&t=437)

$$\nabla f \cdot \hat{\mathbf{u}} = (2xy)\!\left(\frac{-1}{\sqrt{2}}\right) + (x^2 + 2yz)(0) + (y^2)\!\left(\frac{1}{\sqrt{2}}\right)$$

$$= \frac{-2xy}{\sqrt{2}} + \frac{y^2}{\sqrt{2}} = \frac{-2xy + y^2}{\sqrt{2}}$$

$$\boxed{D_{\hat{\mathbf{u}}}\, f = \frac{-2xy + y^2}{\sqrt{2}}}$$

This matches the result obtained from the limit definition in Section 6.2, confirming the theorem. $\checkmark$

### 7.3 Geometric Consequences of the Gradient Dot-Product Theorem

Since $\nabla f(\mathbf{a}) \cdot \hat{\mathbf{u}} = \|\nabla f(\mathbf{a})\|\cos\theta$ where $\theta$ is the angle between $\nabla f(\mathbf{a})$ and $\hat{\mathbf{u}}$:

| Property | Condition | Value |
|----------|-----------|-------|
| **Maximum rate of increase** | $\hat{\mathbf{u}}$ parallel to $\nabla f$ ($\theta = 0$) | $\|\nabla f(\mathbf{a})\|$ |
| **Maximum rate of decrease** | $\hat{\mathbf{u}}$ anti-parallel to $\nabla f$ ($\theta = \pi$) | $-\|\nabla f(\mathbf{a})\|$ |
| **Zero rate of change** | $\hat{\mathbf{u}}$ perpendicular to $\nabla f$ ($\theta = \pi/2$) | $0$ |

This is why the gradient is often described as "the direction of steepest ascent." Deeper treatment in [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]].

---

## 8. Full Summary Table

| Topic | Key Idea | Key Formula / Test |
|-------|----------|-------------------|
| **Partial derivative (definition)** | Perturb one variable, hold others fixed | $f_{x_i}(\mathbf{a}) = \displaystyle\lim_{h\to 0}\frac{f(\mathbf{a}+h\mathbf{e}_i)-f(\mathbf{a})}{h}$ |
| **Multivariable limit** | Must agree along *every* path to $\mathbf{a}$ | $\varepsilon$-$\delta$ definition |
| **Path test (non-existence)** | Find two paths giving different limits | If $L_1 \neq L_2$, limit DNE |
| **Straight-line paths** | $y = mx$ | Useful when $\deg(\text{num}) = \deg(\text{den})$ |
| **Parabolic / curved paths** | $x = y^2$, $y = x^k$, etc. | Needed when all straight lines give same value |
| **Continuity at $\mathbf{a}$** | Limit exists and equals $f(\mathbf{a})$ | $\displaystyle\lim_{\mathbf{x}\to\mathbf{a}}f(\mathbf{x}) = f(\mathbf{a})$ |
| **Directional derivative** | Rate of change along unit direction $\hat{\mathbf{u}}$ | $D_{\hat{\mathbf{u}}}f(\mathbf{a}) = \displaystyle\lim_{h\to 0}\frac{f(\mathbf{a}+h\hat{\mathbf{u}})-f(\mathbf{a})}{h}$ |
| **Normalisation** | Direction vector must be unit | $\hat{\mathbf{u}} = \mathbf{v}/\|\mathbf{v}\|$ |
| **Gradient dot-product theorem** | Directional derivative via gradient | $D_{\hat{\mathbf{u}}}f = \nabla f \cdot \hat{\mathbf{u}}$ |
| **Steepest ascent** | Gradient points in direction of max increase | $\max D_{\hat{\mathbf{u}}}f = \|\nabla f\|$ |

---

## Sources

- [MDS2_1](https://www.youtube.com/watch?v=UJFe9JIBogc)
- [MDS2_2](https://www.youtube.com/watch?v=wj73NcPIeZE)
- [MDS2_3](https://www.youtube.com/watch?v=SEevQPGIJSE)
- [MDS2_4](https://www.youtube.com/watch?v=qcT49XqFzXo)