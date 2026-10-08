import { CheckIcon, CopyIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * One command or prompt a student types, in mono, with a button that puts it on the clipboard.
 *
 * It exists for `TaskCard`'s moves: a move label is plain text, so a command written into it could
 * neither be set as code nor copied, and a student retyping `node exercises/step1/check-entry.mjs`
 * by hand is a typo waiting to happen. The text is the literal thing to type and is never
 * translated, so it reads the same in both languages.
 *
 * The button says "Copied" for a moment and then goes back. A clipboard the browser refuses (an
 * insecure origin, a denied permission) leaves the button as it was rather than throwing: the text
 * is still on screen to select by hand.
 */
export function CopyCommand({ id, text }: { id: string; text: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Nothing to do: the command is still on screen to select by hand.
    }
  }

  return (
    <div
      id={id}
      data-component="CopyCommand"
      className="border-border bg-muted/50 flex items-center gap-2 rounded-md border py-1 pr-1 pl-3"
    >
      <code
        id={`${id}-text`}
        data-component="CopyCommand"
        className="text-foreground min-w-0 flex-1 font-mono text-xs break-all"
      >
        {text}
      </code>
      <button
        type="button"
        id={`${id}-button`}
        data-component="CopyCommand"
        data-state={copied ? 'copied' : 'idle'}
        onClick={() => void copy()}
        aria-label={copied ? t('copy.done') : t('copy.label')}
        title={copied ? t('copy.done') : t('copy.label')}
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 inline-flex size-7 shrink-0 items-center justify-center rounded-md outline-none focus-visible:ring-3"
      >
        {copied ? (
          <CheckIcon aria-hidden className="text-primary size-4" />
        ) : (
          <CopyIcon aria-hidden className="size-4" />
        )}
      </button>
    </div>
  )
}
