import { ArrowLeftRight, ChevronDown, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/**
 * What the kata's dev container holds and where the app runs once the agent starts it. It sits in
 * the `development-container` section, between its 2 paragraphs, at the
 * `data-figure="container-map"` slot: after what the container is, before what it keeps the agent
 * from reaching.
 *
 * **1 message: the app runs in the container, next to the agent, and your laptop only holds the
 * files and a browser.** The question is the title, on `LoopsPerHour`'s precedent. Two frames say
 * it: your laptop, dashed, holds `~/kata`, your browser and the container; the container, solid,
 * holds the tools, the agents and the running app. A border means containment here, on
 * `FlowDiagram`'s rule. `~/kata` and `/workspace` are joined by a two-way arrow, because the
 * container works on the same files rather than a copy.
 *
 * **Teal is the app and nothing else**, the frontend and step 1's service, since where it runs is
 * the question. The two ways in are the ones `devcontainer.json` sets up: your browser reaches the
 * frontend on `localhost:5174`, which `appPort` publishes from the container's 5173, and the
 * frontend reaches the service through Vite's `/api` proxy, inside the container. The service itself
 * is published nowhere, which is its note: the devcontainer CLI the card uses forwards no ports.
 *
 * **The rows are one grid, and the container is a subgrid of it**, so the browser sits on the
 * frontend's row and its arrow lands on the frontend rather than somewhere in the frame. The app is
 * the container's left column, next to the arrows coming in, and the agent its right one. Stacked on
 * a narrow screen, everything falls into one column in reading order, with every arrow turned down.
 *
 * Versions, ports, paths and product names are literals, like every model name and path in the
 * course; only the words around them are keys, so a bump in `.devcontainer/` is a bump here.
 */
const TOOLS = ['GraalVM JDK 25', 'Maven 3.9', 'Node 22'] as const

const BOX = 'border-border rounded-lg border px-3 py-2 text-center'
const APP_BOX = 'border-primary/40 bg-primary/5 rounded-lg border px-3 py-2 text-center'
const LINK = 'text-muted-foreground flex flex-col items-center justify-center gap-1 text-xs'

export function ContainerMap() {
  const { t } = useTranslation('step2')

  return (
    <figure id="container-map" data-component="ContainerMap" className="not-prose my-8">
      <p
        id="container-map-question"
        data-component="ContainerMap"
        className="text-foreground mb-4 text-sm font-medium"
      >
        {t('container-map.question')}
      </p>

      <div
        id="container-map-laptop"
        data-component="ContainerMap"
        className="border-border rounded-xl border border-dashed p-3"
      >
        <p
          id="container-map-laptop-label"
          data-component="ContainerMap"
          className="eyebrow text-muted-foreground mb-3"
        >
          {t('container-map.laptop')}
        </p>

        <div
          id="container-map-grid"
          data-component="ContainerMap"
          className="grid gap-3 sm:grid-cols-[auto_auto_1fr] sm:grid-rows-[auto_auto_auto_auto]"
        >
          {/* Row 1: the files, shared with the container's /workspace. */}
          <div
            id="container-map-files"
            data-component="ContainerMap"
            className={`${BOX} self-center sm:col-start-1 sm:row-start-1`}
          >
            <p id="container-map-files-path" data-component="ContainerMap" className="text-foreground font-mono text-sm">
              ~/kata
            </p>
            <p id="container-map-files-note" data-component="ContainerMap" className="text-muted-foreground text-xs">
              {t('container-map.files')}
            </p>
          </div>
          <div id="container-map-share" data-component="ContainerMap" className={`${LINK} sm:col-start-2 sm:row-start-1`}>
            <span id="container-map-share-label" data-component="ContainerMap">
              {t('container-map.same-files')}
            </span>
            <ArrowLeftRight
              id="container-map-share-arrow"
              data-component="ContainerMap"
              aria-hidden="true"
              className="size-4 rotate-90 sm:rotate-0"
            />
          </div>

          {/* Row 2: your browser, on the frontend's row. */}
          <div
            id="container-map-browser"
            data-component="ContainerMap"
            className={`${BOX} self-center sm:col-start-1 sm:row-start-2`}
          >
            <p id="container-map-browser-name" data-component="ContainerMap" className="text-foreground text-sm font-medium">
              {t('container-map.browser')}
            </p>
            <p id="container-map-browser-address" data-component="ContainerMap" className="text-muted-foreground font-mono text-xs">
              localhost:5174
            </p>
          </div>
          <div id="container-map-publish" data-component="ContainerMap" className={`${LINK} sm:col-start-2 sm:row-start-2`}>
            <span id="container-map-publish-label" data-component="ContainerMap" className="font-mono">
              5174 → 5173
            </span>
            <ChevronRight
              id="container-map-publish-arrow"
              data-component="ContainerMap"
              aria-hidden="true"
              className="size-4 rotate-90 sm:rotate-0"
            />
          </div>

          {/* The container: a frame over rows 1 to 4 of the third column, sharing their tracks. */}
          <div
            id="container-map-container"
            data-component="ContainerMap"
            className="border-border bg-background grid gap-3 rounded-lg border p-3 sm:col-start-3 sm:row-span-4 sm:row-start-1 sm:grid-cols-[1fr_auto_1fr] sm:grid-rows-subgrid"
          >
            <div
              id="container-map-container-head"
              data-component="ContainerMap"
              className="sm:col-span-3 sm:row-start-1"
            >
              <div
                id="container-map-container-title"
                data-component="ContainerMap"
                className="mb-3 flex items-baseline justify-between gap-2"
              >
                <p id="container-map-container-label" data-component="ContainerMap" className="eyebrow text-foreground">
                  {t('container-map.container')}
                </p>
                <p id="container-map-container-path" data-component="ContainerMap" className="text-muted-foreground font-mono text-xs">
                  /workspace
                </p>
              </div>
              <ul id="container-map-tools" data-component="ContainerMap" className="flex flex-wrap gap-2">
                {TOOLS.map((tool, index) => (
                  <li
                    key={tool}
                    id={`container-map-tools-${index}`}
                    data-component="ContainerMap"
                    className="border-border text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-xs"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            {/* The agent on the right, starting the app on the left. Stacked, it comes first. */}
            <div
              id="container-map-agent"
              data-component="ContainerMap"
              className={`${BOX} self-center sm:col-start-3 sm:row-span-3 sm:row-start-2`}
            >
              <p id="container-map-agent-name" data-component="ContainerMap" className="text-foreground text-sm font-medium">
                {t('container-map.agent')}
              </p>
              <p id="container-map-agent-products" data-component="ContainerMap" className="text-muted-foreground text-xs">
                Claude Code · Copilot CLI
              </p>
            </div>
            <div
              id="container-map-start"
              data-component="ContainerMap"
              className={`${LINK} sm:col-start-2 sm:row-span-3 sm:row-start-2`}
            >
              <span id="container-map-start-label" data-component="ContainerMap">
                {t('container-map.starts')}
              </span>
              <ChevronDown
                id="container-map-start-arrow"
                data-component="ContainerMap"
                aria-hidden="true"
                // Down when stacked; turned to point left, at the app, beside the agent.
                className="size-4 sm:rotate-90"
              />
            </div>

            <div
              id="container-map-frontend"
              data-component="ContainerMap"
              className={`${APP_BOX} self-center sm:col-start-1 sm:row-start-2`}
            >
              <p id="container-map-frontend-name" data-component="ContainerMap" className="text-foreground text-sm font-medium">
                {t('container-map.frontend')}
              </p>
              <p id="container-map-frontend-port" data-component="ContainerMap" className="text-primary font-mono text-xs font-semibold">
                :5173
              </p>
            </div>
            <div id="container-map-proxy" data-component="ContainerMap" className={`${LINK} sm:col-start-1 sm:row-start-3`}>
              <span id="container-map-proxy-label" data-component="ContainerMap" className="font-mono">
                /api
              </span>
              <ChevronDown id="container-map-proxy-arrow" data-component="ContainerMap" aria-hidden="true" className="size-4" />
            </div>
            <div
              id="container-map-service"
              data-component="ContainerMap"
              className={`${APP_BOX} sm:col-start-1 sm:row-start-4`}
            >
              <p id="container-map-service-name" data-component="ContainerMap" className="text-foreground text-sm font-medium">
                {t('container-map.app')}
              </p>
              <p id="container-map-service-port" data-component="ContainerMap" className="text-primary font-mono text-xs font-semibold">
                :8080
              </p>
              <p id="container-map-service-note" data-component="ContainerMap" className="text-muted-foreground text-xs">
                {t('container-map.inside-only')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}
