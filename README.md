# CodeType

A small browser app for practicing code typing. Built incrementally with React, TypeScript, Vite, and plain CSS.

## Run locally

From PowerShell:

```powershell
cd D:\REPOS\codeType
npm install
npm run dev
```

Open the local URL printed by Vite. Keep the terminal running; Ctrl+C stops the server.

```powershell
npm run typecheck # Check TypeScript
npm run build     # Check types and create dist/
npm run preview   # Serve the production build locally
```

Use a recent Node.js LTS release supported by [Vite](https://vite.dev/guide/). Initial setup used Node 24.

## Current milestone

The starter has one JavaScript snippet, a labeled controlled input, per-character feedback, a position indicator, a current-mistake count, an exact-match message, and reset with focus restored to the input. The target scrolls horizontally on small screens and can receive keyboard focus.

This is an untimed UI prototype. Editing and paste are currently unrestricted. Completion does not yet freeze input. There is no historical accuracy, timer, persistence, or snippet selector yet. Current mistakes count the text on screen, not cumulative insertion mistakes.

## Read the code in this order

1. `src/snippets.ts`: the data shape and first exercise.
2. `src/App.tsx`: input state, derived feedback, reset, and page layout.
3. `src/components/SnippetDisplay.tsx`: how target characters receive feedback classes.
4. `src/styles.css`: layout, responsive sizing, and visual feedback.
5. `src/main.tsx`: where React mounts the app into `index.html`.

An input event updates React state. React renders again, comparing each character with the target. The display uses those comparisons to choose a CSS class. No code from the exercise is executed.

## First hands-on exercise

Run the app, type the first few characters, make a mistake, then erase it. Notice that the feedback follows the current input. Change the snippet title and text in `src/snippets.ts`, save, and watch the page update. Try Reset and use Tab to move between controls.

Next, implement the session lifecycle described in [the build roadmap](documentation/BUILD_ROADMAP.md). The [original project plan](documentation/CodeType_Project_Plan.md) remains the detailed specification.

## Planned release

Ten original Python/JavaScript exercises, consistent correction rules, live metrics, frozen completion results, and the last 20 completed attempts saved locally. No backend is required. Tests for state, scoring, and storage will be added with those milestones using Vitest.
