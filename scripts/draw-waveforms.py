"""Generate original symbolic SVG teaching diagrams; no electrical simulation."""
from pathlib import Path

DEST = Path(__file__).resolve().parents[1] / 'public' / 'images'


def svg(title, height, content):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 {height}" role="img" aria-labelledby="title">
<title id="title">{title}</title><style>text{{fill:#26343C;font:16px Noto Sans KR Variable,Malgun Gothic,sans-serif}}.muted{{fill:#536068;font-size:13px}}.wave{{stroke:#086F69;stroke-width:2.5;fill:none}}.guide{{stroke:#536068;stroke-dasharray:4 4}}</style>{content}</svg>'''


def wave(label, y, changes, end=10, color='#086F69'):
    x = lambda t: 150 + 65 * t
    prev = changes[0][1]
    path = f'M{x(0)} {y-22*prev}'
    for time, val in changes[1:]:
        path += f'H{x(time)}V{y-22*val}'
    path += f'H{x(end)}'
    return f'<text x="10" y="{y-4}">{label}</text><path d="{path}" fill="none" stroke="{color}" stroke-width="2.5"/>'


def write(name, title, height, content):
    (DEST / name).write_text(svg(title, height, content), encoding='utf-8')


guides = ''.join(f'<path class="guide" d="M{150+65*t} 22V222"/><text class="muted" x="{146+65*t}" y="240">t{t}</text>' for t in [1, 4, 6, 9])
write('latch-ff.svg', 'Ideal latch and flip-flop waveforms, initial Q=0', 255,
      guides + wave('EN / CLK', 55, [(0, 0), (1, 1), (4, 0), (6, 1), (9, 0)])
      + wave('D', 107, [(0, 0), (2, 1), (3, 0), (5, 1), (7, 0)])
      + wave('Latch Q', 159, [(0, 0), (2, 1), (3, 0), (6, 1), (7, 0)])
      + wave('D FF Q', 211, [(0, 0), (6, 1)])
      + '<text class="muted" x="210" y="18">sample ↑</text><text class="muted" x="535" y="18">sample ↑</text>')

write('setup-window.svg', 'Setup and hold window around a rising edge', 195,
      '<rect x="340" y="12" width="210" height="158" fill="#EEECE5"/>'
      '<path class="guide" d="M450 5V175"/>'
      '<text class="muted" x="349" y="30">setup</text><text class="muted" x="478" y="30">hold</text>'
      + wave('CLK', 77, [(0, 0), (4.6154, 1), (8, 0)])
      + wave('D (example)', 125, [(0, 0), (2, 1), (7, 0)])
      + wave('Q (example)', 171, [(0, 0), (5.5, 1)])
      + '<text class="muted" x="563" y="149">Tcq →</text>')

write('cdc.svg', 'One possible two-FF synchronizer outcome, not an analog simulation', 235,
      ''.join(f'<path class="guide" d="M{150+65*t} 8V210"/><text class="muted" x="{144+65*t}" y="229">E{i+1}</text>' for i, t in enumerate([2, 5, 8]))
      + wave('CLKdest', 50, [(0, 0), (2, 1), (3.5, 0), (5, 1), (6.5, 0), (8, 1), (9.5, 0)])
      + wave('async D', 100, [(0, 0), (1.95, 1)])
      + '<text x="10" y="146">FF1 Q</text><path class="wave" d="M150 150H280L287 137L294 145L301 132L308 140L315 128H800"/><text class="muted" x="324" y="153">possible resolution to 1</text>'
      + wave('FF2 Q', 200, [(0, 0), (5, 1)]))

write('sram-timing.svg', 'Conceptual SRAM read and write phases, not voltage simulation', 265,
      '<text x="10" y="20">READ: Q=0</text><text class="muted" x="155" y="20">precharge → develop → sense</text>'
      + wave('PCH enable', 59, [(0, 1), (2, 0), (8.5, 1)])
      + wave('WL (read)', 101, [(0, 0), (3, 1), (8, 0)])
      + '<text x="10" y="137">BL / BLB</text><path d="M150 119H345L540 135H702.5V119H800M150 116H800" stroke="#086F69" stroke-width="2" fill="none"/><text class="muted" x="545" y="154">sense differential</text>'
      + '<text x="10" y="182">WRITE Q←0</text><text class="muted" x="190" y="182">drive BL=0, BLB=1 before WL↑; release after WL↓</text>'
      + wave('Write drive', 222, [(0, 0), (2, 1), (9, 0)])
      + wave('WL (write)', 260, [(0, 0), (3, 1), (8, 0)]))
