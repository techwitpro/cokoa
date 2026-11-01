"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SignatureSectionProps {
  onBookTable: (dishName?: string) => void;
}

export default function SignatureSection({ onBookTable }: SignatureSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const dishImageRef = useRef<HTMLDivElement>(null);

  const signatureItems = [
    {
      name: "Herb Roasted burger",
      price: "$28",
      image: "/images/tabpanel_signature_image_1_6668_484.png",
      alt: "Freshly prepared herb roasted gourmet burger with melted cheddar",
      description: "Prime aged wagyu beef patty infused with rosemary, thyme, caramelized onions & house truffle aioli.",
      badge: "Chef's Masterpiece",
    },
    {
      name: "Firewood Pepperoni Pizza",
      price: "$21",
      image: "/images/dishes_image_5_6599_11828-56586a.png",
      alt: "Wood-fired artisanal pepperoni pizza fresh from the hearth",
      description: "Charred sourdough crust baked at 800°F with San Marzano tomatoes, spicy pepperoni & fresh mozzarella.",
      badge: "Wood-Fired Favorite",
    },
    {
      name: "Steak & Fries",
      price: "$35",
      image: "/images/dishes_image_6599_11704-56586a.png",
      alt: "Seared prime cut steak served with crispy golden fries",
      description: "Tender grilled USDA Prime ribeye with garlic herb butter and hand-cut golden fries.",
      badge: "Customer Prime Choice",
    },
    {
      name: "Crispy Calamari",
      price: "$16",
      image: "/images/dishes_image_6599_11745-56586a.png",
      alt: "Crispy golden calamari served with lemon and remoulade",
      description: "Flash-fried tender calamari rings tossed with smoked paprika, sea salt, fresh lemon & remoulade dip.",
      badge: "Coastal Classic",
    },
    {
      name: "Vanilla Cheesecake",
      price: "$11",
      image: "/images/dishes_image_6599_11869-56586a.png",
      alt: "Velvety Madagascar vanilla bean cheesecake",
      description: "Velvety New York style cheesecake with Madagascar vanilla bean, strawberry coulis & graham crust.",
      badge: "Sweet Finale",
    },
  ];

  const currentItem = signatureItems[activeTab];
  const isTabMounted = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Heading Reveal (triggers immediately upon approaching viewport)
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

      // 2. Dual Showcase Cards Reveal
      gsap.fromTo(
        [leftCardRef.current, rightCardRef.current],
        { y: 35, opacity: 0, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: "top 90%",
            once: true,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Snappy dish switch transition (skips initial mount to prevent low-opacity trap)
  useEffect(() => {
    if (!isTabMounted.current) {
      isTabMounted.current = true;
      return;
    }
    if (dishImageRef.current) {
      gsap.fromTo(
        dishImageRef.current,
        { scale: 0.98, opacity: 0.8 },
        { scale: 1.0, opacity: 1.0, duration: 0.28, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % signatureItems.length;
      setActiveTab(next);
      document.getElementById(`tab-${next}`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + signatureItems.length) % signatureItems.length;
      setActiveTab(prev);
      document.getElementById(`tab-${prev}`)?.focus();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="signature"
      aria-label="Signature Menu Items"
      className="relative w-full bg-[#632C91] py-24 md:py-32 overflow-x-clip overflow-y-visible text-white"
    >
      {/* Top Scalloped Divider protruding DOWN into Purple Signature matching Figma (#6668:549) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 z-20 w-full overflow-hidden leading-none pointer-events-none -translate-y-[1px]"
      >
        <Image
          src="/images/mask_group_6668_549.svg"
          alt=""
          width={1440}
          height={31}
          priority
          className="w-full h-[31px] object-fill select-none pointer-events-none"
        />
      </div>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Section Heading matching Figma */}
        <div ref={headingRef} className="text-center max-w-[800px] mb-14 md:mb-16 will-change-transform">
          <h2 className="font-ranchers text-4xl sm:text-5xl md:text-[64px] leading-tight tracking-[0.0437em] uppercase drop-shadow-md">
            Taste What Everyone’s
            <span className="block">Talking About</span>
          </h2>
        </div>

        {/* Interactive Menu Showcase (2 Columns) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Dynamic Dish Image / Tabpanel */}
          <div
            ref={leftCardRef}
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="lg:col-span-5 relative w-full min-h-[440px] lg:min-h-[645px] rounded-[28px] overflow-hidden border-2 border-[#100B14]/20 shadow-2xl bg-[#100B14] will-change-transform"
          >
            <div ref={dishImageRef} className="relative w-full h-full min-h-[440px] lg:min-h-[645px]">
              <Image
                key={currentItem.image}
                src={currentItem.image}
                alt={currentItem.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
                priority
              />
            </div>
            {/* Overlay with details */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 pointer-events-none">
              <span className="inline-block self-start font-nunito font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#D3F36A] text-[#100B14] mb-2 shadow-sm">
                {currentItem.badge}
              </span>
              <h3 className="font-ranchers text-2xl sm:text-3xl text-white tracking-wide">
                {currentItem.name}
              </h3>
              <p className="font-nunito text-sm sm:text-base text-white/90 mt-1 max-w-md line-clamp-2">
                {currentItem.description}
              </p>
            </div>
          </div>

          {/* Right Column: Tablist Card */}
          <div
            ref={rightCardRef}
            className="lg:col-span-7 bg-white text-[#100B14] rounded-[28px] p-6 sm:p-10 md:p-12 flex flex-col justify-between border-2 border-[#100B14]/20 shadow-2xl min-h-[600px] lg:min-h-[645px] will-change-transform"
          >
            <div>
              {/* Header Title matching Figma */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h3 className="font-ranchers text-2xl sm:text-[32px] text-[#100B14] tracking-[0.0625em] uppercase">
                  Our Signature Items
                </h3>
                <span className="hidden sm:inline-block font-nunito text-xs font-semibold uppercase text-gray-500 tracking-wider">
                  Select item to view
                </span>
              </div>

              {/* Items List / Tabs */}
              <div
                role="tablist"
                aria-label="Signature dishes menu"
                className="flex flex-col gap-3.5"
              >
                {signatureItems.map((item, idx) => {
                  const isActive = activeTab === idx;
                  return (
                    <button
                      key={idx}
                      id={`tab-${idx}`}
                      role="tab"
                      tabIndex={isActive ? 0 : -1}
                      aria-selected={isActive}
                      aria-controls={`tabpanel-${idx}`}
                      onClick={() => setActiveTab(idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className={`w-full h-[84px] px-7 flex items-center justify-between rounded-xl border transition-all duration-200 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#632C91] ${
                        isActive
                          ? "bg-[#EFACF9] border-[#100B14] text-[#672A8E] shadow-retro-dark translate-x-1"
                          : "bg-white border-[#100B14]/30 text-[#100B14] hover:border-[#100B14] hover:bg-[#F6E8FA]/50"
                      }`}
                    >
                      <span
                        className={`font-ranchers text-xl sm:text-2xl tracking-[0.0417em] uppercase transition-colors ${
                          isActive ? "text-[#672A8E]" : "text-[#100B14]"
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="font-ranchers text-xl sm:text-2xl tracking-wide text-[#100B14]">
                        {item.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom CTA Button matching Figma (#100B14 bg, #F9A70A border and shadow) */}
            <div className="mt-8 pt-4">
              <button
                onClick={() => onBookTable(currentItem.name)}
                aria-label={`Reserve a table and order ${currentItem.name}`}
                className="w-full h-12 flex items-center justify-center gap-3 bg-[#100B14] text-white font-nunito font-bold text-base uppercase tracking-wider px-6 rounded-full border-2 border-[#F9A70A] shadow-[2px_2px_0px_0px_#F9A70A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A70A]"
              >
                <span>Reserve a Table</span>
                <Image
                  src="/images/right_arrow_6668_547.svg"
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={15}
                  className="w-5 h-4 object-contain brightness-0 invert"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scalloped Divider protruding UP into Purple Signature matching Figma (#6668:552) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-20 w-full overflow-hidden leading-none pointer-events-none translate-y-[1px]"
      >
        <Image
          src="/images/mask_group_6668_552.svg"
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
