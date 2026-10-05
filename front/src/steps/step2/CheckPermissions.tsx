import { TaskCard } from '@/shared/components/TaskCard'

/** Verify tool permissions and sandbox enforcement using disposable dummy files. */
const MOVES = ['prepare', 'restrict', 'test', 'explain', 'clean'] as const

export function CheckPermissions() {
  return (
    <TaskCard
      block="check-permissions"
      namespace="step2"
      prefix="access"
      storageKey="kata.step2.access"
      moves={MOVES}
      className="my-8"
    />
  )
}
