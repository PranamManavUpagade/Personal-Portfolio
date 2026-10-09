"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/content";
import { SectionHeading } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/hooks";

function Diagram({ type }: { type?: CaseStudy["diagram"] }) {
  if (type === "journey") {
    return (
      <svg viewBox="0 0 320 80" className="mt-4 w-full text-[var(--accent)]" aria-hidden>
        <defs>
          <linearGradient id="j" x1="0" x2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M10 55 C 60 55, 70 20, 110 20 S 170 60, 210 40 S 270 15, 310 25"
          fill="none"
          stroke="url(#j)"
          strokeWidth="2"
        />
        {[
          { x: 30, label: "Order" },
          { x: 110, label: "Delay" },
          { x: 210, label: "Ticket" },
          { x: 290, label: "Self-serve" },
        ].map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.x === 210 ? 40 : n.x === 110 ? 20 : n.x === 290 ? 25 : 55} r="4" fill="currentColor" />
            <text x={n.x} y="74" textAnchor="middle" className="fill-[var(--fg-subtle)]" fontSize="9" fontFamily="monospace">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (type === "segments") {
    return (
      <svg viewBox="0 0 320 80" className="mt-4 w-full" aria-hidden>
        {[
          { x: 40, r: 28, opacity: 0.9, label: "High LTV" },
          { x: 130, r: 22, opacity: 0.55, label: "At risk" },
          { x: 210, r: 18, opacity: 0.35, label: "Churned" },
          { x: 280, r: 14, opacity: 0.2, label: "New" },
        ].map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={36} r={c.r} fill="var(--accent)" fillOpacity={c.opacity} />
            <text x={c.x} y="74" textAnchor="middle" className="fill-[var(--fg-subtle)]" fontSize="9" fontFamily="monospace">
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (type === "mvp") {
    return (
      <svg viewBox="0 0 320 80" className="mt-4 w-full" aria-hidden>
        {["Goals", "Journeys", "Progress", "Nudges"].map((label, i) => (
          <g key={label}>
            <rect
              x={12 + i * 78}
              y={18}
              width="66"
              height="36"
              rx="8"
              fill="var(--accent-soft)"
              stroke="var(--accent)"
              strokeOpacity={0.4}
            />
            <text
              x={45 + i * 78}
              y="40"
              textAnchor="middle"
              className="fill-[var(--fg)]"
              fontSize="10"
              fontFamily="monospace"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  return null;
}

function StatBars({ stats }: { stats: NonNullable<CaseStudy["stats"]> }) {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="mt-6 space-y-3">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="mb-1.5 flex justify-between text-xs text-[var(--fg-muted)]">
            <span>{s.label}</span>
            <span className="font-mono text-[var(--fg)]">
              {s.value}
              {s.suffix}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-subtle)]">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-700 ease-[var(--ease-out-expo)]"
              style={{ width: ready || reduced ? `${s.value}%` : "0%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`case-${study.id}-title`}
    >
      <motion.article
        layoutId={reduced ? undefined : `case-${study.id}`}
        className="glass max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[1.25rem] border border-[var(--border-strong)] sm:rounded-[var(--radius-xl)]"
        onClick={(e) => e.stopPropagation()}
        initial={reduced ? false : { y: 24, opacity: 0.96 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduced ? undefined : { y: 16, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--border)] bg-[var(--bg-glass)] px-6 py-5 backdrop-blur-md">
          <div>
            <p className="label-mono text-[var(--accent)]">{study.subtitle}</p>
            <h3
              id={`case-${study.id}-title`}
              className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]"
            >
              {study.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
            aria-label="Close case study"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-8 px-6 py-6">
          <div className="flex flex-wrap gap-2">
            {study.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-[11px] text-[var(--fg-muted)]"
              >
                {t}
              </span>
            ))}
          </div>

          <Diagram type={study.diagram} />
          {study.stats && <StatBars stats={study.stats} />}

          {study.sections.map((s) => (
            <div key={s.title}>
              <h4 className="font-[family-name:var(--font-display)] text-lg text-[var(--fg)]">
                {s.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{s.body}</p>
            </div>
          ))}
        </div>
      </motion.article>
    </motion.div>
  );
}

export function CaseStudies() {
  const [active, setActive] = useState<CaseStudy | null>(null);
  const reduced = useReducedMotion();

  return (
    <section id="case-studies" className="section">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Case studies"
            title="Product thinking under real constraints."
            description="Three featured studies spanning support ops, retention analytics, and a 0→1 AI-assisted MVP."
          />
        </Reveal>

        <LayoutGroup>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {caseStudies.map((study, i) => (
              <StaggerItem
                key={study.id}
                className={i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : undefined}
              >
                <motion.div layoutId={reduced ? undefined : `case-${study.id}`}>
                  <SpotlightCard
                    as="button"
                    onClick={() => setActive(study)}
                    className="flex h-full min-h-[280px] flex-col p-6 text-left"
                  >
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--border)] bg-[var(--bg)]/40 px-2.5 py-1 font-mono text-[11px] text-[var(--fg-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
                      {study.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--accent)]">{study.subtitle}</p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                      {study.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--fg)]">
                      Read case study
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                      <ArrowUpRight className="sr-only" />
                    </span>
                  </SpotlightCard>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          <AnimatePresence>
            {active && (
              <CaseStudyModal study={active} onClose={() => setActive(null)} />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
