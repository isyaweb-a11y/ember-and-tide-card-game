[![make.fun](https://make.fun/badge/best-card-game-20261122-1826.svg)](https://make.fun/bounty/best-card-game-20261122-1826)
[![rank](https://make.fun/badge/best-card-game-20261122-1826/isyaweb-a11y/ember-and-tide-card-game/rank.svg)](https://make.fun/bounty/best-card-game-20261122-1826)
[![reward](https://make.fun/badge/best-card-game-20261122-1826/isyaweb-a11y/ember-and-tide-card-game/reward.svg)](https://make.fun/bounty/best-card-game-20261122-1826)

# Ember & Tide — Duel of the Four Winds

A complete, original card battler that runs offline in a desktop browser.
You face **The Warden**, keeper of the four winds, in a duel of cards:
30 life each, a 28-card deck across four elements, energy that grows every
turn, and one sharp rule — **Ember beats Gale, Gale beats Stone, Stone
beats Tide, Tide beats Ember** — strike with the favoured element for
+2 damage.

## How it plays

- **Draw, spend, strike.** Each turn you draw a card and your energy
  refills (3, then +1 a turn, up to 10). Play as many cards as you can
  afford, then end your turn and the Warden answers.
- **Four elements, four jobs.** Ember hits hard, Tide heals and siphons,
  Gale draws and bursts, Stone shields and endures. Cards combine: a
  cheap draw sets up an expensive finisher; a shield buys the turn a heal
  needs.
- **Read the ward.** The Warden's last played element is its ward — beat
  it and your strike lands for +2. The Warden reads yours the same way.
- **A real ending.** First to 0 life loses: a victory screen with your
  duel stats, or a defeat screen that invites the rematch.

## Screens

`screenshots/` holds four real renders of the game's own code: the title
screen, a mid-duel table (both hands, readable values and costs, both life
totals, energy and turn), the victory screen, and the defeat screen.

## Play it

Open `game/index.html` in desktop Chrome — no build step, no network
request, no server needed. Sound is a tiny WebAudio synth (toggle at the
top right); everything else is plain HTML, CSS and JavaScript under
`game/`:

- `game/index.html` — the table, the title screen, the end screens
- `game/styles.css` — the felt table, the gold, the cards
- `game/src/cards.js` — the four elements and the 28-card deck
- `game/src/game.js` — turns, energy, damage, shields, the Warden's AI
- `game/src/render.js` — hands, health bars, the log, floating numbers
- `game/src/audio.js` — the little synth (hits, shields, fanfares)
- `game/src/main.js` — buttons, restart, play-test hooks

`main.ts` (Node 22) hands the game in: it copies `game/` and
`screenshots/` to the output directory and writes `dossier.json` with the
vendored make.fun library. Run it locally with:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Entry

Built for the [Make the best card game](https://make.fun/bounty/best-card-game-20261122-1826)
bounty on [make.fun](https://make.fun) — an original game, its own idea,
art, sounds and names.

Built with [make.fun](https://make.fun/r/sc1d8ke0)
