# WLHA Website Review — 64 Suggestions

This report reviews the Workshop on Long-Horizon Agents (WLHA) site (https://longhorizonagents.github.io/), benchmarked throughout against the reference Workshop on Agent Behavior site (aiagentbehavior.com). It consolidates the output of a 64-agent review pass, each agent inspecting one concrete issue in `index.html`, `styles.css`, or `script.js`. Findings span first-impression/reference parity, layout and typography, colour and contrast, content accuracy, accessibility, responsive behaviour, performance, SEO, and code quality; every suggestion is numbered 1–64 and includes a specific, implementation-ready fix.

## Executive Summary

- **Accessibility is the most serious cluster.** Three High-severity findings — no `:focus-visible` styles anywhere (#44), an inaccessible mobile menu with no focus management/Esc/trap and still-tabbable when closed (#47), and an illegible `--soft` text token failing AA on every background (#21) — plus a flat heading outline (no `h3` for people, #45) and colour-only link affordances (#46) mean keyboard and low-vision users are materially underserved.
- **Colour contrast fails WCAG AA in multiple tokens.** `--soft` (#21), `--coral-deep` as small text (#19), and the footer disclaimer colour (#22, #50) all fall below 4.5:1; these are token-level fixes that cascade widely.
- **The hero and copy are redundant and diluted.** Three findings (#1, #12, #28) independently flag the hero stacking near-duplicate subtitle/tagline lines and repeated venue/date facts; "bold soup" and run-on sentences (#18, #29, #32) further bury the workshop's actual thesis.
- **Data is duplicated and already drifting.** Speaker names/affiliations are hardcoded in the schedule while the source of truth lives in `script.js`, producing live contradictions (Zifan Wang's affiliation) and an 8-speakers-vs-7-keynotes mismatch (#11, #34); the un-escaped `innerHTML` renderer already mangles "Texas A&M" (#64).
- **Reference-parity gaps in polish.** The hero lacks any motion/depth (#2), sponsors are plain text not logos (#7), person photos animate but aren't clickable (#6, #41), and display headings are under-weighted vs the reference's semibold+tight recipe (#3).
- **WLHA also leads the reference in places** — a real hour-by-hour schedule, an Important Dates timeline, and a COI statement — but these strengths are undercut by execution issues (data drift, buried COI, orphaned IA) that the recommendations address while preserving the differentiators.

## Priority at a Glance

**Counts:** High: 4 — Medium: 45 — Low: 15 (total 64).

High-severity items: #19 (`--coral-deep` small-text contrast), #21 (`--soft` contrast), #44 (no focus-visible), #47 (mobile-menu a11y).

**Quick wins** (cheap, high-impact, mostly one-to-few-line edits):
- Darken contrast tokens `--soft`, `--coral-deep`, footer base colour — #19, #21, #22, #50.
- Add a global `:focus-visible` rule — #44.
- Add a skip-to-content link — #49.
- Fix the live affiliation contradiction (Zifan Wang "Meta MSL" vs "Meta, London") — #11, #34.
- Escape interpolated values in `personCard()` (fixes "Texas A&M") — #64.
- Standardize speaker affiliations to bare org — #39.
- Strip unused font weights from the Google Fonts request — #17, #56.
- Add `robots.txt` + `sitemap.xml` + canonical — #62.
- Add OG image / Twitter card / canonical / theme-color meta — #59.
- Fix the title prefix to lead with the descriptive name — #61.
- Remove inline magic-number margins in the committee/sponsors blocks — #9, #23.
- Delete ~39 lines of dead CSS — #63.

**Bigger lifts** (markup/JS restructuring, asset work, or design changes):
- Rework the mobile menu for full keyboard/focus support — #47.
- Make whole person cards clickable links and use headings — #6, #41, #45.
- Add hero motion/depth and trim the hero to four elements — #1, #2, #12, #28.
- Reconcile speaker roster with the schedule and derive keynote labels from the data — #11, #34.
- Replace sponsor text with linked brand logos and a logo wall — #7.
- Add a live deadline countdown — #10.
- Re-resize and responsively serve the 25 avatar JPEGs; self-host fonts — #55, #56, #57.
- Add JSON-LD Event/Organization/Person graph — #60.
- Count-aware people grid columns to kill orphaned cards — #25.

## Detailed Suggestions

### Vs. Reference

**1. Trim the hero to four elements and one CTA** — `medium` — _`index.html` lines 47–58 (`.hero__inner`); `styles.css` lines 131–144_
The hero stacks six blocks (eyebrow, h1, subtitle, tagline, meta, dual CTA), three of which restate the same theme and the meta line repeats the eyebrow's facts; the primary CTA sits at the bottom of competing blocks.
**Fix:** Delete the `.hero__tagline` paragraph (it duplicates the subtitle), fold venue/date into the eyebrow and delete the separate `.hero__meta` line, and demote the second CTA to a quiet text link so "Call for Papers" is the single primary action. (Overlaps #12, #28 on the duplicate subtitle/tagline.)
_vs Reference:_ aiagentbehavior.com uses exactly four hero elements and one glowing-pill CTA, with a single uppercase meta line combining all facts and one italic subtitle — every element distinct.

**2. Hero lacks any motion or depth — reads as a flat poster** — `medium` — _`styles.css` lines 113–126 (`.hero`/`.hero__glow`/`.hero__horizon`); `index.html` lines 44–61_
The hero is a centered text block over one static blurred coral blob plus a 1px line; the only motion is a one-time load fade, so it feels printed rather than alive.
**Fix:** Animate `.hero__glow` with a slow breathing/drift keyframe (guarded under the existing `prefers-reduced-motion` block at line 340), layer a second tighter radial highlight for real dimension, and shimmer the `.hero__horizon` gradient — staying on-brand (coral on paper) rather than copying particles-on-black.
_vs Reference:_ The reference runs a continuous canvas particle field with radial vignette, four edge fades for depth, a drop-shadowed 7.5rem heading, and an animated-halo CTA — kinetic and dimensional within the first second, while still respecting reduced-motion.

**3. Display headings are under-weighted and over-tracked** — `medium` — _`styles.css` line 51 (`h1–h4` weight 500), lines 128–129 (`.hero__title`), line 175 (`.section__title`)_
EB Garamond is a thin-stemmed revival; at 5.7rem with weight 500 and near-neutral tracking the hero title renders spindly and undesigned.
**Fix:** Set `.hero__title` to `font-weight:600; letter-spacing:-.025em` and `.section__title` to `font-weight:600; letter-spacing:-.02em`; leave smaller h3/h4 (1.2–1.7rem) at 500 so weight scales with optical size. EB Garamond 600 is already requested, so this is zero-cost (but see #17/#56 — if 600 is dropped from the font request, keep it for these headings).
_vs Reference:_ The reference uses the identical EB Garamond + Lora pairing but applies semibold (600) + `tracking-tight` (-0.025em) consistently to its hero and every section title, deliberately scaling weight and negative tracking up with size.

**4. Coral is the resting colour of all metadata, not a sparing accent** — `medium` — _`styles.css` `.agenda__time` (230), `.triad__idx` (184), `.topic__num` (202), `.datelist .d` (223), `.track__tag` (271); 19 agenda times + 9 kickers in `index.html`_
Coral paints essentially every mono micro-label (54 references), so it stops signalling "look here"; all 19 agenda timestamps glow uniformly, drowning out the genuinely special keynote/featured rows.
**Fix:** Change `.agenda__time` to `var(--muted)` and scope coral only to `.agenda__row--key`/`.agenda__row--feature` times; demote `.triad__idx`, `.topic__num`, `.datelist .d`, `.track__tag` to `var(--soft)`/`var(--muted)`, keeping coral on section kickers and the hero `.hl`. Keep `--coral-deep` as the link token unchanged. (Note `--soft`/`--coral-deep` themselves need darkening per #19/#21/#50.)
_vs Reference:_ The reference defines the identical coral as `--text-highlight:#ef7c7c` but uses it zero times in rendered output, carrying all metadata in neutral greys plus italics — it holds the accent entirely in reserve.

**5. Dates section is orphaned far from Call for Papers** — `medium` — _`index.html` `#dates` (113–127, IA position 2) vs `#cfp` (183–211, position 6)_
A linear reader meets the deadlines before the call and must scroll past Speakers, a 19-row Schedule, and Committee to connect "when" with "what/how"; the portal-open date is even repeated in both places 90 lines apart.
**Fix:** Move the `#dates` block to directly precede or merge into `#cfp` (or fold the date list after the cfp-cta), re-alternate the `section--tint` classes, and update both the `#navLinks` order and footer nav to match.
_vs Reference:_ The reference embeds its single key date ("Submission deadline — June 23, 2026 (AoE)") directly inside the Call for Contributions section, never separating timing from the call.

**6. Person photos animate on hover but aren't clickable** — `medium` — _`script.js` lines 44–59 (`personCard`); `styles.css` lines 250–252_
Only the name is an anchor, yet the photo carries strong hover affordances (lift, shadow, coral border, grayscale removal); the most button-like element is a dead zone and the only click target is a ~14-char name run.
**Fix:** When `p.home` exists, wrap the whole card body in one `<a class="card__link" target="_blank" rel="noopener">`; add `.card__link { display:block; cursor:pointer; color:inherit; }` and move hover/focus affordances onto `.card__link`. (Same root issue as #41; coordinate the two fixes.)
_vs Reference:_ The reference wraps the entire card in a single anchor (image + name + affiliation + "Website" label); the whole photo is the target and affordance and link are unified.

**7. Sponsors are plain text names, not linked brand logos** — `medium` — _`index.html` lines 217–223 (`.sponsor-logos`/`span.sponsor`); `styles.css` lines 285–290_
"Supported By" renders bare serif text spans with no images and no links, reading as a placeholder; the class name `.sponsor-logos` itself signals logos were intended.
**Fix:** Replace each span with a linked logo `<a href><img class="sponsor-logo" loading="lazy" alt="…"></a>`, and add `.sponsor-logo { height: clamp(1.6rem,3vw,2.4rem); object-fit:contain; opacity:.8 }` with a hover-to-1 rule. If SVGs can't be sourced in time, at minimum wrap the existing text in links. (See #37 re: framing these as tentative.)
_vs Reference:_ The reference renders each supporter as a real preloaded brand-logo `<img>` with descriptive alt in a responsive grid (`opacity-75 hover:opacity-100`) — a deliberate logo wall.

**8. Nav has no surface at page top** — `medium` — _`styles.css` lines 69–80 (`.nav`/`.nav.is-scrolled`); `script.js` lines 70–74_
The fixed nav is fully transparent until `scrollY > 24`, so at the hero the wordmark and muted links float over the coral glow with no backing and pop in after a few px of scroll.
**Fix:** Give `.nav` a baseline `background: rgba(255,255,255,.55)` + `backdrop-filter` + `border-bottom: 1px solid var(--line-soft)`, and keep `.nav.is-scrolled` to deepen it; optionally lower the JS threshold from 24 to ~8.
_vs Reference:_ The reference uses `position: sticky` with a uniform `nav-shell` surface at every scroll position and no JS scroll-threshold toggle.

**9. Committee sub-groups cramped by an inline 5rem gap** — `medium` — _`index.html` line 176 (`style="margin-top:5rem"` on the Advisory kicker); `styles.css` line 159_
Two equally-weighted header blocks (Organizers / Advisors) are separated by a hardcoded inline 5rem while every real section break uses `clamp(4.5rem,9vw,8.5rem)`, so they read ~3x closer than any comparable pair and the frozen value won't track the responsive clamp. (Same root cause as #23, lower-severity duplicate.)
**Fix:** Remove the inline style and add `.kicker--sub { margin-top: clamp(3.5rem,6vw,6rem); }`, tagging line 176 with that class; or split Organizers/Advisors into two `<section class="section">` blocks to inherit standard rhythm.
_vs Reference:_ The reference centralizes spacing on a flex parent (`flex flex-col gap-24 py-20`, uniform `mb-14` under titles) with no per-element inline overrides.

**10. No live deadline countdown** — `medium` — _`index.html` `.cfp-cta` (206–209) and `.datelist` (118–125); `script.js` (no timer)_
The CFP ends with only a static "portal opens July 18" line and the actual deadline lives far up the page; there is no urgency affordance at the point of conversion.
**Fix:** Add `<p class="cfp-cta__countdown">…<span id="cfpCountdown" aria-live="polite">—</span></p>` and a `script.js` function targeting `2026-08-30T12:00:00Z` (Aug 29 AoE), rendering days/hours/minutes on a 60s interval and swapping to "Submissions closed" at zero; the `—` placeholder degrades gracefully without JS.
_vs Reference:_ The reference places a prominent "Submissions close in" countdown directly under its deadline headline.

**11. Schedule speaker data is hardcoded and drifting from the source of truth** — `medium` — _`index.html` lines 145–165 (`.agenda`) vs `script.js` `PEOPLE.speakers` lines 7–16_
The keynote rows hardcode names and affiliations that already disagree with the data (schedule says Zifan Wang "Meta MSL"; data says "Meta, London"); eight speakers exist but only seven keynote rows, with an invisible mapping. (Tightly related to #34.)
**Fix:** Tag keynote rows with `data-speaker` slugs and inject name/affiliation from `PEOPLE.speakers` in `script.js` (as `personCard()` already does for `aff`). Immediate stopgap: align line 153 to "Meta, London".
_vs Reference:_ The reference has no schedule at all (WLHA is ahead here) but renders each person exactly once, so there is no second copy to drift — adopt that single-source principle.

**12. Hero value prop split across two near-duplicate lines** — `medium` — _`index.html` lines 49–53 (`.hero__subtitle`/`.hero__tagline`); `styles.css` 131–139_
The subtitle and tagline both restate the identical context/interaction/reflection triad and "days-long" framing; there is no single crisp sentence to grab. (Overlaps #1, #28.)
**Fix:** Delete the subtitle and promote one tightened tagline as the sole pitch, then shift the remaining `.reveal` `data-delay` values down by one to keep the stagger sequential.
_vs Reference:_ The reference uses exactly one italic tagline under its H1 with no competing second pitch line.

### Design & Layout

**23. Inline magic-number margins break the responsive vertical rhythm** — `low` — _`index.html` line 176 (`margin-top:5rem`) and line 224 (`margin-top:1.5rem`)_
Two static inline margins bypass the stylesheet's clamp-based scale, so as the viewport grows surrounding gaps expand to 8.5rem while these stay frozen, and the rhythm can't be tuned centrally. (Detailed duplicate of #9 plus the sponsors block.)
**Fix:** Replace the line 176 inline style with a reusable `.section__group { margin-top: clamp(3.5rem,6vw,6rem); }` and convert the line 224 inline margin to a utility class so no vertical spacing lives inline.
_vs Reference:_ The reference uses one uniform `gap-24` on a flex parent and no per-block magic numbers.

**24. Prose double-constrained inside `wrap--read`, stopping short of its column** — `medium` — _`styles.css` line 65 (`.wrap--read` 780px) and line 177 (`.prose` 65ch); affects `#overview`, `#cfp`_
Headings align to the 780px column edge but every body paragraph stops ~130–150px short (65ch ≈ 600–650px), creating a ragged right gutter; `#dates` (no inner cap) fills 780px, so the three read sections are inconsistent.
**Fix:** Pick one measure — either add `.wrap--read .prose { max-width: none; }` so prose fills the 780px column, or narrow `.wrap--read` to ~680px to match the 65ch text; kicker, title, prose, and datelist must share one right edge.
_vs Reference:_ The reference applies its reading measure at exactly one level (the text block, e.g. `max-w-4xl`), never stacking a narrowed wrapper on top of an already-capped paragraph.

**25. People grids orphan a single card at 3- and 2-column breakpoints** — `medium` — _`styles.css` line 248 (`repeat(auto-fit, minmax(190px,1fr))`); counts: 7 organizers, 10 advisors_
`auto-fit` drifts to 3 columns in the common 700–1024px laptop band, leaving a lone organizer card (7) and a lone advisor card (10) orphaned directly under headings; organizers also orphan at 2 columns.
**Fix:** Replace the auto-fit rule with explicit fixed columns per breakpoint (2 → `min-width:640px` 3 → `min-width:1024px` 4) and stretch the lone last card with `grid-column: span N` for the 7- and 10-item grids; the dead `.people--tight` class on the speakers grid (no CSS) should be removed or given a 4-col rule.
_vs Reference:_ The reference pins explicit per-breakpoint column counts (`grid-cols-2 … md:grid-cols-3 lg:grid-cols-5`) chosen to tile, sidestepping odd-count last rows.

**26. Hero double-centers and ignores the fixed nav, pushing CTAs near the fold** — `medium` — _`styles.css` lines 114–115 (`.hero` min-height:94vh + flex center; `.hero__inner` padding 8rem/6rem)_
Flex centering plus 224px of asymmetric inner padding plus a 94vh box that starts under the fixed nav puts content visually low; on short laptops the eyebrow sits under the nav and the CTAs land at or below the fold.
**Fix:** Set `.hero` to `min-height: calc(100vh - var(--nav-h))` with `padding-top: var(--nav-h)`, drop `.hero__inner` to `padding-block: clamp(1.5rem,4vh,3rem)` so flex centering (not padding) positions content; consider `100svh`, and re-tune the line 335 mobile rule to match.
_vs Reference:_ The reference's hero uses only `flex flex-col justify-center` with no fixed `vh` on the section and a single modest `pt-24 pb-16` — one predictable centering mechanism.

**27. Section tint rhythm is parity-driven, not semantic, and ends weakly into the footer** — `low` — _`index.html` lines 64–230 (section order); `styles.css` line 160 (`.section--tint`)_
The white/tint alternation is hand-tagged by DOM parity, so inserting/reordering any section silently flips every downstream tint; the final `#sponsors` is plain white flush against the near-black footer, and the important CFP gets the same faint tint as the utilitarian Dates list.
**Fix:** Add the tint to `#sponsors` for a softer cascade into the footer; encode the rhythm via `main > .section:nth-of-type(even)` instead of hand-tagging; optionally give CFP a slightly stronger treatment (top hairline in coral) so tint signals hierarchy.
_vs Reference:_ The reference uses no alternating section tints — every section sits on the same canvas, separated by spacing and hairlines, avoiding the parity-fragility entirely.

### Typography

**13. h4 sub-headings collide in size with body prose** — `medium` — _`styles.css` `.format h4` (244, 1.2rem), `.cfp-item h4` (279, 1.16rem) vs `.prose` (177, 1.12rem) and `.prose--lead` (179, 1.22rem)_
The lowest heading level renders at ~1.18rem while the lead paragraph is 1.22rem — a heading the same size as or smaller than the paragraph around it — and the only separators (weight 500 vs 400, colour) are weak between two similar serif faces.
**Fix:** Re-pace the lower scale to ~1.2x between levels: raise `.format h4`/`.cfp-item h4` to ~1.3rem with `color: var(--head)` and slight negative tracking, and nudge `.topic h3` from 1.32rem to ~1.45rem so h3 sits clearly between section title and h4.
_vs Reference:_ The reference's Tailwind step scale keeps discrete, well-separated tiers (sub-heads at 1.5rem, body well below), so adjacent levels never converge.

**14. `.prose` line length runs ~78–82 characters because 65ch overestimates Lora's measure** — `medium` — _`styles.css` lines 177–179_
The `ch` unit equals Lora's wide "0" (~0.55em), far wider than average prose glyphs, so 65ch resolves to ~648px ≈ 80 cpl (and the 68ch lead is worse), exceeding the comfortable 45–75 cpl band on the densest paragraphs.
**Fix:** Tighten to `max-width: 54ch` on `.prose` (≈66 cpl) and ~52ch (or `50ch`) on `.prose--lead`, keeping `line-height: 1.78`; verify rendered Overview paragraphs land at ~65–70 characters. (Note this interacts with #24 — resolve the two-tier wrap together.)
_vs Reference:_ The reference inherits the same 65ch but applies it to a narrower-figured sans serif, so its rendered measure lands near the intended ~66 cpl — the fix is to compensate for Lora's metrics, not copy the literal number.

**15. Monospace accent stack names JetBrains Mono, which is never loaded** — `medium` — _`styles.css` line 24 (`--mono`), applied at 16 selectors; `index.html` line 14 (font `<link>`)_
The site's signature mono accent lists JetBrains Mono but the Google Fonts request imports only EB Garamond and Lora, so the named face never renders and accents fall back inconsistently across OSes; no mono selector sets `tabular-nums`, so all-numeric date/time columns don't digit-align.
**Fix:** Either drop JetBrains Mono from the stack (lean on `ui-monospace`/system mono) or actually load it via the font link; regardless, add `font-variant-numeric: tabular-nums` to `.datelist .d`, `.agenda__time`, `.tl__date`, `.hero__meta`. The system-mono path is lighter and reference-aligned.
_vs Reference:_ The reference uses the identical EB Garamond + Lora pairing and applies monospace to nothing in its UI (only the Tailwind reset), sidestepping cross-platform fallback inconsistency.

**16. Epigraph has an unbalanced opening quote with no closing quote** — `medium` — _`styles.css` line 347 (`.epigraph::before`); `index.html` lines 68–71_
A large coral decorative U+201C is rendered via CSS but the quotation text contains no quote marks, leaving a prominent opened-but-never-closed quotation; the debate-panel note (line 161) correctly uses paired curly quotes, so the epigraph is the lone outlier.
**Fix:** Preferred — wrap the visible text in real curly quotes in the HTML and let `::before` read as an oversized decorative drop-quote; alternatively add `.epigraph p::after { content: '”'; … }` to balance it.
_vs Reference:_ n/a — the reference uses no epigraph or decorative quote glyphs.

**17. Google Fonts request over-fetches unused weights/styles and isn't preloaded** — `medium` — _`index.html` line 14; usage across `styles.css`_
The link requests 10 faces but EB Garamond 0,600 and 1,500 and Lora 1,500 are never painted (~30% wasted), and the render-blocking CSS discovers the woff2 files late — exactly the EB Garamond face the hero H1 waits on. (Overlaps #56, #57.)
**Fix:** Trim the request to `EB+Garamond:ital,wght@0,400;0,500;1,400` and `Lora:ital,wght@0,400;0,500;0,600;1,400` (keep `&display=swap`), and add a `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the EB Garamond roman-500 woff2. (If #3 keeps 600 on headings, retain 0,600 here.)
_vs Reference:_ The reference self-hosts subsetted fonts and preloads the exact critical woff2 files — both optimizations missing here.

**18. "Bold soup": dense mid-sentence `<strong>` labels defeat emphasis** — `medium` — _`index.html` CFP para (188–197, 5 spans) and Overview para (81–90, 5 spans); `styles.css` line 54_
Five emphasized phrases share one paragraph in two places (17 `<strong>` total), so emphasis loses its signal and the bold-darkening turns prose into a speckled, harder-to-read field; the `<em>` italics by contrast are well-judged.
**Fix:** Restructure the pillar/topic enumerations as actual lists (or the existing `.triad`/`.cfp-grid` card pattern) so each pillar is a heading, or demote the labels to a lighter lead-in and cap at one emphasized phrase per sentence; leave the italics as-is. (Relates to #29's run-on restructure.)
_vs Reference:_ The reference uses zero `<strong>` — word-level `<i>` for emphasis and bold reserved for headings via CSS, avoiding bold-soup.

### Colour & Contrast

**19. `--coral-deep` (#d24f47) fails WCAG AA for small text on every background** — `high` — _`styles.css` line 17; consumers: `.kicker`/`.eyebrow` (164), `.track__tag` (271), `.triad__idx` (184), `.datelist .d` (223), `.agenda__time` (230), `.epigraph cite b` (350), `.hl`, `.pullquote em`_
The token is comment-labeled "legible" but measures 4.24:1 on white, 4.00:1 on tint, 3.76:1 on coral-tint — all under the 4.5:1 small-text bar, on text covering ~half the page; lighter `--coral` is far worse (2.68:1) and is used as real text in `.topic__num`.
**Fix:** Darken `--coral-deep` to `#b5362e` (5.95/5.61/5.27:1) — same coral family, passes AA everywhere; keep light `--coral` for decoration only and either switch `.topic__num` to `--coral-deep` or mark it `aria-hidden`. Update the misleading "legible" comment. (See #50 for a coordinated token pass.)
_vs Reference:_ The reference uses the identical coral but as highlight text on near-black (~7.6:1), never as small text on a light background — the WLHA light theme inverts the safe usage.

**20. Primary CTA's dark-on-coral reads as a muted tag, not a button** — `medium` — _`styles.css` line 153 (`.btn--primary`, `--coral-ink` on `--coral`); hover line 154_
Contrast passes (5.51:1) but the dark-ink-on-saturated-fill exactly mirrors the non-interactive `.card__tag--confirmed` and featured-agenda badges, weakening the CTA's "press me" read; hover darkens the fill, dropping contrast to 4.80:1 — the opposite of a lift cue.
**Fix:** Either set the text to pure black (`#000` on `#ef7c7c` = 7.84:1, stronger button read) or invert to `background: var(--coral-deep); color:#fff` for a fill no badge uses; fix the hover to brighten not darken. Do not use white on the current `#ef7c7c` (2.68:1). Reserve `--coral-ink` for the static badges.
_vs Reference:_ The reference's primary CTA is a solid white-on-dark filled button with a lifting, glowing hover that never collides with badge styling.

**21. `--soft` text colour (#9a958f) fails AA on every background** — `high` — _`styles.css` line 12; consumers: `.hero__meta` (142), `.tl__label em` (213), `.card__area` (265), `.fineprint` (289), `.epigraph cite` (349)_
`--soft` measures 2.97:1 on white, 2.80:1 on tint, 2.63:1 on coral-tint — well under 4.5:1 for these sub-16px texts, and the `.card__area` captions (each speaker's research area) are real information at 2.97:1.
**Fix:** Darken `--soft` to `#79746e` (4.63/4.37/4.10:1) or `#716c66` for tint headroom (~5.0/4.7:1), preserving the muted hierarchy below `--muted` (which already passes). Don't enlarge the captions — colour is the lever. (Coordinate with #50.)
_vs Reference:_ Dark-theme, so not directly comparable; structurally both sites have under-AA lightest tiers, and WLHA can lead by fixing its.

**22. Hard light→dark seam into the footer + one sub-AA footer colour** — `medium` — _`styles.css` line 293 (`.footer`) and line 301 (`.footer__base p`); boundary at white `#sponsors` (`index.html` line 214)_
The warm light theme jumps straight from `#fff` to a cool `#0c0b0a` footer with no gradient/hairline/transitional band, and `.footer__base p` (#6f6a64 on #0c0b0a) measures 3.67:1, below AA for ~0.74rem text.
**Fix:** Add a short gradient band (`linear-gradient(#1a1614 0%, #0c0b0a 120px)`) and a coral top hairline, warm the base black to `#14110e`, add top padding for the ramp, and raise `.footer__base p` to ~`#8f897f` (≈4.7:1). (Footer-colour overlaps #50.)
_vs Reference:_ Single dark theme throughout, so no transition exists; the lesson is to treat footer muted text as a contrast-checked token rather than a one-off `#6f6a64`.

**50. Small mono labels fail AA across `--soft`, `--coral-deep` kicker, and footer base** — `medium` — _`styles.css` `--soft` (12), `--coral-deep` (17), `.kicker`/`.eyebrow` (162–166), `.hero__meta` (141–143), `.fineprint` (289), `.epigraph cite` (349), `.tl__label em` (213), `.footer__base p` (301)_
A consolidated audit: `--soft` labels 2.80–2.97:1, coral kickers 4.0–4.24:1, footer base 3.67:1 — all sub-AA, and these are the editorial accents that define the page, so the failure is pervasive. (Consolidates #19, #21, #22.)
**Fix:** Token-level pass: `--soft` → `#767069`/`#6f6962`; `--coral-deep` → `#c0413a` (~4.9/4.6:1) or `#b5362e` per #19; `.footer__base p` → `#8a847d` (~5.4:1). These cascade to hero meta, fineprint, epigraph cite, tl label, and every kicker at once.
_vs Reference:_ The reference uses neutral greys at/above the AA line for small text (#525252 7.81:1, #737373 4.74:1), reserving very-light greys for large/decorative use.

### Content & Copy

**28. Hero has two redundant supporting lines and ends on undefined jargon** — `medium` — _`index.html` lines 49–53 (`.hero__subtitle`/`.hero__tagline`)_
Both lines lead with the days-long framing and enumerate the identical triad, and the payoff phrase "verifiable deliverables" lands as abstract jargon whose definition is buried in the Overview at line 78. (Overlaps #1, #12.)
**Fix:** Keep one subtitle and rewrite the tagline to define the payoff plainly (e.g. "…and produce a final deliverable you can check, accept, or reject"), dropping the duplicated triad and the abstract noun phrase.
_vs Reference:_ The reference uses exactly one plain-language supporting line with no jargon, no enumerated list, and no second restatement.

**29. Overview's 3-emphasis sentence is a ~95-word run-on burying the thesis** — `medium` — _`index.html` `#overview` second `.prose` paragraph, lines 80–90_
One ~95-word sentence crams all three emphases plus cost efficiency, each trailed by a 5–7 item comma list (~30 terms), with the em-dash-then-list pattern repeating three times so the actual thesis is swallowed; the subtopics also duplicate the CFP.
**Fix:** Split into a short thesis sentence plus three parallel short clauses naming each emphasis with at most 2–3 representative subtopics, closing with the cost-efficiency clause; demote the full subtopic lists to the CFP where they recur. (Pairs with #18.)
_vs Reference:_ The reference keeps its overview to two short prose paragraphs with no inline enumerations, pushing topic detail into a separate "Topics" grid.

**30. Wiener epigraph signals AI-safety, not long-horizon execution** — `medium` — _`index.html` lines 68–71; `styles.css` lines 345–350_
The quote is accurate and well-attributed but its meaning ("unforeseen strategies that baffle their programmers") is a canonical alignment/emergent-misbehavior epigraph, mismatched with the section's long-horizon-execution thesis, setting a "scary emergent behavior" expectation the Overview never pays off.
**Fix:** Swap for a duration/sustained-autonomy quote (keeping Wiener if the gravitas is wanted, e.g. a line about machines operating beyond effective human intervention), or anchor to the METR capability-doubling point already in the prose; minimum viable fix is a bridging clause connecting the quote to why long-horizon evaluation matters.
_vs Reference:_ n/a — the reference uses no decorative epigraph.

**31. Pull-quote's "only workshop" superlative is unfalsifiable** — `medium` — _`index.html` lines 93–96; `styles.css` 188–194_
The most prominent rhetorical statement is engineered-true-by-construction (a five-way conjunction so specific it asserts uniqueness of phrasing, not substance) and ages badly; even "To our knowledge" doesn't rescue an unverifiable absolute, undercutting the otherwise sober, well-cited tone.
**Fix:** Reframe to a defensible distinctiveness claim (e.g. "What sets this workshop apart: it treats … as a single coupled agenda rather than separate silos"), keeping the em-dash list and coral `<em>` styling; if comparative wording is wanted, soften to "one of the few."
_vs Reference:_ The reference makes no self-positioning superlative, establishing credibility through concrete offerings instead.

**32. "Why now" paragraph buries its argument under a six-benchmark name-drop, and overclaims "days-long"** — `medium` — _`index.html` `#overview` lines 100–107 (the em-dash benchmark list, 102–104)_
Six benchmark names are stacked with no differentiation, persuading only those who already know them; worse, lumping all six under "days-long execution" is inaccurate (Terminal-Bench and ClawBench are hard/realistic, not days-long), which a NeurIPS-reviewer audience will notice.
**Fix:** Convert the list to an argument with one concrete number — e.g. keep the two or three benchmarks that genuinely test sustained execution and attach a striking failure rate ("frontier agents still score under 25% pass@1"), removing the inaccurate blanket "days-long" label; move remaining names to a footnote or the CFP.
_vs Reference:_ The reference drops zero benchmark names in its motivation, arguing the "why" conceptually and quarantining specifics into a dedicated Topics grid.

**33. Important Dates omits a rebuttal window while exposing the internal "Reviews due" milestone** — `medium` — _`index.html` `#dates` lines 118–125 (li 121 "Reviews due", li 122 "Author notification")_
Surfacing the internal "Reviews due" date conspicuously advertises that there is no rebuttal phase, and the lone generic "Author notification" leaves oral-talk and best-paper timing undefined despite the CFP promising ~6 orals; the selective single "(AoE)" tag on line 120 also implies other deadlines might not be AoE.
**Fix:** Decide on a rebuttal — if yes, replace "Reviews due" with an author-visible "Author response / rebuttal period" row; if no, remove the PC-facing "Reviews due" item entirely. Add an oral + best-paper notification (with presenter-slides-due) milestone, and either drop the redundant single "(AoE)" or tag every deadline consistently.
_vs Reference:_ The reference shows only one deadline (AoE-tagged) and no internal milestones, so omitting a rebuttal is defensible — the WLHA problem is half-exposing the internal pipeline.

**34. Speakers roster (8) and schedule (7 keynote slots) disagree; Yi Tay has no slot** — `medium` — _`index.html` `#schedule` rows 148–158 vs `script.js` `PEOPLE.speakers` 7–16; affiliation mismatch line 9 vs 153_
The timing math is internally consistent, but only seven keynotes are scheduled while eight speakers render, leaving tentative Yi Tay with no slot (an unexplained off-by-one); Zifan Wang is described two ways. The day cannot absorb an 8th 30-min keynote, so reconcile rather than insert. (Same data issue as #11.)
**Fix:** Either drop tentative Yi Tay from `PEOPLE.speakers` for an honest "7 keynotes," or restructure (e.g. convert one keynote into two 15-min invited talks) to seat him; fix Zifan Wang's affiliation to one canonical string in both places. Acceptance: speaker-card count == distinctly-named talk slots.
_vs Reference:_ The reference publishes no minute-level agenda, so it can't create this mismatch — WLHA's valuable detail is what surfaces it; reconcile, don't remove the schedule.

**35. CFP cites "NeurIPS 2026 format" with no template link, and OpenReview targets the generic homepage** — `medium` — _`index.html` `#cfp` lines 198–209 (prose 199, button 207 `href="https://openreview.net/"`)_
The two most operationally important "how do I submit" details are unresolvable: no formatting-template link (and the 4/8-page limit is a non-standard override needing explicit guidance), and the only CTA dead-ends at the bare OpenReview login page.
**Fix:** Hyperlink "NeurIPS 2026 format" to the official template/Overleaf and add a clause that the page limits override the base style; replace the button href with the workshop's OpenReview group URL once minted, and until then keep it disabled/labeled "Submission portal opens July 18, 2026" rather than linking to the homepage.
_vs Reference:_ The reference hyperlinks its COLM template (Overleaf), links a downloadable LaTeX zip, links the exact OpenReview venue group, and states review model, dual-submission stance, and awards in the same block.

**36. Speakers section has a thematic title but no context blurb** — `medium` — _`index.html` `#speakers` lines 130–136 (after the h2 on line 133)_
Speakers is the only major section that jumps from heading straight to the grid; the heading's "three emphases" promise is never connected to the people, and the tentative status (Yi Tay) is invisible.
**Fix:** Insert one `.prose.reveal` paragraph between lines 133 and 134 framing the lineup (e.g. "Seven keynotes (plus one tentative) span the workshop's three emphases…"), reusing the existing pattern with no CSS change.
_vs Reference:_ The reference places a subordinate italic framing paragraph under its Speakers h2 before showing the grid.

**37. Sponsors stated as committed fact and COI line buried, on a site that hedges everything else** — `medium` — _`index.html` lines 214–229 (`#sponsors`, blurb 224–227, COI 228 `.fineprint`); cross-ref footer hedge line 251, eyebrow 47_
The site carefully hedges ("Proposed," "Location TBA," "tentative pending acceptance") but Sponsors asserts present-tense committed funding, implausible for a merely proposed workshop; meanwhile the reassuring COI line is rendered as the smallest, lowest-contrast `.fineprint` text on the page.
**Fix:** Reword the kicker to "Prospective Support" and the blurb to conditional/future tense, optionally adding "& sponsors" to the footer hedge; promote the COI line out of `.fineprint` into `.prose` with a lead-in like "Independence: sponsors have no involvement in peer review…". (Logo treatment is #7.)
_vs Reference:_ The reference shows logos only — no funding blurb and no COI line — so WLHA's COI instinct is an improvement; the fix is to keep it legible and frame sponsors with the site's own caution.

### People & Cards

**38. Partial grayscale(18%) fails to unify wildly varying photo quality** — `medium` — _`styles.css` lines 251–252; assets in `assets/people/` (e.g. zifan-wang.jpg 120×120, ge-zhang 112×112, jianwen-xie 190×190, yilun-du 310×310 vs 512×512)_
Sub-250px headshots upscale visibly soft beside crisp 512px portraits, and 18% desaturation is too weak to neutralize the differing colour casts/backgrounds, so the set reads as a patchwork.
**Fix:** Change `filter: grayscale(18%)` to `grayscale(100%)` at rest (hover already restores colour; optionally lengthen the transition to ~0.5s), and re-export the four low-res offenders at ≥248px so they aren't upscaled in the 124px @2x circle. (Asset re-sizing overlaps #55.)
_vs Reference:_ The reference applies full grayscale + 80% opacity at rest transitioning to colour over 700ms — full desaturation is exactly what unifies mixed-provenance photos.

**39. Speaker affiliations mix academic titles with bare org names** — `low` — _`script.js` `PEOPLE.speakers` lines 8–15 (`aff`); rendered via `.card__aff` (264)_
Four speakers carry "Assistant/Associate Professor, …" while four are bare org and all organizers/advisors are bare org, so the grid reads unevenly, implicitly demotes industry speakers, and titles go stale.
**Fix:** Strip the rank prefixes from the four academic entries (→ "Harvard University", "Columbia University", "Stanford University", "Arizona State University"), leaving industry entries as-is — a 4-string edit with no CSS change.
_vs Reference:_ The reference uses bare organization names for every speaker with no titles, fully consistent.

**40. Speaker cards lack the descriptor organizers get, while unused tag CSS sits idle** — `low` — _`script.js` `PEOPLE.speakers` (8–15) vs organizers/advisors (18–37); `personCard()` (44–59); `styles.css` `.card__tag` (254–259), `.card__area` (265)_
Speaker cards render two lines vs the committee's three, and two code smells reveal unfinished intent: `.card__tag*` CSS is never emitted, and confirmation status is smuggled into the affiliation string ("(tentative)").
**Fix:** Don't add an `area` line to speakers (keeps them reference-lean); instead finish the badge feature — add a `status` field and emit `<span class="card__tag card__tag--${p.status}">` inside `.card__media`, stripping "(tentative)" from the aff string. (Same fix as #42.)
_vs Reference:_ The reference also keeps speakers name+affiliation only (no topic line), so WLHA's lean choice matches; the divergence is the dead tag CSS the reference has no analog for.

**41. Person homepage links have a tiny click target and no touch/focus affordance** — `medium` — _`script.js` lines 44–59 (only `<a class="card__name">` is the link); `styles.css` line 262 (`.card__arrow { opacity: 0 }`), no `:focus` variant_
Only the short name is clickable; the link is signaled solely by a hover-only `↗` arrow, so on touch (no hover) linked and non-linked names are identical, and keyboard users get no arrow on focus. The whole-card photo lift is a false affordance. (`rel="noopener"`/`target="_blank"` are correctly present.) Same root issue as #6.
**Fix:** Wrap the whole card body in the anchor; reveal the arrow on `:focus-visible` too, keep it at a low base opacity (~0.55) or colour linked names coral so links are perceivable on touch, and add an explicit `:focus-visible` outline on `.card__link`.
_vs Reference:_ The reference wraps the entire card in one anchor (whole card is a large, consistently interactive target), not a hover-only arrow.

**42. Confirmed/tentative badge is styled but never rendered; status buried as "(tentative)" text** — `medium` — _`script.js` lines 6–16, 44–59; `styles.css` lines 254–259_
A complete `.card__tag`/`--confirmed`/`--tentative` component exists in CSS but `personCard()` never emits it; the only status signal is the literal "(tentative)" inside one affiliation, visually identical to the org and easy to miss. (Same as #40.)
**Fix:** Add a `status` field per speaker, render the badge inside `.card__media` (existing CSS positions it, no new CSS), and use visible "Tentative"/"Confirmed" text (not colour alone) for WCAG 1.4.1.
_vs Reference:_ The reference has no confirmed/tentative concept; WLHA deliberately introduced the distinction and should render it with the badge it already designed.

### Accessibility

**43. Person photos use redundant name-only `alt`** — `low` — _`script.js` line 46 (avatar img) and adjacent name on 48–50_
The avatar's `alt="${p.name}"` duplicates the adjacent visible name link, announcing each of ~25 people twice; the monogram branch already correctly uses `aria-hidden`, so the two paths are inconsistent, and `${p.name}` is interpolated unescaped (see #64).
**Fix:** Set `alt=""` on the photo branch so the image is decorative and the name link supplies the single accessible name, matching the monogram branch.
_vs Reference:_ The reference uses the same redundant name-only `alt`, so it is not a good model here — WLHA can exceed it by going to empty `alt`.

**44. No `:focus-visible` styles anywhere — keyboard focus is invisible** — `high` — _`styles.css` (zero focus/outline rules); affects `.nav__links a` (90–105), `.nav__toggle` (107), `.btn*` (147–156), `.card__name` (260–263), `.footer__nav a` (298–299)_
Every interactive element has rich `:hover` affordances but no focus styling and no custom outline, so keyboard/switch users can't tell which nav item, CTA, or card link holds focus — a WCAG 2.4.7 failure on the page meant to drive submissions.
**Fix:** Add a global `:focus-visible { outline: 2px solid var(--coral-deep); outline-offset: 3px; }`, then mirror hover affordances on focus (nav underline `scaleX`, card arrow reveal) and give pill buttons `outline-offset` breathing room; use `:focus-visible` (not `:focus`) to keep rings off mouse clicks.
_vs Reference:_ The reference also ships no custom focus ring but never removes outlines, leaning on browser defaults — adding an explicit brand-consistent indicator would put WLHA ahead.

**45. People-card names aren't headings, so the page has no `h3` level** — `medium` — _`script.js` lines 44–55 (`.card__name` span/anchor); `#speakers-grid`/`#organizers-grid`/`#advisors-grid`_
The outline is 1 h1 + 7 h2 + 0 h3, so screen-reader heading navigation surfaces only 8 headings and can't enumerate or jump to any of the dozens of speakers/organizers/advisors — exactly where heading nav is most useful.
**Fix:** Render the name as `<h3 class="card__name">` (wrapping the anchor when `p.home` exists), move the existing `.card__name` typography onto the h3 with `margin:0`. Yields a clean h1→h2→h3 outline; existing landmarks are already correct.
_vs Reference:_ The reference uses `<h3>` for each speaker/topic card (1 h1, 5 h2, 23 h3), giving full per-person heading navigation.

**46. Name links rely on hover + colour only; no static non-colour affordance** — `medium` — _`styles.css` lines 52, 260–263; `script.js` line 49_
The ~28 person-name links are the only body links yet carry no resting signal: global `text-decoration:none`, same ink/weight/font as non-linked names, with the colour shift and arrow appearing only on hover — failing the spirit of WCAG 1.4.1 and leaving keyboard users with no focus style. (Related to #41, #44.)
**Fix:** Give linked names a persistent non-colour cue — set the arrow's base opacity to ~0.55 (links only) or add a scoped `a.card__name { text-decoration: underline; text-underline-offset: 3px; }` — plus `a.card__name:focus-visible` outline.
_vs Reference:_ The reference makes whole cards clickable wrapper links (larger, obviously interactive) and adds explicit underlines on genuine inline document links — a non-colour cue WLHA lacks.

**47. Mobile menu lacks focus management, Esc-to-close, focus trap, and stays tabbable when closed** — `high` — _`script.js` lines 76–88; `index.html` lines 27–37; `styles.css` lines 314–321 (closed = `translateY(-130%)`)_
The closed menu is only pushed off-screen (not `display:none`/`inert`), so its six links are still focusable/announced before the visible hamburger; opening moves no focus, there's no Escape, no focus trap, and the toggle has no `aria-controls`.
**Fix:** Make the closed menu `visibility: hidden` (visible when `.is-open`) to drop it from the tab order; add `aria-controls="navLinks"`; rewrite the handler with a `setOpen()` that moves focus to the first link on open, traps Tab/Shift+Tab, and closes on Escape returning focus to the toggle — guard focus-on-open to mobile only. Follow the WAI-ARIA disclosure/menu-button pattern.
_vs Reference:_ n/a — the reference has no hamburger/collapsing menu to benchmark against.

**48. Reduced-motion block leaves hover transforms and smooth scrolling active** — `low` — _`styles.css` lines 340–343; residual motion at 154/156/252/262–263/270/99/109–111/319 and `html` scroll-behavior line 33_
The query only zeroes `animation` and the `.reveal` entrance; it never touches `transition`/`transform`, so button/avatar/track lifts, the nav underline wipe, hamburger morph, and menu slide still fire, and `scroll-behavior:auto` on `*` loses to the `html` rule so anchors still scroll smoothly.
**Fix:** Crush `transition-duration` and `animation-duration` to `.01ms !important` on `*` (plus `::before`/`::after`), add `html { scroll-behavior: auto !important; }`, and reset `.reveal` — eliminating all hover/menu motion and smooth scroll in one rule.
_vs Reference:_ The reference only stops two keyframe animations and likewise leaves hover transforms and smooth scroll active, so adopting the global crush would put WLHA ahead.

**49. Add a "Skip to content" link (and make `<main>` focusable)** — `medium` — _`index.html` (insert at line 18, before `.grain`; `<main id="top">` at line 41); `styles.css` (new `.skip-link`)_
The first Tab stop is the brand link followed by all six nav links and the toggle, so keyboard users traverse the entire header on every visit; `scroll-padding-top` is present but only affects scroll, not focus, and `<main>` has no `tabindex="-1"`.
**Fix:** Add `<a class="skip-link" href="#top">Skip to content</a>` as the first `<body>` child, add `tabindex="-1"` to `<main id="top">`, and a visually-hidden-until-focused `.skip-link` rule with `z-index:200` (above the nav).
_vs Reference:_ The reference also lacks a skip link; WLHA already matches it on anchor-offset handling and can exceed it by adding this.

### Responsive

**51. Hero title clamp floor (2.9rem) + `.hl{white-space:nowrap}` overflow on ~320px phones** — `medium` — _`styles.css` line 128 (title clamp), line 139 (`.hl`); `index.html` line 48; `styles.css` line 48 (`overflow-x:hidden`)_
The 2.9rem floor never shrinks, so "Long-Horizon" (~270–280px) grazes the ~280px content box at 320px with no default break opportunity, and the unconditional `nowrap` removes a wrapping escape hatch; both are masked (not fixed) by body `overflow-x:hidden`.
**Fix:** Lower the clamp floor (e.g. `clamp(2.3rem, …)` or a 560px-media override `clamp(2.1rem,9vw,3rem)`), add `overflow-wrap:break-word; hyphens:auto` to `.hero__title`, and make `.hl` `white-space:nowrap` conditional via `@media (min-width:560px)`. Verify at 320/360px.
_vs Reference:_ The reference scales the hero up from a small mobile-first default (`text-5xl` → `md:text-[7.5rem]`), avoiding a too-high floor.

**52. People grid collapses to a single column on 360–414px phones** — `medium` — _`styles.css` line 248 (`minmax(190px,1fr)`); container padding line 63_
At 360px the 320px content width can't fit two 190px columns + gap, so 8 speakers and 10 advisors stack single-file with ~half the screen as empty gutters — too sparse on the most common phone widths.
**Fix:** Lower the column floor to `minmax(140px,1fr)` (two ~147px columns fit at 360px) — or force `repeat(2,1fr)` in the 560px media block — and optionally tighten the mobile gap; the `.card__area` `max-width:24ch` keeps long strings in check. (Interacts with #25's breakpoint columns.)
_vs Reference:_ The reference sets explicit `grid-cols-2` on phones (→ `sm:grid-cols-3` → desktop), keeping two tiles per row at 360–414px.

**53. Agenda time+body grid is never adapted for narrow phones** — `medium` — _`styles.css` line 229 (`.agenda__row`), line 230 (`.agenda__time`); no agenda rule in any media block_
At 320px the fixed 78px time column + 1.4rem gap eat ~38% of the row, crushing the body to ~164px so the long debate-panel note (line 161) wraps to 8–9 cramped lines; the sibling `.datelist` already stacks at 520px, so the agenda is inconsistent with the site's own pattern.
**Fix:** Add an agenda override at ~560px — either narrow to `58px 1fr` with reduced gap (time still fits) or stack to a single column at ~440px like the datelist — and verify the longest note renders cleanly at 320px.
_vs Reference:_ n/a — the reference has no schedule component; the gap is that WLHA's agenda is a desktop grid with no down-scaling.

**54. Nav crowds/wraps in the 768–860px tablet band before the hamburger engages** — `medium` — _`styles.css` line 314 (`@media max-width:860px`) governing `.nav__inner`/`.nav__links` (81–105)_
The full inline nav stays until 860px, but at iPad-portrait 768px the brand + subtitle + six inline links need ~770–820px of inner width against only ~690–780px available, so the non-wrapping links squeeze and the "Call for Papers" pill can clip.
**Fix:** Raise the nav collapse to ~900px (split the nav rules out of the 860px block) so the hamburger engages above the squeeze band; or add an intermediate `@media (max-width:940px)` that tightens link gap/size and hides `.nav__sub`. Add `white-space:nowrap` to `.nav__cta` so the pill never wraps.
_vs Reference:_ The reference collapses at the standard 768px md breakpoint in one clean switch, with no intermediate squeeze width.

### Performance

**55. Avatar JPEGs (up to 512px) served full-size into a 124px slot; no srcset, width/height mismatch** — `low` — _`script.js` line 46; `styles.css` lines 250–251 (124px); `assets/people/*.jpg` (~970KB total)_
25 photos render in a 124px circle but ship at native resolution (e.g. wenhu-chen 512px/48KB), and the hard-coded `width/height="200"` matches neither the 1x (124) nor 2x (248) box, so every device downloads oversized files. (`loading="lazy"` is correctly present.) Overlaps #38's re-export.
**Fix:** Pre-resize to 124px and 248px per person, emit `srcset`/`sizes="124px"` in `personCard()`, and change the `width/height` attributes to 124 to match the CSS box — cutting the people payload ~70–85% and tightening CLS.
_vs Reference:_ The reference also uses plain full-res `<img>` with no srcset, but renders large (~350–400px) squares, so its waste is far smaller; WLHA's oversize-vs-display mismatch is materially worse.

**56. Google Fonts request loads 10 faces; ~3 unused; no critical face preloaded** — `medium` — _`index.html` line 14 vs `styles.css` weight/italic usage_
EB Garamond 0,600 and 1,500 and Lora 1,500 are never applied (~3 of 10 woff2 files wasted), and the render-blocking Google CSS chain delays the hero H1's serif face with nothing preloaded. (Duplicate of #17; also #57.)
**Fix:** Trim to the used faces (`EB+Garamond:ital,wght@0,500;1,400` and `Lora:ital,wght@0,400;0,500;0,600;1,400`) and preload the two critical above-the-fold faces, or self-host the trimmed set; verify in DevTools that only expected fonts load and the H1 no longer reflows.
_vs Reference:_ The reference self-hosts subsetted fonts and preloads exactly its two critical woff2 files with no third-party hops.

**57. Render-blocking third-party Google Fonts CSS on the critical path** — `medium` — _`index.html` line 14; `styles.css` line 60 (grain data-uri is fine)_
The css2 link forces a serial off-origin chain (connect → parse CSS → connect to gstatic → fetch woff2), gating first contentful paint behind a third party; preconnect warms but doesn't remove the round trip. (Overlaps #17/#56.)
**Fix:** Self-host the 10 used woff2 instances with local `@font-face { font-display: swap }`, drop the `fonts.*` preconnects, and preload eb-garamond-400 and lora-400. Minimum fix if self-hosting is undesired: trim the weight/italic combos not used above the fold.
_vs Reference:_ The reference self-hosts on its own origin and preloads the two critical files before any stylesheet — no third-party render-blocking CSS.

**58. Fixed full-viewport grain overlay with `mix-blend-mode: multiply` forces a full-screen blend repaint every scroll frame** — `medium` — _`styles.css` lines 57–61 (`.grain`), interacting with `.nav.is-scrolled` backdrop-filter (74–80)_
A blend mode means the compositor can't cache the grain as an independent layer, so scrolling recomputes a full-viewport multiply every frame (no `will-change`/`contain`/`isolation`/`translateZ` anywhere), compounded by the scrolling nav's `backdrop-filter` — visible jank for a near-invisible (opacity .035) effect.
**Fix:** Drop `mix-blend-mode`, render the grain as a plain low-opacity overlay (~.05–.06) with `will-change: transform` (own layer), or move it onto the scrolling content so it paints once. Secondary: downscale the ~960KB people photos to ~256px (overlaps #55).
_vs Reference:_ The reference uses plain low-opacity overlays (`opacity-[0.03]`) and no `mix-blend-mode` anywhere, deliberately avoiding the blend-on-scroll cost.

### SEO & Metadata

**59. Social-share meta is incomplete: no og:image, og:url, twitter:card, canonical, or theme-color** — `medium` — _`index.html` `<head>` lines 4–15 (og tags 8–10)_
Only og:title/description/type exist, so every share renders a bare text unfurl (no image), shares aren't normalized to one canonical URL, X falls back to a small card, and there's no mobile chrome tint; no share image asset exists in `/assets`.
**Fix:** Create a 1200×630 `assets/og-cover.png` and add og:image (+width/height), og:url, og:site_name, twitter:card `summary_large_image`, twitter:title/description/image, `<link rel="canonical">`, and theme-color — using absolute https URLs; validate via the X Card Validator and Facebook Sharing Debugger. (Canonical/og:url also relevant to #62.)
_vs Reference:_ The reference is also missing all five, so WLHA can leapfrog it.

**60. No JSON-LD structured data — add Event + Organization + Person graph** — `medium` — _`index.html` head (after line 15); speaker data from `script.js` 7–16; dates 119–124_
The page ships zero structured data despite containing a fully-specified academic event, a named host, eight speakers with URLs, and a deadline — none exposed as entities, so Google can't generate Event/Organization/Person rich results, a key lever for a new low-authority workshop; speakers are also JS-injected, so static JSON-LD survives JS failure.
**Fix:** Add one `<script type="application/ld+json">` `@graph` with an Event (name, description, eventAttendanceMode/Status, location Place, url, image, organizer, performer array), an Organization node, and eight Person nodes built from `PEOPLE.speakers`; validate with the Rich Results Test. Hardcode for maximum crawler safety or generate from `PEOPLE` to avoid drift.
_vs Reference:_ The reference also ships no structured data, so this is a strict-better opportunity.

**61. Title leads with low-value acronym "WLHA" instead of the descriptive name** — `medium` — _`index.html` line 6 (`<title>`); H1 line 48_
The highest-weight title prefix is spent on "WLHA" (zero search demand, no keyword value), demoting "Workshop on Long-Horizon Agents" to mid-title and creating a title↔H1 mismatch (the H1 has no "WLHA —" prefix); the acronym is already in og:title parenthetically.
**Fix:** Rewrite to `Workshop on Long-Horizon Agents (WLHA) · NeurIPS 2026` so keywords lead, the acronym stays for branded queries, and the prefix matches the H1 (and og:title).
_vs Reference:_ The reference's title and H1 both lead with "Workshop on Agent Behavior," reserving the acronym for the collapsed mobile nav.

**62. No robots.txt or sitemap.xml** — `medium` — _Repo root `/home/nick/work/WLHA/` (both missing; canonical also absent from head)_
Both return 404 live and don't exist in the repo, so crawlers have no machine-readable lastmod/canonical signal and no robots policy/sitemap pointer — the lowest-effort, highest-leverage indexing item, more impactful than an apple-touch-icon (the SVG favicon already covers modern browsers).
**Fix:** Add `robots.txt` (allow all + `Sitemap:` line) and a `sitemap.xml` listing the apex URL with lastmod/changefreq/priority (served as-is; `.nojekyll` is present), and add a `<link rel="canonical">` + og:url so the sitemap loc and page self-reference agree.
_vs Reference:_ The reference also 404s on robots.txt/sitemap/icons, so adding these puts WLHA ahead of the benchmark.

### Code Quality

**63. Dead CSS for removed sections (~39 unused rule lines)** — `low` — _`styles.css` 181–186 (`.triad*`), 196–197 (`.whynow`), 199–204 (`.topics`/`.topic*`), 206–217 (`.timeline`/`.tl*`), 242–245 (`.formats`/`.format`), 268–275 (`.tracks`/`.track*`), 277–280 (`.cfp-grid`/`.cfp-item`), plus dead refs at 326–331_
Eleven selector families are referenced nowhere in `index.html` or `script.js` (verified by grep) — leftovers from a prior layout — shipping ~2KB of dead weight and maintenance confusion (no user-visible defect). Live classes `.epigraph`/`.pullquote`/`.datelist`/`.agenda`/`.sponsor`/`.card*` must NOT be removed.
**Fix:** Delete the listed dead blocks and the dead selectors in the line 326 media query, keep `.cfp-cta`/`.datelist`/`.agenda`, bump the `styles.css?v=` cache-buster, and re-grep to confirm none of the removed selectors remain before deleting. (Note: removing `.triad`/`.cfp-grid` interacts with #18's suggestion to use those card patterns — if #18 is adopted, keep/restore the relevant rules instead.)
_vs Reference:_ n/a — the reference ships minified CSS, so per-section dead-rule hygiene isn't comparable; WLHA's unminified stylesheet makes these visible and worth pruning.

**64. Un-escaped values in `innerHTML` person cards mangle real data (Texas A&M) and break on `<`, `>`, `"`, or `'`** — `medium` — _`script.js` `personCard()` lines 44–59 (esp. 46, 49, 51, 52); data 23–24; rendered via `el.innerHTML` line 63_
Raw template interpolation into `innerHTML` with no escaping is already wrong on live data: `aff: 'Texas A&M · Stanford (visiting)'` renders `&M` as a broken entity, and any value with a double quote (or in `href="${p.home}"`) terminates the attribute early — a stored-markup/injection surface one editor's quote away.
**Fix:** Add a one-line `esc()` helper and wrap every interpolated value (`name`, `aff`, `area`, `home`, `initials`) so "Texas A&M" renders literally and name/aff/area/URL are hardened against `&<>"'`; verify the Zhuofeng Li card reads "Texas A&M · Stanford (visiting)" intact. (Empty-alt fix #43 removes the alt-attribute surface specifically.)
_vs Reference:_ The reference renders all people as pre-escaped static build-time HTML with no client-side `innerHTML` templating, immune to this class of bug.
