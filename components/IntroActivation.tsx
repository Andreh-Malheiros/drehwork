"use client";

import { useEffect, useState } from "react";

export function IntroActivation() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("dreh:intro")) return;
    sessionStorage.setItem("dreh:intro", "seen");
    const start = requestAnimationFrame(() => setVisible(true));
    const end = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(false)));
    return () => { cancelAnimationFrame(start); cancelAnimationFrame(end); };
  }, []);
  if (!visible) return null;
  return <div className="intro-activation" aria-hidden="true"><span>DREH WORK</span><i /><small>SISTEMA VISUAL / ATIVO</small></div>;
}
