import test from 'node:test'
import assert from 'node:assert/strict'
import { logicGate, fullAdder, addWord, setupTiming, holdSlack, gray, detect101Mealy, detect101Moore } from '../lib/logic.mjs'
import { pagesBase } from '../scripts/pages-base.mjs'

test('all six gates × four inputs, independently specified truth tables', () => {
  const expected = { AND: [0, 0, 0, 1], OR: [0, 1, 1, 1], XOR: [0, 1, 1, 0], NAND: [1, 1, 1, 0], NOR: [1, 0, 0, 0], XNOR: [1, 0, 0, 1] }
  for (const [gate, rows] of Object.entries(expected)) {
    for (let n = 0; n < 4; n++) assert.equal(logicGate(gate, n >> 1, n & 1), rows[n], `${gate} ${n}`)
  }
  assert.throws(() => logicGate('BAD', 0, 0), RangeError)
  assert.throws(() => logicGate('AND', 2, 0), RangeError)
})

test('full adder: all eight inputs satisfy integer conservation', () => {
  for (let n = 0; n < 8; n++) {
    const a = n >> 2, b = (n >> 1) & 1, cin = n & 1
    const total = a + b + cin
    const result = fullAdder(a, b, cin)
    assert.equal(result.sum, total % 2)
    assert.equal(result.cout, Math.floor(total / 2))
  }
})

test('all 65,536 eight-bit additions: carry and signed overflow are independent', () => {
  const signed = v => v < 128 ? v : v - 256
  for (let a = 0; a < 256; a++) for (let b = 0; b < 256; b++) {
    const total = a + b, signedTotal = signed(a) + signed(b)
    const r = addWord(a, b)
    assert.equal(r.result, total % 256)
    assert.equal(r.carry, Number(total > 255))
    assert.equal(r.overflow, Number(signedTotal < -128 || signedTotal > 127))
  }
  assert.deepEqual(addWord(127, 1), { result: 128, carry: 0, overflow: 1 })
  assert.deepEqual(addWord(255, 1), { result: 0, carry: 1, overflow: 0 })
  assert.deepEqual(addWord(128, 128), { result: 0, carry: 1, overflow: 1 })
})

const defaults = { tclk: 10, tcq: 1, comb: 7, setup: 1, skew: 0, uncertainty: 0.5 }
test('setup: positive/negative skew and exact PASS/VIOLATION boundary', () => {
  assert.deepEqual(setupTiming(defaults), { arrival: 8, required: 8.5, slack: 0.5, pass: true })
  assert.equal(setupTiming({ ...defaults, skew: 0.5 }).slack, 1)
  assert.equal(setupTiming({ ...defaults, skew: -0.5 }).slack, 0)
  assert.equal(setupTiming({ ...defaults, skew: -0.5 }).pass, true)
  assert.equal(setupTiming({ ...defaults, skew: -0.6 }).slack, -0.1)
  assert.equal(setupTiming({ ...defaults, skew: -0.6 }).pass, false)
  assert.equal(setupTiming({ tclk: 1, tcq: 0.1, comb: 0.2, setup: 0.3, uncertainty: 0.4, skew: 0 }).slack, 0)
  assert.throws(() => setupTiming({ ...defaults, comb: -1 }), RangeError)
  assert.throws(() => setupTiming({ ...defaults, tclk: NaN }), RangeError)
})

test('setup and hold respond to positive skew in opposite directions', () => {
  const h = { tcqMin: 0.2, combMin: 0.3, hold: 0.2, skew: 0.4, uncertainty: 0.1 }
  assert.equal(holdSlack(h), -0.2)
  assert.equal(holdSlack({ ...h, skew: -0.1 }), 0.3)
  assert.equal(setupTiming({ ...defaults, skew: 0.5 }).slack - setupTiming(defaults).slack, 0.5)
})

test('4-variable K-map: canonical minterms equal reduced SOP and POS for all 16 inputs', () => {
  const ones = new Set([0, 2, 5, 7, 8, 10, 13, 15])
  for (let n = 0; n < 16; n++) {
    const b = (n >> 2) & 1, d = n & 1
    assert.equal(Number((!b && !d) || (b && d)), Number(ones.has(n)))
    assert.equal(Number((b || !d) && (!b || d)), Number(ones.has(n)))
  }
})

test('binary reflected Gray code changes one bit per adjacent count, including wrap', () => {
  const bits = n => n.toString(2).replaceAll('0', '').length
  for (let i = 0; i < 16; i++) assert.equal(bits(gray(i) ^ gray((i + 1) % 16)), 1)
})

test('Moore and Mealy detect overlapping 101: every bit of every 10-bit stream', () => {
  for (let n = 0; n < 1024; n++) {
    let m = 'A', r = 'A', seen = ''
    for (const value of n.toString(2).padStart(10, '0')) {
      const x = Number(value)
      seen += value
      const expected = Number(seen.endsWith('101'))
      const mealy = detect101Mealy(m, x), moore = detect101Moore(r, x)
      assert.equal(mealy.y, expected, `Mealy ${seen}`)
      assert.equal(moore.y, expected, `Moore ${seen}`)
      m = mealy.state; r = moore.state
    }
  }
})

test('array yield worked examples under independent equal-p assumption', () => {
  assert(Math.abs((1 - 1e-4) ** 1024 - 0.90266379) < 1e-7)
  assert.equal(((1 - 1e-5) ** 1024 * 100).toFixed(2), '98.98')
})

test('Pages base handles project and user site without hardcoded repository', () => {
  assert.equal(pagesBase('instructor/logic-seminar'), '/logic-seminar/')
  assert.equal(pagesBase('instructor/instructor.github.io'), '/')
  assert.equal(pagesBase('Teacher/teacher.github.io'), '/')
  assert.throws(() => pagesBase(''), /owner\/repo/)
  assert.throws(() => pagesBase('owner/../../etc'), /owner\/repo/)
})
