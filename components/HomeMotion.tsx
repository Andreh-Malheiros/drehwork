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
