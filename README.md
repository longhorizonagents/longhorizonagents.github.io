# WLHA — Workshop on Long-Horizon Agents

Homepage for the proposed **NeurIPS 2026 Workshop on Long-Horizon Agents: Context Management, Evolution, and Safe AI**.

A static, single-page site — no build step. Light editorial theme (EB Garamond + Lora, crisp white with a coral accent), inspired by the layout of [aiagentbehavior.com](https://www.aiagentbehavior.com/).

## Structure

| File | Purpose |
|------|---------|
| `index.html` | All page content & sections |
| `styles.css` | Editorial light theme |
| `script.js`  | People grids (data-driven), nav, scroll reveals |
| `assets/people/*.jpg` | Speaker / organizer / advisor headshots (512px squares) |
| `assets/favicon.svg` | Site icon |

To update a person's photo, link, affiliation, or bio, edit the `PEOPLE` array in `script.js`
(and drop a square image at `assets/people/<slug>.jpg`).

## Run locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy (GitHub Pages)

Pushed to `main`; Pages serves from the repository root. `.nojekyll` disables Jekyll
so files are served verbatim.

---
*Proposed workshop — program, dates, and speakers are tentative pending NeurIPS 2026 acceptance.*
