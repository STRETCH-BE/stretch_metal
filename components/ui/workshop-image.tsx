/**
 * WorkshopImage — photography slot that degrades to a branded placeholder.
 * File path: /components/ui/workshop-image.tsx
 *
 * Slots without a photo yet render a dark #131313 block with a hairline
 * diagonal-line pattern and a small uppercase caption describing the
 * future shot ("ZDJĘCIE: hala — wycinarka laserowa"). When a real photo
 * is supplied, add its path to the content file (`image`) and this
 * component switches to next/image — no component changes needed. First
 * real photos live under /public/images (hero, heritage, projects, about).
 *
 * The #131313 / #191919 pair is the placeholder's own texture, not a
 * design-system colour — it exists only here, which is why these two
 * values are allowed to bypass the tokens-only rule.
 */

import Image from "next/image";

type Props = {
  /** Caption of the future shot, printed on the placeholder. */
  caption: string;
  /** Real photo path (public/…): when set, renders next/image instead. */
  src?: string;
  /** Alt text for the real photo; the placeholder is decorative. */
  alt?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/3]". Default 3:2. */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function WorkshopImage({
  caption,
  src,
  alt = "",
  aspect = "aspect-[3/2]",
  sizes = "(max-width: 860px) 100vw, 50vw",
  priority = false,
  className = "",
}: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${aspect} ${className}`.trim()}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative flex items-end overflow-hidden ${aspect} ${className}`.trim()}
      style={{
        background:
          "repeating-linear-gradient(135deg, #131313, #131313 11px, #191919 11px, #191919 12px)",
      }}
    >
      <span className="p-4 text-[11px] font-bold uppercase tracking-[0.16em] text-on-dark-muted">
        {caption}
      </span>
    </div>
  );
}
