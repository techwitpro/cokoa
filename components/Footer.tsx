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
      if (columnsRef.current) {
        gsap.fromTo(
          columnsRef.current.children,
          { y: 35, opacity: 0 },
          {
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 88%",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }

      // 2. Giant Cokoa Wordmark Smooth Ascent
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: "top 92%",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          }
        );
      }
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
      className="relative w-full bg-[#100B14] text-white pt-24 md:pt-[120px] pb-0 overflow-hidden lg:h-[761px] flex flex-col justify-between"
    >
      {/* 4 Columns Grid matching Figma (Container #6668:563: width 1348px, height 238px at y=120px) */}
      <div className="relative z-10 w-full max-w-[1348px] mx-auto px-6 md:px-12">
        <div
          ref={columnsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_2fr_1fr_3fr] gap-8 lg:gap-14 xl:gap-20 items-start"
        >
          {/* Column 1: Company Links */}
          <div className="flex flex-col gap-5 will-change-transform">
            <h3 className="font-ranchers text-2xl sm:text-[28px] text-white uppercase tracking-[0.0357em] leading-[28px]">
              Company
            </h3>
            <ul className="flex flex-col gap-1 font-nunito text-lg sm:text-[20px] leading-[30px] text-white">
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
            <h3 className="font-ranchers text-2xl sm:text-[28px] text-white uppercase tracking-[0.0357em] leading-[28px]">
              Oping time
            </h3>
            <ul className="flex flex-col gap-1 font-nunito text-lg sm:text-[20px] leading-[30px] text-white">
              <li>Tue - Fri : 1:30PM - 12 PM</li>
              <li>Sat - Sun : 11 AM - 12 PM</li>
              <li>Monday : Closed</li>
              <li>Event : Always Open</li>
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col gap-5 will-change-transform">
            <h3 className="font-ranchers text-2xl sm:text-[28px] text-white uppercase tracking-[0.0357em] leading-[28px]">
              Social
            </h3>
            <ul className="flex flex-col gap-1 font-nunito text-lg sm:text-[20px] leading-[30px] text-white">
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
            <h3 className="font-ranchers text-2xl sm:text-[28px] text-white uppercase tracking-[0.0357em] leading-[28px] whitespace-nowrap">
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
                  className="w-[160px] h-[48px] rounded-full bg-[#F9A70A] text-[#100B14] font-nunito font-bold text-base uppercase border-2 border-[#F6E8FA] hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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

      {/* Giant Solid Cokoa Wordmark matching Figma 100% (node #6829:1328: 1442px x 494px at y=358px) */}
      <div
        ref={wordmarkRef}
        aria-hidden="true"
        className="relative z-0 w-full overflow-hidden leading-none pointer-events-none select-none flex justify-center mt-6 lg:mt-0 will-change-transform"
      >
        <div className="w-full max-w-[1442px] flex justify-center translate-y-[8%] sm:translate-y-[9%] lg:translate-y-[10%] px-2">
          <svg
            viewBox="0 0 1530 582"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto object-contain object-bottom select-none drop-shadow-none"
          >
            <defs>
              {/* Multi-directional shadow cast by 'k' onto first 'o' and second 'o' */}
              <filter id="cokoa-kShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="-6" dy="2" stdDeviation="12" floodColor="#000000" floodOpacity="0.85" />
                <feDropShadow dx="6" dy="2" stdDeviation="12" floodColor="#000000" floodOpacity="0.85" />
              </filter>
              {/* Leftward shadow cast by 'a' onto the second 'o' */}
              <filter id="cokoa-aShadow" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="-8" dy="3" stdDeviation="12" floodColor="#000000" floodOpacity="0.85" />
              </filter>
              {/* Subtle ambient depth behind base letters */}
              <filter id="cokoa-baseShadow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Letter 'C' & first 'o' */}
            <g filter="url(#cokoa-baseShadow)">
              <path
                d="M44.0203 304.256C45.0419 281.122 46.5691 260.568 52.6661 238.062C75.4817 153.842 143.833 78.78 227.55 53.4562C238.449 50.1592 249.502 47.0053 260.826 45.5502C298.065 40.7641 342.862 45.3967 370.907 73.2751C397.001 99.2129 395.981 138.066 373.193 165.755C366.703 173.641 358.247 181.073 348.348 184.21C320.382 193.077 307.927 176.734 283.558 169.381C255.885 161.031 227.909 169.071 206.646 188.049C194.951 198.486 186.084 212.703 179.998 227.083C172.667 244.396 168.255 262.291 167.535 281.164C167.235 289.076 168.214 297.175 169.441 304.945C175.79 345.122 199.384 382.785 238.658 397.135C274.571 410.256 316.548 399.121 346.834 377.564C353.473 372.838 360.187 367.271 365.228 360.792C367.227 358.223 368.898 354.734 369.11 351.422C369.594 343.915 366.362 336.116 364.992 328.804C362.903 317.648 361.887 306.482 360.768 295.2C357.688 264.186 368.056 221.937 383.483 195.084C419.428 132.524 493.233 100.354 561.394 128.592C579.322 136.019 596.829 146.689 610.244 161C633.577 185.89 646.567 219.648 650.124 253.279C652.401 274.809 651.485 296.982 648.034 318.299C644.776 338.438 639.521 359.119 630.043 377.339C606.099 423.37 562.703 449.206 511.379 450.686C490.125 451.299 468.13 447.936 448.508 439.492C443.894 437.507 439.087 435.474 434.694 433.037C430.941 430.956 426.866 427.959 422.726 426.791C420.914 426.281 419.141 426.362 417.363 426.971C412.194 428.747 396.78 449.237 392.008 454.627C388.361 458.745 384.392 462.614 380.428 466.417C357.247 488.657 328.732 506.235 298.286 516.233C187.266 552.69 83.7303 485.304 54.5612 374.894C48.7807 353.017 43.0164 327.018 44.0203 304.256ZM450.933 279.164C451.269 308.168 462.493 347.871 493.859 356.732C501.815 358.98 510.501 358.592 518.183 355.385C523.531 353.152 528.488 350.495 532.886 346.626C554.459 327.648 559.836 297.275 559.561 269.965C559.275 241.669 544.92 207.16 515.178 199.859C505.662 197.522 495.161 198.91 486.519 203.573C460.67 217.523 450.614 251.542 450.933 279.164Z"
                fill="#F9A70A"
              />
            </g>

            {/* Second 'o' */}
            <path
              d="M907.029 292.448C907.353 249.361 917.74 209.242 943.36 174.061C994.85 103.357 1095.28 89.2938 1156.39 155.975C1187.36 189.767 1198.84 232.793 1198.62 277.876C1198.56 290.702 1196.16 304.017 1193.26 316.455C1181.59 366.555 1154.66 414.774 1107.09 437.847C1094.8 443.808 1081.97 446.706 1068.65 448.936C1053.05 451.545 1036.42 450.558 1020.98 447.446C961.481 435.452 926.324 392.385 912.513 334.666C909.224 320.914 906.922 306.669 907.029 292.448ZM997.776 279.165C997.92 291.102 1000.04 303.301 1004 314.547C1015.42 347.07 1048.64 371.879 1079.82 345.725C1099.37 329.326 1109.01 298.27 1108.59 273.278C1108.38 260.858 1107.06 247.293 1102.54 235.639C1099.34 227.384 1095.83 219.385 1089.98 212.626C1085.43 207.372 1080.75 202.683 1074.67 199.193C1065.97 194.197 1054.89 192.826 1045.27 195.465C1010.6 204.977 997.39 246.645 997.776 279.165Z"
              fill="#F9A70A"
            />

            {/* Letter 'k' (overlaps both 'o' letters with multi-directional shadow) */}
            <g filter="url(#cokoa-kShadow)">
              <path
                d="M580.054 469.546C579.617 455.051 587.706 448.792 598.104 440.725C603.578 436.479 609.14 432.113 614.265 427.448C630.071 413.06 640.896 393.755 648.81 374.079C651.727 366.827 653.181 359.024 655.156 351.505C665.685 311.455 665.609 264.078 661.39 222.986C659.335 202.976 656.329 182.591 657.068 162.42C658.214 131.134 679.329 100.568 710.241 92.8063C716.231 91.3024 722.236 90.935 728.385 91.2877C735.793 91.7113 742.872 94.843 748.737 99.3192C773.838 118.475 760.207 157.068 756.372 182.856C754.796 193.443 752.577 204.263 752.923 215.017C753.036 218.522 753.254 225.423 758.405 224.781C763.76 224.114 766.249 216.035 768.561 212.051C776.59 198.216 782.848 183.093 789.687 168.635C794.169 159.16 799.527 150.159 804.705 141.062C824.814 105.735 850.476 72.0089 887.348 53.3219C911.964 40.8482 945.445 38.4146 964.073 62.5237C979.699 82.75 972.991 110.6 960.094 130.189C934.175 169.551 889.932 187.223 854.722 215.79C842.906 225.376 831.094 235.249 821.635 247.295C817.986 251.942 812.999 258.077 815.601 264.481C817.689 269.624 828.191 273.824 832.824 276.952C844.667 284.949 856.243 294.209 865.145 305.521C878.714 322.764 888.496 342.394 898.796 361.672C917.854 397.34 939.484 428.973 976.302 447.971C998.939 459.651 1024.93 465.477 1050.34 465.122C1059.28 464.996 1068.08 463.798 1076.96 463.036C1085.47 462.309 1095.25 464.812 1094.56 475.365C1093.29 494.985 1062.47 512.691 1047.14 520.721C1037.77 525.632 1027.56 528.796 1017.38 531.555C966.901 545.231 909.075 537.181 866.35 506.077C823.979 475.231 804.654 425.568 790.172 376.898C785.885 362.489 781.496 348.101 774.82 334.602C772.526 329.965 768.686 322.719 762.907 321.965C750.103 320.294 750.468 346.333 750.273 354.425C749.423 389.658 749.542 439.011 727.692 468.284C722.148 475.712 716.131 482.497 708.829 488.235C684.321 507.493 647.425 514.102 617.844 504.265C602.341 499.109 580.633 488.757 580.054 469.546Z"
                fill="#F9A70A"
              />
            </g>

            {/* Letter 'a' (overlaps second 'o' with shadow) */}
            <g filter="url(#cokoa-aShadow)">
              <path
                d="M1116.57 471.022C1116.43 465.414 1117.46 459.992 1120.54 455.237C1124.23 449.544 1130.71 445.288 1135.86 441.06C1141.23 436.654 1146.45 431.982 1151.33 427.032C1172.99 405.044 1187.9 378.622 1199.27 350.064C1203.32 339.92 1205.92 329.31 1208.98 318.868C1223.53 269.198 1230.15 217.586 1244.92 167.982C1254.56 135.632 1268.24 100.627 1295.56 79.1327C1329.54 52.404 1370.6 59.2651 1400.74 88.035C1411.61 98.4115 1420.31 111.42 1427.59 124.522C1457.8 178.934 1468.02 241.533 1477.5 302.278C1481.48 327.738 1483.71 353.471 1485.13 379.211C1486.1 396.718 1486.69 414.422 1485.16 431.92C1483.83 447.1 1480.42 463.073 1470.92 475.346C1449.19 503.402 1406.17 506.153 1378.89 484.988C1372.5 480.026 1367.35 472.576 1364.91 464.849C1356.92 439.54 1369.96 420.859 1368.93 396.525C1368.09 376.547 1350.33 362.517 1330.77 364.361C1278.57 369.283 1276.51 415.646 1258.23 453.389C1249.24 471.934 1234.32 488.577 1215.41 497.093C1209.56 499.728 1203.52 501.315 1197.4 503.146C1175.38 509.746 1141.85 504.42 1125.09 487.999C1120.63 483.633 1116.72 477.488 1116.57 471.022ZM1304.11 267.359C1304.09 298.31 1331.89 313.821 1357.78 297.221C1373.39 287.21 1379.1 267.376 1378.99 249.628C1378.87 231.529 1372.11 204.465 1354.46 195.895C1350.36 193.905 1344.92 193.176 1340.53 194.661C1316.59 202.753 1304.12 244.511 1304.11 267.359Z"
                fill="#F9A70A"
              />
            </g>
          </svg>
        </div>
      </div>
    </footer>
  );
}
