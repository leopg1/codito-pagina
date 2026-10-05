import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "main" | "wa" | "ghost" | "light";

const base =
  "group max-[400px]:!px-5 [text-wrap:balance] inline-flex items-center justify-center gap-2.5 rounded-full font-semibold text-[1.02rem] leading-tight transition-all duration-200 ease-out active:scale-[.98] text-center";
const variants: Record<Variant, string> = {
  main: "bg-cta text-white shadow-coral hover:bg-cta-d hover:-translate-y-0.5 px-7 py-[17px]",
  wa: "bg-wa text-white shadow-[0_12px_28px_-10px_rgb(17_128_69/.45)] hover:bg-[#0d6a38] hover:-translate-y-0.5 px-7 py-[17px]",
  ghost: "text-ink hover:text-coral-t px-3 py-[17px]",
  light: "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15 px-7 py-[17px]",
};

export function ButtonLink({
  href, children, variant = "main", arrow = false, className, external = false, ...rest
}: {
  href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string; external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
  return (
    <a
      href={href}
      className={clsx(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 max-[359px]:hidden" aria-hidden />}
    </a>
  );
}

export function WaIcon({ className = "size-5 shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 .9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />
    </svg>
  );
}
