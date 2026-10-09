"use client";

import { useState } from "react";
import { marqueeTools, skillGroups } from "@/data/content";
import { SectionHeading } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState(skillGroups[0]?.id ?? "product");
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0];

  return (
    <section id="skills" className="section border-y border-[var(--border)] bg-[var(--bg-elevated)]/30">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Skills & tools"
            title="A toolkit that spans strategy, AI, and the stack."
            description="Product craft, AI fluency, collaboration tools, and enough engineering depth to ship with builders."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex flex-wrap gap-2"
          >
            {skillGroups.map((g) => (
              <button
                key={g.id}
                role="tab"
                type="button"
                aria-selected={active === g.id}
                onClick={() => setActive(g.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  active === g.id
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--fg)]"
                    : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Stagger
          key={group.id}
          className="mt-8 flex flex-wrap gap-2.5"
          stagger={0.04}
        >
          {group.skills.map((skill) => (
            <StaggerItem key={skill}>
              <span className="inline-flex rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2 text-sm text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]">
                {skill}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Slow marquee */}
      <div className="mt-16 overflow-hidden border-y border-[var(--border)] py-4" aria-hidden>
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {[...marqueeTools, ...marqueeTools].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-subtle)]"
            >
              {t}
              <span className="ml-8 text-[var(--accent)]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
