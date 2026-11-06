---
routeAlias: ch01
---

<ChapterHeader number="01" />

# Number Systems & Data Representation

<p class="chapter-lead">같은 bit pattern도 해석 규칙에 따라 값이 달라집니다.</p>

선수 지식: 정수의 사칙연산과 자리값입니다.

<div class="objectives">

- Binary·Decimal·Hex 사이에서 값을 변환할 수 있습니다.
- 2's complement와 sign extension을 계산할 수 있습니다.
- 8-bit 덧셈에서 carry와 signed overflow를 각각 판정할 수 있습니다.

</div>

<!-- Source: Harris & Harris, Digital Design and Computer Architecture, 2nd ed., Ch. 1. -->

---

# Positional Number Systems

$$
(d_{n-1}\cdots d_0)_r = \sum_{i=0}^{n-1} d_i r^i
$$

| Representation | Worked conversion |
| --- | --- |
| Binary | $101101_2=32+8+4+1=45_{10}$ |
| Hex | $2D_{16}=2\times16+13=45_{10}$ |
| Nibble grouping | $0010\;1101_2=2D_{16}$ |

10진수 → 2진수: 2로 나눈 나머지를 아래에서 위로 읽습니다.

> Hex 한 자리는 정확히 4 bits입니다. 8-bit 값은 두 자리 Hex로 표현합니다.

---

# Unsigned vs Signed

$$
U=\sum_{i=0}^{n-1} b_i2^i,\qquad
S=-b_{n-1}2^{n-1}+\sum_{i=0}^{n-2}b_i2^i
$$

| 8-bit pattern | Unsigned | 2's complement |
| --- | ---: | ---: |
| 0111 1111 | 127 | +127 |
| 1000 0000 | 128 | −128 |
| 1111 1111 | 255 | −1 |

Unsigned 범위는 $0\ldots2^n-1$, signed 범위는 $-2^{n-1}\ldots2^{n-1}-1$입니다.

> Signedness는 비트 자체에 저장되지 않습니다. 연산 규칙과 자료형이 정합니다.

---

# Representing Negative Integers

8-bit에서 +5는 `0000 0101`입니다.

| Encoding | −5 | Zero |
| --- | --- | --- |
| Sign magnitude | 1000 0101 | +0, −0 |
| 1's complement | 1111 1010 | +0, −0 |
| 2's complement | 1111 1011 | 0000 0000 |

2's complement의 음수 생성: **모든 비트 반전 후 1을 더합니다.**

$$
0000\,0101+1111\,1011=1\,0000\,0000
$$

8-bit 결과는 0입니다. 최상위 carry는 저장 폭 밖으로 나갑니다.

---

# Width, Extension & Truncation

| Operation | Example | Meaning |
| --- | --- | --- |
| Zero extension | 1101 → 0000 1101 | Unsigned 13 유지 |
| Sign extension | 1101 → 1111 1101 | Signed −3 유지 |
| Truncate to 4 bits | 0001 1101 → 1101 | 29 → unsigned 13 |

부호 확장은 새 상위 비트를 원래 sign bit로 채웁니다.

고정소수점 예: signed 8-bit raw 값 `0001 1010`에 소수부 4 bits를 두면
$26/2^4=1.625$입니다. 연산 전 스케일을 맞춰야 합니다.

> 폭을 줄이는 것은 값 보존 연산이 아닙니다. 범위와 소수점 위치를 확인하세요.

---

# Carry vs Signed Overflow

모든 예는 **8-bit 덧셈, 하위 8 bits 저장**입니다.

| A + B | Result | Carry C | Overflow V |
| --- | --- | ---: | ---: |
| 0111 1111 + 0000 0001 | 1000 0000 | 0 | 1 |
| 1111 1111 + 0000 0001 | 0000 0000 | 1 | 0 |
| 1000 0000 + 1000 0000 | 0000 0000 | 1 | 1 |

- **C:** unsigned 합이 255를 초과했는지 나타냅니다.
- **V:** 같은 부호 두 수의 합에서 결과 부호가 바뀌면 1입니다.

$$
V=\overline{A_7\oplus B_7}\,(S_7\oplus A_7)
$$

---

# Check Your Representation

1. `1111 0110`의 unsigned 값과 signed 값은 무엇인가요?
2. signed 4-bit `1010`을 8 bits로 확장하세요.
3. 8-bit `0110 0100 + 0011 1100`에서 C와 V는 무엇인가요?

<div class="panel">

**검산:** 246과 −10 / `1111 1010` (−6) / 결과 `1010 0000`, C=0, V=1입니다.

$100+60=160$은 unsigned 범위 안이지만 signed 범위 밖입니다.

</div>

> 다음 회로를 읽기 전에 bit width, signedness, truncation 규칙을 먼저 적으세요.
