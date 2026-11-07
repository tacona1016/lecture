import test from 'node:test'
import assert from 'node:assert/strict'
import { rippleTrace, setupGeometry } from '../lib/presentation.mjs'

test('ripple stage traces conserve every 4-bit sum including carry-in', () => {
  for (let a=0;a<16;a++) for (let b=0;b<16;b++) for (let cin=0;cin<2;cin++) {
    const trace=rippleTrace(a,b,4,cin), total=a+b+cin
    assert.equal(trace.word,total%16)
    assert.equal(trace.carry,Number(total>=16))
    let carry=cin
    for (const row of trace.stages) {
      assert.equal(row.cin,carry)
      assert.equal(2*row.cout+row.sum,row.a+row.b+row.cin)
      carry=row.cout
    }
  }
  assert.deepEqual(rippleTrace(7,1).stages.map(r=>[r.sum,r.cout]),[[0,1],[0,1],[0,1],[1,0]])
  assert.equal(rippleTrace(7,1).overflow,1)
})

test('setup SVG domain includes negative skew and every slider corner', () => {
  const keys=['tclk','tcq','comb','setup','skew','uncertainty']
  const ends=[[1,20],[0,3],[0,15],[0,3],[-3,3],[0,3]]
  let negativeCapture=false, negativeRequired=false, violation=false
  for (let n=0;n<64;n++) {
    const v=Object.fromEntries(keys.map((k,i)=>[k,ends[i][(n>>i)&1]]))
    const g=setupGeometry(v)
    for(const x of [g.launchX,g.tcqX,g.arrivalX,g.captureX,g.requiredX]) assert(x>=78&&x<=822)
    assert(g.launchX<=g.tcqX&&g.tcqX<=g.arrivalX)
    assert(g.requiredX<=g.captureX)
    assert.equal(g.slackWidth,Math.abs(g.arrivalX-g.requiredX))
    assert(g.slackWidth>=0)
    negativeCapture ||= g.capture<0; negativeRequired ||= g.required<0; violation ||= !g.pass
  }
  assert(negativeCapture&&negativeRequired&&violation)
  const boundary=setupGeometry({tclk:10,tcq:1,comb:7,setup:1,skew:-0.5,uncertainty:0.5})
  assert.equal(boundary.slack,0); assert.equal(boundary.slackWidth,0); assert.equal(boundary.pass,true)
})
