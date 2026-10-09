/**
 * A message from a locale file with its `<code>` spans set as inline code, the chip prose gives
 * them. Panel descriptions and task-card lines are not prose, so a plain `t()` would print the tags.
 * The value comes from our own locale files, so only that one tag is read and everything else stays
 * text: no other markup is interpreted, and nothing is set as HTML.
 */
export function WithCode({ id, text }: { id: string; text: string }) {
  return (
    <>
      {text.split(/<code>(.*?)<\/code>/).map((part, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            id={`${id}-code-${index}`}
            data-component="WithCode"
            className="bg-secondary text-foreground rounded-sm px-1.5 py-0.5 font-mono text-[0.9em]"
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
