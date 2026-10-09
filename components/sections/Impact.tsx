"use client";

import { metrics } from "@/data/content";
import { AnimatedCounter } from "@/components/ui/SpotlightCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Impact() {
  return (
    <section id="impact" className="section border-y border-[var(--border)] bg-[var(--bg-elevated)]/40" aria-label="Impact metrics">
      <div className="container-x">
        <Reveal>
          <p className="label-mono mb-8 text-center text-[var(--accent)]">Impact</p>
        </Reveal>
        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {metrics.map((m) => (
            <StaggerItem key={m.label}>
              <div className="text-center sm:text-left">
                <p className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--fg)] sm:text-5xl">
                  <AnimatedCounter
                    value={m.value}
                    suffix={m.suffix}
                    prefix={m.prefix}
                  />
                </p>
                <p className="mt-2 text-sm leading-snug text-[var(--fg-muted)]">{m.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
