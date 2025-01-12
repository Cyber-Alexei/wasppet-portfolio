import type { Metadata } from "next";
import { Aboreto, Jost, Instrument_Sans, Caveat } from "next/font/google";
import "../globals.css";

const aboreto = Aboreto({
  weight: "400",
  variable: "--font-aboreto",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Alexei Torres",
  description: "Alexei Torres Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" translate="no">
      <body
        className={`${aboreto.variable}
          ${jost.variable}
          ${instrumentSans.variable}
          ${caveat.variable}
          antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
