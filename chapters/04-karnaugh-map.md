---
routeAlias: ch04
---

<ChapterHeader number="04" />

# Karnaugh Map & Logic Minimization

<p class="chapter-lead">인접한 항에서 변하는 변수를 제거합니다.</p>

선수 지식: SOP/POS와 minterm/maxterm입니다.

<div class="objectives">

- 2–4변수 K-map을 Gray 순서로 채울 수 있습니다.
- 경계 인접성과 don't-care를 이용해 SOP/POS를 만들 수 있습니다.
- 4변수 간소화 결과를 16개 입력에서 검증할 수 있습니다.

</div>

<!-- Source: Mano & Ciletti, Digital Design, 5th ed., Ch. 3. -->

---

# Minterms & Gray Adjacency

$m_5$는 ABC=101일 때만 1인 $A\overline BC$입니다.
$M_5=(\overline A+B+\overline C)$는 같은 행에서만 0입니다.

<div class="two-col">
<div>

2변수: $F=\Sigma m(1,3)=B$

| A \ B | 0 | 1 |
| --- | --- | --- |
| 0 | 0 | 1 |
| 1 | 0 | 1 |

</div>
<div>

3변수: $F=\Sigma m(1,3,5,7)=C$

| A \ BC | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 |

</div>
</div>

> 00→01→11→10 순서입니다. 이웃 셀은 한 변수만 다릅니다. 대각선은 인접하지 않습니다.

---

# Four-variable Worked Map

$F(A,B,C,D)=\Sigma m(0,2,5,7,8,10,13,15)$입니다.

| AB \ CD | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 00 | 1 α | 0 | 0 | 1 α |
| 01 | 0 | 1 β | 1 β | 0 |
| 11 | 0 | 1 β | 1 β | 0 |
| 10 | 1 α | 0 | 0 | 1 α |

**α:** 네 모서리를 묶으면 B=0, D=0만 남습니다 → $\overline B\overline D$.

**β:** 중앙 2×2를 묶으면 B=1, D=1만 남습니다 → $BD$.

$$F=\overline B\overline D+BD=\overline{B\oplus D}$$

---

# Verify All Sixteen Inputs

A와 C는 결과에서 사라집니다. 각 BD에 대해 AC 네 조합을 검증합니다.

| B D | AC=00 | AC=01 | AC=10 | AC=11 | Simplified F |
| --- | --- | --- | --- | --- | --- |
| 00 | m0=1 | m2=1 | m8=1 | m10=1 | 1 |
| 01 | m1=0 | m3=0 | m9=0 | m11=0 | 0 |
| 10 | m4=0 | m6=0 | m12=0 | m14=0 | 0 |
| 11 | m5=1 | m7=1 | m13=1 | m15=1 | 1 |

- 그룹 크기는 1, 2, 4, 8, 16입니다. 직사각형이어야 합니다.
- 그룹은 겹칠 수 있으며, 좌우와 위아래가 이어집니다.

> 각 1을 적어도 한 번 포함하고, 0은 SOP 그룹에 포함하지 않습니다.

---

# POS from Zero Groups

앞선 map의 0을 묶어 POS를 구합니다.

| Zero group | Constant variables | Sum term |
| --- | --- | --- |
| B=0, D=1 | B는 0, D는 1 | $(B+\overline D)$ |
| B=1, D=0 | B는 1, D는 0 | $(\overline B+D)$ |

$$
F=(B+\overline D)(\overline B+D)
$$

Maxterm은 그룹의 0에서 0이어야 합니다. 따라서 **0인 변수는 그대로, 1인 변수는 반전**합니다.

> SOP는 1의 그룹을 OR하고, POS는 0의 그룹에서 얻은 sum term을 AND합니다.

---

# Don't-care Is a Specification

3변수 예: $F=\Sigma m(1,3)$, $d=\Sigma m(5,7)$입니다.

| A \ BC | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | X | X | 0 |

X를 1로 활용하면 네 셀을 묶어 $F=C$가 됩니다.

- 명세가 지정한 0/1에서만 원래 함수와 일치해야 합니다.
- X는 필요할 때 사용하며 반드시 묶을 필요는 없습니다.
- 입력 101·111이 실제로 발생할 수 있다면 출력 허용 조건을 재검토해야 합니다.

---

# Check Your Grouping

1. 네 모서리가 한 그룹이 되는 이유는 무엇인가요?
2. $F=\Sigma m(0,2,8,10)$을 4변수 map에서 간소화하세요.
3. 최소 SOP가 언제나 가장 빠르고 hazard-free인 회로인가요?

<div class="panel">

**검산:** 위아래·좌우 wraparound로 인접합니다 / $\overline B\overline D$ / 아닙니다.

예: $AB+\overline AC$에서 B=C=1인 채 A가 바뀌면 static-1 hazard가 생길 수 있습니다. Consensus 항 BC는 논리값을 유지하며 해당 hazard를 줄입니다.

</div>
