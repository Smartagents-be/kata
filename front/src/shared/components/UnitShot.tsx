import { useStepText } from '@/shared/i18n/useStepText'

/**
 * A screenshot with a caption under it, for the places where a picture of a real thing carries the
 * claim better than a sentence asserting it: step 2's `evolution` shows this site as the skeleton it
 * started as and the same site with the details in, and step 1's `model` shows what the harness
 * prints when you ask where you stand in the current window.
 *
 * The mechanics with the data lifted out, the same move `TaskCard` and `FlagBoard` made when a
 * second caller arrived. `id` is the block's own name and is also the i18n prefix, and `namespace`
 * is the step whose bundle carries the two keys, since `shared` never imports a step. A new shot is
 * a file in `front/public/`, a slot in the unit HTML, and two keys per language.
 *
 * The caption states where the image came from and nothing else. Whatever it shows is the job of
 * the prose beside it.
 */
export function UnitShot({
  id,
  src,
  namespace,
}: {
  /** BEM block for the ids, and the prefix its `alt` and `caption` keys hang off. */
  id: string
  /** Path under `front/public/`, served flat. */
  src: string
  /** The step bundle holding `<id>.alt` and `<id>.caption`. */
  namespace: string
}) {
  const { text } = useStepText(namespace)

  return (
    <figure id={id} data-component="UnitShot" className="my-8 flex flex-col gap-3">
      <img
        id={`${id}-image`}
        data-component="UnitShot"
        src={src}
        alt={text(`${id}.alt`)}
        className="border-border w-full rounded-lg border"
      />

      <figcaption
        id={`${id}-caption`}
        data-component="UnitShot"
        className="text-muted-foreground font-mono text-xs"
      >
        {text(`${id}.caption`)}
      </figcaption>
    </figure>
  )
}
