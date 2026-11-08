---
theme: default
layout: default
title: Logic Design Fundamentals
info: Digital Logic to SRAM · 공개 교육용 디지털 논리설계 세미나
author: Logic Design Seminar
lang: ko
favicon: /favicon.svg
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
transition: none
drawings:
  enabled: false
fonts:
  provider: none
  sans: Noto Sans KR Variable, Malgun Gothic, Apple SD Gothic Neo, sans-serif
  mono: Consolas, monospace
---

<div class="seminar-cover">
<div>
  <div class="eyebrow">A circuit-first learning journey</div>
  <h1>Logic Design<br>Fundamentals</h1>
  <p class="subtitle">Digital Logic to SRAM</p>
  <Link to="toc" class="start-link">Start →</Link>
  <p class="cover-note">12 Chapters · 3 Interactive Labs<br>학부 고학년 및 주니어 디지털 설계 엔지니어를 위한 과정입니다.</p>
</div>
<LocalDiagram src="images/cover.svg" alt="Learning path from bits through gates, state and timing to SRAM" />
</div>

---
routeAlias: toc
---

# Course Contents

<p class="small">챕터를 선택하세요. ← / → 키로 이동하며, 실습에서는 Tab으로 조작합니다.</p>

<nav class="toc-grid" aria-label="Course chapters">
  <Link to="ch01" class="toc-card"><b>01</b><span>Number Systems &amp;<br>Data Representation<small>BITS · SIGNED VALUES</small></span></Link>
  <Link to="ch02" class="toc-card"><b>02</b><span>Boolean Algebra &amp;<br>Logic Gates<small>TRUTH TABLES · GATE LAB</small></span></Link>
  <Link to="ch03" class="toc-card"><b>03</b><span>Combinational Circuits<small>MUX · ENCODING · DELAY</small></span></Link>
  <Link to="ch04" class="toc-card"><b>04</b><span>Karnaugh Map &amp;<br>Logic Minimization<small>GRAY ORDER · SOP / POS</small></span></Link>
  <Link to="ch05" class="toc-card"><b>05</b><span>Adders &amp;<br>Arithmetic Circuits<small>CARRY · ADDER LAB</small></span></Link>
  <Link to="ch06" class="toc-card"><b>06</b><span>Latches &amp; Flip-Flops<small>TRANSPARENCY · SAMPLING</small></span></Link>
  <Link to="ch07" class="toc-card"><b>07</b><span>Sequential Circuits<small>COUNTER · RESET · SHIFT</small></span></Link>
  <Link to="ch08" class="toc-card"><b>08</b><span>Finite State Machines<small>MOORE &amp; MEALY</small></span></Link>
  <Link to="ch09" class="toc-card"><b>09</b><span>Timing Constraints<br>&amp; Static Timing Analysis<small>SETUP / HOLD · TIMING LAB</small></span></Link>
  <Link to="ch10" class="toc-card"><b>10</b><span>Metastability &amp;<br>Clock Domain Crossing<small>SYNCHRONIZER · PROTOCOLS</small></span></Link>
  <Link to="ch11" class="toc-card"><b>11</b><span>Control Unit &amp; Microcode<small>ADVANCED / ELECTIVE</small></span></Link>
  <Link to="ch12" class="toc-card"><b>12</b><span>SRAM Memory<small>6T CELL · ARRAY · YIELD</small></span></Link>
</nav>

---
src: ./chapters/01-number-systems.md
---

---
src: ./chapters/02-boolean-algebra.md
---

---
src: ./chapters/03-combinational-circuits.md
---

---
src: ./chapters/04-karnaugh-map.md
---

---
src: ./chapters/05-adders.md
---

---
src: ./chapters/06-latches-flipflops.md
---

---
src: ./chapters/07-sequential-circuits.md
---

---
src: ./chapters/08-fsm.md
---

---
src: ./chapters/09-timing-sta.md
---

---
src: ./chapters/10-metastability-cdc.md
---

---
src: ./chapters/11-microcode.md
---

---
src: ./chapters/12-sram.md
---
