"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Calendar, Clock, MapPin, Music } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface EventItem {
  id: number;
  day: string;
  month: string;
  dateBg: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  time: string;
  lineup: string;
}

interface EventsSectionProps {
  onBookTable: (eventTitle?: string) => void;
}

export default function EventsSection({ onBookTable }: EventsSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const eventCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      }
    };
    if (selectedEvent) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent]);

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

      // 2. Event Cards Playful Individual Spring Reveal on Scroll
      const cards = eventCardsRef.current.filter(Boolean);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 35, opacity: 0, scale: 0.96 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.4)",
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const events: EventItem[] = [
    {
      id: 1,
      day: "10",
      month: "June",
      dateBg: "bg-[#FFF33B]",
      title: "Curated Flavors &\nSmooth Jazz Evenings",
      desc: "An elevated dining experience where refined flavors meet the rhythm of smooth live jazz.",
      image: "/images/event_image_1_6599_12044.png",
      alt: "Musician playing acoustic bass during candlelit dinner event",
      time: "7:30 PM — 11:00 PM",
      lineup: "The Marcus Hayes Quartet (Acoustic Sax & Double Bass)",
    },
    {
      id: 2,
      day: "13",
      month: "May",
      dateBg: "bg-[#72D0F6]",
      title: "Behind the Kitchen Our\nSignature Recipes",
      desc: "Explore the techniques and passion behind the dishes and team our guests love most always.",
      image: "/images/event_image_2_6599_12084.png",
      alt: "Executive chef garnishing tasting plate in open kitchen",
      time: "6:00 PM — 9:30 PM",
      lineup: "Executive Chef Marco Valenti & Head Sommelier Wine Pairing",
    },
    {
      id: 3,
      day: "30",
      month: "July",
      dateBg: "bg-[#EFACF9]",
      title: "Summer Seafood\nFestival Begins",
      desc: "Enjoy fresh seafood item, chef specials, and vibrant coastal flavours item and food this summer.",
      image: "/images/event_image_3_6599_12124-753ca3.png",
      alt: "Fresh oysters and grilled shellfish platter on ice",
      time: "1:00 PM — 10:00 PM",
      lineup: "Artisanal Oyster Bar, Grilled Sea Bass & Live Bossa Nova",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="events"
      aria-label="Acoustic Evenings and Dining Events"
      className="relative w-full bg-[#672A8E] py-28 md:py-36 overflow-x-clip overflow-y-visible text-white"
    >
      {/* Top Scalloped Divider protruding DOWN into Purple Events matching Figma (#6668:77) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none -translate-y-[1px] z-20"
      >
        <Image
          src="/images/mask_group_6668_77.svg"
          alt=""
          width={1440}
          height={31}
          priority
          className="w-full h-[31px] object-fill select-none pointer-events-none"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Section Heading matching Figma */}
        <div ref={headingRef} className="text-center max-w-[800px] mb-14 md:mb-18 will-change-transform">
          <h2 className="font-ranchers text-4xl sm:text-5xl md:text-[64px] leading-tight tracking-[0.0313em] uppercase drop-shadow-md">
            Acoustic Evenings
            <span className="block">Over Dinner</span>
          </h2>
        </div>

        {/* 3 Event Cards matching Figma specs */}
        <div className="w-full flex flex-col gap-6 md:gap-8">
          {events.map((evt, idx) => (
            <div
              key={evt.id}
              ref={(el) => {
                eventCardsRef.current[idx] = el;
              }}
              className="w-full will-change-transform"
            >
              <div
                className="w-full bg-white text-[#100B14] rounded-[36px] overflow-hidden shadow-2xl border-2 border-white/20 flex flex-col lg:flex-row items-stretch justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(0,0,0,0.25)] group"
              >
              {/* Date Box Column (312x308 in Figma) */}
              <div
                className={`w-full lg:w-[312px] min-h-[160px] lg:min-h-[308px] ${evt.dateBg} p-8 flex flex-row lg:flex-col items-center justify-center gap-3 lg:gap-1 flex-shrink-0 select-none`}
              >
                <span className="font-ranchers text-7xl sm:text-8xl lg:text-[140px] leading-none text-[#100B14] transition-transform duration-300 group-hover:scale-105">
                  {evt.day}
                </span>
                <span className="font-nunito font-semibold text-2xl lg:text-3xl text-[#321A40]">
                  {evt.month}
                </span>
              </div>

              {/* Middle Content Column */}
              <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="font-ranchers text-2xl sm:text-3xl lg:text-[44px] leading-tight text-[#100B14] uppercase tracking-wide whitespace-pre-line mb-3 group-hover:text-[#672A8E] transition-colors">
                    {evt.title}
                  </h3>
                  <p className="font-nunito text-base sm:text-xl text-[#321A40] leading-relaxed max-w-xl">
                    {evt.desc}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-8">
                  {/* Action Button matching Figma specs */}
                  <button
                    onClick={() => {
                      const title = evt.title.replace("\n", " ");
                      onBookTable(`Event: ${title}`);
                    }}
                    aria-label={`Book table for event: ${evt.title.replace("\n", " ")}`}
                    className="flex items-center gap-2.5 bg-[#D3F36A] text-[#111111] font-nunito font-bold text-sm sm:text-base uppercase tracking-wider px-6 py-3 rounded-full border-2 border-[#100B14] shadow-retro-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#100B14]"
                  >
                    <span>Book a Table</span>
                    <Image
                      src="/images/right_arrow_6668_547.svg"
                      alt=""
                      aria-hidden="true"
                      width={18}
                      height={14}
                      className="w-4 h-3.5 object-contain"
                    />
                  </button>

                  <button
                    onClick={() => setSelectedEvent(evt)}
                    aria-label={`View full details for ${evt.title.replace("\n", " ")}`}
                    className="font-nunito font-semibold text-base text-[#672A8E] hover:underline cursor-pointer px-4 py-2"
                  >
                    Event Details & Lineup →
                  </button>
                </div>
              </div>

              {/* Right Event Image Column (364x364 in Figma) */}
              <div className="w-full lg:w-[364px] h-[280px] lg:h-auto min-h-[280px] relative overflow-hidden flex-shrink-0">
                <Image
                  src={evt.image}
                  alt={evt.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 364px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            className="fixed inset-0"
            onClick={() => setSelectedEvent(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-lg bg-white text-[#100B14] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#100B14] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event modal"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#100B14]/5 hover:bg-[#100B14] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#100B14]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F6E8FA] text-[#632C91] font-nunito font-bold text-xs uppercase tracking-wider mb-3">
              Special Experience
            </span>
            <h3 id="event-modal-title" className="font-ranchers text-3xl sm:text-4xl text-[#100B14] mb-3 whitespace-pre-line">
              {selectedEvent.title}
            </h3>

            <p className="font-nunito text-base text-[#321A40] leading-relaxed mb-6">
              {selectedEvent.desc}
            </p>

            <div className="bg-[#F6E8FA] p-5 rounded-2xl space-y-3 font-nunito text-sm mb-6">
              <div className="flex items-center gap-3 text-[#100B14]">
                <Calendar className="w-4 h-4 text-[#672A8E]" aria-hidden="true" />
                <span>Date: {selectedEvent.day} {selectedEvent.month} 2026</span>
              </div>
              <div className="flex items-center gap-3 text-[#100B14]">
                <Clock className="w-4 h-4 text-[#672A8E]" aria-hidden="true" />
                <span>Time: {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-3 text-[#100B14]">
                <Music className="w-4 h-4 text-[#672A8E]" aria-hidden="true" />
                <span>Featured: {selectedEvent.lineup}</span>
              </div>
              <div className="flex items-center gap-3 text-[#100B14]">
                <MapPin className="w-4 h-4 text-[#672A8E]" aria-hidden="true" />
                <span>Location: COKOA Main Dining Hall & Patio Stage</span>
              </div>
            </div>

            <button
              onClick={() => {
                const title = selectedEvent.title.replace("\n", " ");
                setSelectedEvent(null);
                onBookTable(`Event: ${title}`);
              }}
              className="w-full flex items-center justify-center gap-3 bg-[#F9A70A] text-white font-nunito font-bold text-base uppercase py-3.5 px-6 rounded-full border-2 border-[#100B14] shadow-retro-dark hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>Book Table for this Evening</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
