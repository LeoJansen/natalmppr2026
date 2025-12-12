"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

/**
 * Registers GSAP plugins exactly once on the client.
 * Safe to call from any client component.
 */
export function ensureGsapPlugins() {
	if (pluginsRegistered) return;
	gsap.registerPlugin(ScrollTrigger);
	pluginsRegistered = true;
}

export { gsap, ScrollTrigger };
