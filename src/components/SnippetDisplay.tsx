type SnippetDisplayProps = {
  target: string
  input: string
}

export function SnippetDisplay({ target, input }: SnippetDisplayProps) {
  return (
    <pre className="snippet" aria-label={`Target code: ${target}`} tabIndex={0}>
      <code aria-hidden="true">
        {Array.from(target).map((character, index) => {
          const status = index >= input.length
            ? 'untyped'
            : input[index] === character ? 'correct' : 'incorrect'

          return (
            <span
              key={index}
              className={`character ${status} ${index === input.length ? 'current' : ''}`}
            >
              {character}
            </span>
          )
        })}
      </code>
    </pre>
  )
}
