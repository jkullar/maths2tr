# SINGLE-VARIABLE CALCULUS PREREQUISITES

This file reviews the essential single-variable calculus concepts needed before beginning a university course in linear algebra and multivariable calculus. We cover **limits** (left-hand, right-hand, and two-sided), the **laws governing limits**, **continuity** at a point, the various **types of discontinuity**, and important function classes including the **floor function** and **piecewise functions**. Mastery of these ideas is assumed throughout the course; the material here ensures a solid, precise foundation.

---

## 1. Intuitive Idea of a Limit

Suppose $f$ is a function defined on some open interval containing the point $a$, except possibly at $a$ itself. The **limit of $f(x)$ as $x$ approaches $a$** describes the value that $f(x)$ gets closer and closer to as $x$ gets closer and closer to $a$ — regardless of whether $f$ is actually defined at $a$ or what value $f(a)$ might take. [▶ Refresher_T1 @ 00:44](https://www.youtube.com/watch?v=x9Dv61Ml910&t=44)

We write:

$$\lim_{x \to a} f(x) = L$$

and read this as "the limit of $f(x)$ as $x$ tends to $a$ equals $L$."

The key conceptual point: a limit is about the **behaviour near** $a$, not **at** $a$.

---

## 2. One-Sided Limits

### 2.1 Left-Hand Limit

The **left-hand limit** (or **limit from the left**) of $f$ at $a$ is the value that $f(x)$ approaches as $x$ approaches $a$ through values **less than** $a$ (i.e., from the left on the number line). [▶ Refresher_T1 @ 02:44](https://www.youtube.com/watch?v=x9Dv61Ml910&t=164)

$$\lim_{x \to a^{-}} f(x) = L^{-}$$

Formally: for every $\varepsilon > 0$ there exists $\delta > 0$ such that

$$0 < a - x < \delta \implies |f(x) - L^{-}| < \varepsilon.$$

### 2.2 Right-Hand Limit

The **right-hand limit** (or **limit from the right**) of $f$ at $a$ is the value that $f(x)$ approaches as $x$ approaches $a$ through values **greater than** $a$. [▶ Refresher_T1 @ 02:59](https://www.youtube.com/watch?v=x9Dv61Ml910&t=179)

$$\lim_{x \to a^{+}} f(x) = L^{+}$$

Formally: for every $\varepsilon > 0$ there exists $\delta > 0$ such that

$$0 < x - a < \delta \implies |f(x) - L^{+}| < \varepsilon.$$

### 2.3 Existence of the Two-Sided Limit

> **Theorem (Existence of a Limit).** The two-sided limit $\displaystyle\lim_{x \to a} f(x)$ exists and equals $L$ **if and only if** both one-sided limits exist and are equal:
>
> $$\lim_{x \to a^{-}} f(x) = \lim_{x \to a^{+}} f(x) = L.$$

[▶ Refresher_T1 @ 03:13](https://www.youtube.com/watch?v=x9Dv61Ml910&t=193)

This theorem is the primary tool for checking limit existence in piecewise-defined functions: compute each one-sided limit separately, then compare.

> **Clarification:** A limit can exist at $a$ even if $f(a)$ is undefined, or if $f(a)$ differs from the limit. The limit concerns only the *approach*, not the *arrival*.

---

## 3. Limit Laws

The following laws allow us to compute limits of complicated expressions from simpler ones. Assume $\displaystyle\lim_{x \to a} f(x) = L$ and $\displaystyle\lim_{x \to a} g(x) = M$ both exist.

| Law | Statement |
|-----|-----------|
| **Sum Law** | $\displaystyle\lim_{x \to a} [f(x) + g(x)] = L + M$ |
| **Difference Law** | $\displaystyle\lim_{x \to a} [f(x) - g(x)] = L - M$ |
| **Constant Multiple Law** | $\displaystyle\lim_{x \to a} [c \cdot f(x)] = c \cdot L$ for any constant $c$ |
| **Product Law** | $\displaystyle\lim_{x \to a} [f(x) \cdot g(x)] = L \cdot M$ |
| **Quotient Law** | $\displaystyle\lim_{x \to a} \dfrac{f(x)}{g(x)} = \dfrac{L}{M}$, provided $M \neq 0$ |
| **Power Law** | $\displaystyle\lim_{x \to a} [f(x)]^n = L^n$ for any positive integer $n$ |
| **Root Law** | $\displaystyle\lim_{x \to a} \sqrt[n]{f(x)} = \sqrt[n]{L}$, provided $L > 0$ when $n$ is even |

### Direct Substitution for Polynomials and Rational Functions

An immediate consequence of the limit laws:

- If $p(x)$ is a **polynomial**, then $\displaystyle\lim_{x \to a} p(x) = p(a)$.
- If $r(x) = \dfrac{p(x)}{q(x)}$ is a **rational function** and $q(a) \neq 0$, then $\displaystyle\lim_{x \to a} r(x) = r(a)$.

### A Key Standard Limit

$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

This result is used repeatedly; it was invoked in the piecewise function example below.

> **Clarification:** The limit laws apply only when the individual limits exist (are finite). If a component limit does not exist or is infinite, the laws cannot be applied directly; other techniques (e.g., the Squeeze Theorem, L'Hôpital's rule) may be needed.

---

## 4. The Floor Function

### 4.1 Definition

The **floor function** (also called the **greatest integer function**) is denoted $\lfloor x \rfloor$ and defined by: [▶ Refresher_T1 @ 04:01](https://www.youtube.com/watch?v=x9Dv61Ml910&t=241)

$$\lfloor x \rfloor = \text{the largest integer } n \text{ such that } n \leq x.$$

Equivalently, $\lfloor x \rfloor = n$ where $n \in \mathbb{Z}$ and $n \leq x < n+1$.

### 4.2 Examples of Floor Function Values

| $x$ | $\lfloor x \rfloor$ |
|-----|---------------------|
| $0.5$ | $0$ |
| $0.75$ | $0$ |
| $1.25$ | $1$ |
| $2.0$ | $2$ |
| $-0.3$ | $-1$ |
| $-1.7$ | $-2$ |

### 4.3 Graph and Step-Function Behaviour

The floor function is a **step function**: it is constant on each interval $[n, n+1)$ for $n \in \mathbb{Z}$, taking the value $n$. At each integer, the function "jumps up" by $1$.

Key properties:
- On the interval $[n, n+1)$, we have $\lfloor x \rfloor = n$ (constant).
- At each integer $n$, $\lfloor n \rfloor = n$ (the function takes the *upper* value at the left endpoint of each step).
- There is a **jump discontinuity** at every integer.

### 4.4 Limits of the Floor Function at Integer Points

**Example:** Determine whether $\displaystyle\lim_{x \to 0} \lfloor x \rfloor$ exists. [▶ Refresher_T1 @ 04:54](https://www.youtube.com/watch?v=x9Dv61Ml910&t=294)

**Solution:**

**Right-hand limit.** For $x \in [0, 1)$, we have $\lfloor x \rfloor = 0$. As $x \to 0^+$, the function is constantly $0$, so:

$$\lim_{x \to 0^{+}} \lfloor x \rfloor = 0.$$

**Left-hand limit.** For $x \in [-1, 0)$, we have $\lfloor x \rfloor = -1$. As $x \to 0^-$, the function is constantly $-1$, so:

$$\lim_{x \to 0^{-}} \lfloor x \rfloor = -1.$$

**Conclusion.** Since $\displaystyle\lim_{x \to 0^{+}} \lfloor x \rfloor = 0 \neq -1 = \lim_{x \to 0^{-}} \lfloor x \rfloor$, the two-sided limit **does not exist**. [▶ Refresher_T1 @ 06:07](https://www.youtube.com/watch?v=x9Dv61Ml910&t=367)

> **Clarification:** The same argument generalises. At any integer $n$, the left-hand limit is $n - 1$ and the right-hand limit is $n$. These are never equal, so $\displaystyle\lim_{x \to n} \lfloor x \rfloor$ does not exist for any $n \in \mathbb{Z}$. However, at any non-integer point $a$, the floor function is locally constant, so the limit exists and equals $\lfloor a \rfloor$.

---

## 5. Piecewise Functions

### 5.1 Definition

A **piecewise function** is a function defined by different formulas on different parts (pieces) of its domain. The general form is:

$$f(x) = \begin{cases} f_1(x), & \text{if } x \in I_1 \\ f_2(x), & \text{if } x \in I_2 \\ \vdots \\ f_k(x), & \text{if } x \in I_k \end{cases}$$

where $I_1, I_2, \ldots, I_k$ partition the domain (or at least cover the domain of interest).

### 5.2 Strategy for Evaluating Limits of Piecewise Functions

At a **boundary point** $a$ (where the defining rule changes):

1. **Identify which formula** applies for $x < a$ and which for $x > a$.
2. **Compute the left-hand limit** $\displaystyle\lim_{x \to a^-} f(x)$ using the formula valid for $x < a$.
3. **Compute the right-hand limit** $\displaystyle\lim_{x \to a^+} f(x)$ using the formula valid for $x > a$.
4. **Compare.** If both are equal (say to $L$), then $\displaystyle\lim_{x \to a} f(x) = L$. Otherwise the limit does not exist.

At **non-boundary points**, the function is given by a single formula locally, and standard limit laws apply directly.

---

## 6. Continuity at a Point

### 6.1 Definition

A function $f$ is **continuous at $x = a$** if all three of the following conditions hold: [▶ Refresher_T1 @ 08:10](https://www.youtube.com/watch?v=x9Dv61Ml910&t=490)

1. $f(a)$ is defined (i.e., $a$ is in the domain of $f$).
2. $\displaystyle\lim_{x \to a} f(x)$ exists (i.e., both one-sided limits exist and are equal).
3. $\displaystyle\lim_{x \to a} f(x) = f(a)$ (the limiting value equals the function value).

If any one of these conditions fails, $f$ is **discontinuous at $x = a$**.

### 6.2 Two-Step Continuity Test (Practical Procedure)

In practice, we often combine the conditions into two checkable steps: [▶ Refresher_T1 @ 08:24](https://www.youtube.com/watch?v=x9Dv61Ml910&t=504)

| Step | Action | If it fails |
|------|--------|-------------|
| **Step 1** | Compute $\displaystyle\lim_{x \to a^-} f(x)$ and $\displaystyle\lim_{x \to a^+} f(x)$. Check if they are equal. | If they differ, the limit does not exist $\Rightarrow$ $f$ is **not continuous** at $a$. |
| **Step 2** | (Only if Step 1 passes.) Check whether $\displaystyle\lim_{x \to a} f(x) = f(a)$. | If they differ (or $f(a)$ is undefined), $f$ is **not continuous** at $a$. |

If both steps pass, then $f$ **is continuous** at $x = a$.

> **Clarification:** The existence of the limit (Step 1) is a *necessary* condition for continuity, but it is *not sufficient*. Even when the limit exists, the function can be discontinuous if $f(a)$ is undefined or disagrees with the limit. Conversely, a function can have $f(a)$ defined and yet be discontinuous because the limit fails to exist.

---

## 7. Types of Discontinuity

When $f$ is discontinuous at $x = a$, the discontinuity falls into one of the following categories.

### 7.1 Jump Discontinuity

A **jump discontinuity** occurs at $x = a$ when both one-sided limits exist but are not equal:

$$\lim_{x \to a^{-}} f(x) \neq \lim_{x \to a^{+}} f(x).$$

The "jump" is the difference $\displaystyle\lim_{x \to a^{+}} f(x) - \lim_{x \to a^{-}} f(x)$.

*Typical example:* The floor function $\lfloor x \rfloor$ at every integer $n$ (jump of size $1$).

### 7.2 Removable Discontinuity

A **removable discontinuity** occurs at $x = a$ when the two-sided limit exists but either:
- $f(a)$ is not defined, or
- $f(a) \neq \displaystyle\lim_{x \to a} f(x)$.

It is called "removable" because we can **redefine** $f(a)$ to equal the limit, making $f$ continuous at $a$.

*Typical example:* $f(x) = \dfrac{x^2 - 1}{x - 1}$ at $x = 1$. Here $f(1)$ is undefined, but $\displaystyle\lim_{x \to 1} f(x) = \lim_{x \to 1}(x+1) = 2$. Defining $f(1) = 2$ removes the discontinuity.

### 7.3 Infinite (Essential) Discontinuity

An **infinite discontinuity** occurs at $x = a$ when at least one of the one-sided limits is $+\infty$ or $-\infty$.

*Typical example:* $f(x) = \dfrac{1}{x}$ at $x = 0$. We have $\displaystyle\lim_{x \to 0^+} \frac{1}{x} = +\infty$ and $\displaystyle\lim_{x \to 0^-} \frac{1}{x} = -\infty$.

### 7.4 Oscillating Discontinuity

An **oscillating discontinuity** occurs at $x = a$ when $f(x)$ oscillates without settling to any value (finite or infinite) as $x \to a$.

*Typical example:* $f(x) = \sin\!\left(\dfrac{1}{x}\right)$ at $x = 0$. The function oscillates between $-1$ and $1$ infinitely often as $x \to 0$, so neither one-sided limit exists.

### Summary Table: Types of Discontinuity

| Type | Left-hand limit | Right-hand limit | Two-sided limit | $f(a)$ vs limit |
|------|:-:|:-:|:-:|:-:|
| **Jump** | Exists (finite) | Exists (finite) | Does not exist ($L^- \neq L^+$) | N/A |
| **Removable** | Exists | Exists | Exists ($= L$) | $f(a) \neq L$ or undefined |
| **Infinite** | $\pm\infty$ or finite | $\pm\infty$ or finite | Does not exist | N/A |
| **Oscillating** | Does not exist | Does not exist | Does not exist | N/A |

---

## 8. Worked Examples

### Example 1: Continuity of a Piecewise Function (sinc-type)

**Example:** Let [▶ Refresher_T2 @ 00:17](https://www.youtube.com/watch?v=S6hzxX1AIBU&t=17)

$$f(x) = \begin{cases} \dfrac{\sin x}{x}, & \text{if } x > 0, \\[6pt] 1, & \text{if } x = 0, \\[4pt] x + 1, & \text{if } x < 0. \end{cases}$$

Is $f$ continuous at $x = 0$?

**Solution:**

**Step 1 — Compute one-sided limits.**

*Right-hand limit:* For $x > 0$, the relevant formula is $\dfrac{\sin x}{x}$. Using the standard limit:

$$\lim_{x \to 0^{+}} \frac{\sin x}{x} = 1.$$

[▶ Refresher_T2 @ 01:22](https://www.youtube.com/watch?v=S6hzxX1AIBU&t=82)

*Left-hand limit:* For $x < 0$, the relevant formula is $x + 1$. By direct substitution (polynomial):

$$\lim_{x \to 0^{-}} (x + 1) = 0 + 1 = 1.$$

We can verify numerically: $f(-0.5) = 0.5$, $f(-1/3) = 2/3$, $f(-1/5) = 4/5$ — the values approach $1$. [▶ Refresher_T2 @ 02:28](https://www.youtube.com/watch?v=S6hzxX1AIBU&t=148)

Since $\displaystyle\lim_{x \to 0^{+}} f(x) = 1 = \lim_{x \to 0^{-}} f(x)$, the two-sided limit exists:

$$\lim_{x \to 0} f(x) = 1.$$

**Step 2 — Compare limit with function value.**

The function is explicitly defined as $f(0) = 1$. Therefore:

$$\lim_{x \to 0} f(x) = 1 = f(0).$$

**Conclusion:** $f$ is **continuous at $x = 0$**. ✓

---

### Example 2: Continuity of a Polynomial-Piecewise Function

**Example:** Let [▶ Refresher_T3 @ 00:15](https://www.youtube.com/watch?v=US18ZBaHO1Q&t=15)

$$f(x) = \begin{cases} x^2, & \text{if } x \geq 1, \\ x^3, & \text{if } x < 1. \end{cases}$$

Is $f$ continuous at $x = 1$?

**Solution:**

First, note that for $x > 1$ (strictly), $f(x) = x^2$ is a polynomial, hence continuous. For $x < 1$ (strictly), $f(x) = x^3$ is a polynomial, hence continuous. The only point where discontinuity *could* occur is at the boundary $x = 1$. [▶ Refresher_T3 @ 00:33](https://www.youtube.com/watch?v=US18ZBaHO1Q&t=33)

**Step 1 — One-sided limits.**

*Right-hand limit:* For $x > 1$ (and also at $x = 1$ in the definition), $f(x) = x^2$:

$$\lim_{x \to 1^{+}} x^2 = 1^2 = 1.$$

*Left-hand limit:* For $x < 1$, $f(x) = x^3$:

$$\lim_{x \to 1^{-}} x^3 = 1^3 = 1.$$

Both one-sided limits equal $1$, so the two-sided limit exists:

$$\lim_{x \to 1} f(x) = 1.$$

**Step 2 — Compare with function value.**

At $x = 1$, the first piece applies ($x \geq 1$), giving $f(1) = 1^2 = 1$.

$$\lim_{x \to 1} f(x) = 1 = f(1).$$

**Conclusion:** $f$ is **continuous at $x = 1$**. ✓ [▶ Refresher_T3 @ 02:48](https://www.youtube.com/watch?v=US18ZBaHO1Q&t=168)

---

### Example 3: Floor Function — Discontinuity at Every Integer

**Example:** Show that $f(x) = \lfloor x \rfloor$ is not continuous at $x = 0$.

**Solution:**

From Section 4.4, we already found:

$$\lim_{x \to 0^{+}} \lfloor x \rfloor = 0, \qquad \lim_{x \to 0^{-}} \lfloor x \rfloor = -1.$$

Since $0 \neq -1$, the two-sided limit does not exist. By the two-step continuity test, **Step 1 fails**, so $f$ is **not continuous at $x = 0$**. [▶ Refresher_T1 @ 10:28](https://www.youtube.com/watch?v=x9Dv61Ml910&t=628)

Moreover, $f(0) = \lfloor 0 \rfloor = 0$, which equals the right-hand limit but not the left-hand limit. This is a **jump discontinuity** of size $1$.

The same argument shows that $\lfloor x \rfloor$ has a jump discontinuity at every integer $n \in \mathbb{Z}$.

---

### Example 4: Identifying a Removable Discontinuity

**Example:** Let

$$g(x) = \begin{cases} \dfrac{x^2 - 4}{x - 2}, & \text{if } x \neq 2, \\[6pt] 5, & \text{if } x = 2. \end{cases}$$

Determine the type of discontinuity at $x = 2$.

**Solution:**

For $x \neq 2$:

$$g(x) = \frac{x^2 - 4}{x - 2} = \frac{(x-2)(x+2)}{x-2} = x + 2.$$

Therefore:

$$\lim_{x \to 2} g(x) = \lim_{x \to 2}(x + 2) = 4.$$

The two-sided limit exists and equals $4$. However, $g(2) = 5 \neq 4$.

**Step 1** passes (the limit exists), but **Step 2** fails (the limit does not equal the function value).

**Conclusion:** $g$ has a **removable discontinuity** at $x = 2$. Redefining $g(2) = 4$ would make $g$ continuous there.

---

### Example 5: A Function Continuous Despite Complicated Pieces

**Example:** Let

$$h(x) = \begin{cases} x \sin\!\left(\dfrac{1}{x}\right), & \text{if } x \neq 0, \\[4pt] 0, & \text{if } x = 0. \end{cases}$$

Is $h$ continuous at $x = 0$?

**Solution:**

We use the **Squeeze Theorem**. For $x \neq 0$:

$$-|x| \leq x \sin\!\left(\frac{1}{x}\right) \leq |x|$$

since $|\sin(\cdot)| \leq 1$. As $x \to 0$, both $-|x| \to 0$ and $|x| \to 0$. By the Squeeze Theorem:

$$\lim_{x \to 0} x \sin\!\left(\frac{1}{x}\right) = 0.$$

Since $h(0) = 0 = \displaystyle\lim_{x \to 0} h(x)$, the function $h$ is **continuous at $x = 0$**. ✓

---

## 9. Important Continuous Function Families

The following families of functions are continuous on their natural domains. This is frequently used without proof in limit computations.

| Function family | Continuous on |
|----------------|---------------|
| Polynomials $p(x) = a_n x^n + \cdots + a_0$ | All of $\mathbb{R}$ |
| Rational functions $\dfrac{p(x)}{q(x)}$ | $\{x \in \mathbb{R} : q(x) \neq 0\}$ |
| Trigonometric: $\sin x$, $\cos x$ | All of $\mathbb{R}$ |
| Trigonometric: $\tan x$, $\sec x$ | $\mathbb{R} \setminus \{(2k+1)\pi/2 : k \in \mathbb{Z}\}$ |
| Exponential $e^x$, $a^x$ ($a > 0$) | All of $\mathbb{R}$ |
| Logarithmic $\ln x$, $\log_a x$ | $(0, \infty)$ |
| Root functions $\sqrt[n]{x}$ | $[0,\infty)$ if $n$ even; $\mathbb{R}$ if $n$ odd |

**Compositions of continuous functions are continuous.** If $f$ is continuous at $a$ and $g$ is continuous at $f(a)$, then $g \circ f$ is continuous at $a$.

---

## 10. The Relationship Between Limits and Continuity

It is worth stating the logical relationship explicitly:

$$f \text{ continuous at } a \implies \lim_{x \to a} f(x) \text{ exists}$$

but the converse is **false**: the limit may exist without the function being continuous (removable discontinuity).

In other words:

- **Continuity requires the limit**, plus agreement with the function value.
- **Limit existence requires only** the two one-sided limits to agree; it says nothing about $f(a)$.

| Scenario | Limit exists? | $f(a)$ defined? | Limit $= f(a)$? | Continuous? |
|----------|:-:|:-:|:-:|:-:|
| Smooth passage | Yes | Yes | Yes | **Yes** |
| Removable discontinuity (hole) | Yes | No | N/A | **No** |
| Removable discontinuity (wrong value) | Yes | Yes | No | **No** |
| Jump discontinuity | No | Yes or No | N/A | **No** |
| Infinite discontinuity | No | Possibly | N/A | **No** |

---

## 11. Full Summary Table

| Concept | Key Idea |
|---------|----------|
| **Left-hand limit** $\displaystyle\lim_{x \to a^-} f(x)$ | Value $f(x)$ approaches as $x \to a$ from below |
| **Right-hand limit** $\displaystyle\lim_{x \to a^+} f(x)$ | Value $f(x)$ approaches as $x \to a$ from above |
| **Two-sided limit exists** | $\iff$ both one-sided limits exist and are equal |
| **Limit laws** | Sum, difference, product, quotient, power, root — apply when individual limits exist |
| **Direct substitution** | Valid for polynomials and rational functions (where denominator $\neq 0$) |
| **Floor function** $\lfloor x \rfloor$ | Largest integer $\leq x$; step function; jump discontinuity at every integer |
| **Piecewise function** | Different formulas on different intervals; check boundary points for limit existence |
| **Continuity at $a$** | (1) $f(a)$ defined, (2) limit exists, (3) limit $= f(a)$ |
| **Jump discontinuity** | Both one-sided limits exist but differ |
| **Removable discontinuity** | Limit exists but $\neq f(a)$ (or $f(a)$ undefined) |
| **Infinite discontinuity** | At least one one-sided limit is $\pm\infty$ |
| **Oscillating discontinuity** | Function oscillates; one-sided limit(s) do not exist |

---

## Sources

- [Refresher_T1](https://www.youtube.com/watch?v=x9Dv61Ml910)
- [Refresher_T2](https://www.youtube.com/watch?v=S6hzxX1AIBU)
- [Refresher_T3](https://www.youtube.com/watch?v=US18ZBaHO1Q)
- [Refresher_T4](https://www.youtube.com/watch?v=lBqVQxUYTIs)
- [Refresher_T5](https://www.youtube.com/watch?v=Z9jpB1gK-PQ)
- [Refresher_T6](https://www.youtube.com/watch?v=nNWcu09Qo04)