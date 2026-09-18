import { useState } from 'react'
import type { JSX } from 'react'
import { CATEGORIES } from '../data/types'
import type { CategoryId } from '../data/types'
import { questionsInCategory } from '../data/questions'
import { TOTAL_QUESTIONS } from '../data/questions'

const LENGTHS = [10, 20, 30]

export function PracticeSetup({
  initialCategories = [],
  onStart,
}: {
  initialCategories?: CategoryId[]
  onStart: (categories: CategoryId[], count: number) => void
}): JSX.Element {
  const [selected, setSelected] = useState<CategoryId[]>(initialCategories)
  const [count, setCount] = useState(10)

  const toggle = (id: CategoryId): void =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))

  const available =
    selected.length === 0
      ? TOTAL_QUESTIONS
      : selected.reduce((sum, id) => sum + questionsInCategory(id).length, 0)

  return (
    <div className="stack">
      <section>
        <span className="eyebrow">Practice</span>
        <h1 style={{ fontSize: 24, marginTop: 4 }}>Build a practice set</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Practice mode shows the answer and an explanation right away. Questions you have never seen — and
          ones you got wrong — come up first.
        </p>
      </section>

      <section className="card">
        <span className="eyebrow">Topics</span>
        <p className="small muted" style={{ margin: '6px 0 12px' }}>
          Pick any combination, or leave everything off to draw from all {TOTAL_QUESTIONS} questions.
        </p>
        <div className="chips">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className="chip"
              aria-pressed={selected.includes(category.id)}
              onClick={() => toggle(category.id)}
            >
              {category.short}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <span className="eyebrow">Length</span>
        <div className="chips" style={{ marginTop: 10 }}>
          {LENGTHS.map((n) => (
            <button key={n} className="chip" aria-pressed={count === n} onClick={() => setCount(n)}>
              {n} questions
            </button>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 10 }}>
          {available} question{available === 1 ? '' : 's'} available in this selection.
        </p>
      </section>

      <div className="row">
        <button className="btn btn-primary" onClick={() => onStart(selected, count)}>
          Start practice
        </button>
        {selected.length > 0 ? (
          <button className="btn btn-ghost" onClick={() => setSelected([])}>
            Clear topics
          </button>
        ) : null}
      </div>
    </div>
  )
}
