"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      image: "/images/testimonial_image_2_6599_11937-56586a.png",
      alt: "Sarah Mitchell smiling at her dining table",
      quote: "The food was absolutely amazing\nand the service made us feel right\nat home. One of the best dining\nexperiences we’ve had.",
      name: "Sarah Mitchell",
      role: "Review from Google",
    },
    {
      id: 2,
      image: "/images/testimonial_image_2_6599_11962-56586a.png",
      alt: "David Alexander dining with friends",
      quote: "From the wood-fired pizza to the smooth jazz evenings, COKOA has become our favorite weekly retreat in the city.",
      name: "David Alexander",
      role: "Review from OpenTable",
    },
    {
      id: 3,
      image: "/images/testimonial_image_2_6599_11937-56586a.png",
      alt: "Elena Rostova savoring dessert",
      quote: "The truffle beef burger and signature cocktails were perfection. Exceptional hospitality and vibrant, warm ambiance!",
      name: "Elena Rostova",
      role: "Review from TripAdvisor",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = document.getElementById("reviews");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        if (e.key === "ArrowLeft") {
          handlePrev();
        } else if (e.key === "ArrowRight") {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isReviewMounted = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Heading & Controls Reveal
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

      // 2. Initial Slide Container Reveal
      gsap.fromTo(
        slideContainerRef.current,
        { y: 35, opacity: 0, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: slideContainerRef.current,
            start: "top 90%",
            once: true,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Snappy slide change (skips initial mount to prevent low-opacity trap)
  useEffect(() => {
    if (!isReviewMounted.current) {
      isReviewMounted.current = true;
      return;
    }
    if (photoRef.current && cardRef.current) {
      gsap.fromTo(
        photoRef.current,
        { scale: 0.98, opacity: 0.8 },
        { scale: 1.0, opacity: 1.0, duration: 0.28, ease: "power2.out" }
      );
      gsap.fromTo(
        cardRef.current,
        { x: 10, opacity: 0.8 },
        { x: 0, opacity: 1.0, duration: 0.28, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      role="region"
      aria-roledescription="carousel"
      aria-label="Guest Testimonials"
      className="relative w-full py-28 md:py-36 overflow-x-clip overflow-y-visible"
    >
      {/* Background Image with Dark Tint Overlay matching Figma */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section_6599_11908-7e198b.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#100B14]/75 backdrop-blur-[1px]" />
      </div>

      {/* Top Scalloped Divider protruding DOWN into Dark Testimonials matching Figma (#6668:69) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 z-20 w-full overflow-hidden leading-none pointer-events-none -translate-y-[1px]"
      >
        <Image
          src="/images/mask_group_6668_69.svg"
          alt=""
          width={1440}
          height={31}
          priority
          className="w-full h-[31px] object-fill select-none pointer-events-none"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Section Header with Prev/Next Controls */}
        <div ref={headingRef} className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20 will-change-transform">
          <h2 className="font-ranchers text-4xl sm:text-5xl md:text-[64px] text-white leading-tight tracking-[0.0313em] uppercase drop-shadow-md">
            Trusted by Hundreds
            <span className="block">of Happy Guests</span>
          </h2>

          {/* Slider Buttons matching Figma: 72x72 with 24px radius */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-[24px] border border-[#F6E8FA] bg-white/10 hover:bg-white text-white hover:text-[#100B14] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Image
                src="/images/right_arrow_6599_11965.svg"
                alt=""
                aria-hidden="true"
                width={21}
                height={15}
                className="w-5 h-4 object-contain rotate-180 brightness-0 invert hover:brightness-0"
              />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-[24px] border border-[#F6E8FA] bg-white/10 hover:bg-white text-white hover:text-[#100B14] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Image
                src="/images/right_arrow_6599_11969.svg"
                alt=""
                aria-hidden="true"
                width={21}
                height={15}
                className="w-5 h-4 object-contain brightness-0 invert hover:brightness-0"
              />
            </button>
          </div>
        </div>

        {/* Testimonial Active Slide with ARIA Live */}
        <div
          ref={slideContainerRef}
          aria-live="polite"
          className="w-full max-w-[1020px] will-change-transform"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            {/* Left Photo (364x364) */}
            <div
              ref={photoRef}
              className="md:col-span-4 relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[364px] md:h-[364px] rounded-[32px] overflow-hidden border-2 border-white/20 shadow-2xl mx-auto md:mx-0 flex-shrink-0 bg-[#100B14] will-change-transform"
            >
              <Image
                key={current.image}
                src={current.image}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 300px, 364px"
                className="object-cover"
                priority
              />
            </div>

            {/* Right White Review Card */}
            <div
              ref={cardRef}
              className="md:col-span-8 bg-white text-[#100B14] rounded-[32px] p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col justify-between min-h-[364px] border-2 border-white/40 will-change-transform"
            >
              <div className="space-y-4">
                {/* Quote Icon */}
                <div className="w-14 h-12" aria-hidden="true">
                  <Image
                    src="/images/rating_group_6599_11941.svg"
                    alt=""
                    width={60}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Review Text in Ranchers Display Font */}
                <blockquote className="font-ranchers text-2xl sm:text-[32px] leading-snug tracking-[0.0313em] uppercase text-[#100B14]">
                  “{current.quote}”
                </blockquote>
              </div>

              {/* Author & Star Rating Footer */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-nunito font-bold text-xl text-[#100B14]">
                    {current.name}
                  </p>
                  <p className="font-nunito text-sm text-[#321A40]/70">
                    {current.role}
                  </p>
                </div>

                {/* 5 Stars Rating badge */}
                <div className="flex items-center gap-1.5 bg-[#FFEFCB] px-3.5 py-1.5 rounded-full border border-[#F9A70A]/30">
                  <span className="text-yellow-500 text-lg">★★★★★</span>
                  <span className="font-nunito font-bold text-xs text-[#100B14] uppercase ml-1">
                    5.0 Star
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scalloped Divider protruding UP into Dark Testimonials matching Figma (#6668:73) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-20 w-full overflow-hidden leading-none pointer-events-none translate-y-[1px]"
      >
        <Image
          src="/images/mask_group_6668_73.svg"
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
