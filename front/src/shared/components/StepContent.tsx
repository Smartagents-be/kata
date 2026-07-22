import { useMemo } from 'react'
import { renderForMode } from '@/shared/lib/content'
import { useMode } from '@/shared/mode/useMode'

export function StepContent({ html }: { html: string }) {
  const { mode } = useMode()
  const rendered = useMemo(() => renderForMode(html, mode), [html, mode])

  return (
    <article
      // prose-code:before/after strip the literal backticks Typography adds around <code>.
      className="prose prose-neutral dark:prose-invert prose-code:before:content-none prose-code:after:content-none max-w-none"
      // Safe: first-party HTML from src/steps, already filtered by renderForMode.
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  )
}
