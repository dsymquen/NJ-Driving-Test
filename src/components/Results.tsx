import type { JSX } from 'react'
import { CATEGORY_BY_ID } from '../data/types'
import type { CategoryId } from '../data/types'
import { SIGN_BY_ID } from '../data/signs'
import { PASS_MARK } from '../lib/storage'
import type { ShuffledQuestion } from '../lib/quiz'
import { formatDuration } from '../lib/quiz'
import type { QuizAnswer, QuizMode } from './Quiz'
import { Sign } from './Sign'

interface ResultsProps {
  mode: QuizMode
  items: ShuffledQuestion[]
  answers: QuizAnswer[]
  durationMs: number
  onAgain: () => void
  onRetryMissed: () => void
  onHome: () => void
}

export function Results({
  mode,
  items,
  answers,
  durationMs,
  onAgain,
  onRetryMissed,
  onHome,
}: ResultsProps): JSX.Element {
  const total = items.length
  const score = answers.filter((a) => a.correct).length
  const pct = total === 0 ? 0 : Math.round((score / total) * 100)
  const isExam = mode === 'exam'
  const passed = isExam ? score >= PASS_MARK : pct >= 80
  const wrong = items
    .map((item, i) => ({ item, answer: answers[i] }))
    .filter((row) => !row.answer.correct)

  const byCategory = new Map<CategoryId, { correct: number; total: number }>()
  items.forEach((item, i) => {
    const key = item.question.category
    const entry = byCategory.get(key) ?? { correct: 0, total: 0 }
    entry.total += 1
    if (answers[i].correct) entry.correct += 1
    byCategory.set(key, entry)
  })

  return (
    <div className="stack">
      <section className="card">
        <span className="eyebrow">
          {isExam ? 'Mock exam result' : mode === 'review' ? 'Review session' : 'Practice result'}
        </span>
        <div className="score" style={{ marginTop: 10 }}>
          <div>
            <div className="score-big">
              {score}
              <span className="muted" style={{ fontSize: 22 }}>
                /{total}
              </span>
            </div>
            <div className={`verdict ${passed ? 'pass' : 'fail'}`}>
              {isExam
                ? passed
                  ? `Passed — you needed ${PASS_MARK} of ${total}`
                  : `Below the pass mark of ${PASS_MARK} of ${total}`
                : `${pct}% correct`}
            </div>
          </div>
          <div className="tiles" style={{ flex: 1, minWidth: 220 }}>
            <div className="tile">
              <strong>{pct}%</strong>
              <span>score</span>
            </div>
            <div className="tile">
              <strong>{formatDuration(durationMs)}</strong>
              <span>time taken</span>
            </div>
            <div className="tile">
              <strong>{wrong.length}</strong>
              <span>to review</span>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn btn-primary" onClick={onAgain}>
            {isExam ? 'Take another exam' : 'Practice again'}
          </button>
          <button className="btn" onClick={onRetryMissed} disabled={wrong.length === 0}>
            Drill the {wrong.length} missed
          </button>
          <button className="btn btn-ghost" onClick={onHome}>
            Back to dashboard
          </button>
        </div>
      </section>

      {byCategory.size > 1 ? (
        <section className="card">
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>How you did by topic</h2>
          <div className="cat-list">
            {[...byCategory.entries()]
              .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
              .map(([id, entry]) => (
                <div key={id} className="cat" style={{ cursor: 'default' }}>
                  <span>
                    <b>{CATEGORY_BY_ID[id].name}</b>
                    <span>
                      {entry.correct} of {entry.total} correct
                    </span>
                  </span>
                  <span className="bar" aria-hidden="true">
                    <span
                      style={{
                        width: `${(entry.correct / entry.total) * 100}%`,
                        background:
                          entry.correct / entry.total >= 0.8 ? 'var(--good)' : 'var(--bad)',
                      }}
                    />
                  </span>
                  <span className="cat-score">{Math.round((entry.correct / entry.total) * 100)}%</span>
                </div>
              ))}
          </div>
        </section>
      ) : null}

      {wrong.length > 0 ? (
        <section>
          <h2 style={{ fontSize: 16, marginBottom: 10 }}>What you missed</h2>
          {wrong.map(({ item, answer }) => {
            const sign = item.question.sign ? SIGN_BY_ID[item.question.sign] : undefined
            return (
              <div key={item.question.id} className="review-item">
                <div className="row" style={{ alignItems: 'flex-start', gap: 14 }}>
                  {sign ? <Sign spec={sign} size={72} /> : null}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div className="review-q">{item.question.prompt}</div>
                    <div className="review-line bad">
                      Your answer: {answer.picked || '(left blank)'}
                    </div>
                    <div className="review-line good">Correct: {item.choices[item.answer]}</div>
                    <div className="review-line muted" style={{ marginTop: 8 }}>
                      {item.question.explanation}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      ) : (
        <section className="card">
          <p>Perfect score — every question in this set was correct.</p>
        </section>
      )}
    </div>
  )
}
