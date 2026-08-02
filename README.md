# Magic Fruit

Think of a fruit. Answer seven yes/no questions. The app names your fruit.

Built with Nuxt 3, Tailwind CSS and Pinia — mobile-first, available in 7 languages,
and light/dark aware.

## How the trick works

Every fruit is shown on a specific set of the seven question pages. Saying "yes"
on round _n_ adds _n_ to your score, so the final score is a unique fingerprint
that maps back to exactly one fruit. `tests/unit/constants/fruits.spec.js` proves
this holds for the whole catalogue, so the round data can't silently drift.

## Getting started

```bash
yarn install
yarn dev        # http://localhost:3000
```

| Script          | What it does                       |
| --------------- | ---------------------------------- |
| `yarn dev`      | Dev server with HMR                |
| `yarn build`    | Production build into `.output`    |
| `yarn preview`  | Serve the production build         |
| `yarn generate` | Pre-render to static files         |
| `yarn test`     | Run the unit tests once            |
| `yarn test:watch` | Run the unit tests in watch mode |

## Project structure

```
app.vue                  Root shell (layout + page)
layouts/default.vue      Page chrome: header, background, safe areas
pages/index.vue          The only route — renders GameScreen

components/
  game/                  Everything specific to playing the game
    GameScreen.vue         Picks the screen for the current phase
    IntroScreen.vue        Title, how-it-works, start button
    BoardScreen.vue        Full catalogue — the player picks in secret
    QuestionScreen.vue     "Is it here?" + yes/no
    ResultScreen.vue       The reveal
    FruitGrid.vue          Responsive grid of FruitCards
    FruitCard.vue          One fruit: image + translated name
    FruitImage.vue         <picture> with webp + png fallback
    RoundProgress.vue      Progress bar and round counter
  layout/                App chrome (AppHeader, BackgroundDecor)
  ui/                    Generic, game-agnostic primitives
    AppIcon.vue            One component for the whole icon set
    BaseButton.vue         Variants and sizes in button.styles.js
    ActionBar.vue          Fixed bottom bar for primary actions
    LanguageSelect.vue     Locale switcher
    SoundToggle.vue        Mute/unmute

composables/
  useGame.js             The game state machine (rounds, score, phases)
  useSound.js            Sound effects, gated on the user's preference

constants/
  fruits.js              Catalogue, round layout, score -> fruit answers
  locales.js             Supported locales
  icons.js               Inline SVG icon bodies (Lucide geometry)

stores/preferences.js    Pinia store for sound, persisted to localStorage
lang/*.json              Translations (bn, hi, en, es, fr, de, it)
tests/unit/              Vitest specs mirroring the source tree
```

The rule of thumb: `constants/` holds data, `composables/` holds behaviour,
`components/ui` is reusable anywhere, `components/game` knows the rules.

## Design

- **Mobile first.** Every layout starts at the small breakpoint and scales up.
  Primary actions live in a fixed bottom bar within thumb reach, tap targets are
  at least 44px, and safe-area insets are respected on notched devices.
- **Semantic colour tokens.** `surface`, `card`, `ink`, `muted`, `brand`,
  `accent`, `danger` are Tailwind colours backed by CSS variables in
  `assets/css/main.css`, so dark mode is one variable swap rather than a `dark:`
  variant on every element.
- **Icons.** A single `<AppIcon name="…">` renders from an inline set built on
  Lucide geometry — no icon fonts, no per-icon imports, no runtime fetching, and
  icons inherit `currentColor` and font size.
- **Motion.** Screen transitions and entrance animations are defined in the
  Tailwind theme and are disabled under `prefers-reduced-motion`.

## Adding a language

1. Add `lang/<code>.json` with every key from `lang/en.json`.
2. Register the locale in `constants/locales.js`.

`tests/mocks/i18n.js` picks the file up for tests automatically once imported.
