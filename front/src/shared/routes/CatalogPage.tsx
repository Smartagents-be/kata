import { useTranslation } from 'react-i18next'
import { CatalogPanel } from '@/shared/components/CatalogPanel'

/**
 * A page of its own rather than a unit: it belongs to no lesson yet, and it is the thing the
 * student will be pointing an agent at.
 */
export function CatalogPage() {
  const { t } = useTranslation()

  return (
    <div id="catalog-page" data-component="CatalogPage" className="flex flex-col gap-8">
      <header id="catalog-page-header" data-component="CatalogPage">
        <p
          id="catalog-page-kicker"
          data-component="CatalogPage"
          className="text-muted-foreground text-xs font-medium tracking-wide uppercase"
        >
          {t('catalog.kicker')}
        </p>
        <h1
          id="catalog-page-title"
          data-component="CatalogPage"
          className="font-heading mt-1 text-2xl font-semibold"
        >
          {t('catalog.nav')}
        </h1>
      </header>

      <CatalogPanel />
    </div>
  )
}
