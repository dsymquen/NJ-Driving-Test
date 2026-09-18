import { useMemo, useState } from 'react'
import type { JSX } from 'react'
import { SIGNS } from '../data/signs'
import { ALL_FACTS } from '../data/handbook'
import type { Fact } from '../data/handbook'
import { shuffle } from '../lib/quiz'
import { Sign } from './Sign'

type Deck = 'signs' | 'facts'

interface Card {
  key: string
  signCode?: string
  front: string
  back: string
  note?: string
}

function signCards(): Card[] {
  return SIGNS.map((spec) => ({
    key: `sign-${spec.code}`,
    signCode: spec.code,
    front: 'What does this sign mean?',
    back: spec.name,
    note: spec.meaning,
  }))
}

function factCards(): Card[] {
  return ALL_FACTS.map(({ section, fact }: { section: string; fact: Fact }, i) => ({
    key: `fact-${i}`,
    front: fact.label,
    back: fact.value,
    note: fact.note ?? section,
  }))
}

export function Flashcards(): JSX.Element {
  const [deck, setDeck] = useState<Deck>('signs')
  const [seed, setSeed] = useState(0)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const cards = useMemo(() => {
    void seed
    return shuffle(deck === 'signs' ? signCards() : factCards())
  }, [deck, seed])

  const card = cards[index]

  const move = (delta: number): void => {
    setFlipped(false)
    setIndex((i) => (i + delta + cards.length) % cards.length)
  }

  const pickDeck = (next: Deck): void => {
    setDeck(next)
    setIndex(0)
    setFlipped(false)
  }

  return (
    <div className="stack">
      <section>
        <span className="eyebrow">Memorize</span>
        <h1 style={{ fontSize: 24, marginTop: 4 }}>Flashcards</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Tap the card to flip it. Signs teach recognition; the numbers deck covers the distances, limits
          and BAC figures the test likes to ask about.
        </p>
      </section>

      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="chips">
          <button className="chip" aria-pressed={deck === 'signs'} onClick={() => pickDeck('signs')}>
            Road signs ({SIGNS.length})
          </button>
          <button className="chip" aria-pressed={deck === 'facts'} onClick={() => pickDeck('facts')}>
            Numbers &amp; rules ({ALL_FACTS.length})
          </button>
        </div>
        <button
          className="btn btn-ghost small"
          onClick={() => {
            setSeed((s) => s + 1)
            setIndex(0)
            setFlipped(false)
          }}
        >
          Shuffle deck
        </button>
      </div>

      <div
        className="flashcard"
        role="button"
        tabIndex={0}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setFlipped((f) => !f)
          }
          if (event.key === 'ArrowRight') move(1)
          if (event.key === 'ArrowLeft') move(-1)
        }}
      >
        <div>
          {card.signCode ? (
            <Sign code={card.signCode} size={150} title={flipped ? card.back : 'Flashcard sign'} />
          ) : null}
          {flipped ? (
            <>
              <div className="flash-back">{card.back}</div>
              {card.note ? <p className="flash-note">{card.note}</p> : null}
            </>
          ) : (
            <div className="flash-front" style={{ marginTop: card.signCode ? 14 : 0 }}>
              {card.front}
            </div>
          )}
          <div className="flash-hint">{flipped ? 'Tap to hide' : 'Tap to reveal'}</div>
        </div>
      </div>

      <div className="row" style={{ justifyContent: 'space-between' }}>
        <button className="btn" onClick={() => move(-1)}>
          ← Previous
        </button>
        <span className="small muted">
          {index + 1} / {cards.length}
        </span>
        <button className="btn btn-primary" onClick={() => move(1)}>
          Next →
        </button>
      </div>
    </div>
  )
}
