"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MomentGallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Heading Reveal
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 92%",
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
        }
      );

      // 2. Playful Interactive Card Fanning Spread
      const cards = [
        { el: card0Ref.current, targetRot: -4.0, startX: 50 },
        { el: card1Ref.current, targetRot: -1.5, startX: 18 },
        { el: card2Ref.current, targetRot: 1.5, startX: -18 },
        { el: card3Ref.current, targetRot: 4.0, startX: -50 },
      ];

      cards.forEach((c, idx) => {
        if (!c.el) return;
        gsap.fromTo(
          c.el,
          {
            x: c.startX,
            rotation: 0,
            scale: 0.95,
            opacity: 0,
            y: 35,
          },
          {
            scrollTrigger: {
              trigger: card0Ref.current,
              start: "top 92%",
              once: true,
            },
            x: 0,
            rotation: c.targetRot,
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: idx * 0.07,
            ease: "back.out(1.6)",
          }
        );
      });

      // Subtle scroll scrub on the gallery track container (leaves individual card rotations/transforms clean)
      if (galleryTrackRef.current) {
        gsap.to(galleryTrackRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1.0,
          },
          y: -30,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const galleryItems = [
    {
      ref: card0Ref,
      src: "/images/gallery_image_2_6644_16184-56586a.png",
      alt: "Curated appetizer spread with artisanal bread, olives and dipping oils",
      rotation: "-rotate-2",
      widthClass: "w-[280px] sm:w-[380px] md:w-[460px] lg:w-[513px]",
      heightClass: "h-[340px] sm:h-[440px] md:h-[520px] lg:h-[576px]",
      title: "Artisanal Table Spread",
    },
    {
      ref: card1Ref,
      src: "/images/gallery_image_6644_16186.png",
      alt: "Guests raising glasses in a joyous evening dinner celebration",
      rotation: "rotate-1",
      widthClass: "w-[310px] sm:w-[420px] md:w-[520px] lg:w-[592px]",
      heightClass: "h-[360px] sm:h-[490px] md:h-[600px] lg:h-[678px]",
      title: "Evening Cheers & Toast",
    },
    {
      ref: card2Ref,
      src: "/images/gallery_image_4_6644_16188-56586a.png",
      alt: "Chef preparing dinner over glowing hearth fire flames",
      rotation: "-rotate-1",
      widthClass: "w-[240px] sm:w-[320px] md:w-[370px] lg:w-[410px]",
      heightClass: "h-[290px] sm:h-[390px] md:h-[450px] lg:h-[486px]",
      title: "Chef's Hearth Fire",
    },
    {
      ref: card3Ref,
      src: "/images/gallery_image_6644_16190.png",
      alt: "Handcrafted cocktail with fresh rosemary and citrus garnish",
      rotation: "rotate-2",
      widthClass: "w-[260px] sm:w-[350px] md:w-[410px] lg:w-[462px]",
      heightClass: "h-[310px] sm:h-[410px] md:h-[480px] lg:h-[528px]",
      title: "Craft Cocktails & Conversation",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="moments"
      aria-label="Restaurant Atmosphere Gallery"
      className="relative w-full bg-[#D3F36A] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Section Heading matching Figma */}
        <div ref={headingRef} className="text-center max-w-[800px] mb-12 md:mb-16 will-change-transform">
          <h2 className="font-ranchers text-4xl sm:text-5xl md:text-[64px] text-[#100B14] leading-[1.1] tracking-[0.0313em] uppercase">
            Make Every
            <span className="block">Moment Count</span>
          </h2>
        </div>
      </div>

      {/* Fanned Overlapping Photo Gallery spanning full viewport width edge-to-edge matching Figma (-151px overlap) */}
      <div className="w-full overflow-hidden py-6">
        <div className="w-screen relative left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div
            ref={galleryTrackRef}
            className="flex items-center justify-center min-w-[1100px] lg:min-w-[1530px] -space-x-16 sm:-space-x-24 md:-space-x-32 lg:-space-x-[151px] px-8 will-change-transform"
          >
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                ref={item.ref}
                className="flex-shrink-0 will-change-transform z-10 hover:z-30"
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(item.src)}
                  aria-label={`View enlarged photo: ${item.title}`}
                  className={`group relative ${item.widthClass} ${item.heightClass} rounded-[36px] sm:rounded-[48px] overflow-hidden shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#100B14]`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 300px, 592px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white p-4">
                    <div className="w-12 h-12 rounded-full bg-[#100B14] text-[#D3F36A] flex items-center justify-center shadow-lg" aria-hidden="true">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                    <span className="font-ranchers text-xl sm:text-2xl text-center uppercase tracking-wide">
                      {item.title}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for enlarged viewing */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged gallery photo"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div
            className="fixed inset-0"
            onClick={() => setSelectedImage(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-4xl max-h-[85vh] w-full h-[70vh] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
            <Image
              src={selectedImage}
              alt="Enlarged dining moment at COKOA"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close enlarged photo"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#100B14]/80 text-white hover:bg-white hover:text-[#100B14] flex items-center justify-center transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
