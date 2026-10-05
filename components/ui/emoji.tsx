import clsx from "clsx";

/** Emoji nativ: pe iPhone/Mac apare în stilul Apple, pe Android în stilul Google. */
export function E({ e, label, className }: { e: string; label?: string; className?: string }) {
  return label
    ? <span role="img" aria-label={label} className={clsx("emoji", className)}>{e}</span>
    : <span aria-hidden className={clsx("emoji", className)}>{e}</span>;
}

/** Emoji într-un pătrat moale, ca iconiță prietenoasă. */
export function EBadge({ e, className = "size-11 text-[1.35rem] bg-cream" }: { e: string; className?: string }) {
  return <span aria-hidden className={clsx("emoji-badge", className)}>{e}</span>;
}
