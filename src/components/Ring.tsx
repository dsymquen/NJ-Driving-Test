import type { JSX } from 'react'

export function Ring({
  value,
  size = 104,
  label = 'ready',
}: {
  value: number
  size?: number
  label?: string
}): JSX.Element {
  const clamped = Math.max(0, Math.min(100, value))
  const stroke = 9
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const dash = (clamped / 100) * circumference
  const color = clamped >= 80 ? 'var(--good)' : clamped >= 50 ? 'var(--accent)' : 'var(--bad)'

  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        {clamped > 0 ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference - dash}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dasharray 400ms ease' }}
          />
        ) : null}
      </svg>
      <div className="ring-value">
        <strong>{clamped}%</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}
