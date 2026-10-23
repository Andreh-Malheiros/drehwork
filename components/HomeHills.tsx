"use client";

import dynamic from "next/dynamic";

// three.js loads only when the home hero mounts, keeping it out of every other page's bundle.
export const HomeHills = dynamic(() => import("@/components/ui/glsl-hills").then(m => m.GLSLHills), { ssr: false });
