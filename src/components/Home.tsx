import type { JSX } from 'react'
import { CATEGORIES } from '../data/types'
import type { CategoryId } from '../data/types'
import { TOTAL_QUESTIONS } from '../data/questions'
import type { Progress } from '../lib/storage'
import {
  EXAM_LENGTH,
  PASS_MARK,
  answeredCount,
  categoryMastery,
  missedQuestionIds,
  overallAccuracy,
  readiness,
  studyStreak,
} from '../lib/storage'
import { Ring } from './Ring'

interface HomeProps {
  progress: Progress
  onStartExam: () => void
  onStartCategory: (id: CategoryId) => void
  onStartQuickPractice: () => void
  onReviewMissed: () => void
  onGo: (view: 'signs' | 'flashcards' | 'handbook' | 'stats') => void
}

export function Home({
  progress,
  onStartExam,
  onStartCategory,
  onStartQuickPractice,
  onReviewMissed,
  onGo,
}: HomeProps): JSX.Element {
  const score = readiness(progress)
  const answered = answeredCount(progress)
  const missed = missedQuestionIds(progress)
  const streak = studyStreak(progress)
  const accuracy = overallAccuracy(progress)
  const lastExam = progress.exams[progress.exams.length - 1]

  const advice =
    answered === 0
      ? 'Start with a quick 10-question warm-up, then take a full mock exam to see where you stand.'
      : score >= 80
        ? 'You are tracking above the 80% you need. Keep taking full mock exams until the score holds steady.'
        : missed.length > 0
          ? `Your weakest ${weakest(progress)} needs work, and ${missed.length} question${missed.length === 1 ? '' : 's'} are waiting in your missed pile.`
          : `Keep going — you have covered ${answered} of ${TOTAL_QUESTIONS} questions in the bank.`

  return (
    <div className="stack">
      <section className="card hero">
        <div>
          <span className="eyebrow">New Jersey MVC knowledge test</span>
          <h1>Pass the NJ written test on the first try</h1>
          <p>{advice}</p>
          <div className="row" style={{ marginTop: 14 }}>
            <button className="btn btn-primary" onClick={onStartExam}>
              Take a {EXAM_LENGTH}-question mock exam
            </button>
            <button className="btn" onClick={onStartQuickPractice}>
              Quick 10-question practice
            </button>
          </div>
        </div>
        <Ring value={score} />
      </section>

      <section className="tiles">
        <div className="tile">
          <strong>{answered}</strong>
          <span>
            of {TOTAL_QUESTIONS} questions seen
          </span>
        </div>
        <div className="tile">
          <strong>{accuracy}%</strong>
          <span>lifetime accuracy</span>
        </div>
        <div className="tile">
          <strong>{missed.length}</strong>
          <span>in your missed pile</span>
        </div>
        <div className="tile">
          <strong>
            {streak}
            <span style={{ fontSize: 14, fontWeight: 500 }}> day{streak === 1 ? '' : 's'}</span>
          </strong>
          <span>study streak</span>
        </div>
      </section>

      {lastExam ? (
        <section className="card">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div>
              <span className="eyebrow">Last mock exam</span>
              <p style={{ marginTop: 4, fontSize: 15 }}>
                <b>
                  {lastExam.score}/{lastExam.total}
                </b>{' '}
                <span className="muted">
                  · {new Date(lastExam.at).toLocaleDateString()} · pass mark is {PASS_MARK}
                </span>
              </p>
            </div>
            <span className={`badge ${lastExam.passed ? 'good' : 'bad'}`}>
              {lastExam.passed ? 'Passed' : 'Below pass mark'}
            </span>
          </div>
        </section>
      ) : null}

      <section className="stack">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 17 }}>Practice by topic</h2>
          <span className="small muted">Weighted the way the real 50 questions are</span>
        </div>
        <div className="cat-list">
          {CATEGORIES.map((category) => {
            const mastery = categoryMastery(progress, category.id)
            const pct = Math.round(mastery.score * 100)
            return (
              <button key={category.id} className="cat" onClick={() => onStartCategory(category.id)}>
                <span>
                  <b>{category.name}</b>
                  <span>{category.blurb}</span>
                </span>
                <span className="bar" aria-hidden="true">
                  <span style={{ width: `${pct}%` }} />
                </span>
                <span className="cat-score">
                  {mastery.seen}/{mastery.total} seen
                  <br />
                  {pct}% mastered
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="actions">
        <button className="action action-primary" onClick={onReviewMissed} disabled={missed.length === 0}>
          <b>Review missed questions</b>
          <span>
            {missed.length === 0
              ? 'Nothing here yet — miss a question and it lands in this pile'
              : `${missed.length} question${missed.length === 1 ? '' : 's'} you got wrong last time`}
          </span>
        </button>
        <button className="action" onClick={() => onGo('signs')}>
          <b>Road sign gallery</b>
          <span>Every shape and color, drawn and explained</span>
        </button>
        <button className="action" onClick={() => onGo('flashcards')}>
          <b>Flashcards</b>
          <span>Signs and the numbers you have to memorize</span>
        </button>
        <button className="action" onClick={() => onGo('handbook')}>
          <b>Cheat sheet</b>
          <span>Speed limits, distances, BAC, GDL rules</span>
        </button>
        <button className="action" onClick={() => onGo('stats')}>
          <b>Progress</b>
          <span>Mastery by topic and your exam history</span>
        </button>
      </section>
    </div>
  )
}

function weakest(progress: Progress): string {
  const ranked = CATEGORIES.map((c) => ({ c, m: categoryMastery(progress, c.id) })).sort(
    (a, b) => a.m.score - b.m.score,
  )
  return ranked[0]?.c.short.toLowerCase() ?? 'weakest topic'
}
