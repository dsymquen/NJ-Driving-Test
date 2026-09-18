import type { CategoryId } from '../data/types'
import { CATEGORIES } from '../data/types'
import { QUESTION_BY_ID, questionsInCategory } from '../data/questions'

const KEY = 'nj-driving-test:progress:v1'

export interface QuestionStat {
  seen: number
  correct: number
  /** Whether the most recent attempt was correct. */
  lastCorrect: boolean
  lastAt: number
}

export interface ExamResult {
  at: number
  score: number
  total: number
  passed: boolean
  durationMs: number
}

export interface Progress {
  version: 1
  stats: Record<string, QuestionStat>
  exams: ExamResult[]
  /** ISO dates (YYYY-MM-DD) on which at least one question was answered. */
  days: string[]
  theme: 'dark' | 'light'
}

export const PASS_MARK = 40
export const EXAM_LENGTH = 50

function empty(): Progress {
  return { version: 1, stats: {}, exams: [], days: [], theme: 'dark' }
}

export function loadProgress(): Progress {
  if (typeof localStorage === 'undefined') return empty()
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as Partial<Progress>
    const base = empty()
    return {
      ...base,
      ...parsed,
      stats: { ...(parsed.stats ?? {}) },
      exams: Array.isArray(parsed.exams) ? parsed.exams : [],
      days: Array.isArray(parsed.days) ? parsed.days : [],
      theme: parsed.theme === 'light' ? 'light' : 'dark',
      version: 1,
    }
  } catch {
    return empty()
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* storage unavailable (private mode, blocked cookies) — study still works, it just is not remembered */
  }
}

export function resetProgress(): Progress {
  const fresh = empty()
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  return fresh
}

export function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function recordAnswer(p: Progress, questionId: string, correct: boolean): Progress {
  const prev = p.stats[questionId]
  const stat: QuestionStat = {
    seen: (prev?.seen ?? 0) + 1,
    correct: (prev?.correct ?? 0) + (correct ? 1 : 0),
    lastCorrect: correct,
    lastAt: Date.now(),
  }
  const day = today()
  return {
    ...p,
    stats: { ...p.stats, [questionId]: stat },
    days: p.days.includes(day) ? p.days : [...p.days, day].slice(-400),
  }
}

export function recordExam(p: Progress, result: ExamResult): Progress {
  return { ...p, exams: [...p.exams, result].slice(-50) }
}

export interface CategoryMastery {
  id: CategoryId
  seen: number
  total: number
  accuracy: number
  /** 0-1 readiness for this category, blending accuracy with how much you have covered. */
  score: number
}

export function categoryMastery(p: Progress, id: CategoryId): CategoryMastery {
  const questions = questionsInCategory(id)
  const total = questions.length
  let seen = 0
  let attempts = 0
  let correct = 0
  for (const q of questions) {
    const s = p.stats[q.id]
    if (!s) continue
    seen += 1
    attempts += s.seen
    correct += s.correct
  }
  const accuracy = attempts === 0 ? 0 : correct / attempts
  // You need to have answered a decent share of a category before we trust the accuracy.
  const target = Math.max(6, Math.ceil(total * 0.5))
  const coverage = total === 0 ? 0 : Math.min(1, seen / target)
  return { id, seen, total, accuracy, score: accuracy * coverage }
}

/** Weighted 0-100 estimate of how ready you are for the real 50-question test. */
export function readiness(p: Progress): number {
  const totalWeight = CATEGORIES.reduce((sum, c) => sum + c.examWeight, 0)
  const weighted = CATEGORIES.reduce(
    (sum, c) => sum + c.examWeight * categoryMastery(p, c.id).score,
    0,
  )
  return Math.round((weighted / totalWeight) * 100)
}

export function missedQuestionIds(p: Progress): string[] {
  return Object.entries(p.stats)
    .filter(([id, s]) => !s.lastCorrect && QUESTION_BY_ID[id])
    .sort((a, b) => b[1].lastAt - a[1].lastAt)
    .map(([id]) => id)
}

export function answeredCount(p: Progress): number {
  return Object.keys(p.stats).filter((id) => QUESTION_BY_ID[id]).length
}

export function overallAccuracy(p: Progress): number {
  let attempts = 0
  let correct = 0
  for (const [id, s] of Object.entries(p.stats)) {
    if (!QUESTION_BY_ID[id]) continue
    attempts += s.seen
    correct += s.correct
  }
  return attempts === 0 ? 0 : Math.round((correct / attempts) * 100)
}

/** Consecutive days up to and including today (or yesterday) with study activity. */
export function studyStreak(p: Progress): number {
  if (p.days.length === 0) return 0
  const set = new Set(p.days)
  const cursor = new Date()
  if (!set.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1)
    if (!set.has(cursor.toISOString().slice(0, 10))) return 0
  }
  let streak = 0
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}
