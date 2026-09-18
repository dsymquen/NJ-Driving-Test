import { useState } from 'react'
import type { JSX } from 'react'
import { SIGNS } from '../data/signs'
import type { SignGroup } from '../data/signs'
import { Sign } from './Sign'

const GROUPS: { id: SignGroup | 'all'; label: string }[] = [
  { id: 'all', label: 'All signs' },
  { id: 'regulatory', label: 'Regulatory' },
  { id: 'warning', label: 'Warning' },
  { id: 'construction', label: 'Work zones' },
  { id: 'school', label: 'School' },
  { id: 'railroad', label: 'Railroad' },
  { id: 'guide', label: 'Guide' },
  { id: 'marker', label: 'Route markers' },
]

export function SignsGallery(): JSX.Element {
  const [group, setGroup] = useState<SignGroup | 'all'>('all')
  const shown = group === 'all' ? SIGNS : SIGNS.filter((s) => s.group === group)

  return (
    <div className="stack">
      <section>
        <span className="eyebrow">Reference</span>
        <h1 style={{ fontSize: 24, marginTop: 4 }}>Road sign gallery</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          The official FHWA artwork, the same signs you will see on the test and on the road. Learn the
          shape and color first — you can identify a sign covered in snow by its outline alone.
        </p>
      </section>

      <div className="chips">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            className="chip"
            aria-pressed={group === g.id}
            onClick={() => setGroup(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="sign-grid">
        {shown.map((spec) => (
          <div key={spec.code} className="sign-card">
            <Sign code={spec.code} size={112} />
            <b>{spec.name}</b>
            <span className="sign-meta">
              {spec.shape} · {spec.color}
            </span>
            <p>{spec.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
