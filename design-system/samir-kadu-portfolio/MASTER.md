# Design System — The Engineer's Workspace

**Project:** Samir Kadu Portfolio
**Concept:** An indexed engineering workspace — instrument panels, numbered modules, and monospace metadata, without pastiching an operating system.

The source of truth for tokens is `src/app/globals.css`. Tailwind reads those same CSS
variables via `tailwind.config.mjs`, so there is exactly one place to change a colour.

---

## Surfaces

Four levels, light and dark. Never introduce a fifth.

| Token | Purpose |
|---|---|
| `--bg` / `bg-bg` | Page background |
| `--bg-sunken` / `bg-sunken` | Alternating module bands, image wells |
| `--panel` / `bg-panel` | Cards, list containers |
| `--panel-raised` / `bg-raised` | Floating surfaces — command palette, mobile sheet |

Depth comes from hairlines and a single soft shadow, not from stacked glass.

- `--line` — default hairline, used for every border
- `--line-strong` — emphasis hairline (active nodes, key caps, crosshair marks)
- `--shadow-panel` / `--shadow-float` — the only two elevations

## Text

| Token | Contrast on `--bg` | Use |
|---|---|---|
| `text-ink` | 17.9:1 light / 16.4:1 dark | Headings, primary copy |
| `text-ink-2` | 7.2:1 / 8.0:1 | Body, descriptions |
| `text-ink-3` | 5.3:1 / 4.8:1 | Metadata, technical labels |

All three clear WCAG AA (4.5:1). If a colour is edited, re-check the ratio — the
comments in `globals.css` record the measured values.

## Signal colours

`--accent` (blue) marks the active thing and nothing else — active nav module,
selected domain, current tier, primary button. `--live` (green) is reserved for
status ("deployed", "open to opportunities"). `--warn` (amber) is used once, for
the certification badge.

## Typography

| Role | Family | Notes |
|---|---|---|
| Headings | Space Grotesk (`--font-heading`) | `-0.022em` tracking, `text-wrap: balance` |
| Body | DM Sans (`--font-body`) | 1.7–1.75 line-height on prose |
| Metadata | JetBrains Mono (`--font-mono`) | Tabular numerals |

Section titles use `clamp(1.75rem, 4.2vw, 2.75rem)`; the hero uses
`clamp(2.5rem, 8vw, 4.25rem)`. No fixed heading sizes — every display size scales.

### The `.tech-label`

The monospace voice of the site: 11px, `0.14em` tracking, uppercase, `--text-3`.
Used for eyebrows, field labels and module codes. It is what makes the page read
as an instrument rather than a brochure.

## Layout

- `.shell` — max width `78rem`, responsive gutters (20 / 32 / 40px)
- `.section-pad` — 5.5rem block padding, 8rem from `md` up
- `--nav-h` (3.5rem) drives both the fixed header and every `scroll-mt`

Breakpoints: `xs` 430 · `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280.
`lg` is the real fork — below it the radial domain network becomes a tap-to-expand
list, and the nav becomes a sheet.

## Motion

Three speeds, one easing family. Defined once in `globals.css` and mirrored in
`src/lib/motion.ts` so CSS and Framer Motion agree.

| Token | Duration | Use |
|---|---|---|
| `--dur-fast` | 150ms | Interaction feedback — hover, press |
| `--dur-med` | 320ms | Component transitions — expand, dim, dialog |
| `--dur-slow` | 640ms | Section storytelling — scroll reveals |

Easing: `--ease` `cubic-bezier(0.22, 1, 0.36, 1)` for entrances,
`--ease-inout` `cubic-bezier(0.65, 0, 0.35, 1)` for symmetric moves.

Animate `transform` and `opacity` only. Every reveal is `once: true` — nothing
re-animates on scroll-back. `prefers-reduced-motion` disables decorative motion
globally; content still reveals, it just arrives instantly.

## Component primitives

`.panel` · `.panel-raised` · `.btn` (`.btn-primary`, `.btn-ghost`) · `.kbd` ·
`.status-dot` · `.corner-marks` (crosshair framing) · `.tap` (44px touch floor on
coarse pointers and small viewports) · `.link-underline` (underline grows on hover).

## Rules

- Numbering is structural. Modules are `00`–`06` in the nav, the left rail, the
  footer index and the command palette — all read from `MODULES` in `src/content/site.ts`.
- One accent. If two things are blue, one of them is wrong.
- Hover is never the only affordance — every hover state has a focus equivalent.
- Content lives in `src/content/`. Components take data as props and never inline copy.
- Sections render only what exists in the data. Absent information is omitted, never
  filled with placeholder prose.

## Anti-patterns

- ❌ Neon glows, purple gradients, glassmorphism everywhere
- ❌ Skill proficiency percentages
- ❌ Emoji as icons (use Lucide, or the SVGs in `public/icons`)
- ❌ Scroll hijacking or animations the visitor must wait through
- ❌ New colour values in components — add a token instead
- ❌ Animating `width`, `height`, `top`, `left`

## Pre-delivery checklist

- [ ] `npm run build` and `npm run lint` clean
- [ ] `npx tsc --noEmit` clean (strict mode)
- [ ] No horizontal overflow at 375 / 430 / 768 / 1024 / 1440
- [ ] Touch targets ≥ 44px below `md`
- [ ] Keyboard path works: skip link → nav → modules → palette (⌘K) → dialogs (Esc)
- [ ] Both themes checked, contrast ≥ 4.5:1
- [ ] `prefers-reduced-motion` honoured
