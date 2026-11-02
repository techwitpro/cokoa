"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, ArrowRight, Phone, Clock, MapPin } from "lucide-react";
import { gsap } from "gsap";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTable: () => void;
}

export default function MenuDrawer({ isOpen, onClose, onBookTable }: MenuDrawerProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  const navLinks = [
    { num: "01", label: "Home", href: "#hero" },
    { num: "02", label: "Our Story", href: "#about" },
    { num: "03", label: "Signature Items", href: "#signature" },
    { num: "04", label: "Most Loved Dishes", href: "#dishes" },
    { num: "05", label: "Guest Reviews", href: "#reviews" },
    { num: "06", label: "Moments Gallery", href: "#moments" },
    { num: "07", label: "Acoustic Evenings & Events", href: "#events" },
    { num: "08", label: "Reserve a Table", href: "#reservation" },
    { num: "09", label: "Opening Hours", href: "#hours" },
  ];

  // Animated Close Sequence
  const handleAnimatedClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    // Resume smooth scroll immediately
    const lenis = (window as any).lenis;
    if (lenis) lenis.start();
    document.body.style.overflow = "";

    const tl = gsap.timeline({
      onComplete: () => {
        isClosingRef.current = false;
        setShouldRender(false);
        onClose();
      },
    });

    // 1. Links fade and shift slightly
    if (linksContainerRef.current) {
      tl.to(linksContainerRef.current.children, {
        x: 20,
        opacity: 0,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
      });
    }

    // 2. Panel slides out to the right
    if (panelRef.current) {
      tl.to(
        panelRef.current,
        {
          x: "100%",
          duration: 0.35,
          ease: "power3.in",
        },
        "-=0.1"
      );
    }

    // 3. Backdrop fades out
    if (backdropRef.current) {
      tl.to(
        backdropRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.25"
      );
    }
  }, [onClose]);

  // Synchronize mount and play opening animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      isClosingRef.current = false;

      // Lock background scroll
      const lenis = (window as any).lenis;
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";

      // Allow DOM to mount before animating
      requestAnimationFrame(() => {
        if (!panelRef.current || !backdropRef.current) return;

        const tl = gsap.timeline();

        // 1. Backdrop Fade In
        tl.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" }
        );

        // 2. Drawer Panel Slide In from Right
        tl.fromTo(
          panelRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.5, ease: "power4.out" },
          "-=0.2"
        );

        // 3. Staggered Navigation Links Slide & Pop
        if (linksContainerRef.current) {
          tl.fromTo(
            linksContainerRef.current.children,
            { x: 35, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.45,
              stagger: 0.04,
              ease: "power3.out",
            },
            "-=0.3"
          );
        }

        // 4. Footer CTA & Info Entrance
        if (footerRef.current) {
          tl.fromTo(
            footerRef.current,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
            "-=0.2"
          );
        }
      });
    } else if (shouldRender && !isClosingRef.current) {
      handleAnimatedClose();
    }
  }, [isOpen, shouldRender, handleAnimatedClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleAnimatedClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleAnimatedClose]);

  if (!shouldRender) return null;

  const handleLinkClick = (href: string) => {
    handleAnimatedClose();

    setTimeout(() => {
      const lenis = (window as any).lenis;
      const targetId = href.replace("#", "");
      const targetEl = document.getElementById(targetId);

      if (lenis && targetEl) {
        lenis.scrollTo(targetEl, { offset: -60, duration: 1.2 });
      } else if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 380);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Dimmed Backdrop with Blur */}
      <div
        ref={backdropRef}
        onClick={handleAnimatedClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer will-change-[opacity]"
      />

      {/* Slide-over Panel */}
      <aside
        ref={panelRef}
        className="relative z-10 flex h-full w-full max-w-lg flex-col justify-between bg-[#100B14] p-6 sm:p-10 text-white shadow-2xl overflow-y-auto border-l-2 border-[#D3F36A]/30 will-change-transform"
      >
        <div>
          {/* Top Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#D3F36A] flex items-center justify-center p-2.5 shadow-retro-dark">
                <Image
                  src="/images/vector_6829_1326.svg"
                  alt="COKOA"
                  width={70}
                  height={24}
                  className="brightness-0"
                />
              </div>
              <div className="flex flex-col">
                <span id="menu-drawer-title" className="font-ranchers text-2xl tracking-wider text-[#FFEFCB] leading-none">
                  COKOA
                </span>
                <span className="font-nunito font-semibold text-xs tracking-widest text-[#D3F36A] uppercase mt-0.5">
                  Artisanal Dining
                </span>
              </div>
            </div>

            {/* Close Button with interactive spin on hover */}
            <button
              onClick={handleAnimatedClose}
              aria-label="Close navigation menu"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#EFACF9] hover:text-[#100B14] transition-all duration-200 hover:rotate-90 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D3F36A]"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Navigation Links with numbers and animated hover indicator */}
          <nav aria-label="Mobile Navigation" className="mt-8">
            <div ref={linksContainerRef} className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.num}
                  onClick={() => handleLinkClick(item.href)}
                  className="group w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D3F36A]"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-nunito font-bold text-xs text-[#D3F36A] bg-[#D3F36A]/10 px-2 py-0.5 rounded-md group-hover:bg-[#D3F36A] group-hover:text-[#100B14] transition-colors">
                      {item.num}
                    </span>
                    <span className="font-ranchers text-2xl sm:text-[26px] tracking-wide text-white group-hover:text-[#D3F36A] group-hover:translate-x-1 transition-all duration-200 uppercase">
                      {item.label}
                    </span>
                  </div>

                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#D3F36A]" />
                </button>
              ))}
            </div>
          </nav>

          {/* Quick Reserve CTA */}
          <div className="mt-8 pt-4">
            <button
              onClick={() => {
                handleAnimatedClose();
                setTimeout(() => onBookTable(), 350);
              }}
              className="w-full flex items-center justify-center gap-3 bg-[#D3F36A] text-[#100B14] font-nunito font-bold text-base uppercase py-3.5 px-6 rounded-full border-2 border-[#100B14] shadow-retro-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:bg-[#E2FB84] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Reserve a Table</span>
              <Image
                src="/images/right_arrow_6668_394.svg"
                alt=""
                aria-hidden="true"
                width={18}
                height={14}
              />
            </button>
          </div>
        </div>

        {/* Footer info in Drawer */}
        <div ref={footerRef} className="pt-8 mt-8 border-t border-white/10 text-sm font-nunito text-white/70 space-y-3.5">
          <div className="flex items-center gap-3 text-white/90">
            <Clock className="w-4 h-4 text-[#F9A70A] flex-shrink-0" aria-hidden="true" />
            <span>Daily Service · 11:30 AM — 11:30 PM</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <Phone className="w-4 h-4 text-[#F9A70A] flex-shrink-0" aria-hidden="true" />
            <a href="tel:0023456709800" className="hover:text-[#D3F36A] transition-colors">
              (00) 234 567 098 00
            </a>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <MapPin className="w-4 h-4 text-[#F9A70A] flex-shrink-0" aria-hidden="true" />
            <span>124 Gourmet Boulevard, Downtown</span>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="COKOA on Twitter"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F9A70A] hover:text-[#100B14] transition-all hover:scale-110 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="COKOA on Facebook"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F9A70A] hover:text-[#100B14] transition-all hover:scale-110 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="COKOA on Instagram"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F9A70A] hover:text-[#100B14] transition-all hover:scale-110 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="COKOA on TikTok"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F9A70A] hover:text-[#100B14] transition-all hover:scale-110 shadow-sm"
            >
              <Image
                src="/images/vector_20_2_6668_620.svg"
                alt=""
                width={14}
                height={14}
                className="brightness-0 invert"
              />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
