"use client";

import { useTranslation } from "react-i18next";

export default function LockerCard({ casillero, onReservar, onLiberar }: any) {
  const { t } = useTranslation("common");

  return (
    <div
      className={`rounded-2xl p-3  text-center transition-all ${
        casillero.ocupado
          ? "bg-slate-800 border border-red-500/40"
          : "bg-slate-800 border border-green-500/40 hover:border-green-400"
      }`}
    >
      <div className="text-3xl mb-2">{casillero.ocupado ? "🔒" : "🔓"}</div>
      <div className="text-white font-bold text-xl">#{casillero.numero}</div>
      <div
        className={`text-xs font-semibold uppercase tracking-wide mt-1 mb-3 ${
          casillero.tamanio === "pequeño"
            ? "text-blue-400"
            : casillero.tamanio === "mediano"
            ? "text-yellow-400"
            : "text-purple-400"
        }`}
      >
        {casillero.tamanio === "pequeño"
          ? t("small")
          : casillero.tamanio === "mediano"
          ? t("medium")
          : t("large")}
      </div>
      {casillero.ocupado && (
        <div className="text-xs text-red-400 mb-3">👤 {casillero.usuario}</div>
      )}
      <button
        onClick={() =>
          casillero.ocupado
            ? onLiberar(casillero.id, casillero.numero)
            : onReservar(casillero.id, casillero.numero)
        }
        className={`w-full py-2 rounded-lg text-white text-sm font-semibold transition-all ${
          casillero.ocupado
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {casillero.ocupado ? t("release") : t("reserve")}
      </button>
    </div>
  );
}
