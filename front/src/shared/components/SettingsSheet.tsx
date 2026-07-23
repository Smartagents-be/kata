import { SettingsIcon, XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'
import { Switch } from '@/shared/components/ui/switch'
import { LOCALES } from '@/shared/i18n/locale'
import { useLocale } from '@/shared/i18n/useLocale'
import { cn } from '@/shared/lib/utils'
import { useMode } from '@/shared/mode/useMode'

/**
 * The cogwheel in the header and the panel it opens from the left: language, and whether notes
 * are shown. Both settings persist, so a student picks them once.
 */
export function SettingsSheet() {
  const { t } = useTranslation()
  const { locale, setLocale } = useLocale()
  const { mode, setMode } = useMode()
  const selfLearning = mode === 'self'

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          id="settings-trigger"
          data-component="SettingsSheet"
          variant="ghost"
          size="icon-sm"
          aria-label={t('settings.open')}
        >
          <SettingsIcon id="settings-trigger-icon" data-component="SettingsSheet" />
        </Button>
      </SheetTrigger>

      {/* Own close button: the generated one in ui/sheet.tsx hardcodes an English label. */}
      <SheetContent
        id="settings-panel"
        data-component="SettingsSheet"
        side="left"
        className="gap-0"
        showCloseButton={false}
      >
        <SheetClose asChild>
          <Button
            id="settings-close"
            data-component="SettingsSheet"
            variant="ghost"
            size="icon-sm"
            className="absolute top-3 right-3"
          >
            <XIcon id="settings-close-icon" data-component="SettingsSheet" />
            <span id="settings-close-label" data-component="SettingsSheet" className="sr-only">
              {t('settings.close')}
            </span>
          </Button>
        </SheetClose>

        <SheetHeader id="settings-header" data-component="SettingsSheet">
          <SheetTitle id="settings-title" data-component="SettingsSheet">
            {t('settings.title')}
          </SheetTitle>
          <SheetDescription id="settings-description" data-component="SettingsSheet">
            {t('settings.description')}
          </SheetDescription>
        </SheetHeader>

        <div id="settings-body" data-component="SettingsSheet" className="flex flex-col gap-6 px-4 py-2">
          <section
            id="settings-language"
            data-component="SettingsSheet"
            className="flex flex-col gap-2"
          >
            <h3 id="settings-language-title" data-component="SettingsSheet" className="text-sm font-medium">
              {t('settings.language')}
            </h3>
            <div
              id="settings-language-options"
              data-component="SettingsSheet"
              role="radiogroup"
              aria-label={t('settings.language')}
              className="flex flex-col gap-1"
            >
              {LOCALES.map(({ locale: option, label }, index) => (
                <button
                  key={option}
                  id={`settings-language-option-${index}`}
                  data-component="SettingsSheet"
                  type="button"
                  role="radio"
                  aria-checked={locale === option}
                  lang={option}
                  onClick={() => setLocale(option)}
                  className={cn(
                    'flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                    locale === option
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                  )}
                >
                  {label}
                  {locale === option && (
                    <span
                      id={`settings-language-option-${index}-check`}
                      data-component="SettingsSheet"
                      aria-hidden
                    >
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section
            id="settings-mode"
            data-component="SettingsSheet"
            className="flex items-start justify-between gap-4"
          >
            <div id="settings-mode-text" data-component="SettingsSheet">
              <label
                id="settings-mode-label"
                data-component="SettingsSheet"
                htmlFor="settings-mode-switch"
                className="text-sm font-medium"
              >
                {t('settings.mode')}
              </label>
              <p id="settings-mode-hint" data-component="SettingsSheet" className="text-muted-foreground text-xs">
                {selfLearning ? t('settings.mode.on') : t('settings.mode.off')}
              </p>
            </div>
            <Switch
              id="settings-mode-switch"
              data-component="SettingsSheet"
              checked={selfLearning}
              onCheckedChange={(checked) => setMode(checked ? 'self' : 'guided')}
              aria-label={t('settings.mode.aria')}
            />
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
