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
        gsap.set(".split-word > span, [data-stagger] > *", { clearProps: "all" });
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

        // Section titles rise word by word, echoing the hero headline.
        gsap.utils.toArray<HTMLElement>(".split-heading").forEach(heading => {
          gsap.fromTo(heading.querySelectorAll(".split-word > span"), { yPercent: 105 }, {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.045,
            ease: "power4.out",
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          });
        });

        // Lists and grids settle in order once their section is reached.
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach(group => {
          // fromTo: explicit end state, so a CSS opacity transition can't leave items hidden.
          gsap.fromTo(group.children, { autoAlpha: 0, y: 22 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          });
        });

        document.querySelectorAll<HTMLElement>(".cta-band").forEach(band => {
          gsap.fromTo(band, { "--cta-rotate": "-14deg" }, {
            "--cta-rotate": "10deg",
            ease: "none",
            scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 0.8 },
          });
        });

        const heroSystem = document.querySelector<HTMLElement>(".hero-system");
        if (heroSystem && matchMedia("(min-width: 901px)").matches) {
          gsap.to(heroSystem, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: ".home-hero", start: "top top", end: "bottom top", scrub: 0.8 },
          });
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
