import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered safely once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if user prefers reduced motion.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Creates a GSAP context for safe React lifecycle management and StrictMode compatibility.
 * @param {Function} callback - Animation setup callback
 * @param {HTMLElement|React.RefObject} scope - Scope element or ref
 * @returns {Function} Cleanup function
 */
export function createAnimationScope(callback, scope) {
  if (prefersReducedMotion()) {
    // If user prefers reduced motion, execute callback in no-op or static state
    return () => {};
  }

  const target = scope && "current" in scope ? scope.current : scope;
  const ctx = gsap.context(callback, target);
  return () => ctx.revert();
}

/**
 * Staggered text or element reveal on scroll.
 */
export function animateOnScroll(targets, vars = {}, triggerOptions = {}) {
  if (prefersReducedMotion() || !targets) return null;

  return gsap.from(targets, {
    opacity: 0,
    y: 35,
    duration: 0.9,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: triggerOptions.trigger || targets,
      start: triggerOptions.start || "top 85%",
      toggleActions: triggerOptions.toggleActions || "play none none none",
      ...triggerOptions,
    },
    ...vars,
  });
}

/**
 * Hero entrance animation timeline.
 */
export function createHeroTimeline(scopeRef, options = {}) {
  if (prefersReducedMotion() || !scopeRef?.current) return null;

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: options.delay || 0.15,
  });

  const el = scopeRef.current;
  const badge = el.querySelector("[data-hero-badge]");
  const titles = el.querySelectorAll("[data-hero-title]");
  const desc = el.querySelector("[data-hero-desc]");
  const cta = el.querySelector("[data-hero-cta]");
  const image = el.querySelector("[data-hero-image]");

  if (image) {
    tl.fromTo(
      image,
      { scale: 1.1, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" },
      0
    );
  }

  if (badge) {
    tl.fromTo(badge, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);
  }

  if (titles.length) {
    tl.fromTo(
      titles,
      { opacity: 0, y: 45, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.1, stagger: 0.15 },
      0.3
    );
  }

  if (desc) {
    tl.fromTo(desc, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9 }, 0.7);
  }

  if (cta) {
    tl.fromTo(cta, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, 0.85);
  }

  return tl;
}

export { gsap, ScrollTrigger };
