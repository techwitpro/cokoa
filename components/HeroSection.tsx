"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const starburstLeftRef = useRef<HTMLDivElement>(null);
  const starburstLeftInnerRef = useRef<HTMLDivElement>(null);
  const starburstRightRef = useRef<HTMLDivElement>(null);
  const starburstRightInnerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const dividerLineRef = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Page Load Snappy Reveal
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Subtle BG cinematic zoom
      tl.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1.0, duration: 1.4, ease: "power2.out" }
      );

      // Starburst pop-ins with energetic spring ease
      tl.fromTo(
        starburstLeftRef.current,
        { scale: 0, rotation: -40, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: "back.out(2.2)" },
        0.1
      );
      tl.fromTo(
        starburstRightRef.current,
        { scale: 0, rotation: 40, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: "back.out(2.2)" },
        0.15
      );

      // Typography Line 1: Modern 3D Perspective Roll-up
      tl.fromTo(
        line1Ref.current,
        { y: 45, opacity: 0, rotateX: 20, transformPerspective: 800 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.75, ease: "power4.out" },
        0.15
      );

      // Decorative divider expands from center with back ease
      tl.fromTo(
        dividerLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
        0.28
      );

      // Typography Line 2: Modern 3D Perspective Roll-up
      tl.fromTo(
        line2Ref.current,
        { y: 45, opacity: 0, rotateX: -20, transformPerspective: 800 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.75, ease: "power4.out" },
        0.35
      );

      // 2. Continuous Organic Starburst Idle Wobble (applied to INNER refs to prevent ScrollTrigger matrix collision)
      gsap.to(starburstLeftInnerRef.current, {
        y: "-=12",
        rotation: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(starburstRightInnerRef.current, {
        y: "+=12",
        rotation: 12,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.3,
      });

      // 3. Playful Scroll-linked Parallax & Starburst Spin (applied to OUTER refs)
      gsap.to([line1Ref.current, dividerLineRef.current, line2Ref.current], {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
        y: -70,
        ease: "none",
      });

      gsap.to(starburstLeftRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.0,
        },
        y: -90,
        rotation: -75,
        ease: "none",
      });

      gsap.to(starburstRightRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.0,
        },
        y: -90,
        rotation: 75,
        ease: "none",
      });

      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
        y: 60,
        ease: "none",
      });
    }, heroRef);

    // 4. Subtle mouse parallax on desktop (animates x only to avoid colliding with ScrollTrigger y scrub)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;

      if (starburstLeftRef.current) {
        gsap.to(starburstLeftRef.current, {
          x: xNorm * 14,
          duration: 0.6,
          ease: "power1.out",
        });
      }
      if (starburstRightRef.current) {
        gsap.to(starburstRightRef.current, {
          x: -xNorm * 14,
          duration: 0.6,
          ease: "power1.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero Introduction"
      className="relative w-full h-[824px] min-h-[640px] flex flex-col justify-end items-center overflow-hidden bg-[#100B14]"
    >
      {/* Background Hero Image with parallax container */}
      <div ref={bgRef} className="absolute inset-0 z-0 origin-center will-change-transform">
        <Image
          src="/images/image_6668_331-2a877a.png"
          alt="COKOA artisanal restaurant interior with warm ambient dining lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.92]"
        />
        {/* Subtle top/bottom gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/40 pointer-events-none" />
      </div>

      {/* Center Hero Typography & Badges */}
      <div className="relative z-10 w-full max-w-[920px] mx-auto px-6 mb-24 md:mb-28 flex flex-col items-center">
        <div className="relative w-full flex flex-col items-center">
          {/* Left Decorative Starburst */}
          <div
            ref={starburstLeftRef}
            aria-hidden="true"
            className="absolute -left-2 sm:left-2 md:-left-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none will-change-transform"
          >
            <div ref={starburstLeftInnerRef} className="will-change-transform">
              <Image
                src="/images/asset_6668_403.svg"
                alt=""
                width={71}
                height={61}
                className="w-10 h-9 sm:w-14 sm:h-12 md:w-[71px] md:h-[61px] drop-shadow-md select-none"
              />
            </div>
          </div>

          {/* Right Decorative Starburst */}
          <div
            ref={starburstRightRef}
            aria-hidden="true"
            className="absolute -right-2 sm:right-2 md:-right-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none will-change-transform"
          >
            <div ref={starburstRightInnerRef} className="will-change-transform">
              <Image
                src="/images/vector_6668_413.svg"
                alt=""
                width={61}
                height={62}
                className="w-9 h-9 sm:w-12 sm:h-12 md:w-[61px] md:h-[62px] drop-shadow-md filter brightness-110 select-none"
              />
            </div>
          </div>

          {/* Main H1 Heading */}
          <h1 className="font-ranchers text-[#FFEFCB] text-6xl sm:text-8xl md:text-[110px] lg:text-[140px] leading-[0.95] tracking-[0.0214em] uppercase text-center select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <span ref={line1Ref} className="block will-change-transform">
              Every Bite
            </span>

            {/* Center Decorative Divider Line */}
            <span className="w-full flex justify-center my-1 sm:my-2 md:my-3">
              <span
                ref={dividerLineRef}
                className="w-[85%] max-w-[610px] block pointer-events-none origin-center will-change-transform"
              >
                <Image
                  src="/images/hero_line.svg"
                  alt=""
                  aria-hidden="true"
                  width={610}
                  height={13}
                  className="w-full h-auto object-contain drop-shadow"
                />
              </span>
            </span>

            <span ref={line2Ref} className="block will-change-transform">
              Feels Special
            </span>
          </h1>
        </div>
      </div>

      {/* Scalloped White Transition Divider protruding UP into Hero matching Figma (#6668:332) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-20 w-full overflow-hidden leading-none pointer-events-none translate-y-[1px]"
      >
        <Image
          src="/images/mask_group_6668_332.svg"
          alt=""
          width={1440}
          height={31}
          priority
          className="w-full h-[31px] object-fill select-none pointer-events-none"
        />
      </div>
    </section>
  );
}
