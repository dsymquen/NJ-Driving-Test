import type { CategoryId, Question } from '../data/types'
import { CATEGORIES } from '../data/types'
import { QUESTIONS, QUESTION_BY_ID, questionsInCategory } from '../data/questions'
import type { Progress } from './storage'
import { EXAM_LENGTH } from './storage'

export function shuffle<T>(items: readonly T[]): T[] {
  const out = items.slice()
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Sort so that questions you have never seen come first, then ones you got wrong
 * most recently, then everything else. Keeps practice sessions useful instead of
 * re-asking what you already know.
 */
function studyOrder(questions: Question[], progress: Progress): Question[] {
  const rank = (q: Question): number => {
    const s = progress.stats[q.id]
    if (!s) return 0
    if (!s.lastCorrect) return 1
    return 2 + s.correct
  }
  return shuffle(questions).sort((a, b) => rank(a) - rank(b))
}

export function buildPractice(
  progress: Progress,
  categories: CategoryId[],
  count: number,
): Question[] {
  const pool =
    categories.length === 0
      ? QUESTIONS
      : categories.flatMap((c) => questionsInCategory(c))
  return studyOrder(pool, progress).slice(0, Math.min(count, pool.length))
}

/**
 * A 50-question mock exam that mirrors the mix of the real NJ knowledge test:
 * each category contributes roughly its share of the 50 questions.
 */
export function buildExam(progress: Progress): Question[] {
  const picked: Question[] = []
  const used = new Set<string>()

  for (const category of CATEGORIES) {
    const pool = studyOrder(questionsInCategory(category.id), progress)
    for (const q of pool.slice(0, category.examWeight)) {
      picked.push(q)
      used.add(q.id)
    }
  }

  // Top up (or trim) in case the weights and the bank do not line up exactly.
  if (picked.length < EXAM_LENGTH) {
    for (const q of studyOrder(QUESTIONS, progress)) {
      if (picked.length >= EXAM_LENGTH) break
      if (used.has(q.id)) continue
      picked.push(q)
      used.add(q.id)
    }
  }

  return shuffle(picked).slice(0, EXAM_LENGTH)
}

export function buildReview(ids: string[], count = 20): Question[] {
  const questions = ids.map((id) => QUESTION_BY_ID[id]).filter((q): q is Question => Boolean(q))
  return questions.slice(0, count)
}

export interface ShuffledQuestion {
  question: Question
  /** Choice text in display order. */
  choices: string[]
  /** Index into `choices` that is correct. */
  answer: number
}

/** Shuffle the answer choices so you learn the material, not the position. */
export function withShuffledChoices(question: Question): ShuffledQuestion {
  const indices = shuffle(question.choices.map((_, i) => i))
  return {
    question,
    choices: indices.map((i) => question.choices[i]),
    answer: indices.indexOf(question.answer),
  }
}

export function formatDuration(ms: number): string {
  const total = Math.floor(ms / 1000)
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
