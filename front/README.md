# front

The kata's curriculum: React + Vite + TypeScript on shadcn/ui, serving every lesson, figure, quiz
and flag board in the course. It is the app a student opens; the Java projects under `kata/stepN/`
are what they point their agent at.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

That is the whole of it for reading the course. A few units also want a backend, and each step ships
its own:

```bash
cd ../kata/step1/java && mvn spring-boot:run   # :8080
```

Vite proxies `/api` to `localhost:8080`, so the browser stays on one origin and Spring needs no CORS
configuration. Only one step's service can hold the port at a time, which is fine: a student works
one step at a time. Opening the app with no backend running is a supported state, because every quiz
and every flag board grades in the browser.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `tsc -b && vite build`. **This is the type check**, so run it before committing |
| `npm run lint` | oxlint |
| `npm run preview` | Serve the production build locally |

There is no test runner here. What the frontend is checked by is the type build and the eye.

## Layout

```
src/
  shared/       the shell: components, deck, i18n, lib, mode, progress, routes, assistant
  steps/        one folder per step, each holding its registry, figures, flags, locales,
                quiz and unit HTML
```

Dependencies point one way: a step may import from `shared`, and `shared` never imports a step. A
step reaches the shell by registering itself (`steps/index.ts`), which is also how its locales and
its slides arrive.

Imports go through the `@` alias, so `@/shared/components/ui/button` rather than a relative climb.
`components.json` points shadcn at `@/shared/components/ui`, which means `npx shadcn@latest add …`
keeps generating into `shared`.

## Before you edit anything

Three files carry the reasoning, and each loads when you work in the directory it covers:

- **`front/CLAUDE.md`** for anything visual or structural: the design system and its tokens, the
  `id`/`data-component` naming every rendered element follows, the audience and assistant filters,
  the language mechanism, and the presentation deck.
- **`front/src/steps/CLAUDE.md`** for the content: what is deliberate about each unit, why a figure
  is drawn the way it is, and which parts are student exercises that must not be solved.
- **`CLAUDE.md`** at the repo root for how the kata is built and what applies across both halves.

Two rules from those files are worth knowing before you touch a line, because both are easy to break
by accident: **nothing outside `src/index.css` is allowed to hold a colour**, and **student-facing
prose contains no em-dashes**.

## Adding a step or a unit

Use the `adding-a-step` skill in `.claude/skills/adding-a-step/`. It carries the six files a new step
needs, in order, plus how figures and inline figures are wired and how unit ids become URLs. Step ids
are `stepN` and unit ids are words, so together they are the route: `/steps/step1/session`.
