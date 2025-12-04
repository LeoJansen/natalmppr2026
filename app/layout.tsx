import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Natal da Nossa Casa 2026",
  description:
    "Campanha de doação corporativa para proporcionar um Natal acolhedor a quem cuida de nós o ano todo.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
