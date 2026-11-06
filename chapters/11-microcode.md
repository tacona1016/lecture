---
routeAlias: ch11
---

<ChapterHeader number="11" elective />

# Control Unit & Microcode

<p class="chapter-lead">Advanced / Elective · 제어 신호의 시퀀스를 작은 프로그램으로 표현합니다.</p>

선수 지식: register, MUX, ALU, FSM입니다. SRAM 학습의 필수 선수 과정은 아닙니다.

<div class="objectives">

- Datapath와 control unit의 역할을 분리할 수 있습니다.
- Hardwired/microprogrammed 및 horizontal/vertical 제어를 비교할 수 있습니다.
- 명시한 toy ISA의 fetch/execute micro-operation을 추적할 수 있습니다.

</div>

<!-- Source: Patterson & Hennessy, Computer Organization and Design, multicycle control; Mano, Computer System Architecture, microprogrammed control. Toy ISA and microcode are original educational examples. -->

---

# Datapath & Control Unit

```mermaid
flowchart LR
  CU["Control unit / microsequencer"] -- "enables, mux selects, ALU op" --> DP["Registers · ALU · buses"]
  DP -- "opcode, flags, ready" --> CU
  CS["Control store"] --> CU
```

- **Datapath:** 값을 저장·선택·계산합니다.
- **Control unit:** 어느 cycle에 어떤 연산을 수행할지 정합니다.
- **Control store:** microinstruction을 보관합니다. 구현은 ROM 또는 writable memory 등으로 달라집니다.

> Microcode의 한 microinstruction과 ISA의 한 instruction은 서로 다른 계층입니다.

---

# Control Implementation Choices

| Choice | Representation | Trade-off |
| --- | --- | --- |
| Hardwired | FSM와 조합 decode | 직접 제어 경로, 변경 시 논리 수정 |
| Microprogrammed | 제어 word와 sequencer | 복잡한 순서 표현에 유리, store 접근 비용 |
| Horizontal | 제어 bit를 넓게 펼침 | 병렬 제어 쉬움, 넓은 word |
| Vertical | field를 encode | 좁은 word, decode 필요 |

실제 구현은 혼합할 수 있습니다. Microprogrammed라고 모두 software update가 가능한 것은 아닙니다.

> 전체 성능과 면적은 store, datapath, decode 구조에 따라 달라집니다.

---

# A Tiny Instruction Set

교육용 가정: 8-bit PC·A·IR, 256×8 **비동기 read** instruction ROM입니다.
ROM은 한 cycle 안에 안정되고, 제어 word는 datapath FF의 상승 에지 전에 안정됩니다.

| Opcode byte | Instruction | Effect |
| --- | --- | --- |
| 00 | NOP | A 유지 |
| 10 | INC A | $A\leftarrow(A+1)\bmod256$ |
| 20 | CLR A | $A\leftarrow0$ |

모든 instruction은 1 byte입니다. Fetch 시 PC가 다음 주소로 증가합니다.

> 동기 SRAM, variable latency memory, interrupt는 이 toy 모델에 포함하지 않습니다.

---

# Fetch / Decode / Execute

초기 PC=00, A=03이며 ROM[00]=10, ROM[01]=20입니다.

| Microaddress | Signals / operation at ending edge | Next |
| --- | --- | --- |
| μ0 Fetch | IR ← ROM[PC], PC ← PC+1 | μ1 |
| μ1 Decode | datapath 유지 | opcode별 dispatch |
| μ2 INC | A ← A+1 | μ0 |
| μ3 CLR | A ← 0 | μ0 |
| μ4 NOP | datapath 유지 | μ0 |

첫 instruction: μ0에서 IR=10, PC=01 → μ1 → μ2에서 A=04입니다.

다음 instruction: μ0에서 IR=20, PC=02 → μ1 → μ3에서 A=00입니다.

---

# Microinstruction & Sequencer

예시 word: `[IR_load, PC_inc, A_load, A_select, next_mode, next_addr]`입니다.

| Word field | Example setting in μ2 |
| --- | --- |
| IR_load / PC_inc | 0 / 0 |
| A_load / A_select | 1 / increment |
| next_mode / next_addr | direct / μ0 |

Dispatch는 opcode=00→μ4, 10→μ2, 20→μ3입니다.
나머지 opcode는 명시한 trap self-loop로 보냅니다. 외부 reset이 μ0으로 복귀시킵니다.

> 한 bus를 여러 driver가 동시에 구동하지 않도록 제어 word의 상호배제 조건을 검증해야 합니다.

---

# Check Your Control Sequence

1. μ0에서 IR load와 PC increment를 같은 edge에 수행해도 되는 이유는?
2. 시작 A=FF에서 INC A를 한 번 수행하면?
3. 위 toy ISA에서 microcoded control을 위해 반드시 SRAM이 필요한가요?

<div class="panel">

**검산:** IR은 edge 직전 PC가 가리키는 ROM 값을 샘플합니다 / A=00, 8-bit modulo / 아닙니다. ROM control store도 가능합니다.

Micro-operation의 동시 실행은 datapath 연결과 memory timing 가정 안에서만 유효합니다.

</div>
