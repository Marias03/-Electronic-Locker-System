"use client";

export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] animate-bounce px-4 w-full max-w-sm">
      <div
        className="text-white px-6 py-3 shadow-lg flex items-center gap-2 justify-center"
        style={{
          background: "rgba(255,60,60,0.15)",
          border: "1px solid rgba(255,60,60,0.4)",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "11px",
          letterSpacing: "1px",
        }}
      >
        <span>⚠️</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
