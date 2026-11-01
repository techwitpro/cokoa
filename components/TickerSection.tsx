"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TickerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const marqueeItems = [
    { type: "text", content: "Italian" },
    { type: "text", content: "Cheese" },
    { type: "image", src: "/images/branding_image_2_6599_12200-56586a.png", alt: "Signature pasta dish" },
    { type: "text", content: "Mexican" },
    { type: "image", src: "/images/branding_image_1_6599_12204-56586a.png", alt: "Wood-fired artisanal pizza" },
    { type: "text", content: "Italian" },
    { type: "text", content: "Cheese" },
    { type: "image", src: "/images/branding_image_2_6599_12200-56586a.png", alt: "Signature burger" },
    { type: "text", content: "Mexican" },
    { type: "image", src: "/images/branding_image_1_6599_12204-56586a.png", alt: "Craft dessert" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Playful scroll-linked acceleration on the marquee
    if (trackRef.current && sectionRef.current) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() || 0);
          // Scale marquee animation speed with scroll velocity
          const speedMultiplier = Math.min(3.5, 1 + velocity / 900);
          if (trackRef.current) {
            trackRef.current.style.animationDuration = `${Math.max(7, 24 / speedMultiplier)}s`;
          }
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-label="Cuisine specialties continuous ticker"
      className="relative w-full bg-[#F9A70A] h-[210px] flex items-center overflow-x-clip overflow-y-visible select-none z-10"
    >
      {/* Top Scalloped Divider protruding UP into the Reservation Section matching Figma (node #6668:660) */}
      <div
        aria-hidden="true"
        className="absolute -top-[30px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-30 flex justify-center"
      >
        <Image
          src="/images/mask_group_6668_660.svg"
          alt=""
          width={1440}
          height={31}
          priority
          className="w-full h-[31px] object-fill select-none pointer-events-none"
        />
      </div>

      {/* Infinite Scrolling Marquee Track matching Figma */}
      <div className="w-full flex items-center overflow-hidden py-3">
        <div
          ref={trackRef}
          className="animate-marquee flex items-center gap-8 md:gap-10 whitespace-nowrap will-change-transform"
        >
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-10 flex-shrink-0">
              {item.type === "text" ? (
                <span className="font-ranchers text-6xl sm:text-7xl md:text-[90px] lg:text-[114px] leading-none text-white tracking-wider uppercase select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                  {item.content}
                </span>
              ) : (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[114px] lg:h-[114px] rounded-full overflow-hidden flex-shrink-0 shadow-md">
                  <Image
                    src={item.src!}
                    alt={item.alt!}
                    fill
                    sizes="114px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Duplicate for seamless infinite loop */}
          {marqueeItems.map((item, idx) => (
            <div key={`dup-${idx}`} aria-hidden="true" className="flex items-center gap-8 md:gap-10 flex-shrink-0">
              {item.type === "text" ? (
                <span className="font-ranchers text-6xl sm:text-7xl md:text-[90px] lg:text-[114px] leading-none text-white tracking-wider uppercase select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                  {item.content}
                </span>
              ) : (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[114px] lg:h-[114px] rounded-full overflow-hidden flex-shrink-0 shadow-md">
                  <Image
                    src={item.src!}
                    alt=""
                    fill
                    sizes="114px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Scalloped Divider protruding DOWN into the Dark Footer matching Figma (node #6668:637) */}
      <div
        aria-hidden="true"
        className="absolute -bottom-[30px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-30 flex justify-center"
      >
        <Image
          src="/images/mask_group_6668_637.svg"
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
