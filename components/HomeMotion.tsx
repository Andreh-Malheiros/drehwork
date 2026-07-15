"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HomeMotion() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      motion.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(elements, { autoAlpha: 1, y: 0, clearProps: "transform" });
      });

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(elements, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(elements, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
        });

        const heroSystem = document.querySelector<HTMLElement>(".hero-system");
        if (heroSystem && matchMedia("(min-width: 901px)").matches) {
          gsap.to(heroSystem, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: ".home-hero", start: "top top", end: "bottom top", scrub: 0.8 },
          });
        }

        const heroCopy = document.querySelector<HTMLElement>(".glsl-hero-copy");
        if (heroCopy) {
          gsap.fromTo(
            heroCopy.querySelectorAll("h1, p"),
            { autoAlpha: 0, filter: "blur(18px)" },
            { autoAlpha: 1, filter: "blur(0px)", duration: 1.25, stagger: 0.14, ease: "power3.out", delay: 0.18 },
          );
        }
      });

      motion.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const hero = document.querySelector<HTMLElement>(".glsl-hero");
        if (!hero) return undefined;

        let frame = 0;
        const setFromPointer = (event: PointerEvent) => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const rect = hero.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            hero.style.setProperty("--hero-x", `${(x * 100).toFixed(2)}%`);
            hero.style.setProperty("--hero-y", `${(y * 100).toFixed(2)}%`);
            hero.style.setProperty("--hero-rotate-x", `${((0.5 - y) * 7).toFixed(2)}deg`);
            hero.style.setProperty("--hero-rotate-y", `${((x - 0.5) * 8).toFixed(2)}deg`);
            hero.style.setProperty("--hero-drift-x", `${((x - 0.5) * 18).toFixed(2)}px`);
            hero.style.setProperty("--hero-drift-y", `${((y - 0.5) * 14).toFixed(2)}px`);
          });
        };

        const resetPointer = () => {
          cancelAnimationFrame(frame);
          hero.style.setProperty("--hero-x", "50%");
          hero.style.setProperty("--hero-y", "50%");
          hero.style.setProperty("--hero-rotate-x", "0deg");
          hero.style.setProperty("--hero-rotate-y", "0deg");
          hero.style.setProperty("--hero-drift-x", "0px");
          hero.style.setProperty("--hero-drift-y", "0px");
        };

        hero.addEventListener("pointermove", setFromPointer);
        hero.addEventListener("pointerleave", resetPointer);
        resetPointer();

        return () => {
          cancelAnimationFrame(frame);
          hero.removeEventListener("pointermove", setFromPointer);
          hero.removeEventListener("pointerleave", resetPointer);
        };
      });

      ScrollTrigger.create({
        start: 48,
        onEnter: () => document.body.setAttribute("data-scrolled", ""),
        onLeaveBack: () => document.body.removeAttribute("data-scrolled"),
      });
      document.body.toggleAttribute("data-scrolled", scrollY > 48);
    });

    return () => {
      motion.revert();
      context.revert();
      document.body.removeAttribute("data-scrolled");
    };
  }, [pathname]);

  return null;
}
