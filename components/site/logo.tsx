import clsx from "clsx";

/** Semnul Codito (varianta A): „c” geometric + cursor galben care clipește. */
export function LogoMark({ className, blink = true }: { className?: string; blink?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={clsx("size-10 shrink-0 drop-shadow-[0_6px_10px_rgb(240_100_58/.35)]", className)}>
      <rect width="64" height="64" rx="18" fill="#F0643A" />
      <path d="M35 22.5a12 12 0 1 0 0 19" fill="none" stroke="#fff" strokeWidth="7.5" strokeLinecap="round" />
      <rect x="42" y="39" width="12" height="6" rx="3" fill="#FFE08A" className={blink ? "animate-blink" : undefined} />
    </svg>
  );
}

export function Wordmark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <b className={clsx("font-display text-[1.45rem] font-bold leading-none tracking-[-0.02em]", light ? "text-white" : "text-ink", className)}>
      Codit<span className="text-coral">o</span>
    </b>
  );
}
