import type { JSX } from 'react'
import { HANDBOOK } from '../data/handbook'

export function Handbook(): JSX.Element {
  return (
    <div className="stack">
      <section>
        <span className="eyebrow">Cheat sheet</span>
        <h1 style={{ fontSize: 24, marginTop: 4 }}>Everything worth memorizing</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Condensed from the New Jersey Driver Manual. If you know these tables cold, most of the 50
          questions answer themselves.
        </p>
      </section>

      {HANDBOOK.map((section, i) => (
        <details key={section.id} className="section" open={i === 0}>
          <summary>{section.title}</summary>
          <p className="small muted">{section.summary}</p>
          <div className="facts">
            {section.facts.map((fact) => (
              <div key={fact.label} className="fact">
                <span>{fact.label}</span>
                <b>{fact.value}</b>
              </div>
            ))}
          </div>
          {section.facts.some((f) => f.note) ? (
            <ul className="small muted" style={{ margin: '10px 0 0', paddingLeft: 18 }}>
              {section.facts
                .filter((f) => f.note)
                .map((f) => (
                  <li key={f.label}>
                    <b>{f.value}:</b> {f.note}
                  </li>
                ))}
            </ul>
          ) : null}
        </details>
      ))}

      <p className="small muted">
        This app is a study aid built from the New Jersey Driver Manual. The manual and the MVC are the
        authority — check{' '}
        <a href="https://www.nj.gov/mvc/" target="_blank" rel="noreferrer">
          nj.gov/mvc
        </a>{' '}
        for current rules, fees and test requirements.
      </p>
    </div>
  )
}
