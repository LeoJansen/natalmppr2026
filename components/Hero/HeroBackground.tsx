"use client";
import Image from "next/image";

export function HeroBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
                <Image
                    src="/hero.png" // Ensure this asset matches the theme or replace with a new one if available
                    alt="Mãos oferecendo luz"
                    fill
                    priority
                    className="object-cover opacity-60 mix-blend-overlay"
                    sizes="100vw"
                />
                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            </div>
        </div>
    );
}
