---
target: homepage hero
total_score: 32
p0_count: 0
p1_count: 3
timestamp: 2026-06-03T02-20-52Z
slug: components-herosection-tsx
---
### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3/4 | Static content, loads fast; no async gaps |
| 2 | Match System / Real World | 3/4 | Natural language throughout; "revolutionized" is one slip |
| 3 | User Control and Freedom | 4/4 | Pure information display, no traps |
| 4 | Consistency and Standards | 3/4 | Consistent with system; ghost button hover barely perceptible |
| 5 | Error Prevention | 4/4 | N/A |
| 6 | Recognition Rather Than Recall | 2/4 | Event date at white/30 (~2.9:1) is urgency anchor and least readable element |
| 7 | Flexibility and Efficiency | 3/4 | Two clear paths; appropriate for a hero |
| 8 | Aesthetic and Minimalist Design | 3/4 | "9th Edition" at 2xl–3xl gets more space than its informational weight warrants |
| 9 | Error Recovery | 4/4 | N/A |
| 10 | Help and Documentation | 3/4 | Key facts surfaced upfront |
| **Total** | | **32/40** | **Good** |

### Anti-Patterns Verdict
Not AI slop. Deliberate dark/cinematic aesthetic avoids the cream/teal marathon site reflex. Detector: 0 findings.

### Priority Issues
- [P1] Date "25 October 2026" at white/30 — 2.9:1 contrast, fails WCAG AA for large text, buries urgency anchor
- [P1] Missing focus-visible on both CTA buttons
- [P1] Primary button white-on-orange-500 — 2.66:1, fails WCAG AA for 16px bold text
- [P2] "revolutionized" copy ban violation in description
- [P2] "9th Edition" at 2xl–3xl occupies heading-scale space for secondary metadata

### Persona Red Flags
- Jordan: date near-invisible on first scan; misses urgency anchor
- Casey: date invisible in daylight on mobile; focus-visible broken
- Priya (local runner): confirms date before registering — date contrast failure is friction at conversion moment

### Minor Observations
- Decorative 1px top gradient line — harmless decoration
- Scroll indicator SVG missing aria-hidden
- Ghost button hover:bg-white/5 imperceptible on most displays
