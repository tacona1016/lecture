export const gates = Object.freeze({
  AND: { expression: 'Y = A · B', evaluate: (a, b) => a & b },
  OR: { expression: 'Y = A + B', evaluate: (a, b) => a | b },
  XOR: { expression: 'Y = A ⊕ B', evaluate: (a, b) => a ^ b },
  NAND: { expression: 'Y = ¬(A · B)', evaluate: (a, b) => 1 - (a & b) },
  NOR: { expression: 'Y = ¬(A + B)', evaluate: (a, b) => 1 - (a | b) },
  XNOR: { expression: 'Y = ¬(A ⊕ B)', evaluate: (a, b) => 1 - (a ^ b) },
})
function bit(value) {
  if (value !== 0 && value !== 1) throw new RangeError('Expected binary 0 or 1')
  return value
}
export function logicGate(name, a, b) {
  if (!Object.hasOwn(gates, name)) throw new RangeError('Unknown gate')
  return gates[name].evaluate(bit(a), bit(b))
}
export function fullAdder(a, b, cin) {
  bit(a); bit(b); bit(cin)
  return { sum: a ^ b ^ cin, cout: (a & b) | (cin & (a ^ b)) }
}
export function addWord(a, b, width = 8) {
  if (!Number.isInteger(width) || width < 1 || width > 16) throw new RangeError('Width must be 1–16')
  const modulus = 2 ** width
  if (![a, b].every(v => Number.isInteger(v) && v >= 0 && v < modulus)) throw new RangeError('Word out of range')
  const result = (a + b) % modulus
  const sign = modulus / 2
  const overflow = Number((a < sign) === (b < sign) && (result < sign) !== (a < sign))
  return { result, carry: Number(a + b >= modulus), overflow }
}
// Integer picoseconds keep the 0.1 ns UI boundary exact (including decimal sums).
export function setupTiming({ tclk, tcq, comb, setup, skew, uncertainty }) {
  const values = { tclk, tcq, comb, setup, skew, uncertainty }
  if (!Object.values(values).every(Number.isFinite)) throw new RangeError('Finite delays required')
  if (tclk <= 0 || [tcq, comb, setup, uncertainty].some(v => v < 0)) throw new RangeError('Invalid timing value')
  const ps = v => Math.round(v * 1000)
  const arrival = ps(tcq) + ps(comb)
  const required = ps(tclk) + ps(skew) - ps(setup) - ps(uncertainty)
  const slack = required - arrival
  return { arrival: arrival / 1000, required: required / 1000, slack: slack / 1000, pass: slack >= 0 }
}
export function holdSlack({ tcqMin, combMin, hold, skew, uncertainty }) {
  return Math.round((tcqMin + combMin - hold - skew - uncertainty) * 1000) / 1000
}
export const gray = n => n ^ (n >> 1)
export function detect101Mealy(state, x) {
  bit(x)
  const table = { A: ['A', 'B'], B: ['C', 'B'], C: ['A', 'B'] }
  if (!table[state]) throw new RangeError('Unknown state')
  return { state: table[state][x], y: Number(state === 'C' && x === 1) }
}
export function detect101Moore(state, x) {
  bit(x)
  const table = { A: ['A', 'B'], B: ['C', 'B'], C: ['A', 'D'], D: ['C', 'B'] }
  if (!table[state]) throw new RangeError('Unknown state')
  const next = table[state][x]
  return { state: next, y: Number(next === 'D') }
}
