import { PresentationIcon, RotateCcwIcon, SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { Switch } from '@/shared/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { ASSISTANTS } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { LOCALES } from '@/shared/i18n/locale'
import { useLocale } from '@/shared/i18n/useLocale'
import { resetProgress } from '@/shared/lib/reset'
import { cn } from '@/shared/lib/utils'
import { useMode } from '@/shared/mode/useMode'

/**
 * The cogwheel in the header and the panel it drops from it: language, which assistant the student
 * is working with, whether the notes are shown, and the way into the deck. The first three persist,
 * so a student picks them once; the last is an action, so it is a button rather than a switch, and
 * the whole row is that button.
 *
 * Language and assistant are the same shape, a list of radios, because they are the same kind of
 * choice: one of a handful of named things, each named in its own words rather than in the
 * interface's. Only the section headings above them are translated.
 *
 * Every option is its label and nothing else. The explanatory line under a label was removed on
 * purpose: it read as instructions in a panel with three items in it, and a switch already says
 * which way it is set. Do not put the subtext back.
 *
 * The last row throws the captured flags and the finished pages away, so it asks first. Its dialog
 * is a sibling of the popover rather than a child: dismissing the popover unmounts everything
 * inside it, and a confirm that vanishes with the panel that opened it is not a confirm. That is
 * also why the popover is controlled here, since the row has to close it and open the dialog in the
 * same press.
 */
export function SettingsMenu({ triggerClassName }: { triggerClassName?: string }) {
  const { t } = useTranslation()
  const { locale, setLocale } = useLocale()
  const { mode, setMode } = useMode()
  const { assistant, setAssistant } = useAssistant()
  const navigate = useNavigate()
  const selfLearning = mode === 'self'
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmingReset, setConfirmingReset] = useState(false)

  function reset() {
    resetProgress()
    setConfirmingReset(false)
    // Every board reads its storage once, when it mounts, so the page you are standing on would go
    // on showing the flags that were just thrown away. Reloading is what makes them let go, and it
    // costs nothing: language and mode survive in storage of their own.
    window.location.reload()
  }

  return (
    <>
    <Popover open={menuOpen} onOpenChange={setMenuOpen}>
      {/*
        The tooltip is pinned shut while the panel is open. Radix would otherwise keep it up over
        the panel the click just opened, which is a label for a thing that is no longer hidden.
        `undefined` hands control back, rather than pinning it open the rest of the time.
      */}
      <Tooltip open={menuOpen ? false : undefined}>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent id="settings-trigger-tooltip" data-component="SettingsMenu" sideOffset={6}>
          {t('settings.open')}
        </TooltipContent>
      </Tooltip>

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

          {/* Which product the instructions on the page should name. Its own section rather than a
              third language, because the two are independent: a Dutch student on Copilot should not
              have to give up one to get the other. */}
          <section
            id="settings-assistant"
            data-component="SettingsMenu"
            className="flex flex-col gap-2"
          >
            <h3
              id="settings-assistant-title"
              data-component="SettingsMenu"
              className="text-sm font-medium"
            >
              {t('settings.assistant')}
            </h3>
            <div
              id="settings-assistant-options"
              data-component="SettingsMenu"
              role="radiogroup"
              aria-label={t('settings.assistant')}
              className="flex flex-col gap-1"
            >
              {ASSISTANTS.map(({ assistant: option, label }, index) => (
                <button
                  key={option}
                  id={`settings-assistant-option-${index}`}
                  data-component="SettingsMenu"
                  type="button"
                  role="radio"
                  aria-checked={assistant === option}
                  onClick={() => setAssistant(option)}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                    assistant === option
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  {label}
                  {assistant === option && (
                    <span
                      id={`settings-assistant-option-${index}-check`}
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
            className="flex items-center justify-between gap-4"
          >
            <label
              id="settings-mode-label"
              data-component="SettingsMenu"
              htmlFor="settings-mode-switch"
              className="text-sm font-medium"
            >
              {t('settings.mode')}
            </label>
            <Switch
              id="settings-mode-switch"
              data-component="SettingsMenu"
              checked={selfLearning}
              onCheckedChange={(checked) => setMode(checked ? 'self' : 'guided')}
              aria-label={t('settings.mode.aria')}
            />
          </section>

          {/* Not a setting: the way onto the board. It lives here because the cogwheel is the one
              control that is always in the corner, and a tutor about to present should not have to
              find a page first. The whole row is the button, so there is no label sitting next to a
              small target: the same shape the language options above already have. */}
          <button
            id="settings-presentation"
            data-component="SettingsMenu"
            type="button"
            onClick={() => navigate('/present')}
            className="hover:bg-accent -mx-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors"
          >
            {/* The label is full ink: muted would read as the option that is not chosen, which is
                what muted means one section up. The glyph carries the setting-back instead. */}
            <PresentationIcon
              id="settings-presentation-glyph"
              data-component="SettingsMenu"
              className="text-muted-foreground size-4"
              aria-hidden
            />
            {t('settings.presentation')}
          </button>

          {/* Also not a setting: the one action in here that destroys something. It is the same
              row shape as the presentation above it, and deliberately not tinted red, because
              --destructive means an answer failed everywhere else in this app. The dialog is what
              carries the weight. */}
          <button
            id="settings-reset"
            data-component="SettingsMenu"
            type="button"
            onClick={() => {
              setMenuOpen(false)
              setConfirmingReset(true)
            }}
            className="hover:bg-accent -mx-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors"
          >
            <RotateCcwIcon
              id="settings-reset-glyph"
              data-component="SettingsMenu"
              className="text-muted-foreground size-4"
              aria-hidden
            />
            {t('settings.reset')}
          </button>
        </div>
      </PopoverContent>
    </Popover>

    <Dialog open={confirmingReset} onOpenChange={setConfirmingReset}>
      <DialogContent id="settings-reset-dialog" data-component="SettingsMenu">
        <DialogHeader id="settings-reset-dialog-header" data-component="SettingsMenu">
          <DialogTitle id="settings-reset-dialog-title" data-component="SettingsMenu">
            {t('settings.reset.title')}
          </DialogTitle>
          <DialogDescription id="settings-reset-dialog-body" data-component="SettingsMenu">
            {t('settings.reset.body')}
          </DialogDescription>
        </DialogHeader>
        <div
          id="settings-reset-dialog-actions"
          data-component="SettingsMenu"
          className="mt-2 flex items-center justify-end gap-2"
        >
          <DialogClose asChild>
            <Button
              id="settings-reset-dialog-cancel"
              data-component="SettingsMenu"
              type="button"
              variant="outline"
            >
              {t('settings.reset.cancel')}
            </Button>
          </DialogClose>
          <Button
            id="settings-reset-dialog-confirm"
            data-component="SettingsMenu"
            type="button"
            onClick={reset}
          >
            {t('settings.reset.confirm')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
