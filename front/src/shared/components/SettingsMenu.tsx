import { SettingsIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { Switch } from '@/shared/components/ui/switch'
import { LOCALES } from '@/shared/i18n/locale'
import { useLocale } from '@/shared/i18n/useLocale'
import { cn } from '@/shared/lib/utils'
import { useMode } from '@/shared/mode/useMode'

/**
 * The cogwheel in the header and the panel it drops from it: language, and whether the notes are
 * shown. Both settings persist, so a student picks them once. A popover rather than a full sheet,
 * because there are only two things to set and the trigger is right there in the corner.
 */
export function SettingsMenu({ triggerClassName }: { triggerClassName?: string }) {
  const { t } = useTranslation()
  const { locale, setLocale } = useLocale()
  const { mode, setMode } = useMode()
  const selfLearning = mode === 'self'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="settings-trigger"
          data-component="SettingsMenu"
          variant="ghost"
          size="icon-sm"
          aria-label={t('settings.open')}
          className={triggerClassName}
        >
          <SettingsIcon id="settings-trigger-icon" data-component="SettingsMenu" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        id="settings-panel"
        data-component="SettingsMenu"
        align="end"
        sideOffset={10}
        className="w-72"
      >
        <div
          id="settings-eyebrow"
          data-component="SettingsMenu"
          className="eyebrow text-muted-foreground mb-3"
        >
          {t('settings.title')}
        </div>

        <div id="settings-body" data-component="SettingsMenu" className="flex flex-col gap-5">
          <section
            id="settings-language"
            data-component="SettingsMenu"
            className="flex flex-col gap-2"
          >
            <h3
              id="settings-language-title"
              data-component="SettingsMenu"
              className="text-sm font-medium"
            >
              {t('settings.language')}
            </h3>
            <div
              id="settings-language-options"
              data-component="SettingsMenu"
              role="radiogroup"
              aria-label={t('settings.language')}
              className="flex flex-col gap-1"
            >
              {LOCALES.map(({ locale: option, label }, index) => (
                <button
                  key={option}
                  id={`settings-language-option-${index}`}
                  data-component="SettingsMenu"
                  type="button"
                  role="radio"
                  aria-checked={locale === option}
                  lang={option}
                  onClick={() => setLocale(option)}
                  className={cn(
                    // Teal marks the current choice here for the same reason it marks the current
                    // step in the sidebar: one colour the eye follows for "you are here".
                    'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                    locale === option
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  {label}
                  {locale === option && (
                    <span
                      id={`settings-language-option-${index}-check`}
                      data-component="SettingsMenu"
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
            data-component="SettingsMenu"
            className="flex items-start justify-between gap-4"
          >
            <div id="settings-mode-text" data-component="SettingsMenu">
              <label
                id="settings-mode-label"
                data-component="SettingsMenu"
                htmlFor="settings-mode-switch"
                className="text-sm font-medium"
              >
                {t('settings.mode')}
              </label>
              <p
                id="settings-mode-hint"
                data-component="SettingsMenu"
                className="text-muted-foreground text-xs"
              >
                {selfLearning ? t('settings.mode.on') : t('settings.mode.off')}
              </p>
            </div>
            <Switch
              id="settings-mode-switch"
              data-component="SettingsMenu"
              checked={selfLearning}
              onCheckedChange={(checked) => setMode(checked ? 'self' : 'guided')}
              aria-label={t('settings.mode.aria')}
            />
          </section>
        </div>
      </PopoverContent>
    </Popover>
  )
}
