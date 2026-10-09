import { useTranslation } from 'react-i18next'
import { ShelfPanel } from '@/shared/components/ShelfPanel'

/**
 * The paged twin of `CatalogPage`, for `ConnectOne`'s browser route. It is reached by URL from that
 * card and is deliberately not in the sidebar: it is an exercise target, not an instrument.
 */
export function ShelfPage() {
  const { t } = useTranslation()

  return (
    <div id="shelf-page" data-component="ShelfPage" className="flex flex-col gap-8">
      <header id="shelf-page-header" data-component="ShelfPage">
        <p id="shelf-page-kicker" data-component="ShelfPage" className="eyebrow text-primary">
          {t('catalog.kicker')}
        </p>
        <h1
          id="shelf-page-title"
          data-component="ShelfPage"
          className="font-heading mt-2 text-3xl font-semibold tracking-tight"
        >
          {t('shelf.nav')}
        </h1>
      </header>

      <ShelfPanel />
    </div>
  )
}
