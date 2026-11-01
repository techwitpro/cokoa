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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (navContentRef.current) {
      gsap.fromTo(
        navContentRef.current,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#100B14]/95 backdrop-blur-md py-3 shadow-xl"
          : "bg-transparent pt-6 pb-2"
      }`}
    >
      <nav
        ref={navContentRef}
        aria-label="Main Navigation"
        className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between will-change-transform"
      >
        {/* Left: Menu button */}
        <button
          onClick={onOpenMenu}
          aria-expanded={isMenuOpen}
          aria-haspopup="dialog"
          aria-label="Open site menu"
          className="group flex items-center gap-3 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D3F36A] rounded-full"
        >
          <div className="w-12 h-12 rounded-full bg-[#D3F36A] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-retro-dark">
            <Image
              src="/images/text_input_container_6668_342.svg"
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
          </div>
          <span className="font-nunito font-bold text-2xl tracking-wider text-white uppercase group-hover:text-[#D3F36A] transition-colors">
            Menu
          </span>
        </button>

        {/* Center: Brand Logo */}
        <a
          href="#hero"
          aria-label="COKOA Restaurant Homepage"
          className="flex items-center justify-center transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D3F36A] rounded-lg"
        >
          <Image
            src="/images/vector_6829_1326.svg"
            alt="COKOA Logo"
            width={140}
            height={48}
            priority
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>

        {/* Right: Book a Table Button */}
        <button
          onClick={onBookTable}
          aria-label="Book a table reservation"
          className="flex items-center gap-2.5 bg-[#D3F36A] text-[#111111] font-nunito font-bold text-sm md:text-base uppercase tracking-wider px-5 py-3 rounded-full border-2 border-[#100B14] shadow-retro-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
