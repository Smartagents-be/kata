/**
 * A board's hint line and its Hint dialog are plain strings from a locale bundle, so they cannot
 * carry `<code>` the way unit prose does. This gives them the one piece of markup they need: a run
 * between backticks renders in the mono face on the same chip `.prose` gives inline code, so a
 * command like `mvn verify -Pintro` stands out from the sentence it sits in. Nothing else is
 * parsed. An unbalanced backtick renders the string as it is rather than guessing where code ends.
 */
export function InlineCode({ id, text }: { id: string; text: string }) {
  const parts = text.split('`')
  if (parts.length % 2 === 0) {
    return <>{text}</>
  }

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            id={`${id}-code-${(index - 1) / 2}`}
            data-component="InlineCode"
            className="bg-secondary text-foreground rounded-sm px-1.5 py-0.5 font-mono text-[0.9em] [overflow-wrap:anywhere]"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  )
}
