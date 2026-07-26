import { useTranslation } from 'react-i18next'

/**
 * A screenshot of this site with a caption under it, used twice in the `evolution` unit: the
 * skeleton it started as, and the same course once the details went in. These are evidence rather
 * than drawings, which is why the unit shows them instead of claiming the difference in prose.
 *
 * One component with props rather than one per shot, since the two differ only in their image and
 * their text. `id` is the block's own name (`walking-skeleton`, `added-details`) and is also the
 * i18n prefix, so a new shot needs a file in `front/public/`, a slot in the unit HTML, and two keys
 * per language.
 */
export function UnitShot({ id, src }: { id: string; src: string }) {
  const { t } = useTranslation('step2')

  return (
    <figure id={id} data-component="UnitShot" className="my-8 flex flex-col gap-3">
      <img
        id={`${id}-image`}
        data-component="UnitShot"
        src={src}
        alt={t(`${id}.alt`)}
        className="border-border w-full rounded-lg border"
      />

      <figcaption
        id={`${id}-caption`}
        data-component="UnitShot"
        className="text-muted-foreground font-mono text-xs"
      >
        {t(`${id}.caption`)}
      </figcaption>
    </figure>
  )
}
