# CodeType — Typing Practice for Programmers

Working title; name availability has not been checked.

## Project brief

Build a small browser app that helps people practice typing code accurately. Users choose a short snippet, type it, see mistakes immediately, and review speed and accuracy afterward. This is a typing exercise, not a code editor or coding challenge: snippets are displayed as text and never executed.

The goal is a finished, explainable portfolio project for an early-career software developer. Start with a frontend-only app. A daily code challenge is an optional follow-up that connects to the earlier daily-game idea.

## First release

- Ten original, single-line Python and JavaScript snippets, roughly 40–120 characters each.
- Language filter and a button to choose another snippet.
- A labeled text input below a monospace target display.
- Distinct styles for correct, incorrect, and untyped characters, plus a position indicator. Do not rely on color alone.
- Timer starting on the first text insertion, including an incorrect insertion.
- Live elapsed time, completion progress, and speed.
- Completion only when the input exactly matches the target.
- Results showing WPM, accuracy, duration, and mistakes.
- Retry and next-snippet controls.
- Last 20 completed attempts saved in this browser, plus a clear-history button.

Keep accounts, multiplayer, public leaderboards, AI-generated snippets, and a backend outside the first release. Start with single-line snippets so indentation and Tab handling do not dominate the project.

## Proposed stack

React + TypeScript + Vite, plain CSS, localStorage, and Vitest for scoring/state logic. If TypeScript is new, JavaScript is a reasonable first-pass substitute. Use React state rather than a global state library.

Use static hosting when ready. Vite's deployment guide covers options including GitHub Pages. This plan does not create a repository or deploy an app.

## Typing rules and scoring

Choose a deliberately simple input model: append at the end and use Backspace to correct. Explain that rule in the UI. Keep Tab available for keyboard navigation; do not create a keyboard trap. Restrict the first snippet set to ordinary ASCII text.

- Compare each inserted character against the target character at that position. A wrong character advances the position but stays visibly wrong until deleted.
- Allow Backspace and deletion of a selected suffix. Disallow middle-of-text editing for this version; test this behavior explicitly.
- Reject paste and drag/drop in scored runs with an understandable message. This is a practice rule, not secure anti-cheat.
- Freeze results after exact completion. A retry clears all counters and timestamps.
- Let elapsed time continue when focus is lost; tell the player. Do not add pause yet.
- Handle composition input without scoring intermediate composition updates; validate the committed change once.

Define metrics in the interface so the numbers are unambiguous:

- Completed WPM = (target character count / 5) / elapsed minutes. Spaces and punctuation count.
- Live WPM = (currently correct character positions / 5) / elapsed minutes.
- Accuracy = correct insertion attempts / all insertion attempts × 100.
- Backspace is not an insertion attempt. Deleting an error does not erase it from the accuracy counters; typing a correction adds a new attempt.
- Before the first insertion, show a dash for speed and accuracy; guard against zero elapsed time.

Examples: 100 target characters completed in 30 seconds gives 40 WPM. Nine correct insertion attempts out of ten gives 90% accuracy even if the mistake was subsequently deleted.

Calculate elapsed time from performance.now() timestamps; an interval may refresh the display but should not be the clock itself. Use Date.now() separately for the calendar timestamp stored with a result.

## Suggested structure

| Piece | Responsibility |
| --- | --- |
| App | Selected language/snippet and page layout |
| TypingSession | Ready/running/finished state, input, timing |
| SnippetDisplay | Character feedback and progress indicator |
| ResultsPanel | Final metrics and retry/next controls |
| HistoryPanel | Last 20 attempts and clearing history |
| snippets.ts | Original practice content |
| scoring.ts | Pure metric and character-comparison functions |
| storage.ts | Validated reads/writes with safe fallbacks |

Snippet fields: id, language, title, text. Attempt fields: id, snippetId, completedAt, durationMs, targetLength, insertionAttempts, correctInsertionAttempts, wpm, accuracy. Include a storage schema version. Save once on completion, not on every keypress; handle unavailable storage or invalid JSON without breaking practice.

## Build milestones

Estimated effort: roughly 12–20 focused hours if React is familiar, with additional time for learning. These are planning estimates, not a deadline.

1. **Static screen — 1–2 hours.** Create the Vite app, one snippet, a labeled input, and placeholder result panel. Done when the layout is readable and keyboard navigation works.
2. **Typing loop — 3–4 hours.** Compare input, highlight characters, implement corrections, start/finish/retry, and freeze completion. Done when a complete attempt works without scoring or persistence.
3. **Metrics — 2–3 hours.** Add timestamps, insertion counters, WPM, accuracy, and result display. Done when the worked examples above produce the expected results.
4. **Content and history — 2–3 hours.** Add ten snippets, filtering, next snippet, and local history. Done when history survives refresh and broken storage does not crash the app.
5. **Polish and release — 4–8 hours.** Test input edge cases, focus, readability, and scoring. Publish a demo and write a README describing the rules, architecture, tradeoffs, setup, and known limitations.

First work session: finish milestone 1 and make a single character change style when the user types. Avoid spending the first session on themes or elaborate animations.

## Meaningful verification

- 100 characters in 30 seconds yields 40 WPM; zero elapsed time never yields Infinity or NaN.
- A corrected mistake remains in the historical accuracy count.
- Incorrect text of the correct length does not finish a run.
- The final character completes a run once and saves one result.
- Retry resets the timer, counters, and text; previous results stay intact.
- Selecting another snippet mid-run discards that unfinished attempt.
- Paste, selection edits, held keys, composition, and lost focus follow the documented rules.
- Reload restores only completed history; bad or blocked storage falls back gracefully.
- Controls are usable with a keyboard, focus is visible, and error feedback is not color-only.

## Optional second release: daily challenge

Add one shared snippet per UTC date, selected from an explicit date-to-snippet mapping. Keep the daily snippet fixed once published. Display the reset timezone, and capture the challenge date at run start so midnight does not change an active run.

Allow unlimited practice, recording the first completed daily attempt separately from later attempts. Share a plain-text result with date, WPM, and accuracy. Keep streaks and history local initially. A local-only app cannot enforce one attempt across devices or make a trustworthy public leaderboard.

After that, consider multiline snippets, custom practice text, symbol-focused drills, or a personal progress chart. Add one feature at a time.

## Learning resources, in build order

These are free official tutorials and reference pages. Work through the relevant section when you reach its milestone rather than completing every resource first.

| Resource | Type | How to use it |
| --- | --- | --- |
| [React Quick Start](https://react.dev/learn) | Guided introduction | Refresh components, lists, events, and state before milestone 1. |
| [React Tic-Tac-Toe tutorial](https://react.dev/learn/tutorial-tic-tac-toe) | Hands-on tutorial | Practice game state and interactive rendering; apply the concepts rather than copying the game. |
| [Vite Getting Started](https://vite.dev/guide/) | Setup guide | Create a React/TypeScript project and check the documented Node requirements. |
| [React: Adding Interactivity](https://react.dev/learn/adding-interactivity) | Guided lessons | Learn the state and event patterns needed for typing and restarting. |
| [MDN: input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event) | API reference with example | Understand text changes. Read the input value rather than treating every keydown as a typed character. |
| [MDN: performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) | API reference | Implement elapsed-time measurements for scoring. |
| [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | API reference with example | Save and reload a small history of completed attempts. |
| [Vitest Getting Started](https://vitest.dev/guide/) | Setup and testing guide | Test scoring and state transitions before release. |
| [Vite: Deploying a Static Site](https://vite.dev/guide/static-deploy.html) | Deployment guide | Publish the finished frontend; follow the section for your chosen host. |

Most useful initial path: React Quick Start if needed → Vite setup → milestone 1 → React interactivity + MDN input events → milestone 2. Use timing, storage, and testing references as those features arise.

## Context for a new ChatGPT project

Suggested project name: CodeType — Typing Practice App.

This project is a small code-typing practice application for a recent computer science graduate building a software engineering/IT portfolio. The agreed direction is a manageable frontend project, with daily challenges optional later. The starter uses React, TypeScript, Vite, and plain CSS; localStorage is planned for history. Help build it incrementally, explain design choices, and keep each milestone small. Do not expand into accounts, a backend, or multiplayer without discussing the tradeoff. A first-milestone starter now exists with one snippet, a labeled input, character feedback, reset, and a results placeholder. It is untimed and allows normal editing; session rules, scoring, multiple snippets, and persistence are still to come. See `BUILD_ROADMAP.md` for implementation progress and the root `README.md` for setup and a first hands-on exercise.
