import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const pinyon = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
});

export const metadata: Metadata = {
  title: "Natal da Nossa Casa 2026",
  description:
    "Campanha de doação corporativa para proporcionar um Natal acolhedor a quem cuida de nós o ano todo.",
    icons:{
        icon: '/favicon.ico',
        
        
    },
    }       


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${pinyon.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
