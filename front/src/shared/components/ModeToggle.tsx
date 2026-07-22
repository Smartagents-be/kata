import { Switch } from '@/shared/components/ui/switch'
import { useMode } from '@/shared/mode/useMode'

export function ModeToggle() {
  const { mode, setMode } = useMode()
  const selfLearning = mode === 'self'

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <label htmlFor="mode" className="text-sm font-medium">
          Self-learning
        </label>
        <p className="text-muted-foreground text-xs">
          {selfLearning ? 'Notes are shown' : 'Exercises only'}
        </p>
      </div>
      <Switch
        id="mode"
        checked={selfLearning}
        onCheckedChange={(checked) => setMode(checked ? 'self' : 'guided')}
        aria-label="Toggle self-learning mode"
      />
    </div>
  )
}
