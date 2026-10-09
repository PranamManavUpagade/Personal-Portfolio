"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CornerDownLeft } from "lucide-react";
import { navLinks, site } from "@/data/content";
import { useReducedMotion } from "@/lib/hooks";

const commands = [
  ...navLinks.map((l) => ({
    id: l.id,
    label: l.label,
    href: l.href,
    group: "Sections",
  })),
  {
    id: "resume",
    label: "Download resume",
    href: site.resumeUrl,
    group: "Actions",
  },
  {
    id: "email",
    label: "Email Pranam",
    href: `mailto:${site.email}`,
    group: "Actions",
  },
  {
    id: "linkedin",
    label: "Open LinkedIn",
    href: site.linkedin,
    group: "Actions",
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const run = useCallback(
    (href: string) => {
      close();
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      } else if (href.startsWith("mailto:") || href.startsWith("http")) {
        window.open(href, href.startsWith("http") ? "_blank" : undefined);
      } else {
        window.location.href = href;
      }
    },
    [close, reduced]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[active]) {
        e.preventDefault();
        run(filtered[active].href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, run]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Quick navigation"
        >
          <motion.div
            className="glass w-full max-w-lg overflow-hidden rounded-[var(--radius-lg)] shadow-2xl"
            initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <Search className="size-4 text-[var(--fg-subtle)]" aria-hidden />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section or action…"
                className="w-full bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)] outline-none"
                aria-label="Search commands"
              />
              <kbd className="hidden rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--fg-subtle)] sm:inline">
                esc
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-[var(--fg-muted)]">
                  No matches
                </li>
              )}
              {filtered.map((item, i) => (
                <li key={item.id} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between rounded-[var(--radius-sm)] px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active
                        ? "bg-[var(--accent-soft)] text-[var(--fg)]"
                        : "text-[var(--fg-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)]"
                    }`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(item.href)}
                  >
                    <span>
                      <span className="block font-medium text-[var(--fg)]">{item.label}</span>
                      <span className="label-mono mt-0.5 block normal-case tracking-normal">
                        {item.group}
                      </span>
                    </span>
                    <CornerDownLeft className="size-3.5 opacity-40" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
