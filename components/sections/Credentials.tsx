"use client";

import { credentials } from "@/data/content";
import { SectionHeading } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GraduationCap, Award } from "lucide-react";

export function Credentials() {
  return (
    <section id="credentials" className="section">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Credentials"
            title="Formal grounding in product and engineering."
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-4 md:grid-cols-2" stagger={0.1}>
          {credentials.map((c, i) => (
            <StaggerItem key={c.title}>
              <SpotlightCard className="h-full p-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--accent-soft)] text-[var(--accent)]">
                    {i === 0 ? (
                      <Award className="size-4" aria-hidden />
                    ) : (
                      <GraduationCap className="size-4" aria-hidden />
                    )}
                  </span>
                  <div>
                    <p className="label-mono text-[var(--accent)]">{c.period}</p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--fg-muted)]">{c.org}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--fg-subtle)]">
                      {c.details}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
