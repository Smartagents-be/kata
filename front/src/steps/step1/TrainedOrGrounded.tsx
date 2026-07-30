import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The same question answered twice, drawn as two windows side by side. The left one holds the prompt
 * and nothing else, so the answer comes out of training; the right one holds the file, so the answer
 * comes out of the file.
 *
 * **The two answer chips are drawn identically on purpose**, same size, same fill, same distance
 * under their frame. That is the whole figure: what differs is the window, and the window is the
 * part you have to go and look at. Give either chip a different weight, a tick, a cross or a colour
 * and the drawing starts claiming you can tell them apart by looking, which is what the unit says
 * you cannot.
 *
 * The strings on the chips are versions rather than shapes, and they differ (3.5.0 against 4.1.0),
 * because the trained answer is not a wrong-looking answer. It is the previous release, stated as
 * levelly as the current one. 4.1.0 is what `kata/step1/java/pom.xml` actually declares, so a
 * student who checks finds the figure honest. Machine-shaped strings, so no key and no `nl` entry,
 * the same way `ModelPricing`'s numbers work.
 *
 * On the step's own vocabulary: a teal frame is a context, the solid bar is the prompt, the faint
 * stack is material a tool brought back. Nothing new is invented here, which is what lets a student
 * read it without a legend.
 */
export function TrainedOrGrounded() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  /** Left panel then right, and the x is the frame's left edge. */
  const panels = [
    { id: 'trained', x: 20, answer: '3.5.0' },
    { id: 'grounded', x: 340, answer: '4.1.0' },
  ]

  /** What the right window read, in the fill a tool result comes back in. */
  const fileBars = [232, 196, 216]

  return (
    <figure
      id="trained-or-grounded"
      data-component="TrainedOrGrounded"
      className="my-8 flex justify-center"
    >
      <svg
        id="trained-or-grounded-svg"
        data-component="TrainedOrGrounded"
        viewBox="0 0 640 300"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="TrainedOrGrounded">
          {t('trained-or-grounded.description')}
        </title>

        {panels.map((panel, index) => (
          <g key={panel.id}>
            <text
              id={`trained-or-grounded-title-${index}`}
              data-component="TrainedOrGrounded"
              x={panel.x}
              y="30"
              fontSize="18"
              className="fill-foreground font-medium"
            >
              {t(`trained-or-grounded.${panel.id}`)}
            </text>

            {/* the window, on the same stroke and fill every context frame in this step carries */}
            <rect
              id={`trained-or-grounded-window-${index}`}
              data-component="TrainedOrGrounded"
              x={panel.x}
              y="48"
              width="280"
              height="158"
              rx="16"
              strokeWidth="2"
              className="fill-primary/5 stroke-primary/40"
            />

            {/* the prompt: the one bar you typed, and the only thing both windows have */}
            <text
              id={`trained-or-grounded-prompt-label-${index}`}
              data-component="TrainedOrGrounded"
              x={panel.x + 24}
              y="78"
              fontSize="13"
              className="fill-muted-foreground"
            >
              {t('trained-or-grounded.prompt')}
            </text>
            <rect
              id={`trained-or-grounded-prompt-${index}`}
              data-component="TrainedOrGrounded"
              x={panel.x + 24}
              y="86"
              width="150"
              height="14"
              rx="7"
              className="fill-primary"
            />

            {/* the answer, below the window it came out of. Identical in both panels. */}
            <text
              id={`trained-or-grounded-answer-label-${index}`}
              data-component="TrainedOrGrounded"
              x={panel.x + 24}
              y="240"
              fontSize="13"
              className="fill-muted-foreground"
            >
              {t('trained-or-grounded.answer')}
            </text>
            <rect
              id={`trained-or-grounded-answer-${index}`}
              data-component="TrainedOrGrounded"
              x={panel.x + 24}
              y="250"
              width="150"
              height="32"
              rx="16"
              strokeWidth="2"
              className="fill-primary/25 stroke-primary/40"
            />
            <text
              id={`trained-or-grounded-answer-value-${index}`}
              data-component="TrainedOrGrounded"
              x={panel.x + 99}
              y="266"
              fontSize="15"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground font-mono"
            >
              {panel.answer}
            </text>
          </g>
        ))}

        {/* the left window: the prompt and then nothing, which is what the answer was built from */}
        <text
          id="trained-or-grounded-empty"
          data-component="TrainedOrGrounded"
          x="160"
          y="156"
          fontSize="14"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('trained-or-grounded.empty')}
        </text>

        {/* the right window: the file, in the faint stack a tool result arrives as */}
        <text
          id="trained-or-grounded-file-label"
          data-component="TrainedOrGrounded"
          x="364"
          y="126"
          fontSize="13"
          className="fill-muted-foreground font-mono"
        >
          pom.xml
        </text>
        <g className="fill-primary/35">
          {fileBars.map((width, index) => (
            <rect
              key={width}
              id={`trained-or-grounded-file-${index}`}
              data-component="TrainedOrGrounded"
              x="364"
              y={134 + index * 18}
              width={width}
              height="12"
              rx="6"
            />
          ))}
        </g>
      </svg>
    </figure>
  )
}
