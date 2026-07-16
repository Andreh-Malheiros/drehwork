"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

const STORAGE_KEY = "dreh:intro";
const LOCK_CLASS = "intro-scroll-lock";
const READY_TIMEOUT = 3200;
const MIN_BRAND_TIME = 620;
const REDUCED_BRAND_TIME = 240;
const EXIT_FALLBACK_DURATION = 2300;
// Covers readiness timeout, minimum brand time, exit animation and a small safety margin.
const INTRO_WATCHDOG_DURATION = READY_TIMEOUT + MIN_BRAND_TIME + EXIT_FALLBACK_DURATION + 1200;
const EXIT_DURATION = 860;
const EXIT_DELAY = 120;
const EXIT_STAGGER = 34;
const BLOCKED_SCROLL_KEYS = new Set([" ", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "PageDown", "PageUp", "Home", "End"]);

type IntroLock = {
  release: () => void;
  signal: AbortSignal;
};

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "seen";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "seen");
  } catch {}
}

function restoreOverflow(element: HTMLElement, previous: string) {
  if (previous) {
    element.style.overflow = previous;
    return;
  }
  element.style.removeProperty("overflow");
}

function acquireIntroLock(rootElement: HTMLElement, onWatchdog: () => void): IntroLock {
  const controller = new AbortController();
  const html = document.documentElement;
  const body = document.body;
  const hadLockClass = html.classList.contains(LOCK_CLASS);
  const previousHtmlOverflow = html.style.overflow;
  const previousBodyOverflow = body.style.overflow;
  const restoreInert = Array.from(body.children)
    .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== rootElement)
    .map((element) => [element, element.inert] as const);
  let released = false;

  html.classList.add(LOCK_CLASS);
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  restoreInert.forEach(([element]) => {
    element.inert = true;
  });

  if (document.activeElement instanceof HTMLElement && !rootElement.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  const blockEvent = (event: Event) => event.preventDefault();
  const blockKeys = (event: KeyboardEvent) => {
    if (BLOCKED_SCROLL_KEYS.has(event.key)) event.preventDefault();
  };
  const keepFocusOffPage = (event: FocusEvent) => {
    if (event.target instanceof Node && !rootElement.contains(event.target)) {
      event.preventDefault();
      if (event.target instanceof HTMLElement) event.target.blur();
    }
  };

  window.addEventListener("wheel", blockEvent, { passive: false, signal: controller.signal });
  window.addEventListener("touchmove", blockEvent, { passive: false, signal: controller.signal });
  window.addEventListener("keydown", blockKeys, { capture: true, signal: controller.signal });
  document.addEventListener("focusin", keepFocusOffPage, { capture: true, signal: controller.signal });

  const watchdog = window.setTimeout(onWatchdog, INTRO_WATCHDOG_DURATION);

  return {
    signal: controller.signal,
    release() {
      if (released) return;
      released = true;
      window.clearTimeout(watchdog);
      controller.abort();
      if (!hadLockClass) html.classList.remove(LOCK_CLASS);
      restoreOverflow(html, previousHtmlOverflow);
      restoreOverflow(body, previousBodyOverflow);
      restoreInert.forEach(([element, inert]) => {
        element.inert = inert;
      });
    },
  };
}

async function waitForPaint() {
  await nextFrame();
  await nextFrame();
}

async function waitForFirstViewportReady(signal: AbortSignal, timeout = READY_TIMEOUT) {
  const waitForFonts = "fonts" in document ? document.fonts.ready.catch(() => undefined) : Promise.resolve();
  const waitForHero = new Promise<void>((resolve) => {
    const findHero = () => {
      if (signal.aborted) {
        resolve();
        return;
      }
      const hero = document.querySelector<HTMLElement>(".glsl-hero, .home-hero, .hero, .page-hero");
      if (hero && hero.getBoundingClientRect().height > 0) {
        resolve();
        return;
      }
      requestAnimationFrame(findHero);
    };
    findHero();
  });

  const waitForCriticalImages = () => {
    const images = Array.from(document.images).filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    if (!images.length) return Promise.resolve();
    return Promise.allSettled(images.map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }));
  };

  await Promise.race([
    (async () => {
      await waitForHero;
      await Promise.all([waitForFonts, waitForCriticalImages()]);
      await waitForPaint();
    })(),
    wait(timeout),
  ]);
}

async function animateIntroExit(rootElement: HTMLElement, signal: AbortSignal) {
  const animatedColumns = Array.from(rootElement.querySelectorAll<HTMLElement>(".intro-loader-column"))
    .filter((column) => column.getClientRects().length > 0);
  const brand = rootElement.querySelector<HTMLElement>(".intro-loader-brand");

  if (!("animate" in rootElement) || !animatedColumns.length) {
    await wait(EXIT_FALLBACK_DURATION);
    return;
  }

  const animations = animatedColumns.map((column, index) => column.animate(
    [
      { transform: "translate3d(0,0,0)" },
      { transform: "translate3d(0,-102%,0)" },
    ],
    {
      duration: EXIT_DURATION,
      delay: EXIT_DELAY + index * EXIT_STAGGER,
      easing: "cubic-bezier(.72,0,.18,1)",
      fill: "forwards",
    },
  ));

  if (brand) {
    animations.push(brand.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 180, easing: "ease", fill: "forwards" },
    ));
  }

  const fallback = wait(EXIT_FALLBACK_DURATION);
  await Promise.race([
    Promise.allSettled(animations.map((animation) => animation.finished)),
    fallback,
  ]);

  if (signal.aborted) return;
  animations.forEach((animation) => {
    try {
      animation.commitStyles();
    } catch {}
    animation.cancel();
  });
}

export function IntroActivation() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"waiting" | "exiting">("waiting");
  const root = useRef<HTMLDivElement>(null);
  const columns = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = hasSeenIntro();

    const rootElement = root.current;
    if (!rootElement) return undefined;

    if (alreadySeen) {
      // React applies layout-effect updates before paint; this skips the intro without acquiring the lock.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return undefined;
    }

    const startedAt = performance.now();
    let exitFallback = 0;
    let completed = false;

    const complete = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(exitFallback);
      lock.release();
      markIntroSeen();
      if (!rootElement.isConnected) return;
      flushSync(() => setVisible(false));
    };

    const lock = acquireIntroLock(rootElement, complete);

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target === rootElement && event.animationName === "introLayerRelease") complete();
    };
    const handlePageLifecycle = () => complete();
    rootElement.addEventListener("animationend", handleAnimationEnd, { signal: lock.signal });
    window.addEventListener("pagehide", handlePageLifecycle, { signal: lock.signal });
    window.addEventListener("pageshow", handlePageLifecycle, { signal: lock.signal });
    document.addEventListener("visibilitychange", handlePageLifecycle, { signal: lock.signal });

    const startExit = async () => {
      try {
        await waitForFirstViewportReady(lock.signal, READY_TIMEOUT);
        if (lock.signal.aborted) return;
        const minimum = reducedMotion ? REDUCED_BRAND_TIME : MIN_BRAND_TIME;
        await wait(Math.max(0, minimum - (performance.now() - startedAt)));
        if (lock.signal.aborted) return;
        if (reducedMotion) return;
        await waitForPaint();
        if (lock.signal.aborted) return;
        setPhase("exiting");
        exitFallback = window.setTimeout(complete, EXIT_FALLBACK_DURATION + 200);
        await animateIntroExit(rootElement, lock.signal);
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Intro activation failed; releasing page.", error);
        }
      } finally {
        complete();
      }
    };

    void startExit().catch((error) => {
      if (process.env.NODE_ENV !== "production") {
        console.error("Intro activation failed outside guarded flow; releasing page.", error);
      }
      complete();
    });

    return () => {
      window.clearTimeout(exitFallback);
      lock.release();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-activation" data-phase={phase} ref={root} aria-hidden="true">
      <strong className="intro-loader-brand" data-phase={phase}>DREH WORK</strong>
      {columns.map((column) => (
        <div
          className="intro-loader-column"
          data-phase={phase}
          data-tablet-hidden={column > 13 ? "" : undefined}
          data-mobile-hidden={column > 11 ? "" : undefined}
          key={column}
          style={{ "--intro-index": column } as CSSProperties}
        />
      ))}
    </div>
  );
}
