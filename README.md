# 🍔 COKOA — Artisanal Restaurant Landing Page

A vibrant, neo-brutalist restaurant landing page built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, **GSAP & ScrollTrigger**, and **Lenis Smooth Scroll**. Faithfully translated from the [Figma Design Specification](https://www.figma.com/design/FnHE2mmi2zeqOJa4Dm8ri5/Techwitpro-Website-2.0?node-id=6599-11447) with buttery-smooth entrance reveals, interactive booking flows, and tactile retro aesthetics.

---

## ✨ Features & Highlights

### 🎯 Design & Aesthetic
- **Authentic Figma Alignment**: 100% adherence to typography, spacing, retro offset shadows (`2px 2px 0px #100B14` and `#FFFFFF`), and scalloped transition dividers.
- **Brand Palette**:
  - `Dark Night`: `#100B14`
  - `Signature Yellow`: `#F9A70A`
  - `Fresh Lime`: `#D3F36A`
  - `Deep Purple`: `#632C91` / `#672A8E`
  - `Cream Display`: `#FFEFCB`
  - `Soft Lavender`: `#F6E8FA` / `#EFACF9`
- **Typography**: Google Fonts [`Ranchers`](https://fonts.google.com/specimen/Ranchers) for retro display headings and [`Nunito`](https://fonts.google.com/specimen/Nunito) for body and UI elements.
- **Custom Favicon**: Custom branded squircle favicon with the iconic golden-yellow **"C"** emblem, lime starburst accent, and retro drop shadow.

---

### 🚀 Architecture & Sections

1. **Header & Navigation (`Navbar.tsx`)**:
   - Slide-down load animation with glassmorphic backdrop on scroll.
   - Interactive Menu Drawer toggle with quick category links.
   - Prominent "Book a Table" call-to-action with instant anchor scroll.
2. **Hero Section (`HeroSection.tsx`)**:
   - Cinematic background image zoom with subtle ambient depth parallax.
   - Dramatic Ranchers display text reveal (*"Every Bite Feels Special"*).
   - Floating organic starburst physics and desktop mouse parallax.
   - Scalloped SVG divider transition into the next section.
3. **About Section (`AboutSection.tsx`)**:
   - Staggered inline image badge pills with spring pop-in physics (`back.out(2.0)`).
   - Interactive *"Our Story"* modal popup with brand heritage details.
   - Triple arched capsule gallery with multi-plane depth parallax.
4. **Signature Dishes (`SignatureSection.tsx`)**:
   - Dual-card showcase featuring Chef's selections.
   - Snappy dish switching tabs with 0.35s crossfade and price tags.
5. **Loved Dishes Menu (`LovedDishesSection.tsx`)**:
   - 6-dish grid with dietary badges (*Signature Dish*, *Chef's Special*, *Fresh Daily*).
   - Category filtering (*All, Burgers, Sides, Mains*).
   - Dish quick-view modal with calories, ingredients, and allergen info.
6. **Moment Gallery (`MomentGallerySection.tsx`)**:
   - Full-bleed 4-card fanned perspective layout (`-2°` to `+2°` rotations).
   - Interactive image lightbox popup for high-resolution viewing.
7. **Testimonials (`TestimonialsSection.tsx`)**:
   - Snappy review carousel with customer avatars, star ratings, and review dates.
   - Keyboard accessible navigation (left/right arrow keys).
8. **Events & Happenings (`EventsSection.tsx`)**:
   - Live music nights, masterclasses, and private dining bookings.
   - Interactive RSVP / Book Event modal.
9. **Table Reservation Form (`ReservationSection.tsx`)**:
   - Full interactive booking form (name, email, guests, date, time slot, dietary requests).
   - Realistic celebratory confetti burst (`canvas-confetti`) on confirmed reservations.
10. **Specialties Ticker (`TickerSection.tsx`)**:
    - Infinite scrolling marquee track featuring Italian, Mexican, and artisanal specialties.
    - Seamless top and bottom scalloped transition borders.
11. **Footer & Giant Wordmark (`Footer.tsx`)**:
    - 4-column directory: Company links, opening hours, social channels, and newsletter signup.
    - Full-width high-resolution `Cokoa` bubble typography with authentic depth shadows.

---

### ⚡ Smooth Scroll & Animation System

- **Lenis Virtual Scroll**: Integrated smoothly with GSAP's ticker (`ScrollTrigger.update`), ensuring jitter-free scroll performance.
- **Zero Low-Opacity Lag**: All scroll reveal triggers use `once: true`, eliminating low-opacity reversing traps when scrolling up and down.
- **Snappy Durations & Easings**: Modern, punchy animation curves (`0.65s`–`0.85s` with `power3.out` and `back.out(1.8)`).
- **Reduced Motion Support**: Automatically respects `prefers-reduced-motion: reduce` across GSAP animations, Lenis, and CSS marquees.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | React Framework with App Router & Turbopack |
| **React 19** | Component architecture & modern hooks |
| **Tailwind CSS v4** | Utility-first styling & theme variables |
| **GSAP 3.15** | Entrance choreographies & ScrollTrigger parallax |
| **Lenis 1.3** | Smooth virtual scrolling engine |
| **Lucide React** | Accessible, lightweight icon set |
| **canvas-confetti** | Interactive reservation confirmation celebration |

---

## 📂 Project Directory Structure

```
cokoa/
├── app/
│   ├── favicon.ico             # 32x32 Branded ICO favicon
│   ├── icon.svg                # Scalable vector favicon
│   ├── globals.css             # Tailwind CSS v4, theme variables & marquee
│   ├── layout.tsx              # Root HTML layout, Google Fonts & metadata
│   └── page.tsx                # Master page assembly wrapped in SmoothScroll
├── components/
│   ├── AboutSection.tsx        # Story pills, modal & 3 arched capsules
│   ├── EventsSection.tsx       # Live music & events with RSVP modal
│   ├── Footer.tsx              # 4 columns, newsletter & giant bubble wordmark
│   ├── HeroSection.tsx         # Hero typography, starbursts & parallax
│   ├── LovedDishesSection.tsx  # 6-dish grid, filtering & detail modal
│   ├── MenuDrawer.tsx          # Fullsite mobile/desktop menu drawer
│   ├── MomentGallerySection.tsx# Fanned card perspective gallery
│   ├── Navbar.tsx              # Sticky header with blur & book CTA
│   ├── ReservationSection.tsx  # Interactive table booking & confetti
│   ├── SignatureSection.tsx    # Signature dual-card tabs
│   ├── SmoothScroll.tsx        # Lenis + GSAP ScrollTrigger synchronization
│   ├── TestimonialsSection.tsx # Review slider & customer quotes
│   └── TickerSection.tsx       # Continuous marquee & scalloped masks
├── public/
│   ├── favicon.ico             # Static ICO favicon fallback
│   ├── favicon.svg             # Static SVG favicon
│   └── images/                 # Optimized Figma vector assets & photography
├── package.json
└── tsconfig.json
```

---

## 💻 Getting Started

### Prerequisites
- Node.js `20.x` or higher
- `pnpm` (recommended), `npm`, or `yarn`

### Installation

```bash
# Clone or navigate to the repository
cd cokoa

# Install dependencies
pnpm install
```

### Running Locally

```bash
# Start Turbopack dev server
pnpm dev

# Or specify a custom port
pnpm dev -p 3005
```

Open [http://localhost:3000](http://localhost:3000) (or your chosen port) in your browser.

### Building for Production

```bash
# Run production build and type-checking
pnpm build

# Preview production build locally
pnpm start
```

---

## ♿ Accessibility & Standards

- Semantic HTML5 landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Full keyboard focusability with high-contrast outlines (`*:focus-visible`).
- Dialog accessibility (`aria-modal`, `aria-expanded`, ESC key handlers, and click-outside dismissal).
- Alt text for photography and `aria-hidden="true"` on purely decorative graphic elements.
