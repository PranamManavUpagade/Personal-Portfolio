"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
  type ElementType,
} from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  href?: string;
  onClick?: () => void;
  glow?: boolean;
};

export function SpotlightCard({
  children,
  className,
  as: Comp = "div",
  href,
  onClick,
  glow = true,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <Comp
      ref={ref}
      href={href}
      type={Comp === "button" ? "button" : undefined}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out)]",
        !reduced &&
          "hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[0_0_0_1px_var(--accent-soft),0_20px_40px_-24px_var(--accent-glow)]",
        className
      )}
      style={
        glow && hover && !reduced
          ? {
              backgroundImage: `radial-gradient(500px circle at ${pos.x}% ${pos.y}%, var(--accent-soft), transparent 45%)`,
            }
          : undefined
      }
    >
      {children}
    </Comp>
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1200,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
