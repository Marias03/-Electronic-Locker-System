"use client";

import { useTranslation } from "react-i18next";

export default function LockerCard({ casillero, onReservar, onLiberar }: any) {
  const { t } = useTranslation("common");

  const sizeColor =
    casillero.tamanio === "pequeño"
      ? "text-blue-400 bg-blue-900/30 border-blue-400/30"
      : casillero.tamanio === "mediano"
      ? "text-yellow-400 bg-yellow-900/30 border-yellow-400/30"
      : "text-purple-400 bg-purple-900/30 border-purple-400/30";

  const sizeLabel =
    casillero.tamanio === "pequeño"
      ? t("small")
      : casillero.tamanio === "mediano"
      ? t("medium")
      : t("large");

  return (
    <div
      className={`
      relative rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer
      hover:scale-105 border
      ${
        casillero.ocupado
          ? "bg-slate-800/80 card-occupied"
          : "bg-slate-800/80 card-available"
      }
    `}
    >
      <div
        className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
          casillero.ocupado
            ? "bg-red-500 animate-pulse"
            : "bg-green-500 animate-pulse"
        }`}
      />

      <div className="text-4xl mb-2">{casillero.ocupado ? "🔒" : "🔓"}</div>

      <div className="text-white font-bold text-xl mb-1">
        #{casillero.numero}
      </div>

      <div
        className={`inline-block text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full border mb-3 ${sizeColor}`}
      >
        {sizeLabel}
      </div>

      {casillero.ocupado && (
        <div className="text-xs text-red-400 mb-3 truncate">
          👤 {casillero.usuario}
        </div>
      )}

      <button
        onClick={() =>
          casillero.ocupado
            ? onLiberar(casillero.id, casillero.numero)
            : onReservar(casillero.id, casillero.numero)
        }
        className={`w-full py-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 active:scale-95 ${
          casillero.ocupado ? "btn-occupied" : "btn-available"
        }`}
      >
        {casillero.ocupado ? t("release") : t("reserve")}
      </button>
    </div>
  );
}
