import { useEffect, useState } from 'react'
import { Badge } from '@/shared/components/ui/badge'
import { useLocale } from '@/shared/i18n/useLocale'
import { fetchHealth } from '@/shared/lib/api'

type Status = { state: 'checking' } | { state: 'up'; version: string } | { state: 'down' }

export function BackendStatus() {
  const [status, setStatus] = useState<Status>({ state: 'checking' })
  const { t } = useLocale()

  useEffect(() => {
    let cancelled = false

    fetchHealth()
      .then((health) => {
        if (!cancelled) setStatus({ state: 'up', version: health.version })
      })
      .catch(() => {
        if (!cancelled) setStatus({ state: 'down' })
      })

    return () => {
      cancelled = true
    }
  }, [])

  // One badge at a time, so all three branches keep the same id and the state reads off data-state.
  if (status.state === 'checking') {
    return (
      <Badge id="backend-status" data-component="BackendStatus" data-state="checking" variant="outline">
        {t('backend.checking')}
      </Badge>
    )
  }
  if (status.state === 'down') {
    return (
      <Badge
        id="backend-status"
        data-component="BackendStatus"
        data-state="down"
        variant="destructive"
        title={t('backend.down.hint')}
      >
        {t('backend.down')}
      </Badge>
    )
  }
  return (
    <Badge id="backend-status" data-component="BackendStatus" data-state="up" variant="secondary">
      {t('backend.up', { version: status.version })}
    </Badge>
  )
}
