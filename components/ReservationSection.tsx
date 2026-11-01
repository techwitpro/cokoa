"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { CheckCircle2, Calendar, Clock, Users, Utensils, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ReservationSectionProps {
  prefilledItem?: string;
}

export default function ReservationSection({ prefilledItem }: ReservationSectionProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("04");
  const [serviceDate, setServiceDate] = useState("2026-01-01");
  const [serviceTime, setServiceTime] = useState("01:30 PM");
  const [specialNote, setSpecialNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefilledItem) {
      setSpecialNote(`Interested in: ${prefilledItem}`);
    }
  }, [prefilledItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSubmitted(false);
      }
    };
    if (isSubmitted) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitted]);

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

      // 2. Dual Column Snappy Entrance
      gsap.fromTo(
        [imageColRef.current, formColRef.current],
        { y: 35, opacity: 0, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: imageColRef.current,
            start: "top 92%",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const code = "CK-" + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D3F36A", "#F9A70A", "#632C91", "#EFACF9"],
      });
    } catch {
      // fallback
    }
  };

  const timeSlots = [
    "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM",
    "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM"
  ];

  return (
    <section
      ref={sectionRef}
      id="reservation"
      aria-label="Table Reservation"
      className="relative w-full bg-white py-24 md:py-32 overflow-x-clip overflow-y-visible"
    >
      {/* Top Scalloped Divider from Events Section (#672A8E) matching Figma (#6668:81) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none -translate-y-[1px] z-20"
      >
        <Image
          src="/images/mask_group_6668_81.svg"
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
          <h2 className="font-ranchers text-4xl sm:text-5xl md:text-[64px] text-[#100B14] leading-[1.2] tracking-[0.0313em] uppercase">
            Gather Around
            <span className="block">the Perfect Table</span>
          </h2>
        </div>

        {/* 2-Column Reservation Container matching Figma specs (674x728) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-[1380px]">
          {/* Left Column: Dining Photo (674x728 in Figma, borderRadius: 36px) */}
          <div
            ref={imageColRef}
            className="lg:col-span-6 relative w-full min-h-[460px] sm:min-h-[560px] lg:min-h-[728px] rounded-[36px] overflow-hidden shadow-2xl bg-[#100B14] will-change-transform"
          >
            <Image
              src="/images/reservation_image_6599_12142-3ed4c9.png"
              alt="Cozy elegant dining table setting with plates and wine glasses at COKOA"
              fill
              sizes="(max-width: 1024px) 100vw, 674px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right Column: Reservation Form Card (674px width in Figma, padding 36px 48px) */}
          <div
            ref={formColRef}
            className="lg:col-span-6 bg-white rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#100B14]/15 shadow-xl flex flex-col justify-between will-change-transform"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Field 1: Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="reservation-fullname"
                  className="font-nunito font-semibold text-lg sm:text-xl text-[#100B14]"
                >
                  Full name
                </label>
                <input
                  id="reservation-fullname"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jonathon Mike"
                  className="w-full h-[65px] px-6 rounded-xl border border-[#100B14] font-nunito text-base text-[#100B14] placeholder-[#321A40]/50 focus:outline-none focus:ring-2 focus:ring-[#F9A70A] transition-all"
                />
              </div>

              {/* Field 2: Email address */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="reservation-email"
                  className="font-nunito font-semibold text-lg sm:text-xl text-[#100B14]"
                >
                  Email address
                </label>
                <input
                  id="reservation-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@yourmail.com"
                  className="w-full h-[65px] px-6 rounded-xl border border-[#100B14] font-nunito text-base text-[#100B14] placeholder-[#321A40]/50 focus:outline-none focus:ring-2 focus:ring-[#F9A70A] transition-all"
                />
              </div>

              {/* Field 3: Phone number */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="reservation-phone"
                  className="font-nunito font-semibold text-lg sm:text-xl text-[#100B14]"
                >
                  Phone number
                </label>
                <input
                  id="reservation-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  aria-required="true"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="012 345 678 910"
                  className="w-full h-[65px] px-6 rounded-xl border border-[#100B14] font-nunito text-base text-[#100B14] placeholder-[#321A40]/50 focus:outline-none focus:ring-2 focus:ring-[#F9A70A] transition-all"
                />
              </div>

              {/* Field 4: Select Person Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="reservation-guests"
                  className="font-nunito font-semibold text-lg sm:text-xl text-[#100B14]"
                >
                  Party size (Guests)
                </label>
                <select
                  id="reservation-guests"
                  name="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full h-[65px] px-6 rounded-xl border border-[#100B14] font-nunito text-base text-[#100B14] bg-white focus:outline-none focus:ring-2 focus:ring-[#F9A70A] transition-all cursor-pointer"
                >
                  <option value="01">01 Person</option>
                  <option value="02">02 Persons</option>
                  <option value="03">03 Persons</option>
                  <option value="04">04 Persons</option>
                  <option value="05">05 Persons</option>
                  <option value="06">06+ Persons (Large Party)</option>
                </select>
              </div>

              {/* Grid 2-cols: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reservation-date"
                    className="font-nunito font-semibold text-base text-[#100B14]"
                  >
                    Select Date
                  </label>
                  <input
                    id="reservation-date"
                    name="date"
                    type="date"
                    required
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full h-[58px] px-4 rounded-xl border border-[#100B14] font-nunito text-base text-[#100B14] bg-white focus:outline-none focus:ring-2 focus:ring-[#F9A70A]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reservation-time"
                    className="font-nunito font-semibold text-base text-[#100B14]"
                  >
                    Select Time
                  </label>
                  <select
                    id="reservation-time"
                    name="time"
                    value={serviceTime}
                    onChange={(e) => setServiceTime(e.target.value)}
                    className="w-full h-[58px] px-4 rounded-xl border border-[#100B14] font-nunito text-base text-[#100B14] bg-white focus:outline-none focus:ring-2 focus:ring-[#F9A70A] cursor-pointer"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Special Notes */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="reservation-note"
                  className="font-nunito font-semibold text-base text-[#100B14]"
                >
                  Special Request or Dish Preference (Optional)
                </label>
                <input
                  id="reservation-note"
                  name="note"
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. Anniversary dinner, Truffle Burger, Patio seating"
                  className="w-full h-[52px] px-4 rounded-xl border border-[#100B14] font-nunito text-sm text-[#100B14] placeholder-[#321A40]/40 focus:outline-none focus:ring-2 focus:ring-[#F9A70A]"
                />
              </div>

              {/* Submit Button matching Figma specs */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-[56px] rounded-full bg-[#D3F36A] text-[#111111] font-nunito font-bold text-base uppercase tracking-wider border-2 border-[#100B14] shadow-retro-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#100B14]"
                >
                  <span>Book a Table</span>
                  <Image
                    src="/images/right_arrow_6599_12189.svg"
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={14}
                    className="w-4 h-3.5 object-contain"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Dialog Modal */}
      {isSubmitted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmation-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsSubmitted(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#100B14] max-h-[90vh] overflow-y-auto text-[#100B14]">
            <button
              onClick={() => setIsSubmitted(false)}
              aria-label="Close booking confirmation"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#100B14]/5 hover:bg-[#100B14] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#100B14]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#D3F36A] text-[#100B14] flex items-center justify-center mx-auto mb-3 shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="font-nunito font-bold text-xs uppercase tracking-wider text-[#632C91] bg-[#F6E8FA] px-3.5 py-1 rounded-full">
                Reservation Confirmed
              </span>
              <h3 id="confirmation-modal-title" className="font-ranchers text-3xl sm:text-4xl text-[#100B14] mt-2">
                We Can’t Wait to Host You!
              </h3>
              <p className="font-nunito text-sm text-[#321A40]/80 mt-1">
                A confirmation SMS & calendar invite has been dispatched to {email}.
              </p>
            </div>

            {/* Voucher card */}
            <div className="bg-[#FFEFCB]/60 p-5 rounded-2xl border border-[#F9A70A]/30 space-y-3 font-nunito text-sm mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-[#100B14]/10">
                <span className="text-gray-600">Booking Code:</span>
                <span className="font-ranchers text-xl tracking-wider text-[#100B14]">{bookingCode}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#F9A70A]" />
                <span>Guest: <strong>{fullName}</strong> ({guests} Guests)</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#F9A70A]" />
                <span>Date: <strong>{serviceDate}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#F9A70A]" />
                <span>Time: <strong>{serviceTime}</strong></span>
              </div>
              {specialNote && (
                <div className="flex items-center gap-3">
                  <Utensils className="w-4 h-4 text-[#F9A70A]" />
                  <span>Notes: <em>{specialNote}</em></span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#100B14] text-white font-nunito font-bold text-base uppercase py-3.5 px-6 rounded-full border-2 border-[#100B14] hover:bg-[#632C91] transition-all cursor-pointer"
            >
              <span>Done & Close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
