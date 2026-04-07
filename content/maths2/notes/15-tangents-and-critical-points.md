---
id: "15"
number: 15
title: "TANGENTS AND CRITICAL POINTS"
section: "Weeks 9–11 · Multivariable Calculus"
---
# TANGENT PLANES AND CRITICAL POINTS

This file develops the geometric and analytic consequences of the gradient for scalar-valued multivariable functions. Building on the theory of partial derivatives, directional derivatives, and the gradient from [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]], we address five interconnected topics: the direction of steepest ascent and descent, tangent lines in the multivariable setting, tangent planes and hyperplanes, linear approximation, and the theory of critical points. These ideas are foundational for optimisation — the mathematical backbone of gradient descent in machine learning and classical extremum problems throughout the sciences.

---

## 1. The Direction of Steepest Ascent and Descent

### Motivation: How Does Water Flow Downhill?

Consider a hill whose altitude is modelled by a function $h(x, y)$. Water flows in the direction where the altitude **decreases most rapidly**. In one variable, the sign of $h'(x)$ tells us the direction of flow: negative derivative means the function decreases to the right; positive means it decreases to the left; zero means the water is stationary. In two or more variables there are infinitely many directions to consider, and the question becomes: **among all unit vectors $\mathbf{u}$, which one minimises the directional derivative $h_{\mathbf{u}}(\mathbf{a})$?** [▶ W10_L1 @ 06:37](https://www.youtube.com/watch?v=0H7ca6dFvQ8&t=397)

### Setup and Hypotheses

Let $f : D \to \mathbb{R}$ be a function defined on a domain $D \subseteq \mathbb{R}^n$ containing an open ball around the point $\tilde{\mathbf{a}} \in \mathbb{R}^n$. **Assume that $\nabla f$ exists and is continuous on some open ball around $\tilde{\mathbf{a}}$.** Under this hypothesis, for every unit vector $\mathbf{u} \in \mathbb{R}^n$,

$$f_{\mathbf{u}}(\tilde{\mathbf{a}}) = \nabla f(\tilde{\mathbf{a}}) \cdot \mathbf{u}.$$

This formula, established in [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]], is the starting point for the entire analysis.

### Key Analysis via the Dot Product

Using the geometric interpretation of the dot product,

$$f_{\mathbf{u}}(\tilde{\mathbf{a}}) = \|\nabla f(\tilde{\mathbf{a}})\| \, \|\mathbf{u}\| \, \cos\theta = \|\nabla f(\tilde{\mathbf{a}})\| \cos\theta,$$

where $\theta$ is the angle between $\nabla f(\tilde{\mathbf{a}})$ and $\mathbf{u}$, and $\|\mathbf{u}\| = 1$ since $\mathbf{u}$ is a unit vector. The factor $\|\nabla f(\tilde{\mathbf{a}})\|$ is fixed (it depends only on $f$ and $\tilde{\mathbf{a}}$), so the directional derivative varies with $\theta$ alone through $\cos\theta$. [▶ W10_L1 @ 09:33](https://www.youtube.com/watch?v=0H7ca6dFvQ8&t=573)

### Theorem: Steepest Ascent, Steepest Descent, and No Change

Assume $\nabla f$ exists and is continuous on an open ball around $\tilde{\mathbf{a}}$, and $\nabla f(\tilde{\mathbf{a}}) \neq \mathbf{0}$. Then:

| Property | Condition on $\theta$ | Direction $\mathbf{u}$ | Value of $f_{\mathbf{u}}(\tilde{\mathbf{a}})$ |
|---|---|---|---|
| **Steepest ascent** (maximum of $f_{\mathbf{u}}$) | $\theta = 0$ | $\displaystyle\mathbf{u} = \frac{\nabla f(\tilde{\mathbf{a}})}{\|\nabla f(\tilde{\mathbf{a}})\|}$ | $+\|\nabla f(\tilde{\mathbf{a}})\|$ |
| **Steepest descent** (minimum of $f_{\mathbf{u}}$) | $\theta = \pi$ | $\displaystyle\mathbf{u} = -\frac{\nabla f(\tilde{\mathbf{a}})}{\|\nabla f(\tilde{\mathbf{a}})\|}$ | $-\|\nabla f(\tilde{\mathbf{a}})\|$ |
| **No change** ($f_{\mathbf{u}} = 0$) | $\theta = \pi/2$ | $\mathbf{u} \perp \nabla f(\tilde{\mathbf{a}})$ | $0$ |

*Proof sketch.* $\cos\theta$ achieves its maximum value $1$ at $\theta = 0$ (same direction as gradient), its minimum value $-1$ at $\theta = \pi$ (opposite direction), and equals $0$ at $\theta = \pi/2$ (perpendicular). Substituting into the formula gives the stated values. $\square$

> **Clarification:** The direction of "no change" is not unique. In $\mathbb{R}^n$, the set of unit vectors orthogonal to $\nabla f(\tilde{\mathbf{a}})$ forms an $(n-2)$-dimensional sphere. In $\mathbb{R}^2$ there are exactly two such directions; in $\mathbb{R}^3$ and higher there are infinitely many, forming a subspace of dimension $n - 1$.

### Worked Examples

**Example 1:** Let $f(x,y) = \sin(xy)$. Find the direction of steepest descent at $(\pi, 1)$.

**Solution:** The gradient is

$$\nabla f(x,y) = \bigl(y\cos(xy),\; x\cos(xy)\bigr).$$

At $(\pi, 1)$:

$$\nabla f(\pi, 1) = \bigl(\cos\pi,\; \pi\cos\pi\bigr) = (-1, -\pi).$$

The direction of steepest descent is

$$\mathbf{u} = -\frac{\nabla f(\pi,1)}{\|\nabla f(\pi,1)\|} = \frac{(1, \pi)}{\sqrt{1 + \pi^2}}.$$

The direction of steepest ascent is $\dfrac{(-1,-\pi)}{\sqrt{1+\pi^2}}$, and a direction of no change is $\dfrac{(\pi, -1)}{\sqrt{1+\pi^2}}$ (or its negative).

---

**Example 2:** Let $f(x,y,z) = x^2 + y^2 + z^2$. Find the direction of steepest ascent at $(1,1,1)$.

**Solution:**

$$\nabla f(x,y,z) = (2x, 2y, 2z), \qquad \nabla f(1,1,1) = (2,2,2).$$

Direction of steepest ascent:

$$\mathbf{u} = \frac{(2,2,2)}{\|(2,2,2)\|} = \frac{(2,2,2)}{2\sqrt{3}} = \frac{1}{\sqrt{3}}(1,1,1).$$

For directions of no change, we need $\mathbf{u} \perp (2,2,2)$, i.e., $x + y + z = 0$. A basis for this plane is, for example:

$$\left\{\frac{1}{\sqrt{2}}(1,-1,0),\quad \frac{1}{\sqrt{2}}(1,0,-1)\right\}.$$

Any unit linear combination of these vectors gives a direction of zero rate of change.

### Cautionary Note on Continuity

The hypothesis that $\nabla f$ is **continuous** in a neighbourhood is essential. Without it, the formula $f_{\mathbf{u}} = \nabla f \cdot \mathbf{u}$ may fail, and the gradient may not point in the direction of steepest ascent. The classic counterexample is $f(x,y) = \frac{xy}{x^2 + y^2}$ for $(x,y) \neq (0,0)$ and $f(0,0) = 0$: the partial derivatives exist at the origin but are not continuous there, and many directional derivatives do not exist. See [[14 - PARTIAL AND DIRECTIONAL DERIVATIVES]] for a full discussion of this example. [▶ W10_L1 @ 26:44](https://www.youtube.com/watch?v=0H7ca6dFvQ8&t=1604)

### Connection to Gradient Descent

The steepest descent direction $-\nabla f / \|\nabla f\|$ is the foundation of the **gradient descent** algorithm used throughout machine learning and optimisation. At each step, one moves from the current point in the direction that locally decreases the objective function most rapidly.

---

## 2. Tangent Lines in the Multivariable Setting

### Recall: Tangent Lines for One Variable

For a differentiable function $f : \mathbb{R} \to \mathbb{R}$, the **tangent line** to the graph at the point $(a, f(a))$ is

$$y - f(a) = f'(a)(x - a).$$

This line captures the instantaneous direction of the curve and provides the best linear approximation near $a$.

### Tangent Lines for Functions of Two Variables

Let $f : D \to \mathbb{R}$ with $D \subseteq \mathbb{R}^2$ containing an open ball around $\tilde{\mathbf{a}} = (a, b)$. [▶ W10_L2 @ 04:20](https://www.youtube.com/watch?v=9yeyc472W5Q&t=260)

**Construction:**

1. Choose a line $L$ in $D$ passing through $(a,b)$ in the direction of a unit vector $\mathbf{u} = (u_1, u_2)$.
2. Restrict $f$ to $L$, obtaining a function of one variable.
3. The **tangent line to $f$ at $(a,b)$ over $L$** is the one-variable tangent to this restricted function. It has slope $f_{\mathbf{u}}(a,b)$ and passes through the point $(a, b, f(a,b))$ in $\mathbb{R}^3$.

### Parametric Equations

The line $L$ itself can be parametrised as

$$x(t) = a + t\,u_1, \quad y(t) = b + t\,u_2, \quad z(t) = 0.$$

The tangent line above $L$ is then

$$\boxed{x(t) = a + t\,u_1, \quad y(t) = b + t\,u_2, \quad z(t) = f(a,b) + t\,f_{\mathbf{u}}(a,b).}$$

**Vector form (as an affine flat):**

$$\bigl(x(t),\, y(t),\, z(t)\bigr) = (a,\, b,\, f(a,b)) + t\bigl(u_1,\, u_2,\, f_{\mathbf{u}}(a,b)\bigr).$$

This is an affine flat: a translate of the one-dimensional subspace spanned by $(u_1, u_2, f_{\mathbf{u}}(a,b))$, shifted to pass through the point $(a, b, f(a,b))$.

**Symmetric form** (when all denominators are non-zero):

$$\frac{x - a}{u_1} = \frac{y - b}{u_2} = \frac{z - f(a,b)}{f_{\mathbf{u}}(a,b)}.$$

### Extension to $n$ Variables

For $f : D \to \mathbb{R}$ with $D \subseteq \mathbb{R}^n$ and a unit vector $\mathbf{u} = (u_1, \ldots, u_n)$, the tangent line to $f$ at $\tilde{\mathbf{a}} = (a_1, \ldots, a_n)$ in the direction $\mathbf{u}$ is: [▶ W10_L2 @ 27:09](https://www.youtube.com/watch?v=9yeyc472W5Q&t=1629)

$$\bigl(\tilde{\mathbf{x}}(t),\, z(t)\bigr) = \bigl(\tilde{\mathbf{a}},\, f(\tilde{\mathbf{a}})\bigr) + t\bigl(\mathbf{u},\, f_{\mathbf{u}}(\tilde{\mathbf{a}})\bigr),$$

or in component form:

$$x_i(t) = a_i + t\,u_i \quad (i = 1,\ldots,n), \qquad z(t) = f(\tilde{\mathbf{a}}) + t\,f_{\mathbf{u}}(\tilde{\mathbf{a}}).$$

### Worked Examples

**Example 1:** $f(x,y) = x + y$, tangent at $(1,1)$ in direction $\mathbf{u} = (1,0)$.

**Solution:** $\nabla f = (1,1)$, so $f_{\mathbf{u}}(1,1) = (1,1) \cdot (1,0) = 1$. Also $f(1,1) = 2$. The tangent line is

$$(x(t), y(t), z(t)) = (1, 1, 2) + t(1, 0, 1) = (1+t,\; 1,\; 2+t).$$

---

**Example 2:** $f(x,y) = xy$, tangent at $(1,1)$ in direction $(3,4)$.

**Solution:** Unit vector: $\mathbf{u} = \frac{1}{5}(3,4)$. Gradient: $\nabla f = (y, x)$, so $\nabla f(1,1) = (1,1)$.

$$f_{\mathbf{u}}(1,1) = (1,1) \cdot \tfrac{1}{5}(3,4) = \tfrac{7}{5}.$$

Since $f(1,1) = 1$, the tangent line is

$$(x(t), y(t), z(t)) = (1, 1, 1) + t\!\left(\tfrac{3}{5},\; \tfrac{4}{5},\; \tfrac{7}{5}\right) = \left(1 + \tfrac{3t}{5},\; 1 + \tfrac{4t}{5},\; 1 + \tfrac{7t}{5}\right).$$

---

**Example 3:** $f(x,y,z) = xy + yz + zx$, tangent at $(1,1,1)$ in direction $(-1,-2,2)$.

**Solution:** Unit vector: $\mathbf{u} = \frac{1}{3}(-1,-2,2)$. Gradient:

$$\nabla f = (y+z,\; z+x,\; x+y), \qquad \nabla f(1,1,1) = (2,2,2).$$

$$f_{\mathbf{u}}(1,1,1) = (2,2,2) \cdot \tfrac{1}{3}(-1,-2,2) = \tfrac{1}{3}(-2 - 4 + 4) = -\tfrac{2}{3}.$$

With $f(1,1,1) = 3$, the tangent line (using a fourth coordinate $w$ for the function value) is

$$(x(t), y(t), z(t), w(t)) = (1,1,1,3) + t\!\left(-\tfrac{1}{3},\; -\tfrac{2}{3},\; \tfrac{2}{3},\; -\tfrac{2}{3}\right).$$

### When Tangent Lines Fail to Exist

A tangent line in direction $\mathbf{u}$ exists if and only if the directional derivative $f_{\mathbf{u}}(\tilde{\mathbf{a}})$ exists. This can fail:

- For $f(x,y) = \frac{xy}{x^2+y^2}$ (with $f(0,0)=0$), directional derivatives exist only along the coordinate axes at the origin.
- For $f(x,y) = |x| + |y|$, the graph has sharp edges and corners; at many points and in many directions the tangent line does not exist.

**Sufficient condition:** If $\nabla f$ exists and is continuous on an open ball around $\tilde{\mathbf{a}}$, then **all** tangent lines at $\tilde{\mathbf{a}}$ exist. [▶ W10_L2 @ 39:46](https://www.youtube.com/watch?v=9yeyc472W5Q&t=2386)

---

## 3. Tangent Planes and Hyperplanes

### The Collection of All Tangent Lines Lies on a Plane

A key observation is that when all tangent lines at a point exist, they do not merely form a collection of independent lines — they all lie on a single plane (in the two-variable case) or hyperplane (in the $n$-variable case). [▶ W10_L3 @ 02:40](https://www.youtube.com/watch?v=bz1gtPvNIAg&t=160)

**Algebraic derivation (two variables).** Write the parametric equation of the tangent line in direction $\mathbf{u} = (u_1, u_2)$:

$$x(t) = a + u_1 t, \quad y(t) = b + u_2 t, \quad z(t) = f(a,b) + f_{\mathbf{u}}(a,b)\, t.$$

Using the gradient formula:

$$f_{\mathbf{u}}(a,b) = \frac{\partial f}{\partial x}(a,b)\, u_1 + \frac{\partial f}{\partial y}(a,b)\, u_2.$$

Substituting into the $z$-equation:

$$z(t) - f(a,b) = \left[\frac{\partial f}{\partial x}(a,b)\, u_1 + \frac{\partial f}{\partial y}(a,b)\, u_2\right] t.$$

But $u_1 t = x(t) - a$ and $u_2 t = y(t) - b$, so

$$z - f(a,b) = \frac{\partial f}{\partial x}(a,b)\,(x - a) + \frac{\partial f}{\partial y}(a,b)\,(y - b).$$

This is a **single equation in three variables** — it defines a plane. Every tangent line, regardless of the choice of $\mathbf{u}$, satisfies this equation.

### Definition: Tangent Plane ($n = 2$)

Let $f(x,y)$ be defined on a domain $D \subseteq \mathbb{R}^2$ containing an open ball around $(a,b)$, and suppose $\nabla f$ exists and is continuous on that ball. The **tangent plane** to $f$ at $(a,b)$ is the plane in $\mathbb{R}^3$ with equation [▶ W10_L3 @ 16:37](https://www.youtube.com/watch?v=bz1gtPvNIAg&t=997)

$$\boxed{z = f(a,b) + \frac{\partial f}{\partial x}(a,b)\,(x - a) + \frac{\partial f}{\partial y}(a,b)\,(y - b).}$$

### Definition: Tangent Hyperplane ($n$ variables)

For $f : D \to \mathbb{R}$ with $D \subseteq \mathbb{R}^n$, under the same continuity hypothesis, the **tangent hyperplane** to $f$ at $\tilde{\mathbf{a}} = (a_1, \ldots, a_n)$ is the affine flat in $\mathbb{R}^{n+1}$ with equation [▶ W10_L3 @ 25:03](https://www.youtube.com/watch?v=bz1gtPvNIAg&t=1503)

$$\boxed{z = f(\tilde{\mathbf{a}}) + \sum_{i=1}^{n} \frac{\partial f}{\partial x_i}(\tilde{\mathbf{a}})\,(x_i - a_i) = f(\tilde{\mathbf{a}}) + \nabla f(\tilde{\mathbf{a}}) \cdot (\tilde{\mathbf{x}} - \tilde{\mathbf{a}}).}$$

This is an $n$-dimensional affine flat in $\mathbb{R}^{n+1}$ — it is the translate of the null space of the single linear equation

$$\sum_{i=1}^{n} \frac{\partial f}{\partial x_i}(\tilde{\mathbf{a}})\, x_i - z = 0$$

by the point $(\tilde{\mathbf{a}}, f(\tilde{\mathbf{a}}))$.

### Interpretation as an Affine Flat

From linear algebra, the tangent hyperplane has the structure:

$$\text{Tangent hyperplane} = \bigl(\tilde{\mathbf{a}},\, f(\tilde{\mathbf{a}})\bigr) + P,$$

where $P$ is the subspace (hyperplane through the origin in $\mathbb{R}^{n+1}$) defined by

$$P = \left\{(\tilde{\mathbf{x}}, z) \in \mathbb{R}^{n+1} : z = \nabla f(\tilde{\mathbf{a}}) \cdot \tilde{\mathbf{x}}\right\}.$$

Every one-dimensional subspace $W_{\mathbf{u}} = \text{span}\{(\mathbf{u}, f_{\mathbf{u}}(\tilde{\mathbf{a}}))\}$ (corresponding to a tangent line direction) lies inside $P$, confirming that all tangent lines lie on the tangent hyperplane.

### Worked Examples

**Example 1:** $f(x,y) = x + y$, tangent plane at $(1,1)$.

**Solution:** $\nabla f = (1,1)$, $f(1,1) = 2$.

$$z = 2 + 1 \cdot (x-1) + 1 \cdot (y-1) = x + y.$$

> **Clarification:** Since $f$ is itself a linear function, the tangent plane coincides with the graph everywhere. This is analogous to the tangent line to a straight line being the line itself.

---

**Example 2:** $f(x,y) = xy$, tangent plane at $(1,1)$.

**Solution:** $\nabla f = (y, x)$, so $\nabla f(1,1) = (1,1)$ and $f(1,1) = 1$.

$$z = 1 + 1 \cdot (x-1) + 1 \cdot (y-1) = x + y - 1.$$

---

**Example 3:** $f(x,y) = \sin(xy)$, tangent plane at $(1,0)$.

**Solution:** $\nabla f = (y\cos(xy),\; x\cos(xy))$, so $\nabla f(1,0) = (0, 1)$ and $f(1,0) = \sin 0 = 0$.

$$z = 0 + 0 \cdot (x-1) + 1 \cdot (y - 0) = y.$$

---

**Example 4:** $f(x,y,z) = xy + yz + zx$, tangent hyperplane at $(1,1,1)$.

**Solution:** $\nabla f = (y+z,\; z+x,\; x+y)$, so $\nabla f(1,1,1) = (2,2,2)$ and $f(1,1,1) = 3$. Using $w$ for the function-value coordinate:

$$w = 3 + 2(x-1) + 2(y-1) + 2(z-1) = 2x + 2y + 2z - 3.$$

---

**Example 5:** $f(x,y,z) = x^2 + y^2 + z^2$, tangent hyperplane at $(2, 3, -1)$.

**Solution:** $\nabla f = (2x, 2y, 2z)$, so $\nabla f(2,3,-1) = (4, 6, -2)$ and $f(2,3,-1) = 4 + 9 + 1 = 14$.

$$w = 14 + 4(x-2) + 6(y-3) - 2(z+1) = 4x + 6y - 2z - 28.$$

### When Tangent Planes Do Not Exist

The tangent plane (or hyperplane) exists at $\tilde{\mathbf{a}}$ whenever $\nabla f$ is continuous in a neighbourhood of $\tilde{\mathbf{a}}$. If this fails:

- For $f(x,y) = \frac{xy}{x^2+y^2}$, tangent lines at the origin exist only along the axes, so no tangent plane can be formed.
- For $f(x,y) = |x| + |y|$, the graph has sharp ridges and the tangent plane does not exist at points on the axes.

---

## 4. Linear Approximation

### Definition

If $\nabla f$ exists and is continuous on an open ball around $\tilde{\mathbf{a}}$, the **linear approximation** (or **linearisation**) of $f$ at $\tilde{\mathbf{a}}$ is the function [▶ W10_L3 @ 30:42](https://www.youtube.com/watch?v=bz1gtPvNIAg&t=1842)

$$\boxed{L_f(\tilde{\mathbf{x}}) = f(\tilde{\mathbf{a}}) + \nabla f(\tilde{\mathbf{a}}) \cdot (\tilde{\mathbf{x}} - \tilde{\mathbf{a}}).}$$

This is precisely the right-hand side of the tangent hyperplane equation, now viewed as a **function** of $\tilde{\mathbf{x}}$ rather than as an equation relating $z$ and $\tilde{\mathbf{x}}$.

$L_f$ is the **best linear approximation** to $f$ near $\tilde{\mathbf{a}}$: for $\tilde{\mathbf{x}}$ close to $\tilde{\mathbf{a}}$,

$$f(\tilde{\mathbf{x}}) \approx L_f(\tilde{\mathbf{x}}).$$

This generalises the one-variable approximation $f(x) \approx f(a) + f'(a)(x - a)$.

### Worked Examples

**Example 1:** $f(x,y) = xy$ near $(1,1)$.

**Solution:** $\nabla f(1,1) = (1,1)$, $f(1,1) = 1$.

$$L_f(x,y) = 1 + (1,1) \cdot (x-1, y-1) = 1 + (x-1) + (y-1) = x + y - 1.$$

So for $(x,y)$ near $(1,1)$: $xy \approx x + y - 1$. For instance, $f(1.01, 0.99) = 0.9999$, while $L_f(1.01, 0.99) = 1.01 + 0.99 - 1 = 1.00$.

---

**Example 2:** $f(x,y,z) = x^2 + y^2 + z^2$ near $(2, 3, -1)$.

**Solution:** $\nabla f(2,3,-1) = (4, 6, -2)$, $f(2,3,-1) = 14$.

$$L_f(x,y,z) = 14 + 4(x-2) + 6(y-3) - 2(z+1) = 4x + 6y - 2z - 28.$$

> **Clarification:** The linear approximation $L_f$ is an *affine* function (constant plus linear terms), not a purely linear function in the algebraic sense. The terminology "linear approximation" is standard but slightly informal.

---

## 5. Critical Points

### Recall: Critical Points for One Variable

For $f : \mathbb{R} \to \mathbb{R}$, a point $a$ is a **critical point** if either $f$ is not differentiable at $a$ or $f'(a) = 0$. Every local extremum of a differentiable function is a critical point, but not every critical point is an extremum (e.g., $f(x) = x^3$ at $x = 0$).

### Local Extrema in Several Variables

Let $f : D \to \mathbb{R}$ with $D \subseteq \mathbb{R}^n$.

- A point $\mathbf{a} \in D$ is a **local maximum** of $f$ if there exists an open ball $B$ containing $\mathbf{a}$ such that $f(\mathbf{x}) \leq f(\mathbf{a})$ for all $\mathbf{x} \in B \cap D$. [▶ W10_L4 @ 03:05](https://www.youtube.com/watch?v=9pciPOO19wQ&t=185)
- A point $\mathbf{a} \in D$ is a **local minimum** of $f$ if there exists an open ball $B$ containing $\mathbf{a}$ such that $f(\mathbf{x}) \geq f(\mathbf{a})$ for all $\mathbf{x} \in B \cap D$.
- A **local extremum** is either a local maximum or a local minimum.

> **Clarification:** As in the one-variable case, "open ball" in $\mathbb{R}^n$ replaces "open interval" in $\mathbb{R}$. In $\mathbb{R}^2$ an open ball is an open disc; in $\mathbb{R}^3$ it is an open sphere.

### The Gradient Vanishes at Local Extrema

**Theorem.** Let $f : D \to \mathbb{R}$ be defined on a domain $D \subseteq \mathbb{R}^n$ containing an open ball around a local extremum $\mathbf{a}$. If $\nabla f(\mathbf{a})$ exists, then $\nabla f(\mathbf{a}) = \mathbf{0}$. [▶ W10_L4 @ 09:17](https://www.youtube.com/watch?v=9pciPOO19wQ&t=557)

*Proof sketch.* Restrict $f$ to any line $L$ through $\mathbf{a}$. Then $\mathbf{a}$ is a local extremum of $f|_L$, which is a one-variable function