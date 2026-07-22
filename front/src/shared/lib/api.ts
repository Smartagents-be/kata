/**
 * Client for the Spring Boot API. In development Vite proxies `/api` to localhost:8080
 * (see vite.config.ts), so these are same-origin requests and need no CORS handling.
 */

export interface Health {
  status: string
  version: string
}

export interface CheckResult {
  passed: boolean
  message: string
  details: string[]
}

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, init)
  if (!response.ok) {
    throw new ApiError(`${init?.method ?? 'GET'} ${path} failed`, response.status)
  }
  return (await response.json()) as T
}

export function fetchHealth(): Promise<Health> {
  return request<Health>('/health')
}

/** The catalogue the step 1 service assembles: whatever its stages published, in that order. */
export function fetchTitles(): Promise<string[]> {
  return request<string[]>('/titles')
}

export function checkAnswer(exerciseId: string, answer: string): Promise<CheckResult> {
  return request<CheckResult>(`/exercises/${encodeURIComponent(exerciseId)}/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer }),
  })
}
