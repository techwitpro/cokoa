"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Columns Staggered Entrance
      gsap.fromTo(
        columnsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: columnsRef.current,
            start: "top 92%",
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      // 2. Giant Cokoa Wordmark Smooth Ascent & Parallax Float
      gsap.fromTo(
        wordmarkRef.current,
        { y: 50, scale: 0.96, opacity: 0 },
        {
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top 95%",
            once: true,
          },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      ref={footerRef}
      id="hours"
      aria-label="Site Footer"
      className="relative w-full bg-[#100B14] text-white pt-20 md:pt-[120px] pb-0 overflow-hidden min-h-[640px] lg:min-h-[761px] flex flex-col justify-between"
    >
      {/* 4 Columns Grid matching Figma (Container #6668:563: width 1348px, height 238px at y=120px) */}
      <div className="relative z-10 w-full max-w-[1348px] mx-auto px-6 md:px-12">
        <div ref={columnsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.8fr_1.1fr_2.7fr] gap-8 lg:gap-10 xl:gap-16 items-start">
          {/* Column 1: Company Links */}
          <div className="flex flex-col gap-5 will-change-transform">
            <h3 className="font-ranchers text-2xl sm:text-[28px] text-white uppercase tracking-wider leading-[28px]">
              Company
            </h3>
            <ul className="flex flex-col gap-1.5 font-nunito text-lg sm:text-[20px] leading-[30px] text-white">
              <li>
                <a
                  href="#hero"
                  className="hover:text-[#F9A70A] hover:translate-x-1 inline-block transition-all focus:outline-none focus-visible:underline"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#F9A70A] hover:translate-x-1 inline-block transition-all focus:outline-none focus-visible:underline"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#dishes"
                  className="hover:text-[#F9A70A] hover:translate-x-1 inline-block transition-all focus:outline-none focus-visible:underline"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="hover:text-[#F9A70A] hover:translate-x-1 inline-block transition-all focus:outline-none focus-visible:underline"
                >
                  Event
                </a>
              </li>
              <li>
                <a
                  href="#reservation"
                  className="hover:text-[#F9A70A] hover:translate-x-1 inline-block transition-all focus:outline-none focus-visible:underline"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Opening Time matching Figma */}
          <div className="flex flex-col gap-5 will-change-transform">
            <h3 className="font-ranchers text-2xl sm:text-[28px] text-white uppercase tracking-wider leading-[28px]">
              Oping time
            </h3>
            <ul className="flex flex-col gap-1.5 font-nunito text-lg sm:text-[20px] leading-[30px] text-white">
              <li>Tue - Fri : 1:30PM - 12 PM</li>
              <li>Sat - Sun : 11 AM - 12 PM</li>
              <li>Monday : Closed</li>
              <li>Event : Always Open</li>
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col gap-5 will-change-transform">
            <h3 className="font-ranchers text-2xl sm:text-[28px] text-white uppercase tracking-wider leading-[28px]">
              Social
            </h3>
            <ul className="flex flex-col gap-1.5 font-nunito text-lg sm:text-[20px] leading-[30px] text-white">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="COKOA on Twitter (X) - opens in new window"
                  className="group inline-flex items-center gap-3 hover:text-[#F9A70A] transition-colors focus:outline-none focus-visible:underline"
                >
                  <span>Twitter (X)</span>
                  <Image
                    src="/images/vector_20_2_6668_599.svg"
                    alt=""
                    aria-hidden="true"
                    width={12}
                    height={12}
                    className="brightness-0 invert group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="COKOA on Facebook - opens in new window"
                  className="group inline-flex items-center gap-3 hover:text-[#F9A70A] transition-colors focus:outline-none focus-visible:underline"
                >
                  <span>Facebook</span>
                  <Image
                    src="/images/vector_20_2_6668_606.svg"
                    alt=""
                    aria-hidden="true"
                    width={12}
                    height={12}
                    className="brightness-0 invert group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="COKOA on Instagram - opens in new window"
                  className="group inline-flex items-center gap-3 hover:text-[#F9A70A] transition-colors focus:outline-none focus-visible:underline"
                >
                  <span>Instagram</span>
                  <Image
                    src="/images/vector_20_2_6668_613.svg"
                    alt=""
                    aria-hidden="true"
                    width={12}
                    height={12}
                    className="brightness-0 invert group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="COKOA on TikTok - opens in new window"
                  className="group inline-flex items-center gap-3 hover:text-[#F9A70A] transition-colors focus:outline-none focus-visible:underline"
                >
                  <span>TikTok</span>
                  <Image
                    src="/images/vector_20_2_6668_620.svg"
                    alt=""
                    aria-hidden="true"
                    width={12}
                    height={12}
                    className="brightness-0 invert group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="flex flex-col gap-5 w-full will-change-transform">
            <h3 className="font-ranchers text-2xl sm:text-[28px] text-white uppercase tracking-wider leading-[28px] whitespace-nowrap">
              Subscribe to our news letter
            </h3>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <label
                htmlFor="footer-newsletter-email"
                className="font-nunito font-semibold text-lg sm:text-[20px] leading-[30px] text-white"
              >
                Email addres
              </label>

              <input
                id="footer-newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@yourmail.com"
                className="w-full h-[72px] px-6 rounded-[12px] border border-[#321A40] bg-transparent text-white font-nunito text-lg sm:text-[20px] placeholder-white/40 focus:outline-none focus:border-[#F9A70A] transition-colors"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-[160px] h-[48px] rounded-full bg-[#F9A70A] text-[#100B14] font-nunito font-bold text-base uppercase border-2 border-[#F6E8FA] shadow-[2px_2px_0px_0px_#FFFFFF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  JOIN NOW
                </button>
              </div>

              {subscribed && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-2 p-3 bg-[#D3F36A]/20 border border-[#D3F36A] rounded-xl flex items-center gap-2 text-[#D3F36A] font-nunito text-sm"
                >
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Welcome! You’re subscribed to our VIP dinner invites.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Giant Solid Cokoa Wordmark matching Figma (node #6829:1328) */}
      <div
        ref={wordmarkRef}
        aria-hidden="true"
        className="relative z-0 w-full overflow-hidden leading-none pointer-events-none select-none flex justify-center mt-6 lg:mt-[-30px] will-change-transform"
      >
        {/* Warm Ambient Glow matching Figma Vector effect */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 max-w-[1100px] h-[160px] bg-[#F9A70A]/25 blur-[60px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[1442px] flex justify-center translate-y-[12%] sm:translate-y-[15%] lg:translate-y-[18%] px-2">
          <Image
            src="/images/figma_wordmark_render.png"
            alt="COKOA"
            width={1442}
            height={548}
            priority
            className="w-full h-auto object-contain object-bottom select-none"
          />
        </div>
      </div>
    </footer>
  );
}
