import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { QUESTIONS, questionsInCategory, TOTAL_QUESTIONS } from '../data/questions'
import { CATEGORIES } from '../data/types'
import { SIGN_BY_CODE, SIGNS } from '../data/signs'
import { withShuffledChoices } from '../lib/quiz'

describe('question bank', () => {
  it('has a healthy number of questions', () => {
    expect(TOTAL_QUESTIONS).toBeGreaterThanOrEqual(150)
  })

  it('uses unique ids', () => {
    const ids = QUESTIONS.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every question an in-range answer and at least three choices', () => {
    for (const q of QUESTIONS) {
      expect(q.choices.length, q.id).toBeGreaterThanOrEqual(3)
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0)
      expect(q.answer, q.id).toBeLessThan(q.choices.length)
    }
  })

  it('has distinct choices and a non-empty explanation', () => {
    for (const q of QUESTIONS) {
      expect(new Set(q.choices).size, q.id).toBe(q.choices.length)
      expect(q.explanation.length, q.id).toBeGreaterThan(20)
    }
  })

  it('only references signs that exist', () => {
    for (const q of QUESTIONS) {
      if (q.sign) expect(SIGN_BY_CODE[q.sign], `${q.id} -> ${q.sign}`).toBeDefined()
    }
  })

  it('has enough questions in every category to fill its share of a 50-question exam', () => {
    for (const category of CATEGORIES) {
      expect(questionsInCategory(category.id).length, category.id).toBeGreaterThanOrEqual(
        category.examWeight,
      )
    }
  })

  it('weights the categories to exactly 50 questions', () => {
    expect(CATEGORIES.reduce((sum, c) => sum + c.examWeight, 0)).toBe(50)
  })

  it('never lets the answer be guessed from its position on screen', () => {
    // The stored order is whatever reads naturally (ascending distances, for example),
    // so what matters is the order the quiz actually renders: every question runs
    // through withShuffledChoices, which must spread answers across the positions.
    const counts = [0, 0, 0, 0, 0]
    for (const question of QUESTIONS) {
      for (let run = 0; run < 12; run += 1) counts[withShuffledChoices(question).answer] += 1
    }
    const trials = QUESTIONS.length * 12
    for (let i = 0; i < 4; i += 1) {
      expect(counts[i] / trials, `position ${i}`).toBeGreaterThan(0.15)
      expect(counts[i] / trials, `position ${i}`).toBeLessThan(0.35)
    }
  })
})

describe('sign catalog', () => {
  it('uses unique MUTCD codes', () => {
    const codes = SIGNS.map((s) => s.code)
    expect(new Set(codes).size).toBe(codes.length)
  })

  it('describes every sign with a shape, a color and a meaning', () => {
    for (const sign of SIGNS) {
      expect(sign.meaning.length, sign.code).toBeGreaterThan(20)
      expect(sign.shape.length, sign.code).toBeGreaterThan(2)
      expect(sign.color.length, sign.code).toBeGreaterThan(2)
    }
  })

  it('has prerendered artwork committed for every sign', () => {
    const dir = join(process.cwd(), 'public', 'signs')
    for (const sign of SIGNS) {
      const file = join(dir, `${sign.code}.svg`)
      expect(existsSync(file), file).toBe(true)
      expect(readFileSync(file, 'utf8').startsWith('<svg'), sign.code).toBe(true)
    }
  })
})
