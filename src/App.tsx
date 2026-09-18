import { useCallback, useEffect, useMemo, useState } from 'react'
import type { JSX } from 'react'
import type { CategoryId } from './data/types'
import { CATEGORY_BY_ID } from './data/types'
import { EXAM_LENGTH, PASS_MARK } from './lib/storage'
import type { Progress } from './lib/storage'
import {
  loadProgress,
  missedQuestionIds,
  recordAnswer,
  recordExam,
  resetProgress,
  saveProgress,
} from './lib/storage'
import { buildExam, buildPractice, buildReview, withShuffledChoices } from './lib/quiz'
import type { ShuffledQuestion } from './lib/quiz'
import { Home } from './components/Home'
import { PracticeSetup } from './components/PracticeSetup'
import { Quiz } from './components/Quiz'
import type { QuizAnswer, QuizMode } from './components/Quiz'
import { Results } from './components/Results'
import { SignsGallery } from './components/SignsGallery'
import { Flashcards } from './components/Flashcards'
import { Handbook } from './components/Handbook'
import { Stats } from './components/Stats'

type View = 'home' | 'practice' | 'quiz' | 'results' | 'signs' | 'flashcards' | 'handbook' | 'stats'

const NAV: { id: View; label: string }[] = [
  { id: 'home', label: 'Dashboard' },
  { id: 'practice', label: 'Practice' },
  { id: 'signs', label: 'Signs' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'handbook', label: 'Cheat sheet' },
  { id: 'stats', label: 'Progress' },
]

const HASH_VIEWS: View[] = ['home', 'practice', 'signs', 'flashcards', 'handbook', 'stats']

interface Session {
  mode: QuizMode
  title: string
  items: ShuffledQuestion[]
  /** Fresh key so the quiz component resets between sessions. */
  key: number
}

interface Finished {
  session: Session
  answers: QuizAnswer[]
  durationMs: number
}

function viewFromHash(): View {
  const hash = window.location.hash.replace('#/', '').replace('#', '')
  return (HASH_VIEWS as string[]).includes(hash) ? (hash as View) : 'home'
}

export function App(): JSX.Element {
  const [progress, setProgress] = useState<Progress>(() => loadProgress())
  const [view, setView] = useState<View>(() => viewFromHash())
  const [session, setSession] = useState<Session | null>(null)
  const [finished, setFinished] = useState<Finished | null>(null)
  const [practiceSeed, setPracticeSeed] = useState<CategoryId[]>([])

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  useEffect(() => {
    document.documentElement.dataset.theme = progress.theme
  }, [progress.theme])

  useEffect(() => {
    const onHashChange = (): void => setView(viewFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const go = useCallback((next: View): void => {
    setView(next)
    window.scrollTo({ top: 0 })
    if ((HASH_VIEWS as string[]).includes(next)) {
      window.location.hash = next === 'home' ? '' : `#${next}`
    }
  }, [])

  const startSession = useCallback(
    (mode: QuizMode, title: string, items: ShuffledQuestion[]): void => {
      if (items.length === 0) return
      setSession({ mode, title, items, key: Date.now() })
      setFinished(null)
      setView('quiz')
      window.scrollTo({ top: 0 })
    },
    [],
  )

  const startExam = useCallback(() => {
    const items = buildExam(progress).map(withShuffledChoices)
    startSession('exam', `Mock exam · ${EXAM_LENGTH} questions · pass at ${PASS_MARK}`, items)
  }, [progress, startSession])

  const startPractice = useCallback(
    (categories: CategoryId[], count: number) => {
      const items = buildPractice(progress, categories, count).map(withShuffledChoices)
      const label =
        categories.length === 0
          ? 'Mixed practice'
          : categories.length === 1
            ? `Practice · ${CATEGORY_BY_ID[categories[0]].short}`
            : `Practice · ${categories.length} topics`
      startSession('practice', label, items)
    },
    [progress, startSession],
  )

  const startCategory = useCallback(
    (id: CategoryId) => {
      setPracticeSeed([id])
      startPractice([id], 10)
    },
    [startPractice],
  )

  const reviewMissed = useCallback(() => {
    const items = buildReview(missedQuestionIds(progress), 20).map(withShuffledChoices)
    startSession('review', 'Reviewing questions you missed', items)
  }, [progress, startSession])

  const handleAnswer = useCallback((answer: QuizAnswer) => {
    setProgress((prev) => recordAnswer(prev, answer.questionId, answer.correct))
  }, [])

  const handleFinish = useCallback(
    (answers: QuizAnswer[], durationMs: number) => {
      if (!session) return
      if (session.mode === 'exam') {
        const score = answers.filter((a) => a.correct).length
        setProgress((prev) =>
          recordExam(prev, {
            at: Date.now(),
            score,
            total: answers.length,
            passed: score >= PASS_MARK,
            durationMs,
          }),
        )
      }
      setFinished({ session, answers, durationMs })
      setView('results')
      window.scrollTo({ top: 0 })
    },
    [session],
  )

  const retryMissedFromResults = useCallback(() => {
    if (!finished) return
    const wrongIds = finished.answers.filter((a) => !a.correct).map((a) => a.questionId)
    const items = buildReview(wrongIds, wrongIds.length).map(withShuffledChoices)
    startSession('review', 'Drilling what you just missed', items)
  }, [finished, startSession])

  const repeatSession = useCallback(() => {
    if (!finished) return
    if (finished.session.mode === 'exam') startExam()
    else startPractice(practiceSeed, finished.session.items.length)
  }, [finished, startExam, startPractice, practiceSeed])

  const toggleTheme = useCallback(() => {
    setProgress((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }))
  }, [])

  const body = useMemo(() => {
    switch (view) {
      case 'quiz':
        return session ? (
          <Quiz
            key={session.key}
            mode={session.mode}
            title={session.title}
            items={session.items}
            onAnswer={handleAnswer}
            onFinish={handleFinish}
            onQuit={() => go('home')}
          />
        ) : null
      case 'results':
        return finished ? (
          <Results
            mode={finished.session.mode}
            items={finished.session.items}
            answers={finished.answers}
            durationMs={finished.durationMs}
            onAgain={repeatSession}
            onRetryMissed={retryMissedFromResults}
            onHome={() => go('home')}
          />
        ) : null
      case 'practice':
        return <PracticeSetup initialCategories={practiceSeed} onStart={startPractice} />
      case 'signs':
        return <SignsGallery />
      case 'flashcards':
        return <Flashcards />
      case 'handbook':
        return <Handbook />
      case 'stats':
        return (
          <Stats
            progress={progress}
            onReset={() => {
              if (window.confirm('Clear all saved progress on this device?')) {
                setProgress(resetProgress())
              }
            }}
          />
        )
      default:
        return (
          <Home
            progress={progress}
            onStartExam={startExam}
            onStartCategory={startCategory}
            onStartQuickPractice={() => startPractice([], 10)}
            onReviewMissed={reviewMissed}
            onGo={go}
          />
        )
    }
  }, [
    view,
    session,
    finished,
    progress,
    practiceSeed,
    go,
    handleAnswer,
    handleFinish,
    repeatSession,
    retryMissedFromResults,
    reviewMissed,
    startCategory,
    startExam,
    startPractice,
  ])

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand" onClick={() => go('home')}>
            <span className="brand-mark">NJ</span>
            <span>
              <span className="brand-text">Knowledge Test Prep</span>
              <br />
              <span className="brand-sub">New Jersey MVC written exam</span>
            </span>
          </button>
          <span className="topbar-spacer" />
          <nav className="nav">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                aria-current={view === item.id ? 'true' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${progress.theme === 'dark' ? 'light' : 'dark'} mode`}
            title="Toggle theme"
          >
            {progress.theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </header>

      <main>{body}</main>

      <footer className="footer">
        Study aid based on the New Jersey Driver Manual. Progress is saved in this browser only. Always
        check{' '}
        <a href="https://www.nj.gov/mvc/" target="_blank" rel="noreferrer">
          nj.gov/mvc
        </a>{' '}
        for the official rules and current test requirements.
      </footer>
    </div>
  )
}
