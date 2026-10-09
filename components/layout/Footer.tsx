"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/data/content";
import { useReducedMotion } from "@/lib/hooks";

export function Footer() {
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="container-x flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[var(--fg)]">{site.name}</p>
          <p className="mt-1 text-xs text-[var(--fg-subtle)]">
            © {year} · Built with Next.js
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
          }
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
        >
          Back to top
          <ArrowUp className="size-3.5" aria-hidden />
        </button>
      </div>
    </footer>
  );
}
