import { useEffect, useMemo, useState } from 'react'
import type { JSX } from 'react'
import { CATEGORY_BY_ID } from '../data/types'
import { SIGN_BY_ID } from '../data/signs'
import type { ShuffledQuestion } from '../lib/quiz'
import { formatDuration } from '../lib/quiz'
import { Sign } from './Sign'

export type QuizMode = 'practice' | 'exam' | 'review'

export interface QuizAnswer {
  questionId: string
  correct: boolean
  /** Text of the choice the user picked. */
  picked: string
}

interface QuizProps {
  mode: QuizMode
  title: string
  items: ShuffledQuestion[]
  onAnswer: (answer: QuizAnswer) => void
  onFinish: (answers: QuizAnswer[], durationMs: number) => void
  onQuit: () => void
}

const KEYS = ['A', 'B', 'C', 'D', 'E']

export function Quiz({ mode, title, items, onAnswer, onFinish, onQuit }: QuizProps): JSX.Element {
  const [index, setIndex] = useState(0)
  const [picks, setPicks] = useState<(number | null)[]>(() => items.map(() => null))
  const [startedAt] = useState(() => Date.now())
  const [now, setNow] = useState(() => Date.now())

  const instant = mode !== 'exam'
  const current = items[index]
  const pick = picks[index]
  const answeredCount = picks.filter((p) => p !== null).length

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const choose = (choiceIndex: number): void => {
    if (picks[index] !== null) return
    const next = picks.slice()
    next[index] = choiceIndex
    setPicks(next)
    onAnswer({
      questionId: current.question.id,
      correct: choiceIndex === current.answer,
      picked: current.choices[choiceIndex],
    })
  }

  const answers = useMemo<QuizAnswer[]>(
    () =>
      items.map((item, i) => {
        const p = picks[i]
        return {
          questionId: item.question.id,
          correct: p !== null && p === item.answer,
          picked: p === null ? '' : item.choices[p],
        }
      }),
    [items, picks],
  )

  const finish = (): void => onFinish(answers, Date.now() - startedAt)

  const goNext = (): void => {
    if (index + 1 < items.length) setIndex(index + 1)
    else finish()
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const numeric = Number.parseInt(event.key, 10)
      if (!Number.isNaN(numeric) && numeric >= 1 && numeric <= current.choices.length) {
        choose(numeric - 1)
        return
      }
      const letter = KEYS.indexOf(event.key.toUpperCase())
      if (letter >= 0 && letter < current.choices.length) {
        choose(letter)
        return
      }
      if (event.key === 'Enter' || event.key === 'ArrowRight') {
        if (!instant || picks[index] !== null) goNext()
      }
      if (event.key === 'ArrowLeft' && index > 0) setIndex(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const sign = current.question.sign ? SIGN_BY_ID[current.question.sign] : undefined
  const revealed = instant && pick !== null
  const isLast = index + 1 === items.length

  return (
    <div className="stack">
      <div className="quiz-head">
        <div>
          <span className="eyebrow">{title}</span>
          <div className="quiz-meta">
            Question {index + 1} of {items.length}
            {mode === 'exam' ? ` · ${answeredCount} answered · ${formatDuration(now - startedAt)}` : ''}
          </div>
        </div>
        <button className="btn btn-ghost" onClick={onQuit}>
          {mode === 'exam' ? 'Abandon exam' : 'Back'}
        </button>
      </div>

      <div className="bar" aria-hidden="true">
        <span style={{ width: `${((index + (pick !== null ? 1 : 0)) / items.length) * 100}%` }} />
      </div>

      <div className="card">
        <span className="eyebrow">{CATEGORY_BY_ID[current.question.category].short}</span>
        <h2 className="question">{current.question.prompt}</h2>

        {sign ? (
          <div className="sign-frame">
            <Sign spec={sign} size={150} title="Road sign shown in this question" />
          </div>
        ) : null}

        <div className="choices">
          {current.choices.map((choice, i) => {
            const classes = ['choice']
            if (revealed) {
              if (i === current.answer) classes.push('correct')
              else if (i === pick) classes.push('wrong')
            } else if (i === pick) {
              classes.push('selected')
            }
            return (
              <button
                key={choice}
                className={classes.join(' ')}
                onClick={() => choose(i)}
                disabled={pick !== null}
              >
                <span className="choice-key" aria-hidden="true">
                  {KEYS[i]}
                </span>
                <span>{choice}</span>
              </button>
            )
          })}
        </div>

        {revealed ? (
          <div className={`explain ${pick === current.answer ? 'good' : 'bad'}`}>
            <b>{pick === current.answer ? 'Correct' : `Not quite — the answer is ${KEYS[current.answer]}`}</b>
            {current.question.explanation}
          </div>
        ) : null}

        <div className="quiz-foot">
          <button className="btn btn-ghost" onClick={() => setIndex(index - 1)} disabled={index === 0}>
            Previous
          </button>
          {mode === 'exam' ? (
            <div className="row">
              <button className="btn" onClick={goNext} disabled={isLast && answeredCount < items.length}>
                Next
              </button>
              <button className="btn btn-primary" onClick={finish} disabled={answeredCount === 0}>
                {answeredCount < items.length ? `Finish (${answeredCount}/${items.length})` : 'See results'}
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={goNext} disabled={pick === null}>
              {isLast ? 'See results' : 'Next question'}
            </button>
          )}
        </div>

        {mode === 'exam' ? (
          <div className="dots">
            {items.map((item, i) => (
              <button
                key={item.question.id}
                className={`dot ${picks[i] !== null ? 'answered' : ''} ${i === index ? 'current' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to question ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="small muted">
        Tip: press <b>A–D</b> or <b>1–4</b> to answer, <b>Enter</b> for the next question.
      </p>
    </div>
  )
}
