"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import MenuDrawer from "@/components/MenuDrawer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SignatureSection from "@/components/SignatureSection";
import LovedDishesSection from "@/components/LovedDishesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MomentGallerySection from "@/components/MomentGallerySection";
import EventsSection from "@/components/EventsSection";
import ReservationSection from "@/components/ReservationSection";
import TickerSection from "@/components/TickerSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prefilledItem, setPrefilledItem] = useState<string | undefined>(undefined);

  const handleBookTable = (itemName?: string) => {
    if (itemName) {
      setPrefilledItem(itemName);
    }
    const target = document.getElementById("reservation");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      const nameInput = document.getElementById("reservation-fullname");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-white text-[#100B14] overflow-x-hidden selection:bg-[#D3F36A] selection:text-[#100B14]">
        {/* Navigation Header */}
        <Navbar
          isMenuOpen={isMenuOpen}
          onOpenMenu={() => setIsMenuOpen((prev) => !prev)}
          onBookTable={() => handleBookTable()}
        />

        {/* Slide-over Menu Drawer */}
        <MenuDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onBookTable={() => handleBookTable()}
        />

        {/* 1. Hero Section (y=0) */}
        <HeroSection />

        {/* 2. About Section (y=825) */}
        <AboutSection />

        {/* 3. Signature Items Section (y=2219) */}
        <SignatureSection onBookTable={handleBookTable} />

        {/* 4. Most Loved Dishes Section (y=3267) */}
        <LovedDishesSection onBookTable={handleBookTable} />

        {/* 5. Testimonials Section (y=4866) */}
        <TestimonialsSection />

        {/* 6. Moments Gallery Section (y=5768) */}
        <MomentGallerySection />

        {/* 7. Events Section (y=6825) */}
        <EventsSection onBookTable={handleBookTable} />

        {/* 8. Reservation Section (y=8425) */}
        <ReservationSection prefilledItem={prefilledItem} />

        {/* 9. Infinite Ticker Marquee (y=9567) */}
        <TickerSection />

        {/* 10. Footer (y=9819) */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
