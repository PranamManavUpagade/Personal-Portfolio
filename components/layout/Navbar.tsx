"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/data/content";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSectionObserver, useReducedMotion } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, toggle, hydrated } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const sectionIds = navLinks.map((l) => l.id);
  const active = useSectionObserver(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "glass border-b border-[var(--border)]" : "bg-transparent"
      )}
    >
      <nav
        className="container-x flex h-16 items-center justify-between gap-4"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--fg)]"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
          }}
        >
          <span className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--accent-soft)] font-mono text-xs text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
            {site.monogram}
          </span>
          <span className="hidden sm:inline">{site.shortName.split(" ")[0]}</span>
        </a>

        <ul className="relative hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} className="relative">
                <button
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm transition-colors",
                    isActive ? "text-[var(--fg)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-[var(--accent)]"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] p-2 text-[var(--fg-subtle)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)] lg:inline-flex"
            aria-label="Open search"
            title="Search"
          >
            <Search className="size-4" aria-hidden />
          </button>

          <button
            type="button"
            onClick={toggle}
            className="inline-flex size-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {hydrated && theme === "dark" ? (
              <Sun className="size-4" aria-hidden />
            ) : (
              <Moon className="size-4" aria-hidden />
            )}
          </button>

          <Button
            href="#contact"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
          >
            Let&apos;s talk
          </Button>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] text-[var(--fg)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-[var(--border)] md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className={cn(
                      "w-full rounded-[var(--radius-sm)] px-3 py-3 text-left text-base transition-colors",
                      active === link.id
                        ? "bg-[var(--accent-soft)] text-[var(--fg)]"
                        : "text-[var(--fg-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)]"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  href="#contact"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact");
                  }}
                >
                  Let&apos;s talk
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
