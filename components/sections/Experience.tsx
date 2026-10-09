"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/data/content";
import { SectionHeading } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks";

export function Experience() {
  const [openId, setOpenId] = useState<string>(experience[0]?.id ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 40%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Shipping products across studios and startups."
            description="An interactive timeline of roles where delivery discipline met product ownership."
          />
        </Reveal>

        <div ref={containerRef} className="relative mt-14 pl-2 sm:pl-4">
          {/* Timeline track */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--border)] sm:left-[19px]" aria-hidden>
            <motion.div
              className="origin-top w-full bg-[var(--accent)]"
              style={{ height: reduced ? "100%" : lineHeight }}
            />
          </div>

          <ul className="space-y-4">
            {experience.map((role) => {
              const isOpen = openId === role.id;
              return (
                <li key={role.id} className="relative pl-10 sm:pl-14">
                  <span
                    className={cn(
                      "absolute left-[5px] top-6 size-3.5 rounded-full border-2 transition-colors sm:left-[13px]",
                      isOpen
                        ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]"
                        : "border-[var(--border-strong)] bg-[var(--bg)]"
                    )}
                    aria-hidden
                  />

                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? "" : role.id)}
                    aria-expanded={isOpen}
                    className={cn(
                      "w-full rounded-[var(--radius-lg)] border p-5 text-left transition-all duration-300 sm:p-6",
                      isOpen
                        ? "border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-[0_0_0_1px_var(--accent-soft)]"
                        : "border-[var(--border)] bg-transparent hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]/60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="label-mono text-[var(--accent)]">{role.period}</p>
                        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                          {role.title}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--fg-muted)]">
                          {role.company} · {role.location}
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          "mt-1 size-5 shrink-0 text-[var(--fg-subtle)] transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                        aria-hidden
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-5 space-y-2.5 border-t border-[var(--border)] pt-5">
                            {role.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex gap-2.5 text-sm leading-relaxed text-[var(--fg-muted)]"
                              >
                                <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                                {b}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {role.tools.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-[11px] text-[var(--fg-muted)]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isOpen && (
                      <ul className="mt-4 space-y-1.5">
                        {role.bullets.slice(0, 2).map((b) => (
                          <li
                            key={b}
                            className="truncate text-sm text-[var(--fg-subtle)]"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
