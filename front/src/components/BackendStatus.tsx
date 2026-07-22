import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { fetchHealth } from '@/lib/api'

type Status = { state: 'checking' } | { state: 'up'; version: string } | { state: 'down' }

export function BackendStatus() {
  const [status, setStatus] = useState<Status>({ state: 'checking' })

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

  if (status.state === 'checking') {
    return <Badge variant="outline">Connecting…</Badge>
  }
  if (status.state === 'down') {
    return (
      <Badge variant="destructive" title="Is the backend running? mvn spring-boot:run">
        Backend offline
      </Badge>
    )
  }
  return <Badge variant="secondary">Backend {status.version}</Badge>
}
