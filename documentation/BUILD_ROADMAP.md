# CodeType build roadmap

The original `CodeType_Project_Plan.md` defines the intended behavior. This companion turns it into implementation steps. Build and understand one milestone before taking on the next.

## Product and scope

Audience: programmers who want practice with code punctuation, symbols, and common patterns.

Main flow: choose a language and snippet → type with immediate feedback → correct errors → finish with an exact match → review results → retry or choose another snippet. Completed history is available on the same page.

First release: a frontend-only single-page app with ten original, single-line ASCII snippets across JavaScript and Python. React manages the interface, TypeScript describes data, Vite runs/builds the app, CSS provides styling, localStorage saves history, and Vitest verifies logic.

Keep accounts, multiplayer, a backend, and public leaderboards outside this release. The daily challenge is a possible second release.

## 1. Screen and feedback — starter supplied

- [x] Create the React + TypeScript + Vite foundation.
- [x] Add one snippet and a labeled input.
- [x] Compare characters and distinguish correct, incorrect, and untyped text.
- [x] Add a current-position indicator, reset button, and results placeholder.
- [x] Check keyboard access to the target/input, horizontal snippet scrolling, and a narrow viewport.

Learn: components, props, state, event handlers, and rendering arrays.

Try: type an error, correct it, match the snippet, and reset. Change the snippet in `src/snippets.ts`. The prototype currently allows normal editing; strict typing rules belong to milestone 2.

## 2. A complete typing session — next

- [ ] Extract `TypingSession` from `App` as session behavior grows.
- [ ] Model `ready`, `running`, and `finished` states.
- [ ] Allow end-of-text insertion, Backspace, and selected-suffix deletion; reject middle editing with helpful feedback.
- [ ] Reject paste and drag/drop with a visible, accessible message.
- [ ] Commit composition input once; ignore intermediate composition updates.
- [ ] Finish only when input equals the entire target; freeze the finished session.
- [ ] Retry clears session state and restores focus. Tab keeps its normal navigation behavior.
- [ ] Add Vitest and test the editing rules and state transitions as pure functions.

Done when: an attempt can start, receive errors, be corrected, finish once, and restart. Same-length incorrect input cannot finish.

Learn: state transitions, input events, immutable updates, and separating logic from rendering. Read actual input changes rather than counting keydown events.

## 3. Timing and scoring

- [ ] Start `performance.now()` timing on the first accepted insertion, including a wrong character.
- [ ] Store start/end timestamps; use an interval only to refresh the display.
- [ ] Count every inserted character once as an attempt; track correct insertions separately.
- [ ] Derive live WPM from currently correct positions. Derive final WPM from target length.
- [ ] Show duration, progress, WPM, accuracy, and cumulative mistakes in `ResultsPanel`.
- [ ] Show a dash before starting and handle zero elapsed time safely.
- [ ] Explain formulas and that the clock continues while focus is elsewhere.
- [ ] Verify corrected mistakes remain in cumulative counts and finished metrics stay frozen.

Formulas:

- WPM = `(character count / 5) / (durationMs / 60000)`.
- Accuracy = `correctInsertionAttempts / insertionAttempts * 100`.
- Mistakes = `insertionAttempts - correctInsertionAttempts`.

Done when: 100 characters in 30 seconds yields 40 WPM; nine correct insertions out of ten yields 90% accuracy even after deleting the mistake. Backspace does not count as an insertion or erase historical mistakes.

Learn: pure calculation functions, monotonic clocks, effects and cleanup, and testing behavior independently of the UI.

## 4. Content and local history

- [ ] Add five original JavaScript and five original Python snippets, roughly 40–120 characters each.
- [ ] Add language filtering and a next-snippet control that avoids repeating the current snippet when alternatives exist.
- [ ] Switching snippets discards an unfinished run and resets session state.
- [ ] Define an `Attempt` type and a versioned storage envelope.
- [ ] Save each completion exactly once; retain the latest 20 results.
- [ ] Restore validated history on load; handle malformed JSON, invalid fields, and unavailable storage without crashing practice.
- [ ] Add history and clear-history controls. Failed persistence should have understandable feedback.
- [ ] Verify reload, retry, repeated completion events, and storage failures.

Attempt fields: `id`, `snippetId`, `completedAt`, `durationMs`, `targetLength`, `insertionAttempts`, `correctInsertionAttempts`, `wpm`, `accuracy`. Use `Date.now()` for calendar timestamps and `performance.now()` for elapsed durations.

Done when: completed history survives refresh; unfinished input does not. Storage failures leave practice usable.

Learn: array filtering, JSON validation, persistence boundaries, and graceful failure handling.

## 5. Polish and release

- [ ] Check narrow and wide screens, zoom, long snippets, and visible focus.
- [ ] Check keyboard-only use and screen-reader labels/status announcements.
- [ ] Exercise held keys, suffix selection, rejected middle edits, composition, paste/drop, and lost focus in a real browser.
- [ ] Run logic tests and a production build; check the production preview.
- [ ] Finish README with rules, architecture, tradeoffs, screenshots, setup, and known limitations.
- [ ] Initialize Git if it is still absent, commit meaningful milestones, and choose a repository/demo host with the user.
- [ ] Configure the selected static host, publish, and verify the public URL.

Done when: someone can open the demo, understand the exercise, finish a run, and inspect an explainable repository.

## Intended file responsibilities

| File/component | Owns |
| --- | --- |
| `App` | Language/snippet selection and page layout |
| `TypingSession` | Input, lifecycle, timing, insertion counts |
| `SnippetDisplay` | Target character feedback |
| `ResultsPanel` | Frozen results and retry/next controls |
| `HistoryPanel` | Completed attempts and clearing history |
| `snippets.ts` | Practice content and snippet types |
| `session.ts` | Pure editing and state-transition logic, if useful |
| `scoring.ts` | Pure metric calculations |
| `storage.ts` | Versioned, validated persistence with safe fallbacks |

Create the remaining files when the relevant milestone needs them. React state is sufficient; a global state library is unnecessary for this scope.

## Effort and later ideas

The original estimate is 12–20 focused hours with React familiarity; allow more time to learn. Treat each milestone as a small working increment rather than a deadline.

After release, consider one feature at a time: a daily challenge with a fixed UTC date-to-snippet mapping, multiline input, custom snippets, symbol drills, or progress charts. A daily challenge should retain its run-start date across midnight and distinguish the first completed attempt from later practice.

## References

- [React Quick Start](https://react.dev/learn): start with components, state, and events.
- [Vite guide](https://vite.dev/guide/): installation, development, and build commands.
- The original project plan links the timing, input, storage, testing, and deployment references in build order.
