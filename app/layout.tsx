import type { Metadata } from "next";
import { Ranchers, Nunito } from "next/font/google";
import "./globals.css";

const ranchers = Ranchers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ranchers",
  display: "swap",
});

const nunito = Nunito({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "COKOA | Every Bite Feels Special",
  description: "Enjoy chef-crafted flavors, warm hospitality, and an inviting atmosphere made for unforgettable dining moments.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ranchers.variable} ${nunito.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&family=Ranchers&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-[#100B14] bg-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
