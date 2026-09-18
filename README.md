# NJ Knowledge Test Prep

A study app for the **New Jersey MVC driver knowledge test** — the 50-question written exam you must
pass with 40 correct answers (80%) to get your permit.

Built as a static React app and deployed on **Cloudflare Workers** (static assets).

## What's in it

| Feature | What it does |
| --- | --- |
| **Mock exam** | 50 questions drawn with the same topic mix as the real test, scored against the 40-question pass mark, with a timer and a question map you can jump around in. |
| **Practice sets** | 10/20/30 questions from any combination of topics, with the answer and an explanation shown immediately. |
| **Smart ordering** | Questions you have never seen come first, then ones you got wrong, then the rest — so practice does not keep re-asking what you already know. |
| **Missed pile** | Every question you get wrong is kept until you answer it correctly. |
| **Road sign gallery** | 41 signs drawn as inline SVG — every shape (octagon, pennant, pentagon, crossbuck…) and every color group, each with its meaning. |
| **Flashcards** | Two decks: sign recognition, and the numbers worth memorizing (distances, speed limits, BAC, GDL rules). |
| **Cheat sheet** | The whole manual condensed into nine tables of testable facts. |
| **Progress** | Per-topic mastery, lifetime accuracy, study streak and mock-exam history. |
| **Offline-friendly** | No backend, no accounts, no network calls. Progress lives in `localStorage` on your device. |

The bank holds **196 questions** across 8 topics, each with an explanation of *why* the answer is right.

### Topic weighting

Each topic contributes to a mock exam in proportion to its share of the real test:

| Topic | Questions per exam |
| --- | --- |
| Road signs, shapes & colors | 10 |
| Rules of the road & speed limits | 9 |
| Safe driving & emergencies | 8 |
| Traffic signals & pavement markings | 6 |
| Right of way & intersections | 6 |
| Alcohol, drugs & penalties | 5 |
| Licensing, GDL & paperwork | 3 |
| Parking & sharing the road | 3 |

## Running it locally

```bash
npm install
npm run dev        # Vite dev server on http://localhost:5173
npm test           # data + quiz-engine tests (vitest)
npm run build      # typecheck and build to dist/
npm run preview    # serve the production build
```

## Deploying to Cloudflare

The app is a static bundle served by a Cloudflare Worker using the
[static assets](https://developers.cloudflare.com/workers/static-assets/) feature. `wrangler.jsonc`
sets `not_found_handling: "single-page-application"` so client-side routes resolve to `index.html`.

### One-off deploy from your machine

```bash
npx wrangler login     # once, to authorize your Cloudflare account
npm run deploy         # builds, then wrangler deploy
```

That publishes to `https://nj-driving-test.<your-subdomain>.workers.dev`. Change the `name` in
`wrangler.jsonc` if you want a different hostname, and add a `routes` entry to serve it from a custom
domain.

### Deploy from CI

`.github/workflows/deploy.yml` runs on demand (Actions → Deploy to Cloudflare → Run workflow). It needs
two repository secrets:

| Secret | Where to get it |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → *Edit Cloudflare Workers* template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Account ID |

### Connecting the repo instead

You can also skip CI entirely: in the Cloudflare dashboard, **Workers & Pages → Create → Import a
repository**, pick this repo, and set the build command to `npm run build` with `dist` as the output
directory. Cloudflare then builds and deploys on every push.

## Project layout

```
src/
  data/          question bank (one file per topic), sign catalog, cheat-sheet facts
  lib/
    quiz.ts      exam/practice builders, choice shuffling, study ordering
    storage.ts   localStorage progress, mastery and readiness scoring
  components/    Sign.tsx draws every road sign as SVG; one file per view
  __tests__/     vitest suite over the data and the quiz engine
```

### How readiness is scored

A topic's score is its accuracy multiplied by how much of it you have covered, so answering three
questions correctly does not read as "100% ready". The dashboard number is those topic scores weighted
by each topic's share of the 50-question exam.

## A note on accuracy

This is a study aid built from the New Jersey Driver Manual. Rules, fees and penalties change — the MVC
is the authority. Check [nj.gov/mvc](https://www.nj.gov/mvc/) before you rely on any specific figure.
