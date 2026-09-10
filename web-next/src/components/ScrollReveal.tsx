"use client";

import { useEffect } from "react";

const REVEAL_SELECTORS = [
  ".leader-card",
  ".volunteer-card",
  ".guru-card",
  ".pillar-card",
  ".program-row",
  ".stat-card",
  ".video-card",
  ".blog-card",
  ".press-item",
  ".timeline-year",
  ".archive-entry",
  ".donate-card",
  ".sgp-inner",
  ".story-inner",
];

/**
 * Ported as-is from the static site's main.js: queries the DOM for known
 * card-like classes (no markup changes needed on any page) and fades each
 * one up as it scrolls into view, staggering siblings within the same
 * container. Runs once per page mount.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>(
      REVEAL_SELECTORS.join(",")
    );
    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    revealEls.forEach((el) => el.classList.add("reveal-init"));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const siblings = Array.prototype.filter.call(
            el.parentElement?.children ?? [],
            (c: Element) => c.classList.contains("reveal-init")
          ) as Element[];
          const idx = siblings.indexOf(el);
          const delay = Math.min(Math.max(idx, 0) * 90, 360);
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          obs.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
