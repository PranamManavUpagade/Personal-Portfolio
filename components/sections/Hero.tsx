"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { hero, site } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { useMouseParallax } from "@/lib/hooks";
import { motionEase } from "@/components/ui/Reveal";

export function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const tilt = useMouseParallax(photoRef, 6);
  const reduced = useReducedMotion();

  const words = hero.headline.split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="aurora absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_65%)] opacity-40 blur-3xl" />
        <div
          className="aurora absolute -right-1/4 top-1/4 h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,var(--accent-secondary-soft)_0%,transparent_60%)] opacity-50 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.p
            className="label-mono mb-5 text-[var(--accent)]"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: motionEase }}
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.35rem)] leading-[1.12] tracking-tight text-[var(--fg)]">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="mr-[0.28em] inline-block"
                initial={reduced ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: reduced ? 0 : 0.08 + i * 0.035,
                  ease: motionEase,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduced ? 0 : 0.45, ease: motionEase }}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.55, ease: motionEase }}
          >
            <Button href={hero.ctas.primary.href}>{hero.ctas.primary.label}</Button>
            <Button href={hero.ctas.secondary.href} variant="secondary" download>
              {hero.ctas.secondary.label}
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-3"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.65 }}
          >
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label={`Email ${site.email}`}
            >
              <Mail className="size-4" aria-hidden />
            </a>
          </motion.div>
        </div>

        {/* Photo + floating chips */}
        <motion.div
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduced ? 0 : 0.25, ease: motionEase }}
        >
          <div
            ref={photoRef}
            className="relative aspect-[4/5] w-full"
            style={{
              perspective: 900,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-[var(--border-strong)] shadow-[0_0_60px_-20px_var(--accent-glow)] transition-transform duration-200 ease-out"
              style={{
                transform: reduced
                  ? undefined
                  : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-soft)] to-[var(--cyan-soft)]" />
              <Image
                src={site.photo}
                alt={`${site.name} — portrait`}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/50 via-transparent to-transparent" />
            </div>

            {/* Floating chips — tablet/desktop */}
            {hero.chips.map((chip, i) => {
              const positions = [
                "left-[-4%] top-[12%]",
                "right-[-6%] top-[42%]",
                "left-[6%] bottom-[10%]",
              ];
              return (
                <span
                  key={chip}
                  className={`float-chip glass absolute z-10 hidden rounded-full px-3 py-1.5 font-mono text-[11px] text-[var(--fg)] shadow-lg sm:inline-flex ${positions[i]}`}
                >
                  {chip}
                </span>
              );
            })}
          </div>

          {/* Compact chip row on mobile */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:hidden">
            {hero.chips.map((chip) => (
              <span
                key={chip}
                className="glass rounded-full px-3 py-1.5 font-mono text-[11px] text-[var(--fg)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <a
        href="#impact"
        className="mt-14 flex flex-col items-center gap-2 self-center text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg-muted)]"
        aria-label="Scroll to impact metrics"
      >
        <span className="label-mono text-[10px]">Scroll</span>
        <ArrowDown className="size-4 opacity-70" aria-hidden />
      </a>
    </section>
  );
}
