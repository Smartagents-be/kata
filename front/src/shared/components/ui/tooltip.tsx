import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/shared/lib/utils"

/*
 * Adapted from Skiper UI's `skiper101` ("Custom tooltip", https://skiper-ui.com/v1/skiper101), a
 * free component: attribution required. Skiper UI, author @gurvinder-singh02, https://gxuri.me
 *
 * What was taken is the arrow, which is the only reason to prefer this over the stock shadcn
 * tooltip: three layered paths that carry the panel's outline around the point instead of stamping
 * a plain triangle under it, so the hairline runs unbroken all the way round. What was changed is
 * the plumbing: the unified `radix-ui` barrel rather than `@radix-ui/react-tooltip` (the house
 * pattern, see `popover.tsx`), no `"use client"`, no `Skiper102` demo export, the colours pointed
 * at this app's tokens, and a delay that is neither instant nor Radix's 700ms.
 */

/**
 * `delayDuration` is 200 rather than the 0 upstream ships. Zero fires the moment the cursor crosses
 * an icon, which on the header band reads as a twitch rather than an answer; Radix's own 700 is too
 * slow for a label somebody is actively hunting for.
 */
function TooltipProvider({
  delayDuration = 200,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

/**
 * Each tooltip carries its own provider, which is upstream's shape and is kept deliberately: no
 * call site has to remember one, and `PresentationPage` sits outside `AppShell` where a single
 * app-level provider would not reach it. The cost is that two adjacent tooltips do not share a
 * `skipDelayDuration`, so moving between them waits the delay again.
 */
function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          // `outline-1` rather than a border is load-bearing: the arrow overlaps the panel edge and
          // paints its own seam out, which only works if the edge is an outline the arrow can sit
          // on top of. Turning this into `border` puts a line across the base of the point.
          "bg-popover text-popover-foreground outline-border origin-(--radix-tooltip-content-transform-origin) z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance shadow-md outline-1",
          "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow asChild>
          <span>
            <ArrowSvg />
          </span>
        </TooltipPrimitive.Arrow>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }

/**
 * Three paths in one 20x10 box, and only two of them paint.
 *
 * The first is the panel colour. It fills the point *and* runs the full width of the box behind the
 * panel's own edge, which is what covers the `outline-1` where the arrow joins: without it the
 * outline would draw straight across the base of the point. The third is the hairline, and it is a
 * single open shape rather than a triangle, so it comes in along the panel edge, down one slope,
 * back up the other and out again, leaving the base unstroked. That is the whole trick, and it is
 * why this is worth taking over a plain triangle.
 *
 * The middle path carries no `fill` and inherits the `fill="none"` on the `<svg>`, so it renders
 * nothing. That is true of the upstream component too. It is kept as shipped rather than deleted,
 * so this file still diffs cleanly against `skiper101` if it is ever re-synced.
 */
const ArrowSvg = (props: React.ComponentProps<"svg">) => (
  <svg
    width="20"
    height="10"
    viewBox="0 0 20 10"
    fill="none"
    className="mt-[-1px] ml-[1px]"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.3356 7.39793L15.1924 3.02682C15.9269 2.36577 16.8801 2 17.8683 2H20V0H0V2H1.4651C2.4532 2 3.4064 2.36577 4.1409 3.02682L8.9977 7.39793C9.378 7.7402 9.9553 7.74021 10.3356 7.39793Z"
      fill="var(--color-popover)"
    />
    <path d="M11.1363 8.14124C10.3757 8.82575 9.22111 8.82578 8.46041 8.14122L3.60361 3.77011C3.05281 3.27432 2.33791 2.99999 1.59681 2.99999L4.24171 3L9.12941 7.39793C9.50971 7.7402 10.087 7.7402 10.4674 7.39793L15.3544 3L18 2.99999C17.2589 2.99999 16.544 3.27432 15.9931 3.77011L11.1363 8.14124Z" />
    <path
      d="M9.6667 6.65461L14.5235 2.28352C15.4416 1.45721 16.6331 1 17.8683 1H20V2H17.8683C16.8801 2 15.9269 2.36577 15.1924 3.02682L10.3356 7.39793C9.9553 7.74021 9.378 7.7402 8.9977 7.39793L4.1409 3.02682C3.4064 2.36577 2.4532 2 1.4651 2H0V1H1.4651C2.7002 1 3.8917 1.45722 4.8099 2.28352L9.6667 6.65461Z"
      fill="var(--color-border)"
    />
  </svg>
)
