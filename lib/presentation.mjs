import { fullAdder, setupTiming } from './logic.mjs'

// Presentation coordinates and stage traces; logical calculations remain in logic.mjs.
export function rippleTrace(a, b, width = 4, cin = 0) {
  if (!Number.isInteger(width) || width < 1 || width > 8) throw new RangeError('Width must be 1–8')
  if (![a,b].every(v => Number.isInteger(v) && v >= 0 && v < 2 ** width)) throw new RangeError('Word out of range')
  let carry = cin
  const stages = []
  for (let i = 0; i < width; i++) {
    const ai = (a >> i) & 1, bi = (b >> i) & 1
    const result = fullAdder(ai, bi, carry)
    stages.push({ i, a: ai, b: bi, cin: carry, ...result })
    carry = result.cout
  }
  const word = stages.reduce((sum, row) => sum + row.sum * 2 ** row.i, 0)
  return { stages, word, carry, overflow: stages.at(-1).cin ^ carry }
}

export function setupGeometry(values) {
  const result = setupTiming(values)
  const capture = Math.round((values.tclk + values.skew) * 1000) / 1000
  const min = Math.min(0, result.required, capture) - 1
  const max = Math.max(1, result.arrival, capture, values.tcq) + 1
  const x = value => 78 + (value - min) / (max - min) * 744
  const arrivalX = x(result.arrival), requiredX = x(result.required)
  return { ...result, capture, min, max,
    launchX: x(0), tcqX: x(values.tcq), captureX: x(capture), arrivalX, requiredX,
    slackX: Math.min(arrivalX, requiredX), slackWidth: Math.abs(arrivalX - requiredX),
    ticks: Array.from({length:6}, (_,i) => ({ value: min + (max - min) * i / 5, x: x(min + (max - min) * i / 5) })),
  }
}
