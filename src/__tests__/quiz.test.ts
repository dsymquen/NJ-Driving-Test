import { describe, expect, it } from 'vitest'
import { buildExam, buildPractice, buildReview, withShuffledChoices, formatDuration } from '../lib/quiz'
import { EXAM_LENGTH, categoryMastery, loadProgress, readiness, recordAnswer, missedQuestionIds } from '../lib/storage'
import type { Progress } from '../lib/storage'
import { QUESTIONS, questionsInCategory } from '../data/questions'

const blank = (): Progress => ({ version: 1, stats: {}, exams: [], days: [], theme: 'dark' })

describe('exam builder', () => {
  it('builds a full-length exam with no repeats', () => {
    const exam = buildExam(blank())
    expect(exam).toHaveLength(EXAM_LENGTH)
    expect(new Set(exam.map((q) => q.id)).size).toBe(EXAM_LENGTH)
  })

  it('covers every category', () => {
    const exam = buildExam(blank())
    const categories = new Set(exam.map((q) => q.category))
    expect(categories.size).toBe(8)
  })
})

describe('practice builder', () => {
  it('honors the requested length and topics', () => {
    const set = buildPractice(blank(), ['signs'], 10)
    expect(set).toHaveLength(10)
    expect(set.every((q) => q.category === 'signs')).toBe(true)
  })

  it('never returns more questions than exist in the selection', () => {
    const all = questionsInCategory('license').length
    expect(buildPractice(blank(), ['license'], 999)).toHaveLength(all)
  })

  it('shows unseen questions before ones already answered correctly', () => {
    let progress = blank()
    const signs = questionsInCategory('signs')
    for (const q of signs.slice(0, 5)) progress = recordAnswer(progress, q.id, true)
    const set = buildPractice(progress, ['signs'], 5)
    const answeredIds = new Set(signs.slice(0, 5).map((q) => q.id))
    expect(set.some((q) => answeredIds.has(q.id))).toBe(false)
  })
})

describe('choice shuffling', () => {
  it('keeps the correct answer pointing at the same text', () => {
    for (const question of QUESTIONS.slice(0, 40)) {
      const shuffled = withShuffledChoices(question)
      expect(shuffled.choices).toHaveLength(question.choices.length)
      expect(shuffled.choices[shuffled.answer]).toBe(question.choices[question.answer])
      expect([...shuffled.choices].sort()).toEqual([...question.choices].sort())
    }
  })
})

describe('progress tracking', () => {
  it('moves a wrong answer into the missed pile and out again when corrected', () => {
    const target = QUESTIONS[0]
    let progress = recordAnswer(blank(), target.id, false)
    expect(missedQuestionIds(progress)).toContain(target.id)
    progress = recordAnswer(progress, target.id, true)
    expect(missedQuestionIds(progress)).not.toContain(target.id)
  })

  it('does not credit mastery until a real share of the category is covered', () => {
    let progress = blank()
    progress = recordAnswer(progress, questionsInCategory('signs')[0].id, true)
    const mastery = categoryMastery(progress, 'signs')
    expect(mastery.accuracy).toBe(1)
    expect(mastery.score).toBeLessThan(0.3)
  })

  it('reports 0% readiness for a fresh profile and rises as you answer correctly', () => {
    let progress = blank()
    expect(readiness(progress)).toBe(0)
    for (const q of QUESTIONS) progress = recordAnswer(progress, q.id, true)
    expect(readiness(progress)).toBe(100)
  })

  it('survives a corrupt saved profile', () => {
    globalThis.localStorage = {
      getItem: () => '{not json',
      setItem: () => undefined,
      removeItem: () => undefined,
    } as unknown as Storage
    expect(loadProgress().stats).toEqual({})
  })
})

describe('review builder', () => {
  it('drops ids that are no longer in the bank', () => {
    expect(buildReview(['nope-1', QUESTIONS[3].id], 10)).toHaveLength(1)
  })
})

describe('formatDuration', () => {
  it('formats minutes and seconds', () => {
    expect(formatDuration(0)).toBe('0:00')
    expect(formatDuration(65_000)).toBe('1:05')
    expect(formatDuration(600_000)).toBe('10:00')
  })
})
