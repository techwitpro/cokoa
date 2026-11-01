"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with manual RAF coordinated directly by GSAP's ticker
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      autoRaf: false, // Prevents independent uncoordinated RAF loops
    });

    // Synchronize Lenis scroll position with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker for zero-latency frame lockstep
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when DOM assets finish loading
    const refreshTrigger = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshTrigger);
    const timer = setTimeout(refreshTrigger, 250);

    return () => {
      window.removeEventListener("load", refreshTrigger);
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
