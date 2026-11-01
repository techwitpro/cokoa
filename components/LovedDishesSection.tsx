"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Dish {
  id: number;
  name: string;
  badge: string;
  desc: string;
  image: string;
  category: "all" | "burgers" | "sides" | "pizza" | "pasta";
  price: string;
  calories: string;
  allergens: string[];
  ingredients: string[];
}

interface LovedDishesProps {
  onBookTable: (dishName?: string) => void;
}

export default function LovedDishesSection({ onBookTable }: LovedDishesProps) {
  const [activeDish, setActiveDish] = useState<Dish | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDish(null);
      }
    };
    if (activeDish) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDish]);

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

      // 2. 6 Dish Cards Playful Domino Spring Entrance (divided into rows for responsive viewport awareness)
      const validCards = cardsRef.current.filter(Boolean);
      const row1 = validCards.slice(0, 3);
      const row2 = validCards.slice(3, 6);

      if (row1.length > 0) {
        gsap.fromTo(
          row1,
          { y: 35, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: row1[0],
              start: "top 92%",
              once: true,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "back.out(1.4)",
          }
        );
      }

      if (row2.length > 0) {
        gsap.fromTo(
          row2,
          { y: 35, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: row2[0],
              start: "top 92%",
              once: true,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "back.out(1.4)",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const dishes: Dish[] = [
    {
      id: 1,
      name: "Truffle Beef Burger",
      badge: "Signature\nDish",
      desc: "Juicy grilled beef, cheddar cheese\n& truffle sauce burger",
      image: "/images/dishes_image_1_6599_11662-56586a.png",
      category: "burgers",
      price: "$24",
      calories: "780 kcal",
      allergens: ["Dairy", "Gluten", "Egg"],
      ingredients: ["Wagyu Beef", "Aged White Cheddar", "Black Truffle Aioli", "Brioche Bun", "Caramelized Shallots"],
    },
    {
      id: 2,
      name: "French Fry",
      badge: "Golden\nCrunch",
      desc: "Golden, crispy fries lightly salted\nand served with our house dip",
      image: "/images/dishes_image_6599_11704-56586a.png",
      category: "sides",
      price: "$9",
      calories: "380 kcal",
      allergens: ["Dairy"],
      ingredients: ["Russet Potatoes", "Rosemary Sea Salt", "Garlic Herb Butter Dip", "Smoked Paprika"],
    },
    {
      id: 3,
      name: "Crispy Fried Chicken",
      badge: "Hot &\nSpicy",
      desc: "Golden crispy chicken served with\nhouse special dip",
      image: "/images/dishes_image_6599_11745-56586a.png",
      category: "sides",
      price: "$18",
      calories: "620 kcal",
      allergens: ["Gluten", "Dairy"],
      ingredients: ["Buttermilk Marinated Chicken", "11 Secret Spices", "Pickled Jalapeños", "Honey Mustard Aioli"],
    },
    {
      id: 4,
      name: "Classic Beef Burger",
      badge: "Customer\nFavorite",
      desc: "Char-grilled beef patty with\nlettuce, tomato, and melted\ncheddar",
      image: "/images/dishes_image_6599_11786-56586a.png",
      category: "burgers",
      price: "$22",
      calories: "710 kcal",
      allergens: ["Dairy", "Gluten"],
      ingredients: ["Angus Beef Patty", "Ripe Vine Tomatoes", "Butterhead Lettuce", "Sharp Cheddar", "Secret House Relish"],
    },
    {
      id: 5,
      name: "Spicy Chicken Pizza",
      badge: "Wood\nFired",
      desc: "Wood-fired pizza topped with\nspicy chicken, peppers, and\nmozzarella",
      image: "/images/dishes_image_5_6599_11828-56586a.png",
      category: "pizza",
      price: "$21",
      calories: "890 kcal",
      allergens: ["Dairy", "Gluten"],
      ingredients: ["Slow-fermented Sourdough", "Roasted Chipotle Chicken", "Bell Peppers", "Fior di Latte Mozzarella", "Hot Honey Drizzle"],
    },
    {
      id: 6,
      name: "Creamy Alfredo Pasta",
      badge: "Chef's\nPick",
      desc: "Silky alfredo pasta tossed with\nparmesan, garlic, and fresh herbs",
      image: "/images/dishes_image_6599_11869-56586a.png",
      category: "pasta",
      price: "$23",
      calories: "680 kcal",
      allergens: ["Dairy", "Gluten"],
      ingredients: ["Fresh Hand-cut Fettuccine", "Aged Parmigiano Reggiano", "Roasted Garlic Cream", "Fresh Italian Parsley", "Cracked Black Pepper"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="dishes"
      aria-label="Our Most Loved Dishes"
      className="relative w-full bg-white py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Section Heading matching Figma */}
        <div ref={headingRef} className="text-center max-w-[800px] mb-14 md:mb-16 will-change-transform">
          <h2 className="font-ranchers text-4xl sm:text-5xl md:text-[64px] text-[#100B14] leading-[1.2] tracking-[0.0313em] uppercase">
            Our Most
            <span className="block">Loved Dishes</span>
          </h2>
        </div>

        {/* 6 Dishes Grid (3x2) matching Figma */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1380px]">
          {dishes.map((dish, idx) => {
            return (
              <div
                key={dish.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="w-full h-full will-change-transform"
              >
                <div
                  onClick={() => setActiveDish(dish)}
                  className="group relative h-full bg-[#F6E8FA] rounded-[32px] p-4 pb-8 flex flex-col justify-between border-2 border-[#100B14]/15 shadow-sm hover:border-[#100B14] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                {/* Top Image & Starburst Badge Container (401x307px in Figma) */}
                <div className="relative w-full h-[280px] sm:h-[307px] rounded-[24px] overflow-hidden bg-white/40">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top-Left Starburst Badge matching Figma */}
                  <div
                    aria-hidden="true"
                    className="absolute top-4 left-4 w-20 h-20 sm:w-[90px] sm:h-[90px] flex items-center justify-center select-none pointer-events-none transition-transform duration-300 group-hover:rotate-6"
                  >
                    <Image
                      src="/images/layer_6599_11665.svg"
                      alt=""
                      width={90}
                      height={90}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
                      <span className="font-nunito font-bold text-[13px] sm:text-[14px] text-[#100B14] uppercase tracking-tighter">
                        {dish.badge.split("\n")[0]}
                      </span>
                      <span className="font-nunito font-bold text-[13px] sm:text-[14px] text-[#100B14] uppercase tracking-tighter">
                        {dish.badge.split("\n")[1]}
                      </span>
                    </div>
                  </div>

                  {/* Corner Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-[#100B14]/85 text-[#F9A70A] font-ranchers text-2xl px-3.5 py-1 rounded-full backdrop-blur-sm border border-white/20 shadow-md">
                    {dish.price}
                  </div>
                </div>

                {/* Content Box */}
                <div className="pt-6 px-2 flex flex-col items-center text-center flex-1 justify-between">
                  <div>
                    <h3 className="font-ranchers text-2xl sm:text-[32px] text-[#100B14] tracking-[0.0313em] uppercase mb-2 group-hover:text-[#632C91] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="font-nunito text-base text-[#321A40] leading-relaxed max-w-[320px] mx-auto whitespace-pre-line mb-6">
                      {dish.desc}
                    </p>
                  </div>

                  {/* Action Button matching Figma specs (EL-79e41351: #632C91 bg, 2px border #100B14, shadow-retro-dark, text 'Try Today') */}
                  <div className="w-full flex justify-center pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookTable(dish.name);
                      }}
                      aria-label={`Try ${dish.name} - Reserve Table`}
                      className="inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-[#632C91] text-white font-nunito font-bold text-base uppercase tracking-wider border-2 border-[#100B14] shadow-retro-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#632C91]"
                    >
                      <span>Try Today</span>
                      <Image
                        src="/images/right_arrow_6599_11689.svg"
                        alt=""
                        aria-hidden="true"
                        width={21}
                        height={15}
                        className="w-4 h-3.5 object-contain brightness-0 invert"
                      />
                    </button>
                  </div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dish Quick View Modal */}
      {activeDish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            className="fixed inset-0"
            onClick={() => setActiveDish(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#100B14] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveDish(null)}
              aria-label="Close dish modal"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#100B14]/5 hover:bg-[#100B14] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#100B14]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6">
              <Image
                src={activeDish.image}
                alt={activeDish.name}
                fill
                className="object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#D3F36A] text-[#100B14] font-nunito font-bold text-xs uppercase px-3 py-1 rounded-full shadow">
                {activeDish.calories}
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 id="dish-modal-title" className="font-ranchers text-3xl sm:text-4xl text-[#100B14]">
                {activeDish.name}
              </h3>
              <span className="font-ranchers text-3xl text-[#F9A70A]">
                {activeDish.price}
              </span>
            </div>

            <p className="font-nunito text-[#321A40] text-base leading-relaxed mb-6">
              {activeDish.desc.replace("\n", " ")}
            </p>

            {/* Ingredients */}
            <div className="mb-6">
              <h4 className="font-nunito font-bold text-sm text-[#100B14] uppercase tracking-wider mb-2">
                Fresh Ingredients:
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeDish.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6E8FA] text-[#632C91] text-xs font-semibold"
                  >
                    <Check className="w-3.5 h-3.5 text-[#632C91]" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Allergens warning */}
            <div className="p-3 bg-[#FFEFCB]/60 rounded-xl mb-6">
              <p className="font-nunito text-xs text-[#100B14]/80">
                <strong className="font-bold">Allergen Notice:</strong> Contains {activeDish.allergens.join(", ")}. Please notify your server if you have specific dietary requirements.
              </p>
            </div>

            <button
              onClick={() => {
                const dishName = activeDish.name;
                setActiveDish(null);
                onBookTable(dishName);
              }}
              className="w-full flex items-center justify-center gap-3 bg-[#632C91] text-white font-nunito font-bold text-base uppercase py-3.5 px-6 rounded-full border-2 border-[#100B14] shadow-retro-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#632C91]"
            >
              <span>Book Table for this Dish</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
