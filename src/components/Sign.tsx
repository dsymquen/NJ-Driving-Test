import type { JSX } from 'react'
import type { SignPalette, SignShape, SignSpec } from '../data/signs'

interface Skin {
  face: string
  ink: string
  border: string
}

const SKINS: Record<SignPalette, Skin> = {
  red: { face: '#c1121f', ink: '#ffffff', border: '#ffffff' },
  yellow: { face: '#fbd400', ink: '#111111', border: '#111111' },
  orange: { face: '#f57c00', ink: '#111111', border: '#111111' },
  green: { face: '#046a38', ink: '#ffffff', border: '#ffffff' },
  blue: { face: '#0b5cab', ink: '#ffffff', border: '#ffffff' },
  white: { face: '#f7f7f5', ink: '#111111', border: '#111111' },
  brown: { face: '#6b4423', ink: '#ffffff', border: '#ffffff' },
  yellowgreen: { face: '#c2e812', ink: '#111111', border: '#111111' },
  black: { face: '#1a1a1a', ink: '#ffffff', border: '#ffffff' },
}

/** Where text and symbols may be drawn inside each shape. */
const BOXES: Record<SignShape, { x: number; y: number; w: number; h: number }> = {
  octagon: { x: 16, y: 30, w: 68, h: 40 },
  triangleDown: { x: 22, y: 24, w: 56, h: 28 },
  diamond: { x: 24, y: 26, w: 52, h: 48 },
  pennant: { x: 16, y: 30, w: 52, h: 40 },
  pentagon: { x: 20, y: 28, w: 60, h: 52 },
  circle: { x: 18, y: 22, w: 64, h: 56 },
  crossbuck: { x: 20, y: 40, w: 60, h: 20 },
  rectV: { x: 20, y: 12, w: 60, h: 76 },
  rectH: { x: 10, y: 28, w: 80, h: 44 },
  square: { x: 14, y: 14, w: 72, h: 72 },
}

function shapePath(shape: SignShape): JSX.Element | null {
  switch (shape) {
    case 'octagon': {
      const r = 47
      const pts = Array.from({ length: 8 }, (_, i) => {
        const a = (Math.PI / 4) * i + Math.PI / 8
        return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`
      }).join(' ')
      return <polygon points={pts} />
    }
    case 'triangleDown':
      return <polygon points="4,14 96,14 50,94" />
    case 'diamond':
      return <polygon points="50,3 97,50 50,97 3,50" />
    case 'pennant':
      return <polygon points="6,6 97,50 6,94" />
    case 'pentagon':
      return <polygon points="50,3 96,38 78,95 22,95 4,38" />
    case 'circle':
      return <circle cx="50" cy="50" r="47" />
    case 'rectV':
      return <rect x="14" y="4" width="72" height="92" rx="4" />
    case 'rectH':
      return <rect x="3" y="20" width="94" height="60" rx="4" />
    case 'square':
      return <rect x="5" y="5" width="90" height="90" rx="4" />
    case 'crossbuck':
      return null
    default:
      return null
  }
}

function insetPath(shape: SignShape): JSX.Element | null {
  switch (shape) {
    case 'octagon': {
      const r = 41
      const pts = Array.from({ length: 8 }, (_, i) => {
        const a = (Math.PI / 4) * i + Math.PI / 8
        return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`
      }).join(' ')
      return <polygon points={pts} />
    }
    case 'triangleDown':
      return <polygon points="13,20 87,20 50,85" />
    case 'diamond':
      return <polygon points="50,10 90,50 50,90 10,50" />
    case 'pennant':
      return <polygon points="13,15 86,50 13,85" />
    case 'pentagon':
      return <polygon points="50,10 89,40 73,89 27,89 11,40" />
    case 'circle':
      return <circle cx="50" cy="50" r="41" />
    case 'rectV':
      return <rect x="20" y="10" width="60" height="80" rx="3" />
    case 'rectH':
      return <rect x="9" y="26" width="82" height="48" rx="3" />
    case 'square':
      return <rect x="11" y="11" width="78" height="78" rx="3" />
    default:
      return null
  }
}

/** Symbols are drawn in a 100x100 box, then shrunk to fit inside each sign face. */
const GLYPH_SCALE: Partial<Record<SignShape, number>> = {
  diamond: 0.68,
  pentagon: 0.72,
  circle: 0.72,
  triangleDown: 0.55,
  pennant: 0.6,
  rectV: 0.9,
  octagon: 0.7,
}

/** Triangular arrow head with its base at (x, y); `angle` 0 points up. */
function Head({ x, y, angle = 0, ink }: { x: number; y: number; angle?: number; ink: string }): JSX.Element {
  return <polygon points="-11,4 0,-19 11,4" fill={ink} transform={`translate(${x} ${y}) rotate(${angle})`} />
}

function Glyph({ id, ink }: { id: string; ink: string }): JSX.Element | null {
  const stroke = { stroke: ink, fill: 'none', strokeWidth: 6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (id) {
    case 'doNotEnter':
      return (
        <>
          <rect x="18" y="34" width="64" height="15" rx="2" fill="#ffffff" />
          <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif">
            DO NOT
          </text>
          <text x="50" y="81" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif">
            ENTER
          </text>
        </>
      )
    case 'oneWay':
      return (
        <>
          <path d="M18 50 H70" {...stroke} strokeWidth="7" />
          <polygon points="68,38 88,50 68,62" fill={ink} />
          <text x="50" y="72" textAnchor="middle" fill={ink} fontSize="12" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif">
            ONE WAY
          </text>
        </>
      )
    case 'keepRight':
      return (
        <>
          <polygon points="30,84 42,52 54,84" fill={ink} opacity="0.85" />
          <path d="M62 84 V44" {...stroke} />
          <polygon points="52,48 62,28 72,48" fill={ink} />
        </>
      )
    case 'noParking':
      return (
        <>
          <text x="50" y="66" textAnchor="middle" fill={ink} fontSize="46" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif">
            P
          </text>
          <circle cx="50" cy="50" r="32" fill="none" stroke="#c1121f" strokeWidth="7" />
          <path d="M27 27 L73 73" stroke="#c1121f" strokeWidth="7" strokeLinecap="round" />
        </>
      )
    case 'noUTurn':
      return (
        <>
          <path d="M36 74 V52 a14 14 0 0 1 28 0 V66" {...stroke} strokeWidth="6" />
          <polygon points="55,64 64,80 73,64" fill={ink} />
          <circle cx="50" cy="50" r="33" fill="none" stroke="#c1121f" strokeWidth="7" />
          <path d="M26 26 L74 74" stroke="#c1121f" strokeWidth="7" strokeLinecap="round" />
        </>
      )
    case 'noLeftTurn':
      return (
        <>
          <path d="M62 78 V54 H42" {...stroke} strokeWidth="6" />
          <polygon points="44,44 28,54 44,64" fill={ink} />
          <circle cx="50" cy="50" r="33" fill="none" stroke="#c1121f" strokeWidth="7" />
          <path d="M26 26 L74 74" stroke="#c1121f" strokeWidth="7" strokeLinecap="round" />
        </>
      )
    case 'curveRight':
      return (
        <>
          <path d="M36 88 C36 58 48 50 62 44" {...stroke} strokeWidth="8" />
          <Head x={63} y={43} angle={48} ink={ink} />
        </>
      )
    case 'sharpTurn':
      return (
        <>
          <path d="M38 86 V44 H58" {...stroke} strokeWidth="8" />
          <Head x={58} y={44} angle={90} ink={ink} />
        </>
      )
    case 'slippery':
      return (
        <>
          <path
            d="M26 46 v-7 q0-3 3-3 h5 l7-9 q1-2 3-2 h16 q2 0 3 2 l7 9 h5 q3 0 3 3 v7 z"
            fill={ink}
          />
          <circle cx="36" cy="47" r="5.5" fill={ink} />
          <circle cx="64" cy="47" r="5.5" fill={ink} />
          <path d="M26 62 q8 -7 16 0 t16 0 t16 0" {...stroke} strokeWidth="4" />
          <path d="M26 74 q8 -7 16 0 t16 0 t16 0" {...stroke} strokeWidth="4" />
        </>
      )
    case 'signalAhead':
      return (
        <>
          <rect x="38" y="20" width="24" height="60" rx="5" fill={ink} />
          <circle cx="50" cy="33" r="7" fill="#e5383b" />
          <circle cx="50" cy="50" r="7" fill="#fbd400" />
          <circle cx="50" cy="67" r="7" fill="#2e9e4f" />
        </>
      )
    case 'stopAhead': {
      const r = 22
      const pts = Array.from({ length: 8 }, (_, i) => {
        const a = (Math.PI / 4) * i + Math.PI / 8
        return `${50 + r * Math.cos(a)},${42 + r * Math.sin(a)}`
      }).join(' ')
      return (
        <>
          <polygon points={pts} fill="#c1121f" stroke={ink} strokeWidth="3" />
          <path d="M30 84 H70" {...stroke} strokeWidth="5" />
        </>
      )
    }
    case 'yieldAhead':
      return (
        <>
          <polygon points="26,24 74,24 50,66" fill="#ffffff" stroke="#c1121f" strokeWidth="7" />
          <path d="M30 84 H70" {...stroke} strokeWidth="5" />
        </>
      )
    case 'merge':
      return (
        <>
          <path d="M58 86 V44" {...stroke} strokeWidth="7" />
          <path d="M34 86 C34 66 58 66 58 54" {...stroke} strokeWidth="7" />
          <polygon points="46,46 58,24 70,46" fill={ink} />
        </>
      )
    case 'divided':
      return (
        <>
          <path d="M38 88 C38 70 30 66 30 50" {...stroke} strokeWidth="6" />
          <polygon points="21,52 30,32 39,52" fill={ink} />
          <path d="M62 88 C62 70 70 66 70 50" {...stroke} strokeWidth="6" />
          <polygon points="61,52 70,32 79,52" fill={ink} />
          <ellipse cx="50" cy="72" rx="4.5" ry="14" fill={ink} />
        </>
      )
    case 'twoWay':
      return (
        <>
          <path d="M36 86 V40" {...stroke} strokeWidth="6" />
          <polygon points="26,42 36,22 46,42" fill={ink} />
          <path d="M64 14 V60" {...stroke} strokeWidth="6" />
          <polygon points="54,58 64,78 74,58" fill={ink} />
        </>
      )
    case 'laneEnds':
      return (
        <>
          <path d="M38 86 V22" {...stroke} strokeWidth="6" />
          <path d="M66 86 C66 60 44 58 40 44" {...stroke} strokeWidth="6" />
        </>
      )
    case 'crossroad':
      return (
        <>
          <path d="M50 18 V86" {...stroke} strokeWidth="9" />
          <path d="M18 48 H82" {...stroke} strokeWidth="9" />
        </>
      )
    case 'sideRoad':
      return (
        <>
          <path d="M50 88 V18" {...stroke} strokeWidth="9" />
          <path d="M50 52 L84 22" {...stroke} strokeWidth="9" />
        </>
      )
    case 'tIntersection':
      return (
        <>
          <path d="M50 88 V30" {...stroke} strokeWidth="9" />
          <path d="M16 30 H84" {...stroke} strokeWidth="9" />
        </>
      )
    case 'circleArrows':
      return (
        <>
          <path d="M50 92 V70" {...stroke} strokeWidth="6" />
          <path d="M62 27 A22 22 0 1 1 56 24" {...stroke} strokeWidth="6" />
          <Head x={62} y={28} angle={125} ink={ink} />
        </>
      )
    case 'hill':
      return (
        <>
          <path d="M20 30 L78 76" {...stroke} strokeWidth="5" />
          <g transform="rotate(38.4 47 51)">
            <rect x="33" y="34" width="20" height="11" rx="2" fill={ink} />
            <path d="M53 38 h6 l4 7 h-10 z" fill={ink} />
            <circle cx="39" cy="48" r="4" fill={ink} stroke="none" />
            <circle cx="58" cy="48" r="4" fill={ink} stroke="none" />
          </g>
        </>
      )
    case 'narrowBridge':
      return (
        <>
          <path d="M24 18 C24 40 38 42 38 50 C38 58 24 60 24 82" {...stroke} strokeWidth="6" />
          <path d="M76 18 C76 40 62 42 62 50 C62 58 76 60 76 82" {...stroke} strokeWidth="6" />
        </>
      )
    case 'pedestrian':
      return (
        <>
          <circle cx="50" cy="24" r="8" fill={ink} />
          <path d="M50 32 V56" {...stroke} strokeWidth="7" />
          <path d="M50 38 L34 48 M50 38 L66 44" {...stroke} strokeWidth="6" />
          <path d="M50 56 L38 84 M50 56 L62 80" {...stroke} strokeWidth="7" />
        </>
      )
    case 'bike':
      return (
        <>
          <circle cx="30" cy="66" r="14" fill="none" stroke={ink} strokeWidth="5" />
          <circle cx="70" cy="66" r="14" fill="none" stroke={ink} strokeWidth="5" />
          <path d="M30 66 L46 40 L62 66 M46 40 L66 40 M70 66 L60 40" {...stroke} strokeWidth="5" />
          <path d="M40 34 H54" {...stroke} strokeWidth="5" />
        </>
      )
    case 'schoolCrossing':
      return (
        <>
          <circle cx="38" cy="28" r="7" fill={ink} />
          <path d="M38 35 V56 M38 40 L28 50 M38 40 L48 46 M38 56 L30 80 M38 56 L46 78" {...stroke} strokeWidth="5" />
          <circle cx="66" cy="38" r="6" fill={ink} />
          <path d="M66 44 V60 M66 48 L58 56 M66 48 L74 54 M66 60 L60 80 M66 60 L72 78" {...stroke} strokeWidth="5" />
        </>
      )
    case 'rrAdvance':
      return (
        <>
          <path d="M20 20 L80 80 M80 20 L20 80" {...stroke} strokeWidth="8" />
          <text x="31" y="56" textAnchor="middle" fill={ink} fontSize="22" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif">
            R
          </text>
          <text x="69" y="56" textAnchor="middle" fill={ink} fontSize="22" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif">
            R
          </text>
        </>
      )
    case 'workers':
      return (
        <>
          <circle cx="40" cy="28" r="7.5" fill={ink} />
          <path d="M29 24 H51" {...stroke} strokeWidth="4" />
          <path d="M40 36 V60 M40 60 L31 84 M40 60 L50 84" {...stroke} strokeWidth="6" />
          <path d="M40 42 L66 32" {...stroke} strokeWidth="5" />
          <path d="M64 20 L80 26 L70 40 L58 34 Z" fill={ink} />
        </>
      )
    case 'detour':
      return (
        <>
          <path d="M12 52 H46 C58 52 56 38 68 38" {...stroke} strokeWidth="7" />
          <polygon points="64,28 86,38 64,48" fill={ink} />
          <text x="50" y="70" textAnchor="middle" fill={ink} fontSize="15" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif">
            DETOUR
          </text>
        </>
      )
    default:
      return null
  }
}

function Crossbuck({ ink }: { ink: string }): JSX.Element {
  return (
    <g>
      {[45, -45].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <rect x="4" y="41" width="92" height="18" rx="3" fill="#f7f7f5" stroke="#111111" strokeWidth="2" />
          <text
            x="50"
            y="54"
            textAnchor="middle"
            fill={ink}
            fontSize="12"
            fontWeight="700"
            letterSpacing="0.5"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            {angle === 45 ? 'RAILROAD' : 'CROSSING'}
          </text>
        </g>
      ))}
    </g>
  )
}

/** How wide letters may run inside each shape, relative to the text box. */
const TEXT_FIT: Partial<Record<SignShape, number>> = {
  triangleDown: 1.45,
  diamond: 1.4,
  pennant: 1.25,
  pentagon: 1.4,
  circle: 1.45,
}

function Lines({
  lines,
  shape,
  ink,
}: {
  lines: string[]
  shape: SignShape
  ink: string
}): JSX.Element {
  const box = BOXES[shape]
  const longest = Math.max(...lines.map((l) => l.length))
  const fit = TEXT_FIT[shape] ?? 1.65
  const size = Math.min((box.h / lines.length) * 0.82, (box.w / Math.max(longest, 1)) * fit, 34)
  const lineHeight = size * 1.12
  const startY = box.y + box.h / 2 - ((lines.length - 1) * lineHeight) / 2 + size * 0.34
  return (
    <>
      {lines.map((line, i) => (
        <text
          key={line + i}
          x={shape === 'pennant' ? box.x + box.w / 2 - 4 : 50}
          y={startY + i * lineHeight}
          textAnchor="middle"
          fill={ink}
          fontSize={size}
          fontWeight="700"
          letterSpacing="0.4"
          fontFamily="Arial Narrow, Arial, Helvetica, sans-serif"
        >
          {line}
        </text>
      ))}
    </>
  )
}

export function Sign({
  spec,
  size = 120,
  title,
}: {
  spec: SignSpec
  size?: number
  title?: string
}): JSX.Element {
  const skin = SKINS[spec.palette]
  const face = shapePath(spec.shape)
  const inset = insetPath(spec.shape)
  const label = title ?? spec.name
  const glyphScale = GLYPH_SCALE[spec.shape] ?? 1

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={label}
      className="sign"
    >
      <title>{label}</title>
      {spec.shape === 'crossbuck' ? (
        <Crossbuck ink="#111111" />
      ) : (
        <>
          <g fill={skin.face} stroke="rgba(0,0,0,0.45)" strokeWidth="1.5">
            {face}
          </g>
          <g fill="none" stroke={skin.border} strokeWidth="3">
            {inset}
          </g>
          {spec.glyph ? (
            <g transform={`translate(${50 * (1 - glyphScale)} ${50 * (1 - glyphScale)}) scale(${glyphScale})`}>
              <Glyph id={spec.glyph} ink={skin.ink} />
            </g>
          ) : null}
          {spec.lines ? <Lines lines={spec.lines} shape={spec.shape} ink={skin.ink} /> : null}
        </>
      )}
    </svg>
  )
}
