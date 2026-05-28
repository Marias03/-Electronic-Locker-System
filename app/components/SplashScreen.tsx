"use client";
import { useEffect, useState } from "react";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [pct, setPct] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((prev) => {
        const inc =
          prev < 70
            ? Math.floor(Math.random() * 6) + 2
            : Math.floor(Math.random() * 3) + 1;
        const next = Math.min(prev + inc, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHiding(true);
            setTimeout(onComplete, 800);
          }, 400);
        }
        return next;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-6 transition-opacity duration-700 ${hiding ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="relative w-16 h-16 border border-cyan-400 flex items-center justify-center text-cyan-400 text-3xl">
        <span
          className="absolute inset-[-6px] border border-cyan-400/20 animate-spin"
          style={{ animationDuration: "6s" }}
        />
        <span
          className="absolute inset-[-12px] border border-cyan-400/10 animate-spin"
          style={{ animationDuration: "10s", animationDirection: "reverse" }}
        />
        🔒
      </div>
      <h1 className="text-2xl font-semibold tracking-[5px] uppercase text-slate-100">
        Electronic Locker System
      </h1>
      <p className="text-[11px] tracking-[3px] text-cyan-400">
        INITIALIZING SYSTEM — PLEASE WAIT
      </p>
      <div className="w-60 h-[2px] bg-cyan-400/10">
        <div
          className="h-full bg-cyan-400 transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] text-cyan-400 tracking-widest">{pct}%</span>
    </div>
  );
}
