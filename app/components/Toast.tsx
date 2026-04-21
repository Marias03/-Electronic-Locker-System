"use client";

export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-red-600 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2">
        <span>⚠️</span>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
