import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Panel } from "@/shared/components/Panel";
import { Button } from "@/shared/components/ui/button";
import { fetchTitles } from "@/shared/lib/api";
import { SHELF_NOTES } from "@/shared/lib/shelf-notes";

/** How many titles one page of the shelf shows. Three keeps the 9 titles to three pages. */
const PAGE_SIZE = 3;

type State =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "loaded"; titles: string[]; page: number }
  | { phase: "error" };

/**
 * The same `/api/titles` as `CatalogPanel`, paged three at a time behind a fetch button and a
 * next button, the way a UI built for people often is.
 *
 * It exists for one exercise: `tools`' `ConnectOne` card has the agent read the titles once with
 * `curl` and once through a browser, and here a browser needs several actions (open, fetch, next,
 * next) where `curl` needs one call. Each browser action is a tool call with its own result, which
 * is what the student measures. **`CatalogPanel` is not changed for this**: it has to stay a single
 * dumb listing, because the workshop board leans on it as an instrument.
 *
 * Each title carries a long bookseller's note (`shelf-notes.ts`), so every snapshot a browser takes
 * of a page is heavy while `curl` still gets 9 short lines. With bare titles the 2 routes measured
 * almost the same in the window, which left the card nothing to show.
 */
export function ShelfPanel() {
  const [state, setState] = useState<State>({ phase: "idle" });
  const { t } = useTranslation();

  async function onFetch() {
    setState({ phase: "loading" });
    try {
      setState({ phase: "loaded", titles: await fetchTitles(), page: 0 });
    } catch {
      setState({ phase: "error" });
    }
  }

  const pages =
    state.phase === "loaded"
      ? Math.max(1, Math.ceil(state.titles.length / PAGE_SIZE))
      : 0;
  const shown =
    state.phase === "loaded"
      ? state.titles.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE)
      : [];

  function go(delta: number) {
    setState((current) =>
      current.phase === "loaded"
        ? {
            ...current,
            page: Math.min(pages - 1, Math.max(0, current.page + delta)),
          }
        : current,
    );
  }

  return (
    <Panel
      block="shelf"
      state={state.phase}
      title={t("shelf.title")}
      description={t("shelf.description")}
      className="my-0"
    >
      {state.phase !== "loaded" && (
        <Button
          id="shelf-fetch"
          data-component="ShelfPanel"
          type="button"
          onClick={onFetch}
          disabled={state.phase === "loading"}
        >
          <PlayIcon
            id="shelf-fetch-icon"
            data-component="ShelfPanel"
            aria-hidden
            data-icon="inline-start"
          />
          {state.phase === "loading"
            ? t("catalog.fetching")
            : t("catalog.fetch")}
        </Button>
      )}

      {state.phase === "error" && (
        <p
          id="shelf-error"
          data-component="ShelfPanel"
          className="text-destructive mt-4 text-sm"
        >
          {t("catalog.error")}
        </p>
      )}

      {state.phase === "loaded" && (
        <>
          <ol
            id="shelf-items"
            data-component="ShelfPanel"
            className="flex flex-col gap-1.5"
          >
            {shown.map((title, index) => {
              const number = state.page * PAGE_SIZE + index;
              return (
                <li
                  key={`${number}-${title}`}
                  id={`shelf-item-${number}`}
                  data-component="ShelfPanel"
                  className="bg-card flex items-baseline gap-3.5 rounded-lg border px-3.5 py-2.5 text-sm"
                >
                  <span
                    id={`shelf-item-${number}-number`}
                    data-component="ShelfPanel"
                    className="text-muted-foreground/70 font-mono tabular-nums"
                  >
                    {String(number + 1).padStart(2, "0")}
                  </span>
                  <div
                    id={`shelf-item-${number}-body`}
                    data-component="ShelfPanel"
                    className="flex min-w-0 flex-col gap-2"
                  >
                    <span
                      id={`shelf-item-${number}-title`}
                      data-component="ShelfPanel"
                      className="font-mono"
                    >
                      {title}
                    </span>
                    {(SHELF_NOTES[number] ?? []).map((paragraph, line) => (
                      <p
                        key={line}
                        id={`shelf-item-${number}-note-${line}`}
                        data-component="ShelfPanel"
                        className="text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
          <div
            id="shelf-pager"
            data-component="ShelfPanel"
            className="mt-4 flex items-center gap-3"
          >
            <Button
              id="shelf-previous"
              data-component="ShelfPanel"
              type="button"
              variant="outline"
              onClick={() => go(-1)}
              disabled={state.page === 0}
            >
              <ChevronLeftIcon
                id="shelf-previous-icon"
                data-component="ShelfPanel"
                aria-hidden
                data-icon="inline-start"
              />
              {t("shelf.previous")}
            </Button>
            <span
              id="shelf-page"
              data-component="ShelfPanel"
              className="text-muted-foreground font-mono text-sm tabular-nums"
            >
              {t("shelf.page", { page: state.page + 1, pages })}
            </span>
            <Button
              id="shelf-next"
              data-component="ShelfPanel"
              type="button"
              variant="outline"
              onClick={() => go(1)}
              disabled={state.page >= pages - 1}
            >
              {t("shelf.next")}
              <ChevronRightIcon
                id="shelf-next-icon"
                data-component="ShelfPanel"
                aria-hidden
                data-icon="inline-end"
              />
            </Button>
          </div>
        </>
      )}
    </Panel>
  );
}
