import type { CategoryId, Question } from './types'
import { SIGN_QUESTIONS } from './q-signs'
import { SIGNAL_QUESTIONS } from './q-signals'
import { RULE_QUESTIONS } from './q-rules'
import { ROW_QUESTIONS } from './q-rightofway'
import { SAFETY_QUESTIONS } from './q-safety'
import { ALCOHOL_QUESTIONS } from './q-alcohol'
import { LICENSE_QUESTIONS } from './q-license'
import { PARKING_QUESTIONS } from './q-parking'

export const QUESTIONS: Question[] = [
  ...SIGN_QUESTIONS,
  ...SIGNAL_QUESTIONS,
  ...RULE_QUESTIONS,
  ...ROW_QUESTIONS,
  ...SAFETY_QUESTIONS,
  ...ALCOHOL_QUESTIONS,
  ...LICENSE_QUESTIONS,
  ...PARKING_QUESTIONS,
]

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
)

export function questionsInCategory(category: CategoryId): Question[] {
  return QUESTIONS.filter((q) => q.category === category)
}

export const TOTAL_QUESTIONS = QUESTIONS.length
