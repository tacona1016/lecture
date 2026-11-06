---
routeAlias: ch06
---

<ChapterHeader number="06" />

# Latches & Flip-Flops

<p class="chapter-lead">저장 소자가 입력을 받아들이는 시간 구간을 구분합니다.</p>

선수 지식: 피드백, 게이트, 조합 경로 지연입니다.

<div class="objectives">

- SR latch의 hold·set·reset·금지 입력을 구분할 수 있습니다.
- D latch와 상승 에지 D FF의 파형을 비교할 수 있습니다.
- Enable·setup·hold·clock-to-Q의 역할을 설명할 수 있습니다.

</div>

<!-- Source: Harris & Harris, DDCA, 2nd ed., Ch. 3. NOR SR latch has active-high inputs. -->

---

# SR Latch: Active-high NOR

두 NOR를 교차 결합합니다: $Q=\overline{R+Q_B}$, $Q_B=\overline{S+Q}$입니다.

| S | R | Q next | QB next | Behavior |
| --- | --- | --- | --- | --- |
| 0 | 0 | Q | QB | Hold |
| 1 | 0 | 1 | 0 | Set |
| 0 | 1 | 0 | 1 | Reset |
| 1 | 1 | 0 | 0 | Forbidden |

S=R=1에서는 Q/QB가 보수가 아닙니다. 동시에 해제하면 최종 상태를 보장하지 못합니다.

> NAND형 SR latch는 active-low 입력이므로 표가 달라집니다. 극성을 먼저 확인하세요.

---

# D Latch & Edge-triggered D FF

| Storage | Acceptance | Model |
| --- | --- | --- |
| D latch | EN=1인 구간 전체 | EN=1이면 Q가 D를 따릅니다. |
| D latch | EN=0인 구간 | 이전 Q를 유지합니다. |
| Rising-edge D FF | CLK 상승 에지 | 에지에서 D를 샘플합니다. |

Gated D latch: $S=EN\cdot D$, $R=EN\cdot\overline D$로 SR의 금지 조합을 피합니다.

두 latch를 서로 반대 위상으로 연결하는 master–slave 구조로 edge 동작을 설명할 수 있습니다.

> Latch의 transparency는 구간이고 FF의 sampling은 에지입니다. 둘을 같은 저장 모델로 취급하지 않습니다.

---

# Transparency vs Sampling

<LocalDiagram src="latch-ff.svg" alt="Ideal waveforms: enable high from t1 to t4 and t6 to t9; latch follows D while high; D flip-flop updates only at t1 and t6 rising edges" />

- EN/CLK가 높은 동안 D가 바뀌면 latch Q는 따라갑니다.
- FF Q는 표시된 상승 에지의 D만 저장합니다.
- 초기 Q=0, setup/hold 충족, 전파 지연 0인 **이상적 파형**입니다.

> 실제 FF Q는 에지 이후 clock-to-Q만큼 늦게 변합니다.

---

# Setup, Hold & Clock-to-Q

<LocalDiagram src="setup-window.svg" alt="D must be stable from t_edge minus setup to t_edge plus hold; Q may update after clock-to-Q delay" />

| Quantity | Requirement |
| --- | --- |
| Setup $T_{setup}$ | 에지 전 D가 안정되어야 하는 시간입니다. |
| Hold $T_{hold}$ | 에지 후 D가 유지되어야 하는 시간입니다. |
| Clock-to-Q $T_{cq}$ | 유효 에지에서 Q 응답까지의 지연입니다. |

위반은 단순히 이전 값 저장만을 뜻하지 않습니다. Metastability 가능성도 있습니다.

---

# Enable, JK & T Flip-Flops

상승 에지 D FF에 enable E를 구현하면 $D_{FF}=ED+\overline EQ$입니다.

| JK | Q next | T | Q next |
| --- | --- | --- | --- |
| 00 | Q 유지 | 0 | Q 유지 |
| 01 | 0 | 1 | ¬Q |
| 10 | 1 | — | — |
| 11 | ¬Q | — | — |

T FF: $Q^+=Q\oplus T$. JK는 J=K=1이면 토글합니다.

> Enable을 만들려고 일반 AND로 clock을 자르면 glitch와 짧은 pulse가 생길 수 있습니다. 데이터 MUX 또는 검증된 clock-gating 구조를 사용합니다.

---

# Check Your Storage Model

1. EN=1인 D latch에서 D가 0→1→0이면 Q는 어떻게 되나요?
2. FF의 두 상승 에지 사이에서 D만 바뀌면 Q가 즉시 바뀌나요?
3. Setup이 충족되면 hold도 자동으로 충족되나요?

<div class="panel">

**검산:** 지연 뒤 0→1→0을 따릅니다 / 아닙니다 / 아닙니다.

Setup은 늦게 도착하는 max 경로, hold는 너무 빨리 도착하는 min 경로와 관련됩니다. 9장에서 각각 계산합니다.

</div>
