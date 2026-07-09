# The Daily Woo ✦

Your daily memo from the universe — horoscope, tarot pull, lucky number, power color,
fashion boost, and one gratitude, delivered with a wink. Career, cash, and
main-character energy only; romance is permanently out of scope.

## What it is

A zero-dependency, zero-backend mobile PWA. Friends open the link, enter a name and
birthday (birth time optional — unlocks moon and rising flavor), and tap
"Add to Home Screen." Everything is stored on-device in localStorage; there are no
accounts, no tracking, and no servers.

Readings are deterministic: the date + name + birthday seed the content engine, so the
same person sees the same memo all day on any device, and no two people share one.
The daily read is composed from rotating parts (16 openers x 40 cores x 20 closers),
so full combinations don't repeat for ~80 days.

## Files

- `index.html` — app shell (onboarding, today, you screens)
- `content.js` — the entire voice of the app: signs, readings, tarot, fashion, gratitude
- `app.js` — deterministic engine: seeding, zodiac/moon math, rendering, share
- `styles.css` — midnight plum + warm cream design system
- `sw.js` — network-first service worker (updates flow, offline works)
- `manifest.webmanifest`, `icons/` — PWA install metadata

## Run locally

Any static server, e.g.:

```sh
python3 -m http.server 8000
```

## Deploy

Push to GitHub, enable Pages on the main branch, and share the URL. Bump the
`CACHE` version in `sw.js` when shipping content updates.

## Accuracy disclaimer

Moon phase uses the mean synodic month; moon and rising signs use folk approximations.
This is by design — the app is entertainment-grade astrology with production-grade sass.
