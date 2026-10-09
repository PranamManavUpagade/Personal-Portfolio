"use client";

import { about } from "@/data/content";
import { SectionHeading } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Product delivery meets AI product thinking."
            description={about.narrative}
          />
        </Reveal>

        <div className="mt-14">
          <Reveal delay={0.1}>
            <h3 className="label-mono mb-6 text-[var(--accent)]">How I work</h3>
          </Reveal>
          <Stagger className="grid gap-4 md:grid-cols-3" stagger={0.09}>
            {about.howIWork.map((item, i) => (
              <StaggerItem key={item.title}>
                <SpotlightCard className="h-full p-6">
                  <span className="font-mono text-xs text-[var(--accent)]">
                    0{i + 1}
                  </span>
                  <h4 className="mt-3 font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                    {item.description}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
