import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo_Black, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--ff-display" });
const bodyFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--ff-body",
});
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--ff-mono" });

export const metadata: Metadata = {
  title: "Ivan Darma Saputra — Junior Developer",
  description:
    "Portfolio of Ivan Darma Saputra, a junior developer from Tangerang, Indonesia. Proficient in PHP & C#, working across Java, Python, .NET and SQL.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${bodyFont.variable} ${mono.variable}`}>
      <body className="bg-bg font-body text-ink antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
