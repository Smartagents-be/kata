import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * One release line with the training cutoff drawn across it. Everything left of the line is in the
 * model, everything right of it was published into a world the model never saw.
 *
 * **The far side is dashed, not faded**, and that is the whole figure. A gradient, a lighter fill or
 * a smaller chip would say the model knows the recent versions less well, which is exactly the
 * reading the paragraph above it exists to kill. Dashed means "nothing behind this" everywhere else
 * in this step (`AnswerProvenance`'s invented row is the same stroke), so a chip with an outline and
 * no fill is a release that exists in the world and not in the model. `--destructive` is wrong for
 * the same reason it is wrong there: nothing failed.
 *
 * **The line carries no date.** Every model has a different one and any number printed here would be
 * wrong for somebody in the room on the day it was drawn, so what is labelled is the event and not
 * the day. The axis is the only thing saying which way time runs, which is what the arrowhead is for.
 *
 * The versions are `3.5.0` on the near side and `4.1.0` on the far one. **`4.1.0` is what
 * `exercises/step1/java/pom.xml` declares**, so a Boot upgrade in that project means moving the number
 * here. `TrainedOrGrounded` a screen later tells the same story with a dependency instead of a
 * version: what the Boot 3 line taught (`spring-boot-starter-test`) against what Boot 4 needs. Machine-shaped strings, so they are data here with no key and no `nl` entry, the way
 * `ModelPricing`'s numbers are.
 */
export function TheCutoff() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  /** The near side: releases that were published while there was still training to see them. */
  const seen = ['3.3.0', '3.4.0', '3.5.0']

  /** The far side. The last of them is the one the student's own project is on. */
  const unseen = ['4.0.0', '4.1.0']

  /** Where the training stops and the drawing changes vocabulary. */
  const cutoff = 372

  return (
    <figure id="the-cutoff" data-component="TheCutoff" className="my-8 flex justify-center">
      <svg
        id="the-cutoff-svg"
        data-component="TheCutoff"
        viewBox="0 0 640 220"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="TheCutoff">
          {t('the-cutoff.description')}
        </title>

        {/* the event, named above the line it draws */}
        <text
          id="the-cutoff-stop"
          data-component="TheCutoff"
          x={cutoff}
          y="26"
          fontSize="15"
          textAnchor="middle"
          className="fill-foreground font-medium"
        >
          {t('the-cutoff.stop')}
        </text>
        <line
          id="the-cutoff-line"
          data-component="TheCutoff"
          x1={cutoff}
          y1="40"
          x2={cutoff}
          y2="190"
          strokeWidth="2"
          className="stroke-primary"
        />

        {/* the release line: solid where the model was watching, dashed where it was not */}
        <line
          id="the-cutoff-axis-seen"
          data-component="TheCutoff"
          x1="24"
          y1="110"
          x2={cutoff}
          y2="110"
          strokeWidth="2"
          className="stroke-primary/40"
        />
        <line
          id="the-cutoff-axis-unseen"
          data-component="TheCutoff"
          x1={cutoff}
          y1="110"
          x2="602"
          y2="110"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="stroke-primary/40"
        />
        <path
          id="the-cutoff-axis-head"
          data-component="TheCutoff"
          d="M 602 102 L 618 110 L 602 118 Z"
          className="fill-primary/40"
        />

        <text
          id="the-cutoff-before"
          data-component="TheCutoff"
          x="24"
          y="92"
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('the-cutoff.before')}
        </text>
        <text
          id="the-cutoff-after"
          data-component="TheCutoff"
          x={cutoff + 24}
          y="92"
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('the-cutoff.after')}
        </text>

        {/* in the model: the fill every piece of material in this step's windows carries */}
        {seen.map((version, index) => (
          <g key={version}>
            <rect
              id={`the-cutoff-seen-${index}`}
              data-component="TheCutoff"
              x={40 + index * 108}
              y="132"
              width="92"
              height="38"
              rx="19"
              strokeWidth="2"
              className="fill-primary/25 stroke-primary/40"
            />
            <text
              id={`the-cutoff-seen-${index}-value`}
              data-component="TheCutoff"
              x={86 + index * 108}
              y="151"
              fontSize="15"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground font-mono"
            >
              {version}
            </text>
          </g>
        ))}

        {/* published since: an outline and nothing inside it */}
        {unseen.map((version, index) => (
          <g key={version}>
            <rect
              id={`the-cutoff-unseen-${index}`}
              data-component="TheCutoff"
              x={cutoff + 24 + index * 108}
              y="132"
              width="92"
              height="38"
              rx="19"
              strokeWidth="2"
              strokeDasharray="5 5"
              className="fill-none stroke-primary/40"
            />
            <text
              id={`the-cutoff-unseen-${index}-value`}
              data-component="TheCutoff"
              x={cutoff + 70 + index * 108}
              y="151"
              fontSize="15"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground font-mono"
            >
              {version}
            </text>
          </g>
        ))}

        {/* the one chip the student is actually standing on, called out from underneath */}
        <line
          id="the-cutoff-yours-tick"
          data-component="TheCutoff"
          x1={cutoff + 178}
          y1="170"
          x2={cutoff + 178}
          y2="186"
          strokeWidth="2"
          className="stroke-primary/40"
        />
        <text
          id="the-cutoff-yours"
          data-component="TheCutoff"
          x={cutoff + 178}
          y="204"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('the-cutoff.yours')}
        </text>
      </svg>
    </figure>
  )
}
