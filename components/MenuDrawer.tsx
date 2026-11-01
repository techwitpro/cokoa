"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ArrowRight, Phone, Clock, MapPin } from "lucide-react";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTable: () => void;
}

export default function MenuDrawer({ isOpen, onClose, onBookTable }: MenuDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Our Story", href: "#about" },
    { label: "Signature Items", href: "#signature" },
    { label: "Most Loved Dishes", href: "#dishes" },
    { label: "Guest Reviews", href: "#reviews" },
    { label: "Our Moments", href: "#moments" },
    { label: "Acoustic Evenings & Events", href: "#events" },
    { label: "Reserve a Table", href: "#reservation" },
    { label: "Opening Hours", href: "#hours" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-drawer-title"
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <aside
        className="relative ml-auto flex h-full w-full max-w-md flex-col justify-between bg-[#100B14] p-8 text-white shadow-2xl z-10 overflow-y-auto border-l-2 border-[#D3F36A]/30"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D3F36A] flex items-center justify-center p-2">
                <Image
                  src="/images/vector_6829_1326.svg"
                  alt="COKOA"
                  width={70}
                  height={24}
                  className="brightness-0"
                />
              </div>
              <span id="menu-drawer-title" className="font-ranchers text-2xl tracking-wider text-[#FFEFCB]">
                COKOA
              </span>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#D3F36A] hover:text-[#100B14] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D3F36A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Mobile Navigation" className="mt-8 flex flex-col gap-3">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between text-2xl font-ranchers tracking-wide text-white/80 hover:text-[#D3F36A] transition-colors py-2 border-b border-white/5 focus:outline-none focus-visible:text-[#D3F36A]"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D3F36A]" />
              </a>
            ))}
          </nav>

          {/* Quick CTA */}
          <div className="mt-8">
            <button
              onClick={() => {
                onClose();
                onBookTable();
              }}
              className="w-full flex items-center justify-center gap-3 bg-[#D3F36A] text-[#100B14] font-nunito font-bold text-base uppercase py-3.5 px-6 rounded-full border-2 border-[#100B14] shadow-retro-yellow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
        <div className="pt-8 mt-8 border-t border-white/10 text-sm font-nunito text-white/70 space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#F9A70A]" aria-hidden="true" />
            <span>Daily Service · 11:30 AM — 11:30 PM</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#F9A70A]" aria-hidden="true" />
            <a href="tel:0023456709800" className="hover:text-white transition-colors">
              (00) 234 567 098 00
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#F9A70A]" aria-hidden="true" />
            <span>124 Gourmet Boulevard, Downtown</span>
          </div>

          <div className="flex items-center gap-4 pt-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="COKOA on Twitter"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F9A70A] hover:text-[#100B14] transition-all"
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
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F9A70A] hover:text-[#100B14] transition-all"
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
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F9A70A] hover:text-[#100B14] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
