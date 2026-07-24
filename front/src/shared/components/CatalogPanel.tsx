import { PlayIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { fetchTitles } from '@/shared/lib/api'

type State =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'loaded'; titles: string[] }
  | { phase: 'error' }

/**
 * Calls the step 1 service and lists back whatever it returned. Deliberately dumb: it renders the
 * response and nothing else, so what you see on screen is what came over the wire.
 */
export function CatalogPanel() {
  const [state, setState] = useState<State>({ phase: 'idle' })
  const { t } = useTranslation()

  async function onFetch() {
    setState({ phase: 'loading' })
    try {
      setState({ phase: 'loaded', titles: await fetchTitles() })
    } catch {
      setState({ phase: 'error' })
    }
  }

  return (
    <Card id="catalog" data-component="CatalogPanel" data-state={state.phase}>
      <CardHeader id="catalog-header" data-component="CatalogPanel">
        <CardTitle id="catalog-title" data-component="CatalogPanel">
          {t('catalog.title')}
        </CardTitle>
        <CardDescription id="catalog-description" data-component="CatalogPanel">
          {t('catalog.description')}
        </CardDescription>
      </CardHeader>
      <CardContent id="catalog-content" data-component="CatalogPanel">
        <div id="catalog-actions" data-component="CatalogPanel" className="flex items-center gap-3">
          <Button
            id="catalog-fetch"
            data-component="CatalogPanel"
            type="button"
            onClick={onFetch}
            disabled={state.phase === 'loading'}
          >
            <PlayIcon
              id="catalog-fetch-icon"
              data-component="CatalogPanel"
              aria-hidden
              data-icon="inline-start"
            />
            {state.phase === 'loading' ? t('catalog.fetching') : t('catalog.fetch')}
          </Button>
          {state.phase === 'loaded' && (
            <span
              id="catalog-count"
              data-component="CatalogPanel"
              className="text-muted-foreground font-mono text-sm tabular-nums"
            >
              {t('catalog.count', { count: state.titles.length })}
            </span>
          )}
        </div>

        {state.phase === 'error' && (
          <p id="catalog-error" data-component="CatalogPanel" className="text-destructive mt-4 text-sm">
            {t('catalog.error')}
          </p>
        )}

        {state.phase === 'loaded' &&
          (state.titles.length === 0 ? (
            <p
              id="catalog-empty"
              data-component="CatalogPanel"
              className="text-muted-foreground mt-4 text-sm"
            >
              {t('catalog.empty')}
            </p>
          ) : (
            <ol id="catalog-items" data-component="CatalogPanel" className="mt-4 flex flex-col gap-1.5">
              {state.titles.map((title, index) => (
                <li
                  key={`${index}-${title}`}
                  id={`catalog-item-${index}`}
                  data-component="CatalogPanel"
                  className="bg-card flex items-baseline gap-3.5 rounded-lg border px-3.5 py-2.5 font-mono text-sm"
                >
                  <span
                    id={`catalog-item-${index}-number`}
                    data-component="CatalogPanel"
                    className="text-muted-foreground/70 tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    id={`catalog-item-${index}-title`}
                    data-component="CatalogPanel"
                  >
                    {title}
                  </span>
                </li>
              ))}
            </ol>
          ))}
      </CardContent>
    </Card>
  )
}
