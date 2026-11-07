---
routeAlias: ch02
class: chapter-opening
---

<ChapterHeader number="02" />

# Boolean Algebra & Logic Gates

<p class="chapter-lead">논리식·진리표·회로를 같은 함수의 세 표현으로 읽습니다.</p>

선수 지식: 0/1 표현과 2진수입니다.

<div class="objectives">

- 여섯 가지 2입력 게이트와 NOT의 출력을 계산할 수 있습니다.
- De Morgan 법칙으로 부정의 위치를 옮길 수 있습니다.
- SOP/POS와 간소화된 회로의 동치성을 검증할 수 있습니다.

</div>

<!-- Source: Harris & Harris, DDCA, 2nd ed., Ch. 2. + means OR, juxtaposition means AND. -->

---

# Gate Truth Tables

입력과 출력은 이상적인 binary 값입니다. NOT은 $Y=\overline A$입니다.

| A | B | AND | OR | XOR | NAND | NOR | XNOR |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |

XOR는 서로 다르면 1, XNOR는 같으면 1입니다.

> 회로 기호의 작은 원(bubble)은 반전을 나타냅니다. 전압 임계값은 이 논리 모델에 포함하지 않습니다.

---

# Boolean Identities

| Law | Identity | Interpretation |
| --- | --- | --- |
| Identity | $A+0=A,\;A\cdot1=A$ | 중립값입니다. |
| Domination | $A+1=1,\;A\cdot0=0$ | 한 입력이 출력을 결정합니다. |
| Idempotence | $A+A=A,\;AA=A$ | 같은 신호는 한 번만 필요합니다. |
| Complement | $A+\overline A=1,\;A\overline A=0$ | 보수 관계입니다. |
| Absorption | $A+AB=A$ | A가 이미 AB를 포함합니다. |

분배법칙은 $A(B+C)=AB+AC$와 $A+BC=(A+B)(A+C)$입니다.

> Boolean의 +는 정수 덧셈이 아닙니다. $1+1=1$입니다.

---

# De Morgan's Laws

$$
\overline{AB}=\overline A+\overline B,\qquad
\overline{A+B}=\overline A\,\overline B
$$

| A B | ¬(AB) | ¬A + ¬B | ¬(A+B) | ¬A·¬B |
| --- | ---: | ---: | ---: | ---: |
| 00 | 1 | 1 | 1 | 1 |
| 01 | 1 | 1 | 0 | 0 |
| 10 | 1 | 1 | 0 | 0 |
| 11 | 0 | 0 | 0 | 0 |

부정을 괄호 안으로 옮길 때 **AND↔OR와 각 입력의 부정**을 함께 바꿉니다.

NAND만으로 NOT: $\overline A=\operatorname{NAND}(A,A)$입니다.

---

# SOP & POS

예: $F(A,B)=1$인 행은 01, 10, 11입니다.

$$
F=\overline A B+A\overline B+AB=\Sigma m(1,2,3)
$$

**SOP:** AND 항들의 OR입니다. 1인 행에서 minterm을 만듭니다.

$$
F=(A+B)=\Pi M(0)
$$

**POS:** OR 항들의 AND입니다. 0인 행에서 maxterm을 만듭니다.

> Minterm은 해당 행에서만 1, maxterm은 해당 행에서만 0입니다. 행 번호는 AB의 binary 값입니다.

---

# Simplification to a Circuit

$$
F=AB+A\overline B=A(B+\overline B)=A
$$

<LocalDiagram src="images/gates.svg" alt="A and B feed one AND; A and inverted B feed another AND; both outputs feed OR, equivalent to a wire carrying A" />

| AB | 00 | 01 | 10 | 11 |
| --- | --- | --- | --- | --- |
| AB + A¬B | 0 | 0 | 1 | 1 |
| A | 0 | 0 | 1 | 1 |

논리 동치와 지연 동치는 다릅니다. 실제 게이트에는 지연이 있습니다.

---
routeAlias: lab-gates
class: lab-slide
---

# Logic Gate Simulator

게이트와 입력을 바꾸고, 선택한 진리표의 행을 확인하세요.

<LogicGateSimulator />

---
routeAlias: quiz-ch02
clicks: 2
class: quiz-slide
---

# Check Your Logic

<QuizReveal :step="$clicks">

1. $\overline{A+BC}$를 입력 부정만 사용하는 식으로 바꾸세요.
2. $A+\overline A B$를 간소화하세요.
3. XOR와 OR가 다른 출력을 내는 입력은 무엇인가요?

<template #answer>

**검산:** $\overline A(\overline B+\overline C)$ / $A+B$ / A=B=1입니다.

</template>
<template #explanation>

두 번째 식은 $(A+\overline A)(A+B)=A+B$로 증명할 수 있습니다.

간소화 뒤에는 입력 전 조합에서 원래 식과 같은지 확인하세요.

</template>
</QuizReveal>
