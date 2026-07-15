"use client";

import type { CSSProperties } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

const STORAGE_KEY = "dreh:intro";
const LOCK_CLASS = "intro-scroll-lock";
const READY_TIMEOUT = 3200;
const MIN_BRAND_TIME = 520;
const REDUCED_BRAND_TIME = 240;
const EXIT_FALLBACK_DURATION = 2100;
const BLOCKED_SCROLL_KEYS = new Set([" ", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "PageDown", "PageUp", "Home", "End"]);

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

async function waitForFirstViewportReady(signal: AbortSignal) {
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
      await nextFrame();
      await nextFrame();
    })(),
    wait(READY_TIMEOUT),
  ]);
}

export function IntroActivation() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"waiting" | "exiting">("waiting");
  const root = useRef<HTMLDivElement>(null);
  const columns = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY) === "seen";

    if (alreadySeen) {
      const frame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(frame);
    }

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.documentElement.classList.add(LOCK_CLASS);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const rootElement = root.current;
    const controller = new AbortController();
    const startedAt = performance.now();
    const restoreInert = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== rootElement)
      .map((element) => [element, element.inert] as const);
    restoreInert.forEach(([element]) => {
      element.inert = true;
    });
    if (document.activeElement instanceof HTMLElement && !rootElement?.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    let completed = false;
    let fallback = 0;

    const complete = () => {
      if (completed) return;
      if (!rootElement?.isConnected) return;
      completed = true;
      controller.abort();
      sessionStorage.setItem(STORAGE_KEY, "seen");
      document.documentElement.classList.remove(LOCK_CLASS);
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      restoreInert.forEach(([element, inert]) => {
        element.inert = inert;
      });
      flushSync(() => setVisible(false));
    };

    const blockEvent = (event: Event) => event.preventDefault();
    const blockKeys = (event: KeyboardEvent) => {
      if (BLOCKED_SCROLL_KEYS.has(event.key)) event.preventDefault();
    };
    const keepFocusOffPage = (event: FocusEvent) => {
      if (rootElement && event.target instanceof Node && !rootElement.contains(event.target)) {
        event.preventDefault();
        if (event.target instanceof HTMLElement) event.target.blur();
      }
    };

    window.addEventListener("wheel", blockEvent, { passive: false });
    window.addEventListener("touchmove", blockEvent, { passive: false });
    window.addEventListener("keydown", blockKeys, { capture: true });
    document.addEventListener("focusin", keepFocusOffPage, { capture: true });

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target === rootElement && event.animationName === "introLayerRelease") complete();
    };
    rootElement?.addEventListener("animationend", handleAnimationEnd);

    const startExit = async () => {
      await waitForFirstViewportReady(controller.signal);
      if (controller.signal.aborted) return;
      const minimum = reducedMotion ? REDUCED_BRAND_TIME : MIN_BRAND_TIME;
      await wait(Math.max(0, minimum - (performance.now() - startedAt)));
      if (controller.signal.aborted) return;
      if (reducedMotion) {
        complete();
        return;
      }
      setPhase("exiting");
      fallback = window.setTimeout(complete, EXIT_FALLBACK_DURATION);
    };

    startExit();

    return () => {
      controller.abort();
      rootElement?.removeEventListener("animationend", handleAnimationEnd);
      window.removeEventListener("wheel", blockEvent);
      window.removeEventListener("touchmove", blockEvent);
      window.removeEventListener("keydown", blockKeys, { capture: true });
      document.removeEventListener("focusin", keepFocusOffPage, { capture: true });
      window.clearTimeout(fallback);
      if (!completed) {
        document.documentElement.classList.remove(LOCK_CLASS);
        document.body.style.overflow = bodyOverflow;
        document.documentElement.style.overflow = htmlOverflow;
        restoreInert.forEach(([element, inert]) => {
          element.inert = inert;
        });
      }
    };
  }, []);

  useEffect(() => {
    if (visible) {
      return undefined;
    }
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.documentElement.classList.remove(LOCK_CLASS);
    return undefined;
  }, [visible]);

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
