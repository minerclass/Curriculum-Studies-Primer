# Agent Log

Append-only record of automated and agent-assisted changes to this repository.

Purpose: this work happens from more than one machine, so local notes are not a
reliable history. Anything an agent should know about a past change belongs
here, in the repository, not in a local file.

## Conventions

- Newest entry first. Never rewrite or delete an existing entry; correct it with
  a new one that says what it supersedes.
- Record what was verified and how, not just what was edited. "Fixed" without a
  check is not a result.
- Record open items and known-failing things explicitly, so the next agent does
  not rediscover them or assume they are already handled.
- No participant data, transcripts, consent records, committee or faculty names,
  credentials, or tokens.

---

## 2026-08-31 - Restore keyboard focus indication and honour prefers-reduced-motion

Found during an accessibility sweep across the dissertation ecosystem.

**Problem 1: invisible keyboard focus.** `.c-node` and `.interactive-table tbody tr` both set `outline: none` on `:focus` and leaned on their hover styling to signal focus. Shared hover styling is not a reliable focus indicator, and there was no `:focus-visible` rule anywhere in the stylesheet.

**Problem 2: motion.** The page animates (5 animation or keyframes declarations) and
did not honour `prefers-reduced-motion`.

**Changed.** `styles.css` only.

- Added `:focus-visible` rules restoring a visible ring, using the page's own accent
  colour so it reads as part of the design. A global rule covers every focusable element; an explicit rule covers the two components that had removed the outline.
- Appended a `@media (prefers-reduced-motion: reduce)` block collapsing animation and
  transition durations.

**Deliberately not removed.** The existing `outline: none` declarations were left in
place. They also serve the hover state, and removing them would change mouse appearance.
The new rules come later in the stylesheet and match their specificity, so keyboard focus
wins without altering anything a mouse user sees.

**Verified.** Driven in a real browser. A genuine Tab keypress moves focus to a `.c-node`, the element matches `:focus-visible`, and the computed outline resolves to `rgb(20, 184, 166)`, the teal `--accent-3`, at the intended 2px with a 3px offset. Note that a computed-style read taken immediately after focus changes can return a stale value; force a reflow before measuring. With reduced motion active, all animation and transition durations collapse to `1e-05s` and no animations run. CSS braces balance.
