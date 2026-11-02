"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface NavbarProps {
  isMenuOpen?: boolean;
  onOpenMenu: () => void;
  onBookTable: () => void;
}

export default function Navbar({ isMenuOpen = false, onOpenMenu, onBookTable }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (navContentRef.current) {
      gsap.fromTo(
        navContentRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#100B14]/90 backdrop-blur-md py-3 shadow-xl border-b border-white/10"
          : "bg-transparent pt-6 pb-2"
      }`}
    >
      <nav
        ref={navContentRef}
        aria-label="Main Navigation"
        className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between will-change-transform"
      >
        {/* Left: Interactive Animated Menu Toggle */}
        <button
          onClick={onOpenMenu}
          aria-expanded={isMenuOpen}
          aria-haspopup="dialog"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open site menu"}
          className="group flex items-center gap-3 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D3F36A] rounded-full p-1"
        >
          {/* Circular Button with Animated Hamburger / X Morph */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-[#100B14] shadow-retro-dark ${
              isMenuOpen
                ? "bg-[#EFACF9] rotate-90 scale-105"
                : "bg-[#D3F36A] group-hover:scale-105 group-hover:bg-[#E2FB84]"
            }`}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center" aria-hidden="true">
              {/* Top Bar */}
              <span
                className={`w-5 h-[2.5px] bg-[#100B14] rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              {/* Middle Bar */}
              <span
                className={`w-3.5 h-[2.5px] bg-[#100B14] rounded-full transition-all duration-200 self-start ${
                  isMenuOpen ? "opacity-0 scale-x-0" : "group-hover:w-5"
                }`}
              />
              {/* Bottom Bar */}
              <span
                className={`w-5 h-[2.5px] bg-[#100B14] rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </div>

          {/* Label with Morph Transition */}
          <span
            className={`font-nunito font-bold text-xl md:text-2xl tracking-wider uppercase transition-colors duration-200 ${
              isMenuOpen ? "text-[#EFACF9]" : "text-white group-hover:text-[#D3F36A]"
            }`}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </span>
        </button>

        {/* Center: Brand Logo with interactive pulse */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            const lenis = (window as any).lenis;
            if (lenis) {
              lenis.scrollTo(0, { duration: 1.2 });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          aria-label="COKOA Restaurant Homepage"
          className="flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D3F36A] rounded-lg"
        >
          <Image
            src="/images/vector_6829_1326.svg"
            alt="COKOA Logo"
            width={140}
            height={48}
            priority
            className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          />
        </a>

        {/* Right: Book a Table Button */}
        <button
          onClick={onBookTable}
          aria-label="Book a table reservation"
          className="flex items-center gap-2.5 bg-[#D3F36A] text-[#111111] font-nunito font-bold text-sm md:text-base uppercase tracking-wider px-5 py-3 rounded-full border-2 border-[#100B14] shadow-retro-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:bg-[#E2FB84] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>Book a Table</span>
          <Image
            src="/images/right_arrow_6668_394.svg"
            alt=""
            aria-hidden="true"
            width={18}
            height={14}
            className="w-4 h-3.5 object-contain"
          />
        </button>
      </nav>
    </header>
  );
}
