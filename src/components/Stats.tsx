import type { JSX } from 'react'
import { CATEGORIES } from '../data/types'
import { TOTAL_QUESTIONS } from '../data/questions'
import type { Progress } from '../lib/storage'
import {
  PASS_MARK,
  answeredCount,
  categoryMastery,
  missedQuestionIds,
  overallAccuracy,
  readiness,
  studyStreak,
} from '../lib/storage'
import { formatDuration } from '../lib/quiz'
import { Ring } from './Ring'

export function Stats({
  progress,
  onReset,
}: {
  progress: Progress
  onReset: () => void
}): JSX.Element {
  const exams = [...progress.exams].reverse()
  const passedExams = progress.exams.filter((e) => e.passed).length

  return (
    <div className="stack">
      <section>
        <span className="eyebrow">Progress</span>
        <h1 style={{ fontSize: 24, marginTop: 4 }}>Where you stand</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Readiness blends how accurate you are with how much of each topic you have actually covered, so
          it only climbs when you have answered a real share of the bank.
        </p>
      </section>

      <section className="card row" style={{ gap: 22 }}>
        <Ring value={readiness(progress)} size={116} />
        <div className="tiles" style={{ flex: 1, minWidth: 230 }}>
          <div className="tile">
            <strong>
              {answeredCount(progress)}/{TOTAL_QUESTIONS}
            </strong>
            <span>questions seen</span>
          </div>
          <div className="tile">
            <strong>{overallAccuracy(progress)}%</strong>
            <span>accuracy</span>
          </div>
          <div className="tile">
            <strong>{missedQuestionIds(progress).length}</strong>
            <span>missed pile</span>
          </div>
          <div className="tile">
            <strong>{studyStreak(progress)}</strong>
            <span>day streak</span>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 style={{ fontSize: 16, marginBottom: 12 }}>Mastery by topic</h2>
        <div className="cat-list">
          {CATEGORIES.map((category) => {
            const mastery = categoryMastery(progress, category.id)
            const pct = Math.round(mastery.score * 100)
            return (
              <div key={category.id} className="cat" style={{ cursor: 'default' }}>
                <span>
                  <b>{category.name}</b>
                  <span>
                    {mastery.seen} of {mastery.total} seen ·{' '}
                    {mastery.seen === 0 ? 'not started' : `${Math.round(mastery.accuracy * 100)}% accurate`} ·
                    about {category.examWeight} of the 50 real questions
                  </span>
                </span>
                <span className="bar" aria-hidden="true">
                  <span
                    style={{
                      width: `${pct}%`,
                      background: pct >= 80 ? 'var(--good)' : pct >= 50 ? 'var(--accent)' : 'var(--bad)',
                    }}
                  />
                </span>
                <span className="cat-score">{pct}%</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="card">
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
          <h2 style={{ fontSize: 16 }}>Mock exam history</h2>
          {progress.exams.length > 0 ? (
            <span className="small muted">
              {passedExams} of {progress.exams.length} at or above the {PASS_MARK}-question pass mark
            </span>
          ) : null}
        </div>
        {exams.length === 0 ? (
          <p className="small muted">No mock exams yet. Take one to get a realistic score.</p>
        ) : (
          exams.map((exam) => (
            <div key={exam.at} className="exam-row">
              <span>
                {new Date(exam.at).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
              <span className="muted small">{formatDuration(exam.durationMs)}</span>
              <span>
                <b>
                  {exam.score}/{exam.total}
                </b>{' '}
                <span className={`badge ${exam.passed ? 'good' : 'bad'}`}>
                  {exam.passed ? 'pass' : 'fail'}
                </span>
              </span>
            </div>
          ))
        )}
      </section>

      <section className="card">
        <h2 style={{ fontSize: 16 }}>Reset</h2>
        <p className="small muted" style={{ margin: '6px 0 12px' }}>
          Progress is stored only in this browser — nothing is uploaded. Clearing it cannot be undone.
        </p>
        <button className="btn" onClick={onReset}>
          Clear all progress
        </button>
      </section>
    </div>
  )
}
