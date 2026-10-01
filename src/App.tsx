import { useRef, useState } from 'react'
import { SnippetDisplay } from './components/SnippetDisplay'
import { starterSnippet } from './snippets'

export default function App() {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const target = starterSnippet.text
  const matches = input === target
  const correctCount = Array.from(input).filter((character, index) => character === target[index]).length
  const incorrectCount = input.length - correctCount

  function reset() {
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <main className="app">
      <header className="page-header">
        <a className="wordmark" href="./" aria-label="CodeType home">{'</>'} CodeType</a>
        <span className="badge">First milestone</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">Typing practice for programmers</p>
        <h1 id="page-title">Build fluency.<br />One snippet at a time.</h1>
        <p>Practice the punctuation, symbols, and patterns you use in code.</p>
      </section>

      <section className="practice-panel" aria-labelledby="practice-title">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{starterSnippet.language} · {target.length} characters</p>
            <h2 id="practice-title">{starterSnippet.title}</h2>
          </div>
          <button type="button" onClick={reset}>Reset</button>
        </div>

        <SnippetDisplay target={target} input={input} />
        <p className="legend">Correct characters are underlined. Mistakes have a wavy underline and shaded background.</p>

        <label htmlFor="typing-input">Type the code above</label>
        <input
          ref={inputRef}
          id="typing-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-describedby="input-help input-feedback"
          placeholder="Start typing here…"
        />
        <p id="input-help" className="muted">Copy each character, including spaces and punctuation. This starter is untimed.</p>
        <p id="input-feedback" role="status">
          {matches
            ? 'Exact match! Reset to try again.'
            : `${correctCount} of ${target.length} characters correct · ${incorrectCount} current mistakes`}
        </p>
      </section>

      <section className="next-panel" aria-labelledby="next-title">
        <h2 id="next-title">Your practice results</h2>
        <p>Speed, accuracy, and elapsed time will appear here when we add scoring.</p>
        <p className="muted">Next build step: start, finish, and retry a typing session with consistent editing rules.</p>
      </section>
      <footer>Short exercises. Code is displayed as text and never executed.</footer>
    </main>
  )
}
