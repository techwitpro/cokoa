"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Award, Heart, Utensils, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const [showStoryModal, setShowStoryModal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pill1Ref = useRef<HTMLSpanElement>(null);
  const pill2Ref = useRef<HTMLSpanElement>(null);
  const dividerTopRef = useRef<HTMLDivElement>(null);
  const dividerBottomRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const capsule0Ref = useRef<HTMLDivElement>(null);
  const capsule1Ref = useRef<HTMLDivElement>(null);
  const capsule2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowStoryModal(false);
      }
    };
    if (showStoryModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showStoryModal]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Heading & Inline Image Pills Reveal
      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 88%",
          once: true,
        },
      });

      headTl
        .fromTo(
          headingRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        )
        .fromTo(
          [pill1Ref.current, pill2Ref.current],
          { scale: 0, rotation: -12, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "back.out(2.0)" },
          "-=0.4"
        )
        .fromTo(
          [dividerTopRef.current, dividerBottomRef.current],
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.25"
        )
        .fromTo(
          buttonRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.2"
        );

      // 2. 3 Stadium Arch Capsules Fluid Entrance
      const capsules = [capsule0Ref.current, capsule1Ref.current, capsule2Ref.current].filter(Boolean);
      if (capsules.length > 0) {
        gsap.fromTo(
          capsules,
          { y: 60, opacity: 0, scale: 0.94 },
          {
            scrollTrigger: {
              trigger: cardsTrackRef.current,
              start: "top 85%",
              once: true,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }
        );

        // 3. Smooth Scroll-Linked Horizontal Panoramic Drift (matching Figma x=-349px offset)
        if (cardsTrackRef.current) {
          gsap.fromTo(
            cardsTrackRef.current,
            { x: 50 },
            {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.0,
              },
              x: -90,
              ease: "none",
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = [
    {
      ref: capsule0Ref,
      src: "/images/about_image_1_6668_468-3a9639.png",
      alt: "Chef passionately crafting handmade artisanal pasta at COKOA",
    },
    {
      ref: capsule1Ref,
      src: "/images/about_image_2_6668_469.png",
      alt: "Delighted guest enjoying dinner and warm hospitality at COKOA",
    },
    {
      ref: capsule2Ref,
      src: "/images/about_image_3_6668_470.png",
      alt: "Crispy golden fried gourmet chicken specialty dish fresh from kitchen",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About COKOA"
      className="relative w-full bg-white pt-20 md:pt-28 pb-16 md:pb-24 overflow-x-clip overflow-y-visible"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Main Heading with Inline Image Pills matching Figma */}
        <div className="max-w-[840px] text-center flex flex-col items-center gap-6">
          <h2
            ref={headingRef}
            className="font-ranchers text-[#100B14] text-4xl sm:text-5xl md:text-[64px] leading-[1.2] tracking-[0.0313em] uppercase flex flex-col items-center justify-center gap-y-2 will-change-transform"
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span>Where</span>
              <span
                ref={pill1Ref}
                aria-hidden="true"
                className="inline-flex items-center justify-center w-14 sm:w-20 h-10 sm:h-14 rounded-[24px] overflow-hidden border border-[#100B14]/20 shadow-sm mx-1 align-middle select-none origin-center will-change-transform"
              >
                <Image
                  src="/images/title_capsule_6668_425.png"
                  alt=""
                  width={80}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </span>
              <span>Great Food</span>
            </span>
            <span className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span>Brings People</span>
              <span
                ref={pill2Ref}
                aria-hidden="true"
                className="inline-flex items-center justify-center w-14 sm:w-20 h-10 sm:h-14 rounded-[24px] overflow-hidden border border-[#100B14]/20 shadow-sm mx-1 align-middle select-none origin-center will-change-transform"
              >
                <Image
                  src="/images/title_capsule_6668_429.png"
                  alt=""
                  width={80}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </span>
              <span>Together</span>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="font-nunito text-[#100B14] text-lg sm:text-xl leading-relaxed text-center max-w-[680px]">
            Enjoy chef-crafted flavors, warm hospitality, and an inviting atmosphere made for unforgettable dining moments.
          </p>

          {/* Service Hours Bar with Decorative Dividers */}
          <div className="w-full max-w-[640px] mt-2 flex flex-col items-center gap-3">
            <div ref={dividerTopRef} className="w-full flex justify-center origin-center will-change-transform" aria-hidden="true">
              <Image
                src="/images/text_input_6668_435.svg"
                alt=""
                width={640}
                height={2}
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="font-ranchers text-[#100B14] text-xl sm:text-2xl md:text-[24px] tracking-[0.0833em] uppercase py-1 select-none">
              Daily Service · 11:30 AM — 11:30 PM
            </p>
            <div ref={dividerBottomRef} className="w-full flex justify-center origin-center will-change-transform" aria-hidden="true">
              <Image
                src="/images/text_input_6668_440.svg"
                alt=""
                width={640}
                height={2}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* About Us Button */}
          <div ref={buttonRef} className="mt-4">
            <button
              onClick={() => setShowStoryModal(true)}
              aria-haspopup="dialog"
              aria-expanded={showStoryModal}
              className="flex items-center gap-2.5 bg-white text-[#110F12] font-nunito font-bold text-base uppercase tracking-wider px-7 py-3 rounded-full border-2 border-[#100B14] shadow-retro-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#100B14]"
            >
              <span>About us</span>
              <Image
                src="/images/right_arrow_6668_464.svg"
                alt=""
                aria-hidden="true"
                width={18}
                height={14}
                className="w-4 h-3.5 object-contain"
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Arched Pill Images Gallery matching Figma specs (Container #6668:466 & #6668:467 at x=-349px, borderRadius: 680px, borderless) */}
      <div className="w-full mt-16 md:mt-24 overflow-visible">
        <div className="w-full flex items-center justify-center">
          <div
            ref={cardsTrackRef}
            className="group/track flex items-center justify-center min-w-[1050px] lg:min-w-[1860px] flex-shrink-0 cursor-pointer will-change-transform"
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                ref={img.ref}
                onClick={() => setShowStoryModal(true)}
                className="flex-shrink-0 will-change-transform group/card transition-opacity duration-300 group-hover/track:opacity-90 hover:!opacity-100"
              >
                {/* Borderless Stadium Capsule matching Figma node dimensions (w: 620px, h: 740px, borderRadius: 680px) */}
                <div className="relative w-[340px] sm:w-[440px] md:w-[520px] lg:w-[620px] h-[500px] sm:h-[600px] md:h-[680px] lg:h-[740px] rounded-[680px] overflow-hidden select-none transition-all duration-500 hover:shadow-[0_24px_60px_rgba(16,11,20,0.22)] hover:-translate-y-2">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 440px, 620px"
                    className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-106"
                    priority={idx === 1}
                  />
                  {/* Subtle soft vignette highlight on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us Story Modal */}
      {showStoryModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowStoryModal(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#100B14] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowStoryModal(false)}
              aria-label="Close story modal"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#100B14]/5 hover:bg-[#100B14] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#100B14]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F6E8FA] text-[#632C91] font-nunito font-bold text-xs uppercase tracking-wider mb-3">
              Our Heritage & Philosophy
            </span>
            <h3
              id="about-modal-title"
              className="font-ranchers text-3xl sm:text-4xl text-[#100B14] uppercase tracking-wide mb-6"
            >
              Crafting Memories Through Every Flavor
            </h3>

            <div className="space-y-4 font-nunito text-base text-[#100B14]/80 leading-relaxed">
              <p>
                Founded on the belief that dining is an art of connection, COKOA merges centuries-old culinary traditions with modern gourmet ingenuity. Every recipe begins with locally sourced, seasonal ingredients harvested at peak freshness.
              </p>
              <p>
                From our 800°F wood-fired hearth to our slow-simmered artisanal reductions, our kitchen is governed by passion, precision, and an unrelenting dedication to culinary excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col items-center text-center p-4 bg-[#F6E8FA] rounded-2xl">
                <Award className="w-7 h-7 text-[#632C91] mb-2" />
                <span className="font-ranchers text-xl text-[#100B14]">Michelin Guide</span>
                <span className="font-nunito text-xs text-gray-600 mt-0.5">Selected 2024</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-[#FFEFCB] rounded-2xl">
                <Heart className="w-7 h-7 text-[#F9A70A] mb-2" />
                <span className="font-ranchers text-xl text-[#100B14]">100% Organic</span>
                <span className="font-nunito text-xs text-gray-600 mt-0.5">Farm-to-Table</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-[#D3F36A]/30 rounded-2xl">
                <Utensils className="w-7 h-7 text-[#100B14] mb-2" />
                <span className="font-ranchers text-xl text-[#100B14]">Artisanal Daily</span>
                <span className="font-nunito text-xs text-gray-600 mt-0.5">Scratch Kitchen</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
